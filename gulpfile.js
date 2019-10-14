var gulp = require('gulp');

// 引入gulp组件（插件）
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin');
var arguments = process.argv.splice(2);//读取命令行后面的参数
var os = require('os');
//获取内网ip
function getLocalIP() {
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
}
//--------------布置生产任务，-------------//
//index.html css、js合并压缩
gulp.task('index', function () {
    return gulp.src('www-src/index.html')
        .pipe(gulp.dest('www-src/'))
        .pipe(rename('main.html'))
        .pipe(replace('<script src="js/config.js"></script>', '<script src="js/configDest.js"></script>'))   
        .pipe(useref())
        .pipe(gulp.dest('www-src/'));
});
gulp.task('index1',["index"], function () {
    return gulp.src('www-src/dest/*.js')
        .pipe(uglify({"mangle":false}))
       .pipe(gulp.dest('www-src/dest/'));
});
gulp.task('index2',["index"], function () {
    return gulp.src('www-src/dest/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('www-src/dest/'));
});
// gulp.task('bs',["index1","index2","imagemin","pro","pro1"],function(){
//   console.log(__dirname);
// });
//改变config.xml
gulp.task('pro', function () {
    return gulp.src('./config.xml')
          .pipe(replace('<content src="test.html" />', '<content src="main.html" />'))
          .pipe(replace('<content src="index.html" />', '<content src="main.html" />'))
          .pipe(replace('<content src="trunk.html" />', '<content src="main.html" />'))
          .pipe(gulp.dest('./'))
          ;
});
gulp.task('pro1', function () {
    return gulp.src('./cordova-hcp.json')
          .pipe(replace('"content_url":"http://'+getLocalIP()+':8100/"', '"content_url":"https://www.he-pai.cn/app/www/"'))
          .pipe(gulp.dest('./'))
          ;
});
gulp.task('imagemin', function () {
    return gulp.src('www-src/img/**/*')
          .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
          .pipe(gulp.dest('www-src/img/'))
          ;
});
//--------------布置生产任务，End-------------//


//--------------布置开发任务------------------//
//reset任务，还原config.xml
gulp.task('reset', function () {
    return gulp.src('./config.xml')
          .pipe(replace('<content src="test.html" />', '<content src="index.html" />'))
          .pipe(replace('<content src="main.html" />', '<content src="index.html" />'))
          .pipe(replace('<content src="trunk.html" />', '<content src="index.html" />'))
          .pipe(gulp.dest('./'));
}); 
gulp.task('reset1', function () {
    console.log("ip:"+getLocalIP());
    return gulp.src('./cordova-hcp.json')
          .pipe(replace('"content_url":"https://www.he-pai.cn/app/www/"', '"content_url":"http://'+getLocalIP()+':8100/"'))
          .pipe(gulp.dest('./'));
});
//--------------布置开发任务  end-------------//

//--------------布置测试任务------------------//
gulp.task('test', function () {
    return gulp.src('www-src/index.html')
        .pipe(gulp.dest('www-src/'))
        .pipe(rename('test.html'))
        .pipe(replace('<script src="js/config.js"></script>', '<script src="js/configTest.js"></script>'))   
        .pipe(gulp.dest('www-src/'));
});
gulp.task('test1', function () {
    return gulp.src('./config.xml')
          .pipe(replace('<content src="index.html" />', '<content src="test.html" />'))
          .pipe(replace('<content src="main.html" />', '<content src="test.html" />'))
          .pipe(replace('<content src="trunk.html" />', '<content src="test.html" />'))
          .pipe(gulp.dest('./'));
}); 
gulp.task('test2', function () {
    return gulp.src('./cordova-hcp.json')
          .pipe(replace('"content_url":"https://www.he-pai.cn/app/www/"', '"content_url":"http://10.10.16.23:9100/www/"'))
          .pipe(gulp.dest('./'))
          ;
});
//--------------布置测试任务  end-------------//

//--------------布置主干任务------------------//
gulp.task('trunk', function () {
    return gulp.src('www-src/index.html')
        .pipe(gulp.dest('www-src/'))
        .pipe(rename('trunk.html'))
        .pipe(replace('<script src="js/config.js"></script>', '<script src="js/configTrunk.js"></script>'))   
        .pipe(useref())
        .pipe(gulp.dest('www-src/'));
});
gulp.task('trunk3',["trunk"], function () {
    return gulp.src('www-src/dest/*.js')
        .pipe(uglify({"mangle":false}))
       .pipe(gulp.dest('www-src/dest/'));
});
gulp.task('trunk4',["trunk"], function () {
    return gulp.src('www-src/dest/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('www-src/dest/'));
});
gulp.task('trunk1', function () {
    return gulp.src('./config.xml')
          .pipe(replace('<content src="index.html" />', '<content src="trunk.html" />'))
          .pipe(replace('<content src="main.html" />', '<content src="trunk.html" />'))
          .pipe(replace('<content src="test.html" />', '<content src="trunk.html" />'))
          .pipe(gulp.dest('./'))
          ;
}); 
gulp.task('trunk2', function () {
    return gulp.src('./cordova-hcp.json')
          .pipe(replace('"content_url":"http://'+getLocalIP()+':8100/"', '"content_url":"https://www.he-pai.cn/app/www/"'))
          .pipe(replace('"content_url":"http://10.10.16.23:9100/www/"', '"content_url":"https://www.he-pai.cn/app/www/"'))
          .pipe(gulp.dest('./'))
          ;
});
//--------------布置测试任务  end-------------//

// 注册缺省任务
gulp.task('default', [  'index']);

