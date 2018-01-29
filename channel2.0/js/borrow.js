$(function () {
    // 点击确定按钮

    var deadlineDataList = [
        {'name': '7天', 'value': '7-1'},
        {'name': '14天', 'value': '14-1'},
        {'name': '21天', 'value': '21-1'},
        {'name': '1个月', 'value': '1-2'},
    ];
    $('#deadline').mPicker({
        level: 1,
        dataJson: deadlineDataList,
        Linkage: true,
        rows: 6,
        idDefault: true,
        splitStr: '-',
        header: '<div class="mPicker-header">求借期限</div>',
        confirm: function (json) {
            $('#deadlineData span').html(json.name);
            $('#deadlineData span').attr('dataname', json.name);
            $('#deadlineData span').attr('datava', json.values);
        },
    });

    function nextBtn() {
        $('nav').click(function () {
            var borrowAmount = $('#borrowAmount').val(); // 求借金额
            var periodTypeData = $('#deadlineData span').attr('datava');
            var purposeNameData = $('#useData span').attr('dataname');
            if (!borrowAmount) {
                alert('请输入求借金额!');
                return false;
            }
            if (!periodTypeData) {
                alert('请选择求借期限');
                return false;
            }
            if (!purposeNameData) {
                alert('请选择借款用途');
                return false;
            } else {
                var periodTypeArr = periodTypeData.split('-');
                var periodType = periodTypeArr[1];
                var borrowPeriod = periodTypeArr[0];
                var addNewList = {
                    data: {
                        borrowAmount: borrowAmount,
                        userId: localStorage.getItem('userId'),
                        msgEffectDate: '3000-01-01',
                        periodType: periodType,
                        borrowPeriod: borrowPeriod,
                        isAgreement: '1',
                        purposeName: purposeNameData,
                    },
                    host: hostUrl,
                    url: '/borrow/add_new.json',
                };
                getData(addNewList, function (result) {
                    if (result.code == 0) {
                        console.log(result);
                        window.location.href= 'list.html';
                    } else {
                        alert(result.msg);
                    }
                }, function (result) {
                    alert(result.msg);
                })
            }
        })
    }

    function getUseList() {
        var list = {
            host: hostUrl,
            url: '/use/list.json',
        };
        getData(list, function (result) {
            if (result.code == 0) {
                var purposeNameArr = result.data;
                for (var i = 0; i < purposeNameArr.length; i++) {
                    purposeNameArr[i].name = purposeNameArr[i].purposeName;
                    purposeNameArr[i].value = purposeNameArr[i].purposeId;
                    delete purposeNameArr[i].purposeName;
                    delete purposeNameArr[i].purposeId;
                }
                $('#use').mPicker({
                    level: 1,
                    dataJson: purposeNameArr,
                    Linkage: true,
                    rows: 6,
                    idDefault: true,
                    splitStr: '-',
                    header: '<div class="mPicker-header">借款用途</div>',
                    confirm: function (json) {
                        $('#useData span').html(json.name);
                        $('#useData span').attr('dataname', json.name);
                        $('#useData span').attr('datava', json.values);
                    },
                })
            } else {
                alert(result.msg);
            }
        }, function (result) {
            alert(result.msg);
        })
    }

    getUseList(); // 借款用途
    nextBtn();
})