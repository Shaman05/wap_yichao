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

    $(window)
      .on('scroll', function(){
        if($(window).scrollTop() + $(window).height() >= $(document).height()){
          var data = util.getParam(window.location.hash);
          if(!data.TypeID){
            data.TypeID = "";
          }
          if(!data.ClassID){
            data.ClassID = "";
          }
          if(!$('#listMore').data('noData')){
            view.getData(data);
          }
        }
      });
  };

});