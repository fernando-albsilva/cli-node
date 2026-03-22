import {
    ANSI_COLORS,
    ANSI_RESET,
    askForInput,
    askForOption,
    clearConsole,
    ConsoleColor,
    log,
    logHeader,
    logOptions,
} from "../../services/console.service.js";
import { runCommands } from "../../services/terminal.service.js";
import { REPO_AMBIENTE_DESENVOLVIMENTO, REPO_LIB_UI_ANGULAR } from "../configs/repositories.config.js";
import type { IModule, IModuleOption } from "../imodule.js";

export class OpenModule implements IModule {
    name = "Abrir";

    constructor() {}

    options: IModuleOption[] = [
        {
            id: 1,
            name: `ambiente-desenvolvimento ${ANSI_COLORS[ConsoleColor.Yellow]}(VSCode)${ANSI_RESET}`,
            execute: this.openIn.bind(this, "code", REPO_AMBIENTE_DESENVOLVIMENTO),
        },
        {
            id: 2,
            name: `ambiente-desenvolvimento ${ANSI_COLORS[ConsoleColor.Yellow]}(Visual Studio)${ANSI_RESET}`,
            execute: this.openIn.bind(this, "devenv", REPO_AMBIENTE_DESENVOLVIMENTO),
        },
        {
            id: 3,
            name:
                `` +
                `\n  - ambiente-desenvolvimento ${ANSI_COLORS[ConsoleColor.Yellow]}(Visual Studio)${ANSI_RESET}` +
                `\n  - lib-ui-angular ${ANSI_COLORS[ConsoleColor.Yellow]}(Visual Studio)${ANSI_RESET}`,
            execute: this.openSetIn.bind(this, [
                { app: "code", path: REPO_AMBIENTE_DESENVOLVIMENTO },
                { app: "code", path: REPO_LIB_UI_ANGULAR },
            ]),
        },
    ];

    async execute(): Promise<void> {
        let choice: number | null = null;

        while (choice !== 0) {
            clearConsole();
            logHeader(this.name);
            logOptions(this.options);

            choice = await askForOption(1, this.options.length);

            if (choice !== null && choice !== 0) {
                clearConsole();
                const selected = this.options[choice - 1]!;
                await selected.execute();
                await askForInput("\nPressione Enter para continuar...");
            }
        }
    }

    private async openIn(app: string, path: string) {
        await runCommands([`${app} \"${path}\"`]);
    }

    private async openSetIn(sets: { app: string; path: string }[]) {
        sets.forEach(async (set) => {
            await runCommands([`${set.app} \"${set.path}\"`]);
        });
    }
}
