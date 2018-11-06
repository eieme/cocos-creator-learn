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
        btn1: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Button, // optional, default is typeof default
        },
        btn2: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Button, // optional, default is typeof default
        },
        btn3: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Button, // optional, default is typeof default
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        //按钮1添加监听
        this.btn1.node.on("click",this.btn1_clickcallback,this);
        this.btn1.canshu = "btn1";

        //this.btn2
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "ButtonScene";
        clickEventHandler.handler = "btn2_clickcallback";
        clickEventHandler.customEventData = "foor";
        this.btn2.clickEvents.push(clickEventHandler);
    },

    start () {

    },

    btn1_clickcallback: function(event){
        var btn = event.detail;
        var canshu = btn.canshu;

        console.log("%s clicked canshu:%s",btn.name,canshu);
    },
    btn2_clickcallback: function(event,customEventData){
        var node = event.target;
        var btn = node.getComponent(cc.Button);

        console.log("%s clicked customEventData = %s",btn.name,customEventData);
    },
    btn3_clickcallback: function(event,customEventData){
        var node = event.target;
        var btn = node.getComponent(cc.Button);

        console.log("%s clicked customEventData = %s",btn.name,customEventData);
    },
    // update (dt) {},
});
