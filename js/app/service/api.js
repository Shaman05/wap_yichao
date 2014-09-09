/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:35
 *
 * 商品接口: GoodsHandler
 * 实体店接口: ShopHandler
 * 文章: ArticleHandler
 * 搜索: GoodsSearch
 * 顾客:
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
          ParentID: aid
        };
        callApi.call(this, ArticleHandler, data, callback);
      },

      //实体店城市
      entityCity: function(callback){
        var data = {
          OP: "ShopList"
        };
        callApi.call(this, ShopHandler, data, callback);
      },
      //根据省市查询实体店列表
      subEntityList: function(province, city, callback){
        var data = {
          OP: "ShopByProvinceList",
          Province: province,
          City: city
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
      goodsList: function(gid, p, callback){
        var data = {
          OP: "GoodsByType",
          GoodsTypeID: gid,
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
      }
    })
  );
});