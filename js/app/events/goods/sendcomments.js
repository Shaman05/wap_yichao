define(['events'], function(events){

  "use strict";

  return function(view, service){
    events.init();

    $(document)
      .on('click', '#star li a', function(){
        $('.focus').removeClass('focus');
        $(this).addClass('focus');
      })
      .on('click', '[type=submit]', function(){
        var param = util.getParam();
        var $content = $('#CommentContent');
        if(!$.trim($content.val())){
          alert('评论内容不能为空！');
          return;
        }
        var opt = {
            OrderID: param.OrderID  //来源订单ID
          , GoodsID: param.GoodsID   //评价商品ID
          , OrderGoodsID: param.OrderGoodsID   //订单明细ID
          , Star: $('.focus').attr('title')   //评价星级
          , Cons: ""  //不足
          , Pros: ""  //优点
          , Title: ""  //评论标题
          , CommentContent: $content.val()
        };
        service.addComment(opt, function(d){
          alert(d.message);
          if(d.status == '1'){
            //todo
            $content.val('');
          }
        });
      });
  };

});