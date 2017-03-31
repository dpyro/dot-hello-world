# dot-hello-world

[![Build Status](https://travis-ci.org/dpyro/dot-hello-world.svg?branch=master)](https://travis-ci.org/dpyro/dot-hello-world)
[![Dependencies](https://david-dm.org/dpyro/dot-hello-world/status.svg)](https://david-dm.org/dpyro/dot-hello-world)
[![Dependencies](https://david-dm.org/dpyro/dot-hello-world/dev-status.svg)](https://david-dm.org/dpyro/dot-hello-world)
[![bitHound Overall Score](https://www.bithound.io/github/dpyro/dot-hello-world/badges/score.svg)](https://www.bithound.io/github/dpyro/dot-hello-world)

How many config files does it take to build a modern Typescript app?
Let's find out!

## Quickstart

1. Install `gulp`.

    ```shell
    npm install --global gulp
    ```

1. Install dependencies.

    ```shell
    npm install
    ```

1. Build it.

    ```shell
    gulp
    ```

1. Run it.

    ```shell
    node dist/index.js
    ```

    *or*

    ```shell
    npm start
    ```

## Commands

- `gulp`: build
- `gulp watch`: watchify and build TypeScript files
- `gulp lint`
- `gulp test`: build and test
- `gulp doc`: output documentation to `doc/`
- `gulp clean`
- `npm start`: run
- `npm run cover`: stores coverage information in `coverage/`

## Packages

- `@types/node`: Gives TypeScript access to node globals such as `require` and `module`.
- `del`: Allows `gulpfile.js` to delete files.
- `eslint`: JavaScript linter.
- `gulp`: JavaScript task runnner with task dependency management.
- `gulp-eslint`: Gulp plugin for ESLint.
- `gulp-mocha`: Gulp plugin for Mocha.
- `gulp-tslint`: Gulp plugin for TSLint.
- `gulp-typedoc`: Gulp plugin for TypeDoc.
- `gulp-typescript`: Gulp plugin for Typescript.
- `istanbul`: JavaScript code coverage instrumentation library.
- `mocha`: JavaScript test framework.
- `standard`: Opinionated JavaScript linting style.
- `tslint`: TypeScript linter.
- `typedoc`: TypeScript documentation generator.
- `typescript`: Typed JavaScript superset language.
