import "./style.css";
import bgIMG from "./assets/bg.png";

let vnjs = null;
let stepsArray = [];

const $tpl = $('<div class="vnjson__blocks component"></div>');

export default function () {
    vnjs = this;
    vnjs.store.screen.append($tpl);
    vnjs.on("block", (param) => {
        stepsArray = param;
        blocksHandler.call(this, stepsArray);
    });
    vnjs.on("block-step", blocksStepHandler);
}

function getImage(item) {
    if (item.image) {
        return vnjs.getAssetByName(item.image).url;
    }
    return bgIMG;
}

function blocksHandler(param) {
    if (param) {
        $tpl.show();
        param.forEach((item) => {
            const $imgWrapper = $(`
                        <div class="vnjson__blocks-item component vnjson__blocks--${
                            item.id
                        }" >
                                <div class="vnjson__blocks-wrapper-item vnjson__blocks-wrapper--${
                                    item.id
                                }">
                                    <img alt=""  src="${getImage(item)}">
                                </div>
                        </div>`);

            $imgWrapper.css({
                display: "block",
                top: `${item.top}px`,
                left: `${item.left}px`,
                width: `${item.width}px`,
                height: `${item.height}px`,
            });

            const $img = $imgWrapper.find("img");

            const $imgBox = $imgWrapper.find(
                `.vnjson__blocks-wrapper--${item.id}`
            );
            $img.css({
                display: "none",
                top: 0,
                left: 0,
                opacity: 0,
                width: `${item.width}px`,
                height: `${item.height}px`,
            });
            $tpl.append($imgWrapper);
            /**
             * item.animation
             */
            setTimeout(() => {
                if (item["z-index"]) {
                    $imgWrapper.css("z-index", item["z-index"]);
                }
                if (item.animation) {
                    animationType($imgWrapper, $img, $imgBox, item);
                } else {
                    $img.css({ opacity: "1", display: "block" });
                }
            }, item.timeout + 100);
        });
    } else {
        $tpl.hide();
        $tpl.empty();
    }
}

function animationType($imgWrapper, $img, $imgBox, item, _isStep) {
    switch (item.animation.type) {
        case "slideUp":
            $img.css({ display: "block" });
            $imgBox.css({ top: "-100%" });
            $img.animate({ opacity: 1 }, item.animation.duration);
            $imgBox.animate({ top: "0%" }, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        case "slideDown":
            $img.css({ display: "block" });
            $imgBox.css({ top: "100%" });
            $img.animate({ opacity: 1 }, item.animation.duration);
            $imgBox.animate({ top: "0%" }, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        case "slideLeft":
            $img.css({ display: "block" });
            $imgBox.css({ left: "-100%" });
            $img.animate({ opacity: 1 }, item.animation.duration);
            $imgBox.animate({ left: "0%" }, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        case "slideRight":
            $img.css({ display: "block" });
            $imgBox.css({ left: "100%" });
            $img.animate({ opacity: 1 }, item.animation.duration);
            $imgBox.animate({ left: "0%" }, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        case "showUp":
            $img.css({ opacity: 1, display: "block" });
            $imgBox.css({
                height: "0px",
                top: "0px",
                bottom: "unset",
                "align-items": "flex-start",
            });
            $imgBox.animate(
                { height: item.height },
                item.animation.duration,
                () => {
                    if (item.animation.onEnd) {
                        vnjs.exec(item.animation.onEnd);
                    }
                }
            );
            break;
        case "showDown":
            $img.css({ opacity: 1, display: "block" });
            $imgBox.css({
                height: "0px",
                top: "unset",
                bottom: "0px",
                "align-items": "flex-end",
            });
            $imgBox.animate(
                { height: item.height },
                item.animation.duration,
                () => {
                    if (item.animation.onEnd) {
                        vnjs.exec(item.animation.onEnd);
                    }
                }
            );
            break;
        case "showLeft":
            $img.css({ opacity: 1, display: "block" });
            $imgBox.css({
                width: "0px",
                left: "0px",
                right: "unset",
                "justify-content": "flex-start",
            });
            $imgBox.animate(
                { width: item.width },
                item.animation.duration,
                () => {
                    if (item.animation.onEnd) {
                        vnjs.exec(item.animation.onEnd);
                    }
                }
            );
            break;
        case "showRight":
            $img.css({ opacity: 1, display: "block" });
            $imgBox.css({
                width: "0px",
                right: "0px",
                left: "unset",
                "justify-content": "flex-end",
            });
            $imgBox.animate(
                { width: item.width },
                item.animation.duration,
                () => {
                    if (item.animation.onEnd) {
                        vnjs.exec(item.animation.onEnd);
                    }
                }
            );
            break;
        case "moveTo":
            $img.css({ display: "block", opacity: 1 });
            const animationData = {};
            if (item.animation.left) {
                animationData.left = replaceData(item.animation.left);
            }
            if (item.animation.top) {
                animationData.top = replaceData(item.animation.top);
            }
            $imgWrapper.animate(animationData, item.animation.duration, 'linear', () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        case "zoomTo":
            $img.css({ display: "block", opacity: 1 });

            let animationData2 = {
                transform: `scale(${item.animation.value})`,
                transition: `${item.animation.duration / 1000}s`,
                'transition-timing-function': 'linear'
            };

            $imgWrapper.css(animationData2);
            if (item.animation.onEnd) {
                setTimeout(() => {
                    vnjs.exec(item.animation.onEnd);
                }, item.animation.duration);
            }
            break;
         case "rotateTo":
            $img.css({ display: "block", opacity: 1 });

            let _data = {
                transform: `rotate(${item.animation.value}deg)`,
                transition: `${item.animation.duration / 1000}s`,
                'transition-timing-function': 'linear'
            };

            $imgWrapper.css(_data);
            if (item.animation.onEnd) {
                setTimeout(() => {
                    vnjs.exec(item.animation.onEnd);
                }, item.animation.duration);
            }
            break;
        case "fadeIn":
            $img.css({ display: "block" });
            $img.animate({ opacity: 1 }, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        case "fadeOut":
            $img.css({ opacity: 1, display: "block" });
            $img.animate({ opacity: 0 }, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
         case "sizeTo":
            $img.css({ display: "block", opacity: 1 });

            let data = {
                width:  item.animation.width?replaceData(item.animation.width):item.width,
                height: item.animation.height?replaceData(item.animation.height):item.height
            };

            $imgWrapper.animate(data, item.animation.duration)
            $img.animate(data, item.animation.duration, () => {
                if (item.animation.onEnd) {
                    vnjs.exec(item.animation.onEnd);
                }
            });
            break;
        default:
            vnjs.emit('vnjson.error', `<font color="red">Неверный тип анимации ${JSON.stringify(
                item.animation.type
            )}</font>`)
    }
}

function blocksStepHandler(item) {
    const $imgWrapper = $(`.vnjson__blocks--${item.id}`);
    const $img = $imgWrapper.find("img");
    const $imgBox = $imgWrapper.find(`.vnjson__blocks-wrapper--${item.id}`);
    const isStep = true;
    if (!item.timeout) {
        item.timeout = 0;
    }

    setTimeout(() => {
        if (item.image !== undefined) {
            $img.attr("src", getImage(item));
        }

        if (item["z-index"]) {
            $imgWrapper.css("z-index", item["z-index"]);
        }
        if (item.animation) {
            animationType($imgWrapper, $img, $imgBox, item, isStep);
        } else {
            $img.css({ opacity: "1", display: "block" });
        }
    }, item.timeout + 100);
}

function replaceData (str){
    return vnjs.plugins['data'].stringToData(str)
}