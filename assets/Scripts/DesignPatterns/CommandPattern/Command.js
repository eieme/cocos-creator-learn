

let CommandType = require('CommandType');
let Command = cc._Class.extend({
    _comandFinshCall: null,
    commandTag: 200,
    commandType: CommandType.Automatic,
    ctor: function(){
        
    },

    setCommandType: function(commandType){
        this.commandType = commandType;
    },

    exec: function(){

    },

    stop: function(){
        this.actor.stopActionByTag(commandTag);
    },
    //命令执行者
    setActor: function(actor){
        this.actor = actor;
    },
    //命令完成之后的回调
    setCommandFinishCallback: function(finishCall){
        this._comandFinshCall = finishCall;
    },
    //命令完成
    onComandFinsh: function(){
       if( this._comandFinshCall){
            this._comandFinshCall();
       }
    },
});

module.exports = Command;