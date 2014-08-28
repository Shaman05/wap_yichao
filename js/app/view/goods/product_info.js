"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_info.html',
  'text!app/template/goods/ajax_comments.html',
  'app/service/api'
], function(baseView, infoTpl, commentsTpl, api){

  var page = 1;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new api,
      ready: function(data){
        $("#jSlider").slider({
          direction: "left",
          height: 150
        });

        //商品信息
        this.model.goodsInfo(data.GoodsID, function(d){
          var renderFn = _.artTemplate.compile(infoTpl);
          $('#proInfoBox').html(renderFn(d.data[0]));
        });
        //评论
        /*this.model.goodsComments(data.GoodsID, page, function(d){
          var renderFn = _.artTemplate.compile(commentsTpl);
          $('#commentsWrap').html(renderFn({
            list: d.data
          }));
        });*/
      }
    })
  );

});