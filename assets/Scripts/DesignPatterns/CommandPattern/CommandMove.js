let Command = require('Command');
let CommandType = require('CommandType');
let CommandMove = Command.extend({
    duration: 0,
    distance: null,
    ctor: function(duration,distance,commandType = CommandType.Automatic){
        let self = this;
        Command.prototype.ctor.call(this);
        self.setCommandType(commandType);
        self.duration = duration;
        self.distance = distance;
    },
    exec: function(){
        let self = this;
        let command = cc.sequence(cc.moveBy(this.duration,this.distance),cc.callFunc(this.onComandFinsh.bind(this)));
        command.setTag(this.commandTag);
        self.actor.runAction(command);
    },

});

module.exports = CommandMove;
