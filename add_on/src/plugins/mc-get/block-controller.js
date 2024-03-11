// Команда mc-get-block

export function mcGetBlockCommon(args) {
    const block = vnjs.store.MINECRAFT.BLOCK.data;	
    const props = [
		"age","alt","attached","axis",
		"bites",
		"check_decay","color","contents",
		"decayable","delay","disarmed",
		"east","enabled","extended","eye",
		"facing","flip",
		"half","has_bottle_0","has_bottle_1","has_bottle_2","has_record","hinge",
		"in_wall",
		"legacy_data","level","locked",
		"mode","moisture",
		"nodrop","north",
		"occupied","open",
		"part","power","powered",
		"rotation",
		"seamless","shape","short","snowy","south","suspended",
		"triggered","type",
		"up","upper",
		"variant",
		"west"];

    let idExist = false;
    for (let key in args) {
        // Обрабатываются ID
        if (!props.includes(key) && key !== "default" && block.id === key) {
            idExist = true;
            vnjs.exec(args[key]);
        }
		// Обрабатываються свойства
        if (props.includes(key)) {
            for (let blockKey in block.state) {
                if (blockKey.includes(`name=${key}`)) {
                    let blockParam = block.state[blockKey];
                    vnjs.state.data[args[key]] = blockParam;
                }
            }
        }
    }

    if (!idExist && args.default) {
        vnjs.exec(args.default);
    }
}

/**
 * mc-get-block-nbt
 */

export function mcGetBlockNBT(args) {
    const block = vnjs.store.MINECRAFT.BLOCK;
    for (let key in args) {
        let value = block.data.nbt[key];
        vnjs.state.data[args[key]] = value;
    }
}

/**
 * mc-get-store-slot
 */

export function mcGetStoreSlot(args) {
    const { slot } = args;
    const notIDProp = ["count", "damage", "slot"];
    const block = vnjs.store.MINECRAFT.BLOCK;
    const items = block.data.nbt.Items;

    const _item = items.find((item) => item.Slot === slot);
    if (!_item) {
        if (args.default) {
            vnjs.exec(args.default);
        }
        return;
    }
    vnjs.state.data[args.count] = _item.Count;
    vnjs.state.data[args.damage] = _item.Damage;
    let idExist = false;
    for (let key in args) {
        if (key === _item.id) {
            idExist = true;
            vnjs.exec(args[key]);
        }
    }

    if (!idExist && args.default) {
        vnjs.exec(args.default);
    }
}

/**
 * mc-get-store-total
 */
export function mcGetStoreTotal(args) {
    const block = vnjs.store.MINECRAFT.BLOCK;
    const hand = vnjs.store.MINECRAFT.HAND;
    let items = null;
    if(block){
        items = block.data.nbt.Items;
    }
    if(hand){
        items = hand.data.ForgeCaps.Parent.Items;
    }

    const _items = items.filter((item) => {
        if (args.damage) {
            if (item.id === args.id && item.Damage === args.damage) {
                return true;
            }
        } else {
            if (item.id === args.id) {
                return true;
            }
        }
    });
    /**
     * formula
     */

    if (args.formula === "SumRateCount") {
        let sum = 0;
        _items.forEach((_i) => {
            let rate = args.rates.filter( (r) => {
                let rateDamage = Number( Object.keys(r)[0] );
                return rateDamage === _i.Damage;
            })[0]
 
            if(rate){
                let val = Object.values(rate)[0]
                sum += val * _i.Count;
               
            }

        });
        console.log(sum)
    /*    args.rates.forEach((item) => {
            let val = Object.values(item)[0];
            _items.forEach((_i) => {
                console.log(val, _i)
                sum += val * _i.Count;
                   // sum += Number(item[args.damage]) * _i.Count;
            });
       
         
        });
*/
        vnjs.state.data[args.result] = sum;
    }
    if(args.formula === "SumCount"){
        let sum = 0;
        _items.forEach((_i) => {
            sum += _i.Count;
        });
        vnjs.state.data[args.result] = sum;
        console.log(sum)
    }

}
/**
 * Табличка
 */
export function mcGetSign (args){
    const block = vnjs.store.MINECRAFT.BLOCK;

    const { Text1, Text2, Text3, Text4 } = block.data.nbt;
    
    const _strings = [ Text1, Text2, Text3, Text4 ].map( (item) => {
        return JSON.parse(item).text;
    });
 


    if('minecraft:standing_sign' === block.data.id){
        vnjs.state.data[args.text1] = _strings[0];
        vnjs.state.data[args.text2] = _strings[1];
        vnjs.state.data[args.text3] = _strings[2];
        vnjs.state.data[args.text4] = _strings[3];
        vnjs.exec( args['minecraft:standing_sign'] );

    }   
    else if('minecraft:wall_sign' === block.data.id){
        vnjs.state.data[args.text1] = _strings[0];
        vnjs.state.data[args.text2] = _strings[1];
        vnjs.state.data[args.text3] = _strings[2];
        vnjs.state.data[args.text4] = _strings[3];
        vnjs.exec( args['minecraft:wall_sign'] );
    }  
    else if(args['default']){
        vnjs.exec( args['default'] );
    }
}

