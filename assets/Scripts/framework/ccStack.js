/*使用栈stack类的实现*/
function ccStack() {
    this.source = [];//保存栈内元素，初始化为一个空数组
    this.length = 0;//栈顶位置，初始化为0  //栈内存放元素的个数
    this.push = push;//入栈
    this.pop = pop;//出栈
    this.peek = peek;//查看栈顶元素
    this.remove = remove; // 删除指定元素
    this.forEach = forEach; //遍历
    this.clear = clear;//清空栈
    this.empty = empty;
    this.size = size;
    this.has = has;
}
/**
 * 压入元素
 * @param {any} element 
 */
function push(element){
    this.source[this.length++] = element;
}
/**
 * 删除数组最后一个并返回
 */
function pop(){
    // return  this.source[--this.length];
    let element = this.source.pop();
    this.length--;
    return element;
}
/**
 * 返回数组最后一个
 */
function peek(){
    return this.source[this.length-1];
}
/**
 * 删除指定元素
 */
function remove(element){
    var index = this.source.indexOf(element);
    if(index > -1){
        this.source.splice(index,1);
        this.length--;
    }
}
function forEach(callback){
    this.source.forEach(callback);
}
//判断是否有这个元素
function has(element){
   return this.source.includes(element);
}
/**
 * 删除所有元素
 */
function clear(){
    delete this.source;
    this.source = [];
    this.length = 0;
}

function empty() {
    return this.length === 0;
}

/**
 * 返回元素数量
 */
function size(){
    return this.length;
}

module.exports = ccStack;