#! /usr/bin/env node

'use strict';

const fs = require('fs');
const YAML = require('yaml');

function combine(filepath, content) {

  const patharray = filepath.split('/');
  const filename = patharray.splice(patharray.length-1)[0];
  const directory = patharray.join("/");

  const raw = fs.readFileSync(filepath, 'utf8');
  const ruleset = YAML.parse(raw);

  for (const [key, value] of Object.entries(ruleset)) {
    if (key === "extends") {
      for (var i = 0; i < value.length; i++) {
        const extend = value[i];
        const temppath = extend.split('/').slice(1).join("/");
        if (fs.existsSync(temppath)) {
          combine(directory + "/" + temppath, content);
        } else {
          console.log("Adding ruleset source " + extend);
          content["extends"].push(extend);
        }
      }
    } else {
      console.log("Gathering rules from " + filepath);
      content["rules"] = {...content["rules"], ...value};
    }
  }

  return content;
}

// parse args
var argv = require('yargs/yargs')(process.argv.slice(2))
  .alias('i', 'input')
  .describe('i', 'The input file. Should be the top-level ruleset yaml document.')
  .alias('o', 'output')
  .describe('o', 'The output file. Will be a single yaml document containing all rules.')
  .demandOption(['i', 'o'])
  .usage('Usage: $0 -i [input_file] -o [output_file]')
  .argv;

var content = new Object({
  extends: new Array(),
  rules: new Object()
});

const everything = combine(argv.input, content);
fs.writeFile(argv.output, YAML.stringify(content, {lineWidth: 0}), function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("Complete!")
  }
});
