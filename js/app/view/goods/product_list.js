"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_list.html',
  'app/service/api'
], function(baseView, tpl, api){

  var page = 1;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new api,
      ready: function(data){
        this.model.goodsList(data.GoodsTypeID, page, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#proWapper').html(renderFn({
            list: d.data
          }));
        });
      }
    })
  );

});