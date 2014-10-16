/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:29
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();
    $(document)
      .on('click', '.data-province, .data-city, .data-area', function(){
        var $this = $(this);
        var $nextUl = $this.next('ul');
        var ParentID = $this.attr('data-ParentID');
        var realLevel = parseInt($this.attr('data-level'), 10) + 1;
        if($this.data('loaded') != '1'){
          service.getArea(realLevel, ParentID, function(d){
            var data = d.data;
            if(d.status == "0"){
              alert(d.message);
              return;
            }
            if(d.status == "1" && data && data.length > 0){
              $this.data('loaded', 1);
              view.renderList(data, realLevel, function(html){
                $nextUl.html(html);
              });
            }else{
              var lis = $this.parents('li').toArray().reverse();
              var text = '';
              for(var i = 0; i < lis.length; i++){
                text += $(lis[i]).attr('data-text');
              }
              window.sessionStorage.setItem('selectedCity', '{"text": "' + text + '"}');
              util.toPage('user.addAddress');
            }
          });
        }else{
          $nextUl.toggle();
        }
      });
  };

});