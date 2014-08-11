/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:34
 */

"use strict";

define([
  'text!app/template/public/header.html',
  'text!app/template/public/footer.html'
], function(header, footer){

  var config = APP.config;

  return {
    el: '#wrap',
    initialize: function(data){
      this.render(data);
    },
    render: function(data){
      var content = this._render(data);
      this.$el.html(content);
    },
    _render: function(data){
      var tpl = this.tpl || data._APP_TPL;
      var action = APP.ac;
      if(_.indexOf(config.noHeader, action) < 0){
        tpl = header + tpl;
      }
      if(_.indexOf(config.noFooter, action) < 0){
        tpl = tpl + footer;
      }
      var renderFn = _.artTemplate.compile(tpl);
      var _data = $.extend(data, this.setData());
      return renderFn(_data) || 'No template!';
    },
    setData: function(){
      return {};
    }
  }

});