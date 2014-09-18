"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_ordersuccess.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        var renderFn = _.artTemplate.compile(tpl);
        $('#orderSuccessInfo').html(renderFn({
          OrderID: data.OrderID,
          paymentType: data.paymentType
        }));
      }
    })
  );

});