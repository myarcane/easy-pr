#!/usr/bin/env node

'use strict'

const program = require('commander')
const commandExists = require('command-exists')
const { setenv, runCommand } = require('./utils/common.js')
const { gitGetCurrentBranch, gitIsCurrentBranchPushed } = require('./utils/git.js')
const { writeFileSynch, removeFileSynch } = require('./utils/fs.js')
const { GIPHY_RANDOM_ENDPOINT, queryGiphy } = require('./services/giphy.js')

const TEMPLATE_FILE_NAME = 'pull_request_template.md'

const getPullRequestTemplate = ({ giphyUrl }) => {
  return `PR title

### Description
[Optional]

Brief description of the purpose of the ticket or of the changes introduced in the PR.

### TODOS
- [ ] Example TODO

----

![giphy](${giphyUrl})`
}

const removeTemplateFile = () => {
  removeFileSynch(TEMPLATE_FILE_NAME)
}

const writeTemplateFile = (message) => {
  writeFileSynch(TEMPLATE_FILE_NAME, message)
}

const isHubInstalled = () => {
  return commandExists('hub')
}

const pullRequestWithHub = () => {
  return runCommand(`hub pull-request -F ${TEMPLATE_FILE_NAME}`)
}

const cmdStart = (state) => {
  gitGetCurrentBranch()
    .then((branch) => {
      state.branch = branch
      return gitIsCurrentBranchPushed(branch)
    })
    .then((status) => {
      if (!status.pushed) {
        throw new Error(`Branch not pushed ! Push before pull requesting`)
      } else {
        return isHubInstalled()
      }
    })
    .then(() => {
      return queryGiphy(GIPHY_RANDOM_ENDPOINT, { tag: state.tag })
    })
    .then(({ data: { images: { downsized_medium: { url } } } }) => {
      state.giphyUrl = url
      const message = getPullRequestTemplate(state)
      writeTemplateFile(message)
      state.isTemplateWritten = true
      return pullRequestWithHub()
    })
    .then(
      (prLink) => {
        console.log(prLink)
      },
      (err) => {
        console.log(err)
      }
    )
    .then(() => {
      if (state.isTemplateWritten) {
        removeTemplateFile()
        state.isTemplateWritten = false
      }
    })
}

let tag

program
  .version('0.0.1')
  .allowUnknownOption()
  .description('Easy PR is CLI script to ease pull requesting')
  .usage('<tag>')
  .option('-v, --verbose', 'Verbose mode. A lot more information output.')
  .action((arg) => {
    tag = arg
  })

program.parse(process.argv)

setenv('verbose', program.verbose)

if (program) {
  cmdStart({ tag })
}
