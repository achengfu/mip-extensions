/**
* 学优网mip改造 javascript功能插件
* @file 网页主要功能
* @author myoa@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var dbshow = false;
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // 以self方式重置a标签
        $('.openself').attr('target', '_self');
        // 查看更多按钮功能
        var btnMax = $('#btnToMax');
        var timeOutEvent = 0;
        btnMax.on({
            touchstart: function (e) {
                timeOutEvent = setTimeout(function () {
                    timeOutEvent = 0;
                    maxpage();
                }, 500);
                e.preventDefault();
            },
            touchmove: function () {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            },
            touchend: function () {
                clearTimeout(timeOutEvent);
                if (timeOutEvent !== 0) {
                    maxpage();
                }
                return false;
            }
        });
        function maxpage() {
            dbshow || opendubao();
            var artbox = $('#artbox');
            artbox.removeClass('minbox');
            btnMax.parent().remove();
        }
        // 广告控制
        var admnum = 2;
        var admtopInit = getCookie('admtop');
        var admbottomInit = getCookie('admbottom');
        var admtop = $('#mip-adm-top');
        var admbottom = $('#mip-adm-bottom');
        if (admtopInit === 'close') {
            // 头部广告单元以嵌入方式加载
            admnum--;
            admtop.removeClass('hide');
            admtop.removeClass('fix');
            dbshow || opendubao();
        }
        else {
            var body = $('body');
            body.on('touchmove', function () {
                var gt = getScrollTop();
                if (gt > 100) {
                    admtop.removeClass('hide');
                    admtop.addClass('fix');
                }
                if (gt < -50) {
                    admtop.removeClass('fix');
                }
            });
        }
        if (admbottomInit === 'close') {
            admnum--;
            admbottom.removeClass('fix');
        }
        if (admnum > 0) {
            var admbtn = $('.btnclose');
            admbtn.on('click', function () {
                if ($(this).parent().attr('id') === 'mip-adm-top') {
                    setCookie('admtop', 'close');
                    admtop.remove();
                }
                else {
                    setCookie('admbottom', 'close');
                    admbottom.removeClass('fix');
                }
                dbshow || opendubao();
            });
        }
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }
        function setCookie(name, value) {
            var Days = .5;
            // 12个小时过期
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
        }
        function opendubao() {
            // 异步方式加载度宝
            getScript('http://cpro.baidustatic.com/cpro/ui/cm.js', function () {
                BAIDU_CLB_fillSlotAsync('u2651315', 'dubao');
            });
        }
        function getScript(url, callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        function getCookie(cnm) {
            if (document.cookie.length > 0) {
                var cstart = document.cookie.indexOf(cnm + '=');
                if (cstart !== -1) {
                    cstart = cstart + cnm.length + 1;
                    var cend = document.cookie.indexOf(';', cstart);
                    if (cend === -1) {
                        cend = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(cstart, cend));
                }
            }
            return '';
        }
    };
    return customElem;
});
