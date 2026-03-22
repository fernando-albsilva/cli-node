import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { colorize, ConsoleColor, log, logHeader } from "./console.service.js";
import { getClibotDate as getDateTimeNow } from "./date.service.js";
import { exit } from "node:process";

type ExecutorShell = "powershell" | "cmd" | "bash";

function resolvePlaceholders(command: string): string {
    if (!command.includes("{clibot-date}")) {
        return command;
    }

    return command.replaceAll("{clibot-date}", getDateTimeNow());
}

type RunnerArgs = {
    command: string;
    shell?: ExecutorShell;
    currentDirectory?: string;
    stopOnError?: boolean;
};

export async function runCommands(
    commands: string[],
    stopOnError: boolean = true,
    shell: ExecutorShell = "powershell",
): Promise<void> {
    let currentDirectory = process.cwd();
    let counter = 1;

    log();
    logHeader(`Executando ${commands.length} comando(s)...`);
    log();

    for (const rawCommand of commands) {
        const command = resolvePlaceholders(rawCommand);
        log();
        let totalExecuted = colorize(`(${counter}/${commands.length})`, ConsoleColor.Blue);
        log(ConsoleColor.Green, `$ ${command} ${totalExecuted}`);

        const changedDirectory = tryChangeDirectory(command, currentDirectory);

        if (changedDirectory) {
            counter++;
            currentDirectory = changedDirectory;
            log();
            log(ConsoleColor.Default, `Diretorio atual: ${currentDirectory}`);
            log();
            log(ConsoleColor.Yellow, `*********************************************************`);
            continue;
        }

        const runnerArgs: RunnerArgs = {
            command,
            shell,
            currentDirectory,
            stopOnError,
        };

        runShellCommand(runnerArgs);
        counter++;

        log();

        if (counter - 1 < commands.length) {
            log(ConsoleColor.Yellow, `*********************************************************`);
        }
    }

    log();
    logHeader(`✓ Todos os ${counter - 1} comando(s) foram executados!`);
    log();
}

function tryChangeDirectory(command: string, currentDirectory: string): string | null {
    const cdMatch = command.trim().match(/^cd\s+(?:\/d\s+)?(.+)$/i);

    if (!cdMatch) {
        return null;
    }

    const rawPath = cdMatch[1].trim().replace(/^"|"$/g, "");

    if (rawPath.length === 0) {
        return currentDirectory;
    }

    return resolve(currentDirectory, rawPath);
}

function runShellCommand(runnerArgs: RunnerArgs): void {
    const shellCommand = getShellCommand(runnerArgs.shell, runnerArgs.command);
    const result = spawnSync(shellCommand.executable, shellCommand.args, {
        encoding: "utf-8",
        cwd: runnerArgs.currentDirectory,
        shell: false,
    });

    const stdout = result.stdout?.trim();
    const stderr = result.stderr?.trim();

    log();
    if (stdout) {
        log(ConsoleColor.Default, stdout);
    }

    if (stderr) {
        log(ConsoleColor.Red, stderr);
        stopOnError(runnerArgs);
    }

    if (result.error) {
        log(ConsoleColor.Red, String(result.error));
        stopOnError(runnerArgs);
    }
}

function getShellCommand(shell: ExecutorShell, command: string): { executable: string; args: string[] } {
    if (shell === "cmd") {
        return {
            executable: "cmd.exe",
            args: ["/c", command],
        };
    }

    if (shell === "bash") {
        return {
            executable: "bash",
            args: ["-lc", command],
        };
    }

    return {
        executable: "powershell",
        args: ["-NoProfile", "-Command", command],
    };
}

function stopOnError(runnerArgs: RunnerArgs) {
    if (runnerArgs.stopOnError) {
        exit(1);
    }
}

