"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_orderItem.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'myOrderList-page',
      model: new model,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        this.getOrderList(data);
      },
      getOrderList: function(data){
        this.model.orderList(data.goodsName, data.goodsId, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#myOrderList').html(renderFn({
            showPaging: true,
            list: d.data,
            goodsName: data.goodsName,
            goodsId: data.goodsId,
            pageIndex: data.PageIndex,
            total: d.nPageCount,
            pageSize: APP.config.pageSize
          }));
        });
      }
    })
  );

});