"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_groupBuyInfo.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'groupBuyInfo-page',
      model: new model,
      ready: function(data){
        this.model.groupBuyInfo(data.PromotionID, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#groupBox').html(renderFn(d.data[0]));
        });
      }
    })
  );

});