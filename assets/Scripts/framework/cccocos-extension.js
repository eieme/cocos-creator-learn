
let _isPC = undefined;

cc.isWeChatGame = function(){
    return cc.sys.platform === cc.sys.WECHAT_GAME;
}

cc.IsPC = function() {
    if(_isPC === undefined){
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        for (var v = 0; v < Agents.length; v++)
        {
            if (userAgentInfo.indexOf(Agents[v]) > -1)
            {
                _isPC = false;
                break;
            }
        }
        _isPC = true;
    }
    return _isPC;
};


/**
 * 通过资源实例化预制对象
 * @param res   资源字符串
 * @param cb    回调函数返回
 */
cc.loadPrefab = function (res, cb) {
    cc.loader.loadRes(res, cc.Prefab, (error, prefab) => {
        let node = null;
        if (error) {
            cc.error(`loadPrefab ${error}`);
        } else {
            node = cc.instantiate(prefab);
        }

        if (cb) {
            cb(error, node);
        }
    });
}

/**
 * 通过资源路径（预制）创建节点, 根据 sender 类型并完成节点挂接
 * @param sender
 * @param res
 * @param cb
 */
cc.Component.prototype.createNode = function (sender, res, cb) {
    cc.log(`createNode ${res}`);
    cc.loadPrefab(res, (error, node) => {
        if (sender instanceof cc.Node) {
            sender.addChild(node);
        } else if (this.node && this.node instanceof cc.Node) {
            this.node.addChild(node, 0);
        }

        if (cb) {
            cb(node);
        }
    });
};

/**
 * 删除组件上的节点
 */
cc.Component.prototype.destroyNode = function () {
    if (!this.node) {
        return;
    }
    this.node.destroy();
};

/**
 * 节点上是否存在某些组件
 */
cc.Node.prototype.hasComponent = function (types) {
    if (!Array.isArray(types)) {
        types = [types];
    }

    let component = types.find(type => this.getComponent(type));
    return !!component;
};

/**
 * 获取精灵上的纹理文件名
 * @returns {*}
 */
cc.Sprite.prototype.getTextureFilename = function () {
    if (this.spriteFrame) {
        let fileName = this.spriteFrame._textureFilename;
        const index = fileName.indexOf('resources/');
        return fileName.substr(index + 10);
    }
    return '';
};

/**
 * 获取图集中的 spriteFrame , 图集需要预先加载
 * @param atlas
 * @param key
 * @returns {*}
 */
cc.getSpriteFrameByAtlas = function getFrameByAtlas(atlas, key) {
    let path = cc.path.mainFileName(atlas);
    let spriteAtlas = cc.loader.getRes(path, cc.SpriteAtlas);
    if (spriteAtlas) {
        return spriteAtlas.getSpriteFrame(key);
    }
    return null;
};

cc.setEnumAttr = function (obj, propName, enumDef) {
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
};


cc.randomBool = function(){
    var value = Math.random();
    return value > 0.5;
};
cc.randomInt = function (min, max = -1) {
    if (max == -1) { 
        return parseInt(Math.random() * min + 1, 10);

    } else {
        return parseInt(Math.random() * (max - min + 1) + min, 10);
    }
};
cc.randomFloat = function (min, max = -1) {
    if (max == -1) { 
        return Math.random() * min;
    } else {
        return Math.random() * (max - min + 1) + min;
    }
};



cc.loadTiledMap = function(sender,path){
    let component = null;
    if(sender instanceof cc.Node){
        component = sender.getComponent(cc.TiledMap);
    }else if(sender instanceof cc.TiledMap){
        component = sender;
    }

    cc.loader.loadRes(path,cc.TiledMapAsset,function(err,tmxAsset){
        component.tmxAsset = tmxAsset;
    });
};

cc.setSafeAnchor = function(node,anchorX,anchorY){
    let cacheAR = node.getAnchorPoint();
	let diffX = (anchorX - cacheAR.x) * node.getContentSize().width  * (node.scaleX);
	let diffY = (anchorY - cacheAR.y) * node.getContentSize().height * (node.scaleY);

	node.setAnchorPoint(cc.v2(anchorX, anchorY));
	node.x = node.x + diffX;
	node.y = node.y + diffY;
};

let _runtime = {};
cc.logTime = function(key){
    if(key in _runtime){
        cc.error('logTime [ %s ] is already existed',key);        
        return;
    }
    _runtime[key] = new Date().getTime();
};
cc.logTimeEnd = function(key){
    if(!(key in _runtime)){
        cc.error('logTimeEnd [ %s ] is not existed',key);        
        return;
    }
    let end = new Date().getTime();
    let duration = end - _runtime[key];
    delete _runtime[key];
    cc.log('%s duration: %s',key,duration);    
};
