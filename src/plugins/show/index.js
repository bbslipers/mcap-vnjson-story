import "./style.css";

export default function () {
    let $left = $('<div class="vnjson__show-left component"></div>');
    let $right = $('<div class="vnjson__show-right component"></div>');
    let $center = $('<div class="vnjson__show-center component"></div>');
    let $show = $('<div class="vnjson__show-show component"></div>');

    vnjs.store.screen.append($left);
    vnjs.store.screen.append($right);
    vnjs.store.screen.append($center);
    /*

.vnjson__show-show.component
 */
    vnjs.on("left", (id) => {
        if (id) {
            $left.hide();
            $left
                .css(
                    "background-image",
                    `url('${vnjs.getAssetByName(id).url}')`
                )
                .fadeIn();
        } else {
            $left.fadeOut();
        }
    });
    vnjs.on("center", (id) => {
        if (id) {
            $center.hide();
            $center
                .css(
                    "background-image",
                    `url('${vnjs.getAssetByName(id).url}')`
                )
                .fadeIn();
        } else {
            $center.fadeOut();
        }
    });
    vnjs.on("right", (id) => {
        if (id) {
            $right.hide();
            $right
                .css(
                    "background-image",
                    `url('${vnjs.getAssetByName(id).url}')`
                )
                .fadeIn();
        } else {
            $right.fadeOut();
        }
    });
    vnjs.on("show", (param) => {
        if (param) {
            $show
                .css(
                    "background-image",
                    `url('${vnjs.getAssetByName(id).url}')`
                )
                .css(param.css)
                .fadeIn();
        } else {
            $show.fadeOut();
        }
    });
}
