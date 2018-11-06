
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if(index > -1){this.splice(index,1);}
}

Array.prototype.random = function(){
    let element = this[Math.floor(Math.random()*this.length)];
    return element;
};