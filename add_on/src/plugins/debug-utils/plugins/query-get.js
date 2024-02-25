// Команда отладчика cmd-mc-get
// Выводит на экран результат запроса

function callback (res) {
	const outputType = vnjs.store.MINECRAFT.TYPE;
	const outputData = JSON.stringify(vnjs.store.MINECRAFT[outputType], null, 2);
    vnjs.emit('vnjson.info', outputData);
}

export default function (param) {
    param.callback = callback.bind(this);
    const plugins = {
		'mc-get': param 
    };
    this.exec(plugins);
}