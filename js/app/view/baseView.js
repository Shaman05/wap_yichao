/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:34
 */

"use strict";

define(['text!app/template/public/header.html', 'text!app/template/public/footer.html'], function(header, footer){

  return {
    el: '#wrap',
    initialize: function(data){
      this.render(data);
    },
    render: function(data){
      var content = this._render(data);
      this.$el.html(header + content + footer);
    },
    _render: function(data){
      return '';
    }
  }

});