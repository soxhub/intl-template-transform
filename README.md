# Intl Template Transform

## What it does?

This repo provides an AST transform to convert

## icon-transform.js

There is icon-transform.js to add no-bare-strings above auditboard-icons

```
{{! template-lint-disable no-bare-strings }}
{{! TODO: non translatable icon }}
<i class="auditboard-icons">
  close
</i>
```

### How to run icon-transform.js

- run icon-transform.js
- run format hbs files

```
npx ember-template-recast path-to-file-or-directory -t path-to/icon-transform.js
npm run format:hbs
```

## Compatibility

- Node.js v14 or above

## Installation

## License

This project is licensed under the [MIT License](LICENSE.md).
