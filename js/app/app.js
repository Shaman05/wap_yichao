//配置require
require.config({
  baseUrl: './js',
  urlArgs: 't=1407398345062',
  paths: {
    //Core Libraries
    'zepto': 'lib/zepto',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    //base
    'config': 'app/base/config',
    'artTemplate': 'lib/template',
    'helper': 'app/base/helper',

    /******************************app*****************************/
    'router': 'app/router/router'
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
    }
  }
});

require(['backbone'], function (Backbone) {
  console.log(Backbone);
});