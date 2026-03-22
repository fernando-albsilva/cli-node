import { ConsoleColor, log } from "./services/console.service.js";
import { MainModule } from "./modules/MainModule.js";

async function run(): Promise<void> {
    const mainModule = new MainModule();
    await mainModule.execute();
}

run().catch((error: unknown) => {
    log(ConsoleColor.Red, "Erro inesperado ao executar o CLI.");
    log(ConsoleColor.Default, String(error));
    process.exitCode = 1;
});
