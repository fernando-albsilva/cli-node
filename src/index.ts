import * as readline from "readline";
import type { IModule } from "./modules/IModule.js";
import { Module1 } from "./modules/Module1.js";
import { Module2 } from "./modules/Module2.js";
import { clearConsole, colorize, ConsoleColor, log } from "./services/console.service.js";

const modules: IModule[] = [new Module1(), new Module2()];

function listModules(): void {
	log(ConsoleColor.Default, "\nOpções:");
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

async function run(): Promise<void> {
    do  {
        clearConsole();
        listModules();

        const answer = await askQuestion("Escolha a opção: ");
        const choice = parseInt(answer, 10);

        if (isNaN(choice) || choice < 1 || choice > modules.length) {
            log(ConsoleColor.Yellow, "Opção inválida.");
            await askQuestion("\nPressione Enter para continuar...");
            continue;
        }

        const selected = modules[choice - 1]!;
        selected.execute();
        await askQuestion("\nPressione Enter para continuar...");
    }  while (true);

    rl.close();
}


await run();