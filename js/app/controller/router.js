/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午8:02
 */

'use strict';

define(['backbone', 'util'], function(backbone, util) {

  requirejs.onError = function (err) {
    console.log(err.requireType);
    //todo
  };

  return backbone.Router.extend({

    initialize: function() {
      backbone.history.start({
        pustState: true
      });
    },

    //路由规则例如: #ac=user.login(用户登录)
    routes: {
      '*ac': 'action'
    },

    action: function(hash) {
      var params = util.getParam(hash);
      console.log(params);
      var ac = params['ac'];
      if(!ac){
        this['four0four'](params);
      }else{
        ac = ac.replace('.', '/');
        require(['app/view/' + ac], function(view){
          new view(params);
        });
      }
    },

    four0four: function(params){
      console.log('404 page! params:' , params);
    }
  });

});