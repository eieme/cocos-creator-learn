
//参考： https://www.cnblogs.com/LiuGuozhu/p/6476079.html
let Stack = require('ccStack');
let UIView = require('UIView');


//需要用到的扩展  array.remove(element)

let opacity = 160;
let ACTION_TAG = 200;
const UIManager = function(){

    
    //存储所有“UI窗体预设(Prefab)”路径
    //参数含义： 第1个string 表示“窗体预设”名称，后一个string 表示对应的路径
    this._UIPaths = {};
    
    //缓存所有已经打开的“UI窗体预设(Prefab)”
    //参数含义： 第1个string 表示“窗体预设”名称，后一个BaseUI 表示对应的“窗体预设”
    this._UIList = {};
    //“栈”结构表示的“当前UI窗体”集合。
    this._stack = new Stack();
    //当前显示状态的UI窗体集合
    this._currentShowUI = {};


    //批量注册 ui 
    this.registerBatch = function(obj){
        for (const key in obj) {
            const path = obj[key];
            register(key,path);
        }
        
        this.logAllUI();
    };

    this.register = function(name,prefabpath){
        this._UIPaths[name] = prefabpath;


        if(!(name in this._UIList))
        {
            cc.loader.loadRes(prefabpath,cc.Prefab, function (err, prefab) {
                this._UIList[name] = prefab;
            }.bind(this));
        }
    };


    this.ShowUI = function(name,param = null){     
        
        if(this.isShowing(name)){
            return;
        }
        let uiview = this.createUI(name,param);
        if(!uiview){//
            return;
        }
        if(uiview.isClearStack){
            this.clearStackArray();
        }
        //判断不同的窗体显示模式，分别进行处理
        switch(uiview.showMode){
            case UIView.UIShowMode.Normal:
                this.addUICache(name,uiview);
            break;
            case UIView.UIShowMode.ReverseChange:
                this.pushUI(name,uiview);
            break;            
            case UIView.UIShowMode.HideOther:
                this.addUIAndHideOther(name,uiview);
            break;
        };
    };
    
    this.CloseUI = function(param = null){

        if(param == null){
            if(this._stack.length > 0){
                let temp = this._stack.peek();
                param = temp.uiname;
            }else{
                cc.error('ccui-manager-> [stack is empty] and [param] is null \n if has more view, maybe it not in stack');            
                return;
            }
        }

        if(!this.isShowing(param)){
            return;
        }
        let uiview = this.getUI(param);
        //判断不同的窗体显示模式，分别进行处理
        switch(uiview.showMode){
            case UIView.UIShowMode.Normal:
                this.removeUICache(uiview.uiname);
            break;            
            case UIView.UIShowMode.ReverseChange:
                this.popUI(param);
            break;            
            case UIView.UIShowMode.HideOther:
                this.closeUIAndShowOther(param);
            break;
        };
    },

    //添加 ui 到 "当前显示的窗体集合"
    this.addUICache = function(name,view){
        //“正在显示UI窗体缓存”集合里有记录，则直接返回。
        if(name in this._currentShowUI){
            return;
        }
        this._currentShowUI[name] = view;
        this._showUIAction(view);
    };

    //移除 ui 从"当前显示窗体集合" 
    this.removeUICache = function(name){
        let uiview = this.getUI(name);
        if(!uiview || !(uiview.uiname in this._currentShowUI)){
            return;
        }
        this._closeUIAction(uiview);
        delete this._currentShowUI[name];//
    };

    this.pushUI = function(name,view){
        if(this._stack.length > 0){
            let topview = this._stack.peek();
            topview.onUIFreeze();
        }
        this._currentShowUI[name] = view;
        this._stack.push(view);
        this._showUIAction(view);
    };

    this.popUI = function(param = null){
        if(param != null){
            let uiview = this.getUI(param);
            if(!uiview || !(uiview.uiname in this._currentShowUI)){
                cc.error('ccui-manager-> popUI error');
                
                return false;
            }
            this._closeUIAction(uiview);
            delete this._currentShowUI[uiview.uiname];//
            this._stack.remove(uiview);
        }else{
            if(this._stack.length >= 2){
                let topview = this._stack.pop();
                this._closeUIAction(topview);
                delete this._currentShowUI[topview.uiname];//
    
                let nextuiview = this._stack.peek();
                nextuiview.onUIAwake();
            }else if(this._stack.length === 1){
                let topview = this._stack.pop();
                this._closeUIAction(topview);
                delete this._currentShowUI[topview.uiname];//
            }
        }
        return true;
    },

    this.addUIAndHideOther = function(name,view){
        
        this._stack.forEach(function(element){
            // element.node.active = false; //隐藏
            this._hideUIAction(element);
        }.bind(this));

        for (const key in this._currentShowUI) {            
            const element = this._currentShowUI[key];
            // element.node.active = false; //隐藏
            this._hideUIAction(element);
        }

        this.pushUI(name,view);
    },

    this.closeUIAndShowOther = function(param){
        let val =this.popUI(param);
        if(val){
            this._stack.forEach(function(element){
                element.node.active = true; //显示                
                this._reShowUIAction(element);
            }.bind(this));
    
            for (const key in this._currentShowUI) {            
                const element = this._currentShowUI[key];
                // element.node.active = true; //显示
                this._reShowUIAction(element);
            }
    
        }
    },
    //执行 显示动画
    this._showUIAction = function(uiview){
        uiview.node.stopActionByTag(ACTION_TAG);
        uiview.node.setAnchorPoint(0.5, 0.5);
        uiview.node.setPosition(0, 0);
        let show = cc.sequence(uiview.showAction(),cc.callFunc(function(){
            uiview.onShowCallback();
            uiview.registerAutoClose();
        }));
        show.setTag(ACTION_TAG);
        uiview.node.runAction(show);      
        
        let uiRoot = this.getUIRoot(uiview);
        if(uiRoot){
            uiview.node.parent = uiRoot.root;
            uiview.mask = uiRoot.mask;
        }
    },
    //执行 关闭动画
    this._closeUIAction = function(uiview){
        
        uiview.node.stopActionByTag(ACTION_TAG);
        let close = cc.sequence(uiview.closeAction(),cc.removeSelf(),cc.callFunc(function(){
            uiview.onCloseCallback();
            uiview.mask.runAction(cc.sequence(cc.fadeOut(0.2),cc.removeSelf()));
        }));
        close.setTag(ACTION_TAG);
        uiview.node.runAction(close);
    },

    this._hideUIAction = function(uiview){
        
        uiview.node.stopActionByTag(ACTION_TAG);
        let action = cc.sequence(uiview.closeAction(),cc.hide(),cc.callFunc(function(){
            uiview.mask.runAction(cc.sequence(cc.fadeOut(0.2),cc.hide()));
        }));
        action.setTag(ACTION_TAG);
        uiview.node.runAction(action);
    },
    this._reShowUIAction = function(uiview){
        
        uiview.node.stopActionByTag(ACTION_TAG);
        uiview.mask.stopActionByTag(ACTION_TAG);
        let maskaction = cc.sequence(cc.show(),cc.fadeTo(0.15,opacity));
        maskaction.setTag(ACTION_TAG);
        uiview.mask.runAction(maskaction);
        let nodeaction = cc.sequence(cc.show(),uiview.showAction());
        nodeaction.setTag(ACTION_TAG);
        uiview.node.runAction(nodeaction); 
    },

    this.showToast = function(obj){

        if (typeof obj === 'string') {
            this.showDebugToast(obj);
        }else if(obj instanceof cc.Node){
            cc.error('ccui-manager-> has no node toast');
        }
    },
    //
    this.showDebugToast = function(msg){

        let scene = cc.director.getScene();
        let toastUI = cc.find("Canvas/ToastRoot", scene);
        if(!toastUI){
            cc.error("Canvas/ToastRoot cont be find");
            return;
        }
        let node = new cc.Node();
        let label = node.addComponent(cc.Label);
        label.string = msg;
        label.fontSize = 20;
        label.lineHeight = label.fontSize;
        node.height = label.lineHeight;
        node.y = -node.height;
        node.opacity = 0;
        node.setAnchorPoint(0,0);
        node.runAction(cc.sequence(
            cc.spawn(cc.moveBy(0.3,cc.v2(0,node.height)), cc.fadeIn(0.3)), //
            cc.delayTime(5), //
            cc.fadeOut(0.3), //
            cc.removeSelf()
        ));

        for (let i = 0; i < toastUI.children.length; i++) {
            const child = toastUI.children[i];
             
            if( toastUI.children.length - i >= 10){
                child.runAction(cc.sequence(cc.spawn(cc.moveBy(0.3,cc.v2(0,node.height)), cc.fadeOut(0.3)),cc.removeSelf()));
            }else{
                child.runAction(cc.moveBy(0.3,cc.v2(0,child.height)));
            }
        }
        
        node.parent = toastUI;
    };


    this.createUI = function(name,param){
        if(name in this._UIList){
            let prefab = this._UIList[name];
            let newNode = cc.instantiate(prefab);
            let uiview = newNode.getComponent("UIView");
            uiview.onInit(param);
            uiview.uiname = name;
            return uiview;
        }
        return null;
    };

    this.getUIRoot = function(view){     
        let scene = cc.director.getScene();   
        let uiRoot = cc.find("Canvas/UIRoot", scene);
        if(!uiRoot){
            cc.error("Canvas/UIRoot cont be find");
            return null;
        }
        // return uiRoot;
        
        
        let size = uiRoot.getContentSize();
        let uimask = this._getMask(view,size);
        uimask.parent = uiRoot;
        return {
            root: uiRoot,
            mask: uimask
        };
    },

    this._getMask = function(view,size){
        if(view){
            let node = new cc.Node();
            let sprite = node.addComponent(cc.Sprite);
            if(view.maskType == UIView.MaskType.Translucence){//半透明蒙版
                cc.loader.loadRes("singleColor",cc.SpriteFrame, function (error, spriteFrame) {
                    sprite.spriteFrame = spriteFrame;
                    node.color = cc.color(0,0,0,255);
                    node.opacity = 0;                    
                    node.setContentSize(size);
                    node.runAction(cc.fadeTo(0.15,opacity));
                });
            }else if(view.maskType == UIView.MaskType.Lucency){//全透明

            }

            if(view.touchMaskType == UIView.TouchMaskType.Swallow){//吞并
                node.addComponent(cc.BlockInputEvents);
            }else if(view.touchMaskType == UIView.TouchMaskType.Pentrate){
                
            }
            
            node.name = view.uiname+"Mask";
            return node;
        }

        return null;
    },
    
    this.fill = function(node){
        let updateWidgetAlign = function(widget,dir,px = 0){
            let Dir = dir.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());//首字母大写
            let align_bool = `isAlign${Dir}`;
            let absolute_bool = `isAbsolute${Dir}`;
            
            widget[align_bool] = true;
            widget[absolute_bool] = true; //以像素作为偏移值
            widget[dir] = px;
        }

        let widget = node.getComponent(cc.Widget);
        if(!widget){
            widget = node.addComponent(cc.Widget);
        }
        updateWidgetAlign(widget,"left");        
        updateWidgetAlign(widget,"right");
        updateWidgetAlign(widget,"top");
        updateWidgetAlign(widget,"bottom");
    },


    this.isShowing = function(name){
        let uiview = this.getUI(name);
        if(!uiview){
            cc.log('ccui-manager-> %s is not exist',name);            
            return false; 
        }
        if(uiview.uiname in this._currentShowUI){
            return true;
        }
        return false;
    },

    this.getUI = function(viewparm){
        let nview = null;
        if (typeof viewparm === 'string') {
            if(viewparm in this._currentShowUI)
            {
                nview = this._currentShowUI[viewparm];
            }
        }
        else if (viewparm instanceof cc.Component) {
            nview = viewparm;
        }

        return nview;
    },
    // 清空“栈”结构体集合
    this.clearStackArray = function(){
        if(this._stack.length > 0){
            this._stack.length.clear();
            return true;
        }
        return false;
    },
    this.logAllUI = function(){
        for (const key in this._UIPaths) {
            const element = this._UIPaths[key];
            cc.log('UIManager->logAllUI: %s',element);
        }
    };
};

//单例
UIManager.instance = null;
UIManager._getInstance = function () {
    if (UIManager.instance === null) {
        UIManager.instance = new UIManager();
    }
    return UIManager.instance;
};

cc.uiManager = UIManager._getInstance();