"use strict";

define([
  'app/view/baseView',
  'text!app/template/article/ajax_info.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      ready: function(data){
        //#ac=article.info&ArticleID=16383
        this.model.articleInfo(data.ArticleID, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#pageName').text(d.data[0]['Title']);
          $('#info').html(renderFn(d.data[0]));
        });
      }
    })
  );

});