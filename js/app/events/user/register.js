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
    var $nameTip = $('#phone-tip');

    $(document)
      .on('click', '#offDisplay', switchPwdDisplay)
      .on('click', '#onDisplay', switchPwdDisplay)
      .on('focus', '[name=telephone]', function(){
        $nameTip.text('').hide();
      })
      .on('blur', '[name=telephone]', function(){
        var name = $telephone.val();
        if(!name)return;
        $nameTip.text('正在验证...').css('color', '').show();
        service.checkName(name, function(d){
          if(d.status == '1'){
            $nameTip.text('').hide();
          }else{
            $nameTip.text(d.message).css('color', 'red');
          }
        });
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
          alert(d.message);
          if(d.status == '1'){
            window.sessionStorage.setItem('userInfo', JSON.stringify(d.data[0]));
            util.toPage(window.sessionStorage.getItem('lastHash') || 'home');
          }
        });
      });

    function switchPwdDisplay(){
      var type = $(this).attr('for') == 'no' ? 'password' : 'text';
      $password.attr('type', type);
      $password2.attr('type', type);
    }
  };

  function checkPwd(pwd1, pwd2){
    return pwd1 === pwd2;
  }

});