import { uuidv4, getRandom, formatURL } from './utils.js';

export default function (){}

vnjs.on('data-uuid', (varName) => {
    vnjs.state.data[varName] = uuidv4();
})

vnjs.on('data-join', (args) => {
    let join = "";
    let value = "";
    args.values.forEach( (item) => {
        value = vnjs.plugins.data.stringToData(item).trim();
        join = join + ' ' + value;
    });
    vnjs.state.data[args.join] = join.trim();
})

vnjs.on('data-total', (args) => {
    let total = 0;
    let value = 0;
    args.values.forEach( (item) => {
        value = Number(vnjs.plugins.data.stringToData(item));
        if (!Number.isNaN(value)){
            total = total + value;
        }
    });
    vnjs.state.data[args.total] = total;
})

vnjs.on('data-random', (args) => {
    let list = args.list;
    if(list){
        vnjs.state.data[args.random] = list[getRandom(1, list.length) - 1];
    }else{
        vnjs.state.data[args.random] = getRandom(args.min, args.max);
    }
})

vnjs.on('data-get', (args) => {
    const field = vnjs.plugins.data.stringToData(args.field);
    const value = vnjs.plugins.data.stringToData(args.value);
    const index = vnjs.plugins.data.stringToData(args.index);        
    const namespace = vnjs.plugins.data.stringToData(args.namespace);

    const query = `SELECT * FROM ${namespace} WHERE ${field} = '${value}'`;
    const URL = formatURL(vnjs.package['ri-api'], query);

    fetch(URL, {method: 'get'})
        .then(response => response.json())
        .then((data) => {
            vnjs.state.data[args.get] = data.items[0][index];
        })
})