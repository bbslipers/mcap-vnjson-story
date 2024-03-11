export default function (args){

    const { mtcs } = vnjs.tree.$root;
    if(!mtcs){
        vnjs.exec('error', {
            ru: 'Файл $root/mtcs.yaml отсутсвует',
            en: 'Require $root/mtcs.yaml'
        }, vnjs.ctx);
        return;
    }
    vnjs.state.data[args.name] = mtcs[args.card].name;
    vnjs.state.data[args.price] = mtcs[args.card].price;
    vnjs.state.data[args.сategory] = mtcs[args.card].сategory;
    vnjs.state.data[args.desription] = mtcs[args.card].desription;

    
}