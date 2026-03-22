import { askForInput, askForOption, clearConsole, logOptions, logTitle } from "../services/console.service.js";
import { runCommands } from "../services/terminal.service.js";
import type { IModule, IModuleOption } from "./IModule.js";

const LOG_TEST_COMMANDS: string[] = [
    "node -e \"console.log('teste log 1')\"",
    "node -e \"console.log('teste log 2')\"",
    "node -e \"console.log('teste log 3')\"",
    "node -e \"console.log('teste log 4')\"",
];

const LOG_TEST_2_COMMANDS: string[] = [
    "node -e \"console.log('teste 2 log 1')\"",
    "node -e \"console.log('teste 2 log 2')\"",
    "node -e \"console.log('teste 2 log 3')\"",
    "node -e \"console.log('teste 2 log 4')\"",
];

const CREATE_FOLDERS_TEST_COMMANDS: string[] = [
    "cd C:\\Users\\fernando\\Repositorios\\cli-node\\",
    "mkdir teste",
    "cd teste",
    "mkdir teste-filho",
    "echo Pastas criadas: teste e teste/teste-filho",
];

export class ExecutorModule implements IModule {
    name = "executar";

    options: IModuleOption[] = [
        {
            id: 1,
            name: "logar-teste",
            execute: runCommands.bind(this, LOG_TEST_COMMANDS, "powershell"),
        },
    ];

    // private readonly options: ExecutorOption[] = [
    //   {
    //     id: 1,
    //     name: "logar-teste",
    //     commands: LOG_TEST_COMMANDS,
    //   },
    //   {
    //     id: 2,
    //     name: "logar-teste-2",
    //     commands: LOG_TEST_2_COMMANDS,
    //   },
    //   {
    //     id: 3,
    //     name: "criar-pastas-teste",
    //     commands: CREATE_FOLDERS_TEST_COMMANDS,
    //   },
    // ];

    //async execute(context?: IModuleExecutionContext): Promise<void> {
    async execute(): Promise<void> {
        let choice: number | null = null;

        while (choice !== 0) {
            console.log("Executando  ExecutorModule:");
            //clearConsole();
            logTitle(this.name);
            logOptions(this.options);

            choice = await askForOption(1, this.options.length);
            console.log("Executor Choice:", choice);

            if (choice !== null && choice !== 0) {
                clearConsole();

                const selected = this.options[choice - 1]!;
                await selected.execute();

                await askForInput("\nPressione Enter para continuar...");
            }
            clearConsole();
        }

        // const shell = await this.selectShell(context);

        // log(ConsoleColor.Default, "\nOpções\n");
        // this.options.forEach((option) => {
        //   const optionNumber = colorize(`${option.id}.`, ConsoleColor.Blue);
        //   const optionName = colorize(option.name, ConsoleColor.Green);
        //   log(ConsoleColor.Default, `  ${optionNumber} ${optionName}`);
        // });

        // const answer = await context.askForInput("\nEscolha a opção: ");
        // const choice = parseInt(answer, 10);
        // const selectedOption = this.options.find((option) => option.id === choice);

        // if (!selectedOption) {
        //   log(ConsoleColor.Yellow, "\nOpção inválida no ExecutorModule.");
        //   return;
        // }

        // this.runCommands(selectedOption.commands, shell);
    }

    //   private async selectShell(context: IModuleExecutionContext): Promise<ExecutorShell> {
    //     log(ConsoleColor.Default, "\nShell para executar comandos:");
    //     log(ConsoleColor.Default, `  ${colorize("1.", ConsoleColor.Blue)} ${colorize("powershell (padrão)", ConsoleColor.Green)}`);
    //     log(ConsoleColor.Default, `  ${colorize("2.", ConsoleColor.Blue)} ${colorize("cmd", ConsoleColor.Green)}`);
    //     log(ConsoleColor.Default, `  ${colorize("3.", ConsoleColor.Blue)} ${colorize("bash", ConsoleColor.Green)}`);

    //     const answer = (await context.askForInput("Escolha o shell [Enter = powershell]: ")).trim();

    //     if (answer === "2") {
    //       return "cmd";
    //     }

    //     if (answer === "3") {
    //       return "bash";
    //     }

    //     return "powershell";
    //   }
}
