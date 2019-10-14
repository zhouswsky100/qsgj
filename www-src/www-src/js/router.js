angular.module('starter.router', [])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })
  // Each tab has its own nav history stack:
  .state('tab.investIndex', {
      cache: false,
      url: '/investIndex',
      views: {
        'tab-investIndex': {
          templateUrl: 'templates/tab-investIndex.html',
          controller: 'InvestIndexCtrl'
        }
      }
  })

  .state('tab.bidList', {
    cache: false,
    url: '/bidList/:bidId/:querytype/:isPreview',
    prefetchTemplate:false,
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidList.html',
          controller: 'BidListCtrl'
        }
    }
  })
  .state('tab.bidListNewFish', {
    cache: false,
    prefetchTemplate:false,
    url: '/bidListNewFish/:bidId',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidListNewFish.html',
          controller: 'BidListNewFishCtrl'
        }
    }
  })
  .state('tab.bidListCly', {
    cache: false,
    prefetchTemplate:false,
    url: '/bidListCly/:bidId/:querytype',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidListCly.html',
          controller: 'BidListClyCtrl'
        }
    }
  })
  .state('tab.bidHistory', {
    cache: false,
    prefetchTemplate:false,
    url: '/bidHistory/:bidId/:querytype',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidHistory.html',
          controller: 'BidHistoryCtrl'
        }
    }
   })
  .state('tab.bidDetail', {
    cache: false,
    prefetchTemplate:false,
    url: '/bidDetail/:lnNo/:bidId',
    params: {
      NOVICETENDERAMT:'',
      NOVICETENDERTIMES:''
    },
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidDetail.html',
          controller: 'BidDetailCtrl'
        }
    }
   })
  /*项目详情页*/
  .state('tab.projectDetail', {
    cache: false,
    prefetchTemplate:false,
    url: '/projectDetail/:lnNo/:bidId/:prdType/:srcLnNo',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectDetail.html',
          controller: 'ProjectDetailCtrl'
        }
    }
   })
  /*普通标产品详情页*/
  .state('tab.projectDetailCpxq', {
    cache: false,
    prefetchTemplate:false,
    url: '/projectDetailCpxq/:lnNo/:bidId/:prdType/:srcLnNo',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectDetailCpxq.html',
          controller: 'ProjectDetailCtrl'
        }
    }
   })
  /*普通标担保机构页*/
  .state('tab.projectDetailDbjg', {
    cache: false,
    prefetchTemplate:false,
    url: '/projectDetailDbjg/:lnNo/:bidId/:prdType/:srcLnNo',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectDetailDbjg.html',
          controller: 'ProjectDetailCtrl'
        }
    }
   })
  /*普通标风控措施页*/
  .state('tab.projectDetailFkcs', {
    cache: false,
    prefetchTemplate:false,
    url: '/projectDetailFkcs/:lnNo/:bidId/:prdType/:srcLnNo',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectDetailFkcs.html',
          controller: 'ProjectDetailCtrl'
        }
    }
   })
  /*项目来源*/
  .state('tab.projectResource', {
    cache: false,
    prefetchTemplate:false,
    url: '/projectResource/:lnNo',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectResource.html',
          controller: 'ProjectResourceCtrl'
        }
    }
   })
  .state('tab.investRecord', {
    cache: false,
    prefetchTemplate:false,
    url: '/investRecord/:lnNo/:bidId',
    views:{
        'tab-investIndex': {
          templateUrl: 'templates/investRecord.html',
          controller: 'InvestRecordCtrl'
        }
    }
  })
  /*投资券*/
  .state('investTickets', {
        cache: false,
        prefetchTemplate:false,
        url: '/investTickets/:type/:isInvest/:lnno',
        templateUrl: 'templates/investTickets.html',
        controller: 'InvestTicketsCtrl'
    })
  /*协议*/
  .state('tab.investProtocol', {
        cache: false,
        prefetchTemplate:false,
        url: '/investProtocol/:lnno/:lnamt',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investProtocol.html',
            controller: 'InvestProtocolCtrl'
          }
        }
    })
  /*金交所协议*/
  .state('tab.investJjsProtocol', {
        cache: false,
        prefetchTemplate:false,
        url: '/investJjsProtocol/:lnno/:lnamt/:bidAmtDF',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investJjsProtocol.html',
            controller: 'InvestJjsProtocolCtrl'
          }
        }
    })
  .state('tab.invest', {
        //暂时去掉
        //cache: false,
        prefetchTemplate:false,
        url: '/invest/:lnno/:lnamt/:isNew/:rate/:bidId',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/invest.html',
            controller: 'InvestCtrl'
          }
        }
    })
  .state('tab.investSyd', {//和普通标的投资页面共用controller
        //暂时去掉
        prefetchTemplate:false,
        //cache: false,
        url: '/investSyd/:lnno/:lnamt/:isNew/:rate/:bidId/:lnTerm',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investSyd.html',
            controller: 'InvestCtrl'
          }
        }
    })
  .state('tab.investSuccess', {
        cache: false,
        prefetchTemplate:false,
        url: '/investSuccess/:msg',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investSuccess.html',
            controller: 'InvestSuccessCtrl'
          }
        }
    })




  //银行卡信息
   .state('tab.banksInfo', {
    cache: false,
    prefetchTemplate:false,
    url: '/banksInfo',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/banksInfo.html',
          controller: 'BanksInfoCtrl'
        }
    }
   })

  //资产统计
  .state('tab.assetStatistics', {
        cache: false,
        prefetchTemplate:false,
        url: '/assetStatistics',
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/assetStatistics.html',
          controller: 'AssetStatisticsCtrl'
        }
    }
    })
  //我的投资
  .state('tab.myInvest', {
        cache: false,
        prefetchTemplate:false,
        url: '/myInvest',
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/myInvest.html',
          controller: 'MyInvestCtrl'
        }
    }
    })
  //我的投资(改版)
  .state('tab.myInvestNew', {
        cache: false,
        prefetchTemplate:false,
        url: '/myInvestNew/:tabIndex/:queryType/:planStatus',//tabIndex:0 投资项目 tabIndex:1 定期计划;queryType:投资项目的类型，2持有中，3已结清，4已债转;planStatus:定期计划类型，1持有中，2退出中，3已退出
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/myInvestNew.html',
          controller: 'MyInvestNewCtrl'
        }
    }
    })
   //投资详情
  .state('tab.investDetail', {
        cache: false,
        url: '/investDetail/:lnNo/:txNo/:prdTyp/:type/:index',
        prefetchTemplate:false,
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/investDetail.html',
          controller: 'InvestDetailCtrl'
        }
    }
    })
  //资金管理
  .state('tab.capitalM', {
        cache: false,
        prefetchTemplate:false,
        url: '/capitalM',
        views:{
          'tab-memberCenter': {
            templateUrl: 'templates/capitalM.html',
            controller: 'capitalMCtrl'
          }
        }
    })
  //资金流水
  .state('tab.capitalFlow', {
        cache: false,
        prefetchTemplate:false,
        url: '/capitalFlow',
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/capitalFlow.html',
          controller: 'CapitalFlowCtrl'
        }
    }
    })
  //资金流水查询
  .state('capitalFlowQuery', {
        cache: false,
        prefetchTemplate:false,
        url: '/capitalFlowQuery',
        templateUrl: 'templates/capitalFlowQuery.html',
        controller: 'CapitalFlowQueryCtrl'
    })
  //充提记录，此页面需要缓存，不要加cache:false
  .state('record', {
        url: '/record',
        prefetchTemplate:false,
        templateUrl: 'templates/record.html',
        controller: 'RecordCtrl'
    })
  //充提记录查询
  .state('recordQuery', {
        cache: false,
        url: '/recordQuery',
        prefetchTemplate:false,
        templateUrl: 'templates/recordQuery.html',
        controller: 'RecordQueryCtrl'
    })
  //充提记录详情
  .state('recordInfo', {
        cache: false,
        prefetchTemplate:false,
        url: '/recordInfo/:index',
        templateUrl: 'templates/recordInfo.html',
        controller: 'RecordInfoCtrl'
    })

    //安全认证
   .state('tab.safeAuthen', {
    cache: false,
    prefetchTemplate:false,
    url: '/safeAuthen',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/safeAuthen.html',
          controller: 'safeAuthenCtrl'
        }
    }
   })
   //实名认证
   .state('tab.realName', {
    url: '/realName',
    prefetchTemplate:false,
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/realName.html',
          controller: 'realNameCtrl'
        }
    }
   })
   //实名认证后信息展示
   .state('tab.realNameInfo', {
    url: '/realNameInfo',
    prefetchTemplate:false,
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/realNameInfo.html',
          controller: 'RealNameInfoCtrl'
        }
    }
   })
   //更换绑定的手机号码
   .state('tab.updatePhn', {
    cache: false,
    url: '/updatePhn',
    prefetchTemplate:false,
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/updatePhn.html',
          controller: 'updatePhnCtrl'
        }
    }
   })
   //更换绑定的手机号码第二步
   .state('tab.updatePhnStep2', {
    cache: false,
    prefetchTemplate:false,
    url: '/updatePhnStep2',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/updatePhnStep2.html',
          controller: 'updatePhnStep2Ctrl'
        }
    }
   })

    //修改交易密码
   .state('tab.updateTradePwd', {
    cache: false,
    prefetchTemplate:false,
    url: '/updateTradePwd',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/updateTradePwd.html',
          controller: 'UpdateTradePwdCtrl'
        }
    }
   })
   //我的积分
   .state('tab.scoreM', {
    cache: false,
    prefetchTemplate:false,
    url: '/scoreM',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/scoreM.html',
          controller: 'scoreMCtrl'
        }
    }
   })
   //会员等级
   .state('tab.scoreLevel', {
    cache: false,
    prefetchTemplate:false,
    url: '/scoreLevel',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/scoreLevel.html',
          controller: 'scoreLevelCtrl'
        }
    }
   })
   //成长值及积分明细记录
   .state('tab.scoreDetail', {
    cache: false,
    prefetchTemplate:false,
    url: '/scoreDetail/:type/:titleName',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/scoreDetail.html',
          controller: 'scoreDetailCtrl'
        }
    }
   })
   //积分兑换
   .state('tab.scoreExchange', {
    cache: false,
    prefetchTemplate:false,
    url: '/scoreExchange',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/scoreExchange.html',
          controller: 'scoreExchangeCtrl'
        }
    }
   })

   //账户充值
  .state('recharge', {
        url: '/recharge',
        prefetchTemplate:false,
        templateUrl: 'templates/recharge.html',
        controller: 'RechargeCtrl'
    })
  //大额支付
  .state('largePayment', {
        url: '/largePayment',
        prefetchTemplate:false,
        templateUrl: 'templates/largePayment.html',
        controller: 'LargePaymentCtrl'
    })
  //快钱支付
  .state('quickMoneyPayment', {
        cache: false,
        prefetchTemplate:false,
        url: '/quickMoneyPayment/:select',
        templateUrl: 'templates/quickMoneyPayment.html',
        controller: 'QuickMoneyPaymentCtrl'
    })
  //快钱支付银行卡列表
  .state('tab.quickMoneySelectBank', {
        cache: false,
        prefetchTemplate:false,
        url: '/quickMoneySelectBank',
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/quickMoneySelectBank.html',
          controller: 'QuickMoneySelectBankCtrl'
        }
      }
    })
  //新增快捷支付银行卡
  .state('tab.addKqBanks', {
        cache: false,
        prefetchTemplate:false,
        url: '/addKqBanks',
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/addKqBanks.html',
          controller: 'AddKqBanksCtrl'
        }
      }
    })
  //快捷支付
  .state('quickPayment', {
        prefetchTemplate:false,
        url: '/quickPayment',
        templateUrl: 'templates/quickPayment.html',
        controller: 'QuickPaymentCtrl'
    })
  //微信支付
  .state('wechatPayment', {
        url: '/wechatPayment',
        prefetchTemplate:false,
        templateUrl: 'templates/wechatPayment.html',
        controller: 'WechatPaymentCtrl'
    })
  //第三方支付成功路由
  .state('rechargeSuccess', {
        url: '/rechargeSuccess',
        prefetchTemplate:false,
        params:{"reqData":null},
        templateUrl: 'templates/rechargeSuccess.html'
    })
    //账户提现
   .state('withdraw', {
    url: '/withdraw',
    params:{"money":0},
    prefetchTemplate:false,
    templateUrl: 'templates/withdraw.html',
    controller: 'WithdrawCtrl'
   })
    //账户提现手续费(与账户提现公用一个controller)
   .state('withdrawFee', {
    cache: false,
    url: '/withdrawFee',
    prefetchTemplate:false,
    templateUrl: 'templates/withdrawFee.html',
    controller: 'WithdrawFeeCtrl'
   })
   //账户提现成功(与账户提现公用一个controller)
   .state('withdrawSuccess', {
    cache: false,
    prefetchTemplate:false,
    url: '/withdrawSuccess',
    templateUrl: 'templates/withdrawSuccess.html',
    controller: 'WithdrawCtrl'
   })
   //登录
   .state('login', {
    cache: false,
    prefetchTemplate:false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
   })
   //手势密码
   .state('gesturePwd', {
    cache: false,
    prefetchTemplate:false,
    params:{"mode":null},//mode :0表示设置，1表示登录
    url: '/gesturePwd',
    templateUrl: 'templates/gesturePwd.html',
    controller: 'GesturePwdCtrl'
   })
   //合同
   .state('contract', {
    cache: false,
    prefetchTemplate:false,
    params:{"url":""},//url :合同连接
    url: '/contract',
    templateUrl: 'templates/contract.html',
    controller: 'ContractCtrl'
   })
   //banner展示
   .state('banner', {
    cache: false,
    params:{url:"",title:""},//url :合同连接,title:标题
    url: '/banner',
    templateUrl: 'templates/banner.html',
    controller: 'BannerCtrl'
   })
  //更多
  .state('more', {
    cache: false,
    prefetchTemplate:false,
    url: '/more',
    templateUrl: 'templates/tab-more.html',
    controller: 'MoreCtl'
  })
  //关于合拍
  .state('about', {
    cache: false,
    url: '/about',
    prefetchTemplate:false,
    templateUrl: 'templates/about.html',
    controller: 'AboutCtrl'
  })
   //开发中
   .state('doing', {
    url: '/doing',
    templateUrl: 'templates/doing.html'
   })
    /************************************************************************************************************/
    /*-----------------------------------------------二期分隔线-------------------------------------------------*/
    /************************************************************************************************************/
    //我的投资
    .state('tab.myInvestM', {
      url: '/myInvestM',
      prefetchTemplate:false,
      views: {
        'tab-memberCenter': {
          templateUrl: 'templates/myInvestM.html'
        }
      }
    })
    //我的投资
    .state('tab.regularPlan', {
      cache: false,
      prefetchTemplate:false,
      url: '/regularPlan',
      views: {
        'tab-memberCenter': {
          templateUrl: 'templates/regularPlan.html',
          controller: 'RegularPlanCtrl'
        }
      }
    })
    //担保机构详情
    .state('institutionDetail',{
      url: '/institutionDetail/:lnno/:orgno',
      prefetchTemplate:false,
      templateUrl: 'templates/institutionDetail.html',
      controller: 'InstitutionDetailCtrl'
    })
    //稳利盈详情
    .state('tab.bidWlyDetail', {
      cache: false,
      prefetchTemplate:false,
      url: '/bidWlyDetail/:lnNo/:bidId',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidWlyDetail.html',
          controller: 'BidWlyDetailCtrl'
        }
      }
    })
    //长利盈详情
    .state('tab.bidClyDetail', {
      cache: false,
      prefetchTemplate:false,
      url: '/bidClyDetail/:lnNo/:bidId',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/bidClyDetail.html',
          controller: 'BidWlyDetailCtrl'  //和稳利赢共用一个controller
        }
      }
    })
    /*稳利盈项目详情页*/
    .state('tab.projectWlyDetail', {
      cache: false,
      prefetchTemplate:false,
      url: '/projectWlyDetail/:lnNo/:bidId',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectWlyDetail.html',
          controller: 'ProjectWlyDetailCtrl'
        }
      }
    })
    /*稳利盈产品详情页*/
    .state('tab.projectWlyDetailCpxq', {
      cache: false,
      prefetchTemplate:false,
      url: '/projectWlyDetailCpxq/:lnNo/:bidId/:isCpxq',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectWlyDetailCpxq.html',
          controller: 'ProjectWlyDetailCtrl'
        }
      }
    })
    /*稳利盈已投项目页*/
    .state('tab.projectWlyDetailYtxm', {
      cache: false,
      prefetchTemplate:false,
      url: '/projectWlyDetailYtxm/:lnNo/:bidId',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/projectWlyDetailYtxm.html',
          controller: 'ProjectWlyDetailCtrl'
        }
      }
    })
    //定期计划投资详情
    .state('tab.planDetail', {
      cache: false,
      url: '/planDetail/:lnNo/:txNo',
      prefetchTemplate:false,
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/planDetail.html',
          controller: 'PlanDetailCtrl'
        }
      }
    })
    /*稳利盈我要投资*/
    .state('tab.investWly', {
      url: '/investWly/:lnno/:lnamt/:isNew/:bidId',
      prefetchTemplate:false,
      views: {
        'tab-investIndex': {
          templateUrl: 'templates/investWly.html',
          controller: 'InvestWlyCtrl'
        }
      }
    })
    /*稳利盈协议*/
    .state('tab.investWlyProtocol', {
      cache: false,
      prefetchTemplate:false,
      url: '/investWlyProtocol/:lnno/:lnamt/:bidId',
      views: {
        'tab-investIndex': {
          templateUrl: 'templates/investWlyProtocol.html',
          controller: 'InvestWlyProtocolCtrl'
        }
      }
    })
    //稳利盈投资记录
    .state('tab.investWlyRecord', {
      cache: false,
      prefetchTemplate:false,
      url: '/investWlyRecord/:lnNo/:bidId',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/investWlyRecord.html',
          controller: 'InvestWlyRecordCtrl'
        }
      }
    })
