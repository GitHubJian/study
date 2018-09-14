const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

execSync('node_modules/.bin/jsdoc -c jsdoc.config.json -d js11111')
const fileContent = execSync('node_modules/.bin/jsdoc2md jsdoc/*.js -d jsdocs');

writeFileSync('./readme.md', fileContent);
