
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('UIScene: ');
        cc.keybord.register(this);
        uikiller.bind(this);
        this.arr = [0,5,2,1,58,3,6,4,8,6,55];
        this.ar = 0;
    },

    start () {
        cc.uiManager.register("TestLayout1","prefabs/TestLayout1");
        
        cc.uiManager.register("TestLayout2","prefabs/TestLayout2");
        
        cc.uiManager.register("TestLayout3","prefabs/TestLayout3");
        

        
    },
    update: function(dt){
        cc.keybord.onCheckDurationKeys(this.onKeyDuration,this);
    },
    onKeyUp: function(event){
        if(event.keyCode == cc.KEY.e){
            cc.log('UIScene-> keyCode e ');
            let val = this.arr.random();
            cc.log('UIScene->array random %d',val);
            cc.uiManager.ShowUI("TestLayout1");
        }else{
            cc.log('UIScene-> ------------------------------');
                
            cc.log('UIScene-> cc.randomFloat(1) random----:%s',cc.randomFloat(1));
            cc.log('UIScene-> cc.randomFloat(5) random----:%s',cc.randomFloat(5));
            cc.log('UIScene-> cc.randomFloat(5,20) random----:%s',cc.randomFloat(5,20));
            cc.log('UIScene-> cc.randomInt(5) random----:%s',cc.randomInt(5));
            cc.log('UIScene-> cc.randomInt(5,20) random----:%s',cc.randomInt(5,20));
            cc.log('UIScene-> cc.randomInt(-10,16) random----:%s',cc.randomInt(-10,16));        
        }
    },
    onKeyBack :function(){
        cc.log('BaseScene: onKeyBack');
        cc.log('UIScene-> %d',this.ar);
        
        cc.uiManager.showToast("onKeyBack CloseUI");
        cc.uiManager.CloseUI();
        return true;
    },
    
    _onOpen1TouchEnd: function(event){
        cc.log('UIScene-> _onOpen1TouchEnd');
        cc.uiManager.showToast("_onOpen1TouchEnd");
        cc.uiManager.ShowUI("TestLayout1");
    },
    _onOpen2TouchEnd: function(event){
        cc.log('UIScene-> _onOpen2TouchEnd');
        
        cc.uiManager.showToast("_onOpen2TouchEnd");
        cc.uiManager.ShowUI("TestLayout2");
    },
    _onOpen3TouchEnd: function(event){
        cc.log('UIScene-> _onOpen3TouchEnd');
        
        cc.uiManager.showToast("_onOpen3TouchEnd");
        cc.uiManager.ShowUI("TestLayout3");
    },
    
    _onClose1TouchEnd: function(event){
        cc.log('UIScene-> _onClose1TouchEnd');
        
        cc.uiManager.showToast("_onClose1TouchEnd");
        cc.uiManager.CloseUI("TestLayout1");
    },
    
    _onClose2TouchEnd: function(event){
        cc.log('UIScene-> _onClose2TouchEnd');
        
        cc.uiManager.showToast("_onClose2TouchEnd");
        cc.uiManager.CloseUI("TestLayout2");
    },
    
    _onClose3TouchEnd: function(event){
        cc.log('UIScene-> _onClose3TouchEnd');
        
        cc.uiManager.showToast("_onClose3TouchEnd");
        cc.uiManager.CloseUI("TestLayout3");
    },
    onKeyDuration: function(keyCode){
        let self = this;
        switch(keyCode){
            case cc.KEY.w:
            cc.log('UIScene->onKeyDuration Key.W');
            
            break;

            case cc.KEY.s:
            cc.log('UIScene->onKeyDuration Key.S');
            break;
            
            case cc.KEY.a:
            cc.log('UIScene->onKeyDuration Key.A');
            break;

            case cc.KEY.d:
            cc.log('UIScene->onKeyDuration Key.D');
            break;            
        }
        
    },
});
