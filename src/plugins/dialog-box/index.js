import "./style.css";
import tpl from "./tpl.html";
import DialogBox from "./DialogBox.js";
import errorSnippet from "./error-snippet.js";

const $tpl = $(tpl);
/**
 * DialogBox
 */

/**
 * setup
 */
let dBox = null
export default function () {
    vnjs.store.screen.append($tpl);
    dBox = new DialogBox({
        delay: 0,
        alpha: 0,
        endPoint: false,
        dialogBoxSelector: ".dialog-box",
        characterNameOutputSelector: ".dialog-box__name",
        characterAvatarSelector: ".dialog-box__avatar",
        replyWrapperSelector: ".dialog-box__reply-wrapper",
        replyOutputSelector: ".dialog-box__reply",
        replyContaiterSelector: ".dialog-box__container",
        classNameLetter: "dialog-box__letter",
        classNameEndPoint: "dialog-box__reply-end-point",
    });

    // при клике по диалоговому окну, продвигаемся дальше по yaml скрипту
    $tpl.find(".dialog-box__reply-wrapper").on("mousedown", (e) => {
        vnjs.emit("dialog-box.click");
        vnjs.next();
    });



    vnjs.plugins["dialog-box"] = dBox;
    /**
     * DELAY
     */
    vnjs.on("postload", onPostload);

    /**
     * SHOW HIDE DIALOG-BOX
     */
    vnjs.on("dialog-box", handler);
}

/**
 * @ character native event
 */
vnjs.on("vnjson.character", (_character, args, append) => {
    const character = { ..._character };
    if (typeof args === "object") {
        if (args.nameColor) character.nameColor = args.nameColor;
        if (args.replyColor) character.replyColor = args.replyColor;
        if (args.avatar) character.avatar = args.avatar;
        dBox.print(character, String(args.reply), append);
    } 
    else {
        dBox.print(character, String(args), append);
    }
});
/**
 * append reply
 */
/*
vnjs.on("+", (reply) => {
    let character = vnjs.state.character;
    if(!character) {
        vnjs.state.character = vnjs.tree.$root.characters[0]
    }

    dBox.print(character, String(reply), true);
});*/

/**
 * handler
 */
function handler (args){
    let key = null;
    key = String(args);
    if (typeof args === "object") {
        key = "object";
    }
    const controller = {
        object() {
            for (let _key in args) {
                dBox[_key] = args[_key];
            }
            dBox.show();
        },
        true() {
            dBox.disabled(false);
            dBox.show();
        },
        false() {
            dBox.hide();
        },
        clear() {
            dBox.disabled(false);
            dBox.clear();
        },
        disabled() {
            dBox.disabled(true);
        },
        transparent() {
            dBox.transparent();
        },
        classic() {
            dBox.disabled(false);
            dBox.setMode("mode-classic");
            dBox.show();
        },
        fullscreen() {
            dBox.disabled(false);
            dBox.setMode("mode-fullscreen");
            dBox.show();
        },
    };

    controller[key]();
}

function onPostload (){
    const conf = vnjs.package?.["dialog-box"];
    if (conf) {
        for (let key in conf) {
            switch (key) {
                case "delay":
                    dBox.delay = conf.delay;
                    break;
                case "alpha":
                    dBox.alpha = conf.alpha;
                    break;
                case "endPoint":
                    dBox.endPoint = conf.endPoint;
                    break;
                case "mode-classic":
                    dBox.setMode("mode-classic");
                    break;
                case "mode-fullscreen":
                    /**/
                    break;
                case "font-family":
                    vnjs.plugins['font-load'](conf["font-family"], '.dialog-box')
                    break;
                case "font-size":
                    $tpl.css("font-size", conf["font-size"]);
                    break;
                    case "line-height":
                        $tpl.css("line-height", conf["line-height"]);
                        break;
                default:
                    vnjs.emit(
                        "error",
                        {
                            ru: `Некоректный параметр <font color="deepskyblue">${key}</font>`,
                            en: `Invalid argsetr <font color="deepskyblue">${key}</font>`,
                        } /*, jsyaml.dump(conf) */
                    );
            }
        }
    } 
    else {
        vnjs.emit("vnjson.error", errorSnippet);
    }    
}