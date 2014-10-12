"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_orderSheetGoodsItem.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        this.getMemberDefaultAddress(data);
        this.getSelectedGoods();
      },
      getMemberDefaultAddress: function(data){
        var _this = this;
        _this.model.getMemberAddress('', '', function(d){
          if(d.data && d.data.length > 0){
            $('#totalPay').text(window.sessionStorage.getItem('TotalAmount') || '0.00');
            var address = d.data[0];
            //if(address['IsDefault'] == "True"){
              $('#fullName').text(address['FullName']);
              $('#mobile').text(address['Mobile']);
              $('#detailAddress').text(address['Street']);
            //}
          }else{
            $('.addBtnbox').show();
          }
        });
      },
      getSelectedGoods: function(){
        var listData = JSON.parse(window.sessionStorage.getItem('selectedTempCartList'));
        if(listData && listData.length > 0){
          var renderFn = _.artTemplate.compile(tpl);
          $('#orderSheetGoods').html(renderFn({
            list: listData
          }));
        }
      }
    })
  );

});