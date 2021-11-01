const { transform } = require('ember-template-recast');
const visitor = require('./transform');
const fs = require('fs/promises');

async function main() {
    try {
        let template = await fs.readFile('./test.hbs', { encoding: 'utf-8' });
        let { code } = transform(template, visitor);
        console.log(code);
    }
    catch (err) {
        console.error(err);
    }
}

main();
