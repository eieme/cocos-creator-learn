let Command = require('Command');
let CommandType = require('CommandType');
let CommandDress = Command.extend({
    type: 0,
    subType: 0,
    ctor: function(type,subType,commandType = CommandType.Automatic){
        let self = this;
        Command.prototype.ctor.call(this);
        self.setCommandType(commandType);
        self.type = type;
        self.subType = subType;
    },
    exec: function(){
        let self = this;
        
        self.actor.onMakeup(this.type,this.subType);

        this.onComandFinsh();
    },
});

module.exports = CommandDress;