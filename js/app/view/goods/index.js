"use strict";

define(['app/view/baseView'], function(baseView){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null,
      ready: function(){
        $("#jSlider").slider({
          direction: "left",
          height: 300
        });
      }
    })
  );

});