//活力盈详情
      .state('tab.bidHlyDetail', {
        cache: false,
        prefetchTemplate:false,
        url: '/bidHlyDetail/:lnNo/:bidId',
        views:{
          'tab-investIndex': {
            templateUrl: 'templates/bidHlyDetail.html',
            controller: 'BidHlyDetailCtrl'
          }
        }
      })
      /*活力盈项目详情页*/
      .state('tab.projectHlyDetail', {
        cache: false,
        prefetchTemplate:false,
        url: '/projectHlyDetail/:lnNo',
        views:{
          'tab-investIndex': {
            templateUrl: 'templates/projectHlyDetail.html',
            controller: 'ProjectHlyDetailCtrl'
          }
        }
      })
      /*活力盈产品详情页*/
      .state('tab.projectHlyDetailCpxq', {
        cache: false,
        prefetchTemplate:false,
        url: '/projectHlyDetailCpxq/:lnNo/:isCpxq',
        views:{
          'tab-investIndex': {
            templateUrl: 'templates/projectHlyDetailCpxq.html',
            controller: 'ProjectHlyDetailCtrl'
          }
        }
      })
      /*活力盈已投项目页*/
      .state('tab.projectHlyDetailYtxm', {
        cache: false,
        prefetchTemplate:false,
        url: '/projectHlyDetailYtxm/:lnNo',
        views:{
          'tab-investIndex': {
            templateUrl: 'templates/projectHlyDetailYtxm.html',
            controller: 'ProjectHlyDetailCtrl'
          }
        }
      })
      /*活力盈我要投资*/
      .state('tab.investHly', {
        cache: false,
        prefetchTemplate:false,
        url: '/investHly/:lnNo/:rate',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investHly.html',
            controller: 'InvestHlyCtrl'
          }
        }
      })
    //活力盈投资记录
    .state('tab.investHlyRecord', {
      cache: false,
      prefetchTemplate:false,
      url: '/investHlyRecord/:lnNo',
      views:{
        'tab-investIndex': {
          templateUrl: 'templates/investHlyRecord.html',
          controller: 'InvestHlyRecordCtrl'
        }
      }
    })
      /*活力盈协议*/
      .state('tab.investHlyProtocol', {
        cache: false,
        prefetchTemplate:false,
        url: '/investHlyProtocol/:lnno/:lnamt',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investHlyProtocol.html',
            controller: 'InvestHlyProtocolCtrl'
          }
        }
      })
      //债转标详情
      .state('tab.bidZzbDetail', {
        cache: false,
        prefetchTemplate:false,
        url: '/bidZzbDetail/:lnNo/:bidId',
        views:{
          'tab-investIndex': {
            templateUrl: 'templates/bidZzbDetail.html',
            controller: 'BidZzbDetailCtrl'
          }
        }
      })
      /*债转标我要投资*/
      .state('tab.investZzb', {
        cache: false,
        prefetchTemplate:false,
        url: '/investZzb/:lnno/:lnamt/:isNew/:rate/:bidId',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investZzb.html',
            controller: 'InvestZzbCtrl'
          }
        }
      })
      /*债转标协议*/
      .state('tab.investZzbProtocol', {
        cache: false,
        prefetchTemplate:false,
        url: '/investZzbProtocol/:lnno/:lnamt',
        views: {
          'tab-investIndex': {
            templateUrl: 'templates/investZzbProtocol.html',
            controller: 'InvestZzbProtocolCtrl'
          }
        }
      })
      //已债转投资详情
      .state('tab.investYzzDetail', {
        cache: false,
        prefetchTemplate:false,
        url: '/investYzzDetail/:lnNo/:type',
        views:{
          'tab-memberCenter': {
            templateUrl: 'templates/investYzzDetail.html',
            controller: 'InvestYzzDetailCtrl'
          }
        }
      })
      //日历
      .state('tab.calendar', {
        cache: false,
        prefetchTemplate:false,
        url: '/calendar',
        views: {
          'tab-memberCenter': {
            templateUrl: 'templates/calendar.html',
            controller: 'CalendarCtrl'
          }
        }
      })
      //我的任务
      .state('tab.myTasks', {
        cache: false,
        url: '/myTasks',
        prefetchTemplate:false,
        views: {
          'tab-find': {
            templateUrl: 'templates/myTasks.html',
            controller: 'MyTasksCtrl'
          }
        }
      })
      //站内公告列表
    .state('Announcement', {
      url: '/Announcement/:title/:id',
      templateUrl: 'templates/Announcement.html',
      controller: 'AnnouncementCtrl'
    })
   //站内公告列表
   .state('hkNew', {
      url: '/hkNew',
      templateUrl: 'templates/hkNew.html',
      controller: 'hkNewCtrl'
    })
    
    //站内公告
    .state('AnnouncementContent', {
      cache: false,
      prefetchTemplate:false,
      url: '/AnnouncementContent/:bidId/:bidName',
      templateUrl: 'templates/AnnouncementContent.html',
      controller: 'AnnouncementContentCtrl'
    })
       //平台数据
      .state('platformData', {
        cache: false,
        prefetchTemplate:false,
        url: '/platformData',
        templateUrl: 'templates/platformData.html',
        controller: 'platformDataCtrl'
      })

      //注册-new
      .state('registerNew', {
        cache: false,
        prefetchTemplate:false,
        url: '/registerNew',
        templateUrl: 'templates/registerNew.html',
        controller: 'RegisterNewCtrl'
      })
  
     
      .state('registerLoginStep12', {//注册第二步设置密码
        cache: false,
        prefetchTemplate:false,
        url: '/registerLoginStep12',
        params:{"tel":"","msgCode":"","ciKey":""},
        templateUrl: 'templates/registerLoginStep12.html',
        controller: 'RegisterLoginStep12Ctrl'
      })
      //忘记登录密码1,找回密码
     .state('forgetLoginPassword1', {
      cache: false,
      prefetchTemplate:false,
      url: '/forgetLoginPassword1',
      templateUrl: 'templates/forgetLoginPassword1.html',
      controller: 'ForgetLoginPassword1Ctrl'
     })
      //忘记登录密码2,身份验证
     .state('forgetLoginPassword2', {
      cache: false,
      prefetchTemplate:false,
      url: '/forgetLoginPassword2/:tel/:ciNo/:flag', //tel:手机号,ciNo:用户名,flag:0未实名认证 1已实名认证
      templateUrl: 'templates/forgetLoginPassword2.html',
      controller: 'ForgetLoginPassword2Ctrl'
     })
      //忘记登录密码3,设置新密码
     .state('forgetLoginPassword3', {
      cache: false,
      prefetchTemplate:false,
      url: '/forgetLoginPassword3/:tel/:ciNo', //tel:手机号,ciNo:用户名
      templateUrl: 'templates/forgetLoginPassword3.html',
      controller: 'ForgetLoginPassword3Ctrl'
     })
      //忘记登录密码,设置新密码成功
     .state('forgetLoginPasswordSuccess', {
      cache: false,
      prefetchTemplate:false,
      url: '/forgetLoginPasswordSuccess',
      templateUrl: 'templates/forgetLoginPasswordSuccess.html',
      controller: 'ForgetLoginPasswordSuccessCtrl'
     })
    //安全认证
    .state('tab.safety', {
      cache: false,
      prefetchTemplate:false,
      url: '/safety',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/safety.html'
        }
      }
    })
    //申请数字证书
    .state('tab.safetyApplyCertificate', {
      cache: false,
      prefetchTemplate:false,
      url: '/safetyApplyCertificate',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/safety-applyCertificate.html',
          controller:'ApplyCertificateCtrl'
        }
      }
    })
    //已申请已授权
    .state('tab.safetyGranted', {
      cache: false,
      prefetchTemplate:false,
      url: '/safetyGranted',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/safetyGranted.html',
          controller:'SafetyGrantedCtrl'
        }
      }
    })
    //申请数字证书成功，此页面申请数字证书授权
    .state('tab.safetySuccess', {
      cache: false,
      prefetchTemplate:false,
      url: '/safetySuccess',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/safety-success.html',
          controller:'SafetySuccessCtrl'
        }
      }
    })
     //添加银行卡
    .state('tab.addBanks', {
      cache: false,
      prefetchTemplate:false,
      url: '/addBanks',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/addBanks.html',
          controller: 'AddBanksCtrl'
        }
      }
    })
    //银行卡认证
    .state('tab.cardCertify', {
      cache: false,
      prefetchTemplate:false,
      url: '/cardCertify',
      params:{"name":"","acno":""},
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/cardCertify.html',
          controller:'CardCertifyCtrl'
        }
      }
    })
    //手动银行卡认证
    .state('tab.cardCertifyHand', {
      cache: false,
      prefetchTemplate:false,
      url: '/cardCertifyHand',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/cardCertify-hand.html',
          controller:'CardCertifyHandCtrl'
        }
      }
    })
    //法大大授权书
    .state('safetyContract', {
      cache: false,
      prefetchTemplate:false,
      url: '/safetyContract/:url',
      templateUrl: 'templates/safetyContract.html',
      controller: 'safetyContractCtrl'
    })
    /*速赢贷投资协议*/
    .state('tab.investSydProtocol', {
      cache: false,
      prefetchTemplate:false,
      url: '/investSydProtocol/:lnno/:lnamt/:bidId/:lnTerm/:money',
      views: {
        'tab-investIndex': {
          templateUrl: 'templates/investSydProtocol.html',
          controller: 'InvestSydProtocolCtrl'
        }
      }
    })

