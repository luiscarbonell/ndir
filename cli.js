#!/usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk')
const args = require('minimist')(process.argv.slice(2));

// Default options
let options = {
  'name': '', // string
  'readme': true, // boolean
  'package': false, // boolean
  'typescript': false // boolean
}

// console.log(args);

// No directory was specified, throw reference serror
if(args._[0] == undefined) {
  throw new ReferenceError(`\nMissing argument [DIRECTORY] in\nndir <DIRECTORY> [--package | -p] [--typescript | -t]\n\nTo fix, include a string after "ndir" command\ne.g. "ndir 'example'"`); 
  process.exit(1);
}
// Set directory name
else {
  options.name = args._[0];
}

if(args['no-readme']) options.readme = false;
if(args['package'] || args['p'] || args['typescript'] || args['t']) options.package = true;
if(args['typescript'] || args['t']) options.typescript = true;

// console.log(options);

const createREADME = (name) => {
  shell.exec(`echo '# ${name}' > README.md`)
}
const createPackage = () => {
  console.log("Creating package");

  const [name_key, name] = shell.exec('git config --list | grep user.name').stdout.split('=');
  const [email_key, email] = shell.exec('git config --list | grep user.email').stdout.split('=');

  shell.exec(`sudo npm config set init-author-name "${name}" -g`);
  shell.exec(`sudo npm config set init-author-email "${email}" -g`);
  shell.exec('sudo npm config set init-license "GPLv3" -g');
  shell.exec('npm init -y');

  const global_dependencies = ["nodemon", "typescript", "ts-node", "mocha", "npm-consider"];
  const types = ["@types/node", "@types/mocha", "@types/chai"];
  const dev_dependencies = [...global_dependencies, ...types, "chai"];
  const dependencies = ["lodash", "neo-async", "chalk"];

  shell.exec(`sudo npm i -g ${global_dependencies.join(' ')}`);
  shell.exec(`npm i -D ${dev_dependencies.join(' ')}`);
  shell.exec(`npm i -S ${dependencies.join(' ')}`);

  console.log("Created packaged");
}
const createJavaScriptFile = () => {
  shell.touch("index.js");
}
const createTypescriptFile = () => {
  shell.touch("index.ts");
}

// Create directory/folder
shell.mkdir('-p', options.name);
shell.cd(options.name);

// Create README.md
if(options.readme) createREADME(options.name);
// Create package
if(options.package) {
  createPackage();

  // Create files
  if(options.typescript) createTypescriptFile();
  else createJavaScriptFile();
}