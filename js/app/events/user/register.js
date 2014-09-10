/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-19
 * Time: 下午3:29
 */

define(['events'], function(events){

  "use strict";

  window.registerSuccess = function(){
    var lastHash = window.sessionStorage.getItem('lastHash');
    util.toPage(lastHash);
  }

  return function(view, service){
    events.init();

    var $telephone = $('[name=telephone]');
    var $password = $('[name=password]');
    var $password2 = $('[name=password2]');

    $(document)
      .on('blur', '[name=telephone]', function(){
        $('#phone-tip').text('正在验证...');
        //todo
      })
      .on('click', '#registerBtn', function(){
        var tel = $telephone.val();
        var pwd = $password.val();
        var pwd2 = $password2.val();
        if(!tel || !pwd || !pwd2){
          alert('用户名或者密码必填!');
          return;
        }
        if(!checkPwd(pwd, pwd2)){
          alert('两次密码不一致!');
          return;
        }
        service.register(tel, pwd, {
          Email: '',
          NickName: '',
          Sex: '',
          Mobile: '',
          BirthDay: ''
        }, function(d){
          if(d.status == '1'){
            window.sessionStorage.setItem('userInfo', JSON.stringify(d.data[0]));
            alert({
              html: '注册成功',
              onApply: 'registerSuccess',
              autoClose: 3000
            });
          }else{
            alert(d.message);
          }
        });
      });
  };

  function checkPwd(pwd1, pwd2){
    return pwd1 === pwd2;
  }

});