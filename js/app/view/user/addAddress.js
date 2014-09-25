"use strict";

define([
  'app/view/baseView',
  'app/service/api'
], function(baseView, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'addAddress-page',
      model: new model
    })
  );

});