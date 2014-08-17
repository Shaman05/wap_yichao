"use strict";

define(['app/view/baseView'], function(baseView){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null,
      ready: function(){
        $(".js-slider3").slider({
          direction: "left",
          height: 150
        });
      }
    })
  );

});