This bundle integrates BlueLibs's Core with [MikroORM](https://mikro-orm.io/docs/installation). A solution that allows us to easily work with SQL databases in a type-safe way.

## Install

```bash
npm i --save @redlibs/mikro-orm-bundle @mikro-orm/core @mikro-orm/mysql
```

You can install @mikro-orm/postgresql or others.

## Prepare

- [Official Documentation](https://mikro-orm.io/docs/installation)

## Usage

```ts
import { MikroORMBundle } from "@redlibs/mikro-orm-bundle";

const kernel = new Kernel({
  bundles: [
    // ...
    new MikroORMBundle({
      options: {
        // MikroORM Configuration
      },
    }),
  ],
});
```

## Usage

```ts
import { ORM } from "@redlibs/mikro-orm-bundle";

const orm = container.get(ORM); // ORM is a Token
// use orm as you normally would
```

## Entities

The default way of adding entities is through `options.entities` or through specifying a place and path for reading files and loading them.

However, when dealing with multiple bundles that extend this logic, we provide the following concept:

```ts
class AppBundle extends Bundle {
  async prepare() {
    const ormBundle = container.get(MikroORMBundle);
    ormBundle.load([Entity1, Entity2]);
  }
}
```

## CLI Commands

If you want to run mikro-orm cli commands follow the guide here: https://mikro-orm.io/docs/installation#setting-up-the-commandline-tool

The only difference is how the config file looks like. You will basically have to isolate your file kernel like this:

```ts
import { ORM, MikroORMBundle } from "@redlibs/mikroorm-bundle";

// A good idea at this stage would be to create a bundles/mikro-orm.ts which you import in your main kernel and the config file
const kernel = new Kernel({
  bundles: [
    new MikroORMBundle({
      options: {
        // your options
      },
    }),
  ],
});

await kernel.init();
const orm = kernel.container.get(ORM);
```
