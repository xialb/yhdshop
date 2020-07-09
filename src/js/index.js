// 轮播图
class Banner{
    constructor(){
        this.show = document.querySelector(".banner_show");
        this.imgboxArr = document.querySelectorAll(".banner_show a");
        this.btnArr = document.querySelectorAll(".banner_btn a");
        this.index = 0;
        this.display();
        this.init();
    }
    display(){
        for(var i = 0; i < this.imgboxArr.length; i++){
            this.imgboxArr[i].children[0].style.marginLeft = (this.show.offsetWidth - this.imgboxArr[i].children[0].offsetWidth)/2 + "px";
            this.imgboxArr[i].style.left = this.show.offsetWidth + "px";
        }
        this.imgboxArr[0].style.left = "0";
    }
    init(){
        var that = this;
        for(var i = 0; i < this.btnArr.length; i++){
            this.btnArr[i].num = i;
            this.btnArr[i].onclick = function(){
                that.btnClick(this.num);
            }
        }
        this.autoPlay();
        this.show.parentElement.onmousemove = function(){
            clearInterval(that.timer);
        }
        this.show.parentElement.onmouseout = function(){
            clearInterval(that.timer)
            that.autoPlay();
        }
        
    }
    autoPlay(){
        var that = this;
        this.timer = setInterval(function(){
            that.index++;
            if(that.index==that.imgboxArr.length){
                that.index = 0;
            }
            that.btnMove();
            that.imgMoveAuto(that.index);
        }, 3000)
    }
    btnClick(i){
        var idx = this.index;
        if(i>idx){
            this.imgboxArr[i].style.left = this.show.offsetWidth + "px";
        }else if(i<idx){
            this.imgboxArr[i].style.left = -this.show.offsetWidth + "px";
        }
        this.index = i;
        this.btnMove();
        this.imgMoveSet(idx);
    }
    btnMove(){
        for(var i = 0; i < this.btnArr.length; i++){
            this.btnArr[i].className = "";
        }
        this.btnArr[this.index].className = "current";
    }
    imgMoveSet(current){
        if(this.index>current){
            animate(this.imgboxArr[current], {left: -this.show.offsetWidth})
        }else{
            animate(this.imgboxArr[current], {left: this.show.offsetWidth})
        }
        animate(this.imgboxArr[this.index], {left: 0})
    }
    imgMoveAuto(current){
        this.imgboxArr[current].style.left = this.show.offsetWidth + "px";
        var prev = current - 1;
        if(prev == -1){
            prev = this.imgboxArr.length - 1;
        }
        animate(this.imgboxArr[prev], {left: -this.show.offsetWidth})
        animate(this.imgboxArr[current], {left: 0})
    }
}
new Banner();

// 秒杀倒计时
class CountDown{
    constructor(){
        this.djs = 7200;
        this.hour = document.querySelector(".countdown_time .time_hour");
        this.minute = document.querySelector(".countdown_time .time_minute");
        this.second = document.querySelector(".countdown_time .time_second");
        this.init();
    }
    init(){
        var that = this;
        this.timer = setInterval(function(){
            that.djs--;
            that.setTime();
        }, 1000)
    }
    setTime(){
        var hour = parseInt(this.djs/60/60);
        if(hour.toString().length<=1){
            hour = "0" + hour;
        }
        this.hour.innerHTML = hour;
        var minute = parseInt(this.djs/60%60);
        if(minute.toString().length<=1){
            minute = "0" + minute;
        }
        this.minute.innerHTML = minute;
        var second = parseInt(this.djs%60);
        if(second.toString().length<=1){
            second = "0" + second;
        }
        this.second.innerHTML = second;
        
    }
}
new CountDown();

// seckill图片渲染
class SeckillRender{
    constructor(){
        this.url = "../lib/json/seckill.json"
        this.box = document.querySelector("#seckill .seckill_cont");
        this.init();
    }
    init(){
        var that = this;
        ajaxGet(this.url,
            function(data){
                var data = JSON.parse(data);
                for(var i = 0; i < data.length; i++){
                    var li = document.createElement("li");
                    li.className = "seckill_goods";
                    var sold = (data[i].sold/data[i].stock)*100 + "%";
                    var str = `<a href="javascript:;">
                                    <img src="${data[i].img}" alt="">
                                    <h3>${data[i].name}</h3>
                                    <span><i style="width:${sold};"></i></span>
                                    <h5>￥<em>${data[i].price}</em></h5>
                                </a>`;
                    li.innerHTML = str;
                    that.box.appendChild(li);
                }

            }
        )
    }
}
new SeckillRender();

