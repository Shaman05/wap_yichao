/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午2:27
 */

define(function(){

  "use strict";

  var util = {
    isLogin: function(){
      return this.getUserInfo();
    },

    getUserInfo: function(){
      return JSON.parse(window.sessionStorage.getItem('userInfo'));
    },

    toPage: function(action){
      var _action = action || 'home';
      window.location.hash = '#ac=' + _action;
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
      $('#loading').show();
    },

    hideLoading: function(){
      $('#loading').hide();
    },

    alert: function(options){
      var $mask = $('#mask');
      var $wrap = $('#myAlert-wrap');
      var $box = $('#myAlert');
      var $title = $box.find('#alert-title');
      var $content = $box.find('#alert-content');
      var opt = {
        title: APP.config.domain,
        html: '<p>这里是Alert内容</p>',
        onApply: 'closeAlert',
        onCancel: 'closeAlert',
        autoClose: 0
      };
      if(typeof options === 'object'){
        opt = $.extend(opt, options);
        $wrap.attr('alert-apply', opt.onApply);
        $wrap.attr('alert-cancel', opt.onCancel);
      }
      if(typeof options === 'string' || typeof options === 'number'){
        opt.html = options;
      }

      if($wrap.attr('data-open') == '1'){
        $wrap.removeClass('js-show');
      }

      $title.text(opt.title);
      $content.html(opt.html);
      $mask.addClass('js-show');
      $wrap.addClass('js-show');
      $wrap.attr('data-open', '1');
      if(opt.autoClose > 0){
        setTimeout(function(){
          util.closeAlert();
        }, opt.autoClose);
      }
    },

    id: 'alert-apply',
    closeAlert: function(){
      var $wrap = $('#myAlert-wrap');
      var fn = $wrap.attr(this.id);
      $wrap.removeClass('js-show').attr('data-open', '0');
      $('#mask').removeClass('js-show');
      if(window[fn] && typeof window[fn] === 'function'){
        window[fn]();
      }
    }

  };

  window.util = util;
  window.alert = util.alert;

  return util;

});