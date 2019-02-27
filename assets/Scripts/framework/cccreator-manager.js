
//简化创建加载
let Creator = function(){

    
    this.createNodeComponent = function (componentType) {
        let node = new cc.Node();
        let component = node.addComponent(componentType);
        return component;
    };


    this.getOrCreateComponent = function(componentType,node = null){
        let component = null;
        if(node){
            component = node.getComponent(componentType);
            if(!component){
                component = node.addComponent(componentType);
            }
        }else{
            node = new cc.Node();
            component = node.addComponent(componentType);
        }
        return component;
    };

    this.createSprite = function(path,node = null){
        let sprite = this.getOrCreateComponent(cc.Sprite,node);    
        cc.loader.loadRes(path,cc.SpriteFrame,function(err,spriteFrame){
            sprite.spriteFrame=spriteFrame;
        });
        return sprite.node;
    };

    this.replaceSprite = function(path,node){
        this.createSprite(path,node);
    };

};
//单例
Creator.instance = null;
Creator._getInstance = function () {
    if (Creator.instance === null) {
        Creator.instance = new Creator();
    }
    return Creator.instance;
};

cc.creator = Creator._getInstance();


