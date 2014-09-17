"use strict";

define([
  'app/view/baseView',
  'text!app/template/goods/ajax_comments_list.html',
  'app/service/api'
], function(baseView, commentsTpl, api){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'comments-page',
      model: new api,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        this.model.goodsComments(data.GoodsID, data.PageIndex, function(d){
          var renderFn = _.artTemplate.compile(commentsTpl);
          $('#commentsWrap').html(renderFn({
            list: d.data,
            GoodsID: data.GoodsID
          }));
        });
      }
    })
  );

});