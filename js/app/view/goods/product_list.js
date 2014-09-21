"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_list.html',
  'app/service/api'
], function(baseView, tpl, api){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new api,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        if(!data.PropertyID){
          data.PropertyID = "";
        }
        if(!data.ValueID){
          data.ValueID = "";
        }
        this.getGoodsList(data);
      },
      getGoodsList: function(data){
        this.model.goodsList(data.GoodsTypeID, data.PropertyID, data.ValueID, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#proWapper').html(renderFn({
            showPaging: true,
            list: d.data,
            goodsTypeId: data.GoodsTypeID,
            PropertyID: data.PropertyID,
            ValueID: data.ValueID,
            pageIndex: data.PageIndex,
            total: d.nPageCount,
            pageSize: APP.config.pageSize
          }));
        });
      }
    })
  );

});