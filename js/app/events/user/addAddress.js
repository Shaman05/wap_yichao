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
      var FullText = $('#cityLabel').text();
      var selectedData = JSON.parse(window.sessionStorage.getItem('selectedCity') || '{}');
      var options = {
          Province: selectedData.province
        , City: selectedData.city
        , Area: selectedData.area
        , Street: Street || ''
        , Zip: Zip || ''
        , FullName: FullName || ''
        , Tel: ""
        , Mobile: Mobile || ''
        , Email: ""
        , AreaID: ""
        , FullText: FullText || ''
        , IsDefault: 0
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