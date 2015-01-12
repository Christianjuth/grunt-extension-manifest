/*
 * grunt-extension-manifest
 * https://github.com/christianjuth/grunt-extension-manifest
 *
 * Copyright (c) 2014 Christian Juth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    extension_manifest: {
      default: {
        file: 'test.safariextension/fixtures/test.json',
        dest: 'test.safariextension/'
      }
    },

    // Unit tests.
//    nodeunit: {
//      tests: ['test/*_test.js']
//    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('xmlbuilder');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'extension_manifest', 'nodeunit']);

  // By default, lint and run all tests.
//  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('default', ['clean','extension_manifest']);

};
