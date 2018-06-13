/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2016 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function init(element) {
        $("#spdownload").on('click', function(event) {
            var packageName=$(element).attr("packageName");
            Pdlh.downloadFast({
            channel: 'pp_161', // PP渠道包标识
            ch_src: 'pm_huajun', // 来源统计标识
            ch: 'huajun', // 区块统计标识
            packageName: packageName, // 目标App包名
            //durl: 'http://ucdl.25pp.com/fs04/2016/01/15/7/2_613b8549eaaec403b3ee64142100a861.apk', // 目标App地址
            bs: 1, // 商业模式
            mode: 0, // 合作模式
            debug: false
            }, function(error, ret) {
            if (!error) {
                console.warn('Pdlh.downloadFast ok.');
            } else {
                console.warn('Pdlh.downloadFast failed.');
            }
            console.log(ret.msg);
            });
            _hmt.push(['_trackEvent','soft','spdownload','spdownload']);
        });
    }
    customElem.prototype.build = function () {
        var element = this.element;
        init(element);
    };
    return customElem;
});
