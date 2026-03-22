import { askForInput, askForOption, clearConsole, logOptions, logHeader, ConsoleColor, ANSI_COLORS, ANSI_RESET } from "../../services/console.service.js";
import { runCommands } from "../../services/terminal.service.js";
import type { IModule, IModuleOption } from "../imodule.js";
import { ACCEPTED_ERROS_GIT, UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_MASTER } from "./commands.config.js";




export class ExecutorModule implements IModule {
  name = "executar";

  options: IModuleOption[] = [
    {
      id: 1,
      name: `${ANSI_COLORS[ConsoleColor.Yellow]}(Atualizar)${ANSI_RESET} ambiente-desenvolvimento ${ANSI_COLORS[ConsoleColor.Red]}(Master)${ANSI_RESET}`,
      execute: runCommands.bind(this, UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_MASTER, ACCEPTED_ERROS_GIT),
    },
    {
      id: 2,
      name: `${ANSI_COLORS[ConsoleColor.Yellow]}(Atualizar)${ANSI_RESET} ambiente-desenvolvimento ${ANSI_COLORS[ConsoleColor.Green]}(Development)${ANSI_RESET}`,
      execute: runCommands.bind(this, UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_MASTER, ACCEPTED_ERROS_GIT),
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
