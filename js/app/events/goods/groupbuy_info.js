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
      .on('click', '#addToCartBtn', function(){
        var goods = [];
        var goodsOpt = {};
        service.addToCart({
          UserTicket: "23232"  //未登录用户票据 待确认
          , GoodsID: $('[name=GoodsID]').val()  //商品ID
          , GoodsName: $('[name=GoodsName]').val()  //商品名称
          , GoodsTypeID: $('[name=GoodsTypeID]').val()  //商品类型
          , SkuName: "23"  //商品SKU名称 待确认
          , SkuCode: "23"  //商品SKU代号 待确认
          , Qty: 1  //商品数量
          , IsChangeQty: ""  //是否允许更新数量 待确认
          , SalePrice: parseFloat($('[name=SalePrice]').val())  //销售价格
          , OriginalPrice: $('[name=OriginalPrice]').val()  //原售价
          , LevelDiscount: $('[name=LevelDiscount]').val()  //会员等级折扣额 待确认
          , PromotionID: $('[name=PromotionID]').val()  //促销活动ID
          , Point: $('[name=Point]').val()  //赠送积分
          , Weight: $('[name=Weight]').val()  //重量（单位：克）
          , ParentID: $('[name=ParentID]').val() || 0 //购物车商品父级ID：0=无父级；>0 且IsChild=False为父级； 待确认
          , IsChild: "23"  //是否为子级 待确认
          , Expired: "23"  //未结算过期时间 待确认
          , PrescriptionsID: "23"   //验光单ID
          , LensesID: "23"  //眼镜架配的镜片商品ID
          , IsOnlyFrames: "23"  //待确认
          , IsCustomzied: "23"  //待确认
          , GoodsBrandID: "23"  //待确认
          , IsOnlyDeposit: "23"   //待确认
          , IsBuy: "23"   //待确认
        }, function(d){
          alert(d.message);
        });
      });
  };

});