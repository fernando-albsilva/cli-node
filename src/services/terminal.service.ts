import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { ConsoleColor, log } from "./console.service.js";

type ExecutorShell = "powershell" | "cmd" | "bash";

export async function runCommands(commands: string[], shell: ExecutorShell): Promise<void> {
    let currentDirectory = process.cwd();

    try {
        for (const command of commands) {
            log(ConsoleColor.Green, `$ ${command}`);

            const changedDirectory = tryChangeDirectory(command, currentDirectory);

            if (changedDirectory) {
                currentDirectory = changedDirectory;
                log(ConsoleColor.Default, `Diretório atual: ${currentDirectory}`);
                continue;
            }

            runShellCommand(command, shell, currentDirectory);
        }
    } catch (error) {
        log(ConsoleColor.Red, "Erro ao executar sequência de comandos.");
        log(ConsoleColor.Default, String(error));
    }
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

function runShellCommand(command: string, shell: ExecutorShell, cwd: string): void {
    const shellCommand = getShellCommand(shell, command);
    const result = spawnSync(shellCommand.executable, shellCommand.args, {
        encoding: "utf-8",
        cwd,
        shell: false,
    });

    const stdout = result.stdout?.trim();
    const stderr = result.stderr?.trim();

    if (stdout) {
        log(ConsoleColor.Default, stdout);
    }

    if (stderr) {
        log(ConsoleColor.Red, stderr);
    }

    if (result.error) {
        log(ConsoleColor.Red, String(result.error));
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
