"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_list.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        if(!data.GoodsTypeID){
          data.GoodsTypeID = "";
        }
        this.getBrandList(data);
      },
      getBrandList: function(data){
        this.model.goodsBrand(data.GoodsTypeID, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#brandBox').html(renderFn({
            list: d.data,
            goodsTypeId: data.GoodsTypeID,
            pageIndex: data.PageIndex,
            total: d.nPageCount,
            pageSize: APP.config.pageSize
          }));
        });
      }
    })
  );

});