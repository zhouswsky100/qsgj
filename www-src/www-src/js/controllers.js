angular.module('starter.controllers', ["ngCordova",'starter.services','starter.config'])
.controller('HomeCtrl', function($scope,$http,$rootScope,tip,$stateParams,scrollList,msgSize,$timeout,$ionicScrollDelegate,state,$ionicPopup,imgUrl,bdList,bdDz,$ionicLoading,$ionicSlideBoxDelegate,bdDetailJl,$cordovaStatusbar,plbd) {
  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    messages: [],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    slidImg:'',
    hidetabs:false,
    dZFlg:false,
    bdplcontent:"",
    bdid:"",
    logoFlg:false,
    msgFlg:false,
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
    //跳转登录       
    toLogin:function(){
      state.go('login');
    },
    tomemberCenter:function(){
      state.go('tab.memberCenter');

    },
    msgSize : function(){
      var data = {
        accountID: localStorage.gcid,
      };
      $http({
        method: 'POST',
        url: msgSize,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
             if(data.datas>0){
              vm.msgFlg = true
            }else{
              vm.msgFlg = false
             }
         
           
          }else{
            $rootScope.tip(data.msg);
          }
        }).error(function(error) {
          $rootScope.tip("网络忙，请稍后再试……");
  
        });
    },

   
      //点击图片放大
      showBigImage :function (imgTemp,imglist) {  //传递一个参数（图片的URl）imageName
          // // vm.slidImg = JSON.parse(imgTemp)
          // vm.bigImage = true
          // //  vm.hidetabs = true
          // //  vm.logoFlg = true 
          // // StatusBar.hide()
          var url = imgUrl+imgTemp+""  
          var obj = JSON.parse(imglist)
          var tempList =[]
          for(var i=0;i<obj.length; i++){
            tempList.push(imgUrl+obj[i])
          }      

          wx.previewImage({
            current:  url, // 当前显示图片的http链接
            urls: tempList// 需要预览的图片http链接列表
          });

      },
          //点击图片放大
    // showBigImage :function (imgTemp) {  //传递一个参数（图片的URl）imageName
    //         vm.slidImg = JSON.parse(imgTemp)
    //         vm.bigImage = true
    //         vm.hidetabs = true
    //         StatusBar.hide()
    //         vm.myScrollL()
    
    //     },
    myScrollL:function(){ 
        var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })
    },
    //初始默认大图是隐藏的
    hideBigImage : function () {
        vm.bigImage = false;
        // vm.hidetabs = false
        // StatusBar.show()
        // vm.logoFlg = false 


    },
    dateFormats:function (data) {
      var date = new Date(data);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var Hours =date.getHours(); //时，
      var Minutes	=date.getMinutes(); //分
      var Seconds	=date.getSeconds(); //秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
        var currentdate =year+ seperator1+month + seperator1 + strDate;
      return currentdate;
    },
   
    dianzan:function(id,index){
      $http.get(bdDz+"?bdid="+id+"").success(function(data){

        if(data.code=="1000"){
          var aElements=document.getElementsByClassName("dzimg");
          var aElementsize=document.getElementsByClassName("dzsize");
          var aElement1s=document.getElementsByClassName("gifshow");

          for(var i=0;i<aElements.length;i++) {
              if(aElements[i].getAttribute("imgindex")==index){
                aElements[i].src="img/bd/List_praise_on.png";
                var  size = aElementsize[i].innerHTML;
                aElementsize[i].innerHTML=parseInt(size)+parseInt("1")
              }
          }
          for(var i=0;i<aElement1s.length;i++) {
            if(aElement1s[i].getAttribute("gifShow")==index){
                aElement1s[i].style.display="block"
                vm.index =i
                vm.hide(i);
                return;
            }
         }
        }
      }).error(function (error) {
          
           $rootScope.tip("网络忙，请稍后再试……");
        
      });

    },
    hide :function(i){
      setTimeout(function(){
        var aElement1s=document.getElementsByClassName("gifshow");

        aElement1s[i].style.display="none"

      },1000);
    },
    bdDetail:function(data){
      state.go("bdDetail",{bdData:JSON.stringify(data)});

    },
    getData:function (isInit){
      $ionicLoading.show()
      $http.get(bdList+"?pageIndex="+vm.pagination.currentPage+"&pageSize=10").success(function(data){
      $ionicLoading.hide()

         if(data.datas.length!="0"){
           if(isInit){
            for(var i=0;i<data.datas.length;i++){
              var title =  data.datas[i].bdcontent.split('?')[1]
              var cont =  data.datas[i].bdcontent.split('?')[0]

              data.datas[i].title =title
              data.datas[i].cont =cont

              if(data.datas[i].ylzd!=undefined){
                var imgTemp = data.datas[i].ylzd.split(';')
             
                data.datas[i].imgTemp=imgTemp

              }
           
            }
              vm.messages= scrollList.init().add(data.datas);
              $ionicSlideBoxDelegate.update();

            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
  }
 }
 //如果已经加载了就不加载
//  if( $rootScope.logined==0){
//   $rootScope.logined=  1
     vm.init(1);
//  }

 if(vm.tel!=''&& vm.tel!=undefined){
  vm.msgSize()
}

})
//人才
.controller('FindCtrl', function($scope,$ionicLoading,$ionicHistory,scrollList,$http,$ionicPlatform,$ionicSlideBoxDelegate,$timeout,$ionicPopup,$rootScope,req,state,reqRoot,tip,sqLiteLoginInfo,baseInfo,queryRc) {
  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    messages: [],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    slidImg:'',
    hidetabs:false,
    dZFlg:false,
    bdplcontent:"",
    bdid:"",
    logoFlg:false,
    msgFlg:false,
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   rcDetail:function(data){
    state.go("rcDetail",{rcData:JSON.stringify(data)});

  },
   nowDate :  function(){
    return new Date();
    },
 
    getData:function (isInit){
      $ionicLoading.show()
      var data = {
        pageindex: vm.pagination.currentPage,
        pagesize: "10"
      };
      $http({
        method: 'POST',
        url: queryRc,
        dataType: 'json',
        data: data,
        }).success(function(data){
          $ionicLoading.hide()
           if(data.datas.length!="0"){
             if(isInit){
                vm.messages= scrollList.init().add(data.datas);
                $ionicSlideBoxDelegate.update();
              }else{
                 vm.messages=scrollList.add(data.datas);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
                 $ionicScrollDelegate.resize();
              }
           }else{
                 vm.moredata = true;
           }
       }).error(function (error) {
           
            $rootScope.tip("网络忙，请稍后再试……");
           if(!isInit){
                   //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                   var positon = $ionicScrollDelegate.getScrollPosition();
                   $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                   $scope.$broadcast('scroll.infiniteScrollComplete');
           }
       });
  }
 }
     vm.init(1);
})

//青贝售卖
.controller('mbqSellCtrl', function($rootScope,$scope,$http,sgMbq, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,getPrice,$cordovaDevice,mbqSale) {

  $scope.showFlg  = 0 ;
  $scope.menuOn = function(index){
    $scope.showFlg = index
  }
  $scope.allnum = 0
  $scope.amount = 0
  $scope.data  = {
     sqbNum :"",
     sqbPrice :"",
     cqbNum :"",
     cqbPrice :"",
     
  };
  $scope.calc = function(){
    if($scope.showFlg ==0){
      $scope.allnum = Number($scope.data.cqbNum*$scope.data.cqbPrice).toFixed(2)

    }else{
      $scope.allnum = Number($scope.data.sqbNum*$scope.data.sqbPrice).toFixed(2)

    }

  },
  $scope.getQb=function(){
    var data = {
      phone:localStorage.telephone
    };
    $http({
      method: 'POST',
      url: getPrice,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
          $scope.amount = data.datas
        }else{
           $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });
  },
  $scope.POrders=function(){
    if( $scope.showFlg ==0){ //0为出售
   
     
      if($scope.data.cqbNum==''){
        $rootScope.tip("请输入出售数量");
        return false;

      }else if($scope.data.cqbPrice==''){
        $rootScope.tip("请输入出售金额");
        return false;

      }
      if($scope.amount<$scope.data.cqbNum){
        $rootScope.tip("出售数量不能小于总资产");
        return false;

      }
      var data = {
        qbscfbrid: localStorage.gcid,
        qbscrmb: $scope.data.cqbPrice ,
        qbscshuliang:$scope.data.cqbNum
      };
      $http({
        method: 'POST',
        url: mbqSale,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
            $rootScope.tip("发布成功");
            $scope.data.cqbNum = ''
            $scope.data.cqbPrice = ''
          }else{
            $rootScope.tip(data.msg);
          }
        }).error(function(error) {
          $rootScope.tip("网络忙，请稍后再试……");
  
        });
    }else{//收购
      if($scope.data.sqbNum==''){
        $rootScope.tip("请输收购数量");
        return false;

      }else if($scope.data.sqbPrice==''){
        $rootScope.tip("请输入收购金额");
        return false;

      }
      var data = {
        qbscfbrid: localStorage.gcid,
        qbscrmb: $scope.data.sqbPrice ,
        qbscshuliang:$scope.data.sqbNum
      };
      $http({
        method: 'POST',
        url: sgMbq,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
            $rootScope.tip("发布成功");
            $scope.data.sqbNum=''
            $scope.data.sqbPrice=''
          }else{
            $rootScope.tip(data.msg);
          }
        }).error(function(error) {
          $rootScope.tip("网络忙，请稍后再试……");
  
        });

    }
  }
  $scope.getQb()
})






