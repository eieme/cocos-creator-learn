
'use strict'

var name = "xiaoming";

var Single = {
    getName :function(){
        return name;
    },
    setName :function(newname){
        name = newname;
    },
};

module.exports = Single;