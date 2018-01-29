// 紧急联系人
function getRelation() {
        // 直系亲属
        var directData = [
            {'name': '父亲', 'value': '0'},
            {'name': '母亲', 'value': '1'},
            {'name': '配偶', 'value': '2'},
            {'name': '子女', 'value': '3'},
            {'name': '其他亲属', 'value': '4'},
        ];
        $('#direct').mPicker({
            level: 1,
            dataJson: directData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">直系亲属</div>',
            confirm: function (json) {
                $('#directData i').hide();
                $('#directData span').html(json.name);
                $('#directData span').attr('dataname', json.name);
                $('#directData span').attr('datava', json.values);
            },
        });
        // 同事朋友
        var colleagueData = [
            {'name': '朋友', 'value': '5'},
            {'name': '同事', 'value': '6'},
            {'name': '其他关系', 'value': '7'},
        ];
        $('#colleague').mPicker({
            level: 1,
            dataJson: colleagueData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">同事朋友</div>',
            confirm: function (json) {
                $('#colleagueData i').hide();
                $('#colleagueData span').html(json.name);
                $('#colleagueData span').attr('dataname', json.name);
                $('#colleagueData span').attr('datava', json.values);
            },
        });

        // 紧急联系人 点击确定
        $('#model_btn').click(function () {
            var directContactType = $('#directData span').attr('datava'); // 直系亲属关系
            var directContactName = $('#directName').val(); // 直系亲属姓名
            var directContactTel = $('#directNum').val(); // 直系亲属电话

            var colleagueContactType = $('#colleagueData span').attr('datava'); //同事朋友关系
            var colleagueContactName = $('#friendsName').val(); // 同事朋友姓名
            var colleagueContactTel = $('#friendsNum').val(); // 同事朋友电话

            if (!directContactType) {
                alert('请选择直系亲属关系!');
                return false;
            }
            if (!directContactName) {
                alert('请填写直系亲属姓名!');
                return false;
            }
            if (!directContactTel) {
                alert('请填写直系亲属手机号码!');
                return false;
            }
            if (!(/^1[34578]\d{9}$/.test(directContactTel))) {
                alert("直系亲属手机号码有误，请重填");
                return false;
            }
            if (!colleagueContactType) {
                alert("请选择朋友关系!");
                return false;
            }
            if (!colleagueContactName) {
                alert("请填写朋友姓名!");
                return false;
            }
            if (!colleagueContactTel) {
                alert("请填写朋友手机号码!");
                return false;
            }
            if (!(/^1[34578]\d{9}$/.test(colleagueContactTel))) {
                alert("朋友手机号码有误，请重填!");
                return false;
            } else {
                // 设置联系人数据
                contacts = JSON.stringify([
                    {
                        'contactTel': directContactTel,
                        'contactName': directContactName,
                        'contactType': directContactType,
                    },
                    {
                        'contactTel': colleagueContactTel,
                        'contactName': colleagueContactName,
                        'contactType': colleagueContactType,
                    },
                ]);
                $('.model').hide();
                // 设置默认显示
                $('#urgencyRelationData span').html('已选择')
            }
        })
}

$(function () {
    getRelation();
})