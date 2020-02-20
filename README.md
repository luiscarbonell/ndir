# ndir
> Make Node.js repositories

* Repositories have `README.md`
* Repositories have `package.json`
  * With dependency `lodash`
  * With dependency `neo-async`
  * With dependency `chalk`
  * With dev dependency `nodemon`
  * With dev dependency `typescript`
  * With dev dependency `ts-node`
  * With dev dependency `@types/node`
  * With dev dependency `chai`
  * With dev dependency `mocha`
  * With dev dependency `npm-consider`
* Repositories have `index.js` - _optionally `
index.ts`_

### Tools

* [`shelljs`](https://www.npmjs.com/package/shelljs): executing shell commands in node
* [`minimist`](https://www.npmjs.com/package/minimist): parsing CLI arguments in node

### API

```
ndir <DIRECTORY> [--package | -p] [--typescript | -t] [--no-readme]
```
___

Create a directory/folder called `"example-default"` with a `README.md`

```
ndir "example-default"
```
___

Create a directory/folder called `"example-package"` with a `README.md`, `package.json`, and `index.js`

```
ndir "example-package" --package 
# OR
ndir "example-package" -p
```
___

Create a directory/folder called `"example-typescript-package"` with a `README.md`, `package.json`, `index.ts`. 

```
ndir "example-typescript-package" --typescript
# OR
ndir "example-typescript-package" -t
```

_NOTE: if `--typescript` or `-t` options are set, `--package` will also be set (i.e. a `package.json` will be created)_