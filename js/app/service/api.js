/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-12
 * Time: 下午2:35
 */

define(['./base'], function (base) {

  "use strict";

  var callApi = base.callApi;

  return Backbone.Model.extend(
    $.extend(base, {
      //article
      articleList: function(params, callback){
        var data = {
          status: 1,
          message: '',
          data: [
            {id: 1, title: '眼镜知识 - 01'},
            {id: 2, title: '眼镜知识 - 02'},
            {id: 3, title: '眼镜知识 - 03'}
          ]
        };
        callback(data);
      },
      articleInfo: function(id, callback){
        var data = {
          status: '1',
          message: '',
          data: {
            id: '2',
            title: '眼镜知识 - 01',
            content: '&nbsp;&nbsp;眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识眼镜知识',
            pre: {
              id: '1',
              title: '验光重要性'
            },
            next: {
              id: '3',
              title: '新塘店开业通告新塘店开业通告新塘店开业通告'
            }
          }
        };
        callback(data);
      },

      //entity

      //goods
      goodsList: function(params, callback){
        console.log([1,2,3,4,5]);
      },

      //user
      login: function (params, callback) {
        callApi('user/login', params, callback);
      }
    })
  );
});