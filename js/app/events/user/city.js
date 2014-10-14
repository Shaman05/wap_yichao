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
      .on('click', '.data-province, .data-city, .data-area', function(){
        var hasSub = $(this).next('ul');
        if(hasSub.size() > 0){
          $(this).next().toggle();
        }else{
          window.sessionStorage.setItem('selectedCity', '{"foo": "foo"}');
          util.toPage('user.addAddress');
        }
      });
  };

});