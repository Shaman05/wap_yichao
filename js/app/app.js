/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午7:43
 */

require.config({
  baseUrl: './js',
  urlArgs: 't=1411724388324',
  waitSeconds: 200,
  paths: {
    /*****Core*****/
    'zepto': 'lib/zepto',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'artTemplate': 'lib/template',

    /*****plugin*****/
    'text': 'plugin/text',
    'fastClick': 'plugin/fastclick',

    /*****app*****/
    'config': 'app/config',
    'util': 'app/common/util',
    'events': 'app/common/events',
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

require(['router', 'artTemplate', 'helper'], function (router, artTemplate) {

  "use strict";

  _.artTemplate = artTemplate;
  APP.config.template.call(_);

  new router();

  /*require(['fastClick'], function (fc) {
    fc.attach(document.body);
  });*/

});