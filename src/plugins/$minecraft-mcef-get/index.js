function query (request){
   return new Promise((resolve, reject)=>{
      try {
         window.mcefQuery({
            request,
            persistent: true,
            onSuccess: (response) => {
               resolve( JSON.parse(response) );
            },
            onFailure: (errCode, errMsg) => {
               reject( JSON.parse(errMsg) )
            }
         })
      } catch (err) {
         reject(JSON.parse(err));
      } 
   })
}

function getTime (){
   return Math.floor( new Date().getTime() / 1000 )
}

export default function (){
   vnjs.on('mc-check',(data)=>{
      if(window.mcefQuery){
         this.exec(data.true)
      }else{
         this.exec(data.false)
      } 
   })

   vnjs.on('mc-exec', param => {
      const data = {
        "data": vnjs.plugins.data.stringToData(param.data),
        "action": param.action,
        "uuid": vnjs.state.data.player.uuid,
        "type": param.type,
        "dts": getTime(),
        "ars": true,
        "player": vnjs.state.data.player.name
      }

      const str = `CMD_${JSON.stringify(data)}`;
      query(str)
         .then(res => { 
            const data = JSON.stringify(res, null, 2) 
         })
         .catch(err => { 
            const data = JSON.stringify(err, null, 2) 
            if(param.callback){    
               param.callback(data) 
            }
         })
  })
}
