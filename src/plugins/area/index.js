import "./style.css";

const $tpl = $('<div class="vnjson__area component"></div>');
let _regions = null;
let onClickData = null;
let onClickOutData = null;
export default function () {
    vnjs.store.screen.append($tpl);
    vnjs.on("area", handler.bind(this));
    $tpl.on("click", (e) => {
        if (!e.target.className.includes("vnjson__area-item")) return;
        const regIndex = JSON.parse(e.target.dataset.index);
        this.exec(_regions[regIndex].exec);
    });
}

function handler(regions) {
    if (!regions) {
        onClickData = null;
        onClickOutData = null;
        $tpl.hide();
        return;
    }
    _regions = regions;
    $tpl.empty();
    $tpl.show();
    regions.forEach((reg, index) => {
        const $regTpl = $(`<div  class="vnjson__area-item" data-index="${index}"></div>`);
        if(reg.onClick){
            onClickData = reg.onClick;
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
  
        if (reg.show) {
            if (reg.show === true) {
                $regTpl.css('border', '5px solid #11f285');
              
            }
            if (typeof reg.show === "string") {
                $regTpl.css('border', `5px solid ${reg.show}`);
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