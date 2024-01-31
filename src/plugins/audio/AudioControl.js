class AudioControl {
    timeOutId = null;
    soundArgs = null;
    constructor() {
        // не помню зачем это, но вроде раньше от чего то помогало
        this.stopAll();
    }
    isAudioExist(name) {
        if (!vnjs.store[name] && !vnjs.store.sprites[name]) {
            vnjs.emit("error", "assetNotFound", name);

            return false;
        }
        return true;
    }
    handler(args) {
        /**
         * BOOLEAN
         */
        if (typeof args === "boolean") {
            this.stopAll();
            clearTimeout(this.timeOutId);
        } else if (typeof args === "string") {
        /**
         * STRING
         */
            if (!this.isAudioExist(args)) return;
            const soundName = vnjs.store.sprites[args];
            if (soundName) {
                vnjs.store[soundName].stop();
                vnjs.store[soundName].rate(1);
                vnjs.store[soundName].loop(false);
                vnjs.store[soundName].volume(1);
                vnjs.store[soundName].play(args);
            } else {
                vnjs.store[args].stop();
                vnjs.store[args].rate(1);
                vnjs.store[args].loop(false);
                vnjs.store[args].volume(1);
                vnjs.store[args].play();
            }
        } else if (typeof args === "object") {
        /**
         * OBJECT
         */
            if (!this.isAudioExist(args.name)) return;

            const soundName = vnjs.store.sprites[args.name];
            let sound = null;
            if (soundName) {
                sound = vnjs.store[soundName];
            } else {
                sound = vnjs.store[args.name];
            }
            sound.stop();
            //sound.off('play')
            sound.rate(args.speed || 1);

            if (args.loop === true) {
                sound.loop(true);
            }
            if (!args.loop) {
                sound.loop(false);
            }

            sound.volume(args.volume || 1);
            /**
             * fadeIn
             */
            if (args.fadeIn) {
                sound.fade(0, 1, args.fadeIn);
            }
            /*sound.on('play', () => {
          if(args.fadeOut&&soundName){

              const delay =  ((sound.duration() - sound.seek())  * 1000 ) - args.fadeOut
              this.timeOutId = setTimeout(() => {

                    sound.fade(1, 0, args.fadeOut);
              }, delay)
 
            }
    
        })*/

            if (soundName) {
                sound[args.action](args.name);
            } else {
                sound[args.action]();
            }

            this.soundArgs = args;
        }
    }
    stopAll() {
        Object.values(vnjs.store).map((asset) => {
            if (asset.hasOwnProperty("_muted")) {
                asset.stop();
            }
        });
    }
    /**
     *
     * @param {String} time [ 2:53 ]
     */
    formatTime(time) {
        const t = String(time).split(":");
        if (!String(time).includes(":")) {
            const errorBody = {
                en: `Invalid time <font color="deepskyblue">${time}</font>`,
                ru: `Некоректный параметр времени <font color="deepskyblue">${time}</font>`,
            };
            vnjs.emit("error", errorBody);
            return 0;
        }

        let min = 0;
        let sec = 0;
        if (t.length === 2) {
            min = Number(t[0]);
            sec = Number(t[1]);
        } else {
            const errorBody = {
                en: `Invalid time <font color="deepskyblue">${time}</font>`,
                ru: `Некоректный параметр времени <font color="deepskyblue">${time}</font>`,
            };
            vnjs.emit("error", errorBody);
            return 0;
        }

        return (0 * 60 + min * 60 + sec) * 1000;
    }

    regSprites(args) {
        for (let spriteID in args.sprite) {
            const startTime = this.formatTime(args.sprite[spriteID][0]);
            const endTime = this.formatTime(args.sprite[spriteID][1]);
            const timeRange = [startTime, endTime];

            vnjs.store.sprites[spriteID] = args.name;
            vnjs.store[args.name]._sprite[spriteID] = timeRange;
            vnjs.store[args.name].volume(args.volume || 1);
        }
    }
}

export default AudioControl;
