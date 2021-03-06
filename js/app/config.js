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
    pageSize: 20,

    needLogin: true,
    passport: {
      name: 'test',
      pwd: '123456'
    },
    needLoginPage: [
      'user.addAddress',
      'user.address',
      'user.myorder',
      'user.myorder_info',
      'user.ordermess',
      'user.ordersuccess',
      'user.shoppingcart',
    ],

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
    //不需要记录lashHash
    noLastHashPage: [
      'user.login',
      'user.register'
    ],

    //页面
    pageName: {
      map: '网站地图',
      api: '接口测试',
      join: {
        join: '实体店加盟'
      },
      article: {
        info: '',
        list: '文章分类',
        listmore: '文章分类列表'
      },
      goods: {
        brand: '品牌',
        comments: '产品评论',
        groupbuy: '团购',
        groupbuy_info: '团购套餐',
        product_info: '产品详情',
        product_list: '产品框架',
        sort: '所有商品分类',
        sendcomments:'评价商品'
      },
      user: {
        addAddress: '新增收货地址',
        address: '现有收货地址',
        city: '选择城市',
        login: '用户登录',
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
        index: '',
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