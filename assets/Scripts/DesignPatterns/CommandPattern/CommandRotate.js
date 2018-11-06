let Command = require('Command');
let CommandType = require('CommandType');
let CommandRoatate = Command.extend({

    duration: 0,
    roatate: 0,
    ctor: function(duration,roatate,commandType = CommandType.Automatic){        
        let self = this;
        Command.prototype.ctor.call(this);
        self.setCommandType(commandType);
        
        self.duration = duration;
        self.roatate = roatate;
    },

    exec: function(){
        let self = this;
        let command = cc.sequence(cc.rotateBy(this.duration,this.roatate),cc.callFunc(this.onComandFinsh.bind(this)));
        command.setTag(this.commandTag);
        self.actor.runAction(command);
    },
});

module.exports = CommandRoatate;