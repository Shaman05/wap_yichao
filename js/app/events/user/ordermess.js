/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:29
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();

    $(document)
      .on('click', '#toAddAddress', function(){
        util.toPage('user.addAddress');
      })
      .on('click', '[data-PaymentID]', function(){
        $(this).addClass('focus').siblings().removeClass('focus');
      })
      .on('click', '#submitOrderBtn', function(){
        var userInput = getUserInput();
        if(userInput.status){
          service.orderAdd({
              TotalAmount: userInput.totalPay
            , DiscountAmount: ""
            , ShipID: ""
            , ShipAmount: ""
            , CouponID: ""
            , CouponCode: ""
            , CouponAmount: ""
            , GiftCardID: ""
            , GiftCardCode: ""
            , GiftCardAmount: ""
            , PaymentID: userInput.paymentType
            , PaymentAmount: ""
            , IsInvoice: ""
            , InvoiceAmount: ""
            , InvoiceTitle: ""
            , InvoiceContent: ""
            , GivePoint: ""
            , Province: ""
            , City: ""
            , Area: ""
            , Street: ""
            , Fullname: "测试一下"
            , Tel: ""
            , Mobile: "15988148346"
            , Email: "hhtian@163.com"
            , Remark: ""
            , LevelID: ""
            , FlagID: ""
          }, function(d){
            alert(d.message);
            if(d.status == '1'){
              util.toPage('user.ordersuccess&paymentType=' + userInput.paymentType + '&OrderID=' + d.data);
            }
          });
        }
      });
  };

  function getUserInput(){
    var userInput = {
      status: true,
      totalPay: parseFloat($('#totalPay').text())
    };
    //是否选择支付方式
    var $payment = $('#paymentType').find('.focus');
    if($payment.size() == 0){
      userInput.status = false;
      alert('请选择支付方式！');
    }else{
      userInput.paymentType = $payment.attr('data-PaymentID');
    }
    return userInput;
  }

});