"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_cartList.html',
  'text!app/template/user/yanGuangDan_edit.html',
  'text!app/template/user/yanGuangDan_select.html',
  'app/service/api'
], function(baseView, tpl, yanEditTpl, yanSelectTpl, model){

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
      },
      toEditYGD: function($wrap){
        $wrap.html(yanEditTpl).show();
      },
      toSelectYGD: function($wrap){
        $wrap.html(yanSelectTpl).show();
      }
    })
  );

});