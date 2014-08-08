/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午10:32
 */

"use strict";

(function(){

  window.APP = {};

  window.APP.config = {
    homeAction: 'ac=home',
    needLogin: true,

    noHeader: [],
    noFooter: [
      'user.login'
    ],

    template: function(){
      this.artTemplate.config({
        openTag: '<%',
        closeTag: '%>'
      });
    }
  };

})();