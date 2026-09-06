# obix-binding-csharp

TypeScript package providing an OBIX C# binding bridge for Unity and the broader .NET ecosystem.

## Overview

`@obinexusltd/obix-binding-csharp` exposes a C# binding interface that:

- Initializes a bridge to an FFI runtime (`ffiPath`)
- Invokes polyglot functions through an ABI envelope
- Returns structured invocation errors (`NOT_INITIALIZED`, `MISSING_SYMBOL`, `INVOCATION_FAILED`)
- Provides runtime-oriented helpers for memory, assembly loading, Unity object creation, and GC hooks

## Install

```bash
npm install @obinexusltd/obix-binding-csharp
```

## Usage

```ts
import { createCsharpBinding } from '@obinexusltd/obix-binding-csharp';

const binding = createCsharpBinding({
  ffiPath: '/path/to/libpolycall',
  schemaMode: 'polyglot',
  memoryModel: 'hybrid',
});

await binding.initialize();

const result = await binding.invoke('MyFunction', [1, 'arg']);
console.log(result);

await binding.destroy();
```

## Scripts

- `npm run build` — compile TypeScript to `dist/`
- `npm test` — run tests with Vitest

## Documentation

In-depth guides live in [`docs/`](docs/):

| # | Guide |
|---|-------|
| 01 | [Overview](docs/01-overview.md) |
| 02 | [Installation and Setup](docs/02-installation-and-setup.md) |
| 03 | [Binding Lifecycle and Configuration](docs/03-binding-lifecycle.md) |
| 04 | [FFI Transport and the ABI Boundary](docs/04-ffi-transport-and-abi.md) |
| 05 | [Schema Modes](docs/05-schema-modes.md) |
| 06 | [Runtime Features](docs/06-runtime-features.md) |
| 07 | [Best Practices](docs/07-best-practices.md) |

---

## License

MIT
