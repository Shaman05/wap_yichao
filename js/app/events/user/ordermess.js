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
	        var selectedCart = JSON.parse(window.sessionStorage.getItem('selectedTempCartList'));
	        var cartId = [];
	        if(selectedCart){
		        for(var i = 0; i < selectedCart.length; i++){
			        cartId.push(selectedCart[i]['CartID']);
		        }
	        }
          service.orderAdd({
	            AddID: "100014"
	          , Remark: "343"
	          , ShipID: "0"
	          , ShipAmount: "5.5"
	          , DiscountAmount: "2.5"
	          , invoiceID: "0"
	          , CouponAmount: "0"
	          , CouponCode: ""
	          , CouponID: "0"
	          , Point: "0"
	          , GivePoint: "0"
	          , CpsID: ""
	          , CpsKey: ""
	          , CpsUserID: ""
	          , TotalAmount: userInput.totalPay
	          , CartID: cartId.join(',')
	          , PaymentID: userInput.paymentType
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