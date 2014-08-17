/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午2:27
 */

define(function(){

  "use strict";

  return {

    events: function(){
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
    },

    getParam: function(url){
      var hash = url || location.hash;
      hash = hash.replace(/&amp;/g, '&');
      var tempArr = hash.split('&');
      var params = {};
      _.each(tempArr, function(item) {
        var paramArr = decodeURIComponent(item).split('=');
        params[paramArr[0]] = paramArr[1];
      });
      return params;
    },

    showLoading: function(){
      //todo
      console.log('show loading ...');
    },

    hideLoading: function(){
      //todo
      console.log('hide loading ...');
    },

    alert: function(){}

  }

});