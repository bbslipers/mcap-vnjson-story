import "./style.css";

function replaceDataTemplate(reply) {
    let _newReply = reply;
    const variables = reply.match(/{{.+?}}/g);
    if(!variables) return  _newReply
    variables.forEach( (varItem) => {
        const dataKey = varItem.replaceAll('{{', '').replaceAll('}}', '').trim();
        _newReply = _newReply.replaceAll(varItem, vnjs.state.data[dataKey]||'');
    })
    return `<span> ${_newReply} </span>`;
}

export default function (){
    const $table = $('<div class="vnjson__table component"></div>')
    vnjs.store.screen.append($table)
    let _tableData = null
    $table.on('click', '.table__cell', function(){
        const indexRow = $(this).data('row');
        const indexCell = $(this).data('cell');

        const cellType = $(this).data('type');
        const cell = _tableData[indexRow].row[indexCell][cellType];
        if(cell.onClick){
            vnjs.exec(cell.onClick);
        }
    })
    vnjs.on('table', tableData => {
        _tableData = tableData;
        if(tableData){
            $table.html('');
            $table.css('display', 'flex');
            let border = tableData.filter(item => item.hasOwnProperty('border'))[0];
            let rows = tableData.filter(item => item.hasOwnProperty('row'));
            rows.map( (item, indexRow) => {
                let $row = $(`<div class="table-row"></div>`);
                let height = 30;
                item.row.map( (cell, indexCell) => {
                    let TYPE = null;
                    let $cell = null;
                    
                    // HEIGHT
                    if(cell.hasOwnProperty('height') ){
                        height = cell.height;
                    }

                    // IMAGE
                    if(cell.hasOwnProperty('image') ){
                        TYPE = 'image';
                        $cell = $(`<div class="table__img-wrapper"><img class="table__cell" style="width: ${cell.image.width}px" data-row="${indexRow}" data-cell="${indexCell}" data-type="${TYPE}" src="${vnjs.getAssetByName(cell.image.name).url}"/></div>`);
  
                        if(cell.image.hasOwnProperty('onClick')){
                            $cell.css('cursor', 'pointer');
                        }else{
                            $cell.css('cursor', 'unset');
                        }

                        if(cell.image['bg-color']){
                            $cell.css('background-color', cell.image['bg-color']);
                        }                      
                    }

                    // TEXT
                    if(cell.hasOwnProperty('text') ){
                        TYPE = 'text';
                        let text = null;
                        text = replaceDataTemplate(cell.text.content);
                        $cell = $(`<span class="table__cell table__cell-text" data-row="${indexRow}" data-cell="${indexCell}" data-type="${TYPE}" >${text}</span>`);
                        $cell.css({
                            width: cell.text.width +'px',
                            'font-size': cell.text.size+'px',
                            'line-height': (cell.text.size+4)+'px'
                        })

                        if(cell.text.hasOwnProperty('onClick')){
                            $cell.css('cursor', 'pointer');
                        }else{
                            $cell.css('cursor', 'unset');
                        }

                        if(cell.text['bg-color']){
                            $cell.css('background-color', cell.text['bg-color']);
                        }

                        if(cell.text['fg-color']){
                            $cell.css('color', cell.text['fg-color']);
                        }                      


                        //ALIGN
                        if(cell.text['h-align']){
                            switch(cell.text['h-align']){
                                case 'left':
                                    $cell.css('justify-content', 'flex-start');
                                    break;
                                case 'center':
                                    $cell.css('justify-content', 'center');
                                    break;
                                case 'right':
                                    $cell.css('justify-content', 'flex-end');
                                    break;
                            }
                        }

                        if(cell.text['v-align']){
                            switch(cell.text['v-align']){
                                case 'top':
                                    $cell.css('align-items', 'flex-start');
                                    break;
                                case 'center':
                                    $cell.css('align-items', 'center');
                                    break;
                                case 'bottom':
                                    $cell.css('align-items', 'flex-end');
                                    break;
                        }
                    }
                }

                $row.append($cell)
                
                //BORDER
                if(!cell[TYPE]) return
                if(cell[TYPE]?.border===true){
                    $cell.css('border-color', 'grey');
                }
                else if(typeof cell[TYPE]?.border==='string'){
                    $cell.css('border-color', cell[TYPE].border);
                }else{
                    $cell.css('border-color', 'transparent');
                }                           
            })

            $row.css('height', height);
            $table.append($row);
        })}else{
            $table.html('');
            $table.hide();
        }
    })
}