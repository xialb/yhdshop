"use strict";function ajaxGet(t,n){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},o="";for(var a in e)o+="".concat(a,"=").concat(e[a],"&");o=o.substring(0,o.length-1);var c=(new Date).getTime();t="".concat(t,"?nowtime=").concat(c,"&").concat(o);var r=new XMLHttpRequest;r.open("get",t,!0),r.send(),r.onload=function(){200==r.status&&n(r.responseText)}}function ajaxPost(t,n){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},o="";for(var a in e)o+="".concat(a,"=").concat(e[a],"&");o=o.substring(0,o.length-1);var c=new XMLHttpRequest;c.open("post",t,!0),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send(o),c.onload=function(){200==c.status&&n(c.responseText)}}function ajaxGP(t){var n=t.url,e=t.method,o=t.data,a=t.success,c=t.error;o=o||{},e=e||"get";var r="";for(var s in o)r+="".concat(s,"=").concat(o[s],"&");if(r=r.substring(0,r.length-1),"get"==e){var i=(new Date).getTime();n="".concat(n,"?nowtime=").concat(i,"&").concat(r)}var u=new XMLHttpRequest;u.open(e,n,!0),"post"==e?(u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.send(r)):u.send(),u.onload=function(){200==u.status?a&&a(u.responseText):c&&c(u.status)}}function jsonp(t,n){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},o="";for(var a in e)o+="".concat(a,"=").concat(e[a],"&");o=o.substring(0,o.length-1);var c="nowtime"+(new Date).getTime()+Math.random().toString().substring(2);t="".concat(t,"?callback=").concat(c,"&").concat(o);var r=document.createElement("script");r.src=t,document.body.appendChild(r),window[c]=function(t){n(t),document.body.removeChild(r)}}function jsonp1(t,n,e){var o="";for(var a in e)o+="".concat(a,"=").concat(e[a],"&");o=o.substring(0,o.length-1);var c=(new Date).getTime();t="".concat(t,"?nowtime=").concat(c,"&").concat(o);var r=document.createElement("script");r.src=t,document.body.appendChild(r),window[e[e.callbackName]]=function(t){n(t),r.remove()}}