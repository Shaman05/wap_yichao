/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-18
 * Time: 上午9:58
 */

define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();

    var $account = $('[name=account]');
    var $pwd = $('[name=password]');
    $(document)
      .on('click', '#loginBtn', function(){
        var name = $account.val();
        var pwd = $pwd.val();
        if(!name || !pwd){
          alert('用户名或密码不能为空!');
          return;
        }
        service.login(name, pwd, function(d){
          if(d.status == '1'){
            window.sessionStorage.setItem('userInfo', JSON.stringify(d.data));
            util.toPage('home');
          }else{
            alert(d.message);
          }
        });
      });
  };

});