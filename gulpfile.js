// 导入gulp
const gulp = require("gulp");
// 导入del
const del = require("del");
// 导入gulp-webserver
const webserver = require("gulp-webserver");
// 导入gulp-htmlmin
const htmlmin = require("gulp-htmlmin");
// 导入gulp-cssmin
const cssmin = require("gulp-cssmin");
// 导入gulp-autoprefixer
const autoprefixer = require("gulp-autoprefixer");
// 导入gulp-babel
const babel = require("gulp-babel");
// 导入gulp-uglify
const uglify = require("gulp-uglify");
// 导入gulp-sass
const sass = require("gulp-sass");

// html压缩规则
const htmlHandler = ()=>{
    return gulp.src("./src/pages/*.html")
    .pipe(htmlmin({
        removeAttributeQuotes:true,// 移除属性上的双引号
        removeComments:true,// 移除注释
        collapseWhitespace:true,// 移除所有空格,会变成一行代码
        collapseBooleanAttributes:true,// 把值为布尔值的属性简写
        minifyCSS:true,// 把页面里面style标签里面的css样式也去空格
        minifyJS:true// 把页面里面script标签里面的js代码也去空格
    }))
    .pipe(gulp.dest("./dist/pages"))
}

// css压缩规则
const cssHandler = ()=>{
    return gulp.src("./src/css/*.css")
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css"))
}

// sass压缩规则
const sassHandler = ()=>{
    return gulp.src("./src/sass/**")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css"))
}

// js压缩规则
const jsHandler = ()=>{
    return gulp.src("./src/js/*.js")
    .pipe(babel({
        presets: ["@babel/env"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
}

// lib的移动规则
const libHandler = ()=>{
    return gulp.src("./src/lib/**")
    .pipe(gulp.dest("./dist/lib"))
}

// iconfont的移动规则
const iconHandler = ()=>{
    return gulp.src("./src/iconfont/**")
    .pipe(gulp.dest("./dist/iconfont"))
}

// images的移动规则
const imagesHandler = ()=>{
    return gulp.src("./src/images/**")
    .pipe(gulp.dest("./dist/images"))
}

// 删除的规则
const delHandler = ()=>{
    return del(["./dist"])
}

// webserver的规则
const webserverHandler = ()=>{
    return gulp.src("./dist")// 找到要作为服务器根目录的文件夹
    .pipe(webserver({
        open:'./pages/index.html',// 你默认打开的首页,路径从dist开始书写
        livereload:true,// 热更新,就是当dist里面代码有变化的时候自动刷新浏览器
        // proxies:[// 这个第三方模块还可以帮助我们配置代理
        //     {
        //         source: '/abc', // 表示请求的地址
        //         target: 'http://127.0.0.1/json.php'// 你要代理的地址
        //     }
        // ]
    }))
}

// 自动监控任务
const watchHandler = ()=>{
    // 当我在src里面书写代码的时候,只要我修改我的代码,就会被gulp监听到,
    // 一旦监听到,就重新帮我删除以前的和压缩现在的,一旦压缩,dist文件夹里面内容就变化了
    // 变化了以后服务器就会热更新
    gulp.watch("./src/css/*.css",gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),));
    gulp.watch("./src/sass/**",gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),));
    gulp.watch("./src/js/*.js", gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),));
    gulp.watch("./src/pages/*.html", gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),));
    gulp.watch("./src/images/**", gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),));
    gulp.watch("./src/lib/**", gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),))
    gulp.watch("./src/iconfont/**", gulp.series(delHandler, gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),))
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(libHandler, imagesHandler, cssHandler, sassHandler, htmlHandler, jsHandler, iconHandler),
    webserverHandler,
    watchHandler
)