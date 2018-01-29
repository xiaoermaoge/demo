// 识别跳转
function discern() {
    //获取系统
    var ua = window.navigator.userAgent.toLocaleLowerCase();
    // 判断手机系统
    var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('Android') > -1;
    var runPlatform = ''; // 运行平台
    var isIos = ua.indexOf('iphone') > -1 || ua.indexOf('iPhone') > -1;
// 应用宝apk地址
    var myAppAddress = 'http://wxz.myapp.com/16891/8779605355337A5EA9A13712143F8293.apk?';
// ios app store
    var myAppDown = '';

    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        $('.model').show();
    } else {
        if (isIos) {
            window.location.href = myAppDown;
        }
        if (isAndroid) {
            window.location.href = myAppAddress;
        }
    }
}
// 点击联系人下载
function hint() {
    var down = confirm('是否下载马上有钱APP ?')
    if (down == true) {
        discern();
    } else {

    }
}

$(function () {
    // 获取数据
    function getListData() {
        var listData = {
            data: {
                orderType: 1,
            },
            host: hostUrl,
            url: '/lend/list.json',
        };
        getData(listData, function (result) {
            if (result.code == 0) {
                var list = result.data.list;
                var html;
                for (var i = 1; i <= 3; i++) {
                    // console.log(list);
                    html = '            <div class="list clearF">' +
                        '                <div class="fl left">' +
                        '                    <div class="personPic">' +
                        '                        <img src="' + list[i].headUrls + '" alt="">' +
                        '                        <span class="personName">' + list[i].nickName + '</span>' +
                        '                    </div>' +
                        '                    <div>' +
                        '                        <span class="limit">出借额度</span>' +
                        '                        <span class="price">' + list[i].lendAmountRange + '</span>' +
                        '                    </div>' +
                        '                </div>' +
                        '                <div class="fr right">' +
                        '                    <div class="btn" class="hint" onclick="hint()">联系</div>' +
                        '                </div>' +
                        '            </div>';
                    $('main').append(html);
                    // 点击联系提示
                }
            } else {
                alert(result.msg);
            }
        }, function (result) {
            alert(result.msg);
        })
    }
    // 获取数据
    getListData();

    // 点击刷新
    $('#refer').click(function () {
        $('main').html('');
        getListData();
    })

    // 点击图片下载
    $('#downPic').click(function () {
        discern();
    })
})