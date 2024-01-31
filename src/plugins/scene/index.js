import "./style.css";

const $tpl = $('<div class="vnjson-scene component"></div>');

export default function () {
    vnjs.store.screen.append($tpl);
    vnjs.on("scene", (id) => {
        vnjs.emit('image.update',  $tpl, {plugin: 'scene', prop: 'background-image'})
        if (typeof id === "object") {
            $tpl.css({
                "background-image": `url(${id.url})`,
            });
            $tpl.fadeIn();
        } else if (typeof id === "string") {
            $tpl.css({
                "background-image": `url('${vnjs.getAssetByName(id).url}')`,
            });
            $tpl.fadeIn();
        } else {
            $tpl.fadeOut();
            $tpl.css({
                "background-image": `unset`,
            });
        }
    });
}
