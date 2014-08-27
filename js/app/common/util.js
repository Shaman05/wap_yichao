/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午2:27
 */

define(function(){

  "use strict";

  return {
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
      $('#loading').show();
    },

    hideLoading: function(){
      $('#loading').hide();
    },

    alert: function(){}

  }

});