/************************************************************* 资金存管*************************************************************************/
//资金存管（已开通）
   .state('tab.capitalSupervisionYet', {
    cache: false,
    prefetchTemplate:false,
    url: '/capitalSupervisionYet',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/capitalSupervisionYet.html',
          controller: 'CapitalSupervisionYetCtrl'
        }
    }
   })
//资金存管（未开通）
   .state('tab.capitalSupervision', {
    cache: false,
    prefetchTemplate:false,
    url: '/capitalSupervision',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/capitalSupervision.html',
          controller: 'CapitalSupervisionCtrl'
        }
    }
   })
 //资金存管开通成功页
 .state('tab.capitalSuccess', {
  cache: false,
  prefetchTemplate:false,
  url: '/capitalSuccess',
  views:{
      'tab-memberCenter': {
        templateUrl: 'templates/capitalSuccess.html',
        controller: 'CapitalSuccessCtrl'
      }
  }
 })
 //资金存管设置/重置交易密码
 .state('tab.resetZcTradePwd', {
  cache: false,
  prefetchTemplate:false,
  url: '/resetZcTradePwd',
  views:{
      'tab-memberCenter': {
        templateUrl: 'templates/resetZcTradePwd-valid.html',
        controller: 'ResetZcTradePwdCtrl'
      }
  }
 })

