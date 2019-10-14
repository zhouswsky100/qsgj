angular.module('starter.services', [])
//.constant('reqRoot','http://10.10.160.57:8000/mobileserver/api/newCall.do')//统一请求地址接口 正式http://10.10.16.75:6060/api/newCall.do
//.constant('reqRoot','http://10.10.27.15:8087/mobileserver-provider/api/newCall.do')
//.constant('reqRoot','http://10.10.160.11:8080/mobileserver/api/newCall.do')
//.constant('reqRoot','http://10.10.27.15:8087/mobileserver-provider/api/newCall.do')
//.constant('reqRoot','http://10.10.160.11:8080/mobileserver/api/newCall.do')
//.constant('reqRoot','http://10.10.27.86:8080/mobileserver/api/newCall.do')
//.constant('reqRoot','http://10.10.160.57:8000/mobileserver/api/newCall.do')
.factory ('sqLiteLoginInfo', function ($ionicPlatform,$cordovaSQLite,$window,$ionicPopup,$rootScope,$http,reqRoot,req,tip){
  var db;
  return {
      //初始化数据库
      initDb:function(){
       $ionicPlatform.ready(function() {
         if (window.cordova) {//手机设备
            db = $cordovaSQLite.openDB({ name:"hpApp.db",iosDatabaseLocation:'default'});
         }
         else{//浏览器
            db = window.openDatabase("hpApp.db", '1', 'my', 1024 * 1024 * 100);
         }
         //创建存储用户登录信息表，控制登录状态权限
         //$cordovaSQLite.execute(db, "drop table loginInfo");//测试时用
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS loginInfo (id integer primary key, sessionId text, signKey text , gesturePwd text , gesturePwdTime text , gesturePwdErrorTime text)");
         //创建存储用户关键信息
         //$cordovaSQLite.execute(db, "drop table userInfo");//测试时用
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS userInfo (id integer primary key, ciNo text ,ciNm text, ciType text , idType text ,idNo text, petNm text,auhStsBit text,busLmt text,photo text,mbPhn text,email text,prsCd text,rcmCd text,ciRelNm text,isSetTradePwd text,isApplyCert text,isSignCertAuth text,isNrd text,canToNrd text)");

         $cordovaSQLite.execute(db, "SELECT * FROM loginInfo ").then(function(res){
            if(res.rows.length == 0){
              $cordovaSQLite.execute(db, "INSERT INTO loginInfo (sessionId, signKey,gesturePwd,gesturePwdTime,gesturePwdErrorTime) VALUES (?,?,?,?,?)", ["","","","",""]).then(function(res) {
              }, function (err) {
                  tip(err);
              });
            }
         });
         $cordovaSQLite.execute(db, "SELECT * FROM userInfo ").then(function(res){
            if(res.rows.length == 0){
              $cordovaSQLite.execute(db, "INSERT INTO userInfo (ciNo,ciNm,ciType,idType,idNo,petNm,auhStsBit,busLmt,photo,mbPhn,email,prsCd,rcmCd,ciRelNm,isSetTradePwd,isApplyCert,isSignCertAuth,isNrd,canToNrd) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", ["","","","","","","","","","","","","","","","","","",""])
              .then(function(res) {},
              function (err) {
                tip(err);
              });
            }
         });
        });
      },
      //获取登录用户sessionId
      //callback：接收返回的相应结果值
      getSessionId:function(callBack){
        $ionicPlatform.ready(function() {
          var query = "SELECT sessionId FROM loginInfo";
          $cordovaSQLite.execute(db, query).then(function(res) {
                callBack&&callBack(res.rows.length > 0?res.rows.item(0).sessionId:"");
          }, function (err) {
               tip(err);
          });
        });
      },
      //获取登录用户signKey
      //callback：接收返回的相应结果值
      getSignKey:function(callBack){
        $ionicPlatform.ready(function() {
          var query = "SELECT signKey FROM loginInfo";
          $cordovaSQLite.execute(db, query).then(function(res) {
              callBack&&callBack(res.rows.length > 0?res.rows.item(0).signKey:"");
          }, function (err) {
               tip(err);
          });
        });
      },
      //获取登录用户手势密码 gesturePwd
      //callback：接收返回的相应结果值
      getGesturePwd:function(callBack){
        $ionicPlatform.ready(function() {
          var query = "SELECT gesturePwd FROM loginInfo";
          $cordovaSQLite.execute(db, query).then(function(res) {
              callBack&&callBack(res.rows.length > 0?res.rows.item(0).gesturePwd:"");
          }, function (err) {
               tip(err);
          });
        });
      },
      //获取登录用户手势密码错误次数 gesturePwdErrorTime
      //callback：接收返回的相应结果值
      getGesturePwdErrorTime:function(callBack){
        $ionicPlatform.ready(function() {
          var query = "SELECT gesturePwdErrorTime FROM loginInfo";
          $cordovaSQLite.execute(db, query).then(function(res) {
              callBack&&callBack(res.rows.length > 0?res.rows.item(0).gesturePwdErrorTime:"");
          }, function (err) {
               tip(err);
          });
        });
      },
      //获取登录用户手势密码设置时间 gesturePwdTime
      //callback：接收返回的相应结果值
      getGesturePwdTime:function(callBack){
        $ionicPlatform.ready(function() {
          var query = "SELECT gesturePwdTime FROM loginInfo";
          $cordovaSQLite.execute(db, query).then(function(res) {
              callBack&&callBack(res.rows.length > 0?res.rows.item(0).gesturePwdTime:"");
          }, function (err) {
               tip(err);
          });
        });
      },
      //设置登录用户手势密码 gesturePwd
      setGesturePwd:function(pwd,callBack){
        $ionicPlatform.ready(function() {
          $cordovaSQLite.execute(db, "update  loginInfo set gesturePwd=?",[pwd]).then(function(res) {
              callBack&&callBack();
          }, function (err) {
               tip(err);
          });
        });
      },
       //设置登录用户手势密码错误次数 gesturePwdErrorTime
      //callback：接收返回的相应结果值
      setGesturePwdErrorTime:function(times,callBack){
        $ionicPlatform.ready(function() {
          $cordovaSQLite.execute(db, "update  loginInfo set gesturePwdErrorTime=?",[times]).then(function(res) {
              callBack&&callBack();
          }, function (err) {
               tip(err);
          });
        });
      },
      //设置用户手势密码时间 setGesturePwdTime
      setGesturePwdTime:function(time,callBack){
        $ionicPlatform.ready(function() {
          $cordovaSQLite.execute(db, "update  loginInfo set gesturePwdTime=?",[time]).then(function(res) {
              callBack&&callBack();
          }, function (err) {
               tip(err);
          });
        });
      },
      //用户登录信息录入
      //callback：执行成功的回调
      login:function(data,callBack){
          $ionicPlatform.ready(function() {
           // data.body[0]["sessionId"],["signKey"]
           var sessionId=data.sessionId||"",
            signKey=data.signKey||"",
            ciNo=data.ciNo||"",
            ciNm=data.ciNm||"",
            ciType=data.ciType||"",
            idType=data.idType||"",
            idNo=data.idNo||"",
            petNm=data.petNm,
            auhStsBit=data.auhStsBit||"",
            busLmt=data.busLmt||"",
            photo=data.photo||"",
            mbPhn=data.mbPhn||"",
            email=data.email||"",
            prsCd=data.prsCd||"",
            rcmCd=data.rcmCd,
            ciRelNm=data.ciRelNm||"",
            isSetTradePwd=data.isSetTradePwd||"",
            isApplyCert=data.isApplyCert||"",
            isSignCertAuth=data.isSignCertAuth||"",
            isNrd=data.isNrd||"",
            canToNrd=data.canToNrd||"";
            //存储用户登录信息
            $cordovaSQLite.execute(db, "update loginInfo set sessionId = ? , signKey = ?", [sessionId, signKey]).then(function(res) {
              $rootScope.logined=1;
              //存储用户关键信息
              $cordovaSQLite.execute(db, "update userInfo set ciNo = ?,ciNm = ?,ciType = ?,idType = ?,idNo = ?,petNm = ?,auhStsBit = ?,busLmt = ?,photo = ?,mbPhn = ?,email = ?,prsCd = ?,rcmCd = ?,ciRelNm = ?,isSetTradePwd = ?,isApplyCert = ?,isSignCertAuth = ?,isNrd = ?,canToNrd = ?", [ciNo,ciNm,ciType,idType,idNo,petNm,auhStsBit,busLmt,photo,mbPhn,email,prsCd,rcmCd,ciRelNm,isSetTradePwd,isApplyCert,isSignCertAuth,isNrd,canToNrd]).then(function(res) {
                 callBack&&callBack();
              }, function (err) {
                  tip(err);
              });
            }, function (err) {
               tip(err);
            });
          });
      },
      //登出
      exitLogin:function(callback){
        $ionicPlatform.ready(function() {
          req.deviceInfo().then(function(deviceInfo){
            $http.post(reqRoot, {
              "id": req.id(),
              "MethodCode":req.MethodCode("AUM008"),
              "signInfo":req.signInfo({
                "sessionId": deviceInfo.sessionId
              }, deviceInfo.signKey),
              "time":req.time(),
              "imei":deviceInfo.imei,//手机唯一标识
              "APPID":deviceInfo.APPID,//客户端id
              "APPVER":deviceInfo.APPVER,//客户端版本
              "MVER":req.MVER(),//手机系统版本
              "MTYPE":req.MTYPE(),//客户端类型
              "PMODEL":deviceInfo.PMODEL,//机型
              "PBRAND":deviceInfo.PBRAND,//手机品牌
              "chid":deviceInfo.chid,//推广渠道号
              "body": {
                "sessionId":deviceInfo.sessionId
              }
            }).success(function(data){
              if(data.returnCode=='0'){
                $cordovaSQLite.execute(db, 'update loginInfo set sessionId = "", signKey = "", gesturePwd = "", gesturePwdTime = ""').then(function(res){
                    $rootScope.logined=0;
                    //存储用户关键信息
                    $cordovaSQLite.execute(db, "update userInfo set ciNo = ?,ciNm = ?,ciType = ?,idType = ?,idNo = ?,petNm = ?,auhStsBit = ?,busLmt = ?,photo = ?,mbPhn = ?,email = ?,prsCd = ?,rcmCd = ?,ciRelNm = ?,isSetTradePwd = ?,isApplyCert = ?,isSignCertAuth = ?,isNrd = ?,canToNrd = ?", ["","","","","","","","","","","","","","","","","","",""]).then(function(res) {
                        tip("退出成功",function(){
                          callback&&callback();
                          localStorage.setItem('fromNrdtoMain', '0');
                          localStorage.isFirstLogined = '0'; //0代表第一次登陆
                          localStorage.removeItem('userInfoMsg'); //退出的时候清空之前存储的用户信息
                        });
                    }, function (err) {
                        tip("退出失败");
                    });
                },function(err){
                  tip("退出失败");
                });
              }else{
                tip(data.returnMsg);
              }
            }).error(function (error) {
               tip("退出失败！");
            })
          })
        })
      },
      //合富退出不要提示
      hfExitLogin:function(callback){
        $ionicPlatform.ready(function() {
          req.deviceInfo().then(function(deviceInfo){
            $http.post(reqRoot, {
              "id": req.id(),
              "MethodCode":req.MethodCode("AUM008"),
              "signInfo":req.signInfo({
                "sessionId": deviceInfo.sessionId
              }, deviceInfo.signKey),
              "time":req.time(),
              "imei":deviceInfo.imei,//手机唯一标识
              "APPID":deviceInfo.APPID,//客户端id
              "APPVER":deviceInfo.APPVER,//客户端版本
              "MVER":req.MVER(),//手机系统版本
              "MTYPE":req.MTYPE(),//客户端类型
              "PMODEL":deviceInfo.PMODEL,//机型
              "PBRAND":deviceInfo.PBRAND,//手机品牌
              "chid":deviceInfo.chid,//推广渠道号
              "body": {
                "sessionId":deviceInfo.sessionId
              }
            }).success(function(data){
              if(data.returnCode=='0'){
                $cordovaSQLite.execute(db, 'update loginInfo set sessionId = "", signKey = "", gesturePwd = "", gesturePwdTime = ""').then(function(res){
                    $rootScope.logined=0;
                    //存储用户关键信息
                    $cordovaSQLite.execute(db, "update userInfo set ciNo = ?,ciNm = ?,ciType = ?,idType = ?,idNo = ?,petNm = ?,auhStsBit = ?,busLmt = ?,photo = ?,mbPhn = ?,email = ?,prsCd = ?,rcmCd = ?,ciRelNm = ?,isSetTradePwd = ?,isApplyCert = ?,isSignCertAuth = ?,isNrd = ?,canToNrd = ?", ["","","","","","","","","","","","","","","","","","",""]).then(function(res) {
                        /*tip("退出成功",function(){
                          callback&&callback();
                        });*/
                        callback&&callback();
                    }, function (err) {
                       // tip("退出失败");
                    });
                },function(err){
                 // tip("退出失败");
                });
              }else{
                //tip(data.returnMsg);
              }
            }).error(function (error) {
               //tip("退出失败！");
            })
          })
        })
      },
      //用户信息表操作
      userInfo:(function(){
        return {
          get:function(callBack){
            $ionicPlatform.ready(function() {
              var userInfo={'ciNo':'','ciNm':'','ciType':'','idType':'','idNo':'','petNm':'','auhStsBit':'','busLmt':'','photo':'','mbPhn':'','email':'','prsCd':'','rcmCd':'','ciRelNm':'','isSetTradePwd':'','isApplyCert':'','isSignCertAuth':'','isNrd':'','canToNrd':''}
              $cordovaSQLite.execute(db, "SELECT * FROM userInfo").then(function(res) {
                  userInfo.ciNo=res.rows.length > 0?res.rows.item(0).ciNo:"";
                  userInfo.ciNm=res.rows.length > 0?res.rows.item(0).ciNm:"";
                  userInfo.ciType=res.rows.length > 0?res.rows.item(0).ciType:"";
                  userInfo.idType=res.rows.length > 0?res.rows.item(0).idType:"";
                  userInfo.idNo=res.rows.length > 0?res.rows.item(0).idNo:"";
                  userInfo.petNm=res.rows.length > 0?res.rows.item(0).petNm:"";
                  userInfo.auhStsBit=res.rows.length > 0?res.rows.item(0).auhStsBit:"";
                  userInfo.busLmt=res.rows.length > 0?res.rows.item(0).busLmt:"";
                  userInfo.photo=res.rows.length > 0?res.rows.item(0).photo:"";
                  userInfo.mbPhn=res.rows.length > 0?res.rows.item(0).mbPhn:"";
                  userInfo.email=res.rows.length > 0?res.rows.item(0).email:"";
                  userInfo.prsCd=res.rows.length > 0?res.rows.item(0).prsCd:"";
                  userInfo.rcmCd=res.rows.length > 0?res.rows.item(0).rcmCd:"";
                  userInfo.ciRelNm=res.rows.length > 0?res.rows.item(0).ciRelNm:"";
                  userInfo.isSetTradePwd=res.rows.length > 0?res.rows.item(0).isSetTradePwd:"";
                  userInfo.isApplyCert=res.rows.length > 0?res.rows.item(0).isApplyCert:"";
                  userInfo.isSignCertAuth=res.rows.length > 0?res.rows.item(0).isSignCertAuth:"";
                  userInfo.isNrd=res.rows.length > 0?res.rows.item(0).isNrd:"";
                  userInfo.canToNrd=res.rows.length > 0?res.rows.item(0).canToNrd:"";
                  callBack&&callBack(userInfo);
              }, function (err) {
                   tip('获取用户信息');
              });
            });
          },
          set:function(data,callBack){
            $ionicPlatform.ready(function() {
              var ciNo=data.ciNo,ciNm=data.ciNm,ciType=data.ciType,idType=data.idType,idNo=data.idNo,petNm=data.petNm,auhStsBit=data.auhStsBit,busLmt=data.busLmt,photo=data.photo,mbPhn=data.mbPhn,email=data.email,prsCd=data.prsCd,rcmCd=data.rcmCd,ciRelNm=data.ciRelNm,isSetTradePwd=data.isSetTradePwd,isApplyCert=data.isApplyCert,isSignCertAuth=data.isSignCertAuth,isNrd=data.isNrd,canToNrd=data.canToNrd;
              //修改存储用户关键信息
              $cordovaSQLite.execute(db, "update userInfo set ciNo = ?, ciNm = ?,ciType = ?,idType = ?,idNo = ?,petNm = ?,auhStsBit = ?,busLmt = ?,photo = ?,mbPhn = ?,email = ?,prsCd = ?,rcmCd = ?,ciRelNm = ?,isSetTradePwd = ?,isApplyCert = ?,isSignCertAuth = ?,isNrd = ?,canToNrd = ?", [ciNo,ciNm,ciType,idType,idNo,petNm,auhStsBit,busLmt,photo,mbPhn,email,prsCd,rcmCd,ciRelNm,isSetTradePwd,isApplyCert,isSignCertAuth,isNrd,canToNrd]).then(function(res) {
                 callBack&&callBack();
              }, function (err) {
                  $ionicPopup.alert({
                   title: '用户数据录入',
                   template: err,
                   okText:"确定"
                 });
              });
            });
          }
        }
      })(),
      //清空数据库表
      clear:function(){
        $ionicPlatform.ready(function() {
          $cordovaSQLite.execute(db, "drop table loginInfo");
          $cordovaSQLite.execute(db, "drop table userInfo");
        });
      }
  }
})
//BidDetailCtrl和ProjectDetailCtrl这2个控制器公用数据
.factory('projectDetail',function(){
  var projectDetailList=[];
  return {
    all:function(){
      return projectDetailList;
    },
    //append必须为数组
    add:function(append){
      projectDetailList = projectDetailList.concat(append);
      return projectDetailList;
    },
    init:function(){
      projectDetailList = [];
      return this;
    }
   }
})
//WithdrawCtrl、RecordCtrl和RecordQueryCtrl公用，存储RecordCtrl页面的查询参数
.factory('RecordQuery',function(){
  var RecordQueryObj={
     doQuery : false,//进入record页面时，是否执行query，而不是用缓存
     query : { //查询条件对象
      sessionId : "",
      type : "0",
      paySts : null,
      timeStart : null,
      timeEnd : null,
      rmk : null,
      pageNo : "1" ,
      pageSize : "10"
    }
  };

  return {
    get:function(){
      return RecordQueryObj;
    },
    //append必须为对象类型
    set:function(obj){
      angular.extend(RecordQueryObj,obj);
      return RecordQueryObj;
    },
    pagePlus : function(){
      RecordQueryObj.query.pageNo = parseInt(RecordQueryObj.query.pageNo)+1+'';
      return RecordQueryObj;
    },
    init:function(){
      RecordQueryObj = {
         doQuery : false,
         query : { //查询条件对象
          sessionId : "",
          type : "0",
          paySts : null,
          timeStart : null,
          timeEnd : null,
          rmk : null,
          pageNo : "1" ,
          pageSize : "10"
        }
      };
      return this;
    }
   }
})
//我的合拍首页
.factory('memberCenter',function(){
  return {
    get:function(){

    }
  }
})
//资金流水查询条件
.factory('capitalQuery',function() {
  var query = {
  };
  return {
    query: query,
    clear: function() {
      this.query = {
        timeStart: new Date(new Date().setYear((new Date().getFullYear()-1))),
        timeEnd: new Date()
      };
    }
  }
})
//重置交易密码
.factory('resetTradePwdInfo', function() {
  var info = {
    mbPhn: '',
    ciNm: '',
    smsCode: '',
    ciKey: '',
    id: '',
    ciNo:''
  }

  return {
    info: info,
    clear: function() {
      this.info = {};
    }
  }
})

