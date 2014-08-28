"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_comments.html',
  'app/service/api'
], function(baseView, commentsTpl, api){

  var page = 1;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'comments-page',
      model: new api,
      ready: function(data){
        this.model.goodsComments(data.GoodsID, page, function(d){
          var renderFn = _.artTemplate.compile(commentsTpl);
          $('#commentsWrap').html(renderFn({
            list: d.data
          }));
        });
      }
    })
  );

});