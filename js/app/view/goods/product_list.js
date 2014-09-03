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
        this.getGoodsList(data);
      },
      getGoodsList: function(data){
        this.model.goodsList(data.GoodsTypeID, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#proWapper').html(renderFn({
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