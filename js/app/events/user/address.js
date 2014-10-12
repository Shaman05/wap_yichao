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

    $(document)
      .on('click', '#toAddAddress', function(){
        util.toPage('user.addAddress');
      })
      .on('click', '[name=address]', function(){
        var $this = $(this);
        service.setDefaultAddress($this.val(), function(d){

        });
      });
  };

});