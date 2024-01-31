import "./style.css";
import tpl from "./tpl.html";

const $tpl = $(tpl);
let show = false;
export default function () {
    vnjs.store.screen.append($tpl);
    vnjs.on("hands", (args) => handler(args));
    vnjs.on("hand-left", (args) => leftHandler(args));
    vnjs.on("hand-right", (args) => rightHandler(args));
    /**
     * Когда  dialog-box скрыт, то и плагин hands нужно скрыть
     */
    vnjs.on("dialog-box.false", () => vnjs.emit("hands", false));
    /**
     * При выводе реплик проверяем, есть ли у персонажа свойство avatar
     * Если есть, то ширину блока с репликой необходимо уменьшить
     * Так же, стили необходимо восстановить, если встретился персонаж без аватара
     */
    vnjs.on("vnjson.character", (character) => characterHandler(vnjs.state.character));
}

function handler(args) {
    if (args) {
        show = true;
        $tpl.show();
    } else {
        show = false;
        $tpl.hide();
    }
}
function leftHandler(args) {
    if (args) {
        show = true;
        $tpl.show();
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
        show = true;
        $tpl.show();
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
    // если нет ни аватара ни рук
    if (!character.avatar && !show) {
        replyWrapper.css("width", "99%");
    }
    // если есть аватар, но руки не отображаются
    if (character.avatar && !show) {
        replyWrapper.css("width", "84.5%");
    }
    // если аватар есть и руки отображены
    if (character.avatar && show) {
        replyWrapper.css("width", "76%");
    }
    // Если аватара нет, но показывает руки
    if (!character.avatar && show) {
        replyWrapper.css("width", "90%");
    }
}
