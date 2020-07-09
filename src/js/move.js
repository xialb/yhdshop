function animate(ele, obj, cb){
    clearInterval(ele.timer);
    ele.timer = setInterval(function(){
        var flag = true;
        for(var attr in obj){
            var current;
            if(attr == "opacity"){
                current = parseInt(getStyle(ele, attr) * 100);
            }else if(attr == "zIndex"){
                ele.style[attr] = current = obj[attr];
            }else{
                current = parseInt(getStyle(ele, attr));
            }
            var speed = obj[attr] > current? Math.ceil((obj[attr] - current)/10): Math.floor((obj[attr] - current)/10)
            if(attr == "opacity"){
                ele.style[attr] = (current + speed)/100;
                ele.style.filter = "alpha(opacity = "+ (current + speed) +")";
            }else if(attr != "zIndex"){
                ele.style[attr] = current + speed + "px";
            }
            if(current != obj[attr])flag = false;
        }
        if(flag){
            clearInterval(ele.timer);
            cb && cb();
        }
    }, 30)
}