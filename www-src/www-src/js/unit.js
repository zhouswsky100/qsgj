angular.module('starter.unit', [])
//统一提示弹出
.factory('tip',function($ionicLoading,$timeout,$cordovaToast){
  return function(text,callback){
    $cordovaToast.show(text,'short','center')
    .then(function(success) {  
      callback&&callback(); 
    });
  }
})
//生成请求流水号
.factory('req',function($ionicHistory,$ionicPlatform,$cordovaAppVersion,$cordovaDevice,$cordovaSQLite,$q,$state,$stateParams,$rootScope){   
    var deviceInformation = ionic.Platform.device();
    var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();
    var currentPlatform = ionic.Platform.platform();
    var currentPlatformVersion = ionic.Platform.version();
    return {
      MethodCode:function(MethodCode){
        return MethodCode+"";
      },
      //获取请求时间
      time:function(){
        var yyyy=(new Date()).getFullYear()+"";
        var MM=(new Date()).getMonth()+1;
        var dd=(new Date()).getDate();
        var hh=(new Date()).getHours()<10?("0"+(new Date()).getHours()):(new Date()).getHours();
        var mm=(new Date()).getMinutes()<10?("0"+(new Date()).getMinutes()):(new Date()).getMinutes();
        var ss=(new Date()).getSeconds()<10?("0"+(new Date()).getSeconds()):(new Date()).getSeconds();
        return yyyy+MM+dd+hh+mm+ss;
      },
      //获取请求流水号
      id:function(){
         var XXXX= isIOS?"IPHONE":(isAndroid?"ANDROID":"");//设备名称的缩写
         var yyyy=(new Date()).getFullYear();
         var mm=(new Date()).getMonth();
         var dd=(new Date()).getDate();
         var random8=function(){
          var result="",data=["0","1","2","3","4","5","6","7","8","9"];
          for(var i=0;i<8;i++){ //产生8位就使i<8
            r=Math.floor(Math.random()*10); //10为数组里面数据的数量，目的是以此当下标取数组data里的值！ 
            result+=data[r]; //输出8次随机数的同时，让r加8次，就是8位的随机字符串了。 
          } 
          return result;
         };
         return XXXX+yyyy+mm+dd+random8();
      },
       //MVER手机系统版本
      MVER:function(){
        return currentPlatformVersion+"";
      },
      //MTYPE客户端类型
      MTYPE:function(){
        return isIOS?"3":(isAndroid?"1":"");
      },
      
      //计算日期
     addDay: function(dataStr,dayCount) {
    	 	var strdate=dataStr; //日期字符串
    	    var isdate = new Date(strdate.replace(/-/g,"/"));  //把日期字符串转换成日期格式
    	    isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
    	    var mon =  (isdate.getMonth()+1);
    	    if(mon<10) mon ='0'+mon;
    	    var pdate = isdate.getFullYear()+"-"+mon+"-"+(isdate.getDate());   //把日期格式转换成字符串
    	    return pdate;
      },
      //时间差
      day: function(date1,date2){
    	    var oDate1 = new Date(date1);
    	    var oDate2 = new Date(date2);
    	    if(oDate1.getTime() <= oDate2.getTime()){
    	       return true ;
    	    } else {
    	       return false ;    	
    	   }
      },
      /** 
       * 计算两日期时间差 
       *  interval 计算类型：D是按照天、H是按照小时、M是按照分钟、S是按照秒、T是按照毫秒 
       *  date1 起始日期  格式为年月格式 为2012-06-20 
       *  date2 结束日期 
       * 
       */
      countTimeLength: function(interval, date1, date2) {  
    	    var objInterval = {'D' : 1000 * 60 * 60 * 24, 'H' : 1000 * 60 * 60, 'M' : 1000 * 60, 'S' : 1000, 'T' : 1};  
    	    interval = interval.toUpperCase();  
    	    var dt1 = Date.parse(date1.replace(/-/g, "/"));  
    	    var dt2 = Date.parse(date2.replace(/-/g, "/"));  
    	    try{  
    	        return ((dt2 - dt1) / objInterval[interval]).toFixed(2);//保留两位小数点  
    	    }catch (e){  
    	        return e.message;  
    	    }  
    	},
      //生成签名信息
      //bodyInfo:为body请求json信息对象
      //signKey:加密密钥
      signInfo:function(bodyInfo,signKey){
        var keyArr=[];
		//signKey丢失时返回登录
    		if($rootScope.logined == '1' && (signKey==''||signKey==null||signKey==undefined)){
    			 $state.go("login");
    		}
        for(var key in bodyInfo){
          keyArr.push(key);
        }
        keyArr.sort();
        var valStr="";
        for(var i=0;i<keyArr.length;i++){
          if(bodyInfo[keyArr[i]]!==""){//过滤非空的值
            valStr+=bodyInfo[keyArr[i]];
          }
        }
        return MD5.hex(MD5.hex(valStr).toUpperCase()+signKey).toUpperCase();
      },
      deviceInfo:function(){
        var deferred= $q.defer();
        var deferredInfo={
          "signKey":"",//签名密钥
          "sessionId":"",//登录sessionId
          "APPID":"",
          "APPVER":"",
          "imei":"",
          "PMODEL":"",
          "PBRAND":"",
          "chid":$rootScope.chid,
          "msgFlg":false
        }
        $ionicPlatform.ready(function() {
           var db="";
           if (window.cordova) {//手机设备
              db = $cordovaSQLite.openDB({ name:"hpApp.db",iosDatabaseLocation:'default'});
           }
           else{//浏览器
              db = window.openDatabase("hpApp.db", '1', 'my', 1024 * 1024 * 100);
           }
           $cordovaAppVersion.getVersionCode().then(function (build) {
              deferredInfo.APPID=build+"";
              $cordovaAppVersion.getVersionNumber().then(function (version) {
                  deferredInfo.APPVER="V"+version;
                  deferredInfo.imei=$cordovaDevice.getUUID()+"";//uuid替代imei标识做设备唯一标识用;
                  deferredInfo.PMODEL=$cordovaDevice.getModel().split(" ")[1]+"";
                  deferredInfo.PBRAND=$cordovaDevice.getModel().split(" ")[0]+"";
                  $cordovaSQLite.execute(db, "SELECT sessionId FROM loginInfo").then(function(res) {
                    deferredInfo.sessionId=res.rows.length > 0?res.rows.item(0).sessionId:"";
                    $cordovaSQLite.execute(db, "SELECT signKey FROM loginInfo").then(function(res) {
                      deferredInfo.signKey=(res.rows.length > 0?res.rows.item(0).signKey:"");
                      deferred.resolve(deferredInfo);
                    }, function (err) {
                      deferred.resolve(deferredInfo);
                    });
                  }, function (err) {
                    deferred.resolve(deferredInfo);
                  });
              });
           });
        })
        return deferred.promise;
      }
    }
})
//处理ajax数据结果处理
.factory('_responseData',function(tip,state){
  return function(data,callback){
    if(data.returnCode == '0' || data.returnCode == '1'){
      callback&&callback();
    }else if(data.returnCode == "999"){
      tip("您的账号在其他设备登录",function(){
        //$location.path('/login');
        state.go("login");
      });
    } else {
      tip(data.returnMsg);
    }
  }
})
//视图跳转
.factory('state',function($ionicHistory,$state,$stateParams,$q,$timeout,$rootScope,sqLiteLoginInfo){
  return {
    /*
    stateName：状态名称
    第一个参数是statename状态名
    如果只有2个参数，第二个参数是对象的话就是stateParams，如果是boolen类型，那么第二个参数就是disableBack
    如果有3个参数，第二个参数是对象的话就是stateParams，第三个参数就是disableBack
    */
    go:function(){
      var stateName = arguments[0];
      var stateParams={},disableBack=false;
      if(arguments.length=2){
         if (typeof arguments[1] == "object"){
            stateParams=arguments[1];
         }else if(typeof arguments[1] == "boolean"){
            disableBack=arguments[1];
         }
      }
      if(arguments.length=3 && typeof arguments[1] == "object" && typeof arguments[2] == "boolean")
      {
          stateParams=arguments[1];
          disableBack=arguments[2];
      }
      // go 的时候
      var backHistoryId = $ionicHistory && $ionicHistory.currentHistoryId();
      var backViewId = $ionicHistory && $ionicHistory.currentView() && $ionicHistory.currentView().viewId;
      $ionicHistory.nextViewOptions({
        disableBack: disableBack
      });




      var loginname=[
          'tab.investHly',
          'tab.invest', 
          'tab.,',   
          'tab.assetStatistics',    
          'tab.capitalFlow',       
          'investTickets',
          'tab.accountM',
          'tab.assetStatistics',          
          'tab.updateLoginPwd',   
          'tab.updateTradePwd',  
          'tab.resetTradePwd',    
          'tab.resetTradePwdContent', 
          'tab.updatePhn',  
          'tab.updatePhnStep2',
          'withdraw ',             
          'withdrawFee', 
          'withdrawIptPwd',
          'quickPayment',  
          'wechatPayment', 
          'tab.myInvest',
          'tab.myInvestNew', 
          'tab.investDetail',
          'login',   
          'record',  
          'recordInfo',
          'tab.investZzb',
          'tab.myTasks'].join();//需要登录的页面
      //委托
      var deferred= $q.defer();
      //判断是否登录
      var isLogined=function(){
        // sqLiteLoginInfo.getSessionId(function(sid){
        //   console.log("1");
        //   if(sid){
        //      deferred.resolve({logined:1});
        //   }else{
        //     deferred.resolve({logined:0});
        //   }
        // })
        // return deferred.promise;
      }

     // isLogined().then(function(loginInfo){
      
        console.log("当前页面的状态名称："+stateName);
        if(localStorage.token=="undefined"||localStorage.token==''||localStorage.token==null){
          //未登录
          if(loginname.indexOf(stateName)>=0){
            $state.go("login"); 
          }else{
            $state.go(stateName, stateParams);
          }
        }else if(localStorage.token!="undefined"||localStorage.token!=''||localStorage.token!=null){
           $state.go(stateName, stateParams);
        }
     // });
      
      
    },
    back:function(){
      // back 的时候
      var backHistoryId = $ionicHistory.currentHistoryId();
      var backViewId = $ionicHistory.currentView().viewId;
      var backView = $ionicHistory.viewHistory().histories[backHistoryId].stack.filter(function (v) {
        return v.stateId === $stateParams.backViewId;
      })[0];
      $ionicHistory.backView(backView);
      $ionicHistory.goBack();
    }
  }
})
//滚动加载列表方法
.factory('scrollList',function(){
  var scrollList=[];
  return {
    getAll:function(){
      return scrollList;
    },
    //append必须为数组
    add:function(append){
      scrollList = scrollList.concat(append);
      return scrollList;
    },
    init:function(){
      scrollList = [];
      return this;
    }
  }
})
//一些公共函数
.factory('commonFunction',function(){
  return {
    /*base64加密*/
    base64encode:function(str){
      var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
      var out, i, len;  
      var c1, c2, c3;  
      len = str.length;  
      i = 0;  
      out = "";  
      while (i < len) {  
          c1 = str.charCodeAt(i++) & 0xff;  
          if (i == len) {  
              out += base64EncodeChars.charAt(c1 >> 2);  
              out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
              out += "==";  
              break;  
          }  
          c2 = str.charCodeAt(i++);  
          if (i == len) {  
              out += base64EncodeChars.charAt(c1 >> 2);  
              out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
              out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
              out += "=";  
              break;  
          }  
          c3 = str.charCodeAt(i++);  
          out += base64EncodeChars.charAt(c1 >> 2);  
          out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
          out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
          out += base64EncodeChars.charAt(c3 & 0x3F);  
      }  
      return out;        
    },
    /*utf16转utf8 */
    utf16to8:function(str){
      var out, i, len, c;  
      out = "";  
      len = str.length;  
      for (i = 0; i < len; i++) {  
          c = str.charCodeAt(i);  
          if ((c >= 0x0001) && (c <= 0x007F)) {  
              out += str.charAt(i);  
          }  
          else   
              if (c > 0x07FF) {  
                  out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
                  out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
                  out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
              }  
              else {  
                  out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
                  out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
              }  
      }  
      return out;       
    },
    /*获取字符串长度，支持中文*/
    getRealLength:function(str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128){
              realLength += 1;
            }else{
              realLength += 2;
            } 
        }
        return realLength;
    },
    /*截取字符串，支持中文*/
    subRealString:function(str, limiteLen) {  
        var realLength = 0,len = str.length,s = "",charCode = -1;  
        for (var i = 0; i < len; i++) { 
          charCode = str.charCodeAt(i); 
            if (charCode >= 0 && charCode <= 128){
                realLength += 1;
            }else{
                realLength += 2;
            } 
            s += str.charAt(i);  
            if (realLength >= limiteLen) {  
                return s+"...";  
            }  
        }  
        return s;  
    }
  }
})
//极光推送
.factory('jpushService', function() {
  var push;
  return {
    setBadge: function(badge) {
      if (push) {
        console.log('jpush: set badge', badge);
        plugins.jPushPlugin.reSetBadge();
        plugins.jPushPlugin.setBadge(badge);
      }
    },
    setAlias: function(alias) {
      if (push) {
        plugins.jPushPlugin.setAlias(alias)
      }
    },
    check: function() {
      if (window.jpush && push) {
        plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
        window.jpush = null;
      }
    },
    init: function(notificationCallback) {
      push = window.plugins && window.plugins.jPushPlugin;
      if (push) {
        console.log('jpush: init');
        plugins.jPushPlugin.init();
        plugins.jPushPlugin.setDebugMode(true);
        document.addEventListener("jpush.openNotification", notificationCallback, false);
      }
    }
  };
})

