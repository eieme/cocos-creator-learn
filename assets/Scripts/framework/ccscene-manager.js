let SceneManager = function(){
    
    this.init = function(){

    }
    /**
     * @param {string} scenename 场景名
     * @param {function} onloaded 
     */
    this.preloadScene = function(scenename,onloaded = null){
        if(!onloaded){
            onloaded = function(){};
        }
        cc.director.preloadScene(scenename,onloaded);
    },
    this.replaceScene = function(newscene,color = cc.color(0,0,0,255)){
        let transition = new cc.Node();
        let sprite = transition.addComponent(cc.Sprite);
        transition.opacity = 0;
        transition.color = color;
        let size = cc.director.getWinSizeInPixels();
        transition.width = size.width;
        transition.height = size.height;
        transition.x = transition.width / 2;
        transition.y = transition.height / 2;
        transition.name = "transition";
        cc.loader.loadRes("Image/Bg",cc.SpriteFrame, function (error, spriteFrame) {
            let size = transition.getContentSize();
            sprite.spriteFrame = spriteFrame;
            transition.setContentSize(size);
        });
        cc.game.addPersistRootNode(transition);
        
        cc.director.preloadScene(newscene,function(){
            transition.runAction(cc.sequence(cc.fadeIn(0.5),cc.callFunc(function(){
                cc.director.loadScene(newscene,function(){
                    transition.runAction(cc.sequence(cc.fadeOut(1),cc.removeSelf()));
                });
            })));
           
        });
    }
};



//单例
SceneManager.instance = null;
SceneManager._getInstance = function () {
    if (SceneManager.instance === null) {
        SceneManager.instance = new SceneManager();
        SceneManager.instance.init();
    }
    return SceneManager.instance;
};

cc.scenemanager = SceneManager._getInstance();