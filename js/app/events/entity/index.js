/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:25
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();
    $(document)
      .on('click', '#showEntityInfo', function(){
        $('#entityInfo').toggle();
      })
      .on('click', '#appoBtns', function(){
        $('#appoinContent').toggle();
      })
      //提交预约
      .on('click', '#submitYY', function(){
        var tel = $.trim($('#yyTel').val());
        var content = $.trim($('#yyContent').val());
        if(!tel || !content){
          alert('电话号码或预约内容必填！');
          return;
        }
        var opt = {
            ShopID: $('#ShopID').val()
          , Name: $('#ShopName').val()
          , Phone: tel
          , Email: ""
          , ReservationTime: ""
          , Content: content
        };
        service.msmYY(opt, function(d){
          alert(d.message);
          if(d.status == "1"){
            $('#yyTel').val('');
            $('#yyContent').val('');
            $('#appoinContent').hide();
          }
        });
      })
      //发送店铺地址
      .on('click', '#sendAddress', function(){
        var tel = $.trim($('#getAddressTel').val());
        var content = $('#shopAddress').text();
        if(!tel){
          alert('请填写电话号码！');
          return;
        }
      });
  };

});