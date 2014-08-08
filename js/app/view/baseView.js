/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:34
 */

"use strict";

define(['text!app/template/public/header.html', 'text!app/template/public/footer.html'], function(header, footer){

  var config = APP.config;

  return {
    el: '#wrap',
    initialize: function(data){
      this.render(data);
    },
    render: function(data){
      var action = APP.ac;
      var content = this._render(data);
      if(_.indexOf(config.noHeader, action) < 0){
        content = header + content;
      }
      if(_.indexOf(config.noFooter, action) < 0){
        content = content + footer;
      }
      this.$el.html(content);
    },
    _render: function(data){
      return '';
    }
  }

});