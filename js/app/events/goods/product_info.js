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
      .on('click', '[data-glassFrame] a, [data-glassLens] a', function(){
        var $this = $(this);
        if(!$this.hasClass('lastA')){
          $this.addClass('focus').siblings().removeClass('focus');
        }
      })
      .on('click', '[data-moreLens] a', function(){
        var $this = $(this);
        if($this.hasClass('focus')){
          $this.removeClass('focus');
        }else{
          $this.addClass('focus').siblings().removeClass('focus');
          $('#maskLayer').hide();
          $('#moreSelectWrap').hide();
        }
      })
      //更多镜片
      .on('click', '#selectMore', function(){
        /*var $e = $('#moreSelectWrap');
         $('#maskLayer').show();
         $e.toggle($e[0].style.display == "none");*/
        $('[data-glassLens]').find('a').show();
      })
      //加入购物车
      .on('click', '#addToCartBtn', function(){
				var checkData = checkSelect();
		    checkData.flag && service.addToCart({
            UserTicket: "23232"  //未登录用户票据 待确认
          , GoodsID: $('#GoodsID').val()  //商品ID
          , GoodsName: $('#GoodsName').val()  //商品名称
          , GoodsTypeID: $('#GoodsTypeID').val()  //商品类型
          , SkuName: checkData.skuName  //商品SKU名称
          , SkuCode: checkData.skuCode  //商品SKU代号
          , Qty: 1  //商品数量
          , IsChangeQty: ""  //是否允许更新数量 待确认
          , SalePrice: parseFloat($('#SalePrice').val())  //销售价格
          , OriginalPrice: $('#OriginalPrice').val()  //原售价
          , LevelDiscount: $('#LevelDiscount').val()  //会员等级折扣额
          , PromotionID: $('#PromotionID').val()  //促销活动ID
          , Point: $('#Point').val()  //赠送积分
          , Weight: $('#Weight').val()  //重量（单位：克）
          , ParentID: $('#ParentID').val() || 0 //购物车商品父级ID：0=无父级；>0 且IsChild=False为父级；
          , IsChild: "23"  //是否为子级 待确认
          , Expired: "23"  //未结算过期时间 待确认
          , PrescriptionsID: ""   //验光单ID 选验光单时追加
          , LensesID: checkData.LensesID  //眼镜架配的镜片商品ID
          , IsOnlyFrames: "23"  //待确认
          , IsCustomzied: "23"  //待确认
          , GoodsBrandID: "23"  //待确认
          , IsOnlyDeposit: "23"   //待确认
          , IsBuy: "23"   //待确认
        }, function(d){
          alert(d.message);
        });
      });

    function checkSelect(){
	    var data = {
		    flag: true,
		    skuName: '',
		    skuCode: '',
		    LensesID: '',
		    sph: ''
	    };
	    var $glassframe = $('[data-glassframe]');
	    var $glassframeSelected = $glassframe.find('.focus');
	    var skuName = $glassframeSelected.text();
	    var skuCode = $glassframeSelected.attr('data-itemCode');
	    if($glassframe.size() > 0){
		    if(!skuName){
			    data.flag = false;
			    alert('请选择镜框！');
		    }else{
			    data.skuName = skuName;
			    data.skuCode = skuCode;
			    var LensesID = $('[data-glasslens]').find('.focus').attr('data-goodsID');
			    if(!LensesID){
				    data.flag = false;
				    alert('请选择镜片！');
			    }else{
				    data.LensesID = LensesID;
			    }
		    }
	    }else{
		    var sph = $('[data-glasslens]').find('.focus').attr('data-sph');
		    if(!sph){
			    data.flag = false;
			    alert('请选度数！');
		    }else{
			    data.sph = sph;
		    }
	    }
      return data;
    }

  };

});