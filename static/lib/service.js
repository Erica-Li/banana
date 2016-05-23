
var util = window.util;

var UPLOAD_IMAGE_DOMAIN =  'http://cp01-rdqa-dev416.cp01.baidu.com:8889/banana/util/uploadImage';

var service = window.service = {
    'uploadFile': function (base64String, callback, error) {
        var url = UPLOAD_IMAGE_DOMAIN;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 || xhr.readyState == 'complete') {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    callback({
                        'pic_id': response.result.pic_id,
                        'pic_url': response.result.pic_url
                    });
                } else {
                    error && error();
                }
            }
        }
        xhr.open("post", url, true);
        var params = encodeURIComponent(base64String);
        xhr.send(params);
    },
};