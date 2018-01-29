$(function () {

    // var userId; // 判断是否已经实名所用
    var runPlatform = ''; // 运行平台
    var ua = window.navigator.userAgent.toLocaleLowerCase();  //获取用户手机系统信息
    var wait = 60; //  设置倒计时
    var _randSuffix; // 设置图形验证码随机数
    // var token; // 判断是否实名接口 带上token

    isCheck();  // 切换同意协议按钮 设置开关
    getverify();  // 获取图形验证码
    GetNoteVerify();  //  获取短信验证码
    registerClick(); // 点击注册


    // 判断手机系统
    function isSystem() {
        var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('Android') > -1;
        var isIos = ua.indexOf('iphone') > -1 || ua.indexOf('iPhone') > -1;
        if (isAndroid) {
            runPlatform = 1;
        } else if (isIos) {
            runPlatform = 2;
        } else {
            runPlatform = 0;
        }
    }

    // 设置倒计时
    function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");
            o.innerHTML = "获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.innerHTML = wait + "s后重新发送";
            wait--;
            setTimeout(function () {
                time(o)
            }, 1000)
        }
    }

// 切换同意协议按钮 设置开关
    function isCheck() {
        $('#for_check').click(function () {
            var check = $('#checked').attr('dataCheck');
            if (check === 'true') {
                $('#checked').css({
                    'background': 'url("images/weixuan2x.png")',
                    'backgroundSize': '100% 100%',
                })
                $('#checked').attr('dataCheck', 'false');
                // console.log(cut)
            } else {
                $('#checked').css({
                    'background': 'url("images/xuanzhong2x.png")',
                    'backgroundSize': '100% 100%',
                })
                $('#checked').attr('dataCheck', 'true');
            }
        })
    }

    // 获取图形验证码
    function getverify() {
        _randSuffix = Math.random();
        $('#picImg img').attr('src', hostUrl + '/captcha/code_4_2.json?randSuffix='+_randSuffix+'');
        $('#picImg').click(function () {
            $('#picImg img').attr('src', '')
            _randSuffix = '';
            _randSuffix = Math.random();
            $('#picImg img').attr('src', hostUrl + '/captcha/code_4_2.json?randSuffix='+_randSuffix+'')
        })
    }

    //  获取短信验证码
    function GetNoteVerify() {
        $('#noteVerifyPic').click(function () {
            //    获取手机号码
            var phone = $('#phone').val();
            //    获取图形验证码
            var picVerify = $('#picVerify').val();
            if (!phone) {
                alert('请输入手机号码');
                return false;
            }
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                alert("手机号码有误，请重填");
                return false;
            }
            if (!picVerify) {
                alert('请输入图形验证码');
                return false;
            } else {
                // 设置倒计时
                time(this);
                // 获取数据
                $.ajax({
                    url: hostUrl + '/verification/send_with_code_4_2.json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                    },
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        userMobile: phone,
                        sceneType: 'register',
                        verifyCode: picVerify,
                        randSuffix: _randSuffix, // 图形验证码随机数
                    },
                    success: function (result) {
                        if (result.code == 0) {

                        }
                        else {
                            alert(result.msg)
                        }
                    },
                    error: function (result) {
                        alert(result.msg)
                    }
                })
            }
        })
    }

    //  点击注册
    function registerClick() {
        $('#register').click(function () {
            var channelCode = getQueryString('channelCode');
            var inviteCode = getQueryString('inviteCode');
            //    获取手机号码
            var phone = $('#phone').val();
            //    获取图形验证码
            var picVerify = $('#picVerify').val();
            //    获取短信验证码
            var noteVerify = $('#noteVerify').val();
            //  获取自定义属性
            var check = $('#checked').attr('dataCheck');
            // if(isIos){
            //     alert('iOS版本开发中，敬请期待！');
            //     return false;
            // }
            if (!phone) {
                alert('请输入手机号码');
                return false;
            }
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                alert("手机号码有误，请重填");
                return false;
            }
            if (!picVerify) {
                alert('请输入图形验证码');
                return false;
            }
            if (!noteVerify) {
                alert('请输入短信验证码');
                return false;
            }
            if (check === 'false') {
                alert('请您同意服务协议');
                return false;
            } else {
                // 获取手机系统
                isSystem();
                $.ajax({
                    url: hostUrl + '/login.json',
                    headers: {
                        runPlatform: runPlatform
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                    },
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        userMobile: phone,
                        verifyCode: noteVerify,
                        inviteCode: inviteCode,
                        channelCode: channelCode,
                    },
                    success: function (result) {
                        if (result.code == 0) {
                            console.log(result)
                            // weixin();
                            // window.location.href= 'down.html';
                            // userId = result.data.userId;
                            localStorage.setItem('token', result.data.token);
                            localStorage.setItem('userId', result.data.userId);
                            isGetBorrow();
                        } else {
                            alert(result.msg)
                        }
                    },
                    error: function (result) {
                        alert(result.msg)
                    }
                })
            }
        })
    }

    // 用户是否已发布求借
    function isGetBorrow() {
        $.ajax({
            url: hostUrl + '/v_4_1/basic/data_step.json',
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
            data: {
                userId: localStorage.getItem('userId'),
            },
            success: function (result) {
                if (result.code == 0) {
                    console.log(result)
                    var fieldJudge = result.data;
                    if (fieldJudge.isRealName) {
                        window.location.href = 'basics.html';
                    }
                    if (fieldJudge.isBasic) {
                        window.location.href = 'autonym.html';
                    }
                    if (fieldJudge.isBorrow) {
                        window.location.href = 'list.html';
                    }else{
                        window.location.href = 'autonym.html';
                    }
                } else {
                    alert(result.msg)

                }
            },
            error: function (result) {
                alert(result.msg)
            }
        })
    }
})


