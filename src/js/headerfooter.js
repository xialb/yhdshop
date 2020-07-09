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

// 关键词搜索
class Search{
    constructor(){
        this.input = document.getElementById("hd_search");
        this.contentBox = document.querySelector(".hd_main_right .search_content ul")
        this.init();
        this.borCor();
    }
    init(){
        var that = this;
        var str = "";
        this.input.oninput = function(){
            that.contentBox.innerHTML = str;
            jsonp1(
                "https://suggest.taobao.com/sug?code=utf-8&q="+this.value+"&_ksTS=1593314375249_483&callback=jsonp484&k=1&area=c2c&bucketid=12",
                function(data){
                    str = "";
                    for(var i = 0; i < data.result.length; i++){
                        str += `<li><a href="javascript:;">${data.result[i][0]}</a></li>`
                    }
                    that.contentBox.innerHTML = str;
                },
                {
                    callback:"searchcb",
                    callbackName:"callback"
                }
            )
        }
        this.input.onfocus = function(){
            that.contentBox.innerHTML = str;
        }
        this.input.onblur = function(){
            that.contentBox.innerHTML = "";
        }
    }
    borCor(){
        this.input.onmouseenter = function(){
            this.parentElement.style.borderColor = "#ff4040";
        }
        this.input.onmouseleave = function(){
            this.parentElement.style.borderColor = "#e2e2e2";
        }
    }
}
new Search();

// tab选项卡数据渲染
class TabDisplay{
    constructor(){
        this.url = "../lib/json/tab.json";
        this.titBox = document.querySelector(".hd_main_nav .categories_list");
        this.detailBox = document.querySelector(".hd_main_nav .categories_detail");
        this.displayTit();
        this.displayDetail();
        this.arr = [];
    }
    displayTit(){
        var that = this;
        ajaxGet(this.url, function(data){
            that.data = JSON.parse(data);
            for(var i = 0; i < that.data.length; i++){
                var div = document.createElement("div");
                div.className = "categories_tab";
                div.index = i;
                for(var j in that.data[i]){
                    var a = document.createElement("a");
                    a.innerHTML = j;
                    div.appendChild(a);
                    var span = document.createElement("span");
                    span.innerHTML = "/";
                    div.appendChild(span);
                }
                var icon = document.createElement("i");
                icon.className = "iconfont";
                icon.innerHTML = "&#xe626";
                div.lastElementChild.remove();
                div.appendChild(icon);
                that.titBox.appendChild(div);
            }
        })
    }
    displayDetail(){
        var that = this;
        ajaxGet(this.url, function(data){
            that.data = JSON.parse(data);
            for(var i = 0; i < that.data.length; i++){
                var div = document.createElement("div");
                div.className = "categories_detail_show";
                for(var j in that.data[i]){
                    var tit = document.createElement("div");
                    tit.className = "tit";
                    var h3 = document.createElement("h3");
                    h3.innerHTML = j;
                    var more = document.createElement("a");
                    more.innerHTML = `更多<i class="iconfont">&#xe626</i>`;
                    tit.appendChild(h3);
                    tit.appendChild(more);
                    var ul = document.createElement("ul");
                    ul.className = "classify clear_fix";
                    for(var k = 0; k < that.data[i][j].length; k++){
                        var li = document.createElement("li");
                        var a = document.createElement("a");
                        a.innerHTML = that.data[i][j][k];
                        li.appendChild(a);
                        ul.appendChild(li);
                    }
                    div.appendChild(tit);
                    div.appendChild(ul);
                }
                that.detailBox.appendChild(div);
            }
        })
    }
    
}
new TabDisplay();

