/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:02
 */

define(['util'], function(util){

  "use strict";

  var config = APP.config;

  return {
    /**
     * 接口桥接函数
     * @param api 接口地址
     * @param data 传送参数
     * @param callback 回调
     */
    callApi: function(api, data, callback, isShowLoading) {
      var options = $.extend({
        isShowLoading: isShowLoading
      }, {
        data: data,
        url: api,
        success: callback
      });
      ajax(options);
    }
  };

  function ajax(opt) {
    var paramType = typeof(opt.data);
    opt.url = config.apiUrl + opt.url;
    opt.type = opt.type || 'post';
    opt.data = opt.data || {};
    opt.dataType = opt.dataType || 'json';
    opt.async = opt.async !== false;
    opt.isShowLoading = opt.isShowLoading !== false;  // 是否显示loading背景
    opt.callback = opt.success;
    opt.error = function(xhr, errorType, error){
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    };
    opt.success = function (data) {
      util.hideLoading();
      if(data.needLogin){
        location.hash = '#ac=user.login';
        return;
      }
      if($.isFunction(opt.callback)){
        opt.callback(data);
      }
    };
    //跳过登录，根据不同测试需求修改 yrz_uname 值
    if(!config.needLogin){
      opt.data = paramType == 'object'
        ? $.extend({uname: 'test'}, opt.data)
        : opt.data + '&uname=test';
    }
    if(opt.isShowLoading){
      util.showLoading();
    }
    $.ajax(opt);
  }

});