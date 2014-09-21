"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_sort01_list.html',
  'text!app/template/goods/ajax_sort02_list.html',
  'text!app/template/goods/ajax_sort03_list.html',
  'app/service/api'
], function(baseView, tpl01, tpl02, tpl03, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'sort-page',
      model: new model,
      ready: function(data){
        this.goodTypeList();
      },
      goodTypeList: function(){
        this.model.goodsType(function(d){
          var renderFn = _.artTemplate.compile(tpl01);
          var listHtml = renderFn({list: d.data});
          $('#sortListWrap').html(listHtml);
        });
      },
      goodsPropertyList: function(GoodsTypeID, callback){
        this.model.goodsPropertyList(GoodsTypeID, function(d){
          var renderFn = _.artTemplate.compile(tpl02);
          var html = renderFn({
            list: d.data,
            GoodsTypeID: GoodsTypeID
          });
          callback(html);
        });
      },
      goodsPropertyByValueList: function(PropertyID, callback){
        this.model.goodsPropertyList(PropertyID, function(d){
          var renderFn = _.artTemplate.compile(tpl03);
          var html = renderFn({
            list: d.data,
            PropertyID: PropertyID
          });
          callback(html);
        });
      }
    })
  );

});