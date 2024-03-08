import "./style.css";
const $left = $(
    '<img alt="" src="" class="vnjson__show-auto-left component"/>'
);
const $center = $(
    '<img alt="" src="" class="vnjson__show-auto-center component"/>'
);
const $right = $(
    '<img alt="" src="" class="vnjson__show-auto-right component"/>'
);
const $sprite = $(
    '<div  class="vnjson__show-auto-sprite component"></div>'
);

export default function () {
    vnjs.store.screen.append($left);
    vnjs.store.screen.append($right);    
    vnjs.store.screen.append($center);
    vnjs.store.screen.append($sprite);
}

vnjs.on("left-image", (id) => {
    if (id) {
        $left.hide();
        if (typeof id === "object") {
            $left.attr("src", vnjs.getAssetByName(id.name).url);
            if (id.css) {
                $left.css(id.css);
            }
        } else {
            $left.attr("src", vnjs.getAssetByName(id).url);
        }
        $left.fadeIn();
    } else {
        $left.fadeOut();
    }
})

vnjs.on("right-image", (id) => {
    if (id) {
        $right.hide();
        if (typeof id === "object") {
            $right.attr("src", vnjs.getAssetByName(id.name).url);
            if (id.css) {
                $right.css(id.css);
            }
        } else {
            $right.attr("src", vnjs.getAssetByName(id).url);
        }
        $right.fadeIn();
    } else {
        $right.fadeOut();
    }
})

vnjs.on("center-image", (id) => {
    if (id) {
        $center.hide();
        if (typeof id === "object") {
            $center.attr("src", vnjs.getAssetByName(id.name).url);
            if (id.css) {
                $center.css(id.css);
            }
        } else {
            $center.attr("src", vnjs.getAssetByName(id).url);
        }
        $center.fadeIn();
    } else {
        $center.fadeOut();
    }
})

vnjs.on("sprite-image", (args) => {
    console.log(args)
    if(args){
        $sprite.css({
            'background-image': `url(${vnjs.getAssetByName(args.name).url})`,
            'background-position': `-${args['offset-left']} -${args['offset-top']}`,
            'top': args['sprite-top'],
            'left': args['sprite-left'],
            'width': args['sprite-width'],
            'height': args['sprite-height'],            
        })
        $sprite.show();
    }
    else{
        $sprite.hide();
    }
})