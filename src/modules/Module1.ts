import { IModule } from "./IModule.js";

export class Module1 implements IModule {
  name = "Module 1";

  execute(): void {
    console.log("Executando Module 1...");
  }
}
