angular.module('starter.config', [])
.constant('configFile','https://mtest.he-pai.cn/www/chcp.json')
.constant('serveRoot','https://mtest.he-pai.cn/')
.constant('reqRoot','https://mtest.he-pai.cn/mobiserver/api/newCall.do')
.constant('loanFWCnt','https://mtest.he-pai.cn/mobiserver/contract/viewLoanFWCnt.do') //合拍在线居间服务协议
.constant('loanCnt','https://mtest.he-pai.cn/mobiserver/contract/viewLoanCnt.do') //借款合同
.constant('dbCnt','https://mtest.he-pai.cn/mobiserver/contract/viewDBCnt.do') //担保函
.constant('bidCnt','https://mtest.he-pai.cn/mobiserver/contract/viewBidCnt.do') //出借金额明细
.constant('CN1001','https://mtest.he-pai.cn/mobiserver/contract/viewCN1001.do') //合拍在线投资（出借）权利义务说明书
.constant('viewOldContract','https://mtest.he-pai.cn/mobiserver/contract/viewContract.do') //查看老合同
.constant('contractRoot','https://mtest.he-pai.cn/mobiserver/contract/') //合同根目录
.constant('planCnt','https//mtest.he-pai.cn/mobiserver/contract/viewPlanCnt.do') //合拍在线“稳利盈”计划服务协议
.constant('viewFddCertAuthApply','https://mtest.he-pai.cn/mobiserver/contract/viewFddCertAuthApply.do') //查看数字证书协议
.constant('viewOpenNrd','https://mtest.he-pai.cn/mobiserver/contract/viewOpenNrd.do') //查看牛人店协议
.constant('viewExchangeCnt','https://mtest.he-pai.cn/mobiserver/contract/viewExchange.do') //金交所协议
.constant('uploadImg', 'https://mtest.he-pai.cn/mobiserver/upload/fileAdd.do')//上传图片
.constant('viewClyCnt','https://mtest.he-pai.cn/mobiserver/contract/clyExchange.do') //长利盈协议
.constant('viewZgdCnt','https://mtest.he-pai.cn/mobiserver/contract/viewDebtAgreement.do') //资管贷协议
.constant('zjcgCnt','https://mtest.he-pai.cn/mobiserver/contract/ZjtgAccProtocol.do') //资金存管协议
.constant('zjcgCntSq','https://mtest.he-pai.cn/mobiserver/contract/ZjtgUserAuthProtoco.do') //资金存管协议授权
;

