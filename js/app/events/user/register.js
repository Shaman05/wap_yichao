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
        service.register(tel, pwd, {
          Email: '',
          NickName: '',
          Sex: '',
          Mobile: '',
          BirthDay: ''
        }, function(d){
          if(d.status == '1'){
            alert('注册成功');
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