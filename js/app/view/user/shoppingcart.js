"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_cartList.html',
  'text!app/template/user/yanGuangDan.html',
  'app/service/api'
], function(baseView, tpl, yanGDTpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'cart-page',
      model: new model,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        this.getCartList(data);
      },
      getCartList: function(data){
        this.model.cartList(data.goodsName, data.goodsId, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#cartWrap').html(renderFn({
            list: d.data,
            goodsName: data.goodsName,
            goodsId: data.goodsId
          }));
        });
      }
    })
  );

});