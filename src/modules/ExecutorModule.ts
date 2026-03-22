import { askForInput, askForOption, clearConsole, logOptions, logHeader } from "../services/console.service.js";
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
];

export class ExecutorModule implements IModule {
    name = "executar";

    options: IModuleOption[] = [
        {
            id: 1,
            name: "logar-teste",
            execute: runCommands.bind(this, LOG_TEST_COMMANDS),
        },
        {
            id: 2,
            name: "mkdir-teste",
            execute: runCommands.bind(this, CREATE_FOLDERS_TEST_COMMANDS),
        },
    ];

    async execute(): Promise<void> {
        let choice: number | null = null;

        while (choice !== 0) {
            clearConsole();
            logHeader(this.name);
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
    }
}
