let SceneManager = require('SceneManager');
cc.Class({
    extends: cc.Component,

    properties: {
        transitionPrefab: {
            default: null,
            type: cc.Prefab
        },
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
        this.transition = cc.instantiate(this.transitionPrefab);

        // cc.loader.loadRes

    },

    start () {

    },


    toScene1: function(event,customEventData){

        SceneManager.replaceScene("TransitionScene1",cc.color(0,0,0,255));
    },
    toScene2: function(event,customEventData){
        SceneManager.replaceScene("TransitionScene2");
    },

    // update (dt) {},
});
