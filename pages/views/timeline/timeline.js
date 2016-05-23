module.exports = {
    template: __inline('./timeline.html'),
    data: function () {
        return {
            showInput: false,
            isRefrsh: false,
            feeds: [
                {
                    id: 0,
                    head: '../static/images/wang.jpg',
                    name: '小A',
                    time: '10 min ago',
                    text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                    img: '../static/images/wall.png',
                    like: 216,
                    hehe: 300,
                    see: 500,
                    comments: [
                        {
                            name: '小B',
                            text: '腿好白~~~~'
                        },
                        {
                            name: '小C',
                            text: '车不错~~~~'
                        },
                    ]
                },
                {
                    id: 0,
                    head: '../static/images/wang.jpg',
                    name: '小A',
                    time: '10 min ago',
                    text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                    img: '../static/images/yy.png',
                    like: 216,
                    hehe: 300,
                    see: 500,
                    comments: [
                        {
                            name: '小B',
                            text: '腿好白~~~~'
                        },
                        {
                            name: '小C',
                            text: '车不错~~~~'
                        },
                    ]
                }
            ]
        }
    },
    created: function () {
        var self = this;
        self.hiInit();
        window.onBdHiJsReady = function () {
            self.hiInit();
        }
    },
    attached: function () {
        var self = this;
        $.config = {
            autoInit: false,
        }
        $(document).on('refresh', '.pull-to-refresh-content',function(e) {
            // service
            setTimeout(function() {
                self.feeds = [
                    {
                        id: 0,
                        head: '../static/images/wang.jpg',
                        name: '小B',
                        time: '10 min ago',
                        text: '啊啊啊啊啊啊啊啊啊啊啊啊',
                        img: '../static/images/head_bg_1.png',
                        like: 216,
                        hehe: 300,
                        see: 500,
                        comments: [
                            {
                                name: '小B',
                                text: '腿好白~~~~'
                            },
                            {
                                name: '小C',
                                text: '车不错~~~~'
                            },
                        ]
                    },
                    {
                        id: 0,
                        head: '../static/images/wang.jpg',
                        name: '小C',
                        time: '10 min ago',
                        text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                        img: '../static/images/wall.png',
                        like: 216,
                        hehe: 300,
                        see: 500,
                        comments: [
                            {
                                name: '小B',
                                text: '腿好白~~~~'
                            },
                            {
                                name: '小C',
                                text: '车不错~~~~'
                            },
                        ]
                    },
                    {
                    id: 0,
                    head: '../static/images/wang.jpg',
                    name: '小A',
                    time: '10 min ago',
                    text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                    img: '../static/images/wall.png',
                    like: 216,
                    hehe: 300,
                    comments: [
                        {
                            name: '小B',
                            text: '腿好白~~~~'
                        },
                        {
                            name: '小C',
                            text: '车不错~~~~'
                        },
                    ]
                }
                ].concat(self.feeds);
                document.getElementById('banana').className = 'banana';
            }, 1000);
            $.pullToRefreshDone('.pull-to-refresh-content');
        });
        var loading = false;
        $(document).on('infinite', '.infinite-scroll-bottom',function() {
            if (loading) {
                return;
            };
            loading = true;
            setTimeout(function() {
                self.feeds = self.feeds.concat([
                    {
                        id: 0,
                        head: '../static/images/wang.jpg',
                        name: '小A',
                        time: '10 min ago',
                        text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                        img: '../static/images/yy.png',
                        like: 216,
                        hehe: 300,
                        see: 500,
                        comments: [
                            {
                                name: '小B',
                                text: '腿好白~~~~'
                            },
                            {
                                name: '小C',
                                text: '车不错~~~~'
                            },
                        ]
                    },
                    {
                        id: 0,
                        head: '../static/images/wang.jpg',
                        name: '小A',
                        time: '10 min ago',
                        text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                        img: '../static/images/wall.png',
                        like: 216,
                        hehe: 300,
                        see: 500,
                        comments: [
                            {
                                name: '小B',
                                text: '腿好白~~~~'
                            },
                            {
                                name: '小C',
                                text: '车不错~~~~'
                            },
                        ]
                    },
                    {
                    id: 0,
                    head: '../static/images/wang.jpg',
                    name: '小A',
                    time: '10 min ago',
                    text: '车不错~车不错~车不错~车不错~车不错~车不错~车不错~车不错~',
                    img: '../static/images/wall.png',
                    like: 216,
                    hehe: 300,
                    see: 500,
                    comments: [
                        {
                            name: '小B',
                            text: '腿好白~~~~'
                        },
                        {
                            name: '小C',
                            text: '车不错~~~~'
                        },
                    ]
                }
                ]);
                loading = false;
                // // 加载完毕，则注销无限加载事件，以防不必要的加载
                // $.detachInfiniteScroll($('.infinite-scroll'));
                // // 删除加载提示符
                // $('.infinite-scroll-preloader').remove();

                //容器发生改变,如果是js滚动，需要刷新滚动
                $.refreshScroller();
            }, 1000);
        });
        $.init();
    },
    methods: {
        hiInit: function () {
            if (window.BdHiJs) {
                window.BdHiJs.appnative.title.setText("Banana");
                BdHiJs.appnative.menu.setButton({
                    data: JSON.stringify({
                        name: 'post',
                        value: 'postStatus'
                    }),
                    listener: function (result) {
                        // window.app.page = 'postStatus';
                        location.href = location.origin + '/banana/pages/index.html' + '#postStatus';
                    }
                });
            };
        },
        toHomePage: function () {
            // location.hash = 'homepage';
            location.href = location.origin + '/banana/pages/index.html' + '#homepage';
        },
        like: function (e, index) {
            var className = e.target.className;
            if (className == 'unlike') {
                e.target.className = 'like';
                this.feeds[index].like++;
            } else {
                e.target.className = 'unlike';
                this.feeds[index].like--;
            }
        },
        hehe: function (index) {
            this.feeds[index].comments = [{
                name: 'me',
                text: '呵呵~'
            }].concat(this.feeds[index].comments);
            this.feeds[index].hehe ++;
        },
        see: function (index) {
            this.feeds[index].comments = [{
                name: 'me',
                text: '朕已阅~'
            }].concat(this.feeds[index].comments);
            this.feeds[index].see ++;
        },
        submit: function (e, index) {
            this.feeds[index].comments = [{
                name: 'me',
                text: e.target.value,
            }].concat(this.feeds[index].comments);
            e.target.value = '';
            e.target.blur();
        },
        del: function (e, index) {
            var i = e.target.parentNode.parentNode.getAttribute('elem-index');
            this.feeds[i].comments.$remove(this.feeds[i].comments[index]);
        },
        moreCmt: function (index, e) {
            this.feeds[index].comments = this.feeds[index].comments.concat([
                {
                    name: '小D',
                    text: 'aaaa'
                },
                {
                    name: '小E',
                    text: '嗯嗯'
                },
            ]);
            e.target.remove(e.target);
        },
        delThis: function (index) {
            this.feeds.$remove(this.feeds[index]);
        }
    },
};