window.app = new Vue({
    el: '#app',
    replace: false,
    data: {
        page: 'timeline'
    },
    created: function () {
        
    },
    components: {
        'timeline': require('./views/timeline/timeline.js'),
        'postStatus': require('./views/postStatus/postStatus.js'),
        'homepage': require('./views/homepage/homepage.js'),
    },
    methods: {
        
    }
});
// 路由控制
function router(e) {
    var path = location.href.split('#')[1];
    if (!path) {
        path = 'timeline';
    }
    var page = path.split('?')[0];
    app.page = page;
    if (e) {
        e.preventDefault();
    }
}
router();
window.addEventListener('hashchange', router);
// var time = 1;
// window.addEventListener('popstate', function (e) {
//     if (time == 1) {
//         return;
//     };
//     time++;
//     window.history.back();
// })