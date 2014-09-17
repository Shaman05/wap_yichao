"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_info.html',
  'text!app/template/goods/ajax_comments.html',
  'text!app/template/public/imgSlider.html',
  'app/service/api'
], function(baseView, infoTpl, commentsTpl, sliderTpl, api){

  var page = 1;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'product_info-page',
      model: new api,
      ready: function(data){
        this.imgSlider(data);
        //商品信息
        this.model.goodsInfo(data.GoodsID, function(d){
          var renderFn = _.artTemplate.compile(infoTpl);
          $('#proInfoBox').html(renderFn(d.data[0]));
          $('#CommentTimes').text(d.data[0]['CommentTimes']);
        });
        this.getComments(data);
      },
      getComments: function(data){
        //评论
        this.model.goodsComments(data.GoodsID, page, function(d){
          var renderFn = _.artTemplate.compile(commentsTpl);
          $('#commentsWrap').html(renderFn({
            list: d.data
          }));
        });
      },
      imgSlider: function(data){
        this.model.goodsInfoSlider(data.GoodsID, function(d){
          var renderFn = _.artTemplate.compile(sliderTpl);
          $('#jSlider')
            .html(renderFn({
              list: d.data
            }))
            .slider({
              direction: "left",
              height: 250
            });
        });
      }
    })
  );

});