"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_ordersuccess.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'payOrder-page',
      model: new model,
      ready: function(data){
        var renderFn = _.artTemplate.compile(tpl);
        $('#orderSuccessInfo').html(renderFn({
          OrderID: data.OrderID,
          paymentType: data.paymentType
        }));
      },
      payOrder: function(orderId){
        var pid = util.getParam()['paymentType'];
        this.model.payOrder(orderId, pid, function(d){
          alert(d.message);
          if(d.status == '1'){
            util.toPage('home');
          }
        });
      }
    })
  );

});