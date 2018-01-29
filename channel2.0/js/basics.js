$(function () {
    var cityData; // 省市区数据
    var contacts; // 联系人数组
    var basicsList = {}; // 缓存数据

    // 获取省市区数据  单位地址 居住城市
    function getThree() {
        var getThreeList = {
            host: hostUrl,
            url: '/area/districts.json',
        };
        getData(getThreeList, function (result) {
            if (result.code == 0) {
                cityData = result.data;
                for (var i = 0; i < cityData.length; i++) {
                    // 一级省
                    cityData[i].name = cityData[i].provinceName;
                    cityData[i].value = cityData[i].provinceId;
                    cityData[i].child = cityData[i].cities;
                    delete cityData[i].provinceName;
                    delete cityData[i].provinceId;
                    delete cityData[i].cities;
                    for (var b = 0; b < cityData[i].child.length; b++) {
                        // 二级市
                        cityData[i].child[b].name = cityData[i].child[b].cityName;
                        cityData[i].child[b].value = cityData[i].child[b].cityId;
                        cityData[i].child[b].child = cityData[i].child[b].district;


                        delete cityData[i].child[b].cityName;
                        delete cityData[i].child[b].cityId;
                        delete cityData[i].child[b].district;

                        // console.log(cityData[i].child[b].child.length)
                        //  三级区
                        for (var c = 0; c < cityData[i].child[b].child.length; c++) {
                            cityData[i].child[b].child[c].name = cityData[i].child[b].child[c].districtName;
                            cityData[i].child[b].child[c].value = cityData[i].child[b].child[c].districtId;
                            // console.log(cityData[i].child[b].child.districtId)
                            delete cityData[i].child[b].child[c].districtName;
                            delete cityData[i].child[b].child[c].districtId;
                        }
                    }
                }
                // console.log(level3)
                // console.log(cityData)
                // 居住地址
                $('#city').mPicker({
                    level: 3,
                    dataJson: cityData,
                    Linkage: true,
                    rows: 6,
                    idDefault: true,
                    splitStr: '-',
                    header: '<div class="mPicker-header">请选择地区</div>',
                    confirm: function (json) {
                        $('#cityShow span').html(json.name);
                        $('#cityShow span').attr('dataname', json.name);
                        $('#cityShow span').attr('datava', json.values);

                        // 设置缓存
                        var liveCityDataLocal = {
                            'name': json.name,
                            'value': json.values,
                        };
                        basicsList.liveCityDataLocal  = liveCityDataLocal;
                        localStorage.setItem('basicsList',JSON.stringify(basicsList));


                        console.info('当前选中json：', json);
                        console.info('【json里有不带value时】');
                        console.info('选中的id序号为：', json.ids);
                        console.info('选中的value为：', json.values);
                        // var id1= $('.select-value').data('id1');
                        // var id2 = $('.select-value').data('id2');
                        // var id3 = $('.select-value').data('id3');
                        // console.info('第一列json：',city3[id1]);
                        // console.info('第二列json：', city3[id1].child[id2]);
                        // console.info('第三列json：', city3[id1].child[id2].child[id3]);
                    },
                    cancel: function (json) {
                        console.info('当前选中json：', json);
                    }
                })

                // 单位地址
                $('#workAddress').mPicker({
                    level: 3,
                    dataJson: cityData,
                    Linkage: true,
                    rows: 6,
                    idDefault: true,
                    splitStr: '-',
                    header: '<div class="mPicker-header">请选择地区</div>',
                    confirm: function (json) {
                        $('#workAddressData span').html(json.name);
                        $('#workAddressData span').attr('dataname', json.name);
                        $('#workAddressData span').attr('datava', json.values);
                        // 设置缓存
                        var unitCityDataLocal = {
                            'name': json.name,
                            'value': json.values,
                        };
                        basicsList.unitCityDataLocal = unitCityDataLocal;
                        localStorage.setItem('basicsList',JSON.stringify(basicsList));
                    },
                })
            } else {
                alert(result.msg)
            }
        }, function (result) {
            alert(result.msg)
        })
    }


    //  选项调取值 做展示并设置自定义属性 方便取值
    function selectValue() {
        // 居住时长
        var resideDurationData = [
            {'name': '6个月以下', 'value': '6个月以下'},
            {'name': '6-12月', 'value': '6-12月'},
            {'name': '1-3年', 'value': '1-3年'},
            {'name': '3年以上', 'value': '3年以上'},
        ];
        $('#resideDuration').mPicker({
            level: 1,
            dataJson: resideDurationData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">请选择居住时长</div>',
            confirm: function (json) {
                $('#resideDurationData span').html(json.name);
                $('#resideDurationData span').attr('dataname', json.name);
                $('#resideDurationData span').attr('datava', json.values);
                var resideDurationDataLocal = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.resideDurationDataLocal = resideDurationDataLocal;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        })
        // 婚姻状况
        var marriageListData = [
            {'name': '未婚', 'value': '未婚'},
            {'name': '已婚已育', 'value': '已婚已育'},
            {'name': '已婚未育', 'value': '已婚未育'},
            {'name': '其他', 'value': '其他'},
        ];
        $('#marriage').mPicker({
            level: 1,
            dataJson: marriageListData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">请选择婚姻状况</div>',
            confirm: function (json) {
                $('#marriageData span').html(json.name);
                $('#marriageData span').attr('dataname', json.name);
                $('#marriageData span').attr('datava', json.values);
                // 设置缓存
                var marryStatus = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.marryStatus = marryStatus;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        });
        // 学历状况
        var educationData = [
            {'name': '博士', 'value': '博士'},
            {'name': '硕士', 'value': '硕士'},
            {'name': '本科', 'value': '本科'},
            {'name': '专科', 'value': '专科'},
            {'name': '高中', 'value': '高中'},
            {'name': '初中', 'value': '初中'},
            {'name': '小学', 'value': '小学'},
            {'name': '其他', 'value': '其他'},
        ];
        $('#education').mPicker({
            level: 1,
            dataJson: educationData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">请选择学历</div>',
            confirm: function (json) {
                $('#educationData span').html(json.name);
                $('#educationData span').attr('dataname', json.name);
                $('#educationData span').attr('datava', json.values);
                // 设置缓存
                var eduDegree = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.eduDegree = eduDegree;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        });
        // 社保
        var socialData = [
            {'name': '无', 'value': '0'},
            {'name': '有', 'value': '1'},
        ];
        $('#social').mPicker({
            level: 1,
            dataJson: socialData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">是否有本地社保</div>',
            confirm: function (json) {
                $('#socialData span').html(json.name);
                $('#socialData span').attr('dataname', json.name);
                $('#socialData span').attr('datava', json.values);
                // 设置缓存
                var isLocalSecurity = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.isLocalSecurity = isLocalSecurity;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        });
        // 本地公积金
        var reservedData = [
            {'name': '无', 'value': '0'},
            {'name': '有', 'value': '1'},
        ];
        $('#reserved').mPicker({
            level: 1,
            dataJson: reservedData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">是否有本地公积金</div>',
            confirm: function (json) {
                $('#reservedData span').html(json.name);
                $('#reservedData span').attr('dataname', json.name);
                $('#reservedData span').attr('datava', json.values);
                // 设置缓存
                var isPublicFund = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.isPublicFund = isPublicFund;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        })
        // 信用卡
        var creditData = [
            {'name': '无', 'value': '0'},
            {'name': '有', 'value': '1'},
            {'name': '办理中', 'value': '2'},
        ];
        $('#credit').mPicker({
            level: 1,
            dataJson: creditData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">是否有信用卡</div>',
            confirm: function (json) {
                $('#creditData span').html(json.name);
                $('#creditData span').attr('dataname', json.name);
                $('#creditData span').attr('datava', json.values);
                // 设置缓存
                var isCreditCard = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.isCreditCard = isCreditCard;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        })
        // 资产情况
        var property = [
            {'name': '无', 'value': '0'},
            {'name': '有车有房', 'value': '1'},
            {'name': '有车无房', 'value': '2'},
            {'name': '有房无车', 'value': '3'},
            {'name': '其他资产', 'value': '4'},
        ];
        $('#property').mPicker({
            level: 1,
            dataJson: property,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">资产情况</div>',
            confirm: function (json) {
                $('#propertyData span').html(json.name);
                $('#propertyData span').attr('dataname', json.name);
                $('#propertyData span').attr('datava', json.values);
                // 设置缓存
                var assetStatus = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.assetStatus = assetStatus;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        })
        // 职业
        var professionData = [
            {'name': '上班族', 'value': '上班族'},
            {'name': '企业主', 'value': '企业主'},
            {'name': '个体户', 'value': '个体户'},
            {'name': '自由职业者', 'value': '自由职业者'},
            {'name': '政府/国企/事业单位职员', 'value': '政府/国企/事业单位职员'},
        ];
        $('#profession').mPicker({
            level: 1,
            dataJson: professionData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">职业</div>',
            confirm: function (json) {
                $('#professionData span').html(json.name);
                $('#professionData span').attr('dataname', json.name);
                $('#professionData span').attr('datava', json.values);
                // 设置缓存
                var occupation = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.occupation = occupation;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        });
        // 月收入
        var monthIncomeData = [
            {'name': '2000元以下', 'value': '2000元以下'},
            {'name': '2000-4000', 'value': '2000-4000'},
            {'name': '4000-6000', 'value': '4000-6000'},
            {'name': '6000以上', 'value': '6000以上'},
        ];
        $('#monthIncome').mPicker({
            level: 1,
            dataJson: monthIncomeData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">职业</div>',
            confirm: function (json) {
                $('#monthIncomeData span').html(json.name);
                $('#monthIncomeData span').attr('dataname', json.name);
                $('#monthIncomeData span').attr('datava', json.values);
                // 设置缓存
                var monthIncome = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.monthIncome = monthIncome;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        })
        // 发薪日
        var payrollDateData = [];
        for (var er = 1; er <= 31; er++) {
            payrollDateData.push({'name': '每月' + er + '日', 'value': er});
        }
        $('#payrollDate').mPicker({
            level: 1,
            dataJson: payrollDateData,
            Linkage: true,
            rows: 6,
            idDefault: true,
            splitStr: '-',
            header: '<div class="mPicker-header">发薪日</div>',
            confirm: function (json) {
                $('#payrollDateData span').html(json.name);
                $('#payrollDateData span').attr('dataname', json.name);
                $('#payrollDateData span').attr('datava', json.values);
                // 设置缓存
                var monthPayDate = {
                    'name': json.name,
                    'value': json.values,
                };
                basicsList.monthPayDate = monthPayDate;
                localStorage.setItem('basicsList',JSON.stringify(basicsList));
            },
        })
    }

    // 获取芝麻分
    function getSesameList() {
        // 获取芝麻分
        var getSesame = {
            data: {
                userId: localStorage.getItem('userId'),
                edType: ''
            },
            host: hostUrl,
            url: '/zhima/getZhima.json',
        };
        getData(getSesame, function (result) {
            if (result.code == 0) {
                var data = result.data;
                if (data.score.score) {
                    $('#sesame').val(data.score.score);
                    $('#sesameData').html(data.score.score);
                }
            } else {
                // alert(result.msg);
                //    没有芝麻分去获取芝麻授权地址
                $('#sesame').click(function () {
                    var getNewSesame = {
                        data: {
                            userId: localStorage.getItem('userId'),
                            platform: 'H5',
                        },
                        host: hostUrl,
                        url: '/zhima/getNewZhimaAuthUrl.json',
                    };
                    getData(getNewSesame, function (result) {
                        if (result.code == 0) {
                            window.location.href = result.data.url;
                            setTimeout(function () {
                                window.location.href = 'basics.html';

                            }, 3000)
                        } else {
                            alert(result.msg);
                        }
                    }, function (result) {
                        alert(result.msg);
                    })
                })
            }
        }, function (result) {
            alert(result.msg);
        })
    }


    //  设置input 为text类型时 设置缓存
    function inputText() {
        $('input[custom]').blur(function(){
            var basicsList = {};
            var _basicsList = localStorage.getItem('basicsList');
            if(_basicsList == null || _basicsList == undefined || _basicsList == ''){

            }else{
                basicsList = JSON.parse(_basicsList)
            }
            basicsList[$(this).attr('custom')] = $(this).val();
            localStorage.setItem("basicsList",JSON.stringify(basicsList));
        })
    }

    //  点击下一步 验证参数
    function nextBtn() {
        $('nav').click(function () {
            // 获取值
            var cityShowVa = $('#cityShow span').attr('datava'); // 居住城市
            var cityShow = $('#cityShow span').attr('dataname'); // 居住城市

            var homeDetail = $('#address').val(); // 居住详细地址

            var resideDuration = $('#resideDurationData span').attr('dataname'); // 居住时长
            var marryStatus = $('#marriageData span').attr('dataname'); // 婚姻状况
            var eduDegree = $('#educationData span').attr('dataname'); // 学历
            var isLocalSecurity = $('#socialData span').attr('datava'); //社保
            var isPublicFund = $('#reservedData span').attr('datava'); //本地公积金
            var isCreditCard = $('#creditData span').attr('datava'); //信用卡
            var assetStatus = $('#propertyData span').attr('datava'); //资产
            var occupation = $('#propertyData span').attr('dataname'); //职业

            var unitName = $('#workName').val(); // 工作单位

            var workAddressData = $('#workAddressData span').attr('dataname'); // 单位地址

            var unitDetail = $('#workDetail').val(); // 单位详细地址

            var monthIncome = $('#monthIncomeData span').attr('dataname'); // 月收入
            var monthPayDate = $('#payrollDateData span').attr('datava'); // 发薪日
            var weixin = $('#weixin').val(); // 微信
            var qq = $('#qqNum').val(); // QQ

            // 判断
            if (!cityShow) {
                alert('请选择居住城市!')
                return false;
            }
            if (!homeDetail) {
                alert('请填写现居详细地址!');
                return false;
            }
            if (!resideDuration) {
                alert('请选择居住时长!');
                return false;
            }
            if (!marryStatus) {
                alert('请选择婚姻状况!');
                return false;
            }
            if (!eduDegree) {
                alert('请选择学历!');
                return false;
            }
            if (!isLocalSecurity) {
                alert('请选择是否有社保!');
                return false;
            }
            if (!isPublicFund) {
                alert('请选择是否有公积金!');
                return false;
            }
            if (!isCreditCard) {
                alert('请选择是否有信用卡!');
                return false;
            }
            if (!assetStatus) {
                alert('请选择资产情况!');
                return false;
            }
            if (!occupation) {
                alert('请选择职业!');
                return false;
            }
            if (!unitName) {
                alert('请输入工作单位!');
                return false;
            }
            if (!workAddressData) {
                alert('请选择单位地址!');
                return false;
            }
            if (!unitDetail) {
                alert('请填写单位详细地址!');
                return false;
            }
            if (!monthIncome) {
                alert('请选择月收入!');
                return false;
            }
            if (!monthPayDate) {
                alert('请选择发薪日!');
                return false;
            }
            if (!weixin) {
                alert('请输入微信号!');
                return false;
            }
            if (!contacts) {
                alert('请输入联系人!');
                return false;
            } else {
                var cityShowArr = cityShow.split('-');
                var homeProvice = cityShowArr[0]; // 居住城市 省(字符串)
                var homeCity = cityShowArr[1]; // 居住城市 市(字符串)
                var cityShowVaArr = cityShowVa.split('-');
                var homeCityId = cityShowVaArr[1]; // 居住地 市ID

                var workAddressDataArr = workAddressData.split('-');
                var unitProvice = workAddressDataArr[0]; //单位地址  省(字符串)
                var unitCity = workAddressDataArr[1]; //单位地址  省(字符串)

                var updateBasic = {
                    data: {
                        userId: localStorage.getItem('userId'), // 用户ID
                        homeProvice: homeProvice, // 居住地址-所在省
                        homeCity: homeCity, // 居住地址-所在省
                        homeDetail: homeDetail, // 现居地址（详细）
                        homeCityId: homeCityId, // 居住地-城市ID
                        weixin: weixin, // 微信号
                        eduDegree: eduDegree, // 学历（教育程度）
                        resideDuration: resideDuration, // 居住时长
                        marryStatus: marryStatus, // 婚姻状况
                        occupation: occupation, // 职业
                        unitName: unitName, // 单位名称/公司名称
                        monthIncome: monthIncome, // 月收入
                        monthPayDate: monthPayDate, // 每月发薪日
                        unitProvice: unitProvice, // 单位地址-所在省
                        unitCity: unitCity, // 单位地址-所在城市
                        unitDetail: unitDetail, // 单位地址（详细）
                        isLocalSecurity: isLocalSecurity, // 是否有本地社保
                        isPublicFund: isPublicFund, // 是否有公积金
                        isCreditCard: isCreditCard, // 是否有信用卡
                        assetStatus: assetStatus, // 资产情况
                        contacts: contacts, // 联系人数组
                        qq: qq, // QQ
                    },
                    host: hostUrl,
                    url: '/v_4_1/basic/update_basic_info.json',
                };
                getData(updateBasic, function (result) {
                    if (result.code == 0) {
                        console.log('完善用户基础信息')
                        window.location.href= 'borrow.html';
                    } else {
                        alert(result.msg)
                    }
                }, function (result) {
                    alert(result.msg)
                })
            }
        })
    }

    // 设置默认值
    function getLocalData() {
        var _basicsList = localStorage.getItem('basicsList');
        // 是否有缓存数据
        if(_basicsList){
            var basicsList = JSON.parse(_basicsList);
            // for(var item in basicsList) {
            //     if(basicsList[item]) {
            //         $('#'+item+' span').attr( basicsList[item]);
            //         $('#'+item+' span').html( basicsList[item].name);
            //     }
            // }
            var liveCityDataLocal = basicsList.liveCityDataLocal; // 居住地址
            // 单位地址
            var unitCityDataLocal = basicsList.unitCityDataLocal;
            if(liveCityDataLocal){
                $('#cityShow span').html(liveCityDataLocal.name);
                $('#cityShow span').attr('dataname',liveCityDataLocal.name);
                $('#cityShow span').attr('datava',liveCityDataLocal.value);
            }
            if(unitCityDataLocal){
                $('#workAddressData span').html(unitCityDataLocal.name);
                $('#workAddressData span').attr('dataname',unitCityDataLocal.name);
                $('#workAddressData span').attr('datava',unitCityDataLocal.value);
            }
        }
    }

    inputText();        // input失去焦点设置local
    getLocalData();     // 设置默认值
    getSesameList();    // 获取芝麻分
    selectValue()       //  选项调取值 做展示并设置自定义属性 方便取值
    getThree();         // 获取省市区数据  单位地址 居住城市
    nextBtn()           //  点击下一步 验证参数
})