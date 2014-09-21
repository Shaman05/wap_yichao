/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:35
 *
 */

define(['./base'], function (base) {

  "use strict";

  //接口文件名和相关配置
  var callApi = base.callApi;
  var ArticleHandler = 'ArticleHandler';
  var GoodsHandler = 'GoodsHandler';
  var ShopHandler = 'ShopHandler';
  var SearchHandler = 'SearchHandler';
  var UserHandler = 'UserLoginHandler';
  var OrderHandler = 'OrderHandler';
  var OrderCartHandler = 'OrderCartHandler';
  var PromotionHandler = 'PromotionHandler';
  var pageSize = APP.config.pageSize;

  return Backbone.Model.extend(
    $.extend(base, {
      //文章分类
      articleClass: function(pid, callback){
        var data = {
          OP: "ArticleClass",
          ParentID: pid
        };
        callApi.call(this, ArticleHandler, data, callback);
      },
      //文章列表
      articleList: function(typeId, classId, p, callback){
        var data = $.extend({
          OP: "ArticleList",
          TypeID: typeId,
          ClassID: classId,
          PageIndex: p,
          PageSize: pageSize
        });
        callApi.call(this, ArticleHandler, data, callback);
      },
      //文章详细信息
      articleInfo: function(aid, callback){
        var data = {
          OP: "ArticleByID",
          ArticleID: aid
        };
        callApi.call(this, ArticleHandler, data, callback);
      },

      //实体店城市
      entityCity: function(callback){
        var data = {
          OP: "GetByCity"
        };
        callApi.call(this, ShopHandler, data, callback);
      },
      //根据省市查询实体店列表
      subEntityList: function(cityID, callback){
        var data = {
          OP: "ShopByProvinceList",
          Province: "",
          City: cityID
        };
        callApi.call(this, ShopHandler, data, callback);
      },
      //店面详细信息
      entityInfo: function(eid, callback){
        var data = {
          OP: "ShopById",
          ShopID: eid
        };
        callApi.call(this, ShopHandler, data, callback);
      },

      //商品类型
      goodsType: function(callback){
        var data = {
          OP: "GoodsType"
        };
        callApi.call(this, GoodsHandler, data, callback);
      },
      //商品类型列表
      goodsList: function(gid, pid, vid, p, callback){
        var data = {
          OP: "GoodsByType",
          GoodsTypeID: gid,
          PropertyID: pid,
          ValueID: vid,
          PageIndex: p,
          PageSize: pageSize
        };
        callApi.call(this, GoodsHandler, data, callback);
      },
      //商品详情
      goodsInfo: function(gid, callback){
        var data = {
          OP: "GoodsById",
          GoodsID: gid
        };
        callApi.call(this, GoodsHandler, data, callback);
      },
      //商品评论列表
      goodsComments: function(gid, p, callback){
        var data = {
          OP: "MemberCommentByGoodsID",
          GoodsID: gid,
          PageIndex: p,
          PageSize: pageSize
        };
        callApi.call(this, GoodsHandler, data, callback);
      },
      //商品品牌信息
      goodsBrand: function(gid, p, callback){
        var data = {
          OP: "GoodsBrand",
          GoodsTypeID: gid,
          PageIndex: p,
          PageSize: pageSize
        };
        callApi.call(this, GoodsHandler, data, callback);
      },
      //全部属性分类
      goodsPropertyList: function(gid, callback){
        var data = {
          OP: "GoodsPropertyByTypeID",
          GoodsTypeID: gid
        };
        callApi.call(this, GoodsHandler, data, callback);
      },
      //属性值分类
      goodsPropertyByValueList: function(pid, callback){
        var data = {
          OP: "GoodsPropertyValueByPropertyID",
          PropertyID: pid
        };
        callApi.call(this, GoodsHandler, data, callback);
      },

      //团购
      groupBuyList: function(gid, name, p, callback){
        var data = {
          OP: "PromotionList",
          GoodsTypeID: gid,
          SetName: name,
          PageIndex: p,
          PageSize: pageSize
        };
        callApi.call(this, PromotionHandler, data, callback);
      },
      //团购详情
      groupBuyInfo: function(gid, callback){
        var data = {
          OP: "PromotionByID",
          PromotionID: gid
        };
        callApi.call(this, PromotionHandler, data, callback);
      },

      //搜索
      goodsSearch: function(keywords, p, callback){
        var data = $.extend({
          OP: "GoodsSearch",
          GoodsName: encodeURI(keywords),
          PageIndex: p,
          PageSize: pageSize
        });
        callApi.call(this, SearchHandler, data, callback);
      },

      //User
      login: function (name, pwd, callback) {
        var data = {
          OP: "MemberLogin",
          UserName: name,
          UserPwd: pwd
        };
        callApi.call(this, UserHandler, data, callback);
      },
      register: function(name, pwd, extraOpt, callback){
        var data = {
          OP: "MemberRegister",
          UserName: name,
          UserPwd: pwd
        };
        data = $.extend(data, extraOpt);
        callApi.call(this, UserHandler, data, callback);
      },
      checkName: function(name, callback){
        var data = {
          OP: "MemberIsUserName",
          UserName: name
        };
        callApi.call(this, UserHandler, data, callback);
      },

      //订单
      orderList: function(StatusID, p, callback){
        var data = {
          OP: "GetOrderList",
          StatusID: "",
          PageIndex: p,
          PageSize: pageSize
        };
        callApi.call(this, OrderHandler, data, callback);
      },
      orderAdd: function(orderOption, callback){
        var data = {
          OP: "OrderAdd"
        };
        data = $.extend(data, orderOption);
        callApi.call(this, OrderHandler, data, callback);
      },
      //支付接口
      payOrder: function(OrderID, callback){
        var data = {
          OP: "PayOrder",
          OrderID: OrderID
        };
        callApi.call(this, OrderHandler, data, callback);
      },
      //购物车列表
      cartList: function(goodsName, goodsId, p, callback){
        var data = {
          OP: "OrderCartList",
          GoodsName: "",
          GoodsTypeID: "",
          PageIndex: p,
          PageSize: pageSize
        };
        callApi.call(this, OrderCartHandler, data, callback);
      },

      //获取首页轮播图
      homeSlider: function(callback){
        var data = {
          OP: "WebSpaceAdvertising"
        };
        callApi.call(this, GoodsHandler, data, callback);
      },

      //获取实体店轮播图
      entitySlider: function(ShopID, callback){
        var data = {
          OP: "ShopImg",
          ShopID: ShopID
        };
        callApi.call(this, GoodsHandler, data, callback);
      },

      //获取产品详情轮播图
      goodsInfoSlider: function(GoodsID, callback){
        var data = {
          OP: "GoodsByImage",
          GoodsID: GoodsID
        };
        callApi.call(this, GoodsHandler, data, callback);
      },

      //历史验光单, 只获取最新的3条
      prescriptionsList: function(callback){
        var data = {
          OP: "MemberPrescriptionsList",
          PageIndex: 1,
          PageSize: 3
        };
        callApi.call(this, OrderHandler, data, callback);
      },

      //验光单详情
      prescriptionsInfo: function(PrescriptionsID, callback){
        var data = {
          OP: "MemberPrescriptionsList",
          PrescriptionsID: PrescriptionsID
        };
        callApi.call(this, OrderHandler, data, callback);
      },

      //添加至购物车
      addToCart: function(cartOption, callback){
        var data = {
          OP: "OrderCartAdd"
        };
        data = $.extend(data, cartOption);
        callApi.call(this, OrderCartHandler, data, callback);
      }
    })
  );
});