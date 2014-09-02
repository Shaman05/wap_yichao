/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-17
 * Time: 下午12:51
 */
 
define(function(){

  "use strict";

  return {
    init: function(){
      $(document)
        .unbind()
        //返回顶部
        .on('click', '#backTop', function(){
          $.scrollTo({
            endY: 0,
            duration: 300,
            callback: function() {}
          });
        })
        //商品菜单
        .on('click', '#goodsTypeView', function(){
          $('#goodsTypeListWrap').toggle();
        });

      $(window)
        .on('scroll', function(){
          $('#goodsTypeList').hide();
        });
    }
  };

});