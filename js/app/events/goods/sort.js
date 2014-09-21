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
      .on('click', '#sortList01>li', function(e){
        var target = e.target;
        var $this = $(this);
        if(target == $this.find('a')[0]){
          var isLoaded = $this.attr('data-loaded');
          var GoodsTypeID = $this.attr('data-GoodsTypeID');
          if(!isLoaded){
            view.goodsPropertyList(GoodsTypeID, function(html){
              $this.attr('data-loaded', '1').append(html).addClass('open');
            });
          }else{
            $this.toggleClass('open');
          }
        }
      })
      .on('click', '#sortList02>li', function(e){
        var $this = $(this);
        var isLoaded = $this.attr('data-loaded');
        var PropertyID = $this.attr('data-PropertyID');
        if(!isLoaded){
          view.goodsPropertyByValueList(PropertyID, function(html){
            $this.attr('data-loaded', '1').append(html).addClass('open');
          });
        }else{
          $this.toggleClass('open');
        }
      })
      .on('click', '#sortList03 a', function(){
        var $this = $(this);
        var GoodsTypeID = $this.parents('[data-GoodsTypeID]').attr('data-GoodsTypeID');
        var PropertyID = $this.parents('[data-PropertyID]').attr('data-PropertyID');
        var ValueID = $this.parents('[data-ValueID]').attr('data-ValueID');
        util.toPage('goods.product_list&GoodsTypeID=' + GoodsTypeID +'&PropertyID=' + PropertyID + '&ValueID=' + ValueID);
      });
  };

});