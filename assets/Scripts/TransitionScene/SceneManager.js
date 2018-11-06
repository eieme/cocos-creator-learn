let SceneManager = {

    replaceScene: function(newscene,color = cc.color(255,255,255,255)){
        let transition = new cc.Node();
        let sprite = transition.addComponent(cc.Sprite);
        transition.opacity = 0;
        transition.color = color;
        let size = cc.director.getWinSizeInPixels();
        transition.width = size.width;
        transition.height = size.height;
        transition.x = transition.width / 2;
        transition.y = transition.height / 2;

        cc.loader.load({ uuid: 'a23235d1-15db-4b95-8439-a2e005bfff91' }, function (error, spriteFrame) {
            let size = transition.getContentSize();
            sprite.spriteFrame = spriteFrame;
            transition.setContentSize(size);
        });
        cc.game.addPersistRootNode(transition);
        
        cc.director.preloadScene(newscene,function(){
            transition.runAction(cc.sequence(cc.fadeIn(0.5),cc.callFunc(function(){
                cc.director.loadScene(newscene,function(){
                    transition.runAction(cc.sequence(cc.fadeOut(0.5),cc.removeSelf()));
                });
            })));
           
        });
    },

};

module.exports = SceneManager;