/**
 * Рамка
 */
export function mcGetFrameItem (args) {
    const block = vnjs.store.MINECRAFT.ENTITY;
    const excludeProps = [ "default", "damage" ];
    const { id, Damage } = block.data.nbt.Item;
    /**
     * Получаю id предмета
     */
    let def = false;
    for(let key in args){
        if( !excludeProps.includes(key) && id === key ){
            vnjs.state.data[args.damage] = Damage;
            def = true;
            vnjs.exec(args[key]);
        }
    }
    if(!def && args.default){
        vnjs.exec(args.default);
    }

}
/**
 * Предметы в руках
 */
export function mcGetHandItem (args){
    const { id, Damage } = vnjs.store.MINECRAFT.HAND.data;


    const excludeProps = [ "default", "damage" ];
    /**
     * Получаю id предмета
     */
    let def = false;
    for(let key in args){
        if( !excludeProps.includes(key) && id === key ){
            vnjs.state.data[args.damage] = Damage;
            def = true;
            vnjs.exec(args[key]);
        }
    }
    if(!def && args.default){
        vnjs.exec(args.default);
    }
}

/**
 * Book
 */

export function mcGetBook (args){
    let book = {};
    vnjs.state.data.pageNumber = 0;
    const { ENTITY, HAND } = vnjs.store.MINECRAFT;
   
    if(ENTITY){
        book = ENTITY.data.nbt.Item;
    }
    if(HAND){
        book = HAND.data;
    }
    /**
     * Если предмет по координатам или в руках не является книгой
     */
    if(book.id!=='minecraft:written_book'&&book.id!=='minecraft:writable_book'){
        vnjs.emit('error', {
            ru: `Предмет должен быть завершённой книгой или книгой с пером.`,
            en: `Requered book`
        }, vnjs.ctx);
        return;
    }
    /**
     * reset
     */
    vnjs.state.data[args.author] = "";
    vnjs.state.data[args.title] = "";
    vnjs.state.data[args.pages] = 0;
    vnjs.state.data[ args["book-text"] ] = "";

    let commonText = "";
    const { author, title, pages } = book.tag;
    /**
     * Завершённая книга
     */
    if(book.id==='minecraft:written_book'){
        pages.forEach( (page, index) => {
            let pageBreak = '';
            vnjs.state.data.pageNumber = index + 1;
    
            if(args['page-break']===false){
                pageBreak = "";
            }
            else{
                /**
                 * В свойсвте page-break может лежать переменная {{pageNumber}}
                 */
                pageBreak = vnjs.plugins['data'].stringToData( args['page-break']) + "<br/>";
            }
            let _strings = JSON.parse(page).text.replaceAll('\n', '<br/>');
            commonText += `${_strings}<br/>${pageBreak}`;
            if(args.onPage){
                vnjs.exec(args.onPage);
            }
        })
    }
    /**
     * Книга и перо
     */
    if(book.id==='minecraft:writable_book'){

        pages.forEach( (page, index) => {
            let pageBreak = '';
            vnjs.state.data.pageNumber = index + 1;
    
            if(args['page-break']===false){
                pageBreak = "";
            }
            else{
                /**
                 * В свойсвте page-break может лежать переменная {{pageNumber}}
                 */
                pageBreak = vnjs.plugins['data'].stringToData( args['page-break']) + "<br/>";
            }
            let _strings = page.replaceAll('\n', '<br/>');
            commonText += `${_strings}<br/>${pageBreak}`;
            if(args.onPage){
                vnjs.exec(args.onPage);
            }
        })
    }




    vnjs.state.data[args.author] = author;
    vnjs.state.data[args.title] = title;
    vnjs.state.data[args.pages] = pages.length;
    vnjs.state.data[ args["book-text"] ] = commonText;

}


export function mcGetBookPage (args){

    const book = vnjs.store.MINECRAFT.HAND.data;
    if(book.id!=='minecraft:written_book'){
        vnjs.emit('vnjson.error', `Запрашиваемый предмет должен быть завершённой книгой.<br/><font color="deepskyblue">minecraft:written_book</font>`);
        return;
    }
    const { author, title, pages } = book.tag;
    const PAGE = pages[args.page-1]
    console.log(PAGE)
    if(!PAGE){
        vnjs.emit('vnjson.error', `Страницы № <font color="deepskyblue">${args.page}</font> не существует`);
        return;
    }
    const pageBodyJSON = PAGE;
    const pageBody = JSON.parse(pageBodyJSON).text.replaceAll('\n', '<br/>');
    vnjs.state.data[ args['page-text'] ] = pageBody;

}


/**
 * PLAYER
 */

export function mcGetPlayerNBT (args){
    const { PLAYER } = vnjs.store.MINECRAFT;

    const playerData = PLAYER.data.player;
    const { playerEffects } = playerData;

    const commonData = {...playerData, ...playerEffects}
  
    for (let key in args) {
        let value = commonData[key];
        if(typeof value === 'number'){
            value = Math.floor(value);
        }
        vnjs.state.data[args[key]] = String(value);
        console.log(key, value)
    }
    
}