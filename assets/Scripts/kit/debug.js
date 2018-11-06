"use strict";

// //给控制台输出添加日期
// ['log', 'info', 'warn', 'error'].forEach(function(method) {
//     console[method] = console[method].bind(
//       console,
//       new Date().toLocaleString()
//     );
//   });
  
// ['log', 'info', 'warn', 'error'].forEach(function(method) {
//     cc[method] = cc[method].bind(
//       cc,
//       new Date().toLocaleString()
//     );
// });

  
var debug = {
    /**
     * 控制台输出带 {函数名} 和 {行号}
     */
    log :function (msg) {
        var info = this.stackInfo();
        var method = info['method'];
        var file = info['file'];
        var line = info['line'];
        console.log("<" + method + ":" + line + "> " + msg);
    },
    
    // 这里是主要方法
    stackInfo:function () {
        var path = require('path');
        var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
        var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
        var stacklist = (new Error()).stack.split('\n').slice(3);
        var s = stacklist[0];
        var sp = stackReg.exec(s) || stackReg2.exec(s);
        var data = {};
        if (sp && sp.length === 5) {
            data.method = sp[1];
            data.path = sp[2];
            data.line = sp[3];
            data.pos = sp[4];
            data.file = path.basename(data.path);
        }
    
        return data;
    }
}

module.exports = debug;