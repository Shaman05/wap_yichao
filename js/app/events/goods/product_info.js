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
      .on('click', '[data-glassFrame] a, [data-glassLens] a, [data-moreLens] a', function(){
        var $this = $(this);
        if(!$this.hasClass('lastA')){
          $this.addClass('focus').siblings().removeClass('focus');
        }
      })
      //更多镜片
      .on('click', '#selectMore', function(){
        var $e = $('#moreSelectWrap');
        $e.toggle($e[0].style.display == "none");
      })
      //加入购物车
      .on('click', '#addToCartBtn', function(){
        service.addToCart({
            UserTicket:"23232"
          , GoodsID:"23"
          , GoodsName: $('#GoodsName').val()
          , GoodsTypeID:"23"
          , SkuName:"23"
          , SkuCode:"23"
          , Qty:"23"
          , IsChangeQty:"23"
          , SalePrice: parseFloat($('#SalePrice').val())
          , OriginalPrice:"23"
          , LevelDiscount:"23"
          , PromotionID:"23"
          , Point:"23"
          , Weight:"23"
          , ParentID:"23"
          , IsChild:"23"
          , Expired:"23"
          , PrescriptionsID:"23"
          , LensesID:"23"
          , IsOnlyFrames:"23"
          , IsCustomzied:"23"
          , GoodsBrandID:"23"
          , IsOnlyDeposit:"23"
          , IsBuy:"23"
        }, function(d){
          alert(d.message);
        });
      });

  };

});