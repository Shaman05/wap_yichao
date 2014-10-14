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
      .on('click', '.moreP', function(){
        $(this).hide().parents('.myAllOrder').find('.proCarList_ord').find('li').each(function(){
          $(this).show();
        });
      });
  };

});