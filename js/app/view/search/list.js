"use strict";

define([
  'app/view/baseView',
  'text!app/template/search/ajax_searchResult.html',
  'app/service/api'
], function(baseView, tpl, api){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new api,
      ready: function(data){
        var keyword = data.keyword;
        var p = data.PageIndex || 1;
        if(keyword){
          service.goodsSearch(keyword, p, function(d){
            if(d.data && d.data.length > 0){
              window.localStorage.setItem('lastSearchData', JSON.stringify({
                keyword: keyword,
                count: d.nPageCount,
                list: d.data
              }));
            }
          });
        }
        this.loadSessionData();
      },
      loadSessionData: function(){
        var lastData = window.localStorage.getItem('lastSearchData');
        if(lastData){
          var renderFn = _.artTemplate.compile(tpl);
          lastData = JSON.parse(lastData);
          $('#searchKeyword').text(lastData.keyword);
          $('#searchResult').html(renderFn({
            list: lastData.list
          }));
        }
      }
    })
  );

});