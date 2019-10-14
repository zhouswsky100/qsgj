angular.module('starter.directive', [])
//超出滚动
.directive('contentScroll', function($rootScope) {
   return {
        link: function (scope, elements, attrs, controller) {
            console.log("bbbbb");
            console.log( elements[0]);
            if(ionic.Platform.isAndroid()){
                elements[0].style.overflowY = 'auto';
                elements[0].style.overflowX = 'hidden';
            }
        }
    }
})
//进度条
.directive('progress', function($rootScope) {
    return {
        restrict: 'E',
        replace:true,
        template:'<span class="g-bar-unfill"> <span class="bar-fill"></span><span class="progressNum"></span></span>'
    };
})
.directive('progressval', function($rootScope,$timeout) {
    return function(scope,element,attr){
        var $progressFill=element.children()[0],$progressNum=element.children()[1];
        if(attr.progressval > 100){
            $progressFill.style.width= "100%";
        }else{
            $progressFill.style.width=attr.progressval+"%";
        }
        $progressNum.innerHTML=attr.progressval+'%';
    };
})
//获取短信验证码，需要手机号码的
.directive('getmsgcode1', function($rootScope,$interval,req,reqRoot,$http,msgCode,tip) {
    return {
        restrict: 'E',
        replace:true,
        scope:{
          callback:"&"
        },
        template:'<button class="button-getMsgCode" ng-class="paraclass" ng-click="getCode()" ng-bind="paracont">获取验证码</button>',
        link:function($scope, $element,attr){
          $scope.paracont = "获取验证码";
          $scope.paraclass = "sendMsg"; 
          msgCode.isCount = false;
          $scope.getCode=function(){
                if(!msgCode.isCount){
                  if($scope.callback){
                   $scope.callback();
                  }
                 
                  var reg = /^1[2,3,4,5,6,7,8,9,0][0-9]{9}$/;
                  if(!reg.test(attr.tel)){
                    return;
                  }
                $scope.paraevent = true;  
                var second = 60,  
                timePromise = undefined;  
                timePromise = $interval(function(){  
                  if(second<=0){  
                    $interval.cancel(timePromise);  
                    timePromise = undefined;  
          
                    second = 60;  
                    $scope.paracont = "重发验证码";  
                    $scope.paraclass = "sendMsg";  
                    $scope.paraevent = true;  
                    msgCode.isCount = false;
                  }else{  
                    $scope.paracont = second + "秒后可重发";  
                    $scope.paraclass = "sendMsgIng";  
                    second--;  
                    msgCode.isCount = true;
                  }  
                },1000,100); 
            }
            $scope.$on('$destroy',function(){  //在销毁控制器前清除定时器
                msgCode.isCount = false;
                if(timePromise){$interval.cancel(timePromise);}
              });
            }
            if(attr.init == "auto"){
              $scope.getCode();
            }
        }
    };
})
//获取短信验证码
.directive('getmsgcode', function($rootScope) {
    return {
        restrict: 'E',
        replace:true,
        template:'<button class="button-getMsgCode" ng-class="paraclass" ng-click="getCode()" ng-bind="paracont">获取验证码</button>',
        controller:function($scope, $element,$interval,req,reqRoot,$http,msgCode){
        $scope.paracont = "获取验证码";
        $scope.paraclass = "sendMsg"; 
        msgCode.isCount = false;
        $scope.getCode=function(){
            if(!msgCode.isCount){
                $scope.paraevent = true;  
                var second = 60,  
                timePromise = undefined;  
      
                timePromise = $interval(function(){  
                  if(second<=0){  
                    $interval.cancel(timePromise);  
                    timePromise = undefined;  
          
                    second = 60;  
                    $scope.paracont = "重发验证码";  
                    $scope.paraclass = "sendMsg";  
                    $scope.paraevent = true;  
                    msgCode.isCount = false;
                  }else{  
                    $scope.paracont = second + "秒后可重发";  
                    $scope.paraclass = "sendMsgIng";  
                    second--;  
                    msgCode.isCount = true;
                  }  
                },1000,100); 
            }
            $scope.$on('$destroy',function(){  //在销毁控制器前清除定时器
                msgCode.isCount = false;
                if(timePromise){$interval.cancel(timePromise);}
              });
       
            }
        },
        link:function(scope,element,attr){
          var tel = attr.tel;
        }
    };
})
//控制是否显示隐藏tabs
.directive('hideTabs', function($rootScope,$window,$timeout) {
    return function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(_value){
                    var value;
                    if(_value.indexOf&&_value.indexOf("-")>0){//处理手势密码nav-bar的背景颜色控制
                        $rootScope.ionHeaderBarSty="ionBarSty"+_value.substring(_value.indexOf("-")+1);
                    }
                    value=(_value.indexOf&&_value.indexOf("-")>0)?_value.substring(0,_value.indexOf("-")):_value;
                    $rootScope.hideTabs = value;
                });
            });
            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        };
})

