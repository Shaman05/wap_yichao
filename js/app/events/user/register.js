/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:29
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();

    var $telephone = $('[name=telephone]');
    var $password = $('[name=password]');
    var $password2 = $('[name=password2]');

    $(document)
      .on('blur', '[name=telephone]', function(){
        $('#phone-tips').text('正在验证...');
      })
      .on('click', '#registerBtn', function(){

      });
  };

});