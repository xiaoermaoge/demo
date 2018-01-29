// 识别跳转
var nowDate = new Date().valueOf();
console.log(nowDate)
var ua = window.navigator.userAgent.toLocaleLowerCase();
var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1;
var isIos = ua.indexOf('iphone') > -1;
// 应用宝apk地址
var myAppAddress = 'http://wxz.myapp.com/16891/8779605355337A5EA9A13712143F8293.apk?';
// 应用宝下载页面
var myAppDown = 'http://sj.qq.com/myapp/detail.htm?apkName=cn.melonmobile.msyq';


$(function () {
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        $('.model').show();
    }else{
        if (isIos) {
            window.location.href = myAppDown;
        }
        if (isAndroid) {
            window.location.href = myAppAddress;
        }
    }

    $('#btn').click(function () {
        if (isIos) {
            window.location.href = myAppDown;
        }else if(isAndroid){
            window.location.href= myAppAddress;
        }
    })

})