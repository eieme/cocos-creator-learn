cc.Class({
    extends: cc.Component,

    properties: {
        id: 0
    },

    // use this for initialization
    onLoad: function () {
        this.data = null;
    },

    updateItem: function(tmplId, itemId) {
        this.id = itemId;
        cc.log('TableCell-> Tmpl#%d  Item#%d',tmplId,itemId);
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
