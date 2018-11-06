let ArrayManager = require('ArrayManager');
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        ArrayManager.init();
    },

    start () {

    },

    sortTable1: function(event,customEventData){
      

        let table1 = ArrayManager.getTable4Sort("table1");

        ArrayManager.printSortTable("table1","begin");
        table1.sort();

        console.log('ArrayScene-> print table1: %s',table1.toString());
    
        ArrayManager.printSortTable("table1","end");



        ArrayManager.printTable1("begin");
        let sourcetable1 = ArrayManager.getTable("table1");
        sourcetable1.sort();
        ArrayManager.printTable1("end");
    },

    // update (dt) {},
});
