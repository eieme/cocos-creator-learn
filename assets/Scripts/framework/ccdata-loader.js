
let DataLoader = function(){

    this.assets = []; //资源
    this.datas = []; //数据文件
    this._loadeddatas = {};//加载完成的数据
    this._count = 0; //加载计数
    this._total = 0; //加载总数
    this._visual_count = 0; //显示的数量
    this.isloading = false;
    this._completeCallback = null;
    this._progressCallback = null;    

    this._datacount = 0;
    this._datatotal = 0;
    this.init = function(){
        this.assets.length = 0;
        this.datas.length = 0;
        this._loadeddatas = {};
        this._count = 0;
        this._total = 0;
        this._visual_count = 0;
        this.isloading = false;
        this._completeCallback = null;
        this._progressCallback= null;
        cc.log('ccdata-loader-> init');
        
        
    }
    this.reset = function(){
        this.assets.length = 0;
        this.datas.length = 0;
        this._loadeddatas = {};//加载完成的数据
        this._count = 0; //加载计数
        this._total = 0; //加载总数
        this._visual_count = 0; //显示的数量
        this.isloading = false;
        this._completeCallback = null;
        this._progressCallback= null;
    }
    /**
     * @param { File } flie_path  数据文件
     */
    this.addData = function(flie_path){
        this.datas.push({
            type: cc.RawAsset,
            path: flie_path,
            isdir: false
        });
    }
    this.addRes = function(flie_path,_type = cc.RawAsset){
        this.assets.push({
            type: _type,
            path: flie_path,
            isdir: false
        });
    }
    this.addDir = function(dir,type = cc.RawAsset){
        this.assets.push({
            type: type,
            path: dir,
            isdir: true
        });
    }
    
    /**回调的参数是一个对象
     * 对象的属性
     * {  
     *       @param {number} progress 加载进度
     *       @param {number} count 当前计数
     *       @param {number} total 总数量
     *       @param {File} asset 当前加载的资源
     *       @param {URL} urls 如果是加载路径，所有资源的 url
     *   }
     */
    this.begin = function(progressCallback,completeCallback){
        let self = this;
        if(self.isloading){
            cc.error("cc.dataloader is loading");
            return;
        }
        self._count = 0;
        self.isloading = true;
        self._datatotal = self.datas.length;
        self._total = self.assets.length + self._datatotal;
        self._progressCallback = progressCallback;
        self._completeCallback = completeCallback;

        for (const asset of self.datas) {
            cc.loader.loadRes(asset.path,asset.type,function(error,file){
                self._count++;
                self._datacount ++;
                self._loadeddatas[asset.path] = file;
                if(self._datacount >= self._datatotal){
                    cc.log('ccdata-loader-> Local data load complete');
                    
                    cc.datamanager.readData(self._loadeddatas);
                }
                if(self._progressCallback){
                    self._progressCallback({
                        progress:self._count*1.0/self._total,
                        count:self._count,
                        total:self._total,
                        asset: file,
                        urls: null
                    });
                }
                if(error){
                    cc.warn('ccdata-loader->file: %s err:%s',asset.path,JSON.stringify(error));                  
                }
            });
        }

        for (const asset of self.assets) {
            if("isdir" in asset && asset.isdir){
                cc.loader.loadResDir(asset.path,asset.type, function (error, assets, _urls) {
                    self._count++;
                    if(self._progressCallback){
                        self._progressCallback({
                            progress:self._count*1.0/self._total,
                            count:self._count,
                            total:self._total,
                            asset: assets,
                            urls: _urls
                        });
                    }
                    if(error){
                        cc.warn('ccdata-loader->file: %s err:%s',asset.path,JSON.stringify(error));
                    }
                });
            }else{
                cc.loader.loadRes(asset.path,asset.type,function(error,file){
                    self._count++;
                    if(self._progressCallback){
                        self._progressCallback({
                            progress:self._count*1.0/self._total,
                            count:self._count,
                            total:self._total,
                            asset: file,
                            urls: null
                        });
                    }
                    
                    if(error){
                        cc.warn('ccdata-loader->file: %s err:%s',asset.path,JSON.stringify(error));                  
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
            
            
            if(this._visual_count >= this._total){
                this.isloading = false;
                if(this._completeCallback != null){
                    this._completeCallback();
                    this._completeCallback = null;   
                }
            }
        }
        let progress = this._visual_count*1.0/this._total;  
        return progress;
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