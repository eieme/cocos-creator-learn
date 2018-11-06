let CommandType = require('CommandType');
let CommandMove = require('CommandMove');
let CommandDelay = require('CommandDelay');
let CommandRotate = require('CommandRotate');
let CommandDress = require('CommandDress');

window.command = {
    ctype: CommandType.Automatic,
    move: function(duration,distance,ctype){
        return new CommandMove(duration,distance,ctype || this.ctype);
    },
    delay: function(duration,ctype){
        return new CommandDelay(duration,ctype || this.ctype);
    },
    rotate: function(duration,_roatate,ctype){
        return new CommandRotate(duration,_roatate,ctype || this.ctype);
    },

    dress: function(type,subtype,ctype){
        return new CommandDress(type,subtype,ctype || this.ctype);
    },
    
};

// module.exports = command;