//投资信息
.factory('investFactory',function(){
  var bidInfo = {
        "lnNm":"",
        "period":0,
        "unit":"",
        "rate":0,
        "investM":0,
        "income":0,
        "isGoRegularPlan": false,
        "extraRate":0
      }
  return {
    setInfo:function(info){
      bidInfo.lnNm = info.lnNm;
      bidInfo.period = info.period;
      bidInfo.unit = info.unit;
      bidInfo.rate = info.rate;
      bidInfo.investM = info.investM;
      bidInfo.income = info.income;
      bidInfo.isGoRegularPlan = info.isGoRegularPlan;
      bidInfo.extraRate = info.extraRate;
    },
    getInfo:function(){
      return bidInfo;
    }
  }
})

//提现信息
.factory('withdrawFactory',function(){
  var withdrawInfo = {
        "withdrawalamount":"0",
        "feeamt":"0",
        "acsts":"",
        "acno":"",
        "prvcd":"",
        "ctycd":"",
        "bchno":"",
        "bchnm":"",
        "isFree":"0",
        "payIntegral":"0",
        "routeCode":"1",
        "branchInfo":"",
      }
  return {
    setInfo:function(info){
      withdrawInfo.withdrawalamount = info.withdrawalamount;
      withdrawInfo.feeamt = info.feeamt;
      withdrawInfo.acsts = info.acsts;
      withdrawInfo.acno = info.acno;
      withdrawInfo.prvcd = info.prvcd;
      withdrawInfo.ctycd = info.ctycd;
      withdrawInfo.bchno = info.bchno;
      withdrawInfo.bchnm = info.bchnm;
      withdrawInfo.isFree = info.isFree;
      withdrawInfo.payIntegral = info.payIntegral;
      withdrawInfo.routeCode = info.routeCode;
      withdrawInfo.branchInfo = info.branchInfo;
    },
    getInfo:function(){
      return withdrawInfo;
    }
  }
})

