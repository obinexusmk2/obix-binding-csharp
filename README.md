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

## License

MIT
