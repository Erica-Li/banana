var ROOTPATH = '/banana/';
fis.match('*',{
    isMod: false
})
fis.match('*', {
    release: ROOTPATH + '$0',
});

fis.hook('module', {
    mode: 'commonjs'
});
fis.match('**/*.js', {
    isMod: true
});

fis.match('static/**', {
    isMod: false,
    useHash: false
});
fis.match('static/**.js', {
    isMod: false,
    useHash: false
});

fis.match('pages/**.js', {
    isMod: false
});
fis.match(/pages\/view.*js$/, {
    isMod: true
});
fis.match('**/*.{css,scss}', {
    packTo: 'all.css', //css打成一个包
    useHash: true,
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
});

fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-sass option
    })
});
fis.match('*.{css,scss}', {
    preprocessor: fis.plugin('px2rem', {
        // 设计稿实际宽度
        designWidth: 750
    })
});
fis.media('qa').
    match('*', {
      deploy: fis.plugin('http-push', {
            receiver: 'http://cp01-rdqa04-dev156.cp01.baidu.com:8888/receiver',
            to: '/home/users/wangzhicheng02'
      })
    });
