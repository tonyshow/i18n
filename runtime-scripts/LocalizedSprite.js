const SpriteFrameSet = require('SpriteFrameSet');

cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
        inspector: 'packages://i18n/inspector/localized-sprite.js',
        menu: 'i18n/LocalizedSprite'
    },

    properties: {
        spriteFrameSet: {
            default: [],
            type: SpriteFrameSet
        }
    },

    onLoad () {
        this.fetchRender();
    },

    fetchRender () {
        let sprite = this.getComponent(cc.Sprite);
        if (sprite) {
            this.sprite = sprite;
            this.updateSprite(window.i18n.curLang);
            return;
        }
    },

    getSpriteFrameByLang (lang) {
        for (let i = 0; i < this.spriteFrameSet.length; ++i) {
            if (this.spriteFrameSet[i].language === lang) {
                return this.spriteFrameSet[i].spriteFrame;
            }
        }
    },

    updateSprite (language) {
        if (!this.sprite) {
            cc.error('Failed to update localized sprite, sprite component is invalid!');
            return;
        }

        let spriteFrame = this.getSpriteFrameByLang(language);
        // let spriteInfo = this.getSpriteInfoByLang(language)
        // if(!spriteInfo) return;
        // this.showRemoteSprite(spriteInfo.iconName, (spriteFrame)=>{
        //     this.sprite.spriteFrame = spriteFrame;
        // })

        if (!spriteFrame && this.spriteFrameSet[0]) {
            spriteFrame = this.spriteFrameSet[0].spriteFrame;
        }

        this.sprite.spriteFrame = spriteFrame;
    },

    showRemoteSprite(url, cb){
        cc.loader.load({
            url: url,
            type: 'jpg'
        },  (err, tex)=> {
            if(!!err){
                cc.error(err);
                return;
            }
            if(!!cb){
                var spriteFrame = new cc.SpriteFrame(tex, new cc.Rect(0, 0, tex.width, tex.height));
                if(!!spriteFrame){
                    cb(spriteFrame);
                }else{
                    cc.error("new cc.SpriteFrame is fails");
                }
            }
        });
    },

    getSpriteInfoByLang (lang) {
        for (let i = 0; i < this.spriteFrameSet.length; ++i) {
            if (this.spriteFrameSet[i].language === lang) {
                return this.spriteFrameSet[i];
            }
        }
    },

});