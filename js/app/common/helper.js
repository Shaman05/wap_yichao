/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午10:31
 *
 * 辅助函数
 */

define(['artTemplate'], function(t){

  "use strict";

  t.helper('test', function(data){
    return 'test function, data=' + JSON.stringify(data);
  });

  //分页按钮显示
  t.helper('displayPageBtn', function(url, PageIndex, nPageCount, PageSize){
    var p = parseInt(PageIndex);
    var prevBtnTpl = '<a class="pageUp {disableClass}" href="{link}">上一页</a>';
    var nextBtnTpl = '<a class="pageNext {disableClass}" href="{link}">下一页</a>';
    var disable = 'javascript:';
    var totalPage = Math.ceil(nPageCount/PageSize);
    var prevHref = p < 2 ? disable : url + '&PageIndex=' + (p - 1);
    var nextHref = p == totalPage ? disable : url + '&PageIndex=' + (p + 1);
    prevBtnTpl = prevBtnTpl.replace('{link}', prevHref);
    nextBtnTpl = nextBtnTpl.replace('{link}', nextHref);
    if(prevHref == disable){
      prevBtnTpl = prevBtnTpl.replace('{disableClass}', 'disableClass');
    }
    if(nextBtnTpl == disable){
      nextBtnTpl = nextBtnTpl.replace('{disableClass}', 'disableClass');
    }
    return prevBtnTpl + ' ' + nextBtnTpl;
  });

});