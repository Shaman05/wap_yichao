"use strict";

define([
  'app/view/baseView',
  'text!app/template/article/ajax_listmore.html',
  'app/service/api'
], function(baseView, tpl, model){

  var isLoading = false;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
      page: 1,
      ready: function(){
        this.getData();
      },
      getData: function(){
        var _this = this;
        if(!isLoading){
          isLoading = true;
          console.log('loading data!');
          _this.model.articleList('1', '1', _this.page, function(d){
            isLoading = false;
            var renderFn = _.artTemplate.compile(tpl);
            $('#listMore').append(renderFn({
              list: d.data
            }));
            _this.page += 1;
          });
        }
      }
    })
  );

});