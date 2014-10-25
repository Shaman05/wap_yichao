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
        var _this = this;
        _this.imgSlider(data);
        //商品信息
        _this.model.goodsInfo(data.GoodsID, function(d){
          var info = d.data[0];
          _this.model.getGoodsSku(data.GoodsID, function(d){
            var renderFn = _.artTemplate.compile(infoTpl);
            info['skuList'] = d.data['skulist'];
            info['jingpian'] = d.data['jingpian'];
            info['sph'] = d.data['sph'];
            $('#proInfoBox').html(renderFn(info));
            data.commentsTimes = info['CommentTimes'];
            $('#details_img').html(info['Description']);
            _this.getComments(data);
          });
        });
      },
      getComments: function(data){
        //评论
        this.model.goodsComments(data.GoodsID, page, function(d){
          var renderFn = _.artTemplate.compile(commentsTpl);
          $('#comments').html(renderFn({
            list: d.data,
            GoodsID: data.GoodsID,
            commentsTimes: data.commentsTimes
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