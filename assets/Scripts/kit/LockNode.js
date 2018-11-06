
/**
 * 编辑器内 ui 加锁，使部分属性不可改变
 */
var POSITION_CHANGED = 'position-changed';
var SIZE_CHANGED = 'size-changed';
var ANCHOR_CHANGED = 'anchor-changed';
var ROTATION_CHANGED = 'rotation-changed';
var SCALE_CHANGED = 'scale-changed';

let LockNode = cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true,
    },
    resetInEditor: CC_EDITOR && function () {
       
        //cc.log('LockNode: resetInEditor');
        this._updataLockStatus();
        // this.__v2.x = this.node.x;
        // this.__v2.y = this.node.y;

        // this.__size.width = this.node.width;
        // this.__size.height = this.node.height;

        // this.__anchor.x = this.node.anchorX;
        // this.__anchor.y = this.node.anchorY;

        // this.__scale.x = this.node.scaleX;
        // this.__scale.y = this.node.scaleY;

        // this.__rotation = this.node.rotation;
    },
    properties: {
        
        __v2:{
            default:cc.v2(0,0),
        },
        __size:{
            default:cc.size(200,200),
        },
        __anchor:{
            default:cc.v2(0.5,0.5),
        },
        __scale:{
            default:cc.v2(1,1),
        },
        __rotation:{
            default: 0.0,
        },
        lock:{
            default: true,
            notify() {
                this._updataLockStatus();
            },
        },
        lockChildren:{
            default: false,
            notify() {
                this._updataLockChildren();
            },
        },
    },
    _updataLockStatus: function(){        
        this.__v2.x = this.node.x;
        this.__v2.y = this.node.y;

        this.__size.width = this.node.width;
        this.__size.height = this.node.height;

        this.__anchor.x = this.node.anchorX;
        this.__anchor.y = this.node.anchorY;

        this.__scale.x = this.node.scaleX;
        this.__scale.y = this.node.scaleY;

        this.__rotation = this.node.rotation;
    },
    _updataLockChildren :function(){
        let self = this;
        this.node.children.forEach((child) => {
            let _lockNodeCom = child.getComponent(LockNode);
            if(!_lockNodeCom){
                //cc.log('LockNode: _updataLockChildren _lockNodeCom is null');                
                _lockNodeCom = child.addComponent(LockNode);             
            }
            _lockNodeCom._updataLockStatus();
            _lockNodeCom.lockChildren = self.lockChildren;
            _lockNodeCom.lock = self.lockChildren;
        });

        if(!self.lockChildren){
            this.removeChildrenLock();
        }
    },
    _position_changed :function(){
        let self = this;
        if(self.lock){
            self.node.x = self.__v2.x;
            self.node.y = self.__v2.y;
            //cc.log('position-changed lock: %f,%f',self.__v2.x,self.__v2.y);
            
            
        }else{
            self.__v2.x = self.node.x;
            self.__v2.y = self.node.y;
            //cc.log('position-changed: %f,%f',self.__v2.x,self.__v2.y);
        }
    },
    _size_changed :function(){
        let self = this;
        if(self.lock){
            self.node.width = self.__size.width;
            self.node.height = self.__size.height;
            //cc.log('size-changed lock: %f,%f',self.__size.width,self.__size.height);
            
            
        }else{
            self.__size.width = self.node.width;
            self.__size.height = self.node.height;
            //cc.log('size-changed: %f,%f',self.__size.width,self.__size.height);
        }
    },
    _anchor_changed :function(){
        let self = this;
        if(self.lock){
            self.node.anchorX = self.__anchor.x;
            self.node.anchorY = self.__anchor.y;
            //cc.log('anchor-changed lock: %f,%f',self.__anchor.x,self.__anchor.y);
            
            
        }else{
            self.__anchor.x = self.node.anchorX;
            self.__anchor.y = self.node.anchorY;
            //cc.log('anchor-changed: %f,%f',self.__anchor.x,self.__anchor.y);
        }
    },
    _rotation_changed :function(event,customEventData){
        let self = this;
        if(self.lock){
            self.node.rotation = self.__rotation;
            //cc.log('rotation-changed lock: %f,%f',self.__rotation);
        }else{
            self.__rotation = self.node.rotation;
            //cc.log('rotation-changed: %f',self.__rotation);
        }
    },

    _scale_changed :function(){
        let self = this;
        if(self.lock){
            self.node.scaleX = self.__scale.x;
            self.node.scaleY = self.__scale.y;
            //cc.log('scale-changed lock: %f,%f',self.__scale.x,self.__scale.y);
        }else{
            self.__scale.x = self.node.scaleX;
            self.__scale.y = self.node.scaleY;
            //cc.log('scale-changed: %f,%f',self.__scale.x,self.__scale.y);
        }
    },

    onLoad(){
        //cc.log('LockNode: onLoad');
         
        //this.node.runAction(cc.moveTo(5,cc.v2(0,1)));
        if(CC_EDITOR){
            this.destroyLockChildren = [];
        }
    },
    onEnable: function(){
        if(CC_EDITOR){
            //cc.log('LockNode: onEnable');
            this.node.on('position-changed',this._position_changed,this);
            this.node.on('size-changed',this._size_changed,this);
            this.node.on('anchor-changed',this._anchor_changed,this);
            this.node.on('rotation-changed',this._rotation_changed,this);
            this.node.on('scale-changed',this._scale_changed,this);
        }else{

        }
    },
    checkLockChildren: function(root){
        let self = this;
        //cc.log('LockNode root.childrenCount: %d',root.childrenCount);
        
        if(root.childrenCount <= 0){
            //cc.log('LockNode: return  from->%s',self.node.name);
            
            return;
        }
        root.children.forEach((child) => {            
            let _lockNodeCom = child.getComponent(LockNode);
            //cc.log('LockNode:forEach  from->%s',self.node.name);          
            if(_lockNodeCom){
              
                self.destroyLockChildren.push(child);
                self.checkLockChildren(child);
            }
        });
    },
    removeChildrenLock: function(){
        let self = this;
        self.checkLockChildren(self.node);            
        self.destroyLockChildren.forEach((child) => {  
                        
            //cc.log('LockNode: onDestroy from->%s',self.node.name);
            let _lockNodeCom = child.getComponent(LockNode);
            //cc.log('LockNode:forEach %s ',child.name);
            if(_lockNodeCom){
                //cc.log('LockNode:%s onDestroy',child.name);                
                child.removeComponent(LockNode);
            }
        });               
        
        self.destroyLockChildren.length = 0;
    },
    onDestroy :function(){
     
         if(CC_EDITOR){
            let self = this;
            //cc.log('LockNode: onDestroy from->%s',self.node.name);
            self.node.off('position-changed',self._position_changed,self);
            self.node.off('size-changed',self._size_changed,self);
            self.node.off('anchor-changed',self._anchor_changed,self);
            self.node.off('rotation-changed',self._rotation_changed,self);
            self.node.off('scale-changed',self._scale_changed,self);
           
        }else{
            
        }
    },
    start () {

    },

    // update (dt) {},
});
