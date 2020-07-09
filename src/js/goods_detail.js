// 监控地址栏
class LocationIsId{
    constructor(){
        this.index = document.querySelector(".hd_top_bar .hd_topbar_city span")
        this.init();
    }
    init(){
        console.log(location.href)
        if(location.href.indexOf("goodsId=")==-1){
            $(this.index).click();
        }
    }
}
new LocationIsId();

// 鼠标进入不变色
class SearchBoxOver{
    constructor(){
        this.box = document.getElementById("hd_search");
        this.init();
    }
    init(){
        this.box.onmouseleave = function(){
            this.parentElement.style.borderColor = "#ff4040";
        }
    }
}
new SearchBoxOver();

// 商品渲染
class DisplayGoods{
    constructor(){
        this.bigimg = document.querySelector(".goods_img_box .bigimg_right img");
        this.img = document.querySelector(".goods_img_box img");
        this.name = document.querySelector(".goods_name em");
        this.price = document.querySelector(".goods_price em");
        this.url = "../lib/json/index_goods.json";
        this.init();
    }
    init(){
        var that = this;
        var arr = location.href.split("?")[1].split("&");
        for(var i = 0; i < arr.length; i++){
            if(arr[i].split("=")[0]=="goodsId"){
                this.goodsId = arr[i].split("=")[1];
            }
        }
        ajaxGet(this.url, function(data){
            that.data = JSON.parse(data);
            for(var j = 0; j < that.data.length; j++){
                if(that.data[j].goodsId==that.goodsId){
                    that.name.innerHTML = that.data[j].name;
                    that.img.src = that.data[j].img;
                    that.price.innerHTML = that.data[j].price;
                    that.bigimg.src = that.img.src;
                    that.name.parentElement.parentElement.setAttribute("data-goodsId",that.goodsId);
                }
            }
        })
    }
}
new DisplayGoods();

// 放大镜
class Magnifier{
    constructor(){
        this.span = document.querySelector(".img_move");
        this.Sbox = document.querySelector(".goods_img_cont");
        this.Bbox = document.querySelector(".bigimg_right");
        this.Bimg = document.querySelector(".bigimg_right img");
        this.init();
    }
    init(){
        var that = this;
        this.Sbox.onmouseover = function(){
            that.span.style.display = "block";
            that.Bbox.style.display = "block";
        }
        this.Sbox.onmouseout = function(){
            that.span.style.display = "none";
            that.Bbox.style.display = "none";
        }
        this.Sbox.onmousemove = function(eve){
            var e = eve || window.event;
            that.mousePosX = e.offsetX;
            that.mousePosY = e.offsetY;
            that.spanPos();
        }
    }
    spanPos(){
        this.span.style.left = this.mousePosX - this.span.offsetWidth/2 + "px";
        this.span.style.top = this.mousePosY - this.span.offsetHeight/2 + "px";
        if(this.span.offsetLeft <= 0){
            this.span.style.left = "0";
        }
        if(this.span.offsetLeft >= this.Sbox.offsetWidth - this.span.offsetWidth){
            this.span.style.left = this.Sbox.offsetWidth - this.span.offsetWidth + "px";
        }
        if(this.span.offsetTop <= 0){
            this.span.style.top = "0";
        }
        if(this.span.offsetTop >= this.Sbox.offsetHeight - this.span.offsetHeight){
            this.span.style.top = this.Sbox.offsetHeight - this.span.offsetHeight + "px";
        }
        this.imgMove();
    }
    imgMove(){
        this.left = this.span.offsetLeft/this.Sbox.offsetWidth;
        this.top = this.span.offsetTop/this.Sbox.offsetHeight;
        this.Bimg.style.left = -this.Bimg.offsetWidth*this.left + "px";
        this.Bimg.style.top = -this.Bimg.offsetHeight*this.top + "px";
    }
}
new Magnifier();

// 添加购物车弹窗
class DisToast{
    constructor(){
        this.toast = document.getElementById("toast");
        this.keepShop = document.querySelector("#toast .toast_text .toast_btn a:nth-of-type(1)");
        this.close = document.querySelector("#toast .toast_text em");
        this.init();
    }
    init(){
        var that = this;
        this.keepShop.onclick = function(){
            $(that.toast).fadeOut(200);
        }
        this.close.onclick = function(){
            $(that.toast).fadeOut(200);
        }
    }
}
new DisToast();

// 添加购物车
class AddShopcar{
    constructor(){
        this.name = document.querySelector(".goods_name em");
        this.price = document.querySelector(".goods_price em");
        this.Bimg = document.querySelector(".bigimg_right img");
        this.btn = document.querySelector(".add_shopcar_btn");
        this.toast = document.querySelector("#toast");
        this.url = "../lib/interface/addwq.php";
        this.init();
    }
    init(){
        var that = this;
        this.btn.onclick = function(){
            $.get(that.url,{
                id:that.btn.parentElement.parentElement.getAttribute("data-goodsId"),
                img:that.Bimg.src,
                price:that.price.innerHTML,
                name:that.name.innerHTML
            },function(data){
                var json = JSON.parse(data);
                $(that.toast).fadeIn(200);
            })
        }
    }
}
new AddShopcar();

