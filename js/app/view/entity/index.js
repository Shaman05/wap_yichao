"use strict";

define([
  'app/view/baseView',
  'text!app/template/entity/ajax_info.html',
  'text!app/template/entity/ajax_otherEntity.html',
  'app/service/api'
], function(baseView, infoTpl, otherTpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        this.getInfo(data);
        this.getOtherEntity(data);
      },
      getInfo: function(data){
        this.model.entityInfo(data.ShopID, function(d){
          var info = d.data[0];
          var renderFn1 = _.artTemplate.compile(infoTpl);
          $('#pageName').text(info['ShopName']);
          $('#infoWrap').html(renderFn1(info));
          $('#findShop').html(info['FindShop']);
        });
      },
      getOtherEntity: function(data){
        //todo
      }
    })
  );

});