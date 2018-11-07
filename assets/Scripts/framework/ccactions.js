

cc.actions = {
    //闪烁
    flashing: function(delay,opacity,repeatCount = -1){
        let action = null;
        let seq = cc.sequence(cc.fadeTo(delay,opacity),cc.fadeIn(delay));
        if (repeatCount == -1){
            action = cc.repeatForever(seq);
        }
        else{
            action = cc.repeat(seq, repeatCount);
        }

        return action;
    },
    //浮动
    floatingForever: function(delay,distance){
        let reverse = cc.v2(-distance.x,-distance.y);
        let action = cc.repeatForever(cc.sequence(cc.moveBy(delay,distance),cc.moveBy(delay,reverse)));
        return action;
    },
    //旋转
    rotateForever: function(delay){
        let nseq = cc.repeatForever(cc.sequence(cc.rotateTo(0,0),cc.rotateTo(delay*0.5,180),cc.rotateTo(delay*0.5,360)));
        return nseq;
    },
    
    //呼吸
    breathingForever: function(delay,scale){
        let action = cc.repeatForever(cc.sequence(cc.scaleTo(delay,scale),cc.scaleTo(delay,1)));
        return action;
    },
    //摇一摇
    shake: function(duration,angle){
        // auto nRotate1 = EaseSineIn::create(RotateBy::create(duration, angle));
        // auto nRotate2 = EaseSineIn::create(RotateBy::create(duration * 2, -angle * 2));
        // auto nRotate3 = RotateBy::create(duration * 2, angle * 2);
        // auto nRotate4 = RotateBy::create(duration, -angle);
        // auto nSeq = Sequence::create(nRotate1, nRotate2, nRotate3, nRotate4, nullptr);
        let r1 = cc.rotateBy(duration,angle).easing(cc.easeSineIn());
        let r2 = cc.rotateBy(duration*2,-angle*2).easing(cc.easeSineIn());
        let r3 = cc.rotateBy(duration * 2, angle * 2);
        let r4 = cc.rotateBy(duration, -angle);
        let seq = cc.sequence(r1,r2,r3,r4);

        return seq;
    },
    //移动消失
    moveFadeOut: function(duration,distance,endRun = null){
        let fadein = cc.fadeIn(0);
        let move = cc.moveBy(duration,distance);
        let fadeout = cc.fadeOut(duration);

        let spawn = cc.spawn(move,fadeout);
        let group = null;
        if(endRun){
            group = cc.sequence(fadein,spawn,cc.callFunc(endRun));
        }else{
            group = cc.sequence(fadein,spawn);
        }
        return group;
    },
    //邮戳
    postmark: function(startscale = 2,endRun = null){
        let rhide = cc.hide();
        let initac = cc.spawn(cc.scaleTo(0,startscale),cc.fadeOut(0));        
        
        let rshow = cc.show();
        let nfade = cc.fadeIn(0.2);
        let nscale = cc.scaleTo(0.2, 1.0);
        let nspawn = cc.spawn(nfade, nscale);
        nspawn.easing(cc.easeCircleActionIn());

        let group = null;
        if (endRun){
            group = cc.sequence(rhide,initac, rshow, nspawn, cc.callFunc(endRun));
        }
        else{
            group = cc.sequence(rhide,initac, rshow, nspawn);
        }
        return group;
    },
};
