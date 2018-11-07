
var audiomanager = {

    init: function () {
        this._playMusic = {
            id: -1,
            urlRaw: ""
        };
        this._playEffect = {}; // 缓存音效，{name: ID}
        this._pauseCache = [];
        this._switchMusic = false; // 音乐开关
        this._switchEffect = false; // 音效开关
        this._effectVolume = 1; // 音效音量
        this._musicVolume = 1; // 音乐音量

        // 获取本地设置音量大小
        var audioSetting = JSON.parse(cc.sys.localStorage.getItem("audio"));
        this._effectVolume = audioSetting["effect"] || 1;
        this._musicVolume = audioSetting["music"] || 1;

        //获取本地开关设置
        var switchSetting = JSON.parse(cc.sys.localStorage.getItem("audioSwitch"));
        this.initSwitch(switchSetting["switchMusic"], switchSetting["switchEffect"]);
    },

    /**
     * 初始化音乐，音效开关
     */

    initSwitch: function (switchMusic, switchEffect) {
        this._switchEffect = switchEffect || true;
        this._switchMusic = switchMusic || true;
    },

    /**
     * 加载文件夹下所有音频资源
     * url: 资源所在文件夹
     */
    preLoadRes: function (url) {
        cc.loader.loadResDir(url, cc.AudioClip, function (err, res) {
            if (err) {
                cc.error("【音频】资源加载错误",);
                return;
            }
        });
    },

    /**
     * 播放音效文件
     * url: 音效文件相对地址
     * loop: 是否循环播放
     */
    playEffect: function (url, loop = false) {
        if (this._switchEffect) {
            var rawUrl = cc.url.raw("resources/" + url);
            if (cc.loader.getRes(rawUrl)) {
                var effectId = cc.audioEngine.play(rawUrl, loop, this._effectVolume);
                this._playEffect[url] = effectId;
            } else {
                cc.warn("【音频】音效" + url + "文件不存在");
            }
        }
    },

    /**
     * 转换音效开关
     */
    switchEffectFunc: function () {
        this._switchEffect = !this._switchEffect;
        if (!this._switchEffect) {
            this.stopAllEffect();
        }
        cc.sys.localStorage.setItem("audioSwitch", Json.stringify({
            switchEffect: this._switchEffect,
            switchMusic: this._switchMusic
        }));
    },

    /**
     * 获取音效开关状态
     */
    getSwitchEffect: function () {
        return this._switchEffect;
    },

    /**
     * 设置音效声音大小
     * value: 0.0 - 1.0
     */
    setEffectVolume: function (value) {
        this._effectVolume = value;
        cc.sys.localStorage.setItem("audio", JSON.stringify({
            effect: this._effectVolume,
            music: this._musicVolume
        }));
    },

    /**
     * 获取音效大小
     * @return 0.0 - 1.0
     */
    getEffectVolume: function () {
        return this._effectVolume;
    },

    /**
     * 暂停指定音效
     * url： 资源路径
     */
    pauseEffect: function (url) {
        var audio = this._playEffect[url];
        if (audio) {
            cc.audioEngine.pause(audio);
        } else {
            cc.error("【音频】音效文件" + url + "不存在");
        }
    },

    /**
     * 暂停正在播放的所有音效
     */
    pauseAllEffect: function () {
        this._pauseCache.length = 0;

        for (var url in this._playEffect) {
            var audioid = this._playEffect[url];
            if (audioid === this._playMusic.id) continue;
            var state = cc.audioEngine.getState(audioid);
            if (state === cc.audioEngine.AudioState.PLAYING) {
                this._pauseCache.push(id);
                cc.audioEngine.pause(id);
            }
        }
    },

    /**
     * 恢复指定音效
     * url:资源路径
     */
    resumeEffect: function (url) {
        var audio = this._playEffect[url];
        if (audio) {
            cc.audioEngine.resume(audio);
        } else {
            cc.error("【音频】音效文件" + url + "不存在");
        }
    },

    /**
     * 恢复当前说暂停的所有音效
     */
    resumeAllEffect: function () {
        var pauseIDCache = this._pauseCache;
        for (var i = 0; i < pauseIDCache.length; ++i) {
            var id = pauseIDCache[i];
          
            cc.audioEngine.resume(id);                
        }
    },

    /**
     * 停止播放指定音效
     * url: 资源路径
     */
    stopEffect: function (url) {
        var audio = this._playEffect[url];
        if (audio) {
            cc.audioEngine.stop(audio);
        } else {
            cc.error("【音频】音效文件" + url + "不存在");
        }
    },

    /**
     * 停止播放所有正在播放的音效
     */
    stopAllEffect: function () {
        for (var url in this._playEffect) {
            var audioid = this._playEffect[url];
            if (audioid === this._playMusic.id) continue;
            var state = cc.audioEngine.getState(audioid);
            if (state === cc.audioEngine.AudioState.PLAYING) {
                cc.audioEngine.stop(id);
            }
        }
    },

    /**
     * 背景音乐播放
     * url: 资源路径
     * loop: 是否循环
     */
    playMusic: function (url, loop = true) {
        if(this._playMusic.id != -1){
            cc.audioEngine.stop(this._playMusic.id);
        }
        
        if (this._switchMusic) {
            var rawUrl = cc.url.raw(url);
            if (cc.loader.getRes(rawUrl)) {
                let id = cc.audioEngine.play(rawUrl, loop,this._musicVolume);
                this._playMusic.id = id;
                this._playMusic.urlRaw = rawUrl;
            }
        }
    },

    /**
     * 转换音乐按钮开关
     */
    switchMusicFunc: function () {
        this._switchMusic = !this._switchMusic;
        if (!this._switchMusic) {
            this.stopMusic();
        }
        cc.sys.localStorage.setItem("audioSwitch", Json.stringify({
            switchEffect: this._switchEffect,
            switchMusic: this._switchMusic
        }));
    },

    /**
     * 获取音乐开关状态
     */
    getSwitchMusic: function () {
        return this._switchMusic;
    },

    /**
     * 暂停当前播放音乐
     */
    pauseMusic: function () {
        let state = cc.audioEngine.getState(this._playMusic.id);
        if (state === cc.audioEngine.AudioState.PLAYING) {
            cc.audioEngine.pause(this._playMusic.id);
        }
    },

    /**
     * 恢复当前被暂停音乐音乐
     */
    resumeMusic: function () {
        cc.audioEngine.resume(this._playMusic.id);
    },


    /**
     * 停止播放音乐
     * releaseData： 控制是否释放音乐资源 true释放资源 | false不释放资源
     */
    stopMusic: function (releaseData = true) {
        cc.audioEngine.stop(this._playMusic.id);
        if(releaseData){
            cc.audioEngine.uncache(this._playMusic.urlRaw);
        }
    },

    setMusicVolume: function (value) {
        this._musicVolume = value;
        cc.sys.localStorage.setItem("audio", JSON.stringify({
            effect: this._effectVolume,
            music: this._musicVolume
        }));
    },

    getMusicVolume: function () {
        return this._musicVolume;
    },

    /** 
     * 音乐是否正在播放（验证些方法来实现背景音乐是否播放完成）
     * return boolen
     */
    isMusicPlaying: function () {
        let state = cc.audioEngine.getState(this._playMusic.id);       
        return state === cc.audioEngine.AudioState.PLAYING;
    },

    /**
     * 释放指定音效资源
     * url
     */
    releaseAudio: function (url) {
        var rawUrl = cc.url.raw(url);
        if (cc.loader.getRes(rawUrl)) {
            cc.audioEngine.uncache(rawUrl);
        } else {
            cc.error("【音频】资源" + url + "不存在， 释放失败");
        }

    },

    releaseAllAudio: function () {
        cc.audioEngine.uncacheAll();
    },
}

module.exports = cc.audiomanager = audiomanager;