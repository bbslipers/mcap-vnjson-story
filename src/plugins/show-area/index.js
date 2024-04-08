import "./style.css";

let area = null;
let onClickAny = {};
let onClickOut = {};

const $tpl = $('<div class="vnjson__area component"></div>');

export default function (){
    vnjs.store.screen.append($tpl);
}

vnjs.on("area", (args) => {
    if (args) {
        area = args;
        $tpl.empty(); $tpl.show();
        args.forEach((reg, index) => {        
            if (reg.onClickAny) {
                onClickAny = reg.onClickAny;
                return;
            }
            if (reg.onClickOut) {
                onClickOut = reg.onClickOut;
                return;
            }
            
            if (reg.areaWidth) {
                $tpl.css('width',`${reg.areaWidth}px`);
                return;
            }            
            if (reg.areaHeight) {
                $tpl.css('height',`${reg.areaHeight}px`);
                return;
            } 
        })

        args.forEach((reg, index) => {        
            if (!reg.item === true) {
                return;
            }
             
            const $regTpl = $(`<div class="vnjson__area-item" data-index="${index}"></div>`);

            $regTpl.css({
                position: "absolute",
                top: `${reg.top}px`,
                left: `${reg.left}px`,
                width: `${reg.width}px`,
                height: `${reg.height}px`
            })
            
            if (!(reg.type === "inv-switch")) {
                if (reg.border) {
                    if (reg.border === true) {
                        $regTpl.css('border', '3px solid grey');
                    }
                    if (typeof reg.border === "string") {
                        $regTpl.css('border', `3px solid ${reg.border}`);
                    }
                }else{
                    $regTpl.css('border',"");
                }

                if (reg.image) {
                    if (typeof reg.image === "string") {
                        $regTpl.css('background-image', `url("${vnjs.getAssetByName(reg.image).url}")`);
                    }
                }else{
                    $regTpl.css('background-image',"");    
                }
                
                if (reg.color) {
                    if (reg.color === true) {
                        $regTpl.css('background-color', 'grey');
                    }
                    if (typeof reg.color === "string") {
                        $regTpl.css('background-color', reg.color);
                    }
                }else{
                    $regTpl.css('background-color',"");    
                }
            }
            if(reg.onClick){
                $regTpl.on('click', () => vnjs.exec(Object.assign(onClickAny, reg.onClick)));
            }else{
                if (!$.isEmptyObject(onClickAny)) {
                    $regTpl.on('click', () => vnjs.exec(onClickAny));
                }
            }
            $tpl.append($regTpl);
        })
    }else{
        $tpl.empty(); $tpl.hide();
    }
})

$tpl.css({width: '1024px', height: '768px'})

$tpl.on('click', (e) => {
    if (!e.target.className.includes('vnjson__area-item')) {
        if (!$.isEmptyObject(onClickOut)) {
            vnjs.exec(onClickOut);
        }                
    }else{
        const regIndex = JSON.parse(e.target.dataset.index);
        const regItem = area[regIndex];
        const regElement = $(e.target);
        console.log(regItem.type);
        if ((regItem.type === "switch")||(regItem.type === "inv-switch")) {
            if (regElement.css('border') === "0px none rgb(0, 0, 0)"){
                if (regItem.border) {
                    if (regItem.border === true) {
                        regElement.css('border', '3px solid grey');
                    }
                    if (typeof regItem.border === "string") {
                        regElement.css('border', `3px solid ${regItem.border}`);
                    }
                }                        
            }else{
                regElement.css('border',"");    
            }

            if (regElement.css('background-color') === "rgba(0, 0, 0, 0)"){
                if (regItem.color) {
                    if (regItem.color === true) {
                        regElement.css('background-color', 'grey');
                    }
                    if (typeof regItem.color === "string") {
                        regElement.css('background-color', regItem.color);
                    }
                }                        
            }else{
                regElement.css('background-color',"");    
            }

            if (regElement.css('background-image') === "none"){
                if (regItem.image) {
                    if (typeof regItem.image === "string") {
                        regElement.css('background-image', `url("${vnjs.getAssetByName(regItem.image).url}")`);
                    }
                }                        
            }else{
                regElement.css('background-image',"");    
            }                    
        }
    }
})