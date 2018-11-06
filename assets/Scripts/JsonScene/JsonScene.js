// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var c2Utils = require("c2Utils");
var localStorage = require("localStorage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.testdata={
            "a":1,"b":2,"c":3,
         };
         this.demojson = {};
         this.testDataFoo();


        var is = "sdfa".startsWith("ss");
        cc.log('%s',is);
        
    },

    start () {

    },
    
    testDataFoo:function(){
        console.log('show testdata');
        
        for (var key in this.testdata) {
            console.log("this.testdata key = "+key+" value = "+this.testdata[key]);
        }
        console.log('-------------------');
        console.log('show getTestData');
        
        let ntestdata = c2Utils.deepCopy(this.getTestData());
        for (var key in ntestdata) {
            console.log("ntestdata key = "+key+" value = "+ntestdata[key]);
        }
        console.log('---------------change json ----------');
        ntestdata["a"] = 5;
        ntestdata["b"] = 6;
        ntestdata["c"] = 7;

        console.log('-----log source data------');
        for (var key in this.testdata) {
            console.log("this.testdata key = "+key+" value = "+this.testdata[key]);
        }
        console.log('--------show new data-------');
        for (var key in ntestdata) {
            console.log("ntestdata key = "+key+" value = "+ntestdata[key]);
        }
        console.log('the end-----------------');
    },

    getTestData:function(){
        return this.testdata;
    },

    loadJsonCall:function(event,customEventData){
        var self = this;
        cc.loader.loadRes("Data/demo",function(err,txt){

            if (err) {
                cc.log("读取数据---读取错误---："+err);
                return;
            }
            //在这里写加载完成之后的代码
            var objJson = txt;
            self.demojson = txt;
            cc.log('%s',JSON.stringify(txt));
            
            //我们想要得到 XiaoMing 的家庭成员：
            cc.log("小明的家庭成员 --->  "+objJson.XiaoMing.family);//这里直接会输出一个数组
            //现在我们想看 XiaoMing 第一个朋友的家庭成员，可以这样：
            var firstFriend = objJson.XiaoMing.friend[0];
            cc.log("第一位朋友 ---> "+firstFriend);
            cc.log("第一位朋友的家庭 ---> "+objJson[firstFriend].family);
            

        });
    },
    write :function(){
        if(Object.keys(this.demojson).length != 0){
            localStorage.setObject("jsd",this.demojson);
        }

        localStorage.setObject("locjsd",this.testdata);
    },
    read:function(){
        //var jsd = cc.sys.localStorage.read("jsd");
        var jsd = cc.sys.localStorage.getItem("jsd");
        cc.log('jsd:%s',jsd);

        var locjsdobj = localStorage.getObject("locjsd");
        var jsdstr = JSON.stringify(locjsdobj);
        cc.log('jsdstr:%s',jsdstr);
        
    },
    // update (dt) {},
});
