/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:32
 */

"use strict";

define(['app/view/baseView'], function(baseView){

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'index-page',
      model: null
    })
  );

});