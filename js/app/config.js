/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午10:32
 */

(function(){

  "use strict";

  window.APP = {};

  window.APP.config = {
    domain: 'https://wap.yichao.cn',
    apiUrl: '/wap/',
    homeAction: 'ac=home',
    needLogin: true,

    noHeader: [
      'user.login'
    ],
    noFooter: [
      'user.login',
      'zhangyaling.user.register'
    ],

    template: function(){
      this.artTemplate.config({
        openTag: '<%',
        closeTag: '%>'
      });
    }
  };

})();