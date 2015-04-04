var feed = new Instafeed({
        get: 'user',
        userId: 12436255,
        accessToken: '12436255.cf0499d.6d24c6488d7444e9bc15e1a472ff51f3',
        sortBy: 'most-liked',
        links: false,
        // resolution: 'low_resolution',
        template: '<li><a href="{{link}}"><img src="{{image}}" /></a></li>',
});

function loadInstagramFeed() {
        feed.run();
        setTimeout(scrollInstagramFeed, 700);
}

function scrollInstagramFeed() {
        (function($) {
                $(function() { //on DOM ready
                        $("#instafeed").simplyScroll();
                });
        })(jQuery);
}

loadInstagramFeed();