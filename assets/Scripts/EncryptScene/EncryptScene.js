let encrypt=require('encryptjs');
let secretkey= 'open_sesame'; // 加密密钥
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('EncryptScene-> ');
        
        
    },

    start () {

    },

    onClickSet: function(event,customEventData){
        var dataString = JSON.stringify({username: 'name',score: '100'});
        var encrypted = encrypt.encrypt(dataString,secretkey,256);

        cc.sys.localStorage.setItem('userData', encrypted);
    },

    onClickGet: function(event,customEventData){
        cc.log('EncryptScene-> ');
        
        var cipherText = cc.sys.localStorage.getItem('userData');
        var userData=JSON.parse(encrypt.decrypt(cipherText,secretkey,256));
        console.dir(userData);        
    },

    // update (dt) {},
});
