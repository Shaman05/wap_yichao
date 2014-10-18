
define([
  'app/view/baseView',
  'text!app/template/goods/ajax_product_list.html',
  'app/service/api'
], function(baseView, tpl, model){
  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'comment-page',
      model: new model,
      ready: function(){

      }
    })
  );

});