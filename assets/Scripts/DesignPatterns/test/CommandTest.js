
let CommandManager = require('CommandManager').commandManager;
let CommandType = require('CommandType');
let CommandMove = require('CommandMove');
let CommandDelay = require('CommandDelay');
let CommandRotate = require('CommandRotate');
cc.Class({
    extends: cc.Component,

    properties: {
        actor: {
            default: null,                                          
            type: cc.Node, 
        },
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
        // CommandManager.addCommand(this.actor,new CommandMove(2,cc.v2(0,100)));
        // CommandManager.addCommand(this.actor,new CommandDelay(1));
        // CommandManager.addCommand(this.actor,new CommandRotate(1,359));
        // CommandManager.addCommand(this.actor,new CommandMove(1,cc.v2(100,0)));
        // CommandManager.startCommand();
        let list = [];
        list.push(cc.moveBy(2,cc.v2(0,100)));
        list.push(cc.delayTime(1));
        list.push(cc.rotateBy(1,258));
        list.push(cc.moveBy(2,cc.v2(100,0)));

        this.actor.runAction(cc.sequence(list));
    },

    start () {

    },

    // update (dt) {},
});
