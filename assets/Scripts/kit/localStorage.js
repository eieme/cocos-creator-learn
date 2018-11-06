"use strict";
/**
 * 封装本地存储
 */
var localStorage = {

    setBool: function (_key, _value) {
        cc.sys.localStorage.setItem(_key, _value.toString())
    },

    getBool: function (_key) {
        return cc.sys.localStorage.getItem(_key) == "false" ? false : true
    },

    setInt: function (_key, _value) {
        cc.sys.localStorage.setItem(_key, _value.toString())
    },

    getInt: function (_key) {
        return Number(cc.sys.localStorage.getItem(_key))
    },

    setString: function (_key, _value) {
        cc.sys.localStorage.setItem(_key, _value)
    },

    getString: function (_key) {
        return cc.sys.localStorage.getItem(_key)
    },

    setObject: function (_key, _value) {
        cc.sys.localStorage.setItem(_key, JSON.stringify(_value))
    },

    getObject: function (_key) {
        return JSON.parse(cc.sys.localStorage.getItem(_key))
    },
};
module.exports = localStorage;