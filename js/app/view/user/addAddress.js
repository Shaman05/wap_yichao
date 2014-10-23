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
        var inputAddressData = window.sessionStorage.getItem('inputAddressData');
        if(selectedCity){
          selectedCity = JSON.parse(selectedCity);
          $('#cityLabel').text(selectedCity.text);
          $('[name=provinceID]').val(selectedCity.provinceID);
          $('[name=cityID]').val(selectedCity.cityID);
          $('[name=areaID]').val(selectedCity.areaID);
        }
        if(inputAddressData){
          inputAddressData = JSON.parse(inputAddressData);
          $('[name=Street]').val(inputAddressData.Street);
          $('[name=Zip]').val(inputAddressData.Zip);
          $('[name=FullName]').val(inputAddressData.FullName);
          $('[name=Mobile]').val(inputAddressData.Mobile);
        }
      }
    })
  );

});