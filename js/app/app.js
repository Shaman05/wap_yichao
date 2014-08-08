/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午7:43
 */

'use strict';

require.config({
  baseUrl: './js',
  urlArgs: 't=1407505051006',
  waitSeconds: 200,
  paths: {
    /*****Core*****/
    'zepto': 'lib/zepto',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'artTemplate': 'lib/template',

    /*****plugin*****/
    'text': 'plugin/text',

    /*****app*****/
    'config': 'app/config',
    'util': 'app/common/util',
    'helper': 'app/common/helper',
    'router': 'app/controller/router'
  },
  //配置依赖项
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
    'underscore': {
      'exports': '_'
    },
    'backbone': {
      'deps': ['zepto', 'underscore'],
      'exports': 'Backbone'
    },
    'router': {
      'deps': ['backbone', 'config'],
      'exports': 'router'
    }
  }
});

require(['router', 'artTemplate'], function (router, artTemplate) {

  _.artTemplate = artTemplate;
  APP.config.template.call(_);

  new router();
});