# mocha-line

Run mocha tests at a given line number.

## Why?

Mocha is a solid test runner, but it does not support running tests at a given
line number, instead opting for using a `--grep` matcher. This module aims to
augment that behavior by converting a given line number to a `--grep` pattern.

## Installation

```
yarn global add mocha-line
```

(Doesn't have to be `global`, but is easier this way)

## Usage

### Basic usage:

```
> mocha-line ./test/controllers/users.spec.js:72

UsersController.index\(\) returns a JSON list of users
```

### Usage with Mocha:

Mocha-line currently returns only the grep pattern, so this must be passed to
mocha:

```sh
NODE_ENV=test ./node_modules/.bin/mocha ./test/controllers/users.spec.js --grep "$( mocha-line ./test/controllers/users.spec.js:72 )"
```

This is a bit verbose and repetitive (something on the roadmap below), so it's
useful to map this to a script, like below in VSCode:

### Usage in VSCode:

To use within VSCode, set up your tasks.json file to include the following task:

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Test at Cursor (Mocha)",
      "type": "shell",
      "command": "NODE_ENV=test ./node_modules/.bin/mocha ${relativeFile} --grep \"$( mocha-line ${file}:${lineNumber} )\"",
      "group": "test",
      "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "new"
      }
    }
  ]
}
```

## Roadmap

- [x] Convert mocha test line numbers to basic grep pattern
- [ ] Improve grep pattern by including all nested `describe`s
- [ ] Spawn a mocha process directly from mocha-line (with mocha opts)

