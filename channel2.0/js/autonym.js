$(function () {
    //  获取用户ID
    var userId = getQueryString('userId');

    // 是否认证
    function isApprove() {
        var dataStepList = {
            data: {
                userId: localStorage.getItem('userId'),
            },
            host: hostUrl,
            url: '/v_4_1/basic/data_step.json',
        };
        getData(dataStepList,function (result) {
            if(result.code == 0){
                var step = result.data;
                if(step.isRealName){
                    alert('您已经实名过了');
                    window.location.href= 'basics.html?';
                }
                if(step.isBasic){
                    alert('您已填写过基础信息');
                    window.location.href= 'borrow.html';
                }
            }else{
                alert(result.msg)
            }
        },function (result) {
            alert(result.msg)
        })
    }

    // 点击下一步认证
    function next() {
        $('nav').click(function () {
            //    身份证匹配
            var idCardNoReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
            //    获取用户填写信息
            var realName = $('#realName').val();
            var idCardNo = $('#idCardNo').val();
            var backIssueOrg = $('#backIssueOrg').val();
            if (!realName) {
                alert('请填写姓名!');
                return false;
            }
            if (!idCardNo) {
                alert('请填写身份证号码!');
                return false
            }
            if (idCardNoReg.test(idCardNo) != true) {
                alert('请输入正确的身份证号码!');
                return false;
            }
            if (!backIssueOrg) {
                alert('请填写发证机关!');
                return false
            } else {
                var realNameList = {
                    data: {
                        userId: localStorage.getItem('userId'),
                        realName: realName,
                        idCardNo: idCardNo,
                        backIssueOrg: backIssueOrg,
                    },
                    host: hostUrl,
                    url: '/v_4_1/basic/real_name.json',
                };
                getData(realNameList, function (result) {
                    if (result.code == 0) {
                        window.location.href = 'basics.html'
                    } else if (result.code == 13011) {
                        alert(result.msg);
                        window.location.href = 'basics.html'
                    }else{
                        alert(result.msg)
                    }
                }, function (result) {
                    alert(result.msg)
                })
            }
        })
    }
    isApprove();
    next()
})