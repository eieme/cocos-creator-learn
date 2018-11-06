
let DataLoader = function(){

    this.assets = [];
    this._count = 0;
    this._total = 0;
    this._visual_count = 0;
    this.isloading = false;
    this._loadendcallback = null;
    this._loadingcallback = null;
    this.init = function(){
        this.assets.length = 0;
        this._count = 0;
        this._total = 0;
        this._visual_count = 0;
        this.isloading = false;
        this._loadendcallback = null;
        this._loadingcallback= null;
    }

    this.addRes = function(flie_path,_type = cc.RawAsset){
        this.assets.push({
            type: _type,
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
    
    this.begin = function(){
        let self = this;
        if(self.isloading){
            cc.error("cc.dataloader is loading");
            return;
        }
        self._count = 0;
        self.isloading = true;
        self._total = self.assets.length;
        for (const asset of self.assets) {
            if("dir" in asset){
                cc.loader.loadResDir(asset.path,asset.type, function (err, assets, urls) {
                    self._count++;
                    if(self._loadingcallback){
                        self._loadingcallback(self._count*1.0/self._total,self._count,self._total);
                    }
                });
            }else{
                cc.loader.loadRes(asset.path,asset.type,function(error,file){
                    self._count++;
                    if(self._loadingcallback){
                        self._loadingcallback(self._count*1.0/self._total,self._count,self._total);
                    }
                });
            }
        }
    }

    /**
     * 
     * @param  dt 
     * @param {number} duration  进度总时间
     * @return 返回的是 进度 progress
     */
    this.step = function(dt,duration = 5){
         
        if(this.isloading){
            
            let unit = duration / dt;
            let rdt = this._total/unit;

            // cc.log('_visual_count: %s,dt: %s,rdt: %s,_count: %s',this._visual_count,dt,rdt,this._count);
            this._visual_count += rdt;
            this._visual_count = Math.min(this._visual_count, this._count);
            
            
            if(this._visual_count >= this._total && this._loadendcallback != null){
                this.isloading = false;
                this._loadendcallback();
                this._loadendcallback = null;
            }
        }
        let progress = this._visual_count*1.0/this._total;  
        return progress;
    }

    this.loadingCallback = function(callback){
        this._loadingcallback = callback;
    }
    this.endLoadCallback = function(callback){
        this._loadendcallback = callback;
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