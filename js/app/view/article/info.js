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
      ready: function(params){
        this.model.articleInfo(params.id, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#info').html(renderFn(d.data));
        });
      }
    })
  );

});