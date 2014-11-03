"use strict";

define([
	'app/view/baseView',
	'text!app/template/user/ajax_orderInfo.html',
	'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: new model,
	    ready: function(data){
				this.model.getOrderByID(data.OrderID, function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#orderInfoWrap').html(renderFn({
            info: d.data['tblOrder'][0],
            list: d.data['tblOrderGoods']
          }));
				});
	    }
    })
  );

});