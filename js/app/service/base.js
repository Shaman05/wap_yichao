/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:02
 */

define(['util'], function(util){

  "use strict";

  var config = APP.config;
  var account = config.passport.name;
  var pwd = config.passport.name;
  var suffix = '.ashx';

  return {
    /**
     * 接口桥接函数
     * @param api 接口地址
     * @param data 传送参数
     * @param callback 回调
     */
    callApi: function(url, data, callback, isShowLoading) {
      var options = $.extend({
        isShowLoading: isShowLoading
      }, {
        data: data,
        url: url,
        success: callback
      });
      ajax(options);
    }
  };

  function ajax(opt) {
    var paramType = typeof(opt.data);
    opt.url = config.apiUrl + opt.url + suffix;
    opt.type = opt.type || 'post';
    opt.data = opt.data || {};
    opt.data.Number = Math.random();
    opt.dataType = opt.dataType || 'json';
    opt.async = opt.async !== false;
    opt.isShowLoading = opt.isShowLoading !== false;  // 是否显示loading背景
    opt.callback = opt.success;
    opt.error = function(xhr, errorType, error){
      util.hideLoading();
      if(config.isDebug){
        console.log(xhr);
        alert(
          'Api url: ' + opt.url + '\n' +
          'Statue: ' + xhr.status + ' ' + xhr.statusText + '\n' +
          'Error type: ' + errorType + '\n' +
          'Error message: ' + (error && error.message) || ''
        );
      }
    };
    opt.success = function (data) {
      util.hideLoading();
      if(!data && config.isDebug){
        alert('No data response!');
        return;
      }
      if(data.needLogin === true || data.needLogin === 'true' || data.needLogin === 1 || data.needLogin === '1'){
        location.hash = '#ac=user.login';
        return;
      }
      if($.isFunction(opt.callback)){
        opt.callback(data);
      }
    };
    //跳过登录，需根据不同情况修改字段名称
    if(!config.needLogin){
      opt.data = paramType == 'object'
        ? $.extend({uname: account, pwd: pwd}, opt.data)
        : opt.data + '&uname=' + account + '&pwd=' + pwd;
    }
    if(opt.isShowLoading){
      util.showLoading();
    }
    $.ajax(opt);
  }

});