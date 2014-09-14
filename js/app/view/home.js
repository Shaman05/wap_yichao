/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:32
 */

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_list.html',
  'app/service/api'
], function(baseView, goodsListTpl, model){

  "use strict";

  var page = 1;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(){
        this.getGoodsList();
        $("#jSlider").slider({
          direction: "left",
          height: 250
        });
      },
      getGoodsList: function(){
        //框架配镜 GoodsTypeID: 101
        this.model.goodsList(101, page, function(d){
          var renderFn = _.artTemplate.compile(goodsListTpl);
          $('#proWapper_1').html(renderFn({
            list: d.data
          }));
        });
        //隐形眼瞳 GoodsTypeID: 102
        this.model.goodsList(102, page, function(d){
          var renderFn = _.artTemplate.compile(goodsListTpl);
          $('#proWapper_2').html(renderFn({
            list: d.data
          }));
        });
      }
    })
  );

});