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

  /**
   * 分页按钮显示
   * url: 基础url
   * PageIndex: 当前页
   * nPageCount: 总条数
   * PageSize: 每一页条数
   */
  t.helper('displayPageBtn', function(url, PageIndex, nPageCount, PageSize){
    var p = parseInt(PageIndex);
    var prevBtnTpl = '<a class="pageUp {disableClass}" href="{link}">上一页</a>';
    var nextBtnTpl = '<a class="pageNext {disableClass}" href="{link}">下一页</a>';
    var disable = 'javascript:';
    var totalPage = Math.ceil(nPageCount/PageSize);
    var prevHref = p < 2 ? disable : url + '&PageIndex=' + (p - 1);
    var nextHref = p == totalPage ? disable : url + '&PageIndex=' + (p + 1);
    prevBtnTpl = prevBtnTpl.replace('{link}', prevHref).replace('{disableClass}', prevHref == disable ? 'disableClass' : '');
    nextBtnTpl = nextBtnTpl.replace('{link}', nextHref).replace('{disableClass}', nextBtnTpl == disable ? 'disableClass' : '');
    return prevBtnTpl + ' ' + nextBtnTpl;
  });

});