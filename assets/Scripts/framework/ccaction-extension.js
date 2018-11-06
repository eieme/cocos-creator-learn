"use strict;"


cc.LabelCounter = cc.ActionInterval.extend({
    _LabelComponent: null,    
    _beforeText :"",
    _afterText:"",
	
    _finalValue: 0,
    _initialValue: 0,

    step_: 0,
	asProgress_: false,
    maxValue_: 0,
    
    ctor: function (duration, finalValue, initialValue = 0) {
        cc.ActionInterval.prototype.ctor.call(this);
        
		finalValue !== undefined && this.initWithDuration(duration, finalValue, initialValue);
    },

    initWithDuration: function(duration,finalValue,initialValue = 0){
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this._finalValue = finalValue;
            this._initialValue = initialValue;
            return true;
        }
        return false;
    },
  
    clone:function () {
        var action = new cc.LabelCounter();
        this._cloneDecoration(action);
        action.initWithDuration(this._duration, this._finalValue, this._initialValue);
        return action;
    },

    startWithTarget:function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this.step_ = this._finalValue - this._initialValue;
        this._LabelComponent = target.getComponent(cc.Label);
        if(this._LabelComponent === null){
            this._LabelComponent = target.getComponent(cc.RichText);          
        }

        this.setValue(this._initialValue);
    },

    update:function (dt) {
        dt = this._computeEaseTime(dt);

        let _visualValue = this._initialValue + this.step_ * dt;
        _visualValue = Math.ceil(_visualValue);
        this.setValue(_visualValue);
    },


    setValue:function(value){
        this._LabelComponent.string = cc.js.formatStr("%s%s%s",this._beforeText,value,this._afterText);
    },

    reverse:function () {
        cc.error('cocos-extension-> reverse error');        
    }
});


cc.labelCounter = function (duration, finalValue, initialValue) {
    return new cc.LabelCounter(duration, finalValue, initialValue);
};


cc.ActionAny = cc.ActionInterval.extend({
    _setterFunc: null,
    _setterTarget: null,
    
    ctor: function (duration, setter, target) {//setter：带一个alpha参数的函数，0~1
        cc.ActionInterval.prototype.ctor.call(this);
        setter !== undefined && this.initWithDuration(duration, setter, target);
    },

    /*
        * 初始化action
        * @param {Number} duration  duration in seconds
        * @param {actionAnySetter} setter 响应设置函数，其参数为一个0~1的值，指示的是此action的进度
        * @param {*} [target]
        * @return {Boolean}
        */
    initWithDuration: function (duration, setter, target) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this._setterFunc = setter;
            this._setterTarget = target;
            return true;
        }
        return false;
    },

    clone: function () {
        let action = new ActionAny();
        this._cloneDecoration(action);
        action.initWithDuration(this._duration, this._setterFunc, this._setterTarget);
        return action;
    },

    reverse:function () {
        cc.logID(1016);
    },

    update: function (time) {
        time = this._computeEaseTime(time);//0~1
        if(this._setterFunc) {
            if(this._setterTarget)
                this._setterFunc.call(this._setterTarget, time);
            else
                this._setterFunc(time);
        }
    },

    startWithTarget: function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
    }
});

cc.actionAny = function (duration, setter, target) {
    return new cc.ActionAny(duration, setter, target);
};

