import { uuidv4, getRandom, formatURL } from './utils.js';


export default function (){}

vnjs.on('get-uuid', (varName) => {
    vnjs.state.data[varName] = uuidv4();
});

vnjs.on('get-rnd', (args) => {
    const rnd = getRandom(args.min, args.max);
    if(args.list){

        vnjs.state.data[args.value] = args.list[rnd];
    }
    else{
        vnjs.state.data[args.value] = rnd;
    }

});

vnjs.on('get-data', (args) => {
    const id = vnjs.plugins.data.stringToData(args.id);
    const namespace = vnjs.plugins.data.stringToData(args.namespace);

    const query = `SELECT * FROM ${namespace} WHERE id = '${id}'`;
    const URL = formatURL(vnjs.package['ri-api'], query);
    fetch(URL)
        .then(r=>r.json())
        .then( (data) => {
            vnjs.state.data[args.value] = data.items[0].value;
        })
        .catch(err => console.error(err));
})


vnjs.on('get-sum', (args) => {
    let sum = 0;

    args.values.forEach( (item) => {
        const _item = Number( vnjs.plugins.data.stringToData(item) );
        sum = sum + _item;
    });

    vnjs.state.data[args.sum] = sum;
})


vnjs.on('get-str', (args) => {
    let sum = "";

    args.values.forEach( (item) => {
        const _item = vnjs.plugins.data.stringToData(item).trim();
        sum = sum + _item +" ";
    });

    vnjs.state.data[args.str] = sum.trim();
})