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
        var _this = this;
        _this.model.getMemberAddress('', '', function(d){
          if(d.data && d.data.length > 0){

            if(data.TotalAmount){
              $('#totalPay').text(window.sessionStorage.getItem('TotalAmount') || '0.00');
            }
          }else{
            $('.addBtnbox').show();
          }
        });
      }
    })
  );

});