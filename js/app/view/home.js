/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-8
 * Time: 下午3:32
 */

define(['app/view/baseView'], function(baseView){

  "use strict";

  return Backbone.View.extend(
    $.extend(baseView, {
      id: 'home-page',
      model: null
    })
  );

});