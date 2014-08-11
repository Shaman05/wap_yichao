/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午8:02
 */

'use strict';

define(['util'], function(util) {

  requirejs.onError = function (err) {
    var typeErr = err.requireType;
    //todo
    if(typeErr == 'scripterror'){
      window.location.hash = '#ac=404';
    }
  };

  return Backbone.Router.extend({

    initialize: function() {
      Backbone.history.start({
        pustState: true
      });
    },

    routes: {
      '*ac': 'action'
    },

    action: function(hash) {
      hash = hash || APP.config.homeAction;
      var params = util.getParam(hash);
      var ac = params['ac'] || '404';
      APP.ac = ac;
      ac = ac.replace(/\./g, '/');
      require(['app/view/' + ac, 'text!app/template/' + ac + '.html'], function(view, tpl){
        params._APP_TPL = tpl;
        new view(params, tpl);
      });
    }

  });

});