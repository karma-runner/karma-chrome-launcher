const angularConfig = require('@commitlint/config-angular')
module.exports = {
  rules: {
    ...angularConfig.rules,
    'type-enum': [
      2,
      'always',
      // Also allow the "chore" commit type.
      ['chore'].concat(angularConfig.rules['type-enum'][2])
    ]
  }
}
