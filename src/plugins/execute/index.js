export default function (){
 
   vnjs.on('execute', (data) => {
 
        if(Array.isArray(data)){

            data.forEach(plugin => {
                let key = null
                let value = null
                for(let _key in plugin){
                    key = _key
                    value = plugin[key]
                }
                if(key!=='execute'){
                    this.exec(plugin)
                }
                else{
                    vnjs.emit('error', {
                        ru: 'Нельзя использовать вложенный <font color="deepskyblue">execute</font> внутри <font color="deepskyblue">execute</font>',
                        en: 'Сan not use <font color="deepskyblue">execute</font> into <font color="deepskyblue">execute</font>'
                    })
                }
            })
        }
        else{
            vnjs.emit('error', {
                ru: 'Плагин  <font color="deepskyblue">execute</font> принимает в качестве аргумента, только список плагинов',
                en: 'Plugin <font color="deepskyblue">execute</font> takes as an argument, only a list of plugins'
            })
        }
   })
}