const path = require('path');
const yaml  = require('yaml');
const fs = require('fs-extra');
const request = require('request');
const color = require('ansi-colors');
const extract_zip = require('extract-zip');

var config = {};
try {
    config = yaml.parse(fs.readFileSync(path.join(process.cwd(), 'config.yaml'),'utf8'));
} catch (err) {
    console.log('Ошибка: Файл config.yaml не существует или имеет неверный формат');
    return;
}

var zip_url = null;
if (typeof config.updateSrc !== "undefined") {
    if (typeof config.updateSrc.url !== "undefined") {
        zip_url = config.updateSrc.url;
    }    
}
if (zip_url === null) {
    console.log('Ошибка: Не задан параметр updateSrc.url');
    return;    
}

var unzip_dir = null;
if (typeof config.updateSrc !== "undefined") {
    if (typeof config.updateSrc.url !== "undefined") {
        unzip_dir = path.join(process.cwd(), config.updateSrc.dir)
    }    
}
if (unzip_dir === null) {
    console.log('Ошибка: Не задан параметр updateSrc.dir');
    return;    
}

var zip_path = path.join(process.cwd(), "vnjson.zip");

async function get_zip (){
    return new Promise( (resolve, reject) => {
        request(zip_url)
            .pipe( fs.createWriteStream(zip_path) )
            .on('close',  async (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            });
    });
}

async function init (name){
    console.log('Загрузка: ' + color.yellow(zip_url));     
    const new_dir = path.join(process.cwd(), "src_" + name);        
    try{
        await fs.remove(zip_path);
        await fs.remove(unzip_dir);       
        
        await get_zip();        
        await extract_zip(zip_path, { dir: process.cwd() });
        await fs.copy(path.join(unzip_dir, "src"), new_dir);

        await fs.remove(zip_path);
        await fs.remove(unzip_dir);

        let update_dir = process.cwd();
        
        await fs.copy(path.join(unzip_dir, "package.json"), path.join(update_dir, "package.json"));
        await fs.copy(path.join(unzip_dir, "package-lock.json"), path.join(update_dir, "package-lock.json"));

        await fs.copy(path.join(unzip_dir, "vnjson.init.js"), path.join(update_dir, "vnjson.init.js"));    
        await fs.copy(path.join(unzip_dir, "vnjson.update.js"), path.join(update_dir, "vnjson.update.js"));
        await fs.copy(path.join(unzip_dir, "rollup.config.js"), path.join(update_dir, "rollup.config.js"));

    }catch(err){
        return;
    }
}

init(process.argv[2]);