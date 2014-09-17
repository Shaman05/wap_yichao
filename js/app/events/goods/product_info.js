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
        //todo
        service.addToCart({
          UserTicket:"23232",
          GoodsID:"23",
          GoodsName: $('#GoodsName').val(),
          GoodsTypeID:"23",
          SkuName:"23",
          SkuCode:"23",
          Qty:"23",
          IsChangeQty:"23",
          SalePrice: parseFloat($('#SalePrice').val()),
          OriginalPrice:"23",
          LevelDiscount:"23",
          PromotionID:"23",
          Point:"23",
          Weight:"23",
          ParentID:"23",
          IsChild:"23",
          Expired:"23",
          PrescriptionsID:"23",
          LensesID:"23",
          IsOnlyFrames:"23",
          IsCustomzied:"23",
          GoodsBrandID:"23",
          IsOnlyDeposit:"23",
          IsBuy:"23"
        }, function(d){
          //todo
          if(d.status == '1'){
            alert('添加成功！');
          }else{
            alert(d.message);
          }
        });
      });

  };

});