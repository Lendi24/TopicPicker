"use strict";
class SpaRouter {
    static getUrlArgs() {
        let urlArgs = {};
        let urlArgsRaw = decodeURIComponent(window.location.hash).split("--");
        urlArgsRaw.shift();
        urlArgsRaw.forEach(urlArgRaw => {
            urlArgs[urlArgRaw.split('.')[0]] = urlArgRaw.split('.')[1];
        });
        return urlArgs;
    }
    static setUrlArgs(urlArgs, beginWith) {
        let newHash = beginWith;
        for (const key in urlArgs) {
            newHash += `--${key}.${urlArgs[key]}`;
        }
        SpaRouter.ignoreNextCall++;
        window.location.hash = newHash;
        return newHash;
    }
    static router(routeNewObject) {
        if (routeNewObject) {
            if (this.routeActive.value !== routeNewObject) {
                this.routeActive = { key: window.location.hash, value: routeNewObject };
                document.title = routeNewObject.title;
                //console.log(route);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        document.getElementById(Config.SPA.rootElement).innerHTML = this.responseText;
                        if (routeNewObject.func != null)
                            routeNewObject.func.call();
                    }
                };
                //document.getElementById("slide-root").remove();
                xhttp.open('GET', routeNewObject.html, true);
                xhttp.onerror = function () { console.log(Config.SPA.routerLoggingPrefix + "(🔴) Could not find requested page \"" + window.location.hash.slice(1) + "\"" + " on server or cache"); };
                xhttp.send();
                console.log(Config.SPA.routerLoggingPrefix + "(⚪) Requested page \"" + window.location.hash.slice(1) + "\"");
            }
            else if (window.location.hash.getUrlArgs != this.currentArgs) {
                if (routeNewObject.func != null)
                    routeNewObject.func.call();
            }
            else
                console.log(Config.SPA.routerLoggingPrefix + "(🟠) Ignoring redundant page-switch to \"" + window.location.hash.slice(1) + "\"");
        }
        else {
            console.log(Config.SPA.routerLoggingPrefix + "(🔴) Could not find requested page \"" + window.location.hash.slice(1) + "\"" + " in routes");
            this.ignoreNextCall = 0;
            window.location.hash = this.routeActive.key;
        }
    }
    static checkUrlHash() {
        //SpaRouter.currentArgs = SpaRouter.getUrlArgs();
        if (this.ignoreNextCall <= 0) {
            let hash = decodeURIComponent(window.location.hash).split("--")[0];
            if (hash == "#/" || hash == "") {
                window.location.hash = "#/home";
            }
            else if (hash.slice(-1) == "/") {
                window.location.hash = hash.slice(0, -1);
            }
            else
                this.router(Config.SPA.routes[hash]);
        }
        else {
            this.ignoreNextCall--;
        }
        ;
        this.currentArgs = this.getUrlArgs();
    }
}
SpaRouter.routeActive = { key: "#/home", value: "#" };
SpaRouter.currentArgs = {};
SpaRouter.ignoreNextCall = 0;
SpaRouter.checkUrlHash();
window.addEventListener('hashchange', function (e) {
    SpaRouter.checkUrlHash();
});
