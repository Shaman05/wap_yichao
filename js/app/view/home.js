/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:32
 */

"use strict";

define(['app/view/baseView', 'text!app/template/home.html'], function(baseView, tpl){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null,
      _render: function(){
        return tpl;
      }
    })
  );

});