/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:34
 */

"use strict";

define([
  'text!app/template/public/header.html',
  'text!app/template/public/titleBar.html',
  'text!app/template/public/footer.html',
  'text!app/template/public/ajax_goodsType.html',
  'app/service/api'
], function(header, titleBar, footer, goodsTypeTpl, api){

  var config = APP.config;
  var pageMap = config.pageName;

  return {
    el: '.app_wrap',
    id: 'normal_page',
    initialize: function(data){
      this.render(data);
    },
    render: function(data){
      var content = this._render(data);
      this.$el.attr('id', this.id).html(content);
      this.commonData(data);
      this.ready(data);
    },
    _render: function(data){
      var tpl = '';
      var content = this.tpl || data._APP_TPL || '<p class="no_tpl_assigned">No template assigned!</p>';
      var ac = data.ac;
      var userInfo = util.getUserInfo();
      if(_.indexOf(config.needLoginPage, ac) >= 0 && !userInfo){
        util.toPage('user.login');
        return false;
      }
      if(_.indexOf(config.noLastHashPage, ac) < 0){
        window.sessionStorage.setItem('lastHash', ac);
      }
      if(_.indexOf(config.noHeader, ac) < 0){
        tpl += header;
      }
      if(_.indexOf(config.noTitleBar, ac) < 0){
        tpl += titleBar;
      }
      tpl += content;
      if(_.indexOf(config.noFooter, ac) < 0){
        tpl = tpl + footer;
      }
      var renderFn = _.artTemplate.compile(tpl);
      var _data = $.extend(data, {
        pageName: parseAction(ac, pageMap)
      });
      _data = $.extend(_data, this.data());
      return renderFn(_data);
    },
    data: function(){
      return {};
    },
    ready: function(params){
      //page ready
    },
    commonData: function(data){
      var service = new api();
      service.goodsType(function(d){
        var renderFn = _.artTemplate.compile(goodsTypeTpl);
        var listHtml = renderFn({list: d.data});
        //顶部商品分类
        $('#goodsTypeList').html(listHtml);
        //search.index的商品分类
        if(data.ac === "search.index"){
          $('#allGoodsst').append(listHtml);
        }
      });
    }
  };

  //解析ac 从配置取出页面名称
  function parseAction(ac, map){
    var path = ac.split('.');
    var base = path[0];
    var newMap = map[base];
    if(!newMap){
      return 'No title';
    }
    if(typeof newMap == 'string'){
      return newMap;
    }
    return parseAction(path[1], newMap);
  }

});