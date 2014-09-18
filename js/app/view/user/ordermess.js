"use strict";

define([
  'app/view/baseView',
  'app/service/api'
], function(baseView, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        if(data.TotalAmount){
          $('#totalPay').text(data.TotalAmount);
        }
      }
    })
  );

});