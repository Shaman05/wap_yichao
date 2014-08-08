/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午4:55
 */

"use strict";

define(['app/view/baseView', 'text!app/template/user/login.html'], function(baseView, tpl){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'user-login',
      model: null,
      _render: function(){
        return tpl;
      }
    })
  );

});