//获取用户基本信息
.factory('baseInfo', function($http,$rootScope, reqRoot, req, tip) {
  return function(callback) {
    req.deviceInfo().then(function(deviceInfo){
      $rootScope.loadingShow();
      $http.post(reqRoot, {
        "id": req.id(),
        "MethodCode":req.MethodCode("LM007"),
        "time":req.time(),
        "signInfo":req.signInfo({
          "sessionId" : deviceInfo.sessionId
        }, deviceInfo.signKey),
        "imei":deviceInfo.imei,//手机唯一标识
        "APPID":deviceInfo.APPID,//客户端id
        "APPVER":deviceInfo.APPVER,//客户端版本
        "MVER":req.MVER(),//手机系统版本
        "MTYPE":req.MTYPE(),//客户端类型
        "PMODEL":deviceInfo.PMODEL,//机型
        "PBRAND":deviceInfo.PBRAND,//手机品牌
        "chid":deviceInfo.chid,//推广渠道号
        "body": {
          "sessionId" : deviceInfo.sessionId
        }
      }).success(function(data){
        $rootScope.loadingHide();
        if(data.returnCode == '1') {
          callback(data.body[0]);
        } else {
          tip(data.returnMsg);
        }
      }).error(function (error) {
        tip("网络忙，请稍后再试……");
      });
    });
  }
})

