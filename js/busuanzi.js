var bszCaller, bszTag;

!function () {
    var c, d, e, a = !1, b = [];

    // 定义 ready 函数，用于在 DOM 加载完成后执行回调
    ready = function (c) {
        return a || "interactive" === document.readyState || "complete" === document.readyState ?
            c.call(document) :
            b.push(function () { return c.call(this); }), this;
    };

    // 处理回调队列
    d = function () {
        for (var a = 0, c = b.length; c > a; a++) {
            b[a].apply(document);
        }
        b = [];
    };

    // 当 DOMContentLoaded 事件触发时执行的函数
    e = function () {
        if (!a) {
            a = !0;
            d.call(window);
            if (document.removeEventListener) {
                document.removeEventListener("DOMContentLoaded", e, !1);
            } else if (document.attachEvent) {
                document.detachEvent("onreadystatechange", e);
                if (window == window.top) {
                    clearInterval(c);
                    c = null;
                }
            }
        }
    };

    // 添加 DOMContentLoaded 事件监听器
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", e, !1);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function () {
            /loaded|complete/.test(document.readyState) && e();
        });
        if (window == window.top) {
            c = setInterval(function () {
                try {
                    if (!a) {
                        document.documentElement.doScroll("left");
                    }
                } catch (b) {
                    return;
                }
                e();
            }, 5);
        }
    }
}();

// 定义 bszCaller 对象
bszCaller = {
    fetch: function (a, b) {
        var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
        window[c] = this.evalCall(b);
        a = a.replace("=BusuanziCallback", "=" + c);
        var scriptTag = document.createElement("SCRIPT");
        scriptTag.type = "text/javascript";
        scriptTag.defer = !0;
        scriptTag.src = a;
        scriptTag.referrerPolicy = "no-referrer-when-downgrade";
        document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
    },
    evalCall: function (a) {
        return function (b) {
            ready(function () {
                try {
                    a(b);
                    scriptTag.parentElement.removeChild(scriptTag);
                } catch (c) {
                    bszTag.hides();
                }
            });
        };
    }
};

// 发起 JSONP 请求并处理返回的数据
bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function (a) {
    bszTag.texts(a);
    bszTag.shows();
});

// 定义 bszTag 对象
bszTag = {
    bszs: ["site_pv", "page_pv", "site_uv"],
    texts: function (a) {
        this.bszs.map(function (b) {
            var c = document.getElementById("busuanzi_value_" + b);
            if (c) {
                switch (b) {
                    case "site_pv":
                        c.innerHTML = a[b];
                        break
                    case "page_pv":
                        c.innerHTML = a[b];
                        break;
                    case "site_uv":
                        c.innerHTML = a[b];
                        break;
                }
            }
        });
    },
    hides: function () {
        this.bszs.map(function (a) {
            var b = document.getElementById("busuanzi_container_" + a);
            if (b) {
                b.style.display = "none";
            }
        });
    },
    shows: function () {
        this.bszs.map(function (a) {
            var b = document.getElementById("busuanzi_container_" + a);
            if (b) {
                b.style.display = "inline";
            }
        });
    }
};