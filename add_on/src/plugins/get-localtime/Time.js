import controller from "./controller.js";

class Time {
    operators = [
        "===",
        "<",
        ">",
        ">=",
        "<=",
        "!==",
        "\\[\\]",
        "\\]\\[",
        //'default'
    ];
    dataValue = null;
    value = null;
    OPERATOR = null;
    equal = null;
    PLUGIN_DATA = null;
    constructor(mode) {
        this.mode = mode;
    }
    parse(data) {
        this.PLUGIN_DATA = data;
        /**
         * Пробегаемся по всем условиям
         */
        for (let equal in this.PLUGIN_DATA) {
            this.equal = equal;
            /**
             * Определяем какой оператор используется в пользовательских данных
             */

            for (let i = 0; i < this.operators.length; i++) {
                const operator = this.operators[i];
                const isOperator = new RegExp(operator).test(this.equal);

                if (isOperator) {
                    this.OPERATOR = operator;
                }
            }
            if (this.OPERATOR === null) {
                vnjs.emit("error", {
                    ru: `Некоректный оператор <font color="deepskyblue">${
                        this.equal
                    }</font><br>Допустимые операторы <font color="lightgreen">${this.operators
                        .join("  ")
                        .replaceAll("\\", "")}</font>`,
                    en: `Invalid operator <font color="deepskyblue">${
                        this.equal
                    }</font><br>ValidoOperators <font color="lightgreen">${this.operators
                        .join("  ")
                        .replaceAll("\\", "")}</font>`,
                });
                return;
            }
            if (this.OPERATOR.includes("\\")) {
                this.OPERATOR = this.OPERATOR.replaceAll("\\", "");
            }
            console.log(this.OPERATOR)
          
            const [ key, val ] = this.equal.split(this.OPERATOR);
            if(this.mode==='localdate'){
                this.dateEval(val)
            }
            if(this.mode==='localtime'){
                this.timeEval(val)
            }

        }
    }
    timeEval (val){
            /**
             * Определяем диапазон ли лежит в значении
             */
            if(val.includes('--')){
                this.value = val.split('--').map( (item) => {
                    return Number( item.replace('-', '').trim() )
                });
            }
            else{
                this.value = Number( val.trim().replace('-', '') );
            }
 
            const execData = this.PLUGIN_DATA[this.equal];
            controller[this.OPERATOR](this.localtime, this.value, execData)
    }
    get localtime (){
        const [ hh, mm ] = new Date().toTimeString().split(":");
        return  Number(hh+mm);
    }

    dateEval (val){
            if(val.trim() === 'EasterWeek'){
                /**
                 * Обрабатываем пасхальную неделю
                 */
                this.value = this.getEasterWeek();
            }
            else{
                     /**
                     * Определяем диапазон ли лежит в значении
                     */
                    if(val.includes('--')){
                        this.value = val.split('--').map( (item) => {
                            return this.transformDate( item.trim() );
                        });
                    }
                    else{
                        this.value = this.transformDate( val.trim() );
                    }
            }
 
            const execData = this.PLUGIN_DATA[this.equal];
            controller[this.OPERATOR](this.localdate, this.value, execData, this.mode);
    }
    get localdate (){
        return this.transformDate();
    }
    transformDate (date){
        let _date;
        if(date){
            _date = new Date(date);
        }
        else{
            _date = new Date();
        }
        return Math.ceil( _date.getTime() / 100000 );
    }
    getEasterWeek (){
        const years = [
            { year: "2022", range: [16507584, 16512768] }, // 2022-04-24 --> 2022-04-30
            { year: "2023", range: [16816032, 16821216] }, // 2023-04-16 --> 2023-04-22
            { year: "2024", range: [17148672, 17153856] }, // 2024-05-05 --> 2024-05-11
            { year: "2025", range: [17451072, 17456256] }, // 2025-04-20 --> 2025-04-26
        ];
        /**
         * получаю текущую дату в формате 2022.04.14
         */
        const currentYear = new Date(this.localdate*100000).toLocaleDateString();
        /**
         * Ищую соответсвие ключе year с годом в текущей дате
         */
        const _year = years.find( (date) => currentYear.includes(date.year) );
        return _year.range;
    }
}

export default Time;
