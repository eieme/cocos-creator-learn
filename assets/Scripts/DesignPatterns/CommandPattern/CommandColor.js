let Command = require('Command');
let CommandType = require('CommandType');
let CommandColor = Command.extend({
    duration: 0,
    color: null,
    ctor: function(duration,color,commandType = CommandType.Automatic){
        let self = this;
        Command.prototype.ctor.call(this);
        self.setCommandType(commandType);
        self.duration = duration;
        self.color = color;
    },
    exec: function(){
        let self = this;
        let command = cc.sequence(cc.tintTo(this.duration,this.color.r,this,color.g,this.color.b),cc.callFunc(this.onComandFinsh.bind(this)));
        command.setTag(this.commandTag);
        self.actor.runAction(command);
    },

});

module.exports = CommandColor;
