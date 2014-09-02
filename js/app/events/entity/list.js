/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:25
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();
    $(document)
      .on('click', '#entityList li', function(){
        var $this = $(this);
        var isLoaded = $this.attr('data-loaded');
        var province = $this.attr('data-province');
        var city = $this.attr('data-city');
        if(!isLoaded){
          view.getSubEntityList(province, city, function(html){
            $this.attr('data-loaded', '1').append(html).addClass('open');
          });
        }else{
          $this.toggleClass('open');
        }
      });
  };

});