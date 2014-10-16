"use strict";

define([
  'app/view/baseView',
  'text!app/template/article/ajax_listmore.html',
  'app/service/api'
], function(baseView, tpl, model){

  var isLoading = false;

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'article-page',
      model: new model,
      page: 1,
      ready: function(data){
        if(!data.PageIndex){
          data.PageIndex = 1;
        }
        if(!data.TypeID){
          data.TypeID = "";
        }
        if(!data.ClassID){
          data.ClassID = "";
        }
        this.getData(data);
      },
      getData: function(data){
        var _this = this;
        if(!isLoading){
          isLoading = true;
          _this.model.articleList(data.TypeID, data.ClassID, _this.page, function(d){
            isLoading = false;
            if((d.data && d.data.length == 0) || !d.data){
              $('#listMore').data('noData', 1);
            }
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