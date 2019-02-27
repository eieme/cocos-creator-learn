Array.prototype.has = function (val) {
    var index = this.indexOf(val);
    return index > -1;
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
        return true;
    }
    return false;
}

Array.prototype.random = function(){
    let element = this[Math.floor(Math.random()*this.length)];
    return element;
};

cc.js.sleep = function(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}