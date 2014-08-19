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
    $(document)
      .on('click', '#loginBtn', function(){
        service.login({foo: 'foo', bar: 'bar'}, function(d){
          console.log(d);
        });
      });
  };

});