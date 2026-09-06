# .NET and Unity Helpers

This binding is a single module — there are no sub-module accessors. The
runtime helpers are **stubs** today: they log and return placeholder values until
the native .NET bridge is wired in.

| Method | Current behaviour |
|--------|-------------------|
| `loadAssembly(path)` | logs, returns `{}` |
| `createGameObject(name, components)` | logs, returns `'gameobject-id'` |
| `forceGarbageCollection()` | logs |

`getMemoryUsage()` returns a fixed zero-filled shape
(`managedHeapBytes`, `unmanagedHeapBytes`, `totalAssembliesBytes`,
`gen0Collections`, `gen1Collections`, `gen2Collections`) until the native side
reports real figures.
