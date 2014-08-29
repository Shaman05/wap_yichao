"use strict";

define([
  'app/view/baseView',
  'text!app/template/search/ajax_searchResult.html',
], function(baseView, tpl){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null,
      ready: function(){
        var data = window.localStorage.getItem('lastSearchData');
        if(data){
          var renderFn = _.artTemplate.compile(tpl);
          data = JSON.parse(data);
          $('#searchKeyword').text(data.keyword);
          $('#searchResult').html(renderFn({
            list: data.list
          }));
        }
      }
    })
  );

});