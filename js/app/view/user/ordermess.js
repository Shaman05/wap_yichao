"use strict";

define(['app/view/baseView'], function(baseView){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null,
      ready: function(data){
        if(data.TotalAmount){
          $('#totalPay').text(data.TotalAmount);
        }
      }
    })
  );

});