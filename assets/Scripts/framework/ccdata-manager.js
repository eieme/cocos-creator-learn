
let DataManager = function(){

    this.datas = {};
    this.sorttables = {};

    this.init = function(){
        cc.log('ccdata-manager-> init');
    }

    this.setAgent = function(agent){
        for (const key in agent) {            
            const data = agent[key];
            this[key] = data;
        }
        cc.log('ccdata-manager-> %s',JSON.stringify(this));
        
        agent = null;
    }
    this.readData = function(datas){
        for (const key in datas) {            
            const data = datas[key];
            this.datas[key] = data;
            this.parseData(key,data);
        }
    }

    /** 代理类必须实现的一个函数
     */
    this.parseData = function(filename,data){
        cc.log('ccdata-manager-> %s,%s',filename,JSON.stringify(data));
        
    }

    //获取数据表
    this.getTable = function(filename){
        if(filename in this.datas){
            return this.datas[filename];
        }
        return null;
    }

    this.getDatas = function(){
        cc.log('ccdata-manager-> %s',JSON.stringify(this.datas));
    }

    //为排序获取数据表
    this.getTable4Srot = function(filename){
        if(filename in this.sorttables){                   
            return this.sorttables[filename];
        }
        this.sorttables[filename] = this.sorttables[filename].slice(0);
        return this.sorttables[filename];
    }

    /**
     * @todo 建立索引,通过键值得到的对象是索引值
     * @param 最少3个参数 1：文件，2：map，3~n ：key
     */
    this.createIndex4Value = function(){
        if(arguments < 3){
            cc.error("arguments must >= 3");
            return;
        }

        let fax = function(obj,data,keys,keyindex,index){
            if(keyindex <= keys.length - 1){
                let key = keys[keyindex];
                if(key in data){
                    let value = data[key];
                    if(obj[value] == null || obj[value] == undefined){                    
                        obj[value] = {};
                    }
                    if(keyindex == keys.length - 1){
                        obj[value] = index;
                    }else{
                        fax(obj[value],data,keys,keyindex+1,index);
                    }
                }
            }
        }

        let keys = [];
        for (let i = 2; i < arguments.length; i++) {
            const key = arguments[i];
            keys.push(key);
        }



        let datatable = arguments[0];
        let indexobj = arguments[1];

        if (Object.keys(indexobj).length===0)
        {
            for (let i = 0; i < datatable.length; i++)
            {
                let ndatamap1 = datatable[i];

                fax(indexobj,ndatamap1,keys,0,i);
            }
        }
    };
    
    
     /**
     * @todo 建立索引，通过键值得到的对象是 索引组
     * @param 最少3个参数 1：文件，2：map，3~n ：key
     */
    this.createIndex4Array = function(){
        if(arguments < 3){
            cc.error("arguments must >= 3");
            return;
        }

        let fax = function(obj,data,keys,keyindex,index){
            if(keyindex <= keys.length - 1){
                let key = keys[keyindex];
                if(key in data){
                    let value = data[key];
                   
                    if(keyindex == keys.length - 1){
                        if(obj[value] == null || obj[value] == undefined){                    
                            obj[value] = [];
                        }
                        obj[value].push(index);
                    }else{
                        if(obj[value] == null || obj[value] == undefined){                    
                            obj[value] = {};
                        }
                        fax(obj[value],data,keys,keyindex+1,index);
                    }
                }
            }
        }

        let keys = [];
        for (let i = 2; i < arguments.length; i++) {
            const key = arguments[i];
            keys.push(key);
        }

        let datatable = arguments[0];
        let indexobj = arguments[1];

        if (Object.keys(indexobj).length===0)
        {
            for (let i = 0; i < datatable.length; i++)
            {
                let ndatamap1 = datatable[i];

                fax(indexobj,ndatamap1,keys,0,i);
            }
        }
    };

};



//单例
DataManager.instance = null;
DataManager._getInstance = function () {
    if (DataManager.instance === null) {
        DataManager.instance = new DataManager();
        DataManager.instance.init();
    }
    return DataManager.instance;
};

cc.datamanager = DataManager._getInstance();