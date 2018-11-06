// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let CustomUI = cc.Class({
    extends: cc.Sprite,

    properties: {
        //监听事件    
        senderEvent: '',
        //名字
        senderPath: '',
        //handle
        handlePath: '',
        //高级模式
        advanced: false,
        expression: {
            default: '',
            multiline: true,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

});
if (CC_EDITOR) {
    
    cc.Class.Attr.setClassAttr(CustomUI, 'fillRange', 'visible', function() {
        return false;
    });
    cc.Class.Attr.setClassAttr(CustomUI, 'senderPath', 'visible', function() {
        return !this.advanced;
    });

    cc.Class.Attr.setClassAttr(CustomUI, 'handlePath', 'visible', function() {
        return !this.advanced;
    });

    cc.Class.Attr.setClassAttr(CustomUI, 'expression', 'visible', function() {
        return this.advanced;
    });
}
module.exports = CustomUI;