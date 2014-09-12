"use strict";

define([
  'app/view/baseView',
  'text!app/template/entity/ajax_info.html',
  'text!app/template/entity/ajax_sub_entity_list.html',
  'text!app/template/entity/ajax_otherEntity.html',
  'app/service/api'
], function(baseView, infoTpl, otherSubTpl, otherTpl, model){

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
          $('#cityName').text(info['Province']);
          $('#infoWrap').html(renderFn1(info));
          $('#findShop').html(info['FindShop']);
          $("#jSlider").slider({
            direction: "left",
            height: 150
          });
        });
      },
      getOtherEntity: function(data){
        this.model.subEntityList(data.cityID, function(d){
          var renderFn = _.artTemplate.compile(otherSubTpl);
          var html = renderFn({
            list: d.data,
            cityID: data.cityID
          });
          $('#otherSubEntityList').html(html);
        });
        this.model.entityCity(function(d){
          var renderFn = _.artTemplate.compile(otherTpl);
          $('#allEntityPro').html(renderFn({
            list: d.data
          }));
        });
      }
    })
  );

});