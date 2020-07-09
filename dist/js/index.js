"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}var Banner=function(){function t(){_classCallCheck(this,t),this.show=document.querySelector(".banner_show"),this.imgboxArr=document.querySelectorAll(".banner_show a"),this.btnArr=document.querySelectorAll(".banner_btn a"),this.index=0,this.display(),this.init()}return _createClass(t,[{key:"display",value:function(){for(var t=0;t<this.imgboxArr.length;t++)this.imgboxArr[t].children[0].style.marginLeft=(this.show.offsetWidth-this.imgboxArr[t].children[0].offsetWidth)/2+"px",this.imgboxArr[t].style.left=this.show.offsetWidth+"px";this.imgboxArr[0].style.left="0"}},{key:"init",value:function(){for(var t=this,e=0;e<this.btnArr.length;e++)this.btnArr[e].num=e,this.btnArr[e].onclick=function(){t.btnClick(this.num)};this.autoPlay(),this.show.parentElement.onmousemove=function(){clearInterval(t.timer)},this.show.parentElement.onmouseout=function(){clearInterval(t.timer),t.autoPlay()}}},{key:"autoPlay",value:function(){var t=this;this.timer=setInterval(function(){t.index++,t.index==t.imgboxArr.length&&(t.index=0),t.btnMove(),t.imgMoveAuto(t.index)},3e3)}},{key:"btnClick",value:function(t){var e=this.index;e<t?this.imgboxArr[t].style.left=this.show.offsetWidth+"px":t<e&&(this.imgboxArr[t].style.left=-this.show.offsetWidth+"px"),this.index=t,this.btnMove(),this.imgMoveSet(e)}},{key:"btnMove",value:function(){for(var t=0;t<this.btnArr.length;t++)this.btnArr[t].className="";this.btnArr[this.index].className="current"}},{key:"imgMoveSet",value:function(t){this.index>t?animate(this.imgboxArr[t],{left:-this.show.offsetWidth}):animate(this.imgboxArr[t],{left:this.show.offsetWidth}),animate(this.imgboxArr[this.index],{left:0})}},{key:"imgMoveAuto",value:function(t){this.imgboxArr[t].style.left=this.show.offsetWidth+"px";var e=t-1;-1==e&&(e=this.imgboxArr.length-1),animate(this.imgboxArr[e],{left:-this.show.offsetWidth}),animate(this.imgboxArr[t],{left:0})}}]),t}();new Banner;var CountDown=function(){function t(){_classCallCheck(this,t),this.djs=7200,this.hour=document.querySelector(".countdown_time .time_hour"),this.minute=document.querySelector(".countdown_time .time_minute"),this.second=document.querySelector(".countdown_time .time_second"),this.init()}return _createClass(t,[{key:"init",value:function(){var t=this;this.timer=setInterval(function(){t.djs--,t.setTime()},1e3)}},{key:"setTime",value:function(){var t=parseInt(this.djs/60/60);t.toString().length<=1&&(t="0"+t),this.hour.innerHTML=t;var e=parseInt(this.djs/60%60);e.toString().length<=1&&(e="0"+e),this.minute.innerHTML=e;var n=parseInt(this.djs%60);n.toString().length<=1&&(n="0"+n),this.second.innerHTML=n}}]),t}();new CountDown;var SeckillRender=function(){function t(){_classCallCheck(this,t),this.url="../lib/json/seckill.json",this.box=document.querySelector("#seckill .seckill_cont"),this.init()}return _createClass(t,[{key:"init",value:function(){var s=this;ajaxGet(this.url,function(t){t=JSON.parse(t);for(var e=0;e<t.length;e++){var n=document.createElement("li");n.className="seckill_goods";var o=t[e].sold/t[e].stock*100+"%",i='<a href="javascript:;">\n                                    <img src="'.concat(t[e].img,'" alt="">\n                                    <h3>').concat(t[e].name,'</h3>\n                                    <span><i style="width:').concat(o,';"></i></span>\n                                    <h5>￥<em>').concat(t[e].price,"</em></h5>\n                                </a>");n.innerHTML=i,s.box.appendChild(n)}})}}]),t}();new SeckillRender;var ChangeList=function(){function e(t){_classCallCheck(this,e),this.imgbox=document.querySelector(t+" .ranking_list .list_box "),this.btnL=document.querySelector(t+" .ranking_list .list_btn_l"),this.btnR=document.querySelector(t+" .ranking_list .list_btn_r"),this.init()}return _createClass(e,[{key:"init",value:function(){var t=this;this.btnL.onclick=function(){animate(t.imgbox,{left:40})},this.btnR.onclick=function(){animate(t.imgbox,{left:-95})}}}]),e}();new ChangeList("#food"),new ChangeList("#Cosmetics"),new ChangeList("#Digital");var FoodRender=function(){function n(t,e){_classCallCheck(this,n),this.url=e,this.ele=document.querySelector(t+" .com_show_cont .com_gosort:last-of-type"),this.init()}return _createClass(n,[{key:"init",value:function(){var i=this;ajaxGet(this.url,function(t){t=JSON.parse(t);for(var e=0;e<t.length;e++){var n=document.createElement("a");n.href="javascript:;",n.className="com_godetail";var o="<p>".concat(t[e].name,"</p>\n                                <p>￥<span>").concat(t[e].price,'</span></p>\n                                <img src="').concat(t[e].img,'" alt="">');n.innerHTML=o,i.ele.parentElement.insertBefore(n,i.ele)}})}}]),n}();new FoodRender("#food","../lib/json/index_food.json"),new FoodRender("#Cosmetics","../lib/json/index_Cosmetics.json"),new FoodRender("#Digital","../lib/json/index_Digital.json");var Loadgoods=function(){function t(){_classCallCheck(this,t),this.current=4,this.url="../lib/json/index_goods.json",this.goodsBox=document.querySelector("#rdm_goods .rdm_goods_box"),this.bg=document.querySelector("#rdm_goods .goods_lazy_loading"),this.init()}return _createClass(t,[{key:"init",value:function(){var n=this,o="";ajaxGet(this.url,function(t){n.data=JSON.parse(t);for(var e=0;e<n.data.length;e++)e<=n.current?o+='<a href="./goods_detail.html?goodsId='.concat(n.data[e].goodsId,'" class="goods_roughly goods_blobk">'):o+='<a href="./goods_detail.html?goodsId='.concat(n.data[e].goodsId,'" class="goods_roughly goods_none">'),o+='<img src="'.concat(n.data[e].img,'" alt="">\n                            <h3 class="goods_name">').concat(n.data[e].name,'</h3>\n                            <span class="goods_price">￥<i>').concat(n.data[e].price,'</i></span>\n                            <span class="goods_coupon">自营</span>\n                            <div class="goods_dis_shop">\n                                <em><i class="iconfont">&#xe624</i></em>\n                                <em>找相似</em>\n                                <span></span>\n                            </div>\n                        </a>');n.goodsBox.innerHTML=o,window.onscroll=function(){if(document.documentElement.offsetHeight-document.documentElement.scrollTop-document.documentElement.clientHeight<=400){var e=n.current+10>=n.data.length?n.data.length:n.current+10,t=setTimeout(function(){for(var t=n.current;t<e;t++)n.goodsBox.children[t].className="goods_roughly goods_blobk";n.current=e},800);n.current>=n.data.length&&(window.onscroll=null,clearTimeout(t),n.bg.className="goods_lazy_loading loading_success"),500<=document.documentElement.offsetHeight-document.documentElement.scrollTop-document.documentElement.clientHeight&&clearTimeout(t)}}})}}]),t}();new Loadgoods;var Totopbtn=function(){function t(){_classCallCheck(this,t),this.input=document.getElementById("hd_search"),this.topbar=document.querySelector("#SearchFixed"),this.searchBox=document.querySelector(".search_box_normal"),this.shoppingcartBtn=document.querySelector(".shopcart_normal"),this.init(),this.btn=document.querySelector("#right_sidebar .to_top"),this.init(),this.addevent()}return _createClass(t,[{key:"init",value:function(){var t=this;document.onscroll=function(){t.top=document.documentElement.scrollTop,document.documentElement.scrollTop<=400?t.btn.parentElement.style.display="none":t.btn.parentElement.style.display="block",2200<=document.documentElement.scrollTop?t.btn.style.display="block":t.btn.style.display="none",600<=document.documentElement.scrollTop?($(t.topbar).slideDown(300,null,function(){t.input.parentElement.style.borderColor="#ff4040",$(t.searchBox).addClass("search_box_fixed"),$(t.shoppingcartBtn).addClass("shopcart_fixed")}),$(t.searchBox).slideDown(200),$(t.shoppingcartBtn).slideDown(200),t.searchBox.children[2].style.display="none",t.input.onmouseenter=t.input.onmouseleave=null):($(t.topbar).slideUp(300),$(t.searchBox).removeClass("search_box_fixed"),$(t.shoppingcartBtn).removeClass("shopcart_fixed"),t.input.parentElement.style.borderColor="#e2e2e2",t.searchBox.children[2].style.display="block",t.input.onmouseenter=function(){this.parentElement.style.borderColor="#ff4040"},t.input.onmouseleave=function(){this.parentElement.style.borderColor="#e2e2e2"})}}},{key:"addevent",value:function(){this.btn.onclick=function(){$(document.documentElement).animate({scrollTop:0},800)}}}]),t}();new Totopbtn;