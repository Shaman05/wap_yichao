/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-8-7
 * Time: 下午10:31
 *
 * 辅助函数
 */

define(['artTemplate'], function(t){

  "use strict";

  t.helper('test', function(data){
    return 'test function, data=' + JSON.stringify(data);
  });

});