function getCookie(key){
    let arr = document.cookie.split("; ");
    for(let i = 0; i < arr.length; i++){
        if(key == arr[i].split("=")[0]){
            return arr[i].split("=")[1];
        }
    }
    return "";
}
class IsLogin{
    constructor(){
        this.init();
    }
    init(){
        if(!getCookie("username")){
            window.location.href = "login.html";
        }
    }
}
new IsLogin();