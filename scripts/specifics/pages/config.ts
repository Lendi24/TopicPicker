"use strict";
class PageConfig {
    static load() {
        /*
        let amountOfPpl    = document.getElementById('ppl')         as HTMLInputElement;
        let cooldownForPpl = document.getElementById('ppl-cool')    as HTMLInputElement;
        let cooldownForTop = document.getElementById('top-cool')    as HTMLInputElement;
        */
        let settings = Config.GeneratorSettings;
        let htmlElem = document.getElementById('container');
        htmlElem?.innerHTML = "";
        for (const key in settings) {
            htmlElem?.innerHTML += `
                <label for="${key}">${key}</label>
                <input  id="${key}" type="text" value=${settings[key]} onchange='Config.GeneratorSettings[${key}](this.value)'>
                <br>
            `;
            /*7
            let labelText  = document.createElement("label")
            let inputFeild = document.createElement("input")
            htmlElem?.appendChild(labelText)
            htmlElem?.appendChild(labelText)
            htmlElem?.appendChild(inputFeild)
            console.log(key);*/
        }

    }
    static unload() {
    }
}
