/**
 * Выполняет консольную команду в MineCraft
 */


function callback (data){
    vnjs.emit('vnjson.error', data)
}

export default function (param) {
    /**
     * .split('\n') .split(':') почему то не работает
     * или у меня крыша поехала
     */
    const arr = param.split(' ')

    const data = param.replace(arr[0], '')
    const plugins = { 
              'mc-exec': {
                  action: arr[0],
                  data,
                  type: 'server',
                  callback: callback.bind(this)
              } 
    }

    this.exec(plugins)

}