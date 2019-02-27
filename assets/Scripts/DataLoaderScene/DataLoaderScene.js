
let DataManagerAgent = require('DataManagerAgent');
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

    // onLoad () {},

    start () { 
        
        uikiller.bind(this);
        cc.dataloader.addDir("testres/img/x2/Stimulate/angling",cc.SpriteFrame);
        cc.dataloader.addRes("testres/img/x2/Stimulate/BackgroundLightEfficiency1",cc.SpriteFrame);
        cc.dataloader.addRes("testres/img/x2/Stimulate/BackgroundLightEfficiency2",cc.SpriteFrame);
        cc.dataloader.addRes("testres/img/x2/Stimulate/Stage",cc.SpriteFrame);
        cc.dataloader.addRes("testres/img/x2/Stimulate/trumpet1",cc.SpriteFrame);
        cc.dataloader.addRes("testres/img/x2/Stimulate/trumpet2",cc.SpriteFrame);
        cc.dataloader.addData("Data/demo");      
        cc.dataloader.addData("Data/material");    
        cc.dataloader.addData("Data/achievement");      

        cc.dataloader.setDataLoadEndCallback(cc.datamanager.readData.bind(cc.datamanager));
        
        cc.datamanager.setAgent(new DataManagerAgent());
    },


    update (dt) {
      let progress = cc.dataloader.step(dt,3);//第二个参数是总时间
      this._ProgressBar.$ProgressBar.progress = progress;    
    },

    _onBtnStartTouchEnd: function(){
        cc.dataloader.begin(this.progressCallback.bind(this),this.completeCallback.bind(this));
    },
    progressCallback: function(args){
        cc.log('time-> %s   progress:%s, count:%s, total:%s',new Date().toLocaleTimeString(), args.progress,args.count,args.total);  
        // this._ProgressBar.$ProgressBar.progress = args.progress;
        cc.log('DataLoaderScene-> %s',JSON.stringify(args.asset));

    },

    completeCallback: function(){
        cc.log('load end');
        cc.datamanager.getDatas();
    },
});