//充值-银行卡转账
.state('rechargeBankTransfer',{
  url: '/rechargeBankTransfer',
  prefetchTemplate:false,
  templateUrl: 'templates/rechargeBankTransfer.html',
  controller: 'CapitalSupervisionYetCtrl'  //公用一个控制器
})

//账户提现成功(与账户提现公用一个controller)
 .state('withdrawList', {
    cache: false,
    prefetchTemplate:false,
    url: '/withdrawList',
    templateUrl: 'templates/withdrawList.html'
 })

  //资金存管快捷支付
  .state('quickPaymentZc', {
      cache: false,
      prefetchTemplate:false,
      url: '/quickPaymentZc',
      templateUrl: 'templates/quickPaymentZc.html',
      controller: 'QuickPaymentZcCtrl'
    })
//资金存管银行卡信息
   .state('tab.banksInfoZc', {
    cache: false,
    prefetchTemplate:false,
    url: '/banksInfoZc',
    prefetchTemplate:false,
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/banksInfoZc.html',
          controller: 'BanksInfoZcCtrl'
        }
    }
   })

  //资金存管添加银行卡
  .state('tab.addBanksZc', {
    cache: false,
    prefetchTemplate:false,
    url: '/addBanksZc',
    views:{
      'tab-memberCenter': {
        templateUrl: 'templates/addBanksZc.html',
        controller: 'AddBanksZcCtrl'
      }
    }
  })
  //更换绑定资金存管的手机号码第二步
   .state('tab.updatePhnStep2Zc', {
    cache: false,
    prefetchTemplate:false,
    url: '/updatePhnStep2Zc',
    views:{
        'tab-memberCenter': {
          templateUrl: 'templates/updatePhnStep2Zc.html',
          controller: 'updatePhnStep2ZcCtrl'
        }
    }
   })
   //资金存管账户提现
   .state('withdrawZc', {
    url: '/withdrawZc',
    prefetchTemplate:false,
    params:{"money":0},
    templateUrl: 'templates/withdrawZc.html',
    controller: 'WithdrawZcCtrl'
   })
   //选择城市
   .state('chooseCity', {
    cache: false,
    prefetchTemplate:false,
    url: '/chooseCity',
    templateUrl: 'templates/chooseCity.html',
    controller: 'ChooseCityCtrl'
   })

   .state('messSubcription', {
        cache: false,
        prefetchTemplate:false,
        url: '/messSubcription',
        templateUrl: 'templates/messSubcription.html',
        controller: 'MessSubcriptionCtrl'
    })
  .state('tab.myBill', {
      cache: false,
      prefetchTemplate:false,
			url: '/myBill',
			views:{
			'tab-memberCenter': {
			  templateUrl: 'templates/myBill.html',
			  controller: 'myBillCtrl'
			}
		}
  })
  .state('tab.creditTransfer', {//申请债权转让
        url: '/creditTransfer/:lnNo/:txNo',
        prefetchTemplate:false,
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/creditTransfer.html',
          controller: 'creditTransferCtrl'
        }
    }
  })
  .state('tab.creditTransferSuc', {//债权转让成功
        url: '/creditTransferSuc/:lnNo/',
        prefetchTemplate:false,
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/creditTransferSuc.html',
          controller: 'creditTransferSucCtrl'
        }
    }
  })
 .state('tab.creditTransferRule', {//债权转让规则说明
        url: '/creditTransferRule',
        prefetchTemplate:false,
        views:{
        'tab-memberCenter': {
          templateUrl: 'templates/creditTransferRule.html',
          controller: 'creditTransferRuleCtrl'
        }
    }
  })
  //投标服务
  .state('tab.bidService', {
    cache: false,
    prefetchTemplate:false,
    url: '/bidService',
    views:{
      'tab-memberCenter': {
        templateUrl: 'templates/bidService.html',
        controller:'BidServiceCtrl'
      }
    }
  })
      //代偿协议
  .state('tab.compensatory', {
    url: '/compensatory',
    prefetchTemplate:false,
    params:{"cnFlNo":""},
    views:{
      'tab-memberCenter': {
        templateUrl: 'templates/compensatory.html',
        controller:'CompensatoryCtrl'
      }
    }
  })
     //兜底协议
  .state('tab.revealDetails', {
    url: '/revealDetails',
    prefetchTemplate:false,
    params:{"doudi":""},
    views:{
      'tab-memberCenter': {
        templateUrl: 'templates/revealDetails.html',
        controller:'RevealDetailsCtrl'
      }
    }
  })
  //理财顾问
   .state('myCounselor', {
    cache : false,
    prefetchTemplate:false,
    url: '/myCounselor',
    templateUrl: 'templates/myCounselor.html',
    controller: 'MyCounselorCtrl'
   })
      //我的推荐
   .state('tab.myRecommend', {
      cache : false,
      prefetchTemplate:false,
      url: '/myRecommend',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/myRecommend.html',
          controller:'MyRecommendCtrl'
        }
      }
    })
   //我的好友
   .state('tab.myPackets', {
      cache : false,
      prefetchTemplate:false,
      url: '/myPackets',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/myPackets.html',
          controller:'MyPacketsCtrl'
        }
      }
    })
   //我的好友
   .state('tab.myFriends', {
      cache : false,
      prefetchTemplate:false,
      url: '/myFriends',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/myFriends.html',
          controller:'MyFriendsCtrl'
        }
      }
    })
   //奖励规则
   .state('tab.awardRule', {
      cache : false,
      prefetchTemplate:false,
      url: '/awardRule',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/awardRule.html',
          controller:'AwardRuleCtrl'
        }
      }
    })
   //推荐我的人
   .state('tab.recommendPerson', {
      cache : false,
      prefetchTemplate:false,
      url: '/recommendPerson',
      views:{
        'tab-memberCenter': {
          templateUrl: 'templates/recommendPerson.html',
          controller:'RecommendPersonCtrl'
        }
      }
    })
   //邀请好友
   .state('inviteFriends', {
      cache : false,
      prefetchTemplate:false,
      url: '/inviteFriends',
      templateUrl: 'templates/inviteFriends.html',
      controller:'InviteFriendsCtrl'
    })
  //备案信息
  .state('xpIcp', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpIcp',
  templateUrl: 'templates/xpIcp.html',
    controller:'xpIcpCtrl'

  })

 //银行存管
  .state('xpBankM', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpBankM',
    templateUrl: 'templates/xpBankM.html',
  })

 //专家顾问
  .state('xpSpelCon', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpSpelCon',
    templateUrl: 'templates/xpSpelCon.html',
  })

  //联系我们
  .state('xpTel', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpTel',
    templateUrl: 'templates/xpTel.html',
  })
  
  //股东信息
  .state('xpShareH', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpShareH',
    templateUrl: 'templates/xpShareH.html',
  })
  //公司简介
  .state('xpCompanyPro', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpCompanyPro',
    templateUrl: 'templates/xpCompanyPro.html',
  })
   //公司咨询
  .state('xpCmpanyMsg', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpCmpanyMsg',
    templateUrl: 'templates/xpCmpanyMsg.html',
    controller: 'xpCmpanyMsgCtrl'


  })

   //荣誉资质
  .state('xpHonorCer', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpHonorCer',
    templateUrl: 'templates/xpHonorCer.html',
    controller: 'xpHonorCerCtrl'


  })
  //数据月报
  .state('xpMonthPld', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpMonthPld',
    templateUrl: 'templates/xpMonthPld.html',
    controller: 'xpMonthPldCtrl'


  })
    //数据月报
  .state('xpMonthPldDetailCtrl', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpMonthPldDetail/:bidId',
    templateUrl: 'templates/xpMonthPldDetail.html',
    controller: 'xpMonthPldDetailCtrl'


  })

  //媒体报道
  .state('xpMeatB', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpMeatB',
    templateUrl: 'templates/xpMeatB.html',
    controller: 'xpMeatBCtrl'


  })
    //发展足迹
  .state('xpSlot',{
    cache: false,
    prefetchTemplate:false,
    url: '/xpSlot',
    templateUrl: 'templates/xpSlot.html',
    controller: 'xpSlotCtrl'


  })
 
    //消息详情
    .state('msgDetail',{
      cache: false,
      prefetchTemplate:false,
      url: '/msgDetail/:prd_Typ',
      templateUrl: 'templates/msgDetail.html',
      controller: 'msgDetailCtrl'


    })
    
     //帮助中心
    .state('helpCenter',{
      cache: false,
      prefetchTemplate:false,
      url: '/helpCenter',
      templateUrl: 'templates/helpCenter.html',
      controller: 'helpCenterCtrl'


    })
      //帮助列表
    .state('helpList',{
      cache: false,
      prefetchTemplate:false,
      url: '/helpList/:id',
      templateUrl: 'templates/helpList.html',
      controller: 'helpListCtrl'


    })
      //帮助详情页
    .state('helpDetail',{
      cache: false,
      prefetchTemplate:false,
      url: '/helpDetail/:id',
      templateUrl: 'templates/helpDetail.html',
      controller: 'helpDetailCtrl'


    })
    //帮助搜索页
    .state('helpSearch',{
      cache: false,
      prefetchTemplate:false,
      url: '/helpSearch/:id',
      templateUrl: 'templates/helpSearch.html',
      controller: 'helpSearchCtrl'


    })
      //帮助列表
    .state('helpLists',{
      cache: false,
      prefetchTemplate:false,
      url: '/helpLists/:id/:name',
      templateUrl: 'templates/helpLists.html',
      controller: 'helpListsCtrl'

    })
  //新手标列表
  .state('newsList', {
    cache: false,
    prefetchTemplate:false,
    url: '/newsList',
    templateUrl: 'templates/newsList.html',
    controller: 'newsListCtrl'

  })

  //媒体报道详情
  .state('xpMeatDetail', {
    cache: false,
    prefetchTemplate:false,
    url: '/xpMeatDetail/:bidId/:bidName',
    templateUrl: 'templates/xpMeatDetail.html',
    controller: 'xpMeatDetailCtrl'
  })
  //借款人详情
  .state('borrowerDetail',{
    cache: false,
    prefetchTemplate:false,
    url: '/borrowerDetail/:lnNo',
    templateUrl: 'templates/borrowerDetail.html',
    controller: 'borrowerDetailCtrl'
})
 //贷后信息
 .state('postLoanInformation',{
  cache: false,
  url: '/postLoanInformation/:lnNo',
  templateUrl: 'templates/postLoanInformation.html',
  controller: 'postLoanInformationCtrl'
})

 //出借人风险提示
 .state('lenderRisk',{
  cache: false,
  url: '/lenderRisk/:num',
  templateUrl: 'templates/lenderRisk.html',
  controller: 'lenderRiskCtrl'

})




  //账户管理
  .state('accountM', {
    cache: false,
    prefetchTemplate:false,
    url: '/accountM',
    templateUrl: 'templates/accountM.html',
    controller: 'AccountMCtrl'
  })
  //个人信息
   .state('userInfo', {
    cache: false,
    prefetchTemplate:false,
    url: '/userInfo',
    templateUrl: 'templates/userInfo.html',
    controller: 'UserInfoCtrl'
   })
