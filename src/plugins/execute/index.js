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
            })
        }
   })
}