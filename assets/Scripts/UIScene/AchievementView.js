let UIView = require('UIView');
cc.Class({
    extends: UIView,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        uikiller.bindComponent(this);
        let sp = this.node.$Sprite;
        cc.log('AchievementView-> %s',sp.getTextureFilename());
        
    },

    start () {
        this.maskType = UIView.MaskType.Lucency;
        cc.log('AchievementView->  this.maskType:'+ this.maskType);
        
    },

    // update (dt) {},
});
