'use strict';

const rootElement = document.getElementById("spa-root");
const routerLoggingPrefix = "[SPA-Router]: 👉️ ";
const routes = {
    "#/":                { title: "UnSite - Welcome!",       html: "/html/auth/auth.html",              },
    "#/signin/":         { title: "UnSite - Welcome!",       html: "/html/auth/signin.html",            },
    "#/signup/":         { title: "UnSite - Welcome!",       html: "/html/auth/signup.html",            },
    "#/verification/":   { title: "UnSite - Verification",   html: "/html/tasks/!first.html",           },
    "#/mypage/":         { title: "UnSite - Home",           html: "/html/error/invalid-session.html",  },
};


let routeActive = {key: "#/", value: "#"};
let ignoreNextCall = 0;

function requestError() {
    if (window.location.hash == "") {
        window.location.hash = "#/";
    }

    else {
        return (
            "<h1>Error 404!</h1>"
        );    
    }
}

async function requestPage(path) {
    return new Promise(function(sendPromisedPage) {
        let xhttp = new XMLHttpRequest();
        xhttp.onload/*onreadystatechange*/ = function () {
            if (/*this.readyState === 4 &&*/ xhttp.status === 200) {
                sendPromisedPage(this.responseText);
            }
            else {
                console.log(routerLoggingPrefix+"(🔴) Could not find requested page on server \""+window.location.hash.slice(1)+"\"" + " on server or cache"); 
                sendPromisedPage(requestError);
            }
        };
    
        xhttp.open('GET', path, true);
        xhttp.send();    
    });
}

function applyPage(html) {
    rootElement.innerHTML = html;
}

function linkJS(source) {
    let script = document.createElement('script');
    script.src = source;
    
    document.head.appendChild(script);    
    console.log(script);
    script.remove();
}

async function router(routeNewObject) {
    if (routeNewObject) {
            document.title = routeNewObject.title;            

            await requestPage(routeNewObject.html).then( function(value) {
                applyPage(value);
                if (routeNewObject.js != null) {
                    //linkJS(routeNewObject.js);
                }
            })    

            console.log(routerLoggingPrefix+"(⚪) Requested page \""+window.location.hash.slice(1)+"\"");
    } else {
        console.log(routerLoggingPrefix+"(🔴) Could not find requested page \""+window.location.hash.slice(1)+"\""+ " in routes"); 
        applyPage(requestError());
        ignoreNextCall = 0;        
    }
}

checkUrlHash();
window.addEventListener('hashchange', function (e) {
    checkUrlHash();
});

function checkUrlHash() {
    if (ignoreNextCall <= 0) {
        router(routes[
            window.location.hash.length - 1 == window.location.hash.lastIndexOf('/') ?
            window.location.hash : window.location.hash + '/'
        ]);    
    } else ignoreNextCall--;
}