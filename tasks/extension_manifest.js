/*
 * grunt-extension-manifest
 * https://github.com/christianjuth/grunt-extension-manifest
 *
 * Copyright (c) 2014 Christian Juth
 * Licensed under the MIT license.
 */

//THIS EXTENSION REQUIRES XMLDOM
//install with "npm install xmldom"

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('extension_manifest', 'Compile one manifest for chrome and safari extensions.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      file : "config.json",
      dest : "."
    });

    //get settings
    var json = grunt.file.readJSON(this.data.file);



    //create chrome manifest.json
    var chrome = {
      'name' : json.name,
      'version' : json.version,

      'background' : {
        'page' : json.background
      }
    }



    //create safari info.plist
    var permissions = {
      '#list' : [
        {
          'key' : 'Level',
          'string' : json.permissions.websites? 'All' : 'None'
        },
        {
          'key' : 'Include Secure Pages'
        }
      ]
    }

    if (json.permissions.secureWebsites) {
      permissions['#list'][1]['true'] = '';
    } else {
      permissions['#list'][1]['false'] = '';
    }

    var popup = {
      'dict' : {
        '#list' : [
          {
            'key' : 'Filename',
            'string' : json.popup
          },
          {
            'key' : 'Height',
            'real' : '400'
          },
          {
            'key' : 'Width',
            'real' : '400'
          },
          {
            'key' : 'Identifier',
            'string' : 'popup'
          }
        ]
      }
    }


    var menu = {
      'dict' : {
        '#list' : [
          {
            'key' : 'Command',
            'string' : ''
          },
          {
            'key' : 'Popover',
            'string' : 'popup'
          },
          {
            'key' : 'Identifier',
            'string' : 'popupID'
          },
          {
            'key' : 'Image',
            'string' : 'menu-icons/icon-16.png'
          },
          {
            'key' : 'Label',
            'string' : json.name
          }
        ]
      }
    }

    if (json.popup == null) {
      menu.dict['#list'][0]['string'] = 'icon-clicked';
      menu.dict['#list'][1]['string'] = '';
      delete popup.dict
    }

    var safari = {
      'plist' : {
        '@version' : '1.0',
        'dict' : {
          '#list' : [
            {
              'key' : 'Builder Version',
              'string' : '10600.2.5'
            },
            {
              'key' : 'CFBundleDisplayName',
              'string' : json.name
            },
            {
              'key' : 'CFBundleIdentifier',
              'string' : json.bundleID
            },
            {
              'key' : 'CFBundleInfoDictionaryVersion',
              'string' : '6.0'
            },
            {
              'key' : 'CFBundleShortVersionString',
              'string' : json.version
            },
            {
              'key' : 'CFBundleVersion',
              'string' : json.bundleVersion
            },
            {
              'key' : 'Chrome',
              'dict' : {
                '#list' : [
                  {
                    'key' : 'Database Quota',
                    'real' : json.storage * 1048576
                  },
                  {
                    'key' : 'Global Page',
                    'string' : json.background
                  },
                  {
                    'key' : 'Popovers',
                    'array' : popup
                  },
                  {
                    'key' : 'Toolbar Items',
                    'array' : menu
                  }
                ]
              }
            },
            {
              'key' : 'Website',
              'string' : json.website
            },
            {
              'key' : 'Author',
              'string' : json.author
            },
            {
              'key' : 'Description',
              'string' : json.description
            },
            {
              'key' : 'Permissions',
              'dict' : permissions
            }
          ]
        }
      }
    }


    var builder = require('xmlbuilder')
    var safari = builder.create(safari)
    .dec('1.0', 'UTF-8', true)
    .dtd("-//Apple//DTD PLIST 1.0//EN","http://www.apple.com/DTDs/PropertyList-1.0.dtd")
    .root()
    .end({ pretty: true });



    // Write the destination file.
    grunt.file.write(this.data.dest + 'maifest.json', JSON.stringify(chrome, null, 2));
    grunt.file.write(this.data.dest + 'info.plist', safari);
    //    grunt.file.write(this.data.dest + 'settings.plist', chrome);

    // Print a success message.
    grunt.log.writeln('Compiled Chrome and Safari Manifests!');
  });

};
