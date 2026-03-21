import { IModule } from "./IModule.js";

export class Module1 implements IModule {
  name = "Module 1";

  async execute(): Promise<void> {
    console.log("Executando Module 1...");
  }
}
