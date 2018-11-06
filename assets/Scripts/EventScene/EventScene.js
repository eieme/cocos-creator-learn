// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        btnA:{
            default: null,
            type:cc.Button,            
        },
        btnB:{
            default: null,
            type:cc.Button,            
        },
        btnC:{
            default: null,
            type:cc.Button,            
        },
        Game:{
            default: null,
            type:cc.Node, 
        }
        
    },

    onLoad () {
        cc.log('onLoad');

    },
    emitCall1: function(event,customEventData){
        this.node.emit("hello","hi,this is cocos creator");

        this.btnB.node.emit("hello","------------");
    },
    dispatchEventCall :function(event,customEventData){
        this.node.dispatchEvent(new cc.Event.EventCustom("hello",true));
        // var eventB = new cc.Event.EventCustom("hello",true);
        // eventB.setUserData("from btnB");
        // this.btnB.node.dispatchEvent(eventB);
        // var eventC = new cc.Event.EventCustom("hello",true);
        // eventC.setUserData("from btnC");        
        // this.btnC.node.dispatchEvent(eventC);
    },
    _sayHi: function (event) {
        console.log('%s',event.detail);
      },
    registerNodeEvent :function(){
        //
        this.node.on("hello",this._sayHi,this);

        this.btnA.node.on("hello",function(event){
            var data = event.getUserData();
            cc.log('btnA on hello : %s',data);
        },this);

        this.btnB.node.on("hello",function(event){
            var data = event.getUserData();
            if(data == "from btnC"){//如果是从 c 节点发出的事件，则停止传递当前事件
                event.stopPropagation();
            }
            cc.log('btnB on hello: %s',data);
        },this);

        this.btnC.node.on("hello",function(event){
            var data = event.getUserData();
            cc.log('btnC on hello: %s',data);
        },this);
    },
    unregisterNodeEvent :function(){
        //反注册  有效
        this.node.off("hello",this._sayHi,this);

        //反注册  无效
        this.btnA.node.off("hello",function(event){
            cc.log('btnA off hello');
        },this);

        this.btnB.node.off("hello",function(event){
            cc.log('btnB off hello');
        },this);

        this.btnC.node.off("hello",function(event){
            cc.log('btnC off hello');
        },this);
    },
    onEnable: function () {
        cc.log('onEnable');
        
        this.registerNodeEvent();
    },

    onDisable: function () {
        cc.log('onDisable');
        this.unregisterNodeEvent();
    },
    start () {
        cc.log('start');
    },

    // update (dt) {},
});