// paihangbang切换
class ChangeList{
    constructor(father){
        this.imgbox = document.querySelector(""+father+" .ranking_list .list_box ");
        this.btnL = document.querySelector(""+father+" .ranking_list .list_btn_l");
        this.btnR = document.querySelector(""+father+" .ranking_list .list_btn_r");
        this.init();
    }
    init(){
        var that = this;
        this.btnL.onclick = function(){
            animate(that.imgbox, {left: 40})
        }
        this.btnR.onclick = function(){
            animate(that.imgbox, {left: -95})
        }
    }
}
new ChangeList("#food");
new ChangeList("#Cosmetics");
new ChangeList("#Digital");

// food图片渲染
class FoodRender{
    constructor(father, url){
        this.url = url;
        this.ele = document.querySelector(""+father+" .com_show_cont .com_gosort:last-of-type");
        this.init();
    }
    init(){
        var that = this;
        ajaxGet(this.url,
            function(data){
                var data = JSON.parse(data);
                for(var i = 0; i < data.length; i++){
                    var a = document.createElement("a");
                    a.href = "javascript:;";
                    a.className = "com_godetail";
                    var str = `<p>${data[i].name}</p>
                                <p>￥<span>${data[i].price}</span></p>
                                <img src="${data[i].img}" alt="">`;
                    a.innerHTML = str;
                    that.ele.parentElement.insertBefore(a, that.ele)
                }
            }
        )
    }
}
new FoodRender("#food","../lib/json/index_food.json");
new FoodRender("#Cosmetics","../lib/json/index_Cosmetics.json");
new FoodRender("#Digital","../lib/json/index_Digital.json");

// 懂你想要商品渲染
class Loadgoods{
    constructor(){
        this.current = 4;
        this.url = "../lib/json/index_goods.json";
        this.goodsBox = document.querySelector("#rdm_goods .rdm_goods_box");
        this.bg = document.querySelector("#rdm_goods .goods_lazy_loading")
        this.init();
    }
    init(){
        var that = this;
        var str = ""
        ajaxGet(this.url, function(data){
            that.data = JSON.parse(data);
            for(var i = 0; i < that.data.length; i++){
                if(i<=that.current){
                    str += `<a href="./goods_detail.html?goodsId=${that.data[i].goodsId}" class="goods_roughly goods_blobk">`;
                }else{
                    str += `<a href="./goods_detail.html?goodsId=${that.data[i].goodsId}" class="goods_roughly goods_none">`;
                }
                str += `<img src="${that.data[i].img}" alt="">
                            <h3 class="goods_name">${that.data[i].name}</h3>
                            <span class="goods_price">￥<i>${that.data[i].price}</i></span>
                            <span class="goods_coupon">自营</span>
                            <div class="goods_dis_shop">
                                <em><i class="iconfont">&#xe624</i></em>
                                <em>找相似</em>
                                <span></span>
                            </div>
                        </a>`
            }
            that.goodsBox.innerHTML = str;
            window.onscroll = function(){
                if(document.documentElement.offsetHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 400){
                    var next = that.current + 10 >= that.data.length? that.data.length: that.current + 10;
                    var t = setTimeout(function(){
                        for(var j = that.current; j < next; j++){
                            that.goodsBox.children[j].className = "goods_roughly goods_blobk";
                        }
                        that.current = next;
                    }, 800)
                    if(that.current >= that.data.length){
                        window.onscroll = null;
                        clearTimeout(t);
                        that.bg.className = "goods_lazy_loading loading_success";
                    }
                    if(document.documentElement.offsetHeight - document.documentElement.scrollTop - document.documentElement.clientHeight >= 500){
                        clearTimeout(t)
                    }
                }
            }
        })
    }
}
new Loadgoods();

