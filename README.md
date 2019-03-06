<div align="center">
  <h1>stages-config 🔑</h1>
</div>

<p align="center">Easy and safe <strike>environment</strike> <i>stages</i> configuration for develop, staging, production...</p>

***

[![CircleCI](https://circleci.com/gh/Woonivers/stages-config.svg?style=shield)](https://circleci.com/gh/Woonivers/stages-config)
[![npm version](https://badge.fury.io/js/%40woonivers%2Fstages-config.svg)](https://badge.fury.io/js/%40woonivers%2Fstages-config)


## Why use `stages-config`?
The environment variables are great, I really like to use libraries like [`dotenv`](https://github.com/motdotla/dotenv) to store my secret keys in different env files for each environment (develop, staging, production...) but this doesn't allow me to be sure that a key is correctly configured and we tend to save more than necessary in these files, which ends up making them a little unusable.

With `stages-config` you have full control of your environment variables, you can configure **non-critical** keys in simple javascript per stage or with default values. And the possibility of error due to forgetting to set some variable in some environment is reduced to zero.

## Installation
Install with npm or with yarn.

```
npm install @woonivers/stages-config --save
```

```
yarn add @woonivers/stages-config
```

## Usage

Basically, you need to follow these steps:

1) Define a `schema`. *Each setting in the schema has [some properties (format, env, default...)](#the-schema).*

```js
const schema = {
  jwt: {
    format: 'string',
    env: 'JWT_SECRET'
  },
  port: {
    format: 'int'
  },
  firebase: {
    key: {
      format: 'string'
    },
    id: {
      format: 'int'
    },
    url: {
      format: 'url',
      default: 'https://firebase.com'
    }
  }
}
```
2) Setup your `stages` *The values for the settings in the different environments you have (develop, staging, production...)*

```js
const stages = {
  develop: {
    port: 1040,
    firebase: {
      key: 'firebase_local',
      id: 171721
    }
  },
  production: {
    port: 7777,
    firebase: {
      key: 'firebase_prduction',
      id: '646464'
    }
  }
}
```


*You should also use this package along with other tools that allow you to set environment variables for more sensitive data.*

```bash
# .env
JWT_SECRET: mysupersecretindevelop

# .env.staging
JWT_SECRET: mysupersecretinstaging

# .env.production
JWT_SECRET: mysupersecretinproduction
```


3) Provide your active stage. *Select which of your stages is the active*

```js
const stage = {
  env: 'STAGE',
  default: 'develop'
}
```

*You must define an environment variable with the active stage (develop, staging, production...).*

```bash
# .env
STAGE: develop

# .env.staging
STAGE: staging

# .env.production
STAGE: production
```

4) Export your config

```js
import stageConfig from '@woonivers/stages-config'

const config = stageConfig({
  schema,
  stages,
  stages
})

export default config
```

5) Use it in your app!

```js
import config from './config'

const firebaseId = config.get('firebase.id')
console.log(firebaseId) // 171721 (from stage values)
```

*The value in `firebaseId` will be set with a [Precendence order](##precedence-order)*

## The schema

Each setting in the schema has the following possible **properties**:

#### Format (`format`)

Specifies a format. When you want to get a setting, the format check is performed and if it fails an error is thrown.

- `"*"` (default): Any value is accepted
- `"string"`
- `"int"`
- `"url"`
- `"email"`

#### Environment variable (`env`)
Used for more sensitive variables, such as third party API KEYS services. If you provide a `env` property, `stages-config` will look for that setting in `process.env`

```js
  jwt: {
    format: 'string',
    env: 'JWT_SECRET'
  },
```
> Based in this piece of schema, `stages-config` will look in `process.env.JWT_SECRET` for the `jwt` setting when called.

#### Default value (`default`)
If the value of a setting is the same for all stages and it is not sensitive data, or if you always want to have a fallback value, the property `default`  is useful for you


## Precedence order

When merging configuration values from different sources, stages-config follows precedence rules. The order, from highest to lowest, is:

1) Stages values
2) Environment variables
3) Default values

## Inspiration

This package is heavy inspired in `node-convict`.

## License

MIT