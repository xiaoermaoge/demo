//  公共域名
var hostUrl = 'http://t.api.jbd.melonmobile.cn';
// var hostUrl = 'http://1x80359s10.51mypc.cn';

// 获取地址栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}
// 请求数据
function getData(arguments, succeedData, failData) {
    $.ajax({
        url: arguments.host + arguments.url,
        headers: {
            'token': localStorage.getItem('token'),
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        },
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: arguments.data,
        dataType: arguments.type,
        success: function (data) {
            succeedData(data);
        },
        error: function (data) {
            failData(data);
        }
    })
}