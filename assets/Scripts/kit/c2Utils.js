"use strict";

String.prototype.startWith = function(compareStr){
    return this.indexOf(compareStr) == 0;
};
var c2Utils = {
    
    randomBool: function(){
    	var value = Math.random();
    	return value > 0.5;
    },
      /** 生成0-num的随机数 */
    random:function(num){
        return parseInt(Math.random()*num+1,10); 
    },
    /** 生成min-max，包含min,max 的整数*/
    random:function(min,max){
        return parseInt(Math.random()*(max-min+1)+min,10); 
    },
    //获取对象类型
    isType: function(obj){
        var type = Object.prototype.toString.call(obj);
        if(type == '[object Array]'){
    
            return 'Array';
        }else if(type == '[object Object]'){
            return 'Object';
        }else{
            return 'param is no object type';
        }
    
    },
    deepCopy:function(obj){
        if(typeof obj != 'object'){
            return obj;
        }
        var newobj = {};
        for ( var attr in obj) {
            newobj[attr] = this.deepCopy(obj[attr]);
        }
        return newobj;
    }
};


module.exports = c2Utils;