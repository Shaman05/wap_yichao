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
        var StatusID = ''; //订单状态, 传空值查询用户所有订单
        this.model.orderList(StatusID, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#myOrderList').html(renderFn({
            showPaging: true,
            list: d.data,
            StatusID: StatusID,
            pageIndex: data.PageIndex,
            total: d.nPageCount,
            pageSize: APP.config.pageSize
          }));
        });
      }
    })
  );

});