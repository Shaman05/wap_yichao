"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_brandList.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'brand-page',
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
          var $box = $('#brandBox');
          if(d.data && d.data.length > 0){
            $box.css('background', '#000000');
          }
          var renderFn = _.artTemplate.compile(tpl);
          $box.html(renderFn({
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