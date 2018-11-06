
function deepCopy(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
}

let ArrayManager = function(){
    this.all = [];
    this.allmap = {};

    this.table1 = [];

    this.sorttable = {};
};
let manager = ArrayManager.prototype;

manager.init = function(){
    this.allmap = {
        "table1":[0,2,4,3,6,1,5],
        "table2":[0,2,4,3,6,1,5],
        "table3":[0,2,4,3,6,1,5],
        "table4":[0,2,4,3,6,1,5],
    };

    this.getTable("table1");
};


manager.getTable = function(name){
    if(name === "table1"){
        this.table1 = this.allmap["table1"];
        return  this.table1;
    }

    return this.allmap[name];
};


manager.printTable1 = function(event){
    console.log('ArrayManager->[%s]   this.allmap["table1"] %s',event,this.allmap["table1"].toString());
    console.log('ArrayManager->[%s]   table1 %s',event,this.table1.toString());

    
};




manager.getTable4Sort = function(name){

    if(name in this.sorttable){
        cc.log('ArrayManager-> %s in this.sorttable',name);
        
        return this.sorttable[name];
    }

    this.sorttable[name] = this.allmap[name].slice(0);
    return this.sorttable[name];
};

manager.printSortTable = function(name,event){
    console.log('ArrayManager-> print [%s] Table Sort [%s]',name,event);    
    console.log(this.sorttable[name].toString());    
};

var getInstance = (function(){ 
    　　var instance = null;
    　　return function(){
    　　　　　　　　　　if ( !instance ){
    　　　　　　　　　　　　instance = new ArrayManager();
    　　　　　　　　　　}
    　　　　　　　　return instance;
    　　　　　　 }
        })();
    
    var arrayManager = getInstance();
    module.exports = arrayManager;