/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:34
 */

"use strict";

define(['text!app/template/common/header.html', 'text!app/template/common/footer.html'], function(header, footer){

  return {
    el: '#wrap',
    initialize: function(){
      this.render();
    },
    render: function(){
      var content = this._render();
      this.$el.html(header + content + footer);
    },
    _render: function(){
      return '';
    }
  }

});