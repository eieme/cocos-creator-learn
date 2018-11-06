let CommandType = require('CommandType');
let CommandManager = cc.Class({
    properties: {
        commandList:[],
        index:0,
        curCommand: {
            get (){
                return this.commandList[this.index];
            },
        },
    },
    ctor: function () {
        let self = this;
        self.commandType = CommandType.Automatic;
    },
    init: function(){

    },

    addCommand: function(actor,command){
        command.setCommandFinishCallback(this.updateCommand.bind(this));
        command.setActor(actor);
        this.commandList.push(command);
    },

    startCommand: function(){
        this.execCommand();
    },

    nextCommandIndex: function(){
          //判断列表是否为空
        if (this.commandList == null || this.commandList.length <= 0){
            return;
        }

        this.index += 1;
        if(this.index >= this.commandList.length) 
        {
            this.cleanCommand();
            this.onCommandComplete();//命令结束
        }
    },

    execCommand: function(){
        //判断列表是否合法
        if(this.commandList == null || this.commandList.length <=0 ){
            return;
        }
        
        //判断索引是否合法
        if (this.index < 0 || this.index >= this.commandList.length){
            return;
        }
        

        //执行每一条命令
        if(this.index < this.commandList.length){
            this.curCommand.exec();
        }
    },

    updateCommand: function(){
        if(this.curCommand.commandType == CommandType.Automatic){//自动下一条命令
            this.nextCommandIndex();
            this.execCommand();
        }else if(this.curCommand.commandType == CommandType.Manually){//手动下一条命令
            
        }
    },

    showNextCommand: function(){//不管是自动还是手动，强制下一条命令
        this.curCommand.stop();
        this.nextCommandIndex();
        this.execCommand();
    },

    onCommandComplete: function(){
        cc.log('CommandManager-> onCommandComplete');        
    },

    cleanCommand: function(){
        this.index = 0;
        this.commandList.length = 0;
    },
});



CommandManager._instance = null;
CommandManager.getInstance = function () {
    if (CommandManager._instance == null) {
        CommandManager._instance = new CommandManager();
        CommandManager._instance.init();
    }
    return CommandManager._instance;
};

let commandManager = CommandManager.getInstance();
module.exports = {
    commandManager,
    CommandType
};