/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午2:40
 */

module.exports = function(grunt) {

  'use strict';

  var appJsPath = './js/app/app.js';
  var indexFile = './index.html';
  var appJsContent = grunt.file.read(appJsPath, 'utf8');
  var indexContent = grunt.file.read(indexFile, 'utf8');
  var newVersion = new Date().getTime();
  var newAppJs = appJsContent.replace(/urlArgs:\s't=.*',/ig, "urlArgs: 't=" + newVersion + "',");
  var newIndex = indexContent.replace(/pub_time=.*e/ig, "pub_time=" + newVersion + "e");
  if(!grunt.file.write(appJsPath, newAppJs, 'utf8')){
    console.log('重写 ' + appJsPath + ' 文件失败！');
    return;
  }else{
    console.log('\n已替换新的 javascript 版本号：' + newVersion);
  }
  if(!grunt.file.write(indexFile, newIndex, 'utf8')){
    console.log('重写 ' + indexFile + ' 文件失败！');
    return;
  }else{
    console.log('已替换新的 js & css 版本号：' + newVersion + '\n');
  }

  // wrap配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // 加载配置文件
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> \n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    clean: {
      dist: ['./dist/*'],
      build: ['./.build']
    },

    concat: {
      css: {
        src: [
          './css/common.css'
        ],
        dest: './.build/css/common.css'
      },
      js: {
        src: [
          './js/lib/zepto.js',
          './js/lib/underscore.js',
          './js/lib/backbone.js',
          './js/lib/template.js',
          './js/app/config.js',
          './js/app/app.js'
        ],
        dest: './.build/js/app.js'
      }
    },

    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      common: {
        files: {
          './dist/common.min.css': './.build/css/common.css'
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      appjs: {
        files: {
          './dist/app.min.js': [
            './.build/js/app.js'
          ]
        }
      }
    },

    requirejs: {
      main: {
        options: {
          baseUrl: "dist/js",
          paths: {
            //Core Libraries
            'zepto': 'lib/zepto',
            'underscore': 'lib/underscore',
            'gmu': 'lib/gmu',
            'backbone': 'lib/backbone',
            'fastClick': 'lib/fastclick',
            //base
            'config': 'app/base/config',
            'common': 'app/base/common',
            'pageTitle': 'app/base/title',
            //plugin
            'text': 'plugin/text', //require插件，用于加载html
            'page': 'app/base/page', //提供转场等功能

            'iKeyboardScroll': 'plugin/iKeyboardScroll4',
            'artTemplate': 'lib/template',
            'helper': 'app/base/helper',

            'countDown': 'plugin/countdown',
            'validator': 'plugin/validator', //验证插件

            /******************************app*****************************/
            'router': 'app/router/router'
          },
          shim: {
            'zepto': {
              'exports': '$'
            },
            'artTemplate': {
              'exports': 'artTemplate'
            },
            'helper': {
              'deps': ['artTemplate']
            },
            'gmu': {
              'deps': ['zepto']
            },
            'underscore': {
              'exports': '_'
            },
            'backbone': {
              'deps': ['zepto', 'underscore'],
              'exports': 'Backbone'
            }
          },
          include: [
            'app.min',
            'iKeyboardScroll',
            'fastClick'
          ],
          out:"dist/js/app.min.js"
        }
      }
    }

  });

  // 加载需要的Grunt插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  /*grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-update-submodules'); // 负责初始化和更新submodule
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-size'); // 报告文件大小
  grunt.loadNpmTasks('grunt-jsbint'); // 代码规范检测
  grunt.loadNpmTasks('grunt-contrib-watch'); // 监听文件变化
  grunt.loadNpmTasks('grunt-zip'); // 压缩文件和解压文件*/

  grunt.registerTask('default', [
    'clean:dist',
    'concat',
    'cssmin',
    'uglify',
    'requirejs',
    //'copy',
    'clean:build'
  ]);

};