import { spawnSync } from "node:child_process";
import { colorize, ConsoleColor, log } from "../services/console.service.js";
import type { IModule, IModuleExecutionContext, IModuleOption } from "./IModule.js";

export class ExecutorModule implements IModule {
  name = "executar";

  private readonly options: IModuleOption[] = [
    {
      id: 1,
      name: "logar-teste",
      run: () => this.runLogTestCommands("teste log"),
    },
    {
      id: 2,
      name: "logar-teste-2",
      run: () => this.runLogTestCommands("teste 2 log"),
    },
  ];

  async execute(context?: IModuleExecutionContext): Promise<void> {
    if (!context) {
      log(ConsoleColor.Red, "Contexto de execução não informado.");
      return;
    }

    log(ConsoleColor.Default, "\nOpções\n");
    this.options.forEach((option) => {
      const optionNumber = colorize(`${option.id}.`, ConsoleColor.Blue);
      const optionName = colorize(option.name, ConsoleColor.Green);
      log(ConsoleColor.Default, `  ${optionNumber} ${optionName}`);
    });

    const answer = await context.askQuestion("\nEscolha a opção: ");
    const choice = parseInt(answer, 10);
    const selectedOption = this.options.find((option) => option.id === choice);

    if (!selectedOption) {
      log(ConsoleColor.Yellow, "\nOpção inválida no ExecutorModule.");
      return;
    }

    selectedOption.run();
  }

  private runLogTestCommands(baseText: string): void {
    const commands: Array<{ command: string; args: string[]; display: string }> = [
      {
        command: process.execPath,
        args: ["-e", `console.log('${baseText} 1')`],
        display: `node -e \"console.log('${baseText} 1')\"`,
      },
      {
        command: process.execPath,
        args: ["-e", `console.log('${baseText} 2')`],
        display: `node -e \"console.log('${baseText} 2')\"`,
      },
      {
        command: process.execPath,
        args: ["-e", `console.log('${baseText} 3')`],
        display: `node -e \"console.log('${baseText} 3')\"`,
      },
      {
        command: process.execPath,
        args: ["-e", `console.log('${baseText} 4')`],
        display: `node -e \"console.log('${baseText} 4')\"`,
      },
    ];

    for (const item of commands) {
      log(ConsoleColor.Green, `$ ${item.display}`);

      const result = spawnSync(item.command, item.args, {
        encoding: "utf-8",
      });

      const stdout = result.stdout?.trim();
      const stderr = result.stderr?.trim();

      if (stdout) {
        log(ConsoleColor.Default, stdout);
      }

      if (stderr) {
        log(ConsoleColor.Red, stderr);
      }
    }
  }
}
