var run = require('gulp-run');
var path = require('path');
var fs=require('fs');
var cordovaHcpPath= path.resolve('cordova-hcp.json');
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
var arguments = process.argv.splice(2)[0];//读取命令行后面的参数

var cordovaHcpTxt='';
if(arguments=="dev"){
   cordovaHcpTxt='{  "update": "start", "content_url":"http://'+getLocalIP()+':8100/"}';
   fs.writeFile(cordovaHcpPath,cordovaHcpTxt,function(err){
      if(err){return;}
      var cmd = new run.Command('gulp reset reset1 ');  
      cmd.exec(); 
    });
}else if(arguments=="test"){
    cordovaHcpTxt='{  "update": "start", "content_url":"https://www.he-pai.cn/app/www/"}';
    fs.writeFile(cordovaHcpPath,cordovaHcpTxt,function(err){
      if(err){return;}
      var cmd = new run.Command('gulp test test1 test2 ');  
      cmd.exec();
    });
}else if(arguments=="pro"){
   cordovaHcpTxt='{  "update": "start", "content_url":"https://www.he-pai.cn/app/www/"}';
   fs.writeFile(cordovaHcpPath,cordovaHcpTxt,function(err){
      if(err){return;}
      var cmd = new run.Command('gulp pro pro1 imagemin index index1 index2 ');  
      cmd.exec();
   });
}else if(arguments=="trunk"){
   cordovaHcpTxt='{  "update": "start", "content_url":"https://www.he-pai.cn/app/www/"}';
   fs.writeFile(cordovaHcpPath,cordovaHcpTxt,function(err){
      if(err){return;}
      var cmd = new run.Command('gulp trunk trunk1 trunk2  trunk3 trunk4');  
      cmd.exec();
   });
}



