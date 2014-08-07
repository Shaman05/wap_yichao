//配置require
require.config({
  baseUrl: './js',
  urlArgs: 't=1407419714540',
  paths: {
    //Core Libraries
    'zepto': 'lib/zepto',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'artTemplate': 'lib/template',

    /******************************app*****************************/
    'config': 'app/config',
    'helper': 'app/common/helper',
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

require(['backbone', 'artTemplate', 'underscore'], function (Backbone, t, _) {
  console.log(Backbone);
  console.log(t);
  console.log(_);
});