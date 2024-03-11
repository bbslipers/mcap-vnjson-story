

export default function (args){
 
    const { TYPE } = vnjs.store.MINECRAFT;
    const ITEM = vnjs.store.MINECRAFT[TYPE];
    let card = null;
    switch (ITEM.data.id){
        case 'is_mtc:item_binder':
            card = ITEM.data.tag.Items.Items.find( (item) => {
                return `${item.tag.cdwd} ${item.tag.assetnumber}` === args.card;
            });
            break;
        case 'is_mtc:block_displayer':
            card = ITEM.data.nbt.Items.Items.find( (item) => {
                return `${item.tag.cdwd} ${item.tag.assetnumber}` === args.card;
            });
   
            break;
        default:
            vnjs.exec(args.default);
            return;
    }

    if(card){
        vnjs.state.data[args.slot] = card.Slot;
        vnjs.exec(args.exec);
    }
    else{
        vnjs.exec(args.default);
    }

}