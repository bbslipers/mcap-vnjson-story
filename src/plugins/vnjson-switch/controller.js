export default {
    '===': (dataValue, value, execData) => {
        if(dataValue===value){
            vnjs.exec(execData)
        }
    },
    '>': (dataValue, value, execData) => {
        if(dataValue>value){
            vnjs.exec(execData)
        }
    },
    '<': (dataValue, value, execData) => {
        if(dataValue<value){
            vnjs.exec(execData)
        }
    },
    '!==': (dataValue, value, execData) => {
        if(dataValue!==value){
            vnjs.exec(execData)
        }
    },
    '<=': (dataValue, value, execData) => {
        if(dataValue<=value){
            vnjs.exec(execData)
        }
    },
    '>=': (dataValue, value, execData) => {
        if(dataValue>=value){
            vnjs.exec(execData)
        }
    },
    '[]': (dataValue, value, execData) => {
        if( dataValue.includes(value) ){
            vnjs.exec(execData)
        }
    },
    '][': (dataValue, value, execData) => {
        if(!dataValue.includes(value)){
            vnjs.exec(execData)
        }
    }
}