//会员中心
.state('tab.memberCenter', {
  cache: false,
  prefetchTemplate:false,
  views: {
    'tab-memberCenter': {
      templateUrl: 'templates/tab-memberCenter.html',
      controller: 'MemberCenterCtrl'
    }
  }
})

//密码管理
.state('passwordM', {
  prefetchTemplate:false,
  cache: false,
  url: '/passwordM',
  templateUrl: 'templates/passwordM.html',
  controller: 'PasswordMCtrl'
})
//修改密码
.state('updateLoginPwd', {
  prefetchTemplate:false,
  cache: false,
  url: '/updateLoginPwd',
  templateUrl: 'templates/updateLoginPwd.html',
  controller: 'upPassCtrl'
})
//找回密碼
.state('updateLoginPwds', {
  prefetchTemplate:false,
  cache: false,
  url: '/updateLoginPwds',
  templateUrl: 'templates/updateLoginPwds.html',
  controller: 'upPasssCtrl'
})
//設置交易密碼
.state('setJyPass', {
  prefetchTemplate:false,
  cache: false,
  url: '/setJyPass',
  templateUrl: 'templates/setJyPass.html',
  controller: 'setJyPassCtrl'
})


 //項目
 .state('tab.project',{
  cache: false,
  url: '/project',
  views: {
    'tab-project': {
      templateUrl: 'templates/project.html',
      controller: 'projectCtrl'
    }
  }

})
 //市場
