import * as readline from "readline";
import type { IModule, IModuleExecutionContext } from "./modules/IModule.js";
import { ExecutorModule } from "./modules/ExecutorModule.js";
import { Module2 } from "./modules/Module2.js";
import { clearConsole, colorize, ConsoleColor, log } from "./services/console.service.js";

const modules: IModule[] = [new ExecutorModule(), new Module2()];

function listModules(): void {
    log(ConsoleColor.Yellow, "========== CLI-NODE ==========");
	log(ConsoleColor.Default, "\nOpções:\n");
	modules.forEach((mod, index) => {
		const optionNumber = colorize(`${index + 1}.`, ConsoleColor.Blue);
		const moduleName = colorize(mod.name, ConsoleColor.Green);
		log(ConsoleColor.Default, `  ${optionNumber} ${moduleName}`);
	});
	log();
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});


function askQuestion(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

const moduleExecutionContext: IModuleExecutionContext = {
    askQuestion,
};

async function run(): Promise<void> {
    do  {
        clearConsole();
        listModules();

        const answer = await askQuestion("\nEscolha a opção: ");
        const choice = parseInt(answer, 10);

        if (isNaN(choice) || choice < 1 || choice > modules.length) {
            log(ConsoleColor.Yellow, "Opção inválida.");
            await askQuestion("\nPressione Enter para continuar...");
            continue;
        }

        const selected = modules[choice - 1]!;
        log(ConsoleColor.Yellow, `\n========= ${selected.name.toUpperCase()} ======`);
        await selected.execute(moduleExecutionContext);
        await askQuestion("\nPressione Enter para continuar...");
    }  while (true);

    rl.close();
}

run().catch((error: unknown) => {
    log(ConsoleColor.Red, "Erro inesperado ao executar o CLI.");
    log(ConsoleColor.Default, String(error));
    rl.close();
    process.exitCode = 1;
});