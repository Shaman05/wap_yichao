"use strict";

define([
  'app/view/baseView',
  'text!app/template/user/ajax_address_list.html',
  'app/service/api'
], function(baseView, tpl, model){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'address-page',
      model: new model,
      ready: function(data){
        this.model.getMemberAddress('', '', function(d){
          var renderFn = _.artTemplate.compile(tpl);
          $('#addressListBox').html(renderFn({
            list: d.data
          }));
        });
      }
    })
  );

});