.directive('wechartShare',function(state,$rootScope,$ionicPopup,$timeout,sqLiteLoginInfo,tip){
  return{
    link:function(scope,elem,attr){
      //分享成功弹窗
      scope.shareSuccess = function(){
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: '分享成功',
          okText:'确定'
        });
        alertPopup.then(function(){
          scope.popShow.close();  //如果分享成功则关闭微信分享弹窗
        });
        $timeout(function() {
          alertPopup.close(); //用户未操作则两秒钟关闭
        }, 2000);
      };
      //分享失败弹窗
      scope.shareFailed = function(reason){
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: "分享失败: "+reason,
          okText:'确定'
        });
        $timeout(function() {
          alertPopup.close(); //用户未操作则两秒钟关闭
        }, 2000);
      };
      //分享微信朋友圈
      scope.shareSpace = function() {
        console.log(attr);
        try{
          Wechat.isInstalled(function (installed) {
            if(!installed){
              tip("没有安装微信，请先安装微信！");
              return false;
            }else{
              sqLiteLoginInfo.userInfo.get(function(userInfo){
                var webpageurl = '';
                if(attr.hasurl == '1'){
                    webpageurl = attr.webpageurl;
                }else{
                  webpageurl = 'https://m.he-pai.cn/wechat/#/exclusiveRegister/'+localStorage.prsCd+'/'+userInfo.ciNm; //线上注册微信分享地址
                };
                Wechat.share({
                  message: {
                      title: attr.sharetitle,
                      description: attr.sharedescription,
                      thumb: "www/img/wechatShare.png",
                      media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: webpageurl
                      }
                  },
                  scene: Wechat.Scene.TIMELINE   // share to Timeline
                }, function () {
                    scope.shareSuccess();
                }, function (reason) {
                    scope.shareFailed(reason);
                });
              });
            }
          }, function (reason) {
            scope.shareFailed(reason);
          });
        }catch(e){} 
      }
      //分享微信好友
      scope.shareFriend = function() {
        try{
          Wechat.isInstalled(function (installed) {
            if(!installed){
              tip("没有安装微信，请先安装微信！");
              return false;
            }else{
              sqLiteLoginInfo.userInfo.get(function(userInfo){
                var webpageurl = '';
                if(attr.hasurl == '1'){
                    webpageurl = attr.webpageurl;
                }else{
                  webpageurl = 'https://m.he-pai.cn/wechat/#/exclusiveRegister/'+localStorage.prsCd+'/'+userInfo.ciNm; //线上注册微信分享地址
                };
                Wechat.share({
                  message: {
                      title: attr.sharetitle,
                      description: attr.sharedescription,
                      thumb: "www/img/wechatShare.png",
                      media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: webpageurl
                      }
                  },
                  scene: Wechat.Scene.SESSION   // share to Timeline
                }, function () {
                    scope.shareSuccess();
                }, function (reason) {
                    scope.shareFailed(reason);
                });
              });
            }
          }, function (reason) {
            scope.shareFailed(reason);
          });
        }catch(e){}  
      };

      //查看活动邀请详情
      scope.lookDis = function(){
        scope.popShow.close(); 
        state.go('inviteFriends');
      };

      //元素点击出弹窗
      elem.bind('click',function(){
        // sqLiteLoginInfo.userInfo.get(function(userInfo){
          // if(userInfo.ciNm == ''){  //专属分享只限制再登录情况下才可以分享
          //   tip('请先登录再进行分享');
          //   return false;
          // }else{
            scope.popShow = $ionicPopup.show({
              template: '<div class="g-ta-c g-pt-10"><p class="titlep">分享活动，共创盈利！</p><div><ul class="g-mb-10"><li class="g-c99" ng-click="shareSpace()"><img src="img/frends_img01.png" alt="tu">朋友圈</li><li class="g-c99" ng-click="shareFriend()"><img src="img/frends_img02.png" alt="tu">微信好友</li></ul></div></div>',
              cssClass:'recommend-pop',
              title: '',
              scope: scope,
              buttons: [
                { text: '取消' }
              ]
            });
          // }
        // });
      });
    } 
  } 
})
//跑马灯
.directive('slideScroll', function($window, $timeout) {
    return {
        restrict: 'AE',
        scope: {
          noticelist: "="
        },
        link: function(scope, element, attr) {
            scope.$watch(attr.noticelist, function(newvalue, oldvalue) {
              var i = 1;    //element是ul
              var length = element[0].children.length;
              if(length != 0) {
                var widthwindow = $window.innerWidth - 20;
                var firstwidth = element[0].children[0].children[0].offsetWidth;
                setInterval(function() {
                  if(i == length) {
                      i = 0;//初始位置
                      element[0].style.top  = "0px";
                  }
                  var topscorll = -(i * 24);
                  var widthself = element[0].children[i].children[0].offsetWidth;  //widthself：292

                  feeltoTop(topscorll)
                  i++;
                }, 3000)
              }
              //向上滚动
              function feeltoTop(topscorll){  //console.log(topscorll):topscorll是top值
                var buchang = -10;
                var feelTimer = setInterval(function(){
                    element[0].style.top = parseInt(element[0].style.top) + buchang + "px";
                    if(parseInt(element[0].style.top) <= topscorll){
                        element[0].style.top = topscorll + "px";
                        window.clearInterval(feelTimer);
                    }
                },100);
              }
            })   
        }
    }
})
/*Mark! 3 years,please carry on!*/
// .directive('passwordformat', function() {   
//     return {  
//         require: 'ngModel', 
//         scope:{

