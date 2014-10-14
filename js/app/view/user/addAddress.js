"use strict";

define([
  'app/view/baseView',
  'app/service/api'
], function(baseView, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'addAddress-page',
      model: new model,
      ready: function(){
        var selectedCity = window.sessionStorage.getItem('selectedCity');
        if(selectedCity){
          selectedCity = JSON.parse(selectedCity);
          $('#cityLabel').text(selectedCity.text);
          $('[name=provinceID]').val(selectedCity.provinceID);
          $('[name=cityID]').val(selectedCity.cityID);
          $('[name=areaID]').val(selectedCity.areaID);
        }
      }
    })
  );

});