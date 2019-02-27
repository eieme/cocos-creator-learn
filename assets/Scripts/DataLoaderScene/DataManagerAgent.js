let DataManagerAgent = function(){

    this.material_index = {};
    
    this.material_index_vec = {};

    this.achievement_index_vec = {};

    this.parseData = function(name,file){
        cc.log('DataManagerAgent-> %s,%s',name,JSON.stringify(file));
        
        if(name == "Data/material"){
            this.createIndex4Value(file,this.material_index,"Type","Score","SubID");    
            cc.log('DataManagerAgent-> %s',JSON.stringify(this.material_index));

            this.createIndex4Array(file,this.material_index_vec,"Type");             
            cc.log('DataManagerAgent-> %s',JSON.stringify(this.material_index_vec));
        }

        if(name == "Data/achievement"){            
            this.createIndex4Array(file,this.achievement_index_vec,"type","subtype");             
            cc.log('DataManagerAgent-> %s',JSON.stringify(this.achievement_index_vec));
        }
    }

};

module.exports = DataManagerAgent; 