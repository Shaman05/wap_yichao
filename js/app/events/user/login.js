/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-18
 * Time: 上午9:58
 */

define(['events'], function(events){

  "use strict";

  return function(){
    events.init();
    $(document).on('click', '#loginBtn', $.proxy(function(){
      console.log(this.model);
    }, this));
  };

});