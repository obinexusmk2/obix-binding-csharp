# Binding Lifecycle and Configuration

## Factory

```ts
const binding = createCsharpBinding(config);
```

## `CsharpBindingConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ffiPath` | `string` | **required** | Path to the libpolycall shared library |
| `schemaMode` | `'monoglot' \| 'polyglot' \| 'hybrid'` | **required** | Polyglot interop mode |
| `memoryModel` | `'gc' \| 'manual' \| 'hybrid'` | **required** | Memory-management strategy hint |
| `dotnetVersion` | `string` | — | .NET version |
| `pInvokeEnabled` | `boolean` | — | Use P/Invoke for native calls |
| `nativeAotCompatible` | `boolean` | — | Target Native AOT |
| `unityEnabled` | `boolean` | — | Unity integration mode |
| `unityVersion` | `string` | — | Unity editor version |
| `asyncTaskSupport` | `boolean` | — | Enable `Task`-based async |
| `gcMode` | `'workstation' \| 'server' \| 'concurrent'` | — | .NET GC mode hint |
| `heapCountMax` | `number` | — | Max tracked heap segments |
| `ffiDescriptor` | `CsharpFFIDescriptor` | — | Optional structured FFI descriptor |

## Lifecycle methods

| Method | Description |
|--------|-------------|
| `initialize(): Promise<void>` | Validates `ffiPath` (non-empty string) and `schemaMode` (valid enum). **Throws** on invalid input. Marks the binding ready. |
| `invoke(fn, args): Promise<unknown>` | Build an envelope for `fn` and dispatch it. Returns the native result, or a `BindingInvokeError` object — **never throws**. |
| `destroy(): Promise<void>` | Tear down every sub-module and mark the binding uninitialised. Not reusable afterwards. |
| `isInitialized(): boolean` | Ready state. |
| `getSchemaMode(): SchemaMode` | The resolved schema mode. |
| `getMemoryUsage()` | C# memory snapshot (`{ managedHeapBytes, unmanagedHeapBytes, totalAssembliesBytes, gen0Collections, gen1Collections, gen2Collections }`). |

`fn` may be a string, or an object with `functionId` / `id` / `name` — see
[04-ffi-transport-and-abi.md](04-ffi-transport-and-abi.md).

## C#-specific bridge methods

| Method | Description |
|--------|-------------|
| `loadAssembly(assemblyPath): Promise<object>` | Stub — load a .NET assembly and return a proxy |
| `createGameObject(name, components: string[]): Promise<string>` | Stub — create a Unity GameObject, returns its id |
| `forceGarbageCollection(): Promise<void>` | Stub — trigger a .NET GC |

## Sub-module accessors

```ts
// (none — single-module binding)
```

## Example

```ts
const binding = createCsharpBinding({
  ffiPath: '/opt/lib/libpolycall.so',
  schemaMode: 'polyglot',
  memoryModel: 'hybrid',
});

await binding.initialize();
const result = await binding.invoke('renderFrame', [1920, 1080]);
console.log(binding.getMemoryUsage());
await binding.destroy();
```
