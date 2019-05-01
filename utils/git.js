'use strict'
const { runCommand } = require('../utils/common.js')

/** ************************
 * A few git helper functions
 ***************************/

const gitGetCurrentBranch = () => {
  return runCommand('git rev-parse --abbrev-ref HEAD')
    .then((stdout) => {
      return stdout.trim()
    })
    .catch(() => false)
}

const gitIsCurrentBranchPushed = (branch) => {
  return runCommand(`git ls-remote --heads origin ${branch} | wc -l`).then(function(str) {
    return { branch, pushed: parseInt(str) === 1 }
  })
}

module.exports = {
  gitGetCurrentBranch,
  gitIsCurrentBranchPushed,
}
