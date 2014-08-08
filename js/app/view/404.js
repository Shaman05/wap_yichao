/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:32
 */

"use strict";

define(['app/view/baseView', 'text!app/template/404.html'], function(baseView, tpl){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'page-404',
      render: function(){
        this.$el.html(tpl);
      }
    })
  );

});