// tab选项卡
class TabSwitch{
    constructor(){
        this.i = document.querySelector(".categories_tit i:nth-of-type(2)")
        this.tit = document.querySelector(".categories_tit");
        this.tabbox = document.querySelector(".categories_list");
        this.tabArr = this.tabbox.children;
        // this.tabArr = document.querySelectorAll(".categories_list .categories_tab");
        this.detailbox = document.querySelector(".categories_detail");
        this.detailArr = this.detailbox.children;
        // this.detailArr = document.querySelectorAll(".categories_detail .categories_detail_show");
        this.init();
    }
    init(){
        var that = this;
        this.display();
        this.getSeat();
        this.tabbox.onmouseover = function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            if(tar.className == "categories_tab"){
                that.detailBN(tar.index);
            }else if(tar.className == "categories_list"){
                for(var i = 0; i < that.detailArr.length; i++){
                    that.detailArr[i].style.display = "none";
                }
                that.detailArr[0].style.display = "block";
            }else{
                that.detailBN(tar.parentElement.index)
            }
        }
        // this.detailArr.children[0].style.opacity = "1";
    }
    display(){
        if(this.tit.id.indexOf("active_one") != -1){
            this.tabbox.style.display = "block";
            this.i.innerHTML = "&#xe63f";
        }else{
            this.tabbox.style.display = "none";
            this.i.innerHTML = "&#xe65f";
            this.detailbox.style.display = "none";
        }
        if(this.tabbox.id.indexOf("active_two") != -1 && this.tit.id.indexOf("active_one") != -1){
            this.detailbox.style.display = "block";
        }else{
            this.detailbox.style.display = "none";
        }
    }
    detailBN(index){
        for(var i = 0; i < this.detailArr.length; i++){
            this.detailArr[i].style.display = "none";
        }
        this.detailArr[index].style.display = "block";
    }
    getSeatFn(){
        this.oneX1 = this.tit.getBoundingClientRect().left;
        this.oneX2 = this.oneX1 + parseInt(getStyle(this.tit,"width"));
        this.oneY1 = this.tit.getBoundingClientRect().top;
        this.oneY2 = this.oneY1 + parseInt(getStyle(this.tit,"height"));
        this.twoX1 = this.oneX1 + parseInt(getStyle(this.tabbox,"left"));
        this.twoX2 = this.twoX1 + parseInt(getStyle(this.tabbox,"width"));
        this.twoY1 = this.oneY1 + parseInt(getStyle(this.tit,"height")) - 5;
        this.twoY2 = this.twoY1 + parseInt(getStyle(this.tabbox,"height"));
        this.threeX1 = this.twoX1 + parseInt(getStyle(this.tabbox,"width"));
        this.threeX2 = this.threeX1 + parseInt(getStyle(this.detailbox,"width"));
        this.threeY1 = this.twoY1;
        this.threeY2 = this.threeY1 + parseInt(getStyle(this.detailbox,"height"));
    }
    getSeat(){
        var that = this;
        document.onmousemove = function(){
            that.getSeatFn();
        }
        $(this.tit).hover(function(){
            that.tit.id = "active_one";
            that.display();
        }, function(eve){
            var e = eve || window.event;
            if(e.clientX>that.twoX1&&e.clientX<that.twoX2&&e.clientY>that.twoY1&&e.clientY<that.twoY2){
                that.tabbox.id = "active_two";
                that.display();
            }else{
                that.tit.id = "";
                that.tabbox.id = "";
                that.display();
            }
        })
        $(this.tabbox).hover(function(){
            that.tabbox.id = "active_two";
            that.display();
        }, function(eve){
            var e = eve || window.event;
            if(e.clientX>that.twoX2&&e.clientY<that.threeY2){
                that.tit.id = "active_one";
                that.tabbox.id = "active_two";
                that.display();
            }else{
                that.tit.id = "";
                that.tabbox.id = "";
                that.display();
            }
        })
        $(this.detailbox).hover(function(){
            that.tit.id = "active_one";
            that.tabbox.id = "active_two";
            that.display();
        }, function(eve){
            var e = eve || window.event;
            if(e.clientX<that.threeX1&&e.clientY>that.threeY1&&e.clientY<that.threeY2){
                that.tit.id = "active_one";
                that.tabbox.id = "active_two";
                that.display();
            }else{
                that.tit.id = "";
                that.tabbox.id = "";
                that.display();
            }
        })
    }
}
new TabSwitch();

// 获取用户名
class Getuser{
    constructor(){
        this.user = document.querySelector(".hd_topbar_right .hd_topbar_user a");
        this.init();
    }
    init(){
        this.user.innerHTML = getCookie("username");
    }
}
new Getuser();