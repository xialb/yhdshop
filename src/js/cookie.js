function setCookie(key, val, ops={}){
    let p = ops.path? `;path=${ops.path}`: "";
    let e = "";
    if(ops.expires){
        let time = new Date();
        time.setTime(time.getTime() - 1000*60*60*8 + ops.expires);
        e = `;expires=${time}`;
    }
    document.cookie = `${key}=${val}${p}${e}`;
}

function removeCookie(key){
    setCookie(key, null, {expires: -1000});
}

function getCookie(key){
    let arr = document.cookie.split("; ");
    for(let i = 0; i < arr.length; i++){
        if(key == arr[i].split("=")[0]){
            return arr[i].split("=")[1];
        }
    }
    return "";
}