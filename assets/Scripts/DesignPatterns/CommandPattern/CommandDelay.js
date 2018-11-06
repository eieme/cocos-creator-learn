
let Command = require('Command');
let CommandType = require('CommandType');
let CommandDelay = Command.extend({
   
    ctor: function(duration,commandType = CommandType.Automatic){        
        let self = this;
        Command.prototype.ctor.call(this);
        self.setCommandType(commandType);
        self.duration = duration;
    },
    exec: function(){
        let self = this;
        let command = cc.sequence(cc.delayTime(this.duration),cc.callFunc(this.onComandFinsh.bind(this)));
        command.setTag(this.commandTag);
        self.actor.runAction(command);
    },
});

module.exports = CommandDelay;