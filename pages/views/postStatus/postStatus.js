var ImageUploader = window.ImageUploader;

module.exports = {
    template: __inline('./postStatus.html'),
    data: function () {
        return {
            pic_url: '../static/images/Camera.png'
        }
    },
    attached: function () {
        var self = this;
        if (window.BdHiJs) {
            window.BdHiJs.appnative.title.setText("Writing");
            BdHiJs.appnative.menu.setButton({
                data: JSON.stringify({
                    name: 'Banana',
                    value: 'post'
                }),
                listener: function (result) {
                    window.history.back();
                    // window.app.page = 'timeline';
                    // location.href = location.origin + '/banana/pages/index.html' + '#timeline';
                }
            })
        }
        $('#postMsg').focus();
        // fileUp = new ImageUploader(util.$('#uploadContainer'), 1, '');
        
        // 初始化Web Uploader
        var uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // swf文件路径
            swf: '../static/lib/Uploader.swf',

            // 文件接收服务端。
            server: 'http://cp01-rdqa-dev416.cp01.baidu.com:8889/banana/util/uploadImage',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {
            uploader.makeThumb( file, function( error, src ) {
            self.pic_url = src;
        }, 200, 200 );
        });
        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file ) {
            // debugger
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            // debugger
        });

    },
    methods: {
        toTimeline: function () {
            window.app.page = 'timeline';
        },
        submit: function () {
            debugger
            // $.ajax({
            //    type: "POST",
            //    dataType: "html",
            //    url: "http://cp01-rdqa-dev416.cp01.baidu.com:8889/banana/util/uploadImage",
            //    data: {
            //         file: $('#pic1').val()
            //    },
            //    success: function(msg){
            //         debugger
            //    }
            // });
            $("#form").submit(function(e) {
                console.log($("#form").serialize());
                var url = "http://cp01-rdqa-dev416.cp01.baidu.com:8889/banana/util/uploadImage"; // the script where you handle the form input.

                $.ajax({
                   type: "POST",
                   url: url,
                   data: $("#form").serialize() , // serializes the form's elements.
                   success: function(data){
                        debugger
                        alert(data); // show response from the php script.
                    }
                 });
                return false;
                e.preventDefault(); // avoid to execute the actual submit of the form.
            });
        }
    },
};