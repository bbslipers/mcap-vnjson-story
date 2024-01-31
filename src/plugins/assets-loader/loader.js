class Loader {
    asset = null;
    index = 0;
    assets = [];
    constructor (){}
    start (assets){
        vnjs.store.audio = {};
        vnjs.emit('preload')
        this.assets = assets;
        this.assetsLength = this.assets.length
        this.load();
    }
    next (){
        this.index++
        //console.log(this.index +'/'+this.assetsLength, this.asset)
        vnjs.emit("load", this.asset, this.assetsLength, this.index);
        this.load()
    }
    load (){
      
        if(this.index<this.assetsLength){
            this.asset = this.assets[this.index];
            if (/\.png|\.jpg|\.jpeg|\.webp|\.gif/i.test(this.asset.url) ){
                this.loadImage()
            }
            else if(/\.mp3|\.wav|\.ogg/i.test(this.asset.url)){
                this.loadAudio()
            }
            else{
                /**
                 * Пропускаем неизвестные файлы
                 */
                // console.warn(this.asset.url +' Resource does not support preload')
                this.next()
            }
        }
        else{
            //console.log('Данные загружены')
            vnjs.emit('postload')
        }
    }
    loadImage (){
        const img = new Image();
        img.onerror = () => {
            vnjs.emit("load", this.asset, this.assets.length, this.index);
            console.error("Image not found", this.asset);
            this.next();
        };
        img.onload = () => this.next();
        img.src = this.asset.url;
    }
    loadAudio (){
            const sound = new Howl({ src: this.asset.url });

            sound.on("end", () => {
                vnjs.emit("loader.audio-onend")
            });
            sound.on("load", () => {

                vnjs.store[this.asset.name] = sound;
                vnjs.emit("load", this.asset, this.assets.length, this.index);
                this.next();
            });
            sound.on("loaderror", () => {
                console.error('Audio not found', this.asset);
                this.next();
            });
    }
}

export default new Loader();