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
      //返回顶部
      $(document).on('click', '#backTop', function(){
        $.scrollTo({
          endY: 0,
          duration: 300,
          callback: function() {}
        });
      });

      //商品菜单
      $(document).on('click', '#goodsTypeView', function(){
        $('#goodsTypeList').toggle();
      });

      //滚动加载测试
      $(window).on('scroll', function(){
        if($(window).scrollTop() + $(window).height() >= $(document).height()){
          console.log('end')
        }
      });

      //实体店
      $(document).on('click', '#entityList li', function(){
        $(this).toggleClass('open');//.siblings('.open').removeClass('open');
      });
      $(document).on('click', '#showEntityInfo', function(){
        $('#entityInfo').toggle();
      });
    }
  };

});