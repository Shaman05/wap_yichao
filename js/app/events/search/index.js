/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:29
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();

    $(document)
      .on('click', '#searchBtn', function(){
        var keyword = $.trim($('[name=keyword]').val());
        if(!keyword){
          alert('请先输入搜索关键字');
        }else{
          service.goodsSearch(keyword, 1, function(d){
            if(d.data && d.data.length > 0){
              window.localStorage.setItem('lastSearchData', JSON.stringify({
                keyword: keyword,
                total: d.nPageCount,
                pageIndex: 1,
                pageSize: APP.config.pageSize,
                list: d.data
              }));
              window.location.hash = '#ac=search.list&keyword=' + keyword + '&PageIndex=' + 1;
            }else{
              $('#searchKeyword').text(keyword);
              $('#noResult').show();
            }
          });
        }
      });
  };

});