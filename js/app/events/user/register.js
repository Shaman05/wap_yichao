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
    var $pwd1tip = $('#pwd1-tip');
    var $pwd2tip = $('#pwd2-tip');

    $(document)
      .on('click', '#offDisplay', switchPwdDisplay)
      .on('click', '#onDisplay', switchPwdDisplay)
      .on('focus', '[name=telephone]', function(){
        $nameTip.text('').hide();
      })
      //输入用户名失焦点
      .on('blur', '[name=telephone]', function(){
        var name = $telephone.val();
        if(!name) {
          $nameTip.text('用户名必填!').show();
          return;
        }else if(!name.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) && !name.match(/^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/)){
          $nameTip.text('请输入正确的邮箱/手机号!').show();
          return;
        }
        $nameTip.text('正在验证...').show();

        service.checkName(name, function(d){
          if(d.status == '1'){
            $nameTip.text('').hide();
          }else{
            $nameTip.text(d.message);//.css('color', 'red');
          }
        });
      })
      //输入密码失焦点
      .on('blur', '[name=password]', function(){
        var pwdNum = $password.val();
        if(pwdNum){
          $pwd1tip.addClass('verfiyIcn').show().html('<i class="icons"></i>');
        }else{
          $pwd1tip.removeClass('verfiyIcn').empty().hide();
          $pwd1tip.text('密码必填!').show();
        }
      })
      .on('click', '#registerBtn', function(){
        var tel = $telephone.val();
        var pwd = $password.val();
        var pwd2 = $password2.val();

        if(!tel && !pwd && !pwd2){
          $nameTip.text('用户名必填!').show();
          return;
        }else if(tel && !pwd && !pwd2){
          $pwd1tip.text('密码必填!').show();
          $pwd2tip.text('确认密码必填!').show();
          return;
        }else if(tel && pwd && !pwd2){
          $pwd2tip.text('确认密码必填!').show();
          return;
        }else if(tel && !pwd && pwd2){
          $pwd1tip.text('密码必填!').show();
          return;
        }else if(!tel && pwd && pwd2){
          $nameTip.text('用户名必填!').show();
          return;
        }

        if(!checkPwd(pwd, pwd2)){
          $pwd2tip.text('两次密码不一致!').show();
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
            $pwd1tip.hide();
            $pwd2tip.hide();
          }else{
            //防止后端status返回错误，做的处理
            window.sessionStorage.removeItem('userInfo');
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