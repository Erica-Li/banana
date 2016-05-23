module.exports = {
    template: __inline('./homepage.html'),
    data: function () {
        return {
            showInput: false,
        }
    },
    attached: function () {
        if (window.BdHiJs) {
            window.BdHiJs.appnative.title.setText("Banana");
            BdHiJs.appnative.menu.setButton({
                data: JSON.stringify({
                    name: '',
                    value: 'postStatus'
                }),
                listener: function (result) {
                    window.history.back();
                    // window.app.page = 'postStatus';
                    // location.href = location.origin + '/banana/pages/index.html' + '#timeline';
                }
            })
        };
    },
    methods: {
        toTimeline: function () {
            window.history.back();
            // location.hash = 'timeline';
        },
    },
};