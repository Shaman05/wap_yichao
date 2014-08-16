"use strict";

define(['app/view/baseView'], function(baseView){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null,
      setData: function(){
        return {
          a: 123,
          b: 456
        };
      }
    })
  );

});