.state('tab.market',{
  cache: false,
  url: '/market',
  views: {
    'tab-market': {
      templateUrl: 'templates/market.html',
      controller: 'marketCtrl'
    }
  }

})
 //活動
 .state('tab.act',{
  cache: true,
  url: '/act',
  views: {
    'tab-act': {
      templateUrl: 'templates/act.html',
      controller: 'actCtrl'
    }
  }

})

//注册-new
.state('register', {
  cache: false,
  prefetchTemplate:false,
  url: '/register',
  templateUrl: 'templates/register.html',
  controller: 'resCtrl'
})
.state('registerLoginStep11', {//注册第一步填写验证码
  cache: false,
  prefetchTemplate:false,
  url: '/registerLoginStep11',
  params:{"tel":""},
  templateUrl: 'templates/registerLoginStep11.html',
  controller: 'RegisterLoginStep11Ctrl'
})

//注册成功
.state('registerSuccess', {
  cache: false,
  prefetchTemplate:false,
  url: '/registerSuccess',
  templateUrl: 'templates/registerSuccess.html',
  controller: 'RegisterSuccessCtrl'
})

//榜单详情
.state('bdDetail', {
  cache: false,
  prefetchTemplate:false,
  url: '/bdDetail:bdData',
  templateUrl: 'templates/bdDetail.html',
  controller: 'bdDetailCtrl'
})
//活动详情
.state('hdDetail', {
  cache: false,
  prefetchTemplate:false,
  url: '/hdDetail:hdData',
  templateUrl: 'templates/hdDetail.html',
  controller: 'hdDetailCtrl'
})
//榜单
.state('tab.home', {
  url: '/home',
  cache: false,
  views: {
    'tab-home': {
      templateUrl: 'templates/tab-home.html',
      controller: 'HomeCtrl'
    }
  }
})
//人才
.state('tab.find', {
  url: '/find',
  cache: false,
  views: {
    'tab-find': {
      templateUrl: 'templates/tab-find.html',
      controller: 'FindCtrl'
    }
  }
})

