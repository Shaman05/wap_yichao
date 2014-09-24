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
        metaApplyPayBtn(totalPayPrice > 0);
      })
      //全选
      .on('click', '#selectAll', function(){
        var totalPayPrice = 0;
        $.each($('.proCarList li'), function(){
          var $this = $(this);
          $(this).find('input[type=checkbox]')[0].checked = true;
          totalPayPrice += (parseFloat($this.attr('data-price')) * parseInt($this.attr('data-count'), 10));
          $('#totalPay').text(totalPayPrice);
          metaApplyPayBtn(totalPayPrice > 0);
        });
      })
      //结算
      .on('click', '#applyPayBtn', function(){
        if(!$(this).hasClass('disab')){
          util.toPage('user.ordermess&TotalAmount=' + parseFloat($('#totalPay').text()));
        }
      })
      .on('click', '[data-editYGD]', function(){
        var $this = $(this);
        var $mask = $('#maskLayer');
        $mask.show();
        view.toEditYGD($this.parents('li').find('.ygdWrap'));
      })
      .on('click', '.affirm', function(){
        var $this = $(this);
        var $wrap = $this.parents('.ygdWrap');
        var userInfo = window.sessionStorage.getItem('userInfo');
        var options = {
            RightSph: $wrap.find('[name=RightSph]').val()  //右眼度数
          , RightCyl: $wrap.find('[name=RightCyl]').val()  //右眼散光
          , RightAxis: $wrap.find('[name=RightAxis]').val()  //右眼轴位
          , LeftSph: $wrap.find('[name=LeftSph]').val()  //左眼度数
          , LeftCyl: $wrap.find('[name=LeftCyl]').val()  //左眼散光
          , LeftAxis: $wrap.find('[name=LeftAxis]').val()  //左眼轴位
          , PD: $wrap.find('[name=PD]').val()  //瞳距
          , RealName: userInfo ? JSON.parse(window.sessionStorage.getItem('userInfo'))[0]['UserName'] : ''  //验光单姓名
        };
        service.prescriptionsAdd(options, function(d){
          alert(d.message);
          if(d.status == '1'){
            $('#maskLayer').hide();
            $wrap.hide();
          }
        });
      })
      .on('click', '.cancel', function(){
        $('#maskLayer').hide();
        $(this).parents('.ygdWrap').empty().hide();
      });
  };

  function metaApplyPayBtn(enable){
    if(enable){
      $('#applyPayBtn').removeClass('disab');
    }else{
      $('#applyPayBtn').addClass('disab');
    }
  }

});