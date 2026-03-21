import { IModule } from "./IModule.js";

export class Module2 implements IModule {
  name = "Module 2";

  async execute(): Promise<void> {
    console.log("Executando Module 2...");
  }
}
