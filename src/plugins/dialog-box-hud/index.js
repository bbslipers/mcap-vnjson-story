import "./style.css";
import tpl from "./tpl.html";

const $tpl = $(tpl);
const $invTag = $tpl.find(".vnjson-hud__inv");
const $hudLeft = $tpl.find(".vnjson-hud__left");
const $hudRight = $tpl.find(".vnjson-hud__right");

let  slotData = null;

export default function (){
    vnjs.store.screen.append($tpl);
}

function hudInvHandler(args) {
    const $slot = $tpl.find(`.vnjson-hud__item--${args.slot}`);
    if (args.icon) {
        slotData = args;
        $slot.css({
            "background-image": `url(${vnjs.getAssetByName(args.icon).url})`,
        });
    } else {
        slotData = null;
        $slot.css({ "background-image": "unset" });
    }
    if (args.exec) {
        $slot.css("cursor", "pointer");
    } else {
        $slot.css("cursor", "unset");
    }
}

function clickSlotHandler(target) {
    if (!slotData) return;
    if (!slotData.exec) return;

    if (slotData.slot === $(target).data('index') ) {
        vnjs.exec(slotData.exec);
    }
}


vnjs.on("hud", (args) => {
    if (args) {
        $tpl.show();
    } else {
        $tpl.hide();
    }
})

vnjs.on("hud-left", (args) => {
    let width = null
    if(vnjs.state.data[args]){
        width = vnjs.state.data[args]
    }
    else{
        width = args
    }
    $hudLeft.animate({ width }, 300);
})

vnjs.on("hud-right", (args) => {
    let width = null
    if(vnjs.state.data[args]){
        width = vnjs.state.data[args]
    }
    else{
        width = args
    }
    $hudRight.animate({ width }, 300);
})

vnjs.on("dialog-box.mode", (mode) => {
    if (mode === "mode-classic") {
        $tpl.css({ bottom: "210px" });
    }
    if (mode === "mode-fullscreen") {
        $tpl.css({ bottom: "10px" });
    }
})

vnjs.on("hud-inv", (args) => hudInvHandler(args))

$invTag.on("click", ".vnjson-hud__slot", function () {
    clickSlotHandler( $(this) )
})