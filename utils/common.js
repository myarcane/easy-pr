'use strict'

const colors = require('colors')
const exec = require('child_process').exec
const spawn = require('child_process').spawn

// Shared environement accors modules
const env = {}

// Shared environement accors modules
const setenv = (key, value) => {
  env[key] = value
}
const getenv = (key) => {
  return env[key]
}

// A Promise wrapper around node's child_process.exec() method
const runCommand = (cmd, { verbose = getenv('verbose') || false } = {}) => {
  return new Promise((resolve, reject) => {
    if (verbose) {
      console.log(colors.blue.bold('> '), cmd)
    }
    exec(cmd, (err, stdout, stderr) => {
      // sometimes (e.g. eslint) we have a meaningful stdout along with the stderr
      const errorMsg = stdout ? `${stdout}\n\n${stderr}` : stderr
      err != null ? reject(errorMsg) : resolve(stdout)
    })
  })
}

module.exports = {
  setenv,
  getenv,
  runCommand,
}
