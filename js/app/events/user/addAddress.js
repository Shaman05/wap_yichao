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

    $(document).on('click', '#applyAddAddress', function(){
      var Street = $('[name=Street]').val();
      var Zip = $('[name=Zip]').val();
      var FullName = $('[name=FullName]').val();
      var Mobile = $('[name=Mobile]').val();
      var options = {
          Province: ""
        , City: ""
        , Area: ""
        , Street: Street || ''
        , Zip: Zip || ''
        , FullName: FullName || ''
        , Tel: ""
        , Mobile: Mobile || ''
        , Email: ""
        , AreaID: ""
        , IsDefault: 1
      };
      checkInput() && service.memberAddressAdd(options, function(d){
        alert(d.message);
        if(d.status == '1'){
          util.toPage('user.ordermess');
        }
      });
    });
  };

  function checkInput(){
    return true;
  }

});