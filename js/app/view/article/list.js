"use strict";

define([
  'app/view/baseView',
  'text!app/template/article/ajax_list.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'article-page',
      model: new model,
      ready: function(){
        this.model.articleClass(0, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#list').html(renderFn({
            list: d.data
          }));
        });
      }
    })
  );

});