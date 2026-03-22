export interface IModule {
    name: string;
    //execute(context?: IModuleExecutionContext): Promise<void>;
    options: IModuleOption[];
    execute(): Promise<void>;
}

export interface IModuleOption {
    id: number;
    name: string;
    execute(): Promise<void>;
}

// export interface IModuleExecutionContext {
//   askForInput: (prompt: string) => Promise<string>;
// }