//存储需要多级返回的页面stateName以及需要返回的级数
.factory('backMore', function() {
  return {
    'tab.investSuccess': -3,//投资成功页面返回到投资列表
    'tab.resetTradePwdContent': -2//重新设置交易密码之后返回到密码管理页面
  }
})

.filter("formatMoney",function(){
    return function(num,step){
        var out = Math.ceil(num*100)*1.0/100;
        return out;
    }
})
.filter("formatMoneyFloor",function(){//金额保留2位小数并向下取整
    return function(num){
        var out = Math.floor(num*10000/100)*1.0/100;
        return out;
    }
})
.filter("formatMoneyRound",function(){//金额四舍五入
    return function(num){
        var out = Math.round(num*10000/100)*1.0/100;
        return out;
    }
})
.filter("memberCenterMoneyFormat", function() {
  function formatMoney(s, n) {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }
  return function(value) {
    if(value == '') {
      value = 0;
    }
    if(value >= 100000) {
      value = parseFloat(value / 10000);
      return formatMoney(value,2) + '万';
    }
    return formatMoney(value,2);
  }
})
//手机号中间用*号隐藏
.filter("formatMoblie",function(){
  return function(phone){
    if(phone && Object.prototype.toString.call(phone) === "[object String]" && phone != ''){
      return phone.substring(0,3)+'****'+phone.substring(phone.length-4,phone.length);
    }else{
      return '';
    }
  }
})
//真实姓名结尾用*号隐藏
.filter("frormatRelNm",function(){
  return function(name){
    if(name && Object.prototype.toString.call(name) === "[object String]" && name != ''){
      if(name.length == 2){
          return name.substring(0,1)+'*';
      }else{
          return name.substring(0,1)+'**';
      }
    }else{
      return '';
    }
  }
})
 //身份证号中间用*号隐藏
.filter("formatIdNo",function(){
  return function(idNo){
    if(idNo && Object.prototype.toString.call(idNo) === "[object String]" && idNo != ''){
      return idNo.substring(0,4)+'********'+idNo.substring(idNo.length-4,idNo.length);
    }else{
      return '';
    }
  }
})
 //银行卡号中间用*号隐藏
.filter("formatCardNo",function(){
  return function(cardNo){
    if(cardNo && Object.prototype.toString.call(cardNo) === "[object String]" && cardNo != ''){
      return cardNo.substring(0,4)+' **** **** '+cardNo.substring(cardNo.length-4,cardNo.length);
    }else{
      return '';
    }
  }
})
.filter("passwordFormat",function(){
  return function(num){
    if(num && Object.prototype.toString.call(num) === "[object String]" && num != ''){
      return num.replace(/./g,'·');
    }else{
      return '';
    }
  }
})
;
