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
	            AddID: userInput.AddID  //收货地址ID
	          , Remark: userInput.Remark  //补充说明
	          , ShipID: "0"  //运输方式
	          , ShipAmount: "0.00"  //运费金额
	          , DiscountAmount: "0.00"  //优惠金额
	          , CouponAmount: "0"  //优惠券金额
            , CouponCode: ""  //优惠券号码
            , CouponID: "0"  //优惠券ID
            , Point: "0"
            , invoiceID: "0"
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
      AddID: $('#AddID').val(),
      Remark: $.$trim($('#remark').val()),
      totalPay: parseFloat($('#totalPay').text())
    };
    //是否选择支付方式
    var $payment = $('#paymentType').find('.focus');
    if(!userInput.AddID){
      userInput.status = false;
      alert('未选择收货地址，如果您还没有收货地址，请先添加收货地址！');
    }
    if($payment.size() == 0){
      userInput.status = false;
      alert('请选择支付方式！');
    }else{
      userInput.paymentType = $payment.attr('data-PaymentID');
    }
    return userInput;
  }

});