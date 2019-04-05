# now-env

With the help of this package, you can easily set environment variables for the use in development.

If you're already using a `now.json` file, the `env` sub property will be assigned to `process.env` automatically.

In addition, you can store secrets locally, that are specific to the development environment.

**IMPORTANT:** Do not use this package in production. It should only be used locally, while developing. This is because the secrets that you're using locally shouldn't match the ones you use in production (more secure). In production, you should be adding secrets [like this](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/).

## Usage

Firstly, install the package from [npm](https://www.npmjs.com/package/now-env):

```bash
yarn add now-env
```

As the last step, register the helper by loading it:

```js
require('now-env')
```

That's all, you can now check `process.env` for the environment variables!

> If your application is running inside [Now](https://zeit.co/now) cloud then this module is not going to do anything and let Now set your environment variables.

If using this with [Next.js](https://github.com/zeit/next.js), follow the example at [`next.js/examples/with-now-env`](https://github.com/zeit/next.js/tree/canary/examples/with-now-env) to make sure `now-env` only runs on the server at build time.

### Secrets

Most probably you will want to use [secret keys](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/#securing-environment-variables-using-secrets) in your `now.json` file. This module allow you to use them too without worries in development.

Create a `now.json` with some secret defined as `@secret-name`, similar to:

```json
{
  "env": {
    "SECRET": "@my-secret-key",
    "ANOTHER_SECRET": "@my-other-secret-key",
    "SECRET_FAIL": "@this-is-not-defined"
  }
}
```

Then create a `now-secrets.json` with the secrets names and values.

```json
{
  "@my-secret-key": "keep-it-secret",
  "@my-other-secret-key": "keep-it-secret-too"
}
```

> This file **must** be ignored to actually keep them **secret**.

Then when starting your application `now-env` will read the `now.json` and get the values from `now-secrets.json`. If a environment key can't be found in `now-secrets.json` (or the file doesn't exists) then is going to use the secret name as value, that means if `DB_PASS` is `@db_pass` and you don't define it inside `now-secrets.json` then the value will be `@db_pass`.

### Required Variables

Now supports using the `env` key as an array of required values you'll need to provide when deploying. This module also allows you to use them in development.

Create a `now.json` with the array, similar to:

```json
{
  "env": [
    "REQUIRED_KEY",
    "REQUIRED_SECRET"
  ]
}
```

Then create a `now-required.json` with the environment keys and values.

```json
{
  "REQUIRED_KEY": "required-value",
  "REQUIRED_SECRET": "@required-secret"
}
```

> You can also use secrets, for that you will need to create a `now-secrets.json` too.

Then when starting your application `now-env` will read the `now.json` and get the values from `now-required.json` (and `now-secrets.json`). If a environment key can't be found in `now-required.json` then is going to throw a reference error.

### CLI Usage

Since `now-env` should only run in development it makes sense to add it as a `devDependency` in your application `package.json`. In that case you may not want to add `require('now-env')` to your code since it will break in case you only install production dependencies.

You can solve this using now-env only via the CLI with the following command:

```bash
node -r now-env index.js
```

Now Node.js will require `now-env` before running your `index.js`. If you define it as a `dev` script in the `package.json` you could have a `start` script just running `node index.js` and not using `now-env` at all!

## Migrating from `dotenv`

If you're already using the `dotenv` module you can switch to `now-env` easily:

1. Create a `now.json` file with the `env` key with every environment variable
2. Install `now-env`
3. Change `require('dotenv').config()` with `require('now-env')`
4. That's it!
