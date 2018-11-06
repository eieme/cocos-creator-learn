
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

    onLoad () {
        uikiller.bindComponent(this);
    },

    start () {

    },

    _onButtonTouchEnd: function(sender,event){
        cc.log('ActionsScene-> _onButtonTouchEnd');
        this.node.runAction(cc.actionAny(10,this.updateLabel.bind(this),this._label));
    },
    
    updateLabel: function(per){
        this._label.$Label.string = per*100;
    },
    

    // update (dt) {},
});
