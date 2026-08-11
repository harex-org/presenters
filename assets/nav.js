// 上部ナビの現在地ハイライト。
// スクロール位置に応じて .on を付け替え、はみ出しているときは横スクロールで見える位置へ寄せる。
(function () {
    var nav = document.querySelector('.site-nav');
    if (!nav || !('IntersectionObserver' in window)) return;

    var map = {}, targets = [];
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
        var id = (a.getAttribute('href') || '').replace(/^#/, '');
        var el = id && document.getElementById(id);
        if (!el) return;
        map[id] = a;
        targets.push(el);
    });

    var current = null;
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var a = map[e.target.id];
            if (!a || a === current) return;
            if (current) current.classList.remove('on');
            a.classList.add('on');
            current = a;
            var box = a.getBoundingClientRect(), rail = nav.getBoundingClientRect();
            if (box.left < rail.left + 8 || box.right > rail.right - 8) {
                nav.scrollTo({ left: nav.scrollLeft + box.left - rail.left - 14, behavior: 'smooth' });
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px' });

    targets.forEach(function (t) { io.observe(t); });
})();
