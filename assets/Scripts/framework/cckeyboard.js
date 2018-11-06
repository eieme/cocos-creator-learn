
let KeyBoardEvent = function(){
    this.keyBordHandler = [],
    //注册键盘事件，一般只给根节点的脚本注册
    this.register = function (target) {

        this._KeyBordEvent(true);

        this.keyBordHandler.push(target);
    },
    this.unregister =function (target) {

        var index = this.keyBordHandler.indexOf(target);
        if (index > -1) {
            this.keyBordHandler.splice(index, 1);
        }

        this._KeyBordEvent(false);
    },
    this._KeyBordEvent= function (on) {
        const eventTypes = [
            cc.SystemEvent.EventType.KEY_DOWN,
            cc.SystemEvent.EventType.KEY_UP,
        ];

        const eventfuncs = [
            this._onKeyDown,
            this._onKeyUp,
        ];

        if (this.keyBordHandler.length === 0 && on) { //只注册一次事件
            eventfuncs.forEach((eventfunc, index) => {
                cc.systemEvent.on(eventTypes[index], eventfunc, this);
            });
        }

        if (this.keyBordHandler.length === 0 && !on) { //反注册
            eventfuncs.forEach((eventfunc, index) => {
                cc.systemEvent.off(eventTypes[index], eventfunc, this);
            });
        }

    },
    this._onKeyDown = function (event) {

        this.keyBordHandler.forEach((target, index) => {

            const temponKeyDown = target["onKeyDown"];
            if (temponKeyDown) {
                temponKeyDown.call(target,event);
            }

            if (event.keyCode === cc.KEY.escape) {
                const temponKeyBack = target["onKeyBack"];
                if (!temponKeyBack) {
                    return;
                }
                temponKeyBack.call(target,event);
            }
        });
    },

    this._onKeyUp = function (event) {
        this.keyBordHandler.forEach((target, index) => {
            const temponKeyUp = target["onKeyUp"];
            if (temponKeyUp) {
                temponKeyUp.call(target,event);
            }
        });
    };
};

//单例
KeyBoardEvent.instance = null;
KeyBoardEvent._getInstance = function () {
    if (KeyBoardEvent.instance === null) {
        KeyBoardEvent.instance = new KeyBoardEvent();
    }
    return KeyBoardEvent.instance;
};

cc.keybord = KeyBoardEvent._getInstance();