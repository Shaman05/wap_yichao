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
      .on('click', '#sortList01 li', function(){
        var $this = $(this);
        var isLoaded = $this.attr('data-loaded');
        var GoodsTypeID = $this.attr('data-GoodsTypeID');
        if(!isLoaded){
          view.goodsPropertyList(GoodsTypeID, function(html){
            $this.attr('data-loaded', '1').append(html).addClass('open');
          });
        }else{
          $this.toggleClass('open');
        }
      });
  };

});