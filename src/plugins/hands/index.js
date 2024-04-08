import "./style.css";
import tpl from "./tpl.html";

const $tpl = $(tpl);

let show = false;
let character = null;

export default function () {
    vnjs.store.screen.append($tpl);
    vnjs.on("hands", (args) => handler(args));
    vnjs.on("hand-left", (args) => leftHandler(args));
    vnjs.on("hand-right", (args) => rightHandler(args));
    vnjs.on("dialog-box.false", () => vnjs.emit("hands", false));
    vnjs.on("vnjson.character", (character) => characterHandler(vnjs.state.character));
}

function handler(args) {
    character = vnjs.state.character;
    const replyWrapper = $(".dialog-box__reply-wrapper");    
    if (args) {
        $tpl.show();
        show = true;
        characterHandler(character);       
    } else {
        $tpl.hide();
        show = false;
        characterHandler(character);         
    }   
}

function leftHandler(args) {
    if (args) {
        $tpl.show();
        show = true;
        $tpl.find(".vnjson__hand-left").css(
            "background-image",
            `url('${vnjs.getAssetByName(args).url}')`
        );
    } else {
        $tpl.find(".vnjson__hand-left").css("background-image", "unset");
    }
}

function rightHandler(args) {
    if (args) {
        $tpl.show();
        show = true;
        $tpl.find(".vnjson__hand-right").css(
            "background-image",
            `url('${vnjs.getAssetByName(args).url}')`
        );
    } else {
        $tpl.find(".vnjson__hand-right").css("background-image", "unset");
    }
}

function characterHandler(character) {
    const replyWrapper = $(".dialog-box__reply-wrapper");
    if (character === null && !show) {
        //replyWrapper[0].style.removeProperty('max-width');
        //replyWrapper[0].style.setProperty('max-width', '99%', 'important');          
        replyWrapper.css("max-width", "99%");
        return;
    }
    if (character === null && show) {
        //replyWrapper[0].style.removeProperty('max-width');
        //replyWrapper[0].style.setProperty('max-width', '89%', 'important');          
        replyWrapper.css("max-width", "89%");
        return;
    }    
    if (!character.avatar && !show) {
        //replyWrapper[0].style.removeProperty('max-width');
        //replyWrapper[0].style.setProperty('max-width', '99%', 'important');          
        replyWrapper.css("max-width", "99%");
        return;
    }
    if (character.avatar && !show) {
        //replyWrapper[0].style.removeProperty('max-width');
        //replyWrapper[0].style.setProperty('max-width', '84.5%', 'important');         
        replyWrapper.css("max-width", "84%");
        return;        
    }
    if (character.avatar && show) {
        //replyWrapper[0].style.removeProperty('max-width');
        //replyWrapper[0].style.setProperty('max-width', '75%', 'important');        
        replyWrapper.css("max-width", "75%");
        return;        
    }
    if (!character.avatar && show) {
        //replyWrapper[0].style.removeProperty('max-width');
        //replyWrapper[0].style.setProperty('max-width', '89%', 'important');          
        replyWrapper.css("max-width", "89%");
        return;
    }
}