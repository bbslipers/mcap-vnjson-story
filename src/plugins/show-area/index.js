import "./style.css";

let areas = null;
let onClickData = null;
let onClickOutData = null;

const $tpl = $('<div class="vnjson__area component"></div>');

export default function () {
    vnjs.store.screen.append($tpl);
    vnjs.on("areas", handler.bind(this));
    $tpl.on("click", (e) => {
        if (!e.target.className.includes("vnjson__area-item")) return;
        const regIndex = JSON.parse(e.target.dataset.index);
        this.exec(areas[regIndex].onClick);
    });
}

function handler(regions) {
    if (!regions) {
        onClickData = null;
        onClickOutData = null;
        $tpl.hide();
        return;
    }
    $tpl.empty();
    $tpl.show();
    areas = regions;
    regions.forEach((reg, index) => {
        const $regTpl = $(`<div  class="vnjson__area-item" data-index="${index}"></div>`);
        if(reg.onClickAny){
            onClickData = reg.onClickAny;
            return;
        }
        if(reg.onClickOut){
            onClickOutData = reg.onClickOut;
            return;
        }
        $regTpl.css({
            position: "absolute",
            top: `${reg.top}px`,
            left: `${reg.left}px`,
            width: `${reg.width}px`,
            height: `${reg.height}px`
        })
  
        if (reg.border) {
            if (reg.border === true) {
                $regTpl.css('border', '3px solid grey');
            }
            if (typeof reg.border === "string") {
                $regTpl.css('border', `3px solid ${reg.border}`);
            }
        }
        
        if(onClickData){
            $regTpl.on('click', () => vnjs.exec(onClickData));
        }
        $tpl.append($regTpl);
    });
}

$tpl.on('click', (e) => {
    const areaItem = e.target.className.includes('vnjson__area-item');
    if(areaItem) return;
    if(onClickOutData){
        vnjs.exec(onClickOutData);
    }
})