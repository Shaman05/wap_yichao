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
          window.sessionStorage.setItem('TotalAmount', parseFloat($('#totalPay').text()));
          util.toPage('user.ordermess');
        }
      })
      //没验光单
      .on('click', '[data-editYGD]', function(){
        var $this = $(this);
        var $mask = $('#maskLayer');
        $mask.show();
        view.toEditYGD($this.parents('li').find('.ygdWrap'));
      })
      .on('click', '.affirm', function(){
        var $this = $(this);
        var $wrap = $this.parents('.ygdWrap');
        var leftData = checkLeftInput();
        var rightData = checkRightInput();
        if(leftData.status && rightData.status){
          var userInfo = window.sessionStorage.getItem('userInfo');
          var options = {
              RightSph: $wrap.find('[name=RightSph]').val()  //右眼度数
            , RightCyl: rightData.RightCyl  //右眼散光
            , RightAxis: rightData.RightAxis  //右眼轴位
            , LeftSph: $wrap.find('[name=LeftSph]').val()  //左眼度数
            , LeftCyl: leftData.LeftCyl  //左眼散光
            , LeftAxis: leftData.LeftAxis  //左眼轴位
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
        }
      })
      .on('click', '.cancel', function(){
        hideYgd($(this).parents('li').find('.ygdWrap'));
      })
      //有验光单
      .on('click', '[data-selectYGD]', function(){
        var $this = $(this);
        var $mask = $('#maskLayer');
        var $ygdWrap = $this.parents('li').find('.ygdWrap');
        $mask.show();
        view.toSelectYGD($ygdWrap, function(d){
          if(d.status == 1){
            var data = d.data;
            var html = '';
            if(data && data.length > 0){
              for(var i = 0; i < data.length; i++){
                var time = data[i]['CreateTime'];
                html += '<a href="javascript:" class="aa" data-id="' + data[i]['PrescriptionsID'] + '">' + time.split(' ')[0]  + '</a>';
              }
              $ygdWrap.find('.historyYGD').html(html);
              $ygdWrap.find('.ygd_info').show();
            }else{
              alert('没有验光单数据！');
              hideYgd($ygdWrap);
            }
          }else{
            alert(d.message);
            hideYgd($ygdWrap);
          }
        });
      })
      .on('click', '.historyYGD a', function(){
        var $this = $(this);
        var id = $this.attr('data-id');
        var $ygdWrap = $this.parents('li').find('.ygdWrap');
        service.prescriptionsInfo(id, function(d){
          if(d.status == '1'){
            var data = d.data[0];
            $ygdWrap.find('[name=RightSph]').val(data['RightSph']);
            $ygdWrap.find('[name=LeftSph]').val(data['LeftSph']);
            $ygdWrap.find('[name=PD]').val(data['PD']);
            $ygdWrap.find('[name=RightCyl]').val(data['RightCyl']);
            $ygdWrap.find('[name=RightAxis]').val(parseInt(data['RightAxis']));
            $ygdWrap.find('[name=LeftCyl]').val(data['LeftCyl']);
            $ygdWrap.find('[name=LeftAxis]').val(parseInt(data['LeftAxis']));
            //重置状态
            $ygdWrap.find('[name=LeftAxis]')[0].disabled = data['LeftCyl'] == '0.00';
            $ygdWrap.find('[name=RightAxis]')[0].disabled = data['RightCyl'] == '0.00';
          }else{
            alert(d.message);
          }
        });
      })
      //验光单编辑操作
      .on('change', '[name=RightCyl]', function(){
        var $RightAxis = $('[name=RightAxis]')[0];
        $RightAxis.disabled = $(this).val() == "0.00";
        if($(this).val() == "0.00"){
          $RightAxis.selectedIndex = 0;
        }
      })
      .on('change', '[name=LeftCyl]', function(){
        var $LeftAxis = $('[name=LeftAxis]')[0];
        $LeftAxis.disabled = $(this).val() == "0.00";
        if($(this).val() == "0.00"){
          $LeftAxis.selectedIndex = 0;
        }
      });
  };

  function hideYgd($obj){
    $('#maskLayer').hide();
    $obj.empty().hide();
  }

  function metaApplyPayBtn(enable){
    if(enable){
      $('#applyPayBtn').removeClass('disab');
    }else{
      $('#applyPayBtn').addClass('disab');
    }
  }

  //检测左眼的输入
  function checkLeftInput(){
    var result = {
      status: false,
      LeftCyl: '0.00',
      LeftAxis: 0
    };
    var LeftCyl = $('[name=LeftCyl]').val();
    var LeftAxis = $('[name=LeftAxis]').val();
    if(LeftCyl == '0.00'){
      result.status = true;
    }else{
      if(LeftAxis == '0'){
        result.status = false;
        alert('请选择左眼轴位');
      }else{
        result.status = true;
        result.LeftCyl = LeftCyl;
        result.LeftAxis = LeftAxis;
      }
    }
    return result;
  }

  //检测右眼的输入
  function checkRightInput(){
    var result = {
      status: false,
      RightCyl: '0.00',
      RightAxis: 0
    };
    var RightCyl = $('[name=RightCyl]').val();
    var RightAxis = $('[name=RightAxis]').val();
    if(RightCyl == '0.00'){
      result.status = true;
    }else{
      if(RightAxis == '0'){
        result.status = false;
        alert('请选择右眼轴位');
      }else{
        result.status = true;
        result.RightCyl = RightCyl;
        result.RightAxis = RightAxis;
      }
    }
    return result;
  }

});