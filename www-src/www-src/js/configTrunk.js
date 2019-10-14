angular.module('starter.config', [])
.constant('configFile','https://www.he-pai.cn/app/www/chcp.json')
.constant('serveRoot','https://www.he-pai.cn/app/')
.constant('reqRoot','http://10.10.16.75:6060/api/newCall.do')
.constant('loanFWCnt','http://10.10.16.75:6060/contract/viewLoanFWCnt.do') //合拍在线居间服务协议
.constant('loanCnt','http://10.10.16.75:6060/contract/viewLoanCnt.do') //借款合同
.constant('dbCnt','http://10.10.16.75:6060/contract/viewDBCnt.do') //担保函
.constant('bidCnt','http://10.10.16.75:6060/contract/viewBidCnt.do') //出借金额明细
.constant('CN1001','http://10.10.16.75:6060/contract/viewCN1001.do') //合拍在线投资（出借）权利义务说明书
.constant('viewOldContract','http://10.10.16.75:6060/contract/viewContract.do') //查看老合同
.constant('contractRoot','http://10.10.16.75:6060/contract/') //合同根目录
.constant('planCnt','http://10.10.16.75:6060/contract/viewPlanCnt.do') //合拍在线“稳利盈”计划服务协议
.constant('viewFddCertAuthApply','http://10.10.16.75:6060/contract/viewFddCertAuthApply.do') //查看数字证书协议
.constant('viewOpenNrd','http://10.10.16.75:6060/contract/viewOpenNrd.do') //查看牛人店协议
.constant('viewExchangeCnt','http://10.10.16.75:6060/contract/viewExchange.do') //金交所协议
.constant('uploadImg', 'http://10.10.16.75:6060/upload/fileAdd.do')//上传图片的接口
.constant('viewClyCnt','http://10.10.16.75:6060/contract/clyExchange.do') //长利盈协议
.constant('viewZgdCnt','http://10.10.16.75:6060/contract/viewDebtAgreement.do') //资管贷协议
.constant('zjcgCnt','http://10.10.16.75:6060/contract/ZjtgAccProtocol.do') //资金存管协议
.constant('zjcgCntSq','http://10.10.16.75:6060/contract/ZjtgUserAuthProtoco.do') //资金存管协议授权
.constant('recommendRoot','https://m.he-pai.cn/newmobi') //我要推荐二维码根目录
;

