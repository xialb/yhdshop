class ChangeNotice{
    constructor(){
        this.list = document.querySelector(".hd_topbarhome_list");
        this.index = 1;
        this.init();
    }
    init(){
        var that = this;
        var li = this.list.children[0].cloneNode(true);
        this.list.appendChild(li);
        clearInterval(this.list.timer);
        this.list.timer = setInterval(function(){
            $(that.list).animate({
                top: -that.index*30
            },300, function(){
                that.index++;
                if(that.index==that.list.children.length){
                    that.index=1;
                    that.list.style.top = "0";
                }
            })
        }, 2000)
    }
}
new ChangeNotice();

// 渲染购物车商品
class LoadGoods{
    constructor(){
        this.box = document.querySelector(".cart_show .goods_list");
        this.url = "../lib/interface/showlist.php";
        this.init();
    }
    init(){
        var that = this;
        var str = "";
        ajaxGet(this.url,function(data){
            if(JSON.parse(data).code==1){
                that.json = JSON.parse(data).data;
                for(var i = 0; i < that.json.length; i++){
                    var num = Number(that.json[i].product_price*that.json[i].product_num).toFixed(2);
                    str += `<div class="cart_goods clear_fix" data-goodsId="${that.json[i].product_id}">
                                <a href="javascript:;" class="pro_select_none">
                                    <span><img src="../images/selectimg.png" alt=""></span>
                                </a>
                                <a href="javascript:;" class="cart_goods_img">
                                    <img src="${that.json[i].product_img}" alt="">
                                </a>
                                <a href="javascript:;" class="cart_goods_name">
                                    ${that.json[i].product_name} 
                                </a>
                                <span class="cart_goods_price">${that.json[i].product_price}</span>
                                <div class="cart_goods_num">
                                    <a href="javascript:;" class="reduce_goods_num">-</a>
                                    <input type="text" readonly="readonly" value="${that.json[i].product_num}">
                                    <a href="javascript:;" class="add_goods_num">+</a>
                                </div>
                                <span class="cart_goods_pricetotal">${num}</span>
                                <a href="javascript:;" class="cart_goods_del">
                                    <img src="../images/cart_goods_del.png" alt="">
                                    <em></em>
                                </a>
                            </div>`
                }
            }else if(JSON.parse(data).code==0){
                console.log(1)
                str = `<div class="empty_box">
                        <img src="../images/offline.gif" alt="">
                        <p>购物车还是空的呢，快去采购吧~<br>或者登录查看之前加入的商品。</p>
                        <a href="./index.html">去逛逛</a>
                    </div>`;
            }
            that.box.innerHTML = str;
        })
    }
}
new LoadGoods();

// 定义删除商品功能
class Delproduct{
    constructor(){
        this.url = "../lib/interface/delwq.php"
        this.box = document.querySelector(".cart_show .goods_list");
        this.init();
    }
    init(){
        var that = this;
        this.box.addEventListener("click",function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            if(tar.parentElement.className == "cart_goods_del"){
                tar.parentElement.parentElement.remove();
                ajaxGet(that.url,function(data){
                    console.log(data)
                },{
                    "id":tar.parentElement.parentElement.getAttribute("data-goodsId")
                })
            }
        })
    }
}
new Delproduct();

// 定义修改商品数量功能
class Updatenum{
    constructor(){
        this.url = "../lib/interface/delwq.php"
        this.box = document.querySelector(".cart_show .goods_list");
        this.inputArr = document.querySelectorAll("cart_goods_num input");
        this.init();
    }
    init(){
        var that = this;
        this.box.addEventListener("click",function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            if(tar.className == "add_goods_num"){
                that.changeValue(tar.parentElement, "add");
            }
            if(tar.className == "reduce_goods_num"){
                that.changeValue(tar.parentElement, "reduce");
            }
        })
    }
    changeValue(ele, type){
        if(type=="add"){
            ele.children[1].value++;
            ajaxGet("../lib/interface/updatewq.php",function(data){
                ele.nextElementSibling.innerHTML = (Number(ele.nextElementSibling.innerHTML) + Number(ele.previousElementSibling.innerHTML)).toFixed(2);
            },{
                "id":ele.parentElement.getAttribute("data-goodsId"),
                type:"add"
            })
        }else if(type=="reduce"){
            if(ele.children[1].value == 1){
                ele.children[1].value = 1;
            }else{
                ele.children[1].value--;
                ajaxGet("../lib/interface/updatewq.php",function(data){
                    ele.nextElementSibling.innerHTML = (Number(ele.nextElementSibling.innerHTML) - Number(ele.previousElementSibling.innerHTML)).toFixed(2);
                },{
                    "id":ele.parentElement.getAttribute("data-goodsId"),
                    type:"cut"
                })
            }
        }
    }
}
new Updatenum();

// 定义选中商品结算功能
class ProSelect{
    constructor(){
        this.flag = 1;
        this.box = document.querySelector(".cart_show .goods_list");
        this.selectAll = document.querySelectorAll(".pro_select_all");
        this.total = document.querySelector("#pay_tools_bar .cart_total span");
        this.init();
    }
    init(){
        var that = this;
        for(var i = 0; i < this.selectAll.length; i++){
            this.selectAll[i].onclick = function(){
                that.changeAll();
            }
        }
        this.box.addEventListener("click",function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            if(tar.parentElement.className.indexOf("pro_select_none") != -1){
                $(tar.parentElement).toggleClass("pro_select");
            }
            if(tar.parentElement.parentElement.className.indexOf("pro_select_none") != -1){
                $(tar.parentElement.parentElement).toggleClass("pro_select");
            }
            that.calculation();
        })
    }
    changeAll(){
        if(this.flag==1){
            $(".pro_select_none").addClass("pro_select");
            this.flag = 2;
        }else if(this.flag==2){
            $(".pro_select_none").removeClass("pro_select");
            this.flag = 1;
        }
        this.calculation();
    }
    calculation(){
        var selectPro = document.querySelectorAll(".goods_list .pro_select");
        var num = 0;
        for(var i = 0; i < selectPro.length; i++){
           num += Number(selectPro[i].parentElement.lastElementChild.previousElementSibling.innerHTML)
        }
        this.total.innerHTML = num.toFixed(2);
    }
}
new ProSelect();

// 结算框滚动定位
class SetPaybar{
    constructor(){
        this.bar = document.getElementById("pay_tools_bar");
        this.height = this.bar.offsetTop;
        this.init();
        this.display();
    }
    init(){
        var that = this;
        document.onscroll = function(){
            that.display();
        }
    }
    display(){
        var that = this;
        if(document.documentElement.scrollTop + document.documentElement.clientHeight<that.height){
            that.bar.className = "paybarpos1";
        }else if(document.documentElement.scrollTop > that.height){
            that.bar.className = "paybarpos3";
        }else{
            that.bar.className = "paybarpos2";
        }
    }
}
window.onload = function(){
    new SetPaybar();
}

// 获取用户名
class Getuser{
    constructor(){
        this.user = document.querySelector(".hd_topbar_user a");
        this.init();
    }
    init(){
        this.user.innerHTML = getCookie("username");
    }
}
new Getuser();