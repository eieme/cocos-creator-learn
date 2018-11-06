
let DataLoader = function(){

    this.assets = [];
    this._count = 0;
    this._total = 0;
    this._visual_count = 0;
    this.isloading = false;
    this.loadendcallback = null;
    this.init = function(){
        this.assets.length = 0;
        this._count = 0;
        this._total = 0;
        this._visual_count = 0;
        this.isloading = false;
        this.loadendcallback = null;
    }

    this.addSpine = function(flie_path){
        this.assets.push({
            type: sp.SkeletonData,
            path: flie_path
        });
    }

    this.addSpriteFrame = function(flie_path){
        this.assets.push({
            type: cc.SpriteFrame,
            path: flie_path
        });
    }

    this.addSpriteAtlas = function(flie_path){
        this.assets.push({
            type: cc.SpriteAtlas,
            path: flie_path
        });
    }
    this.addRes = function(flie_path){
        this.assets.push({
            type: cc.RawAsset,
            path: flie_path
        });
    }
    this.addDir = function(dir,type = cc.RawAsset){
        this.assets.push({
            type: type,
            path: dir,
            dir: true
        });
    }
    

    this.load = function(callback){
        let self = this;
        self._count = 0;
        self.isloading = true;
        self._total = self.assets.length;
        for (const asset of self.assets) {
            if("dir" in asset){
                cc.loader.loadResDir(asset.path,asset.type, function (err, assets, urls) {
                    self._count++;
                    callback(self._count*1.0/self._total,self._count,self._total);
                });
            }else{
                cc.loader.loadRes(asset.path,asset.type,function(error,file){
                    self._count++;
                    callback(self._count*1.0/self._total,self._count,self._total);
                });
            }
        }
    }

    /**
     * 
     * @param  dt 
     * @param  duration  进度总时间
     * @return 返回的是 进度 progress
     */
    this.update = function(dt,duration = 5){
         
        if(this.isloading){
            
            let unit = duration / dt;
            let rdt = this._total/unit;

            this._visual_count += rdt;
            this._visual_count = Math.min(this._visual_count, this._count);
            
            if(this._visual_count >= this._total && this.loadendcallback != null){
                this.isloading = false;
                this.loadendcallback();
                this.loadendcallback = null;
            }
        }
        let progress = this._visual_count*1.0/this._total;  
        return progress;
    }

    this.setLoadEndCallback = function(callback){
        this.loadendcallback = callback;
    }
};


//单例
DataLoader.instance = null;
DataLoader._getInstance = function () {
    if (DataLoader.instance === null) {
        DataLoader.instance = new DataLoader();
        DataLoader.instance.init();
    }
    return DataLoader.instance;
};

cc.dataloader = DataLoader._getInstance();