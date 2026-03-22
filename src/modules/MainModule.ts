import { exit } from "node:process";
import { askForOption, clearConsole, ConsoleColor, log, logOptions, logHeader } from "../services/console.service.js";
import { ExecutorModule } from "./ExecutorModule.js";
import { IModule, IModuleOption } from "./IModule.js";

const Modules = {
    ExecutorModule: new ExecutorModule(),
};

export class MainModule implements IModule {
    options: IModuleOption[] = [
        {
            id: 1,
            name: "Executar",
            execute: Modules.ExecutorModule.execute.bind(Modules.ExecutorModule),
        },
    ];
    name = "CLI-NODE";

    async execute(): Promise<void> {
        clearConsole();
        let choice: number | null = null;

        while (choice !== 0) {
            logHeader(this.name);
            logOptions(this.options);

            choice = await askForOption(1, this.options.length);

            this.chekForExitProgram(choice);

            if (choice !== null) {
                clearConsole();

                const selected = this.options[choice - 1]!;
                await selected.execute();
            }

            clearConsole();
        }
    }

    chekForExitProgram(choice: number | null): void {
        if (choice === 0) {
            log(ConsoleColor.Green, "Saindo do programa...");
            exit(0);
        }
    }
}
