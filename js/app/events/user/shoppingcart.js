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

    var hasYgdData = true;
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
          metaApplyPayBtn(totalPayPrice > 0);
        });
        $('#totalPay').text(totalPayPrice);
      })
      //反选
      .on('click', '#unSelect', function(){
        var totalPayPrice = 0;
        $.each($('.proCarList li'), function(){
          var $this = $(this);
          var checkbox = $(this).find('input[type=checkbox]')[0];
          checkbox.checked = !checkbox.checked;
          if(checkbox.checked){
            totalPayPrice += (parseFloat($this.attr('data-price')) * parseInt($this.attr('data-count'), 10));
          }
          metaApplyPayBtn(totalPayPrice > 0);
        });
        $('#totalPay').text(totalPayPrice);
      })
      //删除商品
      .on('click', '#deleteSelect', function(){
        var totalPayPrice = 0;
        var selectedId = [];
        $.each($('.proCarList li'), function(){
          var $this = $(this);
          var checkbox = $(this).find('input[type=checkbox]')[0];
          if(checkbox.checked){
            selectedId.push(checkbox.value);
          }
        });
        if(selectedId.length == 0){
          alert('未选择商品!');
          return false;
        }
        if(confirm('确认删除所选商品吗？')){
          $.each($('.proCarList li'), function(){
            var $this = $(this);
            var checkbox = $(this).find('input[type=checkbox]')[0];
            if(checkbox.checked){
              $this.remove();
            }
          });
          service.delCartId(selectedId.join(','), function(d){
            if(d.status == "1"){
              $.each($('.proCarList li'), function(){
                var $this = $(this);
                var checkbox = $(this).find('input[type=checkbox]')[0];
                if(checkbox.checked){
                  totalPayPrice += (parseFloat($this.attr('data-price')) * parseInt($this.attr('data-count'), 10));
                }
                metaApplyPayBtn(totalPayPrice > 0);
              });
              $('#totalPay').text(totalPayPrice);
            }else{
              alert(d.message);
            }
          });
        }
      })
      //结算
      .on('click', '#applyPayBtn', function(){
        if(!$(this).hasClass('disab')){
          window.sessionStorage.setItem('TotalAmount', parseFloat($('#totalPay').text()));
          //保存临时选取商品
          var $checked = $('.proCarList input[type=checkbox]:checked');
          var tempCartList = JSON.parse(window.sessionStorage.getItem('tempCartList'));
          var selectedTempCartList = [];
          $.each($checked, function(){
            var $this = $(this);
            var $item = $this.parents('.cart-item');
            var id = $this.val();
            for(var i = 0; i < tempCartList.length; i++){
              if(id == tempCartList[i]['CartID']){
                tempCartList[i]['SelectedPrescriptionID'] = $item.data('ygdId');
                tempCartList[i]['PrescriptionInfo'] = $item.data('ygd');
                selectedTempCartList.push(tempCartList[i]);
              }
            }
          });
          window.sessionStorage.setItem('selectedTempCartList', JSON.stringify(selectedTempCartList));
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
      //没验光单
      .on('click', '.applyNoYgd', function(){
        $(this).parents('.ygdWrap').empty();
        $('#maskLayer').hide();
      })
      .on('click', '.applySelectYgd', function(){
        var $this = $(this);
        var $item = $this.parents('.cart-item');
        var $wrap = $item.find('.ygdWrap');
        //如果没有历史验光单，则将该次设定为历史验光单
        if(!hasYgdData){
          var leftData = checkLeftInput();
          var rightData = checkRightInput();
          if(leftData.status && rightData.status){
            var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
            var options = {
              RightSph: $wrap.find('[name=RightSph]').val()  //右眼度数
              , RightCyl: rightData.RightCyl  //右眼散光
              , RightAxis: rightData.RightAxis  //右眼轴位
              , LeftSph: $wrap.find('[name=LeftSph]').val()  //左眼度数
              , LeftCyl: leftData.LeftCyl  //左眼散光
              , LeftAxis: leftData.LeftAxis  //左眼轴位
              , PD: $wrap.find('[name=PD]').val()  //瞳距
              , RealName: userInfo ? userInfo['UserName'] : ''  //验光单姓名
            };
            service.prescriptionsAdd(options, function(d){
              alert(d.message);
              if(d.status == '1'){
                fillData($item, $wrap);
              }
            });
          }
        }else{
          fillData($item, $wrap);
        }
      })
      .on('click', '.cancel', function(){
        hideYgd($(this).parents('li').find('.ygdWrap'));
      })
      .on('click', '.historyYGD a', function(){
        var $this = $(this);
        var id = $this.attr('data-id');
        var $ygdWrap = $this.parents('.cart-item').find('.ygdWrap');
        $this.parents('.cart-item').data('ygdId', id);
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
              $ygdWrap.find('.historyYGD').html(html).find('a').eq(0).trigger('click');
              $ygdWrap.find('.ygd_info').show();
            }else{
              hasYgdData = false;
              $ygdWrap.find('.historyYGD').find('span').text('没有添加过历史验光单数据！');
              $ygdWrap.find('.ygd_info').show();
              //hideYgd($ygdWrap);
            }
          }else{
            alert(d.message);
            hideYgd($ygdWrap);
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
      })
      .on('click', '.edit_ygd_btn', function(){
        var $this = $(this);
        var $item = $this.parents('.cart-item');
        var $mask = $('#maskLayer');
        $mask.show();
        $item.find('.ygdWrap').show();
      });
  };

  function fillData($item, $wrap){
    var $selectedShow = $item.find('.yanguangdan');
    var $RightSph = $wrap.find('[name=RightSph]')[0];
    var $RightCyl = $wrap.find('[name=RightCyl]')[0];
    var $RightAxis = $wrap.find('[name=RightAxis]')[0];
    var $LeftSph = $wrap.find('[name=LeftSph]')[0];
    var $LeftCyl = $wrap.find('[name=LeftCyl]')[0];
    var $LeftAxis = $wrap.find('[name=LeftAxis]')[0];
    var $PD = $wrap.find('[name=PD]')[0];
    var opt = {
      RightSph: $RightSph.options[$RightSph.selectedIndex].text  //右眼度数
      , RightCyl: $RightCyl.options[$RightCyl.selectedIndex].text  //右眼散光
      , RightAxis: $RightAxis.options[$RightAxis.selectedIndex].text  //右眼轴位
      , LeftSph: $LeftSph.options[$LeftSph.selectedIndex].text  //左眼度数
      , LeftCyl: $LeftCyl.options[$LeftCyl.selectedIndex].text  //左眼散光
      , LeftAxis: $LeftAxis.options[$LeftAxis.selectedIndex].text  //左眼轴位
      , PD: $PD.options[$PD.selectedIndex].text  //瞳距
    };
    $item.data('ygd', opt);
    $selectedShow.find('.rsph').text(opt.RightSph);
    $selectedShow.find('.lsph').text(opt.LeftSph);
    $selectedShow.find('.rcyl').text(opt.RightCyl);
    $selectedShow.find('.lcyl').text(opt.LeftCyl);
    $selectedShow.find('.raxis').text(opt.RightAxis);
    $selectedShow.find('.laxis').text(opt.LeftAxis);
    $selectedShow.find('.pd').text(opt.PD);
    $('#maskLayer').hide();
    $item.find('.carBtnBox').hide();
    $wrap.hide();
    $selectedShow.show();
  }

  function hideYgd($obj){
    $('#maskLayer').hide();
    $obj.hide();
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