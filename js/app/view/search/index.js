"use strict";

define([
  'app/view/baseView',
  'app/service/api'
], function(baseView, api){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'search-page',
      model: new api,
      ready: function(){
        $('#noResult').hide();
        $('#searchKeyword').empty();
      }
    })
  );

});