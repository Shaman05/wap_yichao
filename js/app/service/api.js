/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:35
 */

define(['./base'], function (base) {

  "use strict";

  var callApi = base.callApi;

  return Backbone.Model.extend(
    $.extend(base, {
      //article

      //entity

      //goods
      goodsList: function(){
        console.log([1,2,3,4,5]);
      },

      //user
      login: function (data, callback) {
        callApi('user/login', data, callback);
      }
    })
  );
});