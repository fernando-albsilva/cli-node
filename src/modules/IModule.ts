export interface IModule {
    name: string;
    options: IModuleOption[];
    execute(): Promise<void>;
}

export interface IModuleOption {
    id: number;
    name: string;
    execute(): Promise<void>;
}
