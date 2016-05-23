    var util = window.util;
    var service = window.service;
    var Emiter = window.Emiter;

    var ImageUploader = function (container, maxUpload, name) {
        var uploadCount = 0;
        this.container = this.container;
        this.name = name;

        var containerWidth = container.clientWidth;
        var imageSize = containerWidth / 3 - 2;
        var children = [];

        var self = this;

        var input = this.input = util.$('.upload-btn', container);
        input.parentNode.style.width = imageSize + 'px';
        input.parentNode.style.height = imageSize + 'px';
        
        //删除客户端策略的input,改为input file
        var pn = input.parentNode;
        var cls = input.className;
        var id = input.id;
        pn.removeChild(input);

        input = this.input = document.createElement('input');
        input.className = cls;
        input.id = id;
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', function (e) {
            var files = e.target.files;
            var reader = new FileReader();
            self.addImage('', '');
            reader.onload = function (f) {
                
                self.result = this.result;
                input.value = '';
                uploadFinish();
            }
            reader.readAsDataURL(files[0]);
        });
        pn.insertBefore(input, pn.firstChild);
        

        var uploadFinish = function () {
            service.uploadFile(self.result, function (data) {
                var base64String = self.result;
                // self.addImage(data.pic_url, data.pic_id);
                util.$('img', container.firstChild).className = 'img';
                util.$('img', container.firstChild).setAttribute('src', data.pic_url);
                util.$('img', container.firstChild).setAttribute('img-id', data.pic_id);
                self.emit('upload', [base64String]);
            }, function () {
                input.parentNode.previousElementSibling.remove(input.parentNode.previousElementSibling);
                input.parentNode.style.display = '';
                alert('上传失败，请重新上传');
            });
        }

        this.addImage = function (pic_url, pic_id) {
            var div = util.$create('div', 'item', [
                'width:' + imageSize + 'px',
                'height:' + imageSize + 'px'
            ].join(';'));
            div.addEventListener('click', function (e) {
                if (util.$('img', this).getAttribute('src') === '') {
                    return;
                }
                self.emit('imageClick', [this]);
            });
            if (pic_url != '') {
                div.innerHTML = '<img class="img" src="' + pic_url + '" img-id="' + pic_id + '"/>';
            }
            children.push(div);
            container.insertBefore(div, container.firstChild);
            uploadCount++;
            if (uploadCount >= maxUpload) {
                input.parentNode.style.display = 'none';
            }
        };

        this.deleteImage = function (elem) {
            children = children.filter(function (c, i) {
                if (c === elem) {
                    c.parentNode.removeChild(c);
                    return false;
                }
                return true;
            });
            uploadCount--;
            if (uploadCount < maxUpload) {
                input.parentNode.style.display = '';
            }

        };
        this.getValue = function () {
            var images = util.$$('.img', container);
            images.length = images.length - 1;
            return images.map(function (img) {
                return {
                    'pic_url': img.src,
                    'pic_id': img.getAttribute('img-id')
                };
            });
        };
        this.clearImage = function () {
            uploadCount = 0;
            children = [];
            var item = input.parentNode;
            item.style.display = 'inline-block';
            container.innerHTML = '';
            container.appendChild(item);
        };
        this.setValue = function (pics) {
            var self = this;
            self.clearImage();
            if (pics.length == 0) {return;};
            for (var i = (pics.length - 1); i >= 0; i--) {
                self.addImage(pics[i].pic_url, pics[i].pic_id);
            };
        }
    
    }
    var iup = ImageUploader.prototype = new Emiter();



    window.ImageUploader = ImageUploader;
