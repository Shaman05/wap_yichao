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
      //加入购物车
      .on('click', 'input[type=checkbox]', function(){
        var totalPayPrice = 0;
        $.each($('.proCarList li'), function(){
          var $this = $(this);
          if($this.find('input[type=checkbox]')[0].checked){
            totalPayPrice += (parseFloat($this.attr('data-price')) * parseInt($this.attr('data-count'), 10));
          }
        });
        $('#totalPay').text(totalPayPrice);
      })
      //结算
      .on('click', '#applyPayBtn', function(){
        util.toPage('user.ordermess&TotalAmount=' + parseFloat($('#totalPay').text()));
        /*service.orderAdd({
          TotalAmount: totalPayPrice
        }, function(d){
          if(d.status == '1'){
            alert('添加成功！');
          }else{
            alert(d.message);
          }
        })*/
      });
  };

});