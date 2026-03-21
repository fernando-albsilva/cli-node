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
