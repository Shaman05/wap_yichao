"use strict";

define([
  'app/view/baseView',
  'text!app/template/entity/ajax_entity_list.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        this.model.entityInfo(data.ShopID, function(d){

        });
      }
    })
  );

});