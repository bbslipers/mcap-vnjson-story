import Switch from './Switch.js'


export default function (){
    const _switch = new Switch(this)
    vnjs.on('switch',  (data) => _switch.parse(data))

}