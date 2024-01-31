export default {
    '===': (localtime, value, execData, mode) => {
        if(mode==="localdate"){
            let localdate = new Date(localtime * 100000).toLocaleDateString();
            let val = new Date(value * 100000).toLocaleDateString();
            if(localdate === val){
                vnjs.exec(execData)
            }
            return;
        }
        if(localtime===value){
            vnjs.exec(execData)
        }
    },
    '>': (localtime, value, execData) => {
        if(localtime>value){
            vnjs.exec(execData)
        }
    },
    '<': (localtime, value, execData) => {
        if(localtime<value){
            vnjs.exec(execData)
        }
    },
    '!==': (localtime, value, execData, mode) => {
        if(mode==="localdate"){
            let localdate = new Date(localtime * 100000).toLocaleDateString();
            let val = new Date(value * 100000).toLocaleDateString();
            if(localdate !== val){
                vnjs.exec(execData)
            }
            return;
        }

        if(localtime!==value){
            vnjs.exec(execData)
        }
    },
    '<=': (localtime, value, execData, mode) => {
        
        if(mode === "localdate"){
            let localdate = new Date(localtime * 100000).toLocaleDateString();
            let val = new Date(value * 100000).toLocaleDateString();
            if(localdate === val){
                vnjs.exec(execData);
            }
            else if(localtime < value){
                vnjs.exec(execData);
            }
            return;
        }

        if(localtime<=value){
            vnjs.exec(execData)
        }
    },
    '>=': (localtime, value, execData, mode) => {
        if(mode === "localdate"){
            let localdate = new Date(localtime * 100000).toLocaleDateString();
            let val = new Date(value * 100000).toLocaleDateString();
            if(localdate === val){
                vnjs.exec(execData)
            }
            else if(localtime > value){
                vnjs.exec(execData)
            }
            return;
        }
        if(localtime>=value){
            vnjs.exec(execData)
        }
    },
    '[]': (localtime, value, execData) => {
        if( value[0] <= localtime && localtime <= value[1]){
            vnjs.exec(execData)
        }
    },
    '][': (localtime, value, execData) => {
        if(localtime < value[0] || localtime > value[1]){
            vnjs.exec(execData)
        }
    }
}

