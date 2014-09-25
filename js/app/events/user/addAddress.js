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

    $(document).on('click', '#applyAddAddress', function(){
      //todo
      var options = {};
      service.memberAddressAdd(options, function(d){
        alert(d);
        if(d.status == '1'){
          util.toPage('user.ordermess');
        }
      });
    });
  };

});