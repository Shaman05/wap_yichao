"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_address_list.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'selectAddress-page',
      model: new model,
      ready: function(){
        this.model.getArea(3, '', function(d){

        });
      }
    })
  );

});