//个人中心
.controller('MemberCenterCtrl', function($rootScope,meSc,getPrice, $scope, $q, $timeout, $stateParams,$ionicHistory,$http,$ionicPopup,state,memberCenter,reqRoot,req,capitalQuery,tip,_responseData,withdrawFeeFactory,sqLiteLoginInfo,zcInfo,httpService,upPhoto,exitLogin,msgSize, $ionicLoading) {
  $rootScope.imgMsgFlg = false;

  //初始化数据占位
  $scope.data={
    level: 1,
    photo:"img/photo.png",
    userName:"",
    totAmt:"0.00",
    availBal:"0.00",
    accumulateRevenue:"0.00",
    srpIntAmt:"0.00",
    availInvestCouponCnt:"0",
    payCnt:"0",
    bidCnt:"0",
    closeCnt:"0",
    transferCnt:"0",
    latestMstRtnDt:"",
    latestMstRtnLnAmt:"*",
    dailyRevenue:"0.00",
    file:"",
    photo:localStorage.gcphoto,
    size:"",
    bageFlg:false,
    amount :0
  };



  $scope.phone=localStorage.telephone
  $scope.exitLogin=function(){
    var data = {
      accountID: localStorage.token,
      phoneNO: localStorage.telephone
    };
    $http({
      method: 'POST',
      url: exitLogin,
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
           $rootScope.tip("退出成功");
          localStorage.clear();
          state.go("tab.home")
          $ionicHistory.clearCache()
        }else{
          $rootScope.tip("退出成功");
          $ionicHistory.clearCache()

          localStorage.clear();
          state.go("tab.home")
          //  $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });

  },

  $scope.getQb=function(){
    var data = {
      phone:localStorage.telephone
    };
    $http({
      method: 'POST',
      url: getPrice,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
          $scope.amount = data.datas
          localStorage.amount =  $scope.amount
        }else{
           $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });
  }
   $scope.init = function(){
    var data = {
      accountID: localStorage.gcid,
    };
    $http({
      method: 'POST',
      url: msgSize,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
          if(data.datas >"0"){
            $scope.data.bageFlg = true
            if(data.datas>"99"){
              $scope.data.size= "99+"
             }else{
              $scope.data.size= data.datas
             }
          }else{
            $scope.data.bageFlg = false

          }
         
        }else{
          $rootScope.tip(data.msg);
        }
      }).error(function(error) {
        $rootScope.tip("网络忙，请稍后再试……");

      });
  },

 
  $scope.upPhoto=function(){
    $("#avatar_load").bind('change',function(){
         var $form=$("#imgupload")[0];
         var formData = new FormData($form); 
         $ionicLoading.show({
          template: '头像上传中...'
        });
          $.ajax({
            type: "POST",
            enctype:'multipart/form-data',
            url: upPhoto,
            data: formData,
            cache:false,
            processData:false,
            contentType:false,
            success: function(data){
            if(data.code=='1000'){
                $ionicLoading.hide();
                $rootScope.tip("上传头像成功")

                $scope.data.photo=data.msg
                localStorage.gcphoto=data.msg
            }else{
                $rootScope.tip(data.msg);
            }
            
            }
        });
    })
  }

$scope.upPhoto()
$scope.init()
$scope.getQb()
})


//账户管理-个人信息
.controller('UserInfoCtrl', function($scope,$rootScope,$http,$stateParams,tip,req,reqRoot,state,commonFunction){
  $scope.data = {
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
 }
 
 
  //真实姓名结尾用*号隐藏
  $scope.frormatRelNm = function(name){
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

  //身份证号中间用*号隐藏
  $scope.formatIdNo = function(idNo){
    if(idNo && Object.prototype.toString.call(idNo) === "[object String]" && idNo != ''){
      return idNo.substring(0,4)+'****'+idNo.substring(idNo.length-4,idNo.length);
    }else{
      return '';
    }
  }

  //手机号中间用*号隐藏
  $scope.formatMoblie = function(phone){
    if(phone && Object.prototype.toString.call(phone) === "[object String]" && phone != ''){
      return phone.substring(0,3)+'****'+phone.substring(phone.length-4,phone.length);
    }else{
      return '';
    }
  }

  function getTime (t) {
    if(t == '') {
      return '';
    }
    var t = new Date(t);
    var y = t.getFullYear() + '';
    var m = t.getMonth() + 1;
    var m = ((m >= 10) ? m : ('0' + m)) + '';
    var d = ((t.getDate() >= 10) ? t.getDate() : ('0' + t.getDate())) + '';
    return (y + m + d);
  }
})

//账户管理
.controller('AccountMCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService) {

   //初始化数据占位
   $scope.data={
    level: 1,
    photo:"img/photo.png",
    userName:"",
    totAmt:"0.00",
    availBal:"0.00",
    accumulateRevenue:"0.00",
    srpIntAmt:"0.00",
    availInvestCouponCnt:"0",
    payCnt:"0",
    bidCnt:"0",
    closeCnt:"0",
    transferCnt:"0",
    latestMstRtnDt:"",
    latestMstRtnLnAmt:"*",
    dailyRevenue:"0.00",
    gcphoto:localStorage.gcphoto,

  };


})



//密码管理
.controller('PasswordMCtrl', function($rootScope,$scope,$timeout, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,sqLiteLoginInfo,commonFunction) {
  //用户是否设置交易密码标志位
  $scope.pwdsetflag =  localStorage.pwdsetflag == '1' ? true : false;//是否已设置交易密码
  
  $scope.setJyPass = function(){
    state.go("setJyPass");
  }
  $scope.upPass = function(){
    state.go("updateLoginPwd");
  }
})


//设置交易密码
.controller('setJyPassCtrl', function($rootScope,$scope,$timeout, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness) {

      $scope.business = {
        password:"",
      };
      //设置交易密码
      $scope.setPassword = function(){
          if($scope.business.password==''){
             $rootScope.tip("请输入交易密码");
            return 
          }
          var data = {
            gcphone:localStorage.telephone,
            jymm:  $scope.business.password
          };
          $http({
            method: 'POST',
            url: setbusiness,
            headers: {  
              'Authorization': localStorage.token,
              'phoneNO' : localStorage.telephone,
            },  
            dataType: 'json',
            data: data,
            }).success(function(data) {
              if(data.code=='1000'){
                 $rootScope.tip("设置交易密码成功");

              }else{
                 $rootScope.tip(data.msg);
              }
            }).error(function(error) {
               $rootScope.tip("网络忙，请稍后再试……");

            });
      }
})


//修改青贝密码
.controller('upjymmCtrl', function($rootScope,$scope,$timeout, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness) {

  $scope.business = {
    password:"",
  };
  //设置交易密码
  $scope.setPassword = function(){
      if($scope.business.password==''){
         $rootScope.tip("请输入交易密码");
        return 
      }
      var data = {
        gcphone:localStorage.telephone,
        jymm:  $scope.business.password
      };
      $http({
        method: 'POST',
        url: setbusiness,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
             $rootScope.tip("修改交易密码成功");

          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
  }
})
//消息中心
.controller('msgCenterCtrl', function($scope,$http,$rootScope,tip,$stateParams,scrollList,$timeout,$ionicScrollDelegate,state,imgUrl,bdList,bdDz,$ionicLoading,$ionicSlideBoxDelegate,msgSize,msgList) {

  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    moredatas:false,
    messages: [],
    messagess:[],
        pagination: {
      currentPage: 1
    },
		
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
      vm.moredatas=false;

   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
  
    getData:function (isInit){
      $ionicLoading.show()
      var data = {
        accountID: localStorage.gcid,
        isread: "1",
        pageIndex:vm.pagination.currentPage,
        pageSize: "20"
      };
      $http({
        method: 'POST',
        url: msgList,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data){
          $ionicLoading.hide()
         if(data.datas.length!="0"){
           if(isInit){
              vm.messagess= scrollList.init().add(data.datas);
              $ionicSlideBoxDelegate.update();
              vm.isread(true)
  
            }else{
               vm.messagess=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
               vm.isread(false)

            }
         }else{
               vm.isread(true)

               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
   
        

  },

  isread:function(isInit){
    $ionicLoading.show()
    var data = {
      accountID: localStorage.gcid,
      isread: "0",
      pageIndex:vm.pagination.currentPage,
      pageSize: "20"
    };
    $http({
      method: 'POST',
      url: msgList,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data){
      $ionicLoading.hide()
       if(data.datas.length!="0"){
         if(isInit){
            vm.messages= scrollList.init().add(data.datas);
            $ionicSlideBoxDelegate.update();

          }else{
             vm.messages=scrollList.add(data.datas);
             $scope.$broadcast('scroll.infiniteScrollComplete');
             $ionicScrollDelegate.resize();
          }
       }else{
         
               vm.moredatas = true;

          
       }
   }).error(function (error) {
       
        $rootScope.tip("网络忙，请稍后再试……");
       if(!isInit){
               //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
               var positon = $ionicScrollDelegate.getScrollPosition();
               $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
               $scope.$broadcast('scroll.infiniteScrollComplete');
       }
   });
  }
 }
 vm.init(1);



})

//榜单发布
.controller('bdFbCtrl', function($rootScope,$scope,$timeout,$ionicLoading, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness,fbBd,bdyl) {

    $scope.bd = {
      miaoshu:"",
      amount:"",
      id:0,
      title:"",
      temp:""
    };
    $scope.ajaxFlg = true ;
    $("#bdhyid").val(localStorage.gcid)
    //发布榜单
    $scope.fbBd = function(){
        $scope.bd.miaoshu  =   $scope.bd.temp+"?"+$scope.bd.title
        $("#bdmiaoshu").val( $scope.bd.miaoshu )
        if($scope.bd.title==''){
          $rootScope.tip("请输入榜单标题");
         return 
       }
        if($scope.bd.miaoshu==''){
           $rootScope.tip("请输入榜单描述");
          return 
        }
        if($scope.bd.amount==''){
           $rootScope.tip("请输入悬赏青贝数");
          return 
        }
        if($scope.bd.amount<=0){
          $rootScope.tip("悬赏金额不能小于0");
         return 
        }
        if(localStorage.amount<=0){
          $rootScope.tip("账户青贝余额不足");
         return 
        }
        var $form=$("#bdform")[0];
        var formData = new FormData($form); 
        $scope.ajaxFlg = false ;
        $ionicLoading.show({
          template: '榜单发布中...'
        });
         $.ajax({
               type: "POST",
               enctype:'multipart/form-data',
               url: fbBd,
               data: formData,
               headers: {  
                'Authorization': localStorage.token,
                'phoneNO' : localStorage.telephone,
              },  
               cache:false,
               processData:false,
               contentType:false,
               success: function(data){
                $scope.ajaxFlg = true ;
                if(data.code=='1000'){
                  $ionicLoading.hide()
                   $rootScope.tip("榜单发布成功")
                  state.go("tab.home")
                }else{
                   $rootScope.tip(data.msg);
                }
               
               }
       });
    }
    $scope.creatImg = function(){
      $(".fname").on('change',function(e){
        //将图片转换base64显示
        var img = e.currentTarget.value
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
           $( e.currentTarget).prev()[0].src=reader.result;
           $scope.addImg()
        }              
      })
    },
    $scope.addBr =function(){
      
      $scope.bd.miaoshu  =$scope.bd.miaoshu+"<br>"
    },

    $scope.addkg =function(){
      
      $scope.bd.miaoshu  =$scope.bd.miaoshu+"&nbsp;"
    },

    $scope.addImg = function(){
      $scope.bd.id++
      var  html ="<div class='item-input item' ><div><img src='img/mine/upimg.png'> <input  style='width: 50px;position: relative; left: -50px;opacity:0;' type='file' name='uploadFile' accept='image/*' class='fname' ng-change='getIMg()' id="+$scope.bd.id+"></div></div>"
      $("#addImg").append(html)

      $scope.creatImg()
   }
})



//活动发布
.controller('hdFbCtrl', function($rootScope, $ionicLoading,$scope,$timeout, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness,hdfb) {

  $scope.bd = {
    hbcontent:"",
    hbjfje:"",
    id:0,
    title:"",
    temp:""
  };
  $scope.ajaxFlg = true ;
  $("#bdhyid").val(localStorage.gcid)
  //发布榜单
  $scope.fbBd = function(){
    $scope.bd.hbcontent  =   $scope.bd.temp+"?"+$scope.bd.title
    $("#bdmiaoshu").val( $scope.bd.hbcontent )
    if($scope.bd.title==''){
      $rootScope.tip("请输入榜单标题");
     return 
     }
      if($scope.bd.hbcontent==''){
         $rootScope.tip("请输入活动描述");
        return 
      }
      if($scope.bd.hbjfje==''){
         $rootScope.tip("请输入活动赏金数量");
        return 
      }
      $scope.bd.hbcontent  =   $scope.bd.hbcontent+"?"+$scope.bd.title
      $("#hdmiaoshu").val($scope.bd.hbcontent)
      var $form=$("#hdform")[0];
      var formData = new FormData($form); 
      $scope.ajaxFlg = false ;
      $ionicLoading.show({
        template: '活动发布中...'
      });
       $.ajax({
             type: "POST",
             enctype:'multipart/form-data',
             url: hdfb,
             data: formData,
             headers: {  
              'Authorization': localStorage.token,
              'phoneNO' : localStorage.telephone,
            },  
             cache:false,
             processData:false,
             contentType:false,
             success: function(data){
              $scope.ajaxFlg = true ;
              $ionicLoading.hide();
              if(data.code=='1000'){
                 $rootScope.tip("活动发布成功")
                state.go("tab.act")
              }else{
                 $rootScope.tip(data.msg);
              }
             
             }
     });
  }
  $scope.creatImg = function(){
    $(".fname").on('change',function(e){
      //将图片转换base64显示
      var img = e.currentTarget.value
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = function () {
         $( e.currentTarget).prev()[0].src=reader.result;
      }              
    })
  },
  $scope.addImg = function(){
    $scope.bd.id++
    var  html ="<div class='item-input item' ><div><img src='img/mine/upimg.png'> <input  style='width: 50px;position: relative; left: -50px;opacity:0;' type='file' name='uploadFile' accept='image/*' class='fname' ng-change='getIMg()' id="+$scope.bd.id+"></div></div>"
    $("#addImg").append(html)

    $scope.creatImg()
 }
 $scope.addBr =function(){
      
  $scope.bd.hbcontent  =$scope.bd.hbcontent+"<br>"
},

$scope.addkg =function(){
  
  $scope.bd.hbcontent  =$scope.bd.hbcontent+"&nbsp;"
}
})


//发榜记录
.controller('fbJlCtrl', function($rootScope,$scope,$timeout, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness,fbJl,scrollList,$ionicLoading) {

 //初始化榜当列表数据
 var vm = $scope.vm ={
  moredata: false,
  messages: [],
  pagination: {
    currentPage: 1
  },
  gcphoto:localStorage.gcphoto,
  tel :localStorage.telephone,
  init: function (b) {//初始化列表页
    if(vm.tel!=''&& vm.tel!=undefined){
      vm.loginFlg=true
    }
    vm.pagination.currentPage = 1;
    vm.getData(true);
    vm.moredata=false;
 },
 doRefresh:function(){
    $timeout(function() {
      vm.init();
      $scope.$broadcast('scroll.refreshComplete');
   }, 200);
 },
 loadMore: function () {
   $timeout(function() {
     vm.pagination.currentPage++;
     vm.getData(false);
   }, 500);
 },
 nowDate :  function(){
  return new Date();
  },

 fbDetail:function(data){
    state.go("fbDetail",{fbData:JSON.stringify(data)});

  },
  getData:function (isInit){
    $ionicLoading.show()
    var data = {
      gcaid:localStorage.gcid
    };
    $http({
      method: 'POST',
      url: fbJl,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data){
        $ionicLoading.hide()

       if(data.datas.length!="0"){
         if(isInit){
            vm.messages= scrollList.init().add(data.datas);
            for(var i=0;i<data.datas.length;i++){
              var title =  data.datas[i].bdcontent.split('?')[1]
              var cont =  data.datas[i].bdcontent.split('?')[0]

              data.datas[i].title =title
              data.datas[i].cont =cont

              if(data.datas[i].ylzd!=undefined){
                var imgTemp = data.datas[i].ylzd.split(';')
                data.datas[i].imgTemp=imgTemp

             
              }
           
            }
          }else{
             vm.messages=scrollList.add(data.datas);
             $scope.$broadcast('scroll.infiniteScrollComplete');
          }
       }else{
             vm.moredata = true;
       }
   }).error(function (error) {
       
        $rootScope.tip("网络忙，请稍后再试……");
       if(!isInit){
               //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
               var positon = $ionicScrollDelegate.getScrollPosition();
               $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
               $scope.$broadcast('scroll.infiniteScrollComplete');
       }
   });
}

}
vm.init(1);

})

//揭榜记录
.controller('jbJlCtrl', function($rootScope,$scope,$timeout,$ionicScrollDelegate, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness,jbJl,$ionicLoading,scrollList) {

  //初始化榜当列表数据
var vm = $scope.vm ={
  moredata: false,
  messages: [],
  pagination: {
    currentPage: 1
  },
  tel :localStorage.telephone,
  init: function (b) {//初始化列表页
    if(vm.tel!=''&& vm.tel!=undefined){
      vm.loginFlg=true
    }
    vm.pagination.currentPage = 1;
    vm.getData(true);
    vm.moredata=false;
 },
 doRefresh:function(){
    $timeout(function() {
      vm.init();
      $scope.$broadcast('scroll.refreshComplete');
   }, 200);
 },
 loadMore: function () {
   $timeout(function() {
     vm.pagination.currentPage++;
     vm.getData(false);
   }, 500);
 },
 nowDate :  function(){
  return new Date();
  },

  fbDetail:function(data){
    state.go("fbDetail",{fbData:JSON.stringify(data)});

  },

  getData:function (isInit){
    $ionicLoading.show()
    var data = {
      gcaid:localStorage.gcid
    };
    $http({
      method: 'POST',
      url: jbJl,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data){
        $ionicLoading.hide()

       if(data.datas.length!="0"){
         if(isInit){
            vm.messages= scrollList.init().add(data.datas);
          }else{
             vm.messages=scrollList.add(data.datas);
             $scope.$broadcast('scroll.infiniteScrollComplete');
             $ionicScrollDelegate.resize();
          }
       }else{
             vm.moredata = true;
       }
   }).error(function (error) {
       
        $rootScope.tip("网络忙，请稍后再试……");
       if(!isInit){
               //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
               var positon = $ionicScrollDelegate.getScrollPosition();
               $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
               $scope.$broadcast('scroll.infiniteScrollComplete');
       }
   });
}

}
vm.init(1);


})


//获取榜单揭榜人信息
.controller('jbrListCtrl', function($rootScope,$scope,$timeout, $ionicPopup,$stateParams,$ionicHistory,$http,state,req,reqRoot,tip,commonFunction,setbusiness) {

  $scope.business = {
    password:"",
  };
  //设置交易密码
  $scope.setPassword = function(){
      if($scope.business.password==''){
         $rootScope.tip("请输入交易密码");
        return 
      }
      var data = {
        gcphone:localStorage.telephone,
        jymm:  $scope.business.password
      };
      $http({
        method: 'POST',
        url: setbusiness,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
             $rootScope.tip("设置交易密码成功");

          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
  }
})


//注册第一步
.controller('resCtrl', function($scope,$http,$ionicPlatform,$stateParams,$ionicPopup,$ionicHistory,$rootScope,state,req,sqLiteLoginInfo,login,getMsg,tip,$ionicLoading) {

  $scope.login = {
    tel: '',//登录手机号

  };

  $scope.telephone = localStorage.telephone;//缓存的手机号
  $scope.checkTel = function(){//验证手机号码
    var reg = /^1[2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if(!reg.test($scope.login.tel)){
       $rootScope.tip("请输入正确的手机号码");
      return false;
    }else{
      return true;
    }
  }
  $scope.change = function(){
     $scope.loginState = false;
  }
  //注册，跳到下一步
  $scope.next=function(){
    if(!$scope.checkTel()){
      return;
    }
      var data = {
        phoneNO:$scope.login.tel,
      };
      $ionicLoading.show()
      $http({
        method: 'POST',
        url: getMsg,
        dataType: 'json',
        data: data,
        }).success(function(data) {
          $ionicLoading.hide()
          if(data.code=='1000'){
            state.go("registerLoginStep11",{"tel":$scope.login.tel});
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
   
  }
})
//登录
.controller('LoginCtrl', function($scope,$http,$ionicPlatform,$stateParams,$ionicPopup,$ionicHistory,$rootScope,state,req,sqLiteLoginInfo,login,tip,$ionicLoading) {
  $scope.login = {
    tel: '',//登录手机号
    loginPwd:'',//实际登录密码
  };
  $scope.registerImg = {
    title:'',
    linkUrl:'',
    url:''
  }
  $scope.telephone = localStorage.telephone;//缓存的手机号
  $scope.checkTel = function(){//验证手机号码
    var reg = /^1[2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if(!reg.test($scope.login.tel)){
       $rootScope.tip("请输入正确的手机号码");
      return false;
    }else{
      return true;
    }
    if($scope.login.loginPwd==''){
       $rootScope.tip("请输入密码");
      return false;
    }else{
      return true;
    }
  }
  $scope.change = function(){
     $scope.loginState = false;
  }
  //登录
  $scope.doLogin=function(){
      $ionicLoading.show()
      var data = {
        gcpass:$scope.login.loginPwd,
        gcphone:$scope.login.tel,
      };
      $http({
        method: 'POST',
        url: login,
        dataType: 'json',
        data: data,
        }).success(function(data) {
          $ionicLoading.hide()
          if(data.code=='1000'){
             $rootScope.tip("登录成功");
            localStorage.telephone = data.datas.account.gcphone
            localStorage.gcphoto =  data.datas.account.gcphoto
            localStorage.gcnikename =  data.datas.account.gcnikename
            localStorage.token =  data.datas.token
            localStorage.gcid =  data.datas.account.gcid

            state.go("tab.home")
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
    
  }

})

 
//底部tab
  .controller('TabCtrl', function($scope,$stateParams,$http,$rootScope,state,req,reqRoot,tip,sqLiteLoginInfo,baseInfo) {
       $scope.goTab = function(url){
         state.go(url);
        //  $scope.checkMsg();//点击后调用消息
      };

     $scope.checkLogin = function(){

        if(localStorage.telephone==undefined||localStorage.telephone==''){
          state.go('login');

        }else{
          state.go('tab.memberCenter');

        }
       
      };

  })

//項目
.controller('projectCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService) {
  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    messages: [],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
    //跳转登录       
    toLogin:function(){
      state.go('login');
    },
    tomemberCenter:function(){
      state.go('tab.memberCenter');

    },
      //点击图片放大
    showBigImage :function (imageName) {  //传递一个参数（图片的URl）imageName
      // vm.url = imgUrl+imageName+""        
      // vm.bigImage = true;//显示大图

      wx.previewImage({
        current:  imgUrl+imgTemp, // 当前显示图片的http链接
        urls: [ imgUrl+imgTemp]// 需要预览的图片http链接列表
      });
    },
  //初始默认大图是隐藏的
  hideBigImage : function () {
    vm.bigImage = false;
    // vm.hidetabs = false
    // StatusBar.show()
    // vm.logoFlg = false 


},
    dateFormats:function (data) {
      var date = new Date(data);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var Hours =date.getHours(); //时，
      var Minutes	=date.getMinutes(); //分
      var Seconds	=date.getSeconds(); //秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
        var currentdate =year+ seperator1+month + seperator1 + strDate;
      return currentdate;
    },

    hide :function(i){
      setTimeout(function(){
        var aElement1s=document.getElementsByClassName("gifshow");

        aElement1s[i].style.display="none"

      },1000);
    },
    bdDetail:function(data){
      state.go("bdDetail",{bdData:JSON.stringify(data)});

    },
    getData:function (isInit){
     $http.get(bdList+"?pageIndex="+vm.pagination.currentPage+"&pageSize=10").success(function(data){
         if(data.datas.length!="0"){
           if(isInit){
            for(var i=0;i<data.datas.length;i++){
              var imgTemp = data.datas[i].ylzd.split(';')
              data.datas[i].imgTemp=imgTemp
            }
              vm.messages= scrollList.init().add(data.datas);
            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
  }
 }
//  vm.init(1);


})



//青贝管理
.controller('qbManageCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,getPrice,$cordovaDevice) {

  $scope.amount =  0;
  $scope.getQb=function(){
    var data = {
      phone:localStorage.telephone
    };
    $http({
      method: 'POST',
      url: getPrice,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
          $scope.amount = data.datas
          localStorage.amount =  $scope.amount
        }else{
           $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });
  }
  //扫一扫
  $scope.scanCode= function(){
    cordova.plugins.barcodeScanner.scan(
            function (result) {
              if(result.text){
                state.go("qbZs",{qbtel: result.text });
              }
               // "Result: " + result.text 
               // "Format: " + result.format
               // "Cancelled: " + result.cancelled
             }, 

            function (error) {
                   $rootScope.tip("扫码失败: " + error);
            }
         );
    
  }
  $scope.getQb()

})


//我的二维码
.controller('myewmCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,getPrice,$cordovaDevice,getskm,$ionicLoading) {
   $scope.gcnikename =localStorage.gcnikename,
   $scope.tel = localStorage.telephone,
   $scope.gcphoto = localStorage.gcphoto

   $ionicLoading.show()
   $scope.qbqrcod= ''
   $http({
     method: 'POST',
     url: getskm,
     headers: {  
       'Authorization': localStorage.token,
       'phoneNO' : localStorage.telephone,
     },  
     dataType: 'json',
     }).success(function(data) {
       $ionicLoading.hide()
       if(data.code=='1000'){
         $scope.qbqrcod = data.datas;
       }else{
          $rootScope.tip(data.msg);
       }
     }).error(function(error) {
        $rootScope.tip("网络忙，请稍后再试……");

     });

})
//我的活动
.controller('meActCtrl', function($scope,$http,$rootScope,meAct,imgUrl,tip,$stateParams,scrollList,msgSize,$timeout,$ionicScrollDelegate,state,$ionicPopup,imgUrl,bdList,bdDz,$ionicLoading,$ionicSlideBoxDelegate,$cordovaStatusbar) {

  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    messages: [],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
  

  
    getData:function (isInit){
      $ionicLoading.show()
      var data = {
        type:"0"
      };
      $http({
        method: 'POST',
        url: meAct,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data){
          $ionicLoading.hide()
  
         if(data.datas.length!="0"){
           if(isInit){
              vm.messages= scrollList.init().add(data.datas);
            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
  }
  
  }
  vm.init(1);
  

})
//我参加的活动
.controller('meJoinActCtrl', function($scope,$http,$rootScope,meAct,tip,$stateParams,scrollList,msgSize,$timeout,$ionicScrollDelegate,state,$ionicPopup,imgUrl,bdList,bdDz,$ionicLoading,$ionicSlideBoxDelegate,$cordovaStatusbar) {

  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    messages: [],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
  

  
    getData:function (isInit){
      $ionicLoading.show()
      var data = {
        type:"1"
      };
      $http({
        method: 'POST',
        url: meAct,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data){
          $ionicLoading.hide()
  
         if(data.datas.length!="0"){
           if(isInit){
              vm.messages= scrollList.init().add(data.datas);
            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
  }
  
  }
  vm.init(1);
  

})
//青贝赠送
.controller('qbZcCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,qbcs,qbcs2,imgUrl,$ionicLoading) {

  $scope.business = {
    dfPhone:$stateParams.qbtel,
    amount:"",
    qbpass:"",
    bz:"",  
  };
  
  
  $scope.datas={
    nikename:"",
    photo:"",
    imgUrl:imgUrl
  }
  $scope.jy1Flg = true;
  $scope.jy2Flg = false;
  //赠送第一步
  $scope.savaQb=function(){
    if($scope.business.dfPhone==''){
       $rootScope.tip("请输入转赠人账号")
      return ;
    }
    if($scope.business.amount==''){
       $rootScope.tip("请输入转赠金额")
      return ;
    }
    // if($scope.business.password==''){
    //   return ;
    // }
    var data = {
      phone:localStorage.telephone,
      amount: $scope.business.amount,
      dfPhone: $scope.business.dfPhone,
      qbjysm:  $scope.business.bz,
    };
    $ionicLoading.show()
    $http({
      method: 'POST',
      url: qbcs,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        $ionicLoading.hide()
        if(data.code=='1000'){
          $scope.datas = data.datas
          $scope.jy1Flg = false;
          $scope.jy2Flg = true;
        }else{
           $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });

  }
  //赠送第二步
  $scope.goQb=function(){
    if($scope.business.qbpass==''){
       $rootScope.tip("请输入交易密码")
      return ;
    }
    var data = {
      phone:localStorage.telephone,
      amount: $scope.business.amount,
      dfPhone: $scope.business.dfPhone,
      qbjysm:  $scope.business.bz,
      qbpass:$scope.business.qbpass,
    };
    $ionicLoading.show()

    $http({
      method: 'POST',
      url: qbcs2,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        $ionicLoading.hide()

        if(data.code=='1000'){
        
           $rootScope.tip("转赠成功");
          $scope.jy1Flg = true;
          $scope.jy2Flg = false;
          state.go('qbManage');

        }else{
           $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });

  }
})
//青贝交易记录
.controller('qbJlCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,qbjl,scrollList,$ionicLoading) {
  
//初始化榜当列表数据
var vm = $scope.vm ={
  moredata: false,
  messages: [],
  pagination: {
    currentPage: 1
  },
  tel :localStorage.telephone,
  init: function (b) {//初始化列表页
    if(vm.tel!=''&& vm.tel!=undefined){
      vm.loginFlg=true
    }
    vm.pagination.currentPage = 1;
    vm.getData(true);
    vm.moredata=false;
 },
 doRefresh:function(){
    $timeout(function() {
      vm.init();
      $scope.$broadcast('scroll.refreshComplete');
   }, 200);
 },
 loadMore: function () {
   $timeout(function() {
     vm.pagination.currentPage++;
     vm.getData(false);
   }, 500);
 },
 nowDate :  function(){
  return new Date();
  },

  jyDetail:function(data){
    state.go("qbJlDetail",{qbData:JSON.stringify(data)});

  },

  getData:function (isInit){
    $ionicLoading.show()
    var data = {
      gcaid:localStorage.gcid
    };
    $http({
      method: 'POST',
      url: qbjl,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data){
        $ionicLoading.hide()

       if(data.datas.length!="0"){
         if(isInit){
            vm.messages= scrollList.init().add(data.datas);
          }else{
             vm.messages=scrollList.add(data.datas);
             $scope.$broadcast('scroll.infiniteScrollComplete');
             $ionicScrollDelegate.resize();
          }
       }else{
             vm.moredata = true;
       }
   }).error(function (error) {
       
        $rootScope.tip("网络忙，请稍后再试……");
       if(!isInit){
               //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
               var positon = $ionicScrollDelegate.getScrollPosition();
               $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
               $scope.$broadcast('scroll.infiniteScrollComplete');
       }
   });
}

}
vm.init(1);

})

//我的订单
.controller('mebqSellCtrl', function($rootScope,$scope, scrollList,$ionicLoading,$http,$timeout,$stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,meMarket,qrjy,qxjy) {
  $scope.nowDate =  function(){
    return new Date();
  }
//qbscsfcj 1正常2 兑换中 3兑换结束 4交易取消
//qbsctype  1  出售 2  收购
  var vm = $scope.vm = {
    moredata: false,
    messages: [],
    messagess: [],
    showFlg  :0,
    title:$stateParams.title,
    id:$stateParams.id,
    pagination: {
      perPage: 10,
      currentPage: 1
    },
    ajaxEnd:false,//是不是初始化,在ajax请求之后用来判断是否显示暂无数据
    type:$stateParams.bidId,
    init: function (b) {//初始化列表页
      if(b){}
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.getDatas(true);

      vm.moredata=false;
    },
   
    menuOn :function(index){
      vm.showFlg = index
    },
    doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
      }, 200);
    },
    loadMore: function () {
      $timeout(function() {
        vm.pagination.currentPage++;
        vm.getData(false);
        vm.getDatas(false);
      }, 500);
    },
    getData:function (isInit){
      var data = {
        pageIndex: vm.pagination.currentPage,
        pageSize: "5"
      };
      $ionicLoading.show()
      $http({
        method: 'POST',
        url: meMarket,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        data:data,
        dataType: 'json',
        }).success(function(data){
      $ionicLoading.hide()

         if(data.datas.length!="0"){
           if(isInit){
              vm.messages= scrollList.init().add(data.datas);

            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
    },
    //我参与的
    getDatas:function (isInit){
      var data = {
        pageIndex: vm.pagination.currentPage,
        pageSize: "5",
        type: 2
      };
      $ionicLoading.show()
      $http({
        method: 'POST',
        url: meMarket,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        data:data,
        dataType: 'json',
        }).success(function(data){
      $ionicLoading.hide()

         if(data.datas.length!="0"){
           if(isInit){
              vm.messagess= scrollList.init().add(data.datas);

            }else{
               vm.messagess=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
    },
    qrjy:function(id){
      var data = {
        jyid:id
      };
      $http({
        method: 'POST',
        url: qrjy,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
            vm.getData(true);

            $rootScope.tip("交易成功");
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");
  
        });

    },
    qxjy:function(id){
      var data = {
        jyid:id
      };
      $http({
        method: 'POST',
        url: qxjy,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
            vm.getData(true);
            $rootScope.tip("取消成功");
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");
  
        });
    }
  }
  vm.init(1);
})

.controller('marketCtrl', function($rootScope,$scope, $ionicScrollDelegate ,scrollList,getPrice,$ionicLoading,$http,$timeout,$stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,marketList,marketTotle,buyMbq) {
  $scope.nowDate =  function(){
    return new Date();
  }
//qbscsfcj 1正常2 兑换中 3兑换结束 4交易取消
//qbsctype  1  出售 2  收购
  var vm = $scope.vm = {
    moredata: false,
    amount :"",
    messages: [],
    title:$stateParams.title,
    id:$stateParams.id,
    pagination: {
      perPage: 10,
      currentPage: 1
    },
    data:"",
    ajaxEnd:false,//是不是初始化,在ajax请求之后用来判断是否显示暂无数据
    type:$stateParams.bidId,
    init: function (b) {//初始化列表页
      if(b){}
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
    },
    doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
      }, 200);
    },
    loadMore: function () {
      $timeout(function() {
        vm.pagination.currentPage++;
        vm.getData(false);
      }, 500);
    },
    getData:function (isInit){
      var data = {
        pageIndex: vm.pagination.currentPage,
        pageSize: "5"
      };
      $ionicLoading.show()
      $http({
        method: 'POST',
        url: marketList,
        data:data,
        dataType: 'json',
        }).success(function(data){
      $ionicLoading.hide()

         if(data.datas.length!="0"){
           if(isInit){
              vm.messages= scrollList.init().add(data.datas);

            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
    },
    marketTotle: function(){
      $http({
        method: 'POST',
        url: marketTotle,
        dataType: 'json',
        }).success(function(data) {
          if(data.code=='1000'){
              vm.data = data.datas
            
          }else{
            $rootScope.tip(data.msg);
          }
        }).error(function(error) {
          $rootScope.tip("网络忙，请稍后再试……");

        });
    },
    getQb:function(){
      var data = {
        phone:localStorage.telephone
      };
      $http({
        method: 'POST',
        url: getPrice,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
            vm.amount = data.datas
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");
  
        });
    },
    qbdh: function(qbData){
     
        $ionicPopup.confirm({
          title: '提示',
          template: '出售总金额为:'+Number(qbData.qbscrmb*qbData.qbscshuliang).toFixed(2)+'RMB<br>请联系收购者：'+qbData.gcnikename+'<br>电话：<a  href="tel:'+qbData.gcphone+' ">'+qbData.gcphone+'</a></div>',
          okText: '确认兑换',
          cancelText: '取消'
       }).then(function(res) {
        if(res) {
          var data = {
            jyid:qbData.qbscid
          };
          $http({
            method: 'POST',
            url: buyMbq,
            headers: {  
              'Authorization': localStorage.token,
              'phoneNO' : localStorage.telephone,
            },  
            dataType: 'json',
            data: data,
            }).success(function(data) {
              if(data.code=='1000'){
                $rootScope.tip("已通知出售者");
              }else{
                 $rootScope.tip(data.msg);
              }
            }).error(function(error) {
               $rootScope.tip("网络忙，请稍后再试……");
      
            });
        }
       });
     
     
    },
 
    qbgm: function(qbData){
       // 用户青贝小于收购数量
     if(vm.amount>qbData.qbscshuliang){
      $ionicPopup.confirm({
        title: '提示',
        template: '购买总金额为:'+Number(qbData.qbscrmb*qbData.qbscshuliang).toFixed(2)+'RMB<br>请联系收购者：'+qbData.gcnikename+'<br>电话：<a  href="tel:'+qbData.gcphone+' ">'+qbData.gcphone+'</a></div>',
        okText: '确认购买',
        cancelText: '取消'
     }).then(function(res) {
      if(res) {
        var data = {
          jyid:qbData.qbscid
        };
        $http({
          method: 'POST',
          url: buyMbq,
          headers: {  
            'Authorization': localStorage.token,
            'phoneNO' : localStorage.telephone,
          },  
          dataType: 'json',
          data: data,
          }).success(function(data) {
            if(data.code=='1000'){
              $rootScope.tip("已通知出售者");
            }else{
               $rootScope.tip(data.msg);
            }
          }).error(function(error) {
             $rootScope.tip("网络忙，请稍后再试……");
    
          });
      }
     });
    }else{
      $rootScope.tip("可售卖数量不足");

    }
     
  
    },

  }
  vm.init(1);
  vm.marketTotle();
  if(localStorage.telephone!=''&& localStorage.telephone!=undefined){
     vm.getQb();
  }

})



//活動
.controller('actCtrl', function($rootScope,$scope,$http,$timeout, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,queryAct,scrollList,$ionicLoading,imgUrl) {
  $scope.showFlg  = 0 ;
  $scope.menuOn = function(index){
    $scope.showFlg = index
  }
  //初始化榜当列表数据
  var vm = $scope.vm ={
    moredata: false,
    messages: [],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    slidImg:'',
    hidetabs:false,
    dZFlg:false,
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
    //跳转登录       
    toLogin:function(){
      state.go('login');
    },
    tomemberCenter:function(){
      state.go('tab.memberCenter');

    },
    myScrollL:function(){
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    
        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
    },
    //   //点击图片放大
    // showBigImage :function (imgTemp) {  //传递一个参数（图片的URl）imageName
    //     vm.slidImg = JSON.parse(imgTemp)
    //     vm.bigImage = true
    //     vm.hidetabs = true
    //     StatusBar.hide()
    //     vm.myScrollL()

    // },
    showBigImage :function (imageName,imglist) {  //传递一个参数（图片的URl）imageName
      // vm.url = "http://39.97.234.111/base/userFiles/hdImg/"+imageName+""        
      // vm.bigImage = true;//显示大图
      var imgUrl =  "http://39.97.234.111/base/userFiles/hdImg/"  
      var url = imgUrl+imageName+""  
      var obj = JSON.parse(imglist)
      var tempList =[]
      for(var i=0;i<obj.length; i++){
        tempList.push(imgUrl+obj[i])
      }      
      wx.previewImage({
        current:  url, // 当前显示图片的http链接
        urls: tempList// 需要预览的图片http链接列表
      });
    },

    
  //初始默认大图是隐藏的
  hideBigImage : function () {
    vm.bigImage = false;
    // vm.hidetabs = false
    // StatusBar.show()
    // vm.logoFlg = false 


},
    dateFormats:function (data) {
      var date = new Date(data);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var Hours =date.getHours(); //时，
      var Minutes	=date.getMinutes(); //分
      var Seconds	=date.getSeconds(); //秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
        var currentdate =year+ seperator1+month + seperator1 + strDate;
      return currentdate;
    },
   
    dianzan:function(id,index){
      $http.get(bdDz+"?bdid="+id+"").success(function(data){

        if(data.code=="1000"){
          var aElements=document.getElementsByClassName("dzimg");
          var aElementsize=document.getElementsByClassName("dzsize");
          var aElement1s=document.getElementsByClassName("gifshow");

          for(var i=0;i<aElements.length;i++) {
              if(aElements[i].getAttribute("imgindex")==index){
                aElements[i].src="img/bd/List_praise_on.png";
                var  size = aElementsize[i].innerHTML;
                aElementsize[i].innerHTML=parseInt(size)+parseInt("1")
              }
          }
          for(var i=0;i<aElement1s.length;i++) {
            if(aElement1s[i].getAttribute("gifShow")==index){
                aElement1s[i].style.display="block"
                vm.index =i
                vm.hide(i);
                return;
            }
         }
        }
      }).error(function (error) {
          
           $rootScope.tip("网络忙，请稍后再试……");
        
      });

    },
    hide :function(i){
      setTimeout(function(){
        var aElement1s=document.getElementsByClassName("gifshow");

        aElement1s[i].style.display="none"

      },1000);
    },
    bdDetail:function(data){
      state.go("hdDetail",{hdData:JSON.stringify(data)});

    },
    getData:function (isInit){
      var data = {
        pageIndex: vm.pagination.currentPage,
        pageSize: "10"
      };
      $ionicLoading.show()
      $http({
        method: 'POST',
        url: queryAct,
        data:data,
        dataType: 'json',
        }).success(function(data){
      $ionicLoading.hide()

         if(data.datas.length!="0"){
           if(isInit){
            for(var i=0;i<data.datas.length;i++){
              var title =  data.datas[i].hbcontent.split('?')[1]
              var cont =  data.datas[i].hbcontent.split('?')[0]

              data.datas[i].title =title
              data.datas[i].cont =cont

              if(data.datas[i].hbimgpath!=undefined){
                var imgTemp = data.datas[i].hbimgpath.split(';')
            
                data.datas[i].imgTemp=imgTemp
              }
           
            }
              vm.messages= scrollList.init().add(data.datas);

            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
  }
 }
 vm.init(1);
}) 


//青贝交易详情
.controller('qbJlDetailCtrl', function($scope,$location,$http,$stateParams,$interval,$ionicPopup,$rootScope,req,reqRoot,tip,state,balance,httpService,_responseData,sqLiteLoginInfo,bdMsgList,imgUrl,bdDz,bdjb,plbd) {
  var vm = $scope.vm ={
    moredata: false,
    messages:  [JSON.parse($stateParams.qbData )],

  
 }

})
//活动
.controller('actManageCtrl', function($scope,$http,$rootScope,meAct,tip,$stateParams,scrollList,msgSize,$timeout,$ionicScrollDelegate,state,$ionicPopup,imgUrl,bdList,bdDz,$ionicLoading,$ionicSlideBoxDelegate,$cordovaStatusbar) {

 $scope.showFlg  = 0 ;
  $scope.menuOn = function(index){
    $scope.showFlg = index
  }
   //初始化榜当列表数据
   var vm = $scope.vm ={
    moredata: false,
    messages: [],
    messagesJoin:[],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    init: function (b) {//初始化列表页
      if(vm.tel!=''&& vm.tel!=undefined){
        vm.loginFlg=true
      }
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.getDatas(true)
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
       vm.getDatas(false)

     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
    //参加
    getDatas:function (isInit){
      $ionicLoading.show()
      var data = {
        type:"1"
      };
      $http({
        method: 'POST',
        url: meAct,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data){
          $ionicLoading.hide()
  
         if(data.datas.length!="0"){
           if(isInit){

            for(var i=0;i<data.datas.length;i++){
              var title =  data.datas[i].hbcontent.split('?')[1]
              var cont =  data.datas[i].hbcontent.split('?')[0]

              data.datas[i].title =title
              data.datas[i].cont =cont

              if(data.datas[i].hbimgpath!=undefined){
                var imgTemp = data.datas[i].hbimgpath.split(';')
             
                data.datas[i].imgTemp=imgTemp

              }
           
            }
              vm.messagesJoin= scrollList.init().add(data.datas);
            }else{
               vm.messagesJoin=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
   },
    getData:function (isInit){
      $ionicLoading.show()
      var data = {
        type:"2"
      };
      $http({
        method: 'POST',
        url: meAct,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data){
          $ionicLoading.hide()
  
         if(data.datas.length!="0"){
           if(isInit){
            for(var i=0;i<data.datas.length;i++){
              var title =  data.datas[i].hbcontent.split('?')[1]
              var cont =  data.datas[i].hbcontent.split('?')[0]

              data.datas[i].title =title
              data.datas[i].cont =cont

              if(data.datas[i].hbimgpath!=undefined){
                var imgTemp = data.datas[i].hbimgpath.split(';')
             
                data.datas[i].imgTemp=imgTemp

              }
           
            }
              vm.messages= scrollList.init().add(data.datas);
            }else{
               vm.messages=scrollList.add(data.datas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
         if(!isInit){
                 //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
                 var positon = $ionicScrollDelegate.getScrollPosition();
                 $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
                 $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     });
  }
  
  }
  vm.init(1);
  
})

//发榜详情
.controller('fbDetailCtrl', function($scope,bdSc,$location,$timeout,$http,$stateParams,$interval,$ionicPopup,$rootScope,req,reqRoot,tip,state,balance,httpService,_responseData,sqLiteLoginInfo,scrollList,$ionicLoading,bdDetailJl,ljjb,imgUrl) {
  var vm = $scope.vm ={
    moredata: false,
    qbpass:"",
    messages:  [JSON.parse($stateParams.fbData )],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    dZFlg:false,
    lyList:[],
    bdplcontent:"",
    accountID:"",
    showFlg:false,
    qbpass:"",
    init: function (b) {//初始化列表页
     
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },

      //点击图片放大
    showBigImage :function (imageName) {  //传递一个参数（图片的URl）imageName
      vm.url = imgUrl+imageName+""        
      vm.bigImage = true;//显示大图
    },
    keyBoardUp :function($event){
      if(ionic.Platform.isIOS()){
        document.getElementsByClassName("counselor-pop")[0].style.top="-30%"
      }
    },
    delect :function(){
        var bdid = vm.messages[0].bdid
        if(vm.messages[0].bdstat=="已删除"){
          $rootScope.tip("榜单已删除，请勿重复操作");
            return
        }
        $http({
          method: 'get',
          url: bdSc+"?bdid="+bdid+"",
          headers: {  
            'Authorization': localStorage.token,
            'phoneNO' : localStorage.telephone,
          },  
          dataType: 'json',
          }).success(function(data){

          if(data.code=="1000"){
       
            $rootScope.tip("删除成功");
            state.go('fbJl');


          }
        }).error(function (error) {
            
             $rootScope.tip("网络忙，请稍后再试……");
          
        });
    },
    jiebang :function(id){
      vm.accountID = id
      var myPopup = $ionicPopup.show({
      template: '<input type="password" class="counselor-pop" ng-click="vm.keyBoardUp($event)" placeholder="请输入青贝密码" ng-model="vm.qbpass" name="vm.qbpass"    >',
       cssClass:'counselor-pop',
       title: '',
       scope: $scope,
       buttons: [
         { text: '×' },
         {
           text: '<b>确认结算榜单</b>',
           type: 'button-positive',
           onTap: function(e) {
              if(vm.qbpass == ''){
                 $rootScope.tip('请输入密码');
                e.preventDefault();
              }else{
                return vm.qbpass;
              }
           }
         },
       ]
      });
      myPopup.then(function(res) {
        if(res){
          var data = {
            accountID:  vm.accountID,
            bdid    : vm.messages[0].bdid,
            qbpass    :vm.qbpass
          };
            $http({
              method: 'POST',
              url: ljjb,
              data:data,
              headers: {  
                'Authorization': localStorage.token,
                'phoneNO' : localStorage.telephone,
              },  
              dataType: 'json',
              }).success(function(data) {
                if(data.code=='1000'){
                   $rootScope.tip("结榜成功");
                }else{
                   $rootScope.tip(data.msg);
                }
              }).error(function(error) {
                 $rootScope.tip("网络忙，请稍后再试……");
      
              });
       
        }
      });
   
  },
  //初始默认大图是隐藏的
    hideBigImage : function () {
        vm.bigImage = false;
    },
 
    hide :function(i){
      setTimeout(function(){
        var aElement1s=document.getElementsByClassName("gifshow");

        aElement1s[i].style.display="none"

      },1000);
    },
   
    getData:function (isInit){
      $http({
        method: 'POST',
         url: bdDetailJl+"?bdid="+vm.messages[0].bdid,
       // url: bdDetailJl+"?bdid=3",

        // headers: {  
        //   'Authorization': localStorage.token,
        //   'phoneNO' : localStorage.telephone,
        // },  
        dataType: 'json',
        }).success(function(data) {
          if(data.code=='1000'){
            vm.lyList= data.datas;

          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
  }
 }
 vm.init(1);
 
})
//榜单详情
.controller('bdDetailCtrl', function($scope,$location,$http,$stateParams,$interval,$ionicPopup,$rootScope,req,reqRoot,tip,state,balance,httpService,_responseData,sqLiteLoginInfo,bdMsgList,imgUrl,bdDz,bdjb,plbd) {
  var vm = $scope.vm ={
    moredata: false,
    messages:  [JSON.parse($stateParams.bdData )],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    dZFlg:false,
    lyList:[],
    qbpass:"",
    bdplcontent:"",
    init: function (b) {//初始化列表页
     
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
    //跳转登录       
    toLogin:function(){
      state.go('login');
    },
    tomemberCenter:function(){
      state.go('tab.memberCenter');

    },
      //点击图片放大
    showBigImage :function (imageName) {  //传递一个参数（图片的URl）imageName
      vm.url = imgUrl+imageName+""        
      
      vm.bigImage = true;//显示大图
    },
    keyBoardUp :function($event){
      if(ionic.Platform.isIOS()){
        document.getElementsByClassName("counselor-pop")[0].style.top="-30%"
      }
    },
    jiebang:function(){
      var data = {
        "bangdanid": vm.messages[0].bdid,
      };
      $http({
        method: 'POST',
        url: bdjb,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
             $rootScope.tip("揭榜成功");

          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
    },
    showPop :function(){
        var myPopup = $ionicPopup.show({
        template: '<textarea rows="8" cols="20" placeholder="请输入评论信息" ng-click="keyBoardUp($event)" ng-focus="resizeHeight()" ng-blur="recoveryHeight()" ng-model="vm.bdplcontent"></textarea>',
         cssClass:'counselor-pop',
         title: '',
         scope: $scope,
         buttons: [
           { text: '×' },
           {
             text: '<b>确定发送</b>',
             type: 'button-positive',
             onTap: function(e) {
                if(vm.bdplcontent == ''){
                   $rootScope.tip('请输入评论信息');
                  e.preventDefault();
                }else{
                  return vm.bdplcontent;
                }
             }
           },
         ]
        });
        myPopup.then(function(res) {
          if(res){
            var data = {
              "bdid": vm.messages[0].bdid,
              "bdplcontent": vm.bdplcontent,
              "bdplrid": localStorage.gcid,
              "bdplrnikename": localStorage.gcnikename,

            };
            $http({
              method: 'POST',
              url: plbd,
              headers: {  
                'Authorization': localStorage.token,
                'phoneNO' : localStorage.telephone,
              },  
              dataType: 'json',
              data: data,
              }).success(function(data) {
                if(data.code=='1000'){
                  vm.init(1);
                   $rootScope.tip("评论成功");
                }else{
                   $rootScope.tip(data.msg);
                }
              }).error(function(error) {
                 $rootScope.tip("网络忙，请稍后再试……");
      
              });
         
          }
        });
     
    },
  //初始默认大图是隐藏的
    hideBigImage : function () {
        vm.bigImage = false;
    },
    dateFormats:function (data) {
      var date = new Date(data);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var Hours =date.getHours(); //时，
      var Minutes	=date.getMinutes(); //分
      var Seconds	=date.getSeconds(); //秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
        var currentdate =year+ seperator1+month + seperator1 + strDate;
      return currentdate;
    },
   
    dianzan:function(id,index){
      $http.get(bdDz+"?bdid="+id+"").success(function(data){
        if(data.code=="1000"){
          var aElements=document.getElementsByClassName("dzimg");
          var aElementsize=document.getElementsByClassName("dzsize");
          var aElement1s=document.getElementsByClassName("gifshow");

          for(var i=0;i<aElements.length;i++) {
              if(aElements[i].getAttribute("imgindex")==index){
                aElements[i].src="img/bd/List_praise_on.png"
                var  size = aElementsize[i].innerHTML;
                aElementsize[i].innerHTML=parseInt(size)+parseInt("1")
              }
          }
          for(var i=0;i<aElement1s.length;i++) {
            if(aElement1s[i].getAttribute("gifShow")==index){
                aElement1s[i].style.display="block"
                vm.index =i
                vm.hide(i);
                return;
            }
         }
        }
      }).error(function (error) {
          
           $rootScope.tip("网络忙，请稍后再试……");
        
      });

    },
    hide :function(i){
      setTimeout(function(){
        var aElement1s=document.getElementsByClassName("gifshow");

        aElement1s[i].style.display="none"

      },1000);
    },
    bdDetail:function(data){
      state.go("bdDetail",{bdData:JSON.stringify(data)});

    },
    getData:function (isInit){
     $http.get(bdMsgList+"?bdid="+vm.messages[0].bdid).success(function(data){
         if(data.datas.length!="0"){
           if(isInit){
              // vm.lyList= scrollList.init().add(data.datas);
                 vm.lyList= data.datas;

            }else{
              //  vm.lyList=scrollList.add(data.datas);
              //  $scope.$broadcast('scroll.infiniteScrollComplete');
              //  $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
        //  if(!isInit){
        //          //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
        //          var positon = $ionicScrollDelegate.getScrollPosition();
        //          $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
        //          $scope.$broadcast('scroll.infiniteScrollComplete');
        //  }
     });
  }
 }
 vm.init(1);

})
//活动详情
.controller('hdDetailCtrl', function($scope,$location,$http,$stateParams,$interval,$ionicPopup,$rootScope,req,reqRoot,tip,state,balance,httpService,_responseData,sqLiteLoginInfo,bdMsgList,imgUrl,bdDz,bdjb,canjiaAct) {
  var vm = $scope.vm ={
    moredata: false,
    messages:  [JSON.parse($stateParams.hdData )],
    pagination: {
      currentPage: 1
    },
    tel :localStorage.telephone,
    gcnikename:localStorage.gcnikename,
    gcphoto:localStorage.gcphoto,
    loginFlg:false,
    bigImage : false,
    url:'',
    dZFlg:false,
    lyList:[],
    qbpass:"",
    bdplcontent:"",
    init: function (b) {//初始化列表页
     
      vm.pagination.currentPage = 1;
      vm.getData(true);
      vm.moredata=false;
   },
   doRefresh:function(){
      $timeout(function() {
        vm.init();
        $scope.$broadcast('scroll.refreshComplete');
     }, 200);
   },
   loadMore: function () {
     $timeout(function() {
       vm.pagination.currentPage++;
       vm.getData(false);
     }, 500);
   },
   nowDate :  function(){
    return new Date();
    },
    //跳转登录       
    toLogin:function(){
      state.go('login');
    },
    tomemberCenter:function(){
      state.go('tab.memberCenter');

    },
      //点击图片放大
    showBigImage :function (imageName) {  //传递一个参数（图片的URl）imageName
      vm.url = "http://39.97.234.111/base/userFiles/hdImg/"+imageName+""        
      
      vm.bigImage = true;//显示大图
    },
    keyBoardUp :function($event){
      if(ionic.Platform.isIOS()){
        document.getElementsByClassName("counselor-pop")[0].style.top="-30%"
      }
    },
    joinAct:function(){
      //如果 活动金额大于0 输入密码
        if(vm.messages[0].hbjfje>0){
           vm.jiebang()
           return;
        }
      var data = {
        "huodongid": vm.messages[0].hdid,
        "cyrid":localStorage.gcid

      };
      $http({
        method: 'POST',
        url: canjiaAct,
        headers: {  
          'Authorization': localStorage.token,
          'phoneNO' : localStorage.telephone,
        },  
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
             $rootScope.tip("参加成功");

          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
    },
    jiebang :function(id){
      vm.accountID = id
      var myPopup = $ionicPopup.show({
      template: '<input type="password" class="counselor-pop" ng-click="vm.keyBoardUp($event)" placeholder="请输入青贝密码" ng-model="vm.qbpass" name="vm.qbpass"    >',
       cssClass:'counselor-pop',
       title: '',
       scope: $scope,
       buttons: [
         { text: '×' },
         {
           text: '<b>确认参加活动</b>',
           type: 'button-positive',
           onTap: function(e) {
              if(vm.qbpass == ''){
                 $rootScope.tip('请输入密码');
                e.preventDefault();
              }else{
                return vm.qbpass;
              }
           }
         },
       ]
      });
      myPopup.then(function(res) {
        if(res){
          var data = {
            "huodongid": vm.messages[0].hdid,
            "cyrid":localStorage.gcid,
            "jymm": vm.qbpass
          };
            $http({
              method: 'POST',
              url: canjiaAct,
              data:data,
              headers: {  
                'Authorization': localStorage.token,
                'phoneNO' : localStorage.telephone,
              },  
              dataType: 'json',
              }).success(function(data) {
                if(data.code=='1000'){
                  $rootScope.tip("参加成功");
                }else{
                   $rootScope.tip(data.msg);
                }
              }).error(function(error) {
                 $rootScope.tip("网络忙，请稍后再试……");
      
              });
       
        }
      });
   
  },
  //初始默认大图是隐藏的
    hideBigImage : function () {
        vm.bigImage = false;
    },
    dateFormats:function (data) {
      var date = new Date(data);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var Hours =date.getHours(); //时，
      var Minutes	=date.getMinutes(); //分
      var Seconds	=date.getSeconds(); //秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
        var currentdate =year+ seperator1+month + seperator1 + strDate;
      return currentdate;
    },
   
    dianzan:function(id,index){
      $http.get(bdDz+"?bdid="+id+"").success(function(data){
        if(data.code=="1000"){
          var aElements=document.getElementsByClassName("dzimg");
          var aElementsize=document.getElementsByClassName("dzsize");
          var aElement1s=document.getElementsByClassName("gifshow");

          for(var i=0;i<aElements.length;i++) {
              if(aElements[i].getAttribute("imgindex")==index){
                aElements[i].src="img/bd/List_praise_on.png"
                var  size = aElementsize[i].innerHTML;
                aElementsize[i].innerHTML=parseInt(size)+parseInt("1")
              }
          }
          for(var i=0;i<aElement1s.length;i++) {
            if(aElement1s[i].getAttribute("gifShow")==index){
                aElement1s[i].style.display="block"
                vm.index =i
                vm.hide(i);
                return;
            }
         }
        }
      }).error(function (error) {
          
           $rootScope.tip("网络忙，请稍后再试……");
        
      });

    },
    hide :function(i){
      setTimeout(function(){
        var aElement1s=document.getElementsByClassName("gifshow");

        aElement1s[i].style.display="none"

      },1000);
    },
    bdDetail:function(data){
      state.go("bdDetail",{bdData:JSON.stringify(data)});

    },
    getData:function (isInit){
     $http.get(bdMsgList+"?bdid="+vm.messages[0].bdid).success(function(data){
         if(data.datas.length!="0"){
           if(isInit){
              // vm.lyList= scrollList.init().add(data.datas);
                 vm.lyList= data.datas;

            }else{
              //  vm.lyList=scrollList.add(data.datas);
              //  $scope.$broadcast('scroll.infiniteScrollComplete');
              //  $ionicScrollDelegate.resize();
            }
         }else{
               vm.moredata = true;
         }
     }).error(function (error) {
         
          $rootScope.tip("网络忙，请稍后再试……");
        //  if(!isInit){
        //          //当获取数据失败的时候，为了避免无限上拉，将视图的位置向上滚动一点距离
        //          var positon = $ionicScrollDelegate.getScrollPosition();
        //          $ionicScrollDelegate.scrollTo(0,positon.top*0.9);
        //          $scope.$broadcast('scroll.infiniteScrollComplete');
        //  }
     });
  }
 }
//  vm.init(1);

})
.controller('RegisterLoginStep11Ctrl', function($rootScope,$scope,$stateParams,$interval,$ionicHistory,$ionicPopup,$http,sqLiteLoginInfo,req,reqRoot,state,tip,register,getMsg,$ionicLoading, $cordovaToast) {
  $scope.register={
    msgCode:'',
    ciKey:'',
    tel:$stateParams.tel,
    gcnikename:"",
    gcpass:"",
  }



  $scope.getMsgCode = function(){
      var data = {
        phoneNO:$stateParams.tel,
      };
      $ionicLoading.show()
      $http({
        method: 'POST',
        url: getMsg,
        dataType: 'json',
        data: data,

        }).success(function(data) {
          $ionicLoading.hide()
          if(data.code == "1000"){
             $rootScope.tip("短信验证码发送成功");
          }else{
             $rootScope.tip(data.returnMsg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });

   
   
  }

  $scope.goRegisterView = function(){
    $rootScope.RLType="0";//回到注册页面去
    $rootScope.goBackView();
  }
  $scope.next = function(){
    if($scope.register.msgCode == ""){
       $rootScope.tip("请输入短信验证码");
      return;
    }
    if($scope.register.gcnikename == ""){
      $rootScope. $rootScope.tip("请输入昵称")
      return;
    }
    if($scope.register.gcpass == ""){
       $rootScope.tip("请输入密码");
      return;
    }
      var data = {
        gcnikename:$scope.register.gcnikename,
        gcpass:$scope.register.gcpass,
        gcphone:$stateParams.tel,
        validateCode:$scope.register.msgCode 
      };
      $ionicLoading.show()

      $http({
        method: 'POST',
        url: register,
        dataType: 'json',
        data: data,

        }).success(function(data) {
          $ionicLoading.hide()

          if(data.code == "1000"){
             $rootScope.tip("注册成功");
            state.go("login")
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });

    
  }

  //$scope.getMsgCode();

})
//修改密码
.controller('upPassCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,updateMsg,addPass) {

  $scope.login = {
    gcphone: localStorage.telephone,//登录手机号
    validateCode:'',
    gcpass:'',
  };
  $scope.checkTel = function(){//验证手机号码
    var reg = /^1[2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if(!reg.test($scope.login.gcphone)){
       $rootScope.tip("请输入正确的手机号码");
      return false;
    }else{
      return true;
    }
  }
    $scope.formatMoblie = function(phone){
    if(phone && Object.prototype.toString.call(phone) === "[object String]" && phone != ''){
      return phone.substring(0,3)+'****'+phone.substring(phone.length-4,phone.length);
    }else{
      return '';
    }
  }
  $scope.change = function(){
     $scope.loginState = false;
  }
  //获取验证码
  $scope.getMsgCode=function(){
    if(!$scope.checkTel()&&$scope.gCode){
      return;
    }
      var data = {
        phoneNO:$scope.login.gcphone,
      };
      $http({
        method: 'POST',
        url: updateMsg,
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
  }
    //修改
    $scope.next=function(){
      if(!$scope.checkTel()){
        return;
      }
        var data = {
          gcphone: $scope.login.gcphone,
          validateCode:$scope.login.validateCode,
          gcpass:$scope.login.gcpass
        };
        $http({
          method: 'POST',
          url: addPass,
          dataType: 'json',
          data: data,
          }).success(function(data) {
            if(data.code=='1000'){
               $rootScope.tip("修改成功");
  
            }else{
               $rootScope.tip(data.msg);
            }
          }).error(function(error) {
             $rootScope.tip("网络忙，请稍后再试……");
  
          });
    
    }


})
//修改密碼
.controller('upPasssCtrl', function($rootScope,$scope,$http, $stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,updateMsg,addPass) {

  $scope.login = {
    gcphone: '',//登录手机号
    validateCode:'',
    gcpass:'',
  };
  //获取验证码
  $scope.getMsgCode=function(){
    if($scope.login.gcphone==''){
      $rootScope.tip("请输入手机号");
       return false;
    }
    var reg = /^1[2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if(!reg.test($scope.login.gcphone)){
       $rootScope.tip("请输入正确的手机号码");
      return false;
    }
      var data = {
        phoneNO:$scope.login.gcphone,
      };
      $http({
        method: 'POST',
        url: updateMsg,
        dataType: 'json',
        data: data,
        }).success(function(data) {
          if(data.code=='1000'){
            $rootScope.tip("短信已发送");

          }else{
             $rootScope.tip(data.msg);
          }
        }).error(function(error) {
           $rootScope.tip("网络忙，请稍后再试……");

        });
  }
    //修改
    $scope.next=function(){
        var data = {
          gcphone: $scope.login.gcphone,
          validateCode:$scope.login.validateCode,
          gcpass:$scope.login.gcpass
        };
        $http({
          method: 'POST',
          url: addPass,
          dataType: 'json',
          data: data,
          }).success(function(data) {
            if(data.code=='1000'){
               $rootScope.tip("修改成功");
               state.go('login');


  
            }else{
               $rootScope.tip(data.msg);
            }
          }).error(function(error) {
             $rootScope.tip("网络忙，请稍后再试……");
  
          });
    
    }


})


//我的手册
.controller('meScListCtrl', function($rootScope,getPrice,$scope,$http, meSc,$stateParams,$ionicHistory,$ionicPopup,state,req,reqRoot,_responseData,sqLiteLoginInfo,zcInfo,tip,httpService,updateMsg,addPass) {
  $scope.amount ="0"
  $scope.goSc = function(){
    $ionicPopup.confirm({
      title: '提示',
      template: '天资禀赋测试，每次扣除500MQB,点击确认将会扣费，中途退出不予退还',
      okText: '确认测评',
      cancelText: '取消'
   }).then(function(res) {
    if(res) {
      if($scope.amount>=500){
        var data = {
          phone: localStorage.telephone,
        };
        $http({
          method: 'POST',
          url: meSc,                              
          headers: {  
            'Authorization': localStorage.token,
            'phoneNO' : localStorage.telephone,
          },  
          dataType: 'json',
          data: data,
          }).success(function(data) {
            if(data.code=='1000'){
            window.location.href="https://app.you121.top/strength/show.php?action=totest&data="+data.datas.data+""
    
            }else{
              $rootScope.tip(data.msg);
            }
          }).error(function(error) {
            $rootScope.tip("网络忙，请稍后再试……");
    
          });
      }else{
            $rootScope.tip("青贝余额不足");

      }
    
    }
   });
  }

  $scope.cpjl = function(){
        var data = {
          phone: localStorage.telephone,
          type:"2"
        };
        $http({
          method: 'POST',
          url: meSc,
          headers: {  
            'Authorization': localStorage.token,
            'phoneNO' : localStorage.telephone,
          },  
          dataType: 'json',
          data: data,
          }).success(function(data) {
            if(data.code=='1000'){
            window.location.href="https://app.you121.top/strength/show.php?action=totest&data="+data.datas.data+""
    
            }else{
              $rootScope.tip(data.msg);
            }
          }).error(function(error) {
            $rootScope.tip("网络忙，请稍后再试……");
    
          });
  }
  $scope.getQb=function(){
    var data = {
      phone:localStorage.telephone
    };
    $http({
      method: 'POST',
      url: getPrice,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
          $scope.amount = data.datas
        }else{
           $rootScope.tip(data.msg);
        }
      }).error(function(error) {
         $rootScope.tip("网络忙，请稍后再试……");

      });
  }

  $scope.getQb()
})

//人才詳情
.controller('rcDetailCtrl', function($scope,meSc,$location,$http,$stateParams,$interval,$ionicPopup,$rootScope,req,reqRoot,tip,state,balance,httpService,_responseData,sqLiteLoginInfo,bdMsgList,imgUrl,bdDz,bdjb,plbd) {

  $scope.messages=JSON.parse($stateParams.rcData)
  $scope.showFlg = true
  $scope.open = function(){
    if(  $scope.showFlg==true){
      $scope.showFlg=  false
    }else{
      $scope.showFlg= true

    }
  
  }

  $scope.cpjl = function(){
    var data = {
      phone: localStorage.telephone,
      type:"2"
    };
    $http({
      method: 'POST',
      url: meSc,
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
        window.location.href="https://app.you121.top/strength/show.php?action=totest&data="+data.datas.data+""

        }else{
          $rootScope.tip(data.msg);
        }
      }).error(function(error) {
        $rootScope.tip("网络忙，请稍后再试……");

      });
}
   
})
/******************************************************************************************************************************************************************/
/***************************************************************过滤器过滤器过滤器*********************************************************************************/
//保留两位小数点
  .filter('pointFormat',function(){
    return function(num) {
      var result;
      var numToString = num + '';
      var dotNum = numToString.indexOf(".");
      if (dotNum == -1) {//无小数点
        result = numToString + ".00";
      } else {//有小数点
        result = numToString.substring(0, dotNum + 3);
      }
      return result;
    }
  })
  //日期格式化
  .filter('dateFormat',function(){
    return function(num) {
      var result;
      result = num.substring(0, 4) + "-" + num.substring(4, 6) + "-" + num.substring(6, 8);
      return result;
    }
    
  })

  //日期格式化
  .filter('dateFormat',function(){
      return function(num) {
        var result;
        result = num.substring(0, 4) + "-" + num.substring(4, 6) + "-" + num.substring(6, 8);
        return result;
      }
      
    })
