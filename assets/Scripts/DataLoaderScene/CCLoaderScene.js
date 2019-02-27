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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        uikiller.bind(this);

      
    },

    progressCallback : function(completedCount, totalCount, item){
        cc.log('CCLoaderScene-> '+completedCount+"/"+totalCount);
        let progress = completedCount / totalCount;//第二个参数是总时间
        this._ProgressBar.$ProgressBar.progress = progress;    
    },
    completeCallback: function(err, file){
        cc.log('CCLoaderScene-> '+file);
        
    },

    _onBtnStartTouchEnd: function(){
        cc.loader.loadResDir("testres/img/x2/Stimulate/angling",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("testres/img/x2/Stimulate/BackgroundLightEfficiency1",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("testres/img/x2/Stimulate/BackgroundLightEfficiency2",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("testres/img/x2/Stimulate/Stage",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("testres/img/x2/Stimulate/trumpet1",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("testres/img/x2/Stimulate/trumpet2",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("Data/demo",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("Data/material",this.progressCallback.bind(this),this.completeCallback.bind(this));
        cc.loader.loadRes("Data/achievement",this.progressCallback.bind(this),this.completeCallback.bind(this));
         
    },
    // update (dt) {},
});