//青贝管理
.state('qbManage', {
  cache: false,
  prefetchTemplate:false,
  url: '/qbManage',
  templateUrl: 'templates/qbManage.html',
  controller: 'qbManageCtrl'
})
//青贝转曾
.state('qbZs', {
  cache: false,
  prefetchTemplate:false,
  url: '/qbZs:qbtel',
  templateUrl: 'templates/qbZs.html',
  controller: 'qbZcCtrl'
})

//青贝交易记录列表
.state('qbJl', {
  cache: false,
  prefetchTemplate:false,
  url: '/qbJl',
  templateUrl: 'templates/qbJl.html',
  controller: 'qbJlCtrl'
})
//青贝交易记录详情
.state('qbJlDetail', {
  cache: false,
  prefetchTemplate:false,
  url: '/qbJlDetail:qbData',
  templateUrl: 'templates/qbJlDetail.html',
  controller: 'qbJlDetailCtrl'
})
//修改交易密码
.state('upjymm', {
  cache: false,
  prefetchTemplate:false,
  url: '/upjymm',
  templateUrl: 'templates/upjymm.html',
  controller: 'upjymmCtrl'
})

//我的收款码
.state('myewm', {
  cache: false,
  prefetchTemplate:false,
  url: '/myewm',
  templateUrl: 'templates/myewm.html',
  controller: 'myewmCtrl'
})


