/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午4:55
 */

define(['app/view/baseView', 'app/model/userModel'], function(baseView, model){

  "use strict";

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'user-login',
      model: new model,
      events: {
        'click #loginBtn': 'doLogin'
      },
      doLogin: function(){
        console.log(new Date());
      }
    })
  );

});