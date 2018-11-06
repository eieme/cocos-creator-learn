

var UIType = cc.Enum({
    Dialog: 0, // 对话框
    Tip: -1, //提示，自动消失
});
/**UIShowMode 枚举，表示窗体不同的显示方式。
 *  Normal 类型表示窗体与其他窗体可以并列显示； 不会被 返回键 管理
 *  HideOther类型表示窗体显示的时候，需要隐藏所有其他窗体;
 *  ReverseChange 窗体主要应用与"弹出窗体"，维护多个弹出窗体的层级关系。 //后进先出 //后进不隐藏先出
 **/
var UIShowMode = cc.Enum({
    //普通
    Normal:0,
    //反向切换
    ReverseChange:-1,
    //隐藏其他
    HideOther: -1
});
//蒙版类型
var MaskType = cc.Enum({
    Translucence: 0, // 半透明
    Lucency: -1, //完全透明
});

var TouchMaskType = cc.Enum({
    //吞并点击，不做处理
    Swallow: 0,
    //穿透
    Pentrate: -1,
});

// var CloseType = cc.Enum({
//     //普通关闭
//     Normal: 0,
//     //点击关闭
//     Click: -1,
//     //自动关闭
//     Auto: -1,

// });
let UIView = cc.Class({
    extends: cc.Component,

    // editor:{
    //     executeInEditMode: true,
    // },

    properties: {
        uiType:{
            default: UIType.Dialog,
            type: UIType,
            tooltip: "UI 类型：\n1.对话框\n2.提示（自动关闭）",
            notify() {
                this._updateUIType();
            },
        },
        showMode:{
            default: UIShowMode.Normal,
            type: UIShowMode,
            tooltip: "显示类型：\n1.普通\n2.反向切换（后进先出）\n3.隐藏其他",
        },
        maskType:{
            default: MaskType.Translucence,
            type: MaskType, 
            tooltip: "蒙版类型：\n1.半透明\n2.全透明",
            notify() {
                this._updateMaskType();
            },           
        },

        touchMaskType:{
            default: TouchMaskType.Swallow,
            type: TouchMaskType,
            tooltip: "点击类型：\n1.吞并点击\n2.穿透点击",
            // notify() {
            //     this._updateTouchMaskType();
            // },
        },
        autoCloseDuration: {
            default: 1,
            type: cc.Float,
            min: 1.0,
            tooltip: "自动关闭延时"
        },
        
        isClearStack: {
            default: false,
            tooltip: "当显示这个窗体视图的时候，\n关闭其他窗体"
        },
        // closeType:{//最好不要用点击背景关闭
        //     default: CloseType.Normal,
        //     type: CloseType,
        //     tooltip: "UI关闭方式：\n1.正常点击按钮和返回键关闭\n2.点击背景关闭\n3.自动关闭",
        // },
    },
    
    onLoad: function(){
        
    },

    start: function () {
        
    },

    onInit: function(param){
        if(param){
            cc.log('UIView->param: %s',JSON.stringify(param));
        }        
    },


    //页面隐藏
    onUIHide: function(){

    },
    
    //页面从隐藏重新显示
    onUIReShow: function(){

    },

    
    /**
     * 页面唤醒 
     * 可能跟 onEnable 功能重叠
     */
    onUIAwake: function(){

    },
    /**
     * 页面冻结(显示，但是不参加事件监听，还在“栈”集合中) <\br>
     * 可能跟 onDisable 功能重叠
     */
    onUIFreeze: function(){

    },
    

    onShowCallback: function(){
        cc.log('UIView-> onShowCallback');
        
    },
    onCloseCallback: function(){
        cc.log('UIView-> onCloseCallback');
    },

    showAction : function(){
        this.node.scale = 0;
        let duration = 0.2;
        let action = cc.scaleTo(duration,1.0).easing(cc.easeBackOut());
        return action;
    },

    closeAction: function(){
        let duration = 0.2;
        let action = cc.scaleTo(duration,0).easing(cc.easeBackIn());
        return action;
    },
    
    //注册自动关闭
    registerAutoClose: function(){
        if(this.uiType == UIType.Tip){//如果是提示则自动关闭
            this.node.runAction(cc.sequence(
                cc.delayTime(this.autoCloseDuration),
                cc.callFunc(function() {
                    cc.uiManager.CloseUI(this);
                 }, this)
                ));
        }
    },
    //点击关闭
    _onClickMask: function(){

    },

    onKeyBack: function(){
        return true;
    },

    //只有在编辑器才执行
    _updateUIType: function(){
        if (CC_EDITOR) {
            if(this.uiType === UIType.Dialog){//一般情况下是 半透明，吞并点击，普通关闭
                this.maskType = MaskType.Translucence;
            }else if(this.uiType === UIType.Tip){//一般情况下是 透明，穿透，自动关闭
                this.maskType = MaskType.Lucency;
            }
        }
    },
    _updateMaskType: function(){
        if (CC_EDITOR) {
            if(this.maskType === MaskType.Translucence){// 半透明一般情况下是，吞并点击，普通关闭
                this.touchMaskType = TouchMaskType.Swallow;
            }else if(this.maskType === MaskType.Lucency){//一般情况下是 透明，穿透，自动关闭
                this.touchMaskType = TouchMaskType.Pentrate;
            }
        }
    },
    // _updateTouchMaskType: function(){
    //     if (CC_EDITOR) {
    //         if(this.touchMaskType === TouchMaskType.Swallow){//吞并点击，普通关闭
    //             this.closeType = CloseType.Normal;
    //         }else if(this.touchMaskType === TouchMaskType.Pentrate){//穿透，自动关闭
    //             this.closeType = CloseType.Auto;
    //         }
    //     }
    // },
});

if (CC_EDITOR) {
    //只有在 ui 是提示的时候才有自动隐藏的延时时间
    cc.Class.Attr.setClassAttr(UIView, 'autoCloseDuration', 'visible', function() {
        return this.uiType == UIType.Tip;
    });

    cc.Class.Attr.setClassAttr(UIView, 'isClearStack', 'visible', function() {
        return this.showMode == UIShowMode.ReverseChange;
    });
    
}


UIView.UIType = UIType;
UIView.UIShowMode = UIShowMode;
UIView.MaskType = MaskType;
UIView.TouchMaskType = TouchMaskType;
// UIView.CloseType = CloseType;
module.exports = UIView;