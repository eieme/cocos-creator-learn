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
        changebtn: {
            default: null,      
            type: cc.Button,
            displayName: '切换按钮', // optional
         },
         logupdate: true,
         loglastupdate:true,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onLoad: function () {
        cc.log('~~~~~~~~~~~ Scene1 onLoad');
        this.logupdate = true;
        this.loglastupdate = true;
        /*
        设置按钮参数 注册按钮点击事件
        */
       this.changebtn.node.on('click', this.changeScene, this);
    },
    start: function () {
        cc.log('~~~~~~~~~~~ Scene1 start');
        /* 场景节点不能设置成常驻节点
        //cc.game.addPersistRootNode(this.node);
        */
        
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.logupdate)
        {
            cc.log('~~~~~~~~~~~ Scene1 update');
            this.logupdate = false;
        }
        
    },
    lateUpdate: function (dt) {
        if(this.loglastupdate)
        {
            cc.log('~~~~~~~~~~~ Scene1 lateUpdate');
            this.loglastupdate = false;
        }
       
      },
    onEnable: function(){
        cc.log('~~~~~~~~~~~ Scene1 onEnable');
    },
    onDisable: function(){
        cc.log('~~~~~~~~~~~ Scene1 onDisable');
    },
    onDestroy: function(){
        cc.log('~~~~~~~~~~~ Scene1 onDestroy');
    },

    changeScene: function(event){
        cc.director.loadScene("Scene2",function(){

            console.log("scene2 loaded");
        });

    }
    // update (dt) {},
});
