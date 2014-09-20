"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_groupBuyList.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'groupBuy-page',
      model: new model,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        if(!data.GoodsTypeID){
          data.GoodsTypeID = "";
        }
        if(!data.SetName){
          data.SetName = "";
        }
        this.model.groupBuyList(data.GoodsTypeID, data.SetName, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#groupBox').html(renderFn({
            showPaging: false,
            list: d.data,
            goodsTypeId: data.GoodsTypeID,
            SetName: data.SetName,
            pageIndex: data.PageIndex,
            total: d.nPageCount,
            pageSize: APP.config.pageSize
          }));
        });
      }
    })
  );

});