//榜单发布
.state('bdFb', {
  cache: false,
  prefetchTemplate:false,
  url: '/bdFb',
  templateUrl: 'templates/bdFb.html',
  controller: 'bdFbCtrl'
})

//活动发布
.state('hdFb', {
  cache: false,
  prefetchTemplate:false,
  url: '/hdFb',
  templateUrl: 'templates/hdFb.html',
  controller: 'hdFbCtrl'
})

//发榜记录
.state('fbJl', {
  cache: false,
  prefetchTemplate:false,
  url: '/fbJl',
  templateUrl: 'templates/fbJl.html',
  controller: 'fbJlCtrl'
})

//揭榜记录
.state('jbJl', {
  cache: false,
  prefetchTemplate:false,
  url: '/jbJl',
  templateUrl: 'templates/jbJl.html',
  controller: 'jbJlCtrl'
})



//获取榜单揭榜人信息
.state('jbrList', {
  cache: false,
  prefetchTemplate:false,
  url: '/jbrList',
  templateUrl: 'templates/jbrList.html',
  controller: 'jbrListCtrl'
})


//发榜详情
.state('fbDetail', {
  cache: false,
  prefetchTemplate:false,
  url: '/fbDetail:fbData',
  templateUrl: 'templates/fbDetail.html',
  controller: 'fbDetailCtrl'
})

//消息中心
.state('msgCenter', {
  cache: false,
  prefetchTemplate:false,
  url: '/msgCenter',
  templateUrl: 'templates/msgCenter.html',
  controller: 'msgCenterCtrl'
})

//我的活动
.state('meAct', {
  cache: false,
  prefetchTemplate:false,
  url: '/meAct',
  templateUrl: 'templates/meAct.html',
  controller: 'meActCtrl'
})
//我的活动
.state('actManage', {
  cache: false,
  prefetchTemplate:false,
  url: '/actManage',
  templateUrl: 'templates/actManage.html',
  controller: 'actManageCtrl'
})
//活动参与记录
.state('meJoinAct', {
  cache: false,
  prefetchTemplate:false,
  url: '/meJoinAct',
  templateUrl: 'templates/meJoinAct.html',
  controller: 'meJoinActCtrl'
})
//青贝售卖
.state('mbqSell', {
  cache: false,
  prefetchTemplate:false,
  url: '/mbqSell',
  templateUrl: 'templates/mbqSell.html',
  controller: 'mbqSellCtrl'
})

//我的订单
.state('mebqSell', {
  cache: false,
  prefetchTemplate:false,
  url: '/mebqSell',
  templateUrl: 'templates/mebqSell.html',
  controller: 'mebqSellCtrl'
})

//我的手冊
.state('meScList', {
  cache: false,
  prefetchTemplate:false,
  url: '/meScList',
  templateUrl: 'templates/meScList.html',
  controller: 'meScListCtrl'

})
//人才詳情
.state('rcDetail', {
  cache: false,
  prefetchTemplate:false,
  url: '/rcDetail:rcData',
  templateUrl: 'templates/rcDetail.html',
  controller: 'rcDetailCtrl'

})

  $urlRouterProvider.otherwise('/tab/home');
});