//提现手续费
.factory('feeFactory',function(){
  var feeInfo = {
    feeamt:0
  };
  return {
    set:function(fee){
      feeInfo.feeamt = fee.fee;
    },
    get:function(){
      return feeInfo;
    }
  }
})
//短信验证码控制
.factory('msgCode',function(){
  var countdown={
    isCount:false
  };
  return countdown;

})

//充值
.factory('reCharge',function($ionicPopup,$timeout,$http,reqRoot,req,state){
    var limits=[  //匹配限额
        {name:"工商银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"农业银行",oneLimit:"50000",dayLimit:"100000"},
        {name:"中国银行",oneLimit:"50000",dayLimit:"100000"},
        {name:"中国建设银行",oneLimit:"50000",dayLimit:"100000"},
        {name:"建设银行",oneLimit:"50000",dayLimit:"100000"},
        {name:"邮政储蓄银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"平安银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"民生银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"光大银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"广发银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"广东发展银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"中信银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"兴业银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"华夏银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"招商银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"浦发银行",oneLimit:"49999",dayLimit:"49999"},
        {name:"交通银行",oneLimit:"50000",dayLimit:"100000"},
        {name:"上海银行",oneLimit:"5000",dayLimit:"5000"}
    ];
    var limitKq=[  //匹配限额
        {name:"工商银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"农业银行",oneLimit:"200000",dayLimit:"500000"},
        {name:"招商银行",oneLimit:"50000",dayLimit:"30000000"},
        {name:"建设银行",oneLimit:"300000",dayLimit:"500000"},
        {name:"中国银行",oneLimit:"50000",dayLimit:"100000"},
        {name:"交通银行",oneLimit:"50000",dayLimit:"70000"},
        {name:"浦发银行",oneLimit:"300000",dayLimit:"300000"},
        {name:"广发银行",oneLimit:"500000",dayLimit:"50000000"},
        {name:"广东发展银行",oneLimit:"500000",dayLimit:"50000000"},
        {name:"民生银行",oneLimit:"5000",dayLimit:"5000"},
        {name:"平安银行",oneLimit:"500000",dayLimit:"50000000"},
        {name:"光大银行",oneLimit:"100000",dayLimit:"50000000"},
        {name:"兴业银行",oneLimit:"50000",dayLimit:"50000000"},
        {name:"中信银行",oneLimit:"500000",dayLimit:"50000000"},
        {name:"华夏银行",oneLimit:"500000",dayLimit:"50000000"},
        {name:"邮政储蓄银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"邮储银行",oneLimit:"50000",dayLimit:"50000"}
    ];
    var limitsll=[  //匹配限额
        {name:"农业银行",oneLimit:"200000",dayLimit:"200000"},
        {name:"交通银行",oneLimit:"200000",dayLimit:"200000"},
        {name:"工商银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"邮政储蓄银行",oneLimit:"5000",dayLimit:"5000"},
        {name:"浦发银行",oneLimit:"50000",dayLimit:"500000"},
        {name:"广发银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"广东发展银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"平安银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"招商银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"民生银行",oneLimit:"500000",dayLimit:"500000"},
        {name:"中国银行",oneLimit:"50000",dayLimit:"500000"},
        {name:"建设银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"中国建设银行",oneLimit:"50000",dayLimit:"200000"},
        {name:"光大银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"兴业银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"中信银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"华夏银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"杭州银行",oneLimit:"50000",dayLimit:"1000000"},
        {name:"北京银行",oneLimit:"50000",dayLimit:"1000000"},
        {name:"浙商银行",oneLimit:"5000",dayLimit:"5000"},
        {name:"上海银行",oneLimit:"5000",dayLimit:"5000"},
        {name:"广州银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"太仓农村商业银行",oneLimit:"50000",dayLimit:"50000"},
        {name:"东莞农商",oneLimit:"500000",dayLimit:"1000000"},
        {name:"广东农信",oneLimit:"500000",dayLimit:"1000000"},
        {name:"广州农商",oneLimit:"500000",dayLimit:"1000000"},
        {name:"深圳农村商业银行",oneLimit:"50000",dayLimit:"1000000"},
        {name:"宁波银行",oneLimit:"500000",dayLimit:"500000"},
        {name:"山东农信社",oneLimit:"500000",dayLimit:"1000000"},
        {name:"江南农村商业银行",oneLimit:"100000",dayLimit:"100000"},
        {name:"吉林省农信社",oneLimit:"200000",dayLimit:"1000000"},
        {name:"甘肃农信社",oneLimit:"50000",dayLimit:"1000000"},
        {name:"江苏银行",oneLimit:"50000",dayLimit:"1000000"},
        {name:"长江商业银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"黑龙江农信社",oneLimit:"500000",dayLimit:"1000000"},
        {name:"恒丰银行",oneLimit:"500000",dayLimit:"1000000"},
        {name:"广东南粤",oneLimit:"50000",dayLimit:"1000000"},
        {name:"东莞银行",oneLimit:"50000",dayLimit:"1000000"},
        {name:"武汉农商行",oneLimit:"500000",dayLimit:"1000000"} 
    ];
    var limitsZjcg=[  //匹配限额
        {name:"工商银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"农业银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"建设银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"兴业银行",oneLimit:"5万",dayLimit:"10万"},
        {name:"光大银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"中信银行",oneLimit:"1000",dayLimit:"1000"},
        {name:"平安银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"民生银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"广发银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"广东发展银行",oneLimit:"10万",dayLimit:"10万"},
        {name:"浦发银行",oneLimit:"2万",dayLimit:"10万"},
        {name:"交通银行",oneLimit:"5万",dayLimit:"10万"}
    ];
    var alertPopup=function(title){
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: '<style>.popup-head{border-bottom: 0px solid #eee;}.popup-body{padding:0}</style>',
            buttons:[]
        });
        $timeout(function() {
            alertPopup.close(); //由于某种原因3秒后关闭弹出
        }, 3000);
    };
    var confirmPopup=function(){
        var confirmPopup = $ionicPopup.confirm({
            title: '请添加银行卡',
            template: '添加银行卡才能使用快捷支付哦！',
            buttons: [
                { text: '取消' },
                {
                    text: '<b>去绑定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        state.go("doing");
                    }
                },
            ]
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('确定');
            } else {
                console.log('取消');
            }
        });
    };

    return {
        limits:function(){  //大额支付限额
          return limits;
        },
        limitKq:function(){  //快钱支付限额
          return limitKq;
        },
        limitsll:function(){  //连连支付限额
            return limitsll;
        },
        limitsZjcg:function(){  //资金存管限额
            return limitsZjcg;
        },
        alertPopup:function(title){  //提示弹出框
            return alertPopup(title);
        },
        confirmPopup:function(){   //确认对话框
            return confirmPopup();
        }
    }
})

.factory('planDetailFactory',function(){
  var planDetailInfo = {
        "ivsAmt":"",
        "rate":"",
        "joinDate":"",
        "exitDate":"",
        "remainAmt":"",
        "waitBackAmt":"",
        "expireAmt":""
      };
  return {
    setInfo:function(info){
      planDetailInfo.ivsAmt = info.ivsAmt;
      planDetailInfo.rate = info.rate;
      planDetailInfo.joinDate = info.joinDate;
      planDetailInfo.exitDate = info.exitDate;
      planDetailInfo.remainAmt = info.remainAmt;
      planDetailInfo.waitBackAmt = info.waitBackAmt;
      planDetailInfo.expireAmt = info.expireAmt;
    },
    getInfo:function(){
      return planDetailInfo;
    }
  };
})
//积分抵扣选择
.factory('withdrawFeeFactory',function($rootScope,$http,$ionicPopup,req,reqRoot,state,tip){ 
  var feeInfo = {
        "feeType":0,
        "deductionType": "",
        "fee":0,
        "isInit":true
      };

  return {
    setInfo:function(info){
      feeInfo.feeType = info.feeType;
      feeInfo.deductionType = info.deductionType;
      feeInfo.fee = info.fee;
      feeInfo.isInit = info.isInit;
    },
    getInfo:function(){
      return feeInfo;
    }
  };
})
//获取可用余额
.factory('balance',function($rootScope,$http,$ionicPopup,req,reqRoot,state,tip){
  var getBalanceValue=function(callback){
    req.deviceInfo().then(function(deviceInfo){
    var jmh=req.signInfo({"sessionId": deviceInfo.sessionId}, deviceInfo.signKey);
    $http.post(reqRoot, {
      "id": req.id(),
      "MethodCode":req.MethodCode("UM071"),
      "time":req.time(),
      "signInfo":req.signInfo({
        "sessionId": deviceInfo.sessionId
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
        "sessionId": deviceInfo.sessionId
      }
    }).success(function(data){
      if(data.returnCode=='1'){
        callback(data.body[0]);
      }
    }).error(function (error) {
      tip("网络忙，请稍后再试……");
    });
  });
  };
  var doBalancevalue=function(){
    $rootScope.isHasValue=true;
    var balanceValue='';
        $rootScope.isHasValue=true;//是否有余额
        getBalanceValue(function(useInfo){
          balanceValue=useInfo.availBal;
          if(balanceValue<1){
            $rootScope.isHasValue=false;
          }
        });
      };
  return {
    doBalancevalue:function(){
      return doBalancevalue();
    }
  };
})

//选择快钱银行卡数据
.factory('kqBankData',function(){
  var kqInfo = {
        "bankName": "",
        "bankNoAfter":"",
        "bankNo":"",
        "oneLimit":"",
        "dayLimit":""
      };
  return {
    setInfo:function(info){
      kqInfo.bankName = info.bankName;
      kqInfo.bankNoAfter = info.bankNoAfter;
      kqInfo.bankNo = info.bankNo;
      kqInfo.oneLimit=info.oneLimit;
      kqInfo.dayLimit=info.dayLimit;
    },
    getInfo:function(){
      return kqInfo;
    }
  };
})

//获取资金存管信息
.factory('zcInfo',function($http,$rootScope,req,reqRoot,tip,_responseData){
  return function(callback){
      req.deviceInfo().then(function(deviceInfo){
        $http.post(reqRoot, {
          "id": req.id(),
          "MethodCode":req.MethodCode("Z011"),
          "signInfo":req.signInfo({
            sessionId : deviceInfo.sessionId,
          }, deviceInfo.signKey),
          "time":req.time(),
          "imei":deviceInfo.imei,//手机唯一标识
          "APPID":deviceInfo.APPID,//客户端id
          "APPVER":deviceInfo.APPVER,//客户端版本
          "MVER":req.MVER(),//手机系统版本
          "MTYPE":req.MTYPE(),//客户端类型
          "PMODEL":deviceInfo.PMODEL,//机型
          "PBRAND":deviceInfo.PBRAND,//手机品牌
          "chid":deviceInfo.chid,//推广渠道号
          "body": {
            sessionId : deviceInfo.sessionId
          }
        }).success(function(data){
          _responseData(data,function(){
            callback(data);
          });
        }).error(function (error) {
          tip("网络忙，请稍后再试……");
        });    
      });
  }
})
.factory('chooseCity',function(){
  var cityInfo = {
        "zoneCityId": "",
        "zoneCity":""
      };
  return {
    setInfo:function(info){
      cityInfo.zoneCityId = info.zoneCityId;
      cityInfo.zoneCity = info.zoneCity;
    },
    getInfo:function(){
      return cityInfo;
    }
  };
})
.factory('httpService',function($http,$q,$rootScope,req,reqRoot,tip){
  return function(code,param,isHasLoadingFn,isHasLoadingHideFn){
    var deferred = $q.defer(); //通过$q注册一个延迟对象deferred 
    req.deviceInfo().then(function(deviceInfo){
        isHasLoadingFn ? isHasLoadingFn() : null;
        //$rootScope.loadingShow();
        $http.post(reqRoot, {
          "id": req.id(),
          "MethodCode":req.MethodCode(code),
          "signInfo":req.signInfo(param, deviceInfo.signKey),
          "time":req.time(),
          "imei":deviceInfo.imei,//手机唯一标识
          "APPID":deviceInfo.APPID,//客户端id
          "APPVER":deviceInfo.APPVER,//客户端版本
          "MVER":req.MVER(),//手机系统版本
          "MTYPE":req.MTYPE(),//客户端类型
          "PMODEL":deviceInfo.PMODEL,//机型
          "PBRAND":deviceInfo.PBRAND,//手机品牌
          "chid":deviceInfo.chid,//推广渠道号
          "body": param
        }).success(function(data){
          isHasLoadingHideFn ? isHasLoadingHideFn() : null;
          deferred.resolve(data); //任务被成功执行
        }).error(function (error) {
          isHasLoadingHideFn ? isHasLoadingHideFn() : null;
          tip("网络忙，请稍后再试……");
        });
    })   
    return deferred.promise; //返回deferred的promise对象  
  } 
})
//注册分享文案
.factory('registerShare',function(req,httpService,_responseData) {
  return function(callback) {
    req.deviceInfo().then(function(deviceInfo){
      //type=1是投资成功分享，2是注册分享,3是奖励规则
       httpService('S001',{'sessionId': deviceInfo.sessionId,'type':'2'}).then(function(data){
        _responseData(data,function(){
          callback(data);
        });
      });
    });
  };
})
.directive('fileModel', ['$parse', function ($parse) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs, ngModel) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          element.bind('change', function(event){
              scope.$apply(function(){
                  modelSetter(scope, element[0].files[0]);
              });
              //附件预览
                   scope.file = (event.srcElement || event.target).files[0];
              scope.getFile();
          });
      }
  };
}]);
;

