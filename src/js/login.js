// 帮助中心下拉列表
class HelpList{
    constructor(){
        this.ele = document.querySelector(".register_header_right .header_help");
        this.list = document.querySelector(".header_help .help_list");
        this.init();
    }
    init(){
        var that = this;
        this.ele.onmouseover = function(){
            that.list.style.display = "block";
        }
        this.ele.onmouseout = function(){
            that.list.style.display = "none";
        }
    }
}
new HelpList();

// 记住密码
class Remember{
    constructor(){
        this.check = document.querySelector("#ipt_wrap .auto_login p:nth-child(1) a");
        this.tit = document.querySelector("#ipt_wrap .auto_login p:nth-child(1) span");
        this.init();
    }
    init(){
        var that = this;
        this.check.onmouseenter = function(){
            if(this.className.indexOf("check_click") == 0){
                return;
            }
            this.style.backgroundPositionY = -295 + "px";
        }
        this.check.onmouseleave = function(){
            if(this.className.indexOf("check_click") == 0){
                return;
            }
            this.style.backgroundPositionY = -265 + "px";
        }
        this.check.onclick = function(){
            $(this).toggleClass("check_click");
            if(that.check.className.indexOf("check_click") == 0){
                that.tit.style.display = "block";
            }else{
                that.tit.style.display = "none";
            }
        }
    }
}
new Remember();

// 三方网站登录弹出
class MoreLand{
    constructor(){
        this.btn = document.querySelector(".login_Cooperation .more_control");
        this.moreBox = document.querySelector(".login_Cooperation .more_list");
        this.init();
        this.flag = 0;
    }
    init(){
        var that = this;
        this.btn.onclick = function(){
            if(that.flag == 0){
                that.moreBox.style.display = "block";
                that.btn.style.backgroundPositionY = "10px";
                that.flag = 1;
            }else if(that.flag == 1){
                that.moreBox.style.display = "none";
                that.btn.style.backgroundPositionY = "-30px";
                that.flag = 0;
            }
        }
    }
}
new MoreLand();

// 登录服务弹出
class LoginServer{
    constructor(){
        this.control = document.getElementById("username");
        this.serverBox = document.querySelector("#ipt_wrap .auto_login p:nth-child(2)");
        this.init();
    }
    init(){
        var that = this;
        this.control.onblur = function(){
            if(this.value){
                $(that.serverBox).slideDown(500);
            }else{
                $(that.serverBox).slideUp(500);
            }
        }
    }
}
new LoginServer();

// 登录服务弹出
class CodeSwitch{
    constructor(){
        this.ipt = document.querySelector(".main_wrap .main_right .ipt_model")
        this.ewm = document.querySelector(".main_wrap .main_right .login_code")
        this.codeControl = document.querySelector(".codeswitch div");
        this.init();
        this.code = "ewm";
    }
    init(){
        var that = this;
        this.codeControl.onmouseenter = function(){
                this.style.backgroundPositionY = "-88px";
        }
        this.codeControl.onmouseleave = function(){
                this.style.backgroundPositionY = "0";
        }
        this.codeControl.onclick = function(){
            if(that.code == "ipt"){
                this.style.backgroundPositionX = "-88px";
                that.ewm.style.display = "none";
                that.ipt.style.display = "block";
                that.code = "ewm";
            }else if(that.code == "ewm"){
                this.style.backgroundPositionX = "0";
                that.ipt.style.display = "none";
                that.ewm.style.display = "block";
                that.code = "ipt";
            }
        }
    }
}
new CodeSwitch();

// 点击登录的验证
class LoginSend{
    constructor(){
        this.error = document.querySelector(".ipt_model .error_pic")
        this.loginBtn = document.getElementById("login_btn");
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.remPasswordBtn = document.querySelector(".auto_login p a:nth-of-type(1)");
        this.init();
    }
    init(){
        var that = this;
        this.loginBtn.onclick = function(){
            if(that.username.value&&that.password.value){
                // ajax请求
                ajaxPost("../lib/interface/login.php",function(data){
                    var data = JSON.parse(data);
                    if(data.code==0){
                        window.location.href = "index.html";
                        // 记住密码
                        that.remPassword();
                    }else if(data.code==1){
                        that.error.innerHTML = "用户名不存在";
                        $(that.error).show(200);
                    }else if(data.code==2){
                        that.error.innerHTML = "密码错误,请重试";
                        $(that.error).show(200);
                    }else{
                        that.error.innerHTML = "登录失败,请重试";
                        $(that.error).show(200);
                    }
                },{
                    username:that.username.value,
                    password:that.password.value
                })

            }else if(!that.username.value){
                that.errorToast("username");
            }else if(!that.password.value){
                that.errorToast("password");
            }else if(!that.username.value&&!that.password.value){
                that.errorToast("up")
            }
        }
        this.username.onfocus = function(){
            this.parentElement.style.borderColor = "#dedede";
        }
        this.password.onfocus = function(){
            this.parentElement.style.borderColor = "#dedede";
        }
    }
    remPassword(){
        if(this.remPasswordBtn.className.indexOf("check_click")!=-1){
            setCookie("username", this.username.value,{
                expires:60*60*24*7*1000
            })
        }else{
            removeCookie("username");
            setCookie("username", this.username.value)
        }
    }
    errorToast(type){
        if(type=="up"){
            this.error.innerHTML = "请完成账号和密码的输入";
            $(this.error).show(200);
        }else if(type=="username"){
            this.error.innerHTML = "请输入您的账号名";
            $(this.error).show(200);
            this.username.parentElement.style.borderColor = "red";
        }else if(type=="password"){
            this.error.innerHTML = "请完成密码的输入";
            $(this.error).show(200);
            this.password.parentElement.style.borderColor = "red";
        }
    }
}
new LoginSend();

// 获取注册跳转成功用户名
class Setusername{
    constructor(){
        this.username = document.getElementById("username");
        this.bar = document.querySelector(".login_service_strip")
        this.init();
    }
    init(){
        var data = window.location.href.split("?")[1];
        if(data){
            data = data.split("&");
            for(var i = 0; i < data.length; i++){
                if(data[i].split("=")[0]=="username"){
                    this.username.value = decodeURIComponent(data[i].split("=")[1]);
                    $(this.bar).slideDown(500);
                }
            }
        }
    }
}
new Setusername();