//         } 
//         link: function(scope, element, attrs) {  
//           var num = 
//           if(num && Object.prototype.toString.call(num) === "[object String]" && num != ''){
//             return num.replace(/./g,'.');
//           }else{
//             return '';
//           }
//         }  
//     };  
// })
.directive('keyboard', function($compile,$rootScope) {
    return {
        restrict : 'AE',  
        transclude : true,
        template:'',
        scope:{   
          myName:'=name',
          password:"=password",
          ngBlur:"&"
        },
        link : function(scope, element, attrs) {
            var numlist1=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","back"]];//输入金额的时候，type=v1;
            var numlist2=[["1","2","3"],["4","5","6"],["7","8","9"],["","0","back"]];//输入手机号的时候，type=v2;
            var numlist=[["1","2","3"],["4","5","6"],["7","8","9"],["ABC","0","back"]];//全键盘
            var wordlist=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["up","z","x","c","v","b","n","m","back"],["123","space","#+="]];
            var speCharslist=[
                            ["!","@","#","$","%","^","&","*","(",")"],
                            ["&acute;","&quot;","=","_",":",";","?","~","|","·"],
                            ["+","-","\\","\/","[","]","{","}","back"],
                            ["123",",",".","&lt;","&gt;","€","￡","¥","ABC"]
                          ];
            scope.numberShow = "show";
            scope.characterShow = "hidden";
            scope.scShow = "hidden";
            scope.myName = "";
            scope.password = "";
            scope.lowerOrUp = "lower";
            var calculator="";
            var boardtype = attrs.boardtype;//键盘类型，v1表示数字键盘+点,应用场景：金额；v2表示纯数字键盘，应用场景：电话号码，其他表示全键盘
           // var passwordtype = attrs.password;//是否是password，需要格式化为黑点；
            $rootScope.placeTxt = attrs.placeholder;//记录当前的placehodler，缓存下来，用于doucument.click的时候
            scope.render = function(){
              calculator = '<div class="keyboard" class="ngcalculator_area" ng-click="wrapperBlank()">'
              +'<div class="title"></span><span class="g-c66 title-text">青色国际安全输入</span><span class="finish" ng-click="finish($event)">完成</span></div>'
               +'<div class="con"><ul class="number {{numberShow}}" ng-class="{{numberShow}}"><li>';
              var common = function(list,type){
                angular.forEach(list,function(v,k){
                  calculator += '<li>';
                  angular.forEach(v,function(v1,k1){
                    if(v1=="back"){
                      calculator += '<span class="ion-backspace-outline backColor" ng-click="change(\''+v1+'\',$event)"></span>';
                    }else if(v1=="up"){
                      calculator += '<span class="ion-arrow-up-a" ng-click="change(\''+v1+'\',$event)"></span>';
                    }else if(v1=="ABC"||v1=="123"||v1=="#+="){
                      calculator += '<span ng-click="change(\''+v1+'\',$event)">'+v1+'</span>';
                    }else if(v1=="space"){
                      calculator += '<span>'+v1+'</span>';
                    }else if(v1==""){
                      calculator += '<span class="nullColor"></span>';
                    }else{
                      if(v1 == "\\"){
                        scope.key = v1;
                        calculator += '<span ng-click="clickKey(key,$event)">'+v1+'</span>';
                      }else{
                        if(type){//如果是字母，则需要大小写可以变化
                          calculator += '<span class="{{lowerOrUp}}" ng-click="clickKey(\''+v1+'\',$event)">'+v1+'</span>';
                        }else{
                          calculator += '<span class="word" ng-click="clickKey(\''+v1+'\',$event)">'+v1+'</span>';
                        }
                      }
                    }
                  });
                  calculator += '</li>';
                });
              }
              if(boardtype == "v1"){
                common(numlist1,false);
              }else if(boardtype == "v2"){
                common(numlist2,false);
              }else{
                common(numlist,false);
              }
              calculator += '</ul><ul class="character hidden {{characterShow}}">';
              common(wordlist,true);
              calculator += '</ul><ul class="specialCharacter hidden {{scShow}}">';
              common(speCharslist,false);
              calculator += "</ul></div></div>";
            }
            scope.wrapperBlank = function(){
              event.stopPropagation();
            }
            //init keyboard
            scope.initKeyboardStyle=function(){
              scope.numberShow = "show";
              scope.characterShow = "hidden";
              scope.scShow = "hidden";
              scope.lowerOrUp = "lower";
            }
            var node = document.getElementsByClassName('keyboard');
            //键盘聚焦弹起定制键盘，隐藏原生键盘
            element.bind('focus',function(e){
              event.stopPropagation();
              //$rootScope.placeTxt1 = angular.element(e.target)[0].getAttribute("placeholder");
              $rootScope.placeTxt = attrs.placeholder;


              element.addClass("activeInput");//记录当前的input框
              for(var i=0;i<node.length;i++){
                node[i].remove();
              }
              scope.render();
              scope.initKeyboardStyle();
              calculator = $compile(calculator)(scope);
              document.body.appendChild(calculator[0]); 
              document.activeElement.blur();
              angular.element(element.next())[0].style.display="inline-block";
             // angular.element(e.target)[0].setAttribute("placeholder","");
              
            });
            setTimeout(function(){
                if(attrs.focus=="true"){
                  element[0].focus();
                }
              },500);
            
            document.getElementsByTagName('body')[0].onclick=function(e){
              scope.finish();
              scope.cursor();
              var ele = document.getElementsByClassName('activeInput')[0];
              if(ele && ele.value.length == 0){   
                ele.setAttribute("placeholder",$rootScope.placeTxt);
                angular.element(ele).removeClass("activeInput");
              }
            };
            //关闭模态框
            scope.finish = function(e){
              event.stopPropagation();
              scope.initKeyboardStyle();
              var node = document.getElementsByClassName('keyboard');
              angular.element(node).remove();
              scope.cursor();//屏蔽光标
              scope.initPlace();//初始化placeholder
              element.removeClass("activeInput");
              if(typeof(scope.ngBlur()) !="undefined"){
                scope.ngBlur();
              }
            }
            //光标控制
            scope.cursor = function(){
              var node1=document.getElementsByClassName('imitateCursor');
              for(var i=0;i<node1.length;i++){
                node1[i].style.display="none";
              }
            }
            //输入字符
            scope.clickKey=function (word,e) {
              event.stopPropagation();
              angular.element(e.target).addClass("keydown");
              if(scope.lowerOrUp=="up"){
                scope.myName += word.toUpperCase();//是显示的值
                scope.password += word.toUpperCase();//password中隐藏的真正的值
              }else{
                scope.myName += word.toLowerCase();
                scope.password += word.toLowerCase();
              }
              if(typeof(attrs.password) !="undefined"){
                scope.myName = scope.myName.replace(/./g,'•');//输入的是密码，要进行转换
              }
              if(boardtype == "v1"){//输入金额
                var returnText = scope.myName;
                if(!returnText){
                  return;
                }
                var regStrs = [
                  ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                  ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                  ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                  ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
                ];

                for (i = 0; i < regStrs.length; i++) {
                  var reg = new RegExp(regStrs[i][0]);
                  returnText = returnText.replace(reg, regStrs[i][1]);
                }

                scope.myName =  returnText;
              }
              setTimeout(function(){
                angular.element(e.target).removeClass("keydown");
              },50)
              
            }
            scope.initPlace = function(){
              if(scope.myName.length == 0){
                element[0].setAttribute("placeholder",attrs.placeholder);
              } 
            }
            //切换键盘
            scope.change = function(tag,e){
              e.stopPropagation();
              switch(tag){
                case "123":
                  scope.numberShow = "show";
                  scope.characterShow = "hidden";
                  scope.scShow = "hidden";
                  break;
                case "ABC":
                scope.numberShow = "hidden";
                scope.characterShow = "show";
                scope.scShow = "hidden";
                  break;
                case "#+=":
                  scope.numberShow = "hidden";
                  scope.characterShow = "hidden";
                  scope.scShow = "show";
                  break;
                case "back":
                  if(scope.myName.length>=1){
                    scope.myName=scope.myName.substring(0,scope.myName.length-1);
                    scope.password=scope.password.substring(0,scope.password.length-1);
                  }else{
                    scope.myName="";
                    scope.password="";
                  }
                  scope.initPlace();                 
                  break;
                case "up":
                  if(scope.lowerOrUp == "lower"){
                    scope.lowerOrUp = "up";
                  }else{
                    scope.lowerOrUp = "lower";
                  }
                  break;
                default:
                  break;
              }

            }
        }
    };
});
;