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
        
    },

    // LIFE-CYCLE CALLBACKS:

    //sheep_down
    //sheep_run
    //sheep_touch
    //sheep_jump
    onLoad :function(){
        var self = this;
        this.animation = this.node.getComponent(cc.Animation);

    },
  
    start :function(){

    },

    onPlayJumpCall :function(event,customEventData){
        cc.log('onPlayJumpCall');
        this.animation.play('sheep_jump');
    },
    onFinishFram :function(event){
        let animState = event.detail;
        let animName = animState.name;
        cc.log('animState name: %s, event type: %s',animState.name,event.type);
        switch(animName){
            case "sheep_run":

            break;
            case "sheep_jump":
                this.onJumpFinishedFrame(event);
            break;
            case "sheep_down":
                this.onDownFinishedFrame(event);
            break;
            case "sheep_touch":
                this.onTouchFinishedFrame(event);
            break;
        }
    },
    onJumpFinishedFrame :function(event){
        cc.log('onJumpFinishedFrame');
        this.animation.play("sheep_down");
    },

    onDownFinishedFrame :function(event){
        cc.log('onDownFinishedFrame'); 
        this.animation.play("sheep_run");
    },
    onTouchFinishedFrame :function(event){
        var self = this;
        cc.log('onTouchFinishedFrame');  
        
        this.animation.play("sheep_run");             
    },
    onTouchListener: function(){
        cc.log('onTouchListener');
        this.animation.play("sheep_touch");
    },
    onEnable :function(){
        cc.log('onEnable');
        
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchListener,this);

        this.animation.on('finished', this.onFinishFram,   this);
    },
    onDisable :function(){
        cc.log('onDisable');
        
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchListener,this);

        this.animation.off('finished', this.onFinishFram,   this);
    },
    // update (dt) {},
});
