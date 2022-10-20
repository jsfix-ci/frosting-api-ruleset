#! /usr/bin/env node

"use strict";

const fs = require("fs-extra");
const path = require("path");
const URL = require("url").URL;
const YAML = require("yaml");
const archiver = require("archiver");

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

function combine(filepath, content, outDirectory) {
  const patharray = filepath.split("/");
  const filename = patharray.splice(patharray.length - 1)[0];
  const directory = patharray.join("/");

  const raw = fs.readFileSync(filepath, "utf8");
  const ruleset = YAML.parse(raw);

  // check for custom functions subdirectory
  const funcDirectory = path.join(path.dirname(filepath), "functions");
  const outFuncDirectory = path.join(outDirectory, "functions");
  if (fs.existsSync(funcDirectory)) {
    fs.copySync(funcDirectory, outFuncDirectory, { "overwrite": true });
    console.log("Wrote custom functions to " + path.join(outDirectory, "functions"));
  }

  for (const [key, value] of Object.entries(ruleset)) {
    if (key === "extends") {
      for (var i = 0; i < value.length; i++) {
        // create extend path for checking
        const extend = value[i];
        const extendPath =
          directory + "/" + extend.split("/").slice(1).join("/");

        if (stringIsAValidUrl(extend)) {
          console.log("Adding ruleset source " + extend);
          content["extends"].push(extend);
        } else if (fs.lstatSync(extendPath).isFile()) {
          combine(extendPath, content, outDirectory);
        } else {
          console.log("Adding ruleset source " + extend);
          content["extends"].push(extend);
        }
      }
    } else if (key === "functions") {
      console.log("Gathering function references from " + filepath);
      content["functions"] = new Set([...content["functions"], ...value]);
    } else {
      console.log("Gathering rules from " + filepath);
      content["rules"] = { ...content["rules"], ...value};
    }
  }

  return content;
}

// parse args
var argv = require("yargs/yargs")(process.argv.slice(2))
  .alias("i", "input")
  .describe(
    "i",
    "The input file. Should be the top-level ruleset yaml document."
  )
  .alias("o", "output")
  .describe(
    "o",
    "The output without file extensions."
  )
  .demandOption(["i", "o"])
  .usage("Usage: $0 -i [input_file] -o [output]").argv;


var content = new Object({
  extends: new Array(),
  rules: new Object(),
  functions: new Set(),
});


// make buid filepath if dne
const buildDirectory = path.join(path.dirname(__dirname), "build");
fs.rmSync(buildDirectory, { recursive: true, force: true })
fs.mkdirSync(buildDirectory);

// recursively build ruleset
const everything = combine(argv.input, content, buildDirectory);

// write ruleset file to build directory
const outFile = path.join(buildDirectory, "ruleset.yaml");
fs.writeFile(
  outFile,
  YAML.stringify(content, { lineWidth: 0 }),
  function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log("Complete!");
    }
  }
);

// make filepath if dne
const outDirectory = path.join(path.dirname(__dirname), "dist");
if (!fs.existsSync(outDirectory)) {
  fs.mkdirSync(outDirectory);
}

const out = path.join(outDirectory, argv.output) + ".zip";
var stream = fs.createWriteStream(out);
var archive = archiver('zip');

stream.on('close', function () {
  console.log("Ruleset " + argv.output + " written to " + out);
});

archive.on('error', function (err) {
  throw err
});

archive.pipe(stream);
archive.directory(buildDirectory, false);
archive.finalize();
