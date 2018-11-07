cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Prefab
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        spawnCount: 10, // 实际创建的项数量
        totalCount: 10, // 在列表中显示的项数量
        spacing: 5, // 项之间的间隔大小
    },

    // use this for initialization
    onLoad: function () {
    	this.content = this.scrollView.content;
        this.items = []; // 存储实际创建的项数组
        this.itemHeight = 0;
        this.spawnCount = Math.min(this.spawnCount,this.totalCount);
    	this.initialize();
        this.updateTimer = 0;  
        this.updateInterval = 0.2;
        // 使用这个变量来判断滚动操作是向上还是向下
        this.lastContentPosY = 0; 


    },

    // 列表初始化
    initialize: function () {
        this.content.height = 0;
        // 获取整个列表的高度
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
            let item = cc.instantiate(this.itemTemplate);
            
            if(this.content.height === 0){
                this.itemHeight = item.height;
                this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
                cc.log('TableList->initialize height: %s',this.content.height.toString());
                
        // 设定缓冲矩形的大小为实际创建项的高度累加，当某项超出缓冲矩形时，则更新该项的显示内容
                this.bufferZone = this.spawnCount * (this.itemHeight + this.spacing) / 2;
            }
            
            this.content.addChild(item);
            // 设置该item的坐标（注意父节点content的Anchor坐标是(0.5, 1)，所以item的y坐标总是负值）
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let cell = item.getComponent('TableCell');
            cell.updateItem(i, i);
            this.updateItem(cell,i,true);
            this.items.push(item);
        }
        cc.log('TableList-> %d',this.items.length);
        
    },

    // 返回item在ScrollView空间的坐标值
    getPositionInView: function (item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    // 每帧调用一次。根据滚动位置动态更新item的坐标和显示(所以spawnCount可以比totalCount少很多)
    update: function(dt) {
        if(this.items == null || this.items.length <= this.spawnCount){
            return;
        }
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
        let items = this.items;
        // 如果当前content的y坐标小于上次记录值，则代表往下滚动，否则往上。
        let isDown = this.scrollView.content.y < this.lastContentPosY;
        // 实际创建项占了多高（即它们的高度累加）
        let offset = (this.itemHeight + this.spacing) * items.length;
        let newY = 0;
        cc.log('TableList->update: %d',items.length);
        
        // 遍历数组，更新item的位置和显示
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // 提前计算出该item的新的y坐标
                newY = items[i].y + offset;
                // 如果往下滚动时item已经超出缓冲矩形，且newY未超出content上边界，
                // 则更新item的坐标（即上移了一个offset的位置），同时更新item的显示内容
                if (viewPos.y < -this.bufferZone && newY < 0) {
                    items[i].setPositionY(newY);
                    let item = items[i].getComponent('TableCell');
                    let itemId = item.id - items.length; // update item id
                    item.updateItem(i, itemId);
                    this.updateItem(item,itemId,false);
                }
            } else {
                // 提前计算出该item的新的y坐标
                newY = items[i].y - offset;
                // 如果往上滚动时item已经超出缓冲矩形，且newY未超出content下边界，
                // 则更新item的坐标（即下移了一个offset的位置），同时更新item的显示内容
                if (viewPos.y > this.bufferZone && newY > -this.content.height) {
                    items[i].setPositionY(newY);
                    let item = items[i].getComponent('TableCell');
                    let itemId = item.id + items.length;
                    item.updateItem(i, itemId);
                    this.updateItem(item,itemId,false);
                }
            }
        }

        // 更新lastContentPosY和总项数显示
        this.lastContentPosY = this.scrollView.content.y;
    },
    updateItem: function(tableCell,id,init){

    },
    scrollToFixedPosition: function () {
        // 在2秒内完成
        this.scrollView.scrollToOffset(cc.p(0, 500), 2);
    },

});
