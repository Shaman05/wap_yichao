/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午10:32
 */

(function(){

  "use strict";

  window.APP = {};

  window.APP.config = {
    domain: 'http://www.bluemini.cn',
    apiUrl: '/Interfaces/',
    isDebug: true, //开启后，所有api调用结果将会alert出来
    homeAction: 'ac=home',

    needLogin: true,
    passport: {
      name: 'test',
      pwd: '123456'
    },

    //模板碎片配置
    noHeader: [
    ],
    noTitleBar: [
      'home',
      'goods.index',
      'goods.moreselect'
    ],
    noFooter: [
      'user.login',
      'user.register',
      'goods.brand'
    ],

    //页面
    pageName: {
      map: '网站地图',
      api: '接口测试',
      article: {
        info: '文章详情',
        list: '文章分类',
        listmore: '文章分类列表'
      },
      goods: {
        brand: '品牌',
        comments: '产品评论',
        groupbuy: '团购',
        groupbuy_info: '团购套餐',
        product_info: '产品详情',
        product_list: '产品框架框',
        sort: '所有商品分类'
      },
      user: {
        addAddress: '填写订单信息',
        address: '填写订单信息',
        city: '选择城市',
        login: '用户登陆',
        myorder: '我的订单',
        myorder_info: '订单详情',
        ordermess: '填写订单信息',
        ordersuccess: '提交订单成功',
        register: '用户注册',
        service: '咨询客服',
        shoppingcart: '购物车'
      },
      search:{
        index: '搜索',
        list: '搜索'
      },
      entity: {
        index: '实体店名',
        list: '实体店'
      }
    },

    template: function(){
      this.artTemplate.config({
        openTag: '<%',
        closeTag: '%>'
      });
    }
  };

})();