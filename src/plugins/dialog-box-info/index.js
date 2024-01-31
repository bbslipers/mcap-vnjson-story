import Info from "./Info.js";
import "./style.css";

export default function () {
    const $tpl = $(`<div class="dialog-box__info">
                        <div class="dialog-box__info-icon"></div>
                        <div class="dialog-box__info-text"></div>
                  </div>`);
    vnjs.store.screen.append($tpl);
    /**
     * INFO
     */
    const $info = $(".dialog-box__info");
    const $avatar = $(".dialog-box__avatar");
    const info = new Info($info, $avatar);

    vnjs.on("dialog-box.print", () => info.close());

    let _param = null;
    vnjs.on("vnjson.character", (character, param) => {
        if (typeof param === "object") {
            if (param.info) {
                info.print(String(param.info));
                // addBorder
                if (param.borderColor) {
                    info.addBorder(param.borderColor);
                }
                const $icon = $tpl.find(".dialog-box__info-icon");
                if (param.icon) {
                    const url = vnjs.getAssetByName(param.icon).url;
                    $icon.show();
                    $icon.css("background-image", `url(${url})`);
                } else {
                    $icon.css("background-image", `unset`);
                    $icon.hide();
                }
                _param = true;
                return;
            } else {
                info.$info.find(".dialog-box__info-text").text("");
            }
        }
        _param = false;
    });
    $avatar.on("mousedown", () => {
        if (_param) {
            info.toggle();
        }
        vnjs.emit("dialog-box.avatar-click");
    });

    vnjs.on("dialog-box.click", () => info.removeBorder());
    vnjs.on("dialog-box.mode", (MODE) => info.controlPadding(MODE));
}
