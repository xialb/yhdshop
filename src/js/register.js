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

// main背景轮播
class BgSwitch{
    constructor(){
        this.iconBox = document.querySelector("#register_main .bg_box").children;
        this.index = 0;
        this.init();
    }
    init(){
        var that = this;
        clearInterval(this.timer)
        this.timer = setInterval(function(){
            animate(that.iconBox[that.index], {"opacity": 0});
            that.index++;
            if(that.index==that.iconBox.length){that.index = 0}
            animate(that.iconBox[that.index], {"opacity": 50});
        }, 4000)
    }
}
new BgSwitch();

// 注册输入动画
class RegisterMove{
    constructor(){
        this.warningArr = document.querySelectorAll(".register_form .ipt_list li .ipt_warning_box");
        this.aLi = document.querySelectorAll(".register_form .ipt_list li .ipt");
        this.aTit = document.querySelectorAll(".ipt_list li .ipt .tit");
        this.init();
    }
    init(){

        var that = this;
        for(let i = 0; i < this.aLi.length; i++){
            this.aLi[i].onclick = function(){
                that.titMove(i);
                that.warningB(i);
            }
        }
    }
    warningB(i){
        // this.warningArr[i].style.display = "block";
        $(this.warningArr[i]).slideDown(400);
    }
    titMove(i){
        animate(this.aTit[i], {left: -(this.aTit[i].offsetWidth + 20)});
    }
}
new RegisterMove();

// 正则验证
class RegularTest{
    constructor(){
        this.username = document.getElementById("username");
        this.tel = document.getElementById("tel");
        this.password = document.getElementById("password");
        this.repassword = document.getElementById("repassword");
        this.grade = document.querySelector(".ipt_grade em");
        this.grade_cor = document.querySelectorAll(".ipt_grade span");
        this.registerBtn = document.getElementById("register_btn");
        this.toast = document.getElementById("toast");
        this.flag = true;
        this.init();
    }
    init(){
        var that = this;
        this.username.onblur = function(){
            that.usernameTest();
        }
        this.tel.onblur = function(){
            that.telTest();
        }
        this.password.oninput = function(){
            that.passwordTest();
        }
        this.repassword.onblur = function(){
            that.repasswordTest();
        }
        this.registerBtn.onclick = function(){
            that.registerSend();
        }
    }
    registerSend(){
        var that = this;
        if(!this.flag){
            $(this.toast).fadeIn(200);
            return;
        }
        if(this.username.value&&this.password.value&&this.repassword.value&&this.tel.value){
            $(this.toast).fadeOut(200);
            // 验证成功请求数据库
            ajaxPost("../lib/interface/register.php", function(data){
                var data = JSON.parse(data);
                if(data.code==1){
                    that.toast.innerHTML = "手机号码已被注册";
                    $(that.toast).fadeIn(200);
                }else if(data.code==2){
                    that.toast.innerHTML = "用户名已被使用";
                    $(that.toast).fadeIn(200);
                }else if(data.code==3){
                    that.toast.innerHTML = "请重新尝试";
                    $(that.toast).fadeIn(200);
                }else if(data.code==0){
                    that.toast.innerHTML = "注册成功，三秒后自动跳转至登录";
                    $(that.toast).fadeIn(200);
                    var url =  "login.html?username="+that.username.value;
                    setTimeout(function(){
                        window.location.href = url;
                        that.username.value = that.tel.value = that.password.value = that.repassword.value = that.grade.value = "";
                    },3000)
                }
            }, {
                username: this.username.value,
                password: this.password.value,
                tel: this.tel.value
            })
        }else{
            $(this.toast).fadeIn(200);
        }
    }
    usernameTest(){
        var str = this.username.value;
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]{4,20}$/;
        if(reg.test(str)){
            this.TestAnimate(this.username, "b");
            this.flag = true;
        }else{
            this.TestAnimate(this.username, "n");
            this.flag = false;
        }
    }
    telTest(){
        var str = this.tel.value;
        var reg = /^1[3456789]\d{9}$/;
        if(reg.test(str)){
            this.TestAnimate(this.tel, "b");
            this.flag = true;
        }else{
            this.TestAnimate(this.tel, "n");
            this.flag = false;
        }
    }
    passwordTest(){
        var str = this.password.value;
        var reg = /^[a-zA-Z0-9_]{6,20}$/;
        if(reg.test(str)){
            this.flag = true;
            this.TestAnimate(this.password, "b");
            var a=0;
            var b=0;
            var c=0;
            var d=0;
            // 是否存在数字
            var numReg = /\d/;
            if(numReg.test(str)){
                a=1;
            }
            // 是否存在小写字母
            var azReg = /[a-z]/;
            if(azReg.test(str)){
                b=1;
            }
            // 是否存在大写字母
            var azReg = /[A-Z]/;
            if(azReg.test(str)){
                c=1;
            }
            // 是否存在下划线
            var tsReg = /_/;
            if(tsReg.test(str)){
                d=1;
            }
            switch(a+b+c+d){
                case 1:
                    this.grade_cor[0].style.background = "#fa592e";
                    this.grade.innerHTML = "低";break;
                    case 2:
                    this.grade_cor[0].style.background = "#f6ba52";
                    this.grade_cor[1].style.background = "#f6ba52";
                    this.grade.innerHTML = "中";break;
                case 3:
                    this.grade_cor[0].style.background = "#78ce2e";
                    this.grade_cor[1].style.background = "#78ce2e";
                    this.grade_cor[2].style.background = "#78ce2e";
                    this.grade.innerHTML = "高";break;
            }
        }else{
            for(var i = 0; i < this.grade_cor.length; i++){
                this.grade_cor[i].style.background = "#fff";
            }
            this.TestAnimate(this.password, "n");
            this.flag = false;
        }
    }
    repasswordTest(){
        var password = this.password.value;
        var repassword = this.repassword.value;
        if(password == repassword){
            this.TestAnimate(this.repassword, "b");
            this.flag = true;
        }else{
            this.TestAnimate(this.repassword, "n");
            this.flag = false;
        }
    }
    TestAnimate(ele, bn){
        if(bn=="b"){
            $(this.toast).fadeOut(200);
            ele.parentElement.nextElementSibling.style.background = "none";
            ele.parentElement.nextElementSibling.lastElementChild.style.opacity = "0";
            animate(ele.parentElement.nextElementSibling.firstElementChild, {opacity: 100})
        }else if(bn=="n"){
            ele.parentElement.nextElementSibling.style.background = "#E4E4E4";
            ele.parentElement.nextElementSibling.lastElementChild.style.opacity = "1";
            ele.parentElement.nextElementSibling.firstElementChild.style.opacity = "0";
        }
    }
}
new RegularTest();