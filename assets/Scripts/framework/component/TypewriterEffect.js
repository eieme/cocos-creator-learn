
cc.Class({
    extends: cc.Component,

    properties: {

        charsPerSecond: {
            default: 0.2,
            type: cc.Float,
        },
        
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        

        this.isRichText = false;
        this.label = null;
        this.words = [];
        this.isActive = false;
        this.html = '';
        this.timer = 0;
        this.step = 0;
        
        this.cb = null;
    },

    start () {

    },


    refreshLabel: function(){
        this.isRichText = false;
        this.label = this.getComponent(cc.Label);
        if(this.label === null){
            this.label = this.getComponent(cc.RichText);
            if(this.label){
                this.isRichText = true;
                cc.log('TypewriterEffect-> For RichText');
            }else{
                cc.error('TypewriterEffect-> Have No Label Of RichText,must has one');
            }
        }else{
            cc.log('TypewriterEffect-> For Label');
        }
    },

    setString: function(string){
        if(this.isRichText){
            this.words = this._getTextArray4RichText(string);
            //cc.log('TypewriterEffect-> ',this.words.toString());
            
        }else{
            this.words = this._getTextArray4Label(string);
            //cc.log('TypewriterEffect-> ',this.words.toString());
        }
    },
    startEffect: function(){
        this.html = '';
        this.step = 0;
        this.isActive = true;
        
    },
    onFinishEffect: function(){
        this.isActive = false;
        this.timer = 0;
        this.step = this.words.length
        this.html = this.words.join('|');
        this.html = this.html.replace(/\|/g,"");
        this.label.string = this.html;
        if(this.cb){
            this.cb();
        }
    },
    setCallback: function(cb){
        this.cb = cb;
    },
    update (dt) {
        if(this.isActive){
            this.timer += dt;
            if(this.timer >= this.charsPerSecond){
                this.timer = 0;
                this.html += this.words[this.step]; 
                this.label.string = this.html;
                this.step++;
                if(this.step === this.words.length){
                    this.isActive = false;
                    this.onFinishEffect();
                }
            }
        }
    },


    _getTextArray4Label: function(string){
        let textArray = string.split('');
        return textArray;
    },
    
    _getTextArray4RichText: function(string){
        var richTextElements = cc.htmlTextParser.parse(string);
        let textArray = [];

        for (let i = 0; i < richTextElements.length; i++) {
            const richTextElement = richTextElements[i];
            
            var text = richTextElement.text;
            var textStyle = richTextElement.style;

            if (textStyle && textStyle.color) {
                let newtext = cc.js.formatStr("<color=%s>%s</c>",textStyle.color,text);
                textArray.push(newtext);
            }else{
                let newtextarray = text.split('');
                for (let j = 0; j < newtextarray.length; j++) {
                    let newtext = newtextarray[j];
                    textArray.push(newtext);
                }
            }
        }

        //cc.log('test-> %s',textArray.toString());

        return textArray;
    },
});
