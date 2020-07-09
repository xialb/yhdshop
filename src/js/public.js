// 10进制及16进制单个数补零
function createZero(n) {
    if(n.length < 2){
        return n = "0" + n;
    }
    if(n < 10){
        return n = "0" + n;
    }
    return n;
}

//随机产生一个范围随机数
function randomNum(min, max) {
    if(min > max) {
        var ls = min;
        min = max;
        max = ls;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机产生一个颜色(#000000模式)
function randomColor(){
    var rgb = "#";
    for(var i = 0; i < 3; i++) {
        var n = Math.floor(Math.random() * 256).toString(16);
        if(n.length < 2){
            n = "0" + n;
        }
        rgb += n;
    }
    return rgb;
}

// 随机产生一个颜色(rgb(255, 255, 255)模式)
function randomColorRgb(){
    return rgb = "rgb(" + Math.floor(Math.random() * 256) + ", "+ Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}

// 获取当前日期并格式化
function createDate() {
    var d = new Date();
    var yeah = d.getFullYear();
    var month = d.getMonth();
    var myDate = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var milliS = d.getMilliseconds();
    var day = d.getDay();
    switch(day) {
        case 0: day = "日"; break;
        case 1: day = "一"; break;
        case 2: day = "二"; break;
        case 3: day = "三"; break;
        case 4: day = "四"; break;
        case 5: day = "五"; break;
        case 6: day = "六"; break;
    }
    return {
        yeah: yeah,
        month: month + 1,
        date: createZero(myDate),
        hours: createZero(hours),
        minutes: createZero(minutes),
        seconds: createZero(seconds),
        milliS: milliS,
        day: day,
    } 
}

// 两个日期的时间戳之差并格式化为天，时，分，秒,毫秒
function timeDif(time1, time2) {
    var t1 = new Date(time1);
    var t2 = time2?new Date(time2): new Date();
    var t = Math.abs(t2.getTime() - t1.getTime());
    var day = parseInt(t / 1000 / 60 / 60 / 24);
    var hours = parseInt(t / 1000 / 60 / 60 % 24);
    var minutes = parseInt(t / 1000 / 60 % 60);
    var seconds = parseInt(t / 1000 % 60);
    var milliS = parseInt(t % 1000);
    return {
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliS: milliS,
    }
}

// 不影响原数组的情况下，获取数组中的最大值
function arrMaxnum(arr) {
    return arr.slice(0).sort(function(a, b) {return b - a;})[0];
}

// 不影响原数组的情况下，获取数组中的最小值
function arrMinnum(arr) {
    return arr.slice(0).sort(function(a, b) {return a - b;})[0];
}

// 数组去重
function arrNoRepeat(arr) {
    var newArr = arr.filter(function(val, idx, self) {
        return self.indexOf(val) === idx;
    });
    return newArr;
}

// 随机验证码，可传参指定几位验证码，不输入默认4位
function randomCode(n) {
    n = n || 4;
    var str = "";
    for(var i = 0; i < n; i++) {
        str += randomNum(0, 9);
        str += String.fromCharCode(randomNum(97, 122));
        str += String.fromCharCode(randomNum(65, 90));
    }
    var code = "";
    for(var j = 0; j < n; j++) {
        var idx = randomNum(0, str.length - 1);
        code += str[idx];
    }
    return code;
}

// 样式获取(兼容IE8以下)
function getStyle(ele, attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}

// 阻止事件冒泡
function stopBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

// 阻止默认行为
function stopDefault(e) {
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}

// 绑定事件
function addEvent(ele, type, fn){
    if(ele.addEventListener){
        ele.addEventListener(type, fn);
    }else if(ele.attachEvent){
        ele.attachEvent("on" + type, fn);
    }else{
        ele["on" + event] = fn;
    }
}

// 删除绑定事件
function removeEvent(ele, type, fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type, fn, false);
    }else{
        detachEvent("on"+ type, fn);
    }
}