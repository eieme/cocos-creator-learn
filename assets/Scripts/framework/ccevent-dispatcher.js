"use strict";
/********************************************************************
 修改记录:

 创建时间:	2017/4/1   13:32
 文件名:		eventdispatcher.js

 作者:		youchenwei

 实现目的:	事件处理器
 用来实现针对事件id进行回调的一个类
 实现了立即回调，下帧回调和延时回调的方式
 直接使用事件处理器的单例 sEvents
 已实现功能:
 *********************************************************************/

var EventDispatcher = function(){
    /**
     *  EventDispatcher事件处理器类
     */

	/**
	 * 构造函数
	 */
	// this.ctor = function(){
		// 事件注册表
		this.m_events = [];
		// 事件队列
		this.m_queue = [];
		// 事件错误提示
		this.m_cberr = "event callback function is null!";
	// }

	/** 注册事件处理函数
	 * @evnetId {any} 事件序号， 任何值
	 * @cb {function} 事件处理函数， 不能为空
	 * @desc {string} 描述， 可为空
	 */
	this.Register = function(eventId, cb, target, desc){
		// Assert(cb);
		let evt;
		if(eventId in this.m_events)
		{
			evt = this.m_events[eventId];
		}
		else
		{
			 evt = [];
			 this.m_events[eventId] = evt;
		} 
		
        // Core.log(LogDebug, "ev:" + eventId + " cb:" + cb);
		evt.push({"callback":cb, "target":target, "desc":desc}); 
	}

	/**
	 * 反注册
	 * @eventId {any} 事件序号， 任何值
	 */
	this.unRegister = function(eventId, cb,target){
		let evt = this.m_events[eventId];
		if(evt){
			for (let i = 0; i < evt.length;) {
                let item = evt[i];
                let issametarget = true;
                if("target" in item){
                    issametarget = item.target == target;
                }
				if(item.callback.name == cb.name && issametarget){
					evt.splice(evt.indexOf(item), 1);
					break;
				} else {
					++i;
				}
			}
		}
	}
	
	/**
	 * 反注册全部某种事件
	 * @eventId {any} 事件序号， 任何值
	 */
	this.unResisterAll = function(eventId){
		this.m_events[eventId] = null;
	}

	/**
	 * 是否存在这个事件
	 * @eventId {any} 事件序号， 任何值
	 * @return {boolean} 是否存在
	 */
	this.hasEvent = function(eventId){
		return this.m_events[eventId] != null;
	}

	/**
	 * 私有函数，仅供类内使用。根据事件id获得处理函数
	 * @eventId {any} 事件序号， 任何值
	 * @return {function} 事件处理句柄
	 */
	this._getEvt = function(eventId){
		let evt = this.m_events[eventId];
		// Assert(evt);
		return evt;
	}

	/**
	 * 下一帧触发事件
	 * @eventId {any} 事件标识
	 * @params {...array} 回调函数参数
	 */
	this.pushEvent = function(eventId, ...params){
		this.m_queue.push({"eventId":eventId, "params":params, "timeout":0.1});
	}

	/**
	 * 立刻触发事件
	 * @eventId {any} 事件标识
	 * @params {...array} 回调函数参数
	 */
	this.pushEventImm = function(eventId, ...params){
		this.doEvent(eventId, params);
	}

    this.doEvent = function(eventId, params){
        let evt = this._getEvt(eventId);
        if (!evt)
            return;
        //Core.log(LogDebug, "evtid: " + eventId + " len: " + evt.length);
		for (let i = 0; i < evt.length; i++) {
            //Core.log(LogDebug, "evtid: " + eventId + " callback: " + evt.length);
            let event = evt[i];
            let target = null;
            if("target" in event){
                target = event.target;
            }
			event.callback.apply(target, params);
		}
    }
    
	/**
	 * 延时触发事件
	 * @eventId {any} 事件标识
	 * @delay {integer} 延时多久， 单位毫秒
	 * @params {...array} 回调函数参数
	 */
	this.pushEventDelay = function(eventId, delay, ...params){
        //cc.log("pushEventDelay: " + params.length);
		this.m_queue.push({"eventId":eventId, "params":params, "timeout":delay});
	}

	/**
	 * 每帧tick
	 * @delay {integer} 上帧耗时, 单位毫秒
	 */
	this.tick = function(delay){
		// 遍历事件队列
		for (let i = 0; i < this.m_queue.length;) {
            
            let item = this.m_queue[i];
			// 事件回调函数
			if (item.timeout <= 0){
                //cc.log("tick:" + item.params.length + "::" + item.eventId);
				this.doEvent(item.eventId, item.params);
				this.m_queue.splice(this.m_queue.indexOf(item), 1);
			} else {
				item.timeout -= delay;
				++i;
			}
		}
	}
};

/**
* 事件处理器单例
*/

//单例
EventDispatcher.instance = null;
EventDispatcher._getInstance = function () {
    if (EventDispatcher.instance === null) {
        EventDispatcher.instance = new EventDispatcher();
    }
    return EventDispatcher.instance;
};

cc.eventDispatcher = EventDispatcher._getInstance();
