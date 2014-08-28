/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-18
 * Time: 上午9:58
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();

    $(document).on('click', '#api-page button', function(){
      var $this = $(this);
      var action = $this.attr('data-action');
      var argsStr = $this.attr('data-args');
      var args = [];
      if(argsStr){
        args = argsStr.split(',').concat([callback]);
      }else{
        args = args.concat([callback]);
      }
      service[action].apply(view, args);
    });

  };

  function callback(d){
    alert(JSON.stringify(d));
  }

});