/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午8:02
 */

'use strict';

define(['util'], function(util) {

  requirejs.onError = function (err) {
    console.log(err.requireType);
    //todo
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
      hash = hash || 'ac=home';
      var params = util.getParam(hash);
      var ac = params['ac'] || '404';
      require(['app/view/' + ac], function(view){
        new view(params);
      });
    }

  });

});