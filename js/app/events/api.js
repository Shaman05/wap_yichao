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
      var args = $this.attr('data-args').split(',').concat([callback]);
      service[action].apply(view, args);
    });

  };

  function callback(d){
    alert(JSON.stringify(d));
  }

});