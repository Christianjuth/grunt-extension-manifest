/*
 * grunt-extension-manifest
 * https://github.com/christianjuth/grunt-extension-manifest
 *
 * Copyright (c) 2014 Christian Juth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('extension_manifest', 'Compile one manifest for chrome and safari extensions.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      file : "config.json"
    });

    var json = grunt.file.readJSON(this.data.file);
    var chrome = {
      name : json.name,
      version : json.version
    }

    // Write the destination file.
    grunt.file.write('maifest.json', JSON.stringify(chrome, null, 2));

    // Print a success message.
    grunt.log.writeln('Compiled Chrome and Safari Manifests!');
  });

};
