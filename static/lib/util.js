var callback_number = 0;
window.$$CB = {};
var mer = null;

var NEXT_TICK = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (h) {
    return setTimeout(h, 16);
};
var CANCEL_TICK = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (h) {
    return clearTimeout(h, 16);
};

window.util = {
    $: function (query, context) {
        return (context || document).querySelector(query);
    },
    '$create': function (tag, className, cssText) {
        var elem = document.createElement(tag);
        if (className) {
            elem.className = className;
        }
        elem.style.cssText = cssText || '';
        return elem;
    },
    'loadScript': function(path, onload, onerror){
        var s = DOC.createElement('script');
        s.onload = function(){
            s.parentNode.removeChild(s);
            onload();
        }
        s.onerror = function(){
            onerror && onerror();
        }
        DOC.body.appendChild(s);
        s.src = path;
    },
    toArray: function (arrayLike) {
        if ('length' in arrayLike) {
            return SLICE.call(arrayLike);
        }
    },
    $$: function (query, context) {
        var elements = (context || document).querySelectorAll(query);
        return SLICE.call(elements);
    },
    jsonp: function (url, onload, fn, onerror) {
        var time = (new Date()).getTime();
        var cbn = '$CB' + (callback_number++);
        fn = fn || 'callback';
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + fn + '=window.$$CB.' + cbn + '&t=' + time;
        var s = document.createElement('script');
        window.$$CB[cbn] = function (response) {
            s.parentNode.removeChild(s);
            delete window.$$CB[cbn];
            onload && onload(null, response);
        };
        window.$$CB['Func'] = function (response) {
            s.parentNode.removeChild(s);
            delete window.$$CB[cbn];
            onload && onload(null, response);
        };
        s.onerror = function () {
            s.parentNode.removeChild(s);
            delete window.$$CB[cbn];
            onerror && onerror();
        };
        s.src = url;
        s.type = 'text/javascript';
        document.body.appendChild(s);
    },
    getUrlParams: function (data) {
        var params = {};
        var str = data || window.location.href;
        if (!str) {
            return {};
        };

        var arr = [];
        // 请求参数和路由参数分开解析，都放在params
        arr = str.split('#');
        for (var i = 0; i < arr.length; i++) {
            var temp;
            if (arr[i].indexOf('?')) {
                temp = arr[i].split('?');
                // 实际没有参数
                if (!temp[1]) {
                    continue;
                }
                // 使用哪个分隔符
                // 因为安卓调起组件有问题，url不能存在&字符，所以url用$字符代替分隔参数，因此解析时做区分
                var delimiter = temp[1].indexOf('&') > 0 ? '&' : '$';
                temp = temp[1].split(delimiter);
                for (var j = 0; j < temp.length; j++) {
                    var p = temp[j].split('=');
                    params[p[0]] = p[1];
                }
            }
        }

        return params;
    },
    toUrl: function (data) {
        var urls = [];
        if (data) {
            for (var k in data) {
                urls.push(k + '=' + data[k]);
            }
            return urls.join('&');
        } else {
            return '';
        }
    },
    farmatDate: function (stamp) {
        var d = new Date(stamp * 1000);
        var dt = [],
            ti = [];
        dt.push(d.getFullYear());
        dt.push(d.getMonth() + 1);
        dt.push(d.getDate());
        ti.push(d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
        ti.push(d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
        ti.push(d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        return dt.join('-') + ' ' + ti.join(':');
    },
    app: {
        'iphone': 0,
        'android': 0
    },
    dateFormat: function (stamp) {
        var d = new Date(stamp * 1000);
        var dt = [];
        var ti = [];
        dt.push(d.getFullYear());
        dt.push(d.getMonth() + 1);
        dt.push(d.getDate());
        ti.push(d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
        ti.push(d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
        ti.push(d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        return dt.join('-') + ' ' + ti.join(':');
    }
}