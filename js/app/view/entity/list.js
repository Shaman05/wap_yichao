"use strict";

define([
  'app/view/baseView',
  'text!app/template/entity/ajax_entity_list.html',
  'text!app/template/entity/ajax_sub_entity_list.html',
  'app/service/api'
], function(baseView, listTpl, subListTpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(){
        this.getEntityList();
      },
      getEntityList: function(){
        this.model.entityCity(function(d){
          var renderFn = _.artTemplate.compile(listTpl);
          $('#entityListWrap').html(renderFn({
            list: d.data
          }));
        });
      },
      getSubEntityList: function(cityID, callback){
        this.model.subEntityList(cityID, function(d){
          var renderFn = _.artTemplate.compile(subListTpl);
          var html = renderFn({
            list: d.data,
            cityID: cityID
          });
          callback(html);
        });
      }
    })
  );

});