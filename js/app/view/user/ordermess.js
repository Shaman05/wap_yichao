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
            $('#totalPay').text(window.sessionStorage.getItem('TotalAmount') || '0.00');
            var address = d.data[0];
            if(address['IsDefault'] == "True"){
              $('#fullName').text(address['FullName']);
              $('#mobile').text(address['Mobile']);
              $('#detailAddress').text(address['Street']);
            }
          }else{
            $('.addBtnbox').show();
          }
        });
      }
    })
  );

});