// 侧栏top按钮显示,顶部搜索框滑动显示
class Totopbtn{
    constructor(){
        this.input = document.getElementById("hd_search");
        this.topbar = document.querySelector("#SearchFixed");
        this.searchBox = document.querySelector(".search_box_normal");
        this.shoppingcartBtn = document.querySelector(".shopcart_normal");
        this.init();
        this.btn = document.querySelector("#right_sidebar .to_top");
        this.init();
        this.addevent();
    }
    init(){
        var that = this;
        document.onscroll = function(){
            that.top = document.documentElement.scrollTop;
            if(document.documentElement.scrollTop <= 400){
                that.btn.parentElement.style.display = "none";
            }else{
                that.btn.parentElement.style.display = "block";
            }
            if(document.documentElement.scrollTop >= 2200){
                that.btn.style.display = "block";
            }else{
                that.btn.style.display = "none";
            }
            if(document.documentElement.scrollTop >= 600){
                $(that.topbar).slideDown(300,null, function(){
                    that.input.parentElement.style.borderColor = "#ff4040";
                    $(that.searchBox).addClass("search_box_fixed");
                    $(that.shoppingcartBtn).addClass("shopcart_fixed");
                });
                $(that.searchBox).slideDown(200);
                $(that.shoppingcartBtn).slideDown(200);
                that.searchBox.children[2].style.display = "none";
                that.input.onmouseenter = that.input.onmouseleave = null;
            }else{
                $(that.topbar).slideUp(300);
                $(that.searchBox).removeClass("search_box_fixed");
                $(that.shoppingcartBtn).removeClass("shopcart_fixed");
                that.input.parentElement.style.borderColor = "#e2e2e2";
                that.searchBox.children[2].style.display = "block";
                that.input.onmouseenter = function(){
                    this.parentElement.style.borderColor = "#ff4040";
                }
                that.input.onmouseleave = function(){
                    this.parentElement.style.borderColor = "#e2e2e2";
                }
            }  
        }
    }
    addevent(){
        var that = this;
        this.btn.onclick = function(){
            // var top = that.top;
            // that.timer = setInterval(function(){
            //     var next = top - 70;
            //     if(next <= 0){
            //         document.documentElement.scrollTop = 0;
            //         clearInterval(that.timer)
            //     }else{
            //         document.documentElement.scrollTop = next;
            //     }
            //     top = next;
            // },30)
            $(document.documentElement).animate({scrollTop: 0}, 800);
        }
    }
}
new Totopbtn();

// 
// class SearchFixed{
//     constructor(){
//         this.input = document.getElementById("hd_search");
//         this.topbar = document.querySelector("#SearchFixed");
//         this.searchBox = document.querySelector(".search_box_normal");
//         this.shoppingcartBtn = document.querySelector(".shopcart_normal");
//         this.init();
//     }
//     init(){
//         var that = this;
//         document.onscroll = function(){
//             if(document.documentElement.scrollTop >= 600){
//                 $(that.topbar).slideDown(300,null, function(){
//                     that.input.parentElement.style.borderColor = "#ff4040";
//                     $(that.searchBox).addClass("search_box_fixed");
//                     $(that.shoppingcartBtn).addClass("shopcart_fixed");
//                 });
//                 $(that.searchBox).slideDown(200);
//                 $(that.shoppingcartBtn).slideDown(200);
//                 that.searchBox.children[2].style.display = "none";
//                 that.input.onmouseenter = that.input.onmouseleave = null;
//             }else{
//                 $(that.topbar).slideUp(300);
//                 $(that.searchBox).removeClass("search_box_fixed");
//                 $(that.shoppingcartBtn).removeClass("shopcart_fixed");
//                 that.input.parentElement.style.borderColor = "#e2e2e2";
//                 that.searchBox.children[2].style.display = "block";
//                 that.input.onmouseenter = function(){
//                     this.parentElement.style.borderColor = "#ff4040";
//                 }
//                 that.input.onmouseleave = function(){
//                     this.parentElement.style.borderColor = "#e2e2e2";
//                 }
//             }  
//         }
        
//     }
    
// }
// new SearchFixed();