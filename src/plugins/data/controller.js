class Controller {
    token = null;
    
    load(token) {
        this.token = token;
        const data = localStorage.getItem(this.token);
        if (data) {
            vnjs.state.data = JSON.parse(data);
        } else {
            vnjs.state.data = {};
        }
    }
    
    save(data) {
        localStorage.setItem(this.token, JSON.stringify(data));
    }

    clear(args) {
        if (args === true) {
            localStorage.removeItem(this.token);
            vnjs.state.data = {
                score: vnjs.state.data.score,
                player: vnjs.state.data.player,
            };
        } else if (typeof(args) === "string") {
            delete vnjs.state.data[args];
            this.save(vnjs.state.data);
        } else if (Array.isArray(args)) {
            args.forEach((item) => {
                delete vnjs.state.data[item];
            });
            this.save(vnjs.state.data);
        }
    }

    set(data) {
        for (let key in data) {
            let valueStr = null;
            let valueNum = null;
            let valueVar = null;

            valueNum = Number(data[key]);
            valueStr = String(data[key]);
            if (Number.isNaN(valueNum)) {           
                valueVar = valueStr.match(/{{.+?}}/g);
                if (valueVar) {
                    valueVar = valueVar[0];
                    valueVar = valueVar.replace("{{", "").replace("}}", "").replace(" ", "");
                    valueVar = vnjs.state.data[valueVar];
                    valueNum = Number(valueVar);
                    valueStr = String(valueVar);
                    if (Number.isNaN(valueNum)) {
                        vnjs.state.data[key] = valueStr;
                    }else{
                        vnjs.state.data[key] = valueNum;
                    }
                }else{
                    vnjs.state.data[key] = valueStr;    
                }
            }else{
                vnjs.state.data[key] = valueNum;    
            }
            this.save(vnjs.state.data);  
        }
    }

    plus(data) {
        for (let key in data) {
            let valueStr = null;
            let valueNum = null;
            let valueVar = null;
            let valueAdd = null;

            valueNum = Number(data[key]);
            if (Number.isNaN(valueNum)) {
                valueStr = String(data[key]);
                valueVar = valueStr.match(/{{.+?}}/g);
                if (valueVar) {
                    valueVar = valueVar[0];
                    valueVar = valueVar.replace("{{", "").replace("}}", "").replace(" ", "");
                    valueVar = vnjs.state.data[valueVar];
                    valueNum = Number(valueVar);
                    valueStr = String(valueVar);
                    if (Number.isNaN(valueNum)) {
                        valueAdd = valueStr;
                    }else{
                        valueAdd = valueNum;
                    }
                }else{
                    valueAdd = valueStr;    
                }
            }else{
                valueAdd = valueNum;    
            }

            valueStr = String(vnjs.state.data[key]);
            valueNum = Number(vnjs.state.data[key]);         
            if (Number.isNaN(valueNum)) {
                if (valueStr==='undefined'){
                    vnjs.state.data[key] = valueAdd;
                }else{
                    if (typeof(valueAdd)==='string'){
                        vnjs.state.data[key] = valueStr + ' ' + valueAdd;
                    }   
                }
            }else{
                if (valueStr==='undefined'){
                    vnjs.state.data[key] = valueAdd;
                }else{
                    if (typeof(valueAdd)==='number'){
                        vnjs.state.data[key] = valueNum + valueAdd;
                    } 
                }
            }
            this.save(vnjs.state.data);  
        }
    }

    minus(data) {
        for (let key in data) {
            let valueStr = null;
            let valueNum = null;
            let valueVar = null;
            let valueAdd = null;

            valueNum = Number(data[key]);
            if (Number.isNaN(valueNum)) {
                valueStr = String(data[key]);
                valueVar = valueStr.match(/{{.+?}}/g);
                if (valueVar) {
                    valueVar = valueVar[0];
                    valueVar = valueVar.replace("{{", "").replace("}}", "").replace(" ", "");
                    valueVar = vnjs.state.data[valueVar];
                    valueNum = Number(valueVar);
                    valueStr = String(valueVar);
                    if (Number.isNaN(valueNum)) {
                        valueAdd = valueStr;
                    }else{
                        valueAdd = valueNum;
                    }
                }else{
                    valueAdd = valueStr;    
                }
            }else{
                valueAdd = valueNum;    
            }

            valueStr = String(vnjs.state.data[key]);
            valueNum = Number(vnjs.state.data[key]);         
            if (Number.isNaN(valueNum)) {
                if (valueStr==='undefined'){
                    vnjs.state.data[key] = "";
                }else{
                    if (typeof(valueAdd)==='string'){                                           
                        vnjs.state.data[key] = valueStr.replace(valueAdd,"");                     
                    }   
                }
            }else{
                if (valueStr==='undefined'){
                    vnjs.state.data[key] = (-1) * valueAdd;
                }else{
                    if (typeof(valueAdd)==='number'){
                        vnjs.state.data[key] = valueNum - valueAdd;
                    } 
                }
            }
            this.save(vnjs.state.data);  
        }
    }

    stringToData(reply) {
        let _newReply = String(reply);
        const variables = String(reply).match(/{{.+?}}/g);
        if (!variables) return _newReply;
        variables.forEach((varItem) => {
            const dataKey = varItem.replaceAll("{{", "").replaceAll("}}", "").trim();
            if(vnjs.state.data[dataKey]===undefined||vnjs.state.data[dataKey]===false||vnjs.state.data[dataKey]===null){
                _newReply = _newReply.replaceAll(varItem, "");
            }
            else{
                _newReply = _newReply.replaceAll(varItem, vnjs.state.data[dataKey]);
            }
        });
        return _newReply;
    }
}

export default new Controller();