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
        var _this = this;
        var keyword = data.keyword;
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        if(!!keyword){
          _this.model.goodsSearch(keyword, data.PageIndex, function(d){
            if(d.data && d.data.length > 0){
              window.localStorage.setItem('lastSearchData', JSON.stringify({
                keyword: keyword,
                total: d.nPageCount,
                pageIndex: data.PageIndex,
                pageSize: APP.config.pageSize,
                list: d.data
              }));
              _this.loadSessionData();
            }
          });
        }else{
          _this.loadSessionData();
        }
      },
      loadSessionData: function(){
        var lastData = window.localStorage.getItem('lastSearchData');
        if(lastData){
          var renderFn = _.artTemplate.compile(tpl);
          lastData = JSON.parse(lastData);
          $('#searchKeyword').text(lastData.keyword);
          $('#searchResult').html(renderFn({
            keyword: lastData.keyword,
            total: lastData.total,
            pageIndex: lastData.pageIndex,
            pageSize: lastData.pageSize,
            list: lastData.list
          }));
        }
      }
    })
  );

});