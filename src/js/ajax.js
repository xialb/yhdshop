function ajaxGet(url, cb, data={}){
    let str = "";
    for(let i in data){
        str += `${i}=${data[i]}&`;
    }
    str = str.substring(0, str.length-1);
    let d = new Date().getTime();
    url = `${url}?nowtime=${d}&${str}`;
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
            cb(xhr.responseText);
        }
    }
}

function ajaxPost(url, cb, data={}){
    let str = "";
    for(let i in data){
        str += `${i}=${data[i]}&`;
    }
    str = str.substring(0, str.length-1);
    let xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(str);
    xhr.onload = function(){
        if(xhr.status == 200){
            cb(xhr.responseText);
        }
    }
}

function ajaxGP({url, method, data, success, error}){
    data = data || {};
    method = method || "get";
    let str = "";
    for(let key in data){
        str += `${key}=${data[key]}&`;
    }
    str = str.substring(0, str.length - 1);
    if(method == "get"){
        let time = new Date().getTime();
        url = `${url}?nowtime=${time}&${str}`;
    }
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if(method == "post"){
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
    }else{
        xhr.send()
    }
    xhr.onload = function(){
        if(xhr.status == 200){
            success && success(xhr.responseText);
        }else{
            error && error(xhr.status);
        }
    }
}

function jsonp(url, cb, data={}){
    let str = "";
    for(let key in data){
        str += `${key}=${data[key]}&`;
    }
    str = str.substring(0, str.length - 1);
    let callbackName = "nowtime" + new Date().getTime() + Math.random().toString().substring(2);
    url = `${url}?callback=${callbackName}&${str}`;
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    window[callbackName] = function(res){
        cb(res);
        document.body.removeChild(script);
    }
}

function jsonp1(url, success, data){
    let str = "";
    for(let key in data){
        str += `${key}=${data[key]}&`;
    }
    str = str.substring(0, str.length - 1);
    let time = new Date().getTime();
    url = `${url}?nowtime=${time}&${str}`;
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    window[data[data.callbackName]] = function(res){
        success(res);
        script.remove();
    }
}