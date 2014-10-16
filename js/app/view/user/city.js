"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_address_list.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'selectAddress-page',
      model: new model,
      ready: function(){
        this.getArea(2, '');
      },
      getArea: function(AreaLevel, ParentID){
        var _this = this;
        var realLevel = parseInt(AreaLevel, 10) + 1;
        this.model.getArea(realLevel, ParentID, function(d){
          var data = d.data;
          if(d.status == "1"){
            _this.renderList(data, realLevel);
          }
        });
      },
      renderList: function(data, realLevel, callback){
        var len = data.length;
        var html = '';
        if(data && len > 0){
          for(var i = 0; i < len; i++){
            var item = data[i];
            html +=  '<li data-text="' + item['AreaName'] + '"><a class="data-province" href="javascript:" data-level="' + item['AreaLevel'] +
              '" data-ParentID="' + item['AreaID'] + '">' + item['AreaName'] + '</a><ul></ul></li>';
          }
          if(realLevel == 3){
            $('.cityList').html(html);
          }else{
            callback && callback(html);
          }
        }
      }
    })
  );

});