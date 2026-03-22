import * as readline from "readline";
import { IModuleOption } from "../modules/IModule.js";

export enum ConsoleColor {
    Default = "default",
    Green = "green",
    Blue = "blue",
    Yellow = "yellow",
    Red = "red",
}

const ANSI_COLORS: Record<ConsoleColor, string> = {
    [ConsoleColor.Default]: "\x1b[0m",
    [ConsoleColor.Green]: "\x1b[32m",
    [ConsoleColor.Blue]: "\x1b[34m",
    [ConsoleColor.Yellow]: "\x1b[33m",
    [ConsoleColor.Red]: "\x1b[31m",
};

const ANSI_RESET = "\x1b[0m";

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
    console.clear();
}

export function askForInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

export async function askForOption(rangeStart: number, rangeEnd: number): Promise<number | null> {
    const answer = await askForInput("\nEscolha a opção: ");
    const parsedAnswer = parseInt(answer, 10);

    const isValidNumber = !isNaN(parsedAnswer);
    const isInRange = parsedAnswer >= rangeStart && parsedAnswer <= rangeEnd;
    const isBackExitOption = parsedAnswer === 0;

    if (!isBackExitOption && (!isValidNumber || !isInRange)) {
        log(ConsoleColor.Yellow, "Opção inválida.");
        await askForInput("\nPressione Enter para continuar...");
        return null;
    }

    return parsedAnswer;
}

export function logTitle(title: string): void {
    log(ConsoleColor.Yellow, `\n========= ${title.toUpperCase()} ======`);
}

export function logOptions(options: IModuleOption[]): void {
    options.forEach((option) => {
        const optionNumber = colorize(`${option.id}.`, ConsoleColor.Blue);
        const optionName = colorize(option.name, ConsoleColor.Green);
        log(ConsoleColor.Default, `  ${optionNumber} ${optionName}`);
    });

    const optionNumber = colorize(`0.`, ConsoleColor.Blue);
    const optionName = colorize("Sair/Voltar", ConsoleColor.Green);

    log(ConsoleColor.Default, `  ${optionNumber} ${optionName}`);
}
