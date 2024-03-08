import "./style.css"

export default function (){}
let $tpl;
const prefix = 'zimjs-';
const actions = {
    create (args){
 
  
        /**
         * Проверяю сюществует ли элемент с таким индификатором
         * если существует, то удаляю его и создаю занаво
         */
 
        if($('*').is('#'+prefix+args.id)) {
     
            $('#'+prefix+args.id).remove();
        }
        
        $tpl = $(`<div id="${prefix}${args.id}" class="${prefix}player"></div>`);
        vnjs.store.screen.append($tpl);

        if(args.css){
            args.css.width = args.css.width || 300
            args.css.height = args.css.height || 300
            $tpl.css(args.css)
        }
        createIFrame(args.id, args.css.width, args.css.height, $tpl)
    },
    hide (){
        $tpl.hide()
    },
    show (){
        $tpl.show()
    },
    delete (){

            $tpl.remove();
       
    }
}



vnjs.on("zimjs", (args) => {
    if(typeof args === 'object'){
        actions[args.action](args)
    }
})



function createIFrame(id, w, h, $parent){
    const iframe = document.createElement('iframe');
    iframe.width = w;
    iframe.height = h;
    iframe.style = "border: none; position: absolute; top: 0px; left: 0px;";
    iframe.srcdoc = `
        <!DOCTYPE>
        <html>
            <head>
                <title></title>
                <style>
                    html, body{
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }
                </style>
                <meta charset="utf-8">
                <script src="lib/zimjs/createjs.js"></script>
                <script src="lib/zimjs/zim.js"></script>
                <script src="lib/zimjs/pizzazz_01.js"></script>
		            <script src="lib/zimjs/pizzazz_02.js"></script>
		            <script src="lib/zimjs/pizzazz_03.js"></script>
            </head>
            <body>
                <div id="${id}" style="width: ${w}px; height:${h}px;"></div>
                <script src="data/zimjs/${id}.js"></script>
            </body>
        </html>
    `;
    $parent.append(iframe);
}