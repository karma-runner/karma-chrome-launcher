module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-npm')
  grunt.initConfig({
    pkgFile: 'package.json',
    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    }
  })
}
