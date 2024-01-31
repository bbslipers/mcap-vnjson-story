/**
 * mc-get-card-slot
 */
export default function (args){
    const IDs = ['is_mtc:block_monodisplayer', 'is_mtc:block_displayer', 'is_mtc:item_card_common'];
    const { TYPE } = vnjs.store.MINECRAFT;
    const ITEM = vnjs.store.MINECRAFT[TYPE];
    /**
     * В заданных координатах не тот блок, что нам нужен
     */
    
    if(!IDs.includes(ITEM.data.id)) {
        vnjs.exec(args.default);
        return;
    }
    let card =  null;

    if(TYPE==="BLOCK"){
        card = ITEM.data.nbt.Items.Items.find( (item) => item.Slot===args.slot);
    }
    else if(TYPE === "HAND"){
        card = ITEM.data;
    }

    
    /**
     * Пустой блок, без карточки
     */
    if(!card) {
        vnjs.exec(args.default);
        return;
    };

    const { assetnumber, cdwd } = card.tag;
    /**
     * Созраняем cardID в переменню
     */
    vnjs.state.data[args.card] = `${cdwd} ${assetnumber}`;
    /**
     * Выполняем cdwd карты, если найдена
     */
    let flagID = false;
    for(let key in args){
        if(key===cdwd){
            flagID = true;
            vnjs.exec(args[key]);
        }
    }
    if(!flagID){
        vnjs.exec(args.default);
    }

}