import AudioControl from "./AudioControl.js";

/**
 * setup
 */
export default function () {
    vnjs.store.sprites = {};
}

const audioControl = new AudioControl();
let repeat = 0;

vnjs.on("audio", (args) => {
    repeat = 0;
    audioControl.handler(args);
});

vnjs.on("audio-sprite", (args) => audioControl.regSprites(args));

vnjs.on("loader.audio-onend", () => {

    if(!audioControl.soundArgs){
        return
    }
    if (audioControl.soundArgs?.loop === true) {
        if (audioControl.soundArgs?.onLoop) {
            vnjs.exec(audioControl.soundArgs.onLoop);
        }
    } else if (typeof audioControl.soundArgs.loop === "number") {
        repeater();
    } else {
        if (audioControl.soundArgs.onEnd) {
            vnjs.exec(audioControl.soundArgs.onEnd);
        }
    }
});

function repeater() {
    if (repeat < audioControl.soundArgs.loop - 1) {
        audioControl.handler(audioControl.soundArgs);
        repeat++;
    }

    if (audioControl.soundArgs?.onLoop) {
        vnjs.exec(audioControl.soundArgs.onLoop);
    }
    if (repeat === audioControl.soundArgs.loop - 1) {
        setTimeout(() => {
            vnjs.exec(audioControl.soundArgs.onEnd);
        }, 300);
    }
}
