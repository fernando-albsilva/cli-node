import * as readline from "readline";
import { IModuleOption } from "../modules/imodule.js";

export enum ConsoleColor {
    Default = "default",
    Green = "green",
    Blue = "blue",
    Yellow = "yellow",
    Red = "red",
}

export const ANSI_COLORS: Record<ConsoleColor, string> = {
    [ConsoleColor.Default]: "\x1b[0m",
    [ConsoleColor.Green]: "\x1b[32m",
    [ConsoleColor.Blue]: "\x1b[34m",
    [ConsoleColor.Yellow]: "\x1b[33m",
    [ConsoleColor.Red]: "\x1b[31m",
};

export const ANSI_RESET = "\x1b[0m";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function colorize(text: string, color: ConsoleColor = ConsoleColor.Default): string {
    if (color === ConsoleColor.Default) {
        return text;
    }

    return `${ANSI_COLORS[color]}${text}${ANSI_RESET}`;
}

export function log(color: ConsoleColor = ConsoleColor.Default, ...messages: unknown[]): void {
    if (messages.length === 0) {
        console.log();
        return;
    }

    const text = messages.map((message) => String(message)).join(" ");
    console.log(colorize(text, color));
}

export function clearConsole(): void {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
        console.log("\r\n");
    }
    console.clear();
}

export function askForInput(prompt: string, color: ConsoleColor = ConsoleColor.Yellow): Promise<string> {
    return new Promise((resolve) => {
        rl.question(colorize(prompt, color), resolve);
    });
}

export async function askForOption(rangeStart: number, rangeEnd: number): Promise<number | null> {
    const answer = await askForInput("\nEscolha a opção: ");
    const parsedAnswer = parseInt(answer, 10);

    const isValidNumber = !isNaN(parsedAnswer);
    const isInRange = parsedAnswer >= rangeStart && parsedAnswer <= rangeEnd;
    const isBackExitOption = parsedAnswer === 0;

    if (!isBackExitOption && (!isValidNumber || !isInRange)) {
        log();
        log(ConsoleColor.Red, "Opção inválida.");
        await askForInput("\nPressione Enter para continuar...");
        return null;
    }

    return parsedAnswer;
}

export function logHeader(text: string): void {
    let bar = "";
    let barLength = text.length + 12;
    text = `      ${text}      `;

    for (let i = 0; i < barLength; i++) {
        bar += "═";
    }

    log(ConsoleColor.Yellow, bar);
    log(ConsoleColor.Yellow, text);
    log(ConsoleColor.Yellow, bar);
    log();
}

export function logOptions(options: IModuleOption[]): void {
    options.forEach((option) => {
        const optionNumber = colorize(`${option.id}.`, ConsoleColor.Blue);
        const optionName = colorize(option.name, ConsoleColor.Default);
        log(ConsoleColor.Default, `  ${optionNumber} ${optionName}`);
    });

    const optionNumber = colorize(`0.`, ConsoleColor.Blue);
    const optionName = colorize("Sair/Voltar", ConsoleColor.Default);

    log(ConsoleColor.Default, `  ${optionNumber} ${optionName}`);
}
