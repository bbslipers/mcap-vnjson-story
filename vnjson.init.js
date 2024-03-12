const path = require('path');
const yaml  = require('yaml');
const fs = require('fs-extra');
const request = require('request');
const color = require('ansi-colors');
const extract_zip = require('extract-zip');

let config = {}
try {
    config = yaml.parse(fs.readFileSync(path.join(process.cwd(), 'config.yaml'),'utf8'));
} catch (err) {
    console.log('Ошибка: Файл config.yaml не существует или имеет неверный формат');
    return;
}
if (typeof config.updateSrc === "undefined") {
    console.log('Ошибка: Не задан параметр updateSrc');    
    return;
}
if (typeof config.updateSrc.url === "undefined") {
    console.log('Ошибка: Не задан параметр updateSrc.url');
    return;
}
if (typeof config.updateSrc.dir === "undefined") {
    console.log('Ошибка: Не задан параметр updateSrc.dir');
    return;
} 

const zip_url = config.updateSrc.url;
const zip_path = path.join(process.cwd(), "vnjson.zip");
const unzip_dir = path.join(process.cwd(), config.updateSrc.dir);

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
    const update_dir = process.cwd();    
    const new_dir = path.join(process.cwd(), "src_" + name);

    console.log('zip_url:    ' + color.yellow(zip_url));    
    console.log('new_dir:    ' + color.yellow(new_dir));    
    console.log('zip_path:   ' + color.yellow(zip_path));
    console.log('unzip_dir:  ' + color.yellow(unzip_dir));
    console.log('update_dir: ' + color.yellow(update_dir));    
        
    try{
        await fs.remove(zip_path);
        await fs.remove(unzip_dir);       
        
        await get_zip();        
        await extract_zip(zip_path, { dir: process.cwd() });
        await fs.remove(zip_path);

        await fs.copy(path.join(unzip_dir, "src"), new_dir);

        await fs.copy(path.join(unzip_dir, "package.json"), path.join(update_dir, "package.json"));
        await fs.copy(path.join(unzip_dir, "rollup.config.js"), path.join(update_dir, "rollup.config.js"));
        await fs.copy(path.join(unzip_dir, "package-lock.json"), path.join(update_dir, "package-lock.json"));

        await fs.copy(path.join(unzip_dir, "vnjson.init.js"), path.join(update_dir, "vnjson.init.js"));    
        await fs.copy(path.join(unzip_dir, "vnjson.update.js"), path.join(update_dir, "vnjson.update.js"));

        await fs.remove(unzip_dir);
    }catch(err){
        console.log(err);        
        return;
    }
}

init(process.argv[2]);