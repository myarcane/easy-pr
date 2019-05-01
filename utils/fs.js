'use strict'

const fs = require('fs')

const writeFileSynch = (file, data) => {
  fs.writeFileSync(file, data)
}

const removeFileSynch = (file) => {
  fs.unlinkSync(file)
}

module.exports = {
  writeFileSynch,
  removeFileSynch,
}
