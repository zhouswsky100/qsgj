angular.module('starter.config', [])
.constant('configFile','https://www.he-pai.cn/app/www/chcp.json')
.constant('serveRoot','https://www.he-pai.cn/app/')//https://www.he-pai.cn/app/www/   /(\w+)\s(\w+)/
.constant('reqRoot','https://mtest.he-pai.cn:18443/mobiserver/api/newCall.do')
//.constant('reqRoot','http://10.10.160.28:8000/mobileserver/api/newCall.do')//学文
.constant('loanFWCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewLoanFWCnt.do') //合拍在线居间服务协议
.constant('loanCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewLoanCnt.do') //借款合同
.constant('dbCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewDBCnt.do') //担保函
.constant('bidCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewBidCnt.do') //出借金额明细
.constant('CN1001','https://mtest.he-pai.cn:18443/mobiserver/contract/viewCN1001.do') //合拍在线投资（出借）权利义务说明书
.constant('viewOldContract','https://mtest.he-pai.cn:18443/mobiserver/contract/viewContract.do') //查看老合同
.constant('contractRoot','https://mtest.he-pai.cn:18443/mobiserver/contract/') //合同根目录
.constant('planCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewPlanCnt.do') //合拍在线“稳利盈”计划服务协议
.constant('viewFddCertAuthApply','https://mtest.he-pai.cn:18443/mobiserver/contract/viewFddCertAuthApply.do') //查看数字证书协议
.constant('viewOpenNrd','https://mtest.he-pai.cn:18443/mobiserver/contract/viewOpenNrd.do') //查看牛人店协议
.constant('viewExchangeCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewExchange.do') //金交所协议
.constant('uploadImg', 'https://mtest.he-pai.cn:18443/mobiserver/upload/fileAdd.do')//上传图片
.constant('viewClyCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/clyExchange.do') //长利盈协议
.constant('viewZgdCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/viewDebtAgreement.do') //资管贷协议
.constant('zjcgCnt','https://mtest.he-pai.cn:18443/mobiserver/contract/ZjtgAccProtocol.do') //资金存管协议
.constant('zjcgCntSq','https://mtest.he-pai.cn:18443/mobiserver/contract/ZjtgUserAuthProtoco.do') //资金存管协议授权
.constant('recommendRoot','https://mtest.he-pai.cn/mobiserver') //我要推荐二维码根目录
;