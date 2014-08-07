/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午2:40
 */

'use strict';

module.exports = function(grunt) {

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
      build: ['./.build'],
      dist: ['./dist/*']
    },

    concat: {
      css: {
        src: [
          './css/pro.css',
          './css/main.css'
        ],
        dest: './.build/css/app.min.css'
      }
    },

    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      app: {
        files: {
          './.build/css/app.min.css': './css/app.min.css'
        }
      }
    }

  });

  // 加载需要的Grunt插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  /*grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-update-submodules'); // 负责初始化和更新submodule
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify'); // 压缩js
  grunt.loadNpmTasks('grunt-size'); // 报告文件大小
  grunt.loadNpmTasks('grunt-jsbint'); // 代码规范检测
  grunt.loadNpmTasks('grunt-contrib-watch'); // 监听文件变化
  grunt.loadNpmTasks('grunt-zip'); // 压缩文件和解压文件*/

  // 合并lib中的组建
  grunt.registerTask('default', ['clean', 'concat:css', 'cssmin']);

  // 发布任务
  //grunt.registerTask('publish', []);

};