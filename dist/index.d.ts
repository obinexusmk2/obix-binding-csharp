export type SchemaMode = 'monoglot' | 'polyglot' | 'hybrid';
export interface InvocationEnvelope {
    functionId: string;
    args: unknown[];
    metadata: {
        schemaMode: SchemaMode;
        binding: string;
        timestampMs: number;
        ffiPath: string;
    };
}
export interface BindingInvokeError {
    code: 'NOT_INITIALIZED' | 'MISSING_SYMBOL' | 'INVOCATION_FAILED';
    message: string;
    envelope: InvocationEnvelope;
    cause?: unknown;
}
export interface BindingAbiInvoker {
    invoke(envelopeJson: string): unknown | Promise<unknown>;
}
export interface CsharpFFIDescriptor {
    ffiPath: string;
    dotnetVersion: string;
    clrVersion?: string;
    unityVersion?: string;
    pInvokeEnabled: boolean;
    nativeAotCompatible: boolean;
}
export interface CsharpBindingConfig {
    ffiPath: string;
    dotnetVersion?: string;
    schemaMode: SchemaMode;
    memoryModel: 'gc' | 'manual' | 'hybrid';
    pInvokeEnabled?: boolean;
    nativeAotCompatible?: boolean;
    unityEnabled?: boolean;
    unityVersion?: string;
    asyncTaskSupport?: boolean;
    gcMode?: 'workstation' | 'server' | 'concurrent';
    heapCountMax?: number;
    ffiDescriptor?: CsharpFFIDescriptor;
}
export interface CsharpBindingBridge {
    initialize(): Promise<void>;
    invoke(fn: string | object, args: unknown[]): Promise<unknown>;
    destroy(): Promise<void>;
    getMemoryUsage(): {
        managedHeapBytes: number;
        unmanagedHeapBytes: number;
        totalAssembliesBytes: number;
        gen0Collections: number;
        gen1Collections: number;
        gen2Collections: number;
    };
    getSchemaMode(): SchemaMode;
    isInitialized(): boolean;
    loadAssembly(assemblyPath: string): Promise<object>;
    createGameObject(gameObjectName: string, components: string[]): Promise<string>;
    forceGarbageCollection(): Promise<void>;
}
export declare function createCsharpBinding(config: CsharpBindingConfig): CsharpBindingBridge;
//# sourceMappingURL=index.d.ts.map