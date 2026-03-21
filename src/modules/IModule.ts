export interface IModule {
  name: string;
  execute(context?: IModuleExecutionContext): Promise<void>;
}

export interface IModuleOption {
  id: number;
  name: string;
  run: () => void;
}

export interface IModuleExecutionContext {
  askQuestion: (prompt: string) => Promise<string>;
}
