/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:35
 */

define(['baseModel'], function (baseModel) {

  "use strict";

  var callApi = baseModel.callApi;

  return Backbone.Model.extend(
    $.extend(baseModel, {

      login: function (data, callback) {
        callApi('user/login', data, callback);
      }

    })
  );
});