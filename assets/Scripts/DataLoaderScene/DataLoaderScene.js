
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
        for (let i = 1; i < 111; i++) {
            cc.dataloader.addRes("mmpic/xinyan1809"+i,cc.SpriteFrame);
            
        }  

        cc.dataloader.loadingCallback(function(progress,count,total){
            cc.log('time-> %s   progress:%s, count:%s, total:%s',new Date().toLocaleTimeString(), progress,count,total);  
            // this._ProgressBar.$ProgressBar.progress = progress;   
        }.bind(this));       

        cc.dataloader.endLoadCallback(function(){
            cc.log('load end');
        }.bind(this));
    },


    update (dt) {
      let progress = cc.dataloader.step(dt,10);
      this._ProgressBar.$ProgressBar.progress = progress;    
    },

    _onBtnStartTouchEnd: function(){
        cc.dataloader.begin();
    },
});
