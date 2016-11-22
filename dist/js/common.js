/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};
/******/ 	
/******/ 	// The require function
/******/ 	function require(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, require);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	require.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, require);
/******/ 		
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.src = require.p + "" + chunkId + "..bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	require.modules = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	require.cache = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	require.p = "dist/js/";
/******/ 	
/******/ 	// install a JSONP callback for chunk loading
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, callbacks = [];
/******/ 		while(chunkIds.length) {
/******/ 			chunkId = chunkIds.shift();
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, require);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			require(0);
/******/ 		}
/******/ 	};
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, $) {
	var api = require(3);
	var common = require(2);
	var cookie = require(5);
	require(11);
	var main = {
	    init: function () {
	
	        bindChangeSearcher();
	
	        bindLogout();
	
	        scrollFixed();
	
	        topBanner();
	
	        if(window.page!='item' && window.page!='shop'){
	            setTimeout(getNewamount, 200);
	        }
	
	        bindEvents();
	        catSlide();
	
	
	        //os x 导航等字体加粗
	        var agent = window.navigator.userAgent.toLowerCase();
	        if (agent.indexOf('mac os x') > -1) {
	            $('.nav_item_list').css({'font-weight': 'bold'});
	            $('.floor_list .floor_item .item_shop .info .name').css({'font-weight': 'bold'});
	            $('.hot_shops .hot_shops_list .item.item_shop .info .desc').css({'font-weight': 'bold'});
	        }
	    },
	    logout: bindLogout,
	    clearNewamout: clearNewamout,
	    loginUinfo: loginUinfo(),
	    refreshLoginUinfo: loginUinfo
	};
	
	main.init();
	
	module.exports = main;
	
	function loginUinfo() {
	    var _userKey = $.cookie('user_key') || '';
	    return api.service.loginUinfo({user_key: _userKey}, function (dt) {
	        if (dt.code == 200) {
	            var _data = dt.data,
	                _userId = _data.id,
	                _username = _data.username,
	                _verify = _data.is_verify_user,
	                _carts_amount = _data.carts_amount,
	                _news_amount = _data.amount,
	                _order_amount = _data.orders_count,
	                $topbar = $(".top_bar");
	            // 是否登录
	            if(_userId){
	                $('#username', $topbar).text(_username);
	                $(".islog", $topbar).show();
	                $(".unlog", $topbar).remove();
	
	                if(_news_amount > 0){
	                    $('.messageUnRead').text(_news_amount).show();
	                }
	                _order_amount = _order_amount > 99 ? 99 : _order_amount;
	                if(_order_amount > 0){
	                    $('.orderUnRead').text(_order_amount).show();
	                }
	
	                if(window.page=='refund'){
	                    $('.o-address input#mobile').val(_data.mobile);
	                }
	            }else{
	                $(".islog", $topbar).remove();
	                $(".unlog", $topbar).show();
	                $(".j-btn-addrent").remove();
	            }
	
	            _carts_amount = _carts_amount > 0 ? _carts_amount : '';
	            _carts_amount = _carts_amount <= 99 ? _carts_amount : '99+';
	            $('.j-cart-amount').text(_carts_amount);
	            $(".header3 .btn_cart .num").text(_carts_amount);
	            if(_carts_amount){
	                $('.j-cart-amount').show();
	            }
	            if(!_carts_amount){
	                $('.j-cart-amount').hide();
	            }
	            // if(!_data.new_amount){
	            //     getNewamount(_data.new_amount);
	            // }
	        }
	    });
	}
	
	function catSlide() {
	
	    var nav_drop = $('.nav_drop');
	    var $nav_drop_menu = $('.nav_drop_menu', nav_drop);
	    var $menu_item = $('.menu_item', nav_drop);
	    var $nav_expend = $('.nav_expend', nav_drop);
	    var $nav_item = $('.nav_item', nav_drop);
	    var $nav_expend_txt = $('.nav_expend_txt', nav_drop);
	    var $nav_expend_ad = $('.nav_expend_ad', nav_drop);
	
	    var can_animate = true;
	    var timer;
	
	    $menu_item.hover(function () {
	        var _this = $(this);
	
	        $nav_expend.show();
	        $nav_item.hide().css('width', 0);
	
	        $($nav_expend_txt, $($nav_item.get(_this.index()))).css('width', 580).show();
	        $($nav_expend_ad, $($nav_item.get(_this.index()))).css('width', 220).show();
	
	        $($nav_item.get(_this.index())).show().css('width', 800).addClass('selected');
	
	        $menu_item.removeClass('selected');
	        _this.addClass('selected');
	
	        if (can_animate) {
	            can_animate = !can_animate;
	
	            $(".nav_expend_txt", $nav_item.get(_this.index())).css('width', 0).animate({
	                width: 580
	            }, 500);
	
	            $(".nav_expend_ad", $nav_item.get(_this.index())).css('width', 0);
	
	            timer = setTimeout(function () {
	                $(".nav_expend_ad", $nav_item.get(_this.index())).animate({
	                    width: 220
	                }, 400);
	            }, 350);
	        }
	        var $a = $nav_item.find('.nav_expend_ad a');
	        if ($a.hasClass('ishide')) {
	            cuvvic.sendShow("", $a);
	        }
	    });
	
	    $nav_drop_menu.mouseleave(function (event) {
	        var _this = $(this);
	
	        var to_element = event.toElement || event.relatedTarget; //firefox 没有toElement
	        var $to_element = $(to_element);
	
	        if (!$to_element.hasClass('inner')) {
	
	            $nav_expend.hide();
	            $nav_item.hide().css('width', 0).removeClass('selected');
	            $nav_expend_txt.css('width', 0).hide();
	            $nav_expend_ad.css('width', 0).hide();
	
	            $menu_item.removeClass('selected');
	
	            can_animate = true;
	
	        }
	    });
	
	    $nav_expend.mouseleave(function (event) {
	        $nav_expend.hide();
	        $nav_item.hide().css('width', 0).removeClass('selected');
	        $nav_expend_txt.css('width', 0).hide();
	        $nav_expend_ad.css('width', 0).hide();
	
	        $menu_item.removeClass('selected');
	
	    });
	
	}
	
	function bindEvents() {
	
	    $('.j_clear_newamount').on('click', function () {
	        clearNewamout();
	    });
	
	    /*搜全站*/
	    $('.btn-search-global').on('click', function () {
	        var q = $('input#q').val();
	        location.href = '/search.html?q=' + q;
	    });
	
	    /*
	    * 搜索框焦点变色
	    * */
	    var query_box =  $('.search_query_wrap');
	
	    if(query_box.length > 0){
	        $('.search_query_wrap input.search_query').on('focus', function () {
	            query_box.css('border-color','#fb658a');
	        }).on('blur', function () {
	            query_box.css('border-color','#e5e5e5');
	        });
	    }
	
	}
	
	function scrollFixed() {
	
	    var header = $('.header_fixed_able');
	    var initFixed = function () {
	
	        if (!header.length) {
	            return;
	        }
	        var height = header.height();
	        var offsetTop = header.offset().top;
	        var scrollTop = $(window).scrollTop();
	
	        if (scrollTop > offsetTop + 1 * height) {
	            header.addClass('header_fixed');
	        } else {
	            header.removeClass('header_fixed');
	        }
	    };
	
	    initFixed();
	
	    $(window).on('scroll', initFixed);
	}
	
	function clearNewamout() {
	
	    $('.newamount-box').hide();
	    var newamount =  $('.newamount').attr('newamount');
	    var timestamp = Date.parse(new Date());
	
	    if(newamount-0){
	        $.cookie('newamount', newamount + '|' + timestamp, {
	            path: '/',
	            expires: 1
	        });
	    }
	
	    main.isClearNewamout = true;
	
	}
	
	function isToday(str) {
	    var cookieDate = new Date(str-0).toDateString();
	    if (cookieDate === new Date().toDateString()) {
	        //今天
	        return true;
	    } else if (new Date(str) < new Date()){
	        //之前
	        return false;
	    }
	}
	
	function getNewamount(new_amount) {
	    if(main.isClearNewamout) {
	        return;
	    }
	    var $newamount =  $('.newamount');
	
	    if(!$newamount.size()){
	        return;
	    }
	
	    api.service.newamount(function (res) {
	        if (res.code == 200 && res.data.amount > 0) {
	            var newAmountObj = $.cookie('newamount') || '',
	                newAmount = 0,
	                timestamp;
	            if(newAmountObj){
	                newAmountObj = newAmountObj.split('|');
	                timestamp = newAmountObj[1];
	                var _result = isToday(timestamp);
	                if(_result){
	                    newAmount = newAmountObj[0];
	                }
	            }
	            newAmount = res.data.amount - newAmount;
	            $newamount.attr('newamount', res.data.amount);
	
	            if (newAmount > 0) {
	                $newamount.html(newAmount);
	                $('.newamount-box').show();
	            }
	        } else {
	            $('.newamount-box').hide();
	        }
	    });
	
	    // var newamount = $.cookie('newamount') || 0;
	    // newamount = new_amount - newamount;
	
	    // $newamount.attr('newamount', new_amount);
	
	    // if (newamount > 0) {
	    //     $newamount.html(newamount);
	    //     $('.newamount-box').show();
	    // }
	}
	
	
	
	
	function bindChangeSearcher() {
	    var header_tab = common.tabs({
	        container: '.header_inner',
	        top: '.search_tab_top'
	    });
	    $('.tab-wraper .trigger').on('click', function () {
	        var $this = $(this);
	        var action = $this.attr('data-action');
	
	        if($this.closest('.header_shop').length){
	            $('.header_shop .search_tab_content').hide();
	            $(action).show();
	        }else{
	            header_tab.trigger(action);
	        }
	    });
	}
	
	function bindLogout() {
	    $('body').on('click', '.doLogout', function () {
	        api.service.logout(function (res) {
	            if (res.code == 200) {
	
	                location.href = '/login.html';
	            }
	        });
	    });
	}
	function topBanner() {
	    var $ad = $('.top_ban_60'),
	        item = $('a', $ad),
	        $close = $('.close', $ad);
	
	    var isShow = $.cookie('_TOPBANNER') == 1 ? false : true;
	
	    if (isShow) {
	        if (item.size() > 0) {
	            // 随机数 显示广告
	            var randomIndex = Math.floor(Math.random()*item.length+1) - 1;
	            item.eq(randomIndex).show();
	            $ad.show().css('height', 0).animate({
	                height: 60
	            }, 400);
	            setTimeout(function(){
	                cuvvic.sendShow('',item.eq(randomIndex),1);
	            }, 500);
	        }
	    }
	
	    // 广告点击关闭后一天后开启
	    $close.bind('click', function(){
	        $ad.animate({
	            height: 0
	        }, 400, function () {
	            $ad.hide();
	        });
	        $.cookie('_TOPBANNER', '1', {expires: 1, path: '/'});
	    });
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, require(9)))

/***/ },
/* 2 */
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, _, $) {var api = require(3);
	var layer = require(15);
	var cookie = require(5);
	var qlogin = require(14);
	
	    var exports = {};
	    var LAYER_MSG_DEFAULT = {time: 1000};
	
	    if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function (elt /*, from*/) {
	            var len = this.length >>> 0;
	            var from = Number(arguments[1]) || 0;
	            from = (from < 0)
	                ? Math.ceil(from)
	                : Math.floor(from);
	            if (from < 0)
	                from += len;
	            for (; from < len; from++) {
	                if (from in this &&
	                    this[from] === elt)
	                    return from;
	            }
	            return -1;
	        };
	    }
	
	    if (!Array.prototype.remove) {
	        Array.prototype.remove=function(dx){
	            if(isNaN(dx)||dx>this.length){return false;}
	            for(var i=0,n=0;i<this.length;i++)
	            {
	                if(this[i]!=this[dx]){
	                    this[n++]=this[i]
	                }
	            }
	            this.length-=1
	        }
	    }
	
	    // 对Date的扩展，将 Date 转化为指定格式的String
	    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	    // 例子：
	    // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	    // (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	    Date.prototype.format = function(fmt) { //author: meizz
	        var o = {
	            "M+" : this.getMonth()+1,                 //月份
	            "d+" : this.getDate(),                    //日
	            "h+" : this.getHours(),                   //小时
	            "m+" : this.getMinutes(),                 //分
	            "s+" : this.getSeconds(),                 //秒
	            "q+" : Math.floor((this.getMonth()+3)/3), //季度
	            "S"  : this.getMilliseconds()             //毫秒
	        };
	        if(/(y+)/.test(fmt)){
	            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	        }
	        for(var k in o){
	            if(new RegExp("("+ k +")").test(fmt)){
	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	            }
	        }
	        return fmt;
	    };
	
	
	    _.mixin({
	        formatDate: function(string, fmt) {
	            //如果格式固定为yyyy-mm-dd hh:MM:ss
	            var ps = string.split(" ");
	            var pd = ps[0].split("-");
	            var pt = ps.length>1 ? ps[1].split(":"): [0,0,0];
	            var newDataString = new Date(pd[0],pd[1]-1,pd[2],pt[0],pt[1],pt[2]);
	            fmt = fmt || 'yyyy-MM-dd hh:mm';
	            return newDataString.format(fmt);
	        }
	    });
	
	
	
	
	    //继承
	    var __super,
	        __hasProp = {}.hasOwnProperty,
	        __extends = function (child, parent) {
	            for (var key in parent) {
	                if (__hasProp.call(parent, key)) child[key] = parent[key];
	            }
	            if (typeof parent === 'object') return;
	            function Ctor() {
	                this.constructor = child;
	            }
	
	            child.Init = function (o) {
	                this.init(o);
	            };
	            Ctor.prototype = parent.prototype;
	            child.fn = child.Init.prototype = child.prototype = new Ctor();
	            child.__super__ = parent.prototype;
	            return child;
	        };
	    /************************/
	    __super = (function () {
	        function __super() {
	        }
	
	        __super.prototype.init = function (o) {
	            this.init(o);
	        };
	        return __super;
	    })();
	
	    /**/
	    updateUserFavData = function (favType, op) {
	        $.cookie(favType, op, {expires: 365, path: '/', domain: '.vvic.com'});
	    };
	
	    //tab 组件
	    var tabs_defaults = {
	        container: null, //tab 最外层的 selecter
	        top: null, //包裹 topElem 的 selecter
	        topElem: 'a', //点击的元素 ,一定要有 href 属性, 对应切换容器的 id
	        activeClass: 'selected', // tabElem 选中的 className
	        events: 'click', //切换事件, 默认点击
	        callback: null // 切换回调
	    };
	
	    var tabs = (function (_super) {
	
	        __extends(tabs, _super);
	
	        function tabs(options) {
	            var opts = $.extend({}, tabs_defaults, options);
	            return new tabs.Init(opts);
	        }
	
	        $.extend(tabs.fn, {
	            init: function (options) {
	                var top = $(options.top, options.container),
	                    items = $(options.topElem, top),
	                    contents = [],
	                    _this = this;
	
	                items.each(function (i, item) {
	                    var str = $(item).attr('href');
	
	                    str = _this.clearHref(str);
	
	                    contents.push(str);
	                });
	
	                this.items = items;
	                this.contents = contents;
	                this.options = options;
	                this.bind();
	            },
	            clearHref: function (str) {
	                //fix ie7 :href 会带域名
	                var idx = str.indexOf('#');
	                if (idx != 0) {
	                    str = str.substring(idx);
	                }
	                return str;
	            },
	            trigger: function (href) {
	
	                if (href == undefined) {
	                    return;
	                }
	                var contents = this.contents,
	                    options = this.options,
	                    _this = this;
	
	                this.items.removeClass(options.activeClass);
	
	                $.each(this.items, function (index, el) {
	
	                    var str = _this.clearHref($(el).attr('href'));
	                    if (str == href) {
	
	                        $(el).addClass(options.activeClass);
	
	                    }
	                });
	
	                $.each(contents, function (index, item) {
	                    if (item == href) {
	                        $(item, options.container).show();
	                    } else {
	                        $(item, options.container).hide();
	                    }
	                });
	
	            },
	            bind: function () {
	                var contents = this.contents,
	                    options = this.options,
	                    callback = options.callback,
	                    _this = this;
	
	
	                this.items.on(options.events, function (evt) {
	
	                    var href = $(this).attr('href');
	                    href = _this.clearHref(href);
	
	                    $.each(contents, function (index, item) {
	                        if (item == href) {
	                            $(item, options.container).show();
	                        } else {
	                            $(item, options.container).hide();
	                        }
	                    });
	
	                    _this.items.removeClass(options.activeClass);
	                    $(this).addClass(options.activeClass);
	
	                    if (!!callback) {
	                        callback(href, this, _this);
	                    }
	                    evt.stopPropagation();
	                    evt.preventDefault();
	                });
	
	                if (options.events != 'click') {
	                    this.items.bind('click', function (evt) {
	                        evt.stopPropagation();
	                        evt.preventDefault();
	                    });
	                }
	
	            },
	            unbind: function () {
	                this.items.unbind();
	            }
	        });
	
	        return tabs;
	    })(__super);
	
	
	    var sub = (function () {
	
	        return function (str, data) {
	            return str.replace(/\${(.*?)}/igm, function ($, $1) {
	
	                if (typeof data == 'string') {
	                    return data;
	                }
	
	                if (typeof data[$1] == 'undefined') {
	                    return '';
	                }
	                return data[$1];
	            });
	        };
	
	    })();
	
	    var render = function (tpl, list) {
	
	        var _html = '';
	        $.each(list, function (index, item) {
	
	            if (!index) {
	                item.classname = 'selected';
	            }
	            item.index = index;
	            item.count = index + 1;
	
	            _html = _html + sub(tpl, item);
	        });
	        return _html;
	    };
	    /*
	     * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
	     * @param fn {function}  需要调用的函数
	     * @param delay  {number}    延迟时间，单位毫秒
	     * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
	     * @return {function}	实际调用函数
	     */
	    var throttle = function (fn, delay, immediate, debounce) {
	        var curr = +new Date(),//当前时间
	            last_call = 0,
	            last_exec = 0,
	            timer = null,
	            diff, //时间差
	            context,//上下文
	            args,
	            exec = function () {
	                last_exec = curr;
	                fn.apply(context, args);
	            };
	        return function () {
	            curr = +new Date();
	            context = this,
	                args = arguments,
	                diff = curr - (debounce ? last_call : last_exec) - delay;
	            clearTimeout(timer);
	
	            if (debounce) {
	                if (immediate) {
	                    timer = setTimeout(exec, delay);
	                } else if (diff >= 0) {
	                    exec();
	                }
	            } else {
	                if (diff >= 0) {
	                    exec();
	                } else if (immediate) {
	                    timer = setTimeout(exec, -diff);
	                }
	            }
	
	            last_call = curr;
	        };
	    };
	
	    //频率控制
	    exports.throttle = throttle;
	    //tab 组件
	    exports.tabs = tabs;
	
	    //简单的模板
	    exports.render = render;
	
	    //防止被iframe
	    exports.refuseIframe = (function () {
	
	        function doit() {
	            try {
	                top.location.hostname;
	                if (top.location.hostname != window.location.hostname) {
	                    top.location.href = window.location.href;
	                }
	            }
	            catch (e) {
	                top.location.href = window.location.href;
	            }
	
	            return window;
	        }
	
	        return doit();
	    })();
	
	
	    exports.deepClone = function (obj) {
	        function Clone() {
	        }
	
	        Clone.prototype = obj;
	        var o = new Clone();
	        for (var a in o) {
	            if (typeof o[a] == "object") {
	                o[a] = deepClone(o[a]);
	            }
	        }
	        return o;
	    };
	
	    exports.getItemId = function () {
	        return location.href.match(/(\d)+/)[0];
	    };
	
	    exports.getQueryString = function (name) {
	        var r = window.location.search.substr(1).replace(/&amp;/g, '&');
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        r = r.match(reg);
	        if (r != null) return decodeURIComponent(r[2]);
	        return null;
	    };
	
	    // var colletStatus = false;
	    var careMap = {},
	        favMap = {};
	    exports.onCollectProduct = function (id, _cb) {
	        if (favMap['f_' + id]) {
	            layer.msg('已收藏该商品', LAYER_MSG_DEFAULT);
	            return;
	        }
	        /*var uid = $.cookie('uid');
	        if (!uid) {
	            /!*location.href = _WEB_Cfg.domain + '/login.html?reurl=' + encodeURIComponent(location.href);
	            return false;*!/
	
	
	        }*/
	        //快捷登录
	        var uid = $.cookie('uid');
	        if(!uid){
	            qlogin.init();
	            return false;
	        }
	
	        api.service.user.favAdd({itemId: id}, function(data){
	            if (data.code == 200) {
	                layer.msg('收藏成功', LAYER_MSG_DEFAULT);
	                favMap['f_' + id] = true;
	                updateUserFavData('favGoods', data.data.count);
	                _cb && _cb(data);
	            } else if (data.code == 201) {
	                layer.msg('已收藏该商品', LAYER_MSG_DEFAULT);
	            } else {
	                layer.msg('网络异常，请重试', LAYER_MSG_DEFAULT);
	            }
	        });
	    };
	    exports.onCareShop = function (id, _cb) {
	        /*var uid = $.cookie('uid');
	        if (!uid) {
	            location.href = _WEB_Cfg.domain + '/login.html?reUrl=' + encodeURIComponent(location.href);
	            return false;
	        }*/
	        //快捷登录
	        var uid = $.cookie('uid');
	
	        if(!uid){
	            qlogin.init();
	            return false;
	        }
	
	        if (careMap['c_' + id]) {
	            layer.msg('已关注该档口', LAYER_MSG_DEFAULT);
	            return;
	        }
	        var _data = {
	            shopId: id
	        };
	        api.service.user.favShopAdd(_data, function(data){
	            if (data.code == 200) {
	                layer.msg('关注成功', LAYER_MSG_DEFAULT);
	                updateUserFavData('favShops', data.data.count);
	                careMap['c_' + id] = true;
	                _cb && _cb(data);
	            } else if (data.code == 201) {
	                layer.msg('已关注该档口', LAYER_MSG_DEFAULT);
	            } else {
	                layer.msg('网络异常，请重试', LAYER_MSG_DEFAULT);
	            }
	        });
	        return false;
	    };
	    exports.onCancelFav = function (id, _cb) {
	        var uid = $.cookie('uid');
	        if (!uid) {
	            location.href = _WEB_Cfg.domain + '/login.html?reurl=' + encodeURIComponent(location.href);
	            return false;
	        }
	
	        var fav = layer.confirm("确定不再收藏此商品？", {title: '取消收藏', btn: ['取消', '确定'], closeBtn: false}, function () {
	            layer.close(fav);
	        }, function () {
	            var that = this,
	                _data = {
	                    itemId: id
	                };
	            api.service.user.favCancel(_data, function(data){
	                layer.msg("已取消收藏！", LAYER_MSG_DEFAULT);
	                updateUserFavData('favGoods', data.data.count);
	                _cb && _cb();
	            });
	        });
	    };
	    exports.onCancelCare = function (id, _cb) {
	        var uid = $.cookie('uid');
	        if (!uid) {
	            location.href = _WEB_Cfg.domain + '/login.html?reurl=' + encodeURIComponent(location.href);
	            return false;
	        }
	
	        var fav = layer.confirm("确定不再关注此档口？", {title: '取消关注', btn: ['取消', '确定'], closeBtn: false}, function () {
	            layer.close(fav);
	        }, function () {
	            var that = this,
	                _data = {
	                    shopId: id
	                };
	            api.service.user.favShopCancel(_data, function(data){
	                updateUserFavData('favShops', data.data.count);
	                _cb && _cb(data);
	                layer.msg("已取消关注", LAYER_MSG_DEFAULT);
	            });
	        });
	    };
	
	    exports.upFileBox = function (id, vid) {
	        var _html = '<div class="layer-up-box">' +
	            '<div class="up-btn-list clearfix">' +
	            '<a href="javascript:;" data-href="http://tb.vvic.com/publish.aspx?id=' + vid + '&tid='+id+'&p=1" data-name="tb" class="tb chklog">淘宝</a>' +
	            '<a href="javascript:;" data-href="http://1688.vvic.com/publish.jsp?id=' + vid + '&p=1" data-name="ali" class="ali chklog">阿里巴巴</a>' +
	            '<a href="javascript:;" data-href="http://aliexpress.vvic.com/publish.jsp?id=' + vid + '" data-name="smt" class="smt chklog">速卖通</a>' +
	            '<a href="javascript:;" data-href="http://jd.vvic.com/publish.jsp?p=1&id=' + vid + '" data-name="jd" class="jd chklog">京东</a>' +
	            '<a data-style="visibility: hidden" > </a>' +
	            '<a href="javascript:;" data-href="http://mls.vvic.com/publish.jsp?id=' + vid + '&p=1" data-name="mls" class="mls chklog">美丽说</a>' +
	            '<a href="javascript:;" data-href="http://mgj.vvic.com/publish.jsp?p=1&id=' + vid + '" data-name="mgj" class="mgj chklog">蘑菇街</a>' +
	            '</div>' +
	            '<div class="msg clearfix">微信、天猫将于近期上线</div>' +
	            '</div>';
	
	        //自定页
	        layer.open({
	            type: 1,
	            skin: 'layui-layer-up', //样式类名
	            closeBtn: 1, //不显示关闭按钮
	            // shift: 2,
	            area: ['380px', '285px'],
	            title: '请选择要上架的平台',
	            shadeClose: true, //开启遮罩关闭
	            scrollbar:true,
	            content: _html,
	            end: function(){
	                // 解除事件绑定。
	                $(document).off("click", ".chklog");
	            }
	        });
	        $(document).on("click", ".chklog", function(){
	            var $this = $(this),
	                uid = $.cookie('uid'),
	                _href = $this.attr('data-href');
	            if (!uid) {
	                //layer.close(1);
	                $('.layui-layer-shade').remove();
	                layer.closeAll();
	                qlogin.init(_href);
	                return;
	            }else{
	                $this.attr({'href':_href,'target':'_blank'}).removeClass('chklog').click();
	                /*var _tag = window.open('about:blank');
	                 _tag.location.href = _href;*/
	            }
	        });
	    };
	
	    // lazyload
	    exports.fixLazyload = function () {
	        var dpr = window.devicePixelRatio,
	            effect = dpr > 1 ? 'show' : 'fadeIn';
	        $("img.lazy").lazyload({
	            threshold: 400,
	            effect: effect,
	            failure_limit: 1000
	        });
	        $('body,html').resize();
	    };
	
	    // 回到顶部
	    exports.initIconEvent = function () {
	        var serTime;
	        $(document).on("mouseenter", ".j-v-tip", function () {
	            var $this = $(this),
	                _type = $this.data('tip'),
	                _tips = {
	                    tx: ["档口承诺：未下架、非特价或过季商品，且不影响二次销售，可申请退现。<b>以下情况需先与档口确认是否可退：1、快递退货；2、特殊时间（如春节前、双十一）；3、售出太久（超过15天）；4、件数太多（超过10件）。</b>使用搜款网代发，可提高退现成功率。", "退现", "tx"],
	                    sp: ["档口承诺：档口 80% 商品为真实拍摄，本款商品是否为实拍，请在上款前联系档口确认。", "实拍", "sp"],
	                    df: ["档口承诺：从本店进货，可提供代发服务，且不收取代发费。", "一件代发", "df"],
	                    year: ['支付宝个人认证 ' + $this.data('date')],
	                    cert: ['档口已通过搜款网实名认证'],
	                    miao: ['档口上新实时同步到搜款网'],
	                    top: ['档口在沙河排名前 ' + $this.data('top')]
	                },
	                _typeString = ['tx', 'sp', 'df'];
	
	            serTime = setTimeout(function () {
	                if (_typeString.indexOf(_type) > -1 && !$this.hasClass('j-v-tip-item')) {
	                    var $li = $this.closest('li');
	                    $li.children('.service-tips').remove();
	                    $li.append('<div class="service-tips"><i class="' + _tips[_type][2] + '"></i><span>' + _tips[_type][1] + '</span><div class="clear"></div><p>' + _tips[_type][0] + '</p></div>');
	                } else {
	                    layer.tips(_tips[_type][0], $this, {tips: [3, '#ffffff'], skin: 'service-tips', time: 10000});
	                }
	            }, 300);
	
	            $this.closest('li').addClass('hover');
	
	        }).on("mouseleave", ".j-v-tip", function () {
	            var $this = $(this);
	            clearTimeout(serTime);
	            layer.closeAll('tips');
	            if (!$this.hasClass("j-v-tip-item"))
	                $this.closest('li').children('.service-tips').remove();
	
	            $this.closest('li').removeClass('hover');
	        });
	
	
	        $('.side-list,.goods-list').on('mouseenter', '.pos', function () {
	            $(this).closest('li').addClass('hover');
	        }).on('mouseleave', '.pos', function () {
	            $(this).closest('li').removeClass('hover');
	        });
	
	        $(document).on('mouseenter', '.j-img-view', function(){
	            var $this = $(this);
	            layer.tips('<img src="'+$this.attr('view-src')+'" width="230" height="230" />', $this, {tips: [2, '#ffffff'], skin: 'img-tips',area:['253px','250px'], time:10000});
	        }).on('mouseleave', '.j-img-view', function(){
	             layer.closeAll('tips');
	        });
	    };
	
	    exports.addCopyclipboard = function (events, content,selectText) {
	        var _content;
	        events = events || 'dblclick';
	
	        if ('clipboardData' in window) {
	            $(".j_clip_button").on(events, function () {
	                 _content = content || this.innerHTML.replace('#', '');
	                var art_no = $.trim(content);
	                window.clipboardData.setData("Text", art_no);
	            });
	        } else {
	            // var clipboard = require(['clipboard'], function (clipboard) {
	
	            //     $(document).off('copy', '.j_clip_button');
	
	            //     $(document).on('copy', '.j_clip_button', function (e) {
	            //          _content = content || e.target.innerHTML.replace(/\#/g, '');
	
	            //         var art_no = $.trim(_content);
	
	            //         if(selectText){
	            //             var target = e.target;
	            //             var s = window.getSelection();
	
	            //             if (s.rangeCount > 0) s.removeAllRanges();
	
	            //             var range = document.createRange();
	            //             range.selectNode(target);
	            //             s.addRange(range);
	            //         }
	
	            //         e.clipboardData.clearData();
	            //         e.clipboardData.setData("text/plain", art_no);
	
	            //         // console.log("copy success", art_no)
	            //         e.preventDefault();
	
	            //     });
	
	            // });
	
	        }
	
	    };
	    exports.addCopyclipboard(null,null,true);
	
	    // 公用下拉组件
	    exports.vSelect = function() {
	        $(document).on('click', '.j-v-select dt', function(){
	
	            var dl = $(this).parent('dl');
	
	            if(!dl.hasClass('dis')){
	                dl.addClass('showed');
	            }
	        });
	        $(document).on('mouseleave', '.j-v-select', function(){
	            $(this).removeClass('showed');
	        });
	
	        $(document).on('click', '.j-v-select-ul li', function(){
	            var $this = $(this);
	            if($this.hasClass('disabled')){
	                return false;
	            }
	            $this.addClass('selected').siblings().removeClass('selected');
	            var $dl =  $this.closest('dl');
	            $dl.removeClass('showed').find('dt span').html( $('span',$this).html() );
	        });
	    };
	
	    exports.initIconEvent();
	
	    module.exports = exports
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, require(8), require(9)))

/***/ },
/* 3 */
/***/ function(module, exports, require) {

	var $ = require(9);
	var cookie = require(5);
	
	    var apiExports = {},
	        _ERROR_CB_TXT = '服务器开小差了!, 请刷新重试';
	    //记录本页url作登录跳转
	    var h = location.href;
	
	    var goLogin = function () {
	        var dateTime = new Date(new Date() - 24 * 60 * 60 * 1000);
	        $.cookie('ut', '', {path: '/', expires: dateTime});
	        $.cookie('uid', '', {path: '/', domain: '.vvic.com', expires: dateTime});
	        $.cookie('umc', '', {path: '/', expires: dateTime});
	        $.cookie('mobile', '', { path: '/' , expires: _expires});
	        $.cookie('defaultShopId', '', {path: '/', expires: dateTime});
	        $.cookie('defaultShopName', '', {path: '/', expires: dateTime});
	        $.cookie('shopName', '', {path: '/', expires: dateTime});
	        $.cookie('shopId', '', {path: '/', expires: dateTime});
	        $.cookie('pn', '', {path: '/', expires: dateTime});
	        $.cookie('uno', '', {path: '/', expires: dateTime});
	        location.href = _WEB_Cfg.domain + '/login.html?reurl=' + encodeURIComponent(location.href);
	    };
	
	    var getData = function (url, method, data, successCallback, completeCallback) {
	        var _cCb = completeCallback || function () {
	                },
	            _sCb = successCallback || function () {
	                },
	            _url = url,
	            _method = method,
	            _data = data;
	        _url = _url.indexOf('http://') < 0 ? (window._WEB_Cfg.apiUrl + _url) : _url;
	        $.support.cors = true;
	        $.ajax({
	            url: _url,
	            type: _method,
	            dataType: "json",
	            data: _data,
	            // timeout:15000,
	            success: function (jsonData) {
	                if (jsonData) {
	                    if (jsonData.code == 401) {
	                        goLogin();
	                        return;
	                    }
	                    if (jsonData.code == 40102) {
	                        reLogin();
	                        // return;
	                    }
	                    _sCb(jsonData);
	                } else {
	                    // console.log(_ERROR_CB_TXT);
	                }
	            },
	            error: function (err) {
	                if (err.status == 401) {
	                    goLogin();
	                    return;
	                }
	                if (err.status == 40102) {
	                    reLogin();
	                    // return;
	                }
	                // console.log(_ERROR_CB_TXT);
	                return false;
	            },
	            complete: _cCb
	        });
	    };
	
	    var ajax_error = function(res){
	        throw Error('ajax请求报错');
	    };
	
	    var apiAjax = function(url, type, data, cb, error){
	        var self = this;
	        return $.ajax({
	            url: url,
	            type: type,
	            data: data,
	            success: cb,
	            error: error || ajax_error
	        });
	    };
	
	    var service = {
	        web: {
	            getItem: function(id, cb){
	                return apiAjax('/apic/item/' + id, 'GET', {}, cb);
	            }
	        },
	        user: {
	            // 个人中心
	            home: function(cb){
	                return apiAjax('/apic/user/userHomeAsy', 'GET', {}, cb);
	            },
	            //是否显示验证码
	            loginShowCode:function(data,cb){
	                return apiAjax('/apic/show', 'GET', data, cb);
	            },
	            // 账户余额
	            userMoney: function(cb){
	                return apiAjax('/apic/user/uMoney','GET',{}, cb);
	            },
	            // 个人中心 收藏商品分类
	            favCat: function (cb) {
	                return apiAjax('/apic/user/favoriteItem/itemCategory','GET',{},cb);
	            },
	            favAdd: function(data, cb) {
	                return apiAjax('/apic/user/favoriteItem/add', 'POST', data, cb);
	            },
	            // 个人中心 收藏商品列表
	            favList: function (data, cb, err) {
	                return apiAjax('/apic/user/favorite','GET',data,cb, err);
	            },
	            favDownList: function(data, cb) {
	                return apiAjax('/apic/user/favoriteItem/down/list','GET',data,cb);
	            },
	            favCancel: function(data, cb){
	                return apiAjax('/apic/user/favoriteItem/cancel','POST',data,cb);
	            },
	            favShopAdd: function(data, cb) {
	                return apiAjax('/apic/user/favoriteShop/add', 'POST', data, cb);
	            },
	            favShopCancel: function(data, cb){
	                return apiAjax('/apic/user/favoriteShop/cancel','POST',data,cb);
	            },
	            historyCat: function (cb) {
	                return apiAjax('/apic/user/favoriteItem/itemCategory','GET',{},cb);
	            },
	            historyList: function (data, cb, err) {
	                return apiAjax('/apic/user/favoriteUpload/list','GET',data,cb, err);
	            },
	            historyDownList: function(data, cb) {
	                return apiAjax('/apic/user/favoriteUpload/down/list','GET',data,cb);
	            },
	            historyCancel: function(data, cb){
	                return apiAjax('/apic/user/favoriteUpload/cancel', 'POST', data, cb);
	            }
	        },
	        account: {
	            // 登录
	            login: function(data, cb){
	                apiAjax('/apic/login', 'POST', data, cb);
	            },
	            // 邮箱激活
	            doActiveEmail: function(data, cb){
	                apiAjax('/apic/verifyEmailValidateCode', 'POST', data, cb);
	            },
	            // 发送绑定邮箱邮件
	            getBindEmail: function(data, cb){
	                apiAjax('/apic/activateEmail', 'POST', data, cb);
	            }
	        },
	        address: {
	            list: function(data, cb){
	                apiAjax('/apic/user/address/list', 'GET', data, cb);
	            },
	            save: function(data, cb){
	                apiAjax('/apic/user/address/save', 'POST', data, cb);
	            },
	            deletes: function(id, cb){
	                apiAjax('/apic/user/address/delete/' + id, 'POST', {}, cb);
	            },
	            setDefault: function(id, data, cb){
	                apiAjax('/apic/user/address/setDefault/' + id, 'POST', data, cb);
	            }
	        },
	        order: {
	            // 订单详情
	            detail: function(data, cb){
	                apiAjax('/apic/user/order_detail', 'GET', data, cb);
	            },
	            // 确认订单列表
	            confirmList: function(data, cb){
	                apiAjax('/apic/user/orderConfirmList', 'GET', data, cb);
	            },
	            // 异步调用提交订单
	            confirm: function (data, cb, error) {
	                apiAjax('/apic/user/order_confirm', 'POST', data, cb, error);
	            },
	            deletes: function(id, cb){
	                apiAjax('/apic/user/order_delete/' + id , 'POST', {}, cb);
	            },
	            // 个人中心 我的订单列表
	            list: function(data, cb) {
	                apiAjax('/apic/user/orders', 'GET', data, cb);
	            },
	            // 拿货记录信息
	            getTakeList: function(data, cb){
	                apiAjax('/apic/user/order_track_list', 'GET', data, cb);
	            },
	            // 余额支付
	            payByBalance: function(data, cb){
	                apiAjax('/apic/user/bzhifu', 'POST', data, cb);
	            }
	        },
	        // 档口中心
	        shop: {
	            list: function(cb){
	                apiAjax('/apic/user/shop/list', 'GET', {}, cb);
	            },
	            stockingList: function(shopId, cb){
	                apiAjax('/apic/user/pangge/stock/' + shopId, 'GET', {}, cb);
	            },
	            setStockSku: function(data, cb){
	                apiAjax('/apic/user/pangge/stock/set_status', 'POST', data, cb);
	            },
	            getFinancial: function(data, cb){
	                apiAjax('/apic/user/getFinancial', 'GET', data, cb);
	            },
	            saveFinancial: function(data, cb){
	                apiAjax('/apic/user/saveFinancial', 'POST', data, cb);
	            },
	            getItem: function(itemId, cb){
	                apiAjax('/apic/itemInfo/' + itemId, 'GET', {}, cb);
	            },
	            orderList: function(shopId, data, cb){
	                apiAjax('/apic/user/shopOrders/' + shopId, 'GET', data, cb);
	            },
	            updateItem: function(itemId, data, cb){
	                apiAjax('/apic/user/item/update/' + itemId, 'POST', data, cb);
	            }
	        },
	        // 退货退款
	        refund: {
	            list: function(data, cb){
	                apiAjax('/apic/user/order_refund_list', 'GET', data, cb);
	            },
	            add: function(data, cb){
	                apiAjax('/apic/user/order_refund_add', 'POST', data, cb);
	            },
	            payConfirm: function(data, cb){
	                apiAjax('/apic/user/refund_pay_confirm', 'GET', data, cb);
	            },
	            returnList: function(data, cb){
	                apiAjax('/apic/user/order_refund_record', 'GET', data, cb);
	            }
	        },
	        cms: {
	            getHelpPage: function(data, cb){
	                return $.ajax({
	                    url: _WEB_Cfg.actUrl + data.page,
	                    type: 'get',
	                    dataType: 'html',
	                    success: cb,
	                    error: this.ajax_error
	                });
	            },
	            getDataJsonp: function(data, cb){
	                return $.ajax({
	                    url: _WEB_Cfg.actUrl + '/data/' + data.page + '.jsonp',
	                    type: 'get',
	                    dataType: 'jsonp',
	                    jsonpCallback: data.page,
	                    success: cb,
	                    error: ajax_error
	                });
	            },
	            getSearchList: function(cb){
	                return $.ajax({
	                    url: _WEB_Cfg.actUrl + '/help/search.jsonp',
	                    type: 'get',
	                    success: cb,
	                    dataType: 'jsonp',
	                    jsonpCallback: 'jsonp1',
	                    error: ajax_error
	                });
	            }
	        },
	        cart: {
	            /*
	             * 购物车属性修改
	             * ?id=1586&item_id=2018630&color=黑色1&color_id=1627207:28341&size=S&size_id=20509:28314&vskuid=1
	             * */
	            updateProperty: function (data, cb) {
	                apiAjax('/apic/user/cart/updateProperty', 'POST', data, cb);
	            },
	                        /*
	             * 删除购物车*/
	            deletes: function (data, cb) {
	                apiAjax('/apic/user/cart/delete', 'POST', data, cb);
	            },
	                        /*
	             * 购物车移到收藏*/
	            move: function (data, cb) {
	                apiAjax('/apic/user/cart/move', 'POST', data, cb);
	            },
	                        /*
	             * 购物车修改数量*/
	            update: function (data, cb) {
	                apiAjax('/apic/user/cart/update', 'POST', data, cb);
	            },
	            /*
	             * 购物车列表*/
	            list: function (data, cb, errcb) {
	                apiAjax('/apic/user/cart/list', 'GET', data, cb, errcb);
	            },
	            /*
	             * 加密购物车ids
	             * ?ids=1,3,4
	             * */
	            eids: function (data, cb) {
	                apiAjax('/apic/user/eids', 'POST', data, cb);
	            }
	        },
	        purchase: {
	            /*
	             * 拿货单列表*/
	            list: function (data, cb, errcb) {
	                apiAjax('/apic/user/purchase/list', 'GET', {}, cb, errcb);
	            },
	            /*
	             * 拿货单修改数量*/
	            update: function (data, cb) {
	                apiAjax('/apic/user/purchase/update', 'POST', data, cb);
	            },
	            /*
	             * 拿货单属性修改
	             * */
	            updateProperty: function (data, cb) {
	                apiAjax('/apic/user/purchase/updateProperty', 'POST', data, cb);
	            },
	            /*
	             * 删除拿货单*/
	            deletes: function (data, cb) {
	                apiAjax('/apic/user/purchase/delete', 'POST', data, cb);
	            },
	            /*
	             * 拿货单移到收藏*/
	            move: function (data, cb) {
	                apiAjax('/apic/user/purchase/move', 'POST', data, cb);
	            }
	        },
	        // 潮流鞋靴-每日新款
	        shoesDayNewList: function(data, cb) {
	            return $.ajax({
	                url: '/apic/dayNewList',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 档口租赁
	        shopLeaseTop: function(data, cb) {
	            return $.ajax({
	                url: '/apic/shopLease/top',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        userShopLeaseRefresh: function(data, cb) {
	            return $.ajax({
	                url: '/apic/user/shopLease/refresh',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // bid, pageSize,currentPage
	        shopLeaseList: function(data, cb) {
	            return $.ajax({
	                url: '/apic/shopLease/list',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 取消订单原因列表
	        orderCancelReasons: function(data, cb){
	            return $.ajax({
	                url: '/apic/orderCancelReasons',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 获取需要取消的订单的详情
	        orderCancelDetail: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/order_cancel_details',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        userCancelOrder: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/order_cancel_add',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 获取运费
	        userGetExpress: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/queryExpressByOrder',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /// 个人中心 退货退款
	        // 是否支持退货
	        userRefundCheck: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/canRefund',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /// 个人中心 退货退款
	        // 个人中心 获取商品sku
	        getGoodsSku: function(id, data, cb, err) {
	             return $.ajax({
	                 url: '/apic/getskumap/' + id,
	                 type: 'GET',
	                 data: data,
	                 success: cb,
	                 error: err
	             });
	         },
	        userConfirmGoods: function(data, cb) {
	            return $.ajax({
	                url: '/apic/user/confirm_goods',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 个人价格模板获取
	        userPriceTemplate: function(data, cb) {
	            return $.ajax({
	                url: '/apic/uploadRecordDiscount/get',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 个人价格模板设置
	        userPriceTemplateSet: function(data, cb) {
	            return $.ajax({
	                url: '/apic/uploadRecordDiscount/save',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 数据包
	        userPacketList: function (cb) {
	            return $.ajax({
	                url: '/apic/user/csvRecord/list',
	                type: 'GET',
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 数据包 商品列表
	        userPacketItemsList: function (data,cb) {
	            return $.ajax({
	                url: '/apic/user/csvRecord/list/'+ data.id,
	                type: 'GET',
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 创建数据包商品详情
	        userPacketDetailList: function (data,cb) {
	            return $.ajax({
	                url: '/apic/getItems/'+ data.ids,
	                type: 'GET',
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 个人中心 创建数据包商品详情
	         * */
	        userPacketCreate: function(data, cb, complete){
	            return $.ajax({
	                url: 'http://shujubao.vvic.com/CsvMaker',
	                dataType: 'jsonp',
	                data: data,
	                success: cb,
	                error: ajax_error,
	                tjsonp:'callback'
	            });
	        },
	        // 个人中心 删除数据包
	        userPacketDelete: function(data, cb){
	            return $.ajax({
	                url: 'http://shujubao.vvic.com/CsvDelete',
	                type: 'post',
	                data: data,
	                success: cb,
	                error: ajax_error,
	                timeout: 120000
	            });
	        },
	        // 个人中心 交易记录
	        userBillList: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/trade/trade_list',
	                type: 'get',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 登录详细信息
	        loginUMoreInfo: function (data,cb) {
	            return $.ajax({
	                url: '/apic/loginUMoreInfo',
	                type: 'GET',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 登录信息
	        // @return cart_amount 购物车数量
	        loginUinfo: function (data,cb) {
	            return $.ajax({
	                url: '/apic/loginUserInfo',
	                type: 'GET',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 查询快递类型
	        queryExpress: function (data,cb) {
	            return $.ajax({
	                url: '/apic/user/queryExpress',
	                type: 'GET',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 支付确认页面 orderId
	        userPayConfirm: function (data,cb) {
	            return $.ajax({
	                url: '/apic/user/pay_confirm',
	                type: 'POST',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 支付提交 orderId
	        userPaySubmit: function (data,cb) {
	            return $.ajax({
	                url: '/apic/user/pay_submit',
	                type: 'POST',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 异步调用提交修改订单
	        userOrderUpdate: function (data,cb) {
	            return $.ajax({
	                url: '/apic/user/order_update',
	                type: 'POST',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 个人中心 打印拿货单
	        // ?ids=40,41
	        userPrintList: function (data,cb) {
	            return $.ajax({
	                url: '/apic/user/purchase/plist',
	                type: 'GET',
	                data:data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 个人中心 关注档口
	         * */
	        userFollowList: function (data, cb) {
	            return $.ajax({
	                url: '/apic/user/favoriteShop/list',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 个人中心 取消关注档口
	         * shopId
	         * */
	        userFollowCancel: function (data, cb) {
	            return $.ajax({
	                url: '/apic/user/favoriteShop/cancel',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 个人中心 消息列表
	         * */
	        userMessageList: function (data, cb) {
	            return $.ajax({
	                url: '/apic/user/message/list',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 每日新款更新的数量*/
	        newamount: function (cb) {
	            return $.ajax({
	                url: '/apic/newamount',
	                type: 'GET',
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 档口下架商品*/
	        shopDown: function (data, cb) {
	            return $.ajax({
	                url: '/apic/shop/down/' + data.id,
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 档口上下架记录*/
	        shopRecordDetail: function (data, cb) {
	            return $.ajax({
	                url: '/apic/shop/record/detail/' + data.id,
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 搜索结果*/
	        searchAsy: function (data, cb) {
	            return $.ajax({
	                url: '/apic/searchAsy',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        /*
	         * 找同款结果*/
	        sameStyleAsy: function (data, cb) {
	            return $.ajax({
	                url: '/apic/samestyleAsy',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        renderShopData: function (data, cb) {
	            if (!$.cookie('uid')) {
	                return;
	            }
	            return $.ajax({
	                url: '/api/user/statShopDateData/list',
	                type: 'GET',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        getMessageUnRead: function (cb) {
	            if (!$.cookie('uid')) {
	                return;
	            }
	            return $.ajax({
	                url: '/api/user/getMessageUnRead',
	                type: 'GET',
	                success: cb,
	                error: ajax_error
	            });
	        },
	        logout: function (data, cb) {
	            return $.ajax({
	                url: '/apic/user/logout',
	                type: 'GET',
	                success: function (res) {
	                    if($.isFunction(cb)) {
	                        cb(res);
	                    }
	                    var dateTime = new Date(new Date() - 24 * 60 * 60 * 1000);
	                    $.cookie('ut', '', {path: '/', expires: dateTime});
	                    $.cookie('uid', '', {path: '/', domain: '.vvic.com', expires: dateTime});
	                    $.cookie('umc', '', {path: '/', expires: dateTime});
	                    $.cookie('defaultShopId', '', {path: '/', expires: dateTime});
	                    $.cookie('defaultShopName', '', {path: '/', expires: dateTime});
	                    $.cookie('shopName', '', {path: '/', expires: dateTime});
	                    $.cookie('shopId', '', {path: '/', expires: dateTime});
	                    $.cookie('pn', '', {path: '/', expires: dateTime});
	                    $.cookie('uno', '', {path: '/', expires: dateTime});
	                    location.href = '/login.html';
	
	                },
	                error: ajax_error
	            });
	        },
	        getSmsCode: function(data, cb){
	            apiAjax('/apic/user/getSmsCode', 'GET', data, cb);
	        },
	        getSmsPas: function(data, cb){
	            apiAjax('/apic/user/getSmsPas', 'GET', data, cb);
	        },
	        // 用户中心 添加提现账户
	        addWithdrawAccount: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/add_bank_account',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        // 用户中心 修改提现账户
	        updateWithdrawAccount: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/update_bank_account',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        comfirmWithdraw: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/withdraws_cash_confirm',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        },
	        doWithdraw: function(data, cb){
	            return $.ajax({
	                url: '/apic/user/withdraws_cash_post',
	                type: 'POST',
	                data: data,
	                success: cb,
	                error: ajax_error
	            });
	        }
	    };
	
	    apiExports.service = service;
	
	    apiExports.getData = getData;
	    module.exports =  apiExports;


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, require) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e){true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [require(9)], __WEBPACK_AMD_DEFINE_RESULT__ = (e.apply(null, __WEBPACK_AMD_DEFINE_ARRAY__)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=u.raw?n:r(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(r,c,f){if(void 0!==c&&!e.isFunction(c)){if(f=e.extend({},u.defaults,f),"number"==typeof f.expires){var a=f.expires,d=f.expires=new Date;d.setTime(+d+864e5*a)}return document.cookie=[n(r),"=",i(c),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}for(var p=r?void 0:{},s=document.cookie?document.cookie.split("; "):[],m=0,x=s.length;x>m;m++){var v=s[m].split("="),k=o(v.shift()),l=v.join("=");if(r&&r===k){p=t(l,c);break}r||void 0===(l=t(l))||(p[k]=l)}return p};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}});

/***/ },
/* 6 */
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, jQuery) {!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function j(){var b=0;g.each(function(){var c=a(this);if(!i.skip_invisible||c.is(":visible"))if(a.abovethetop(this,i)||a.leftofbegin(this,i));else if(a.belowthefold(this,i)||a.rightoffold(this,i)){if(++b>i.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,g=this,i={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QjNENTFGOUIwNkExMUU1OUY1RkZBRDRDNjM2NTdFMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QjNENTFGQUIwNkExMUU1OUY1RkZBRDRDNjM2NTdFMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRCM0Q1MUY3QjA2QTExRTU5RjVGRkFENEM2MzY1N0UxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRCM0Q1MUY4QjA2QTExRTU5RjVGRkFENEM2MzY1N0UxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAAAsAAAAAAEAAQAAAgJEAQA7"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(i,f)),h=i.container===d||i.container===b?e:a(i.container),0===i.event.indexOf("scroll")&&h.bind(i.event,function(){return j()}),this.each(function(){var c=this,e=a(c);c.loaded=!1,(e.attr("src")===d||e.attr("src")===!1)&&e.is("img")&&e.attr("src",i.placeholder),e.one("appear",function(){if(!this.loaded){if(i.appear){var d=g.length;i.appear.call(c,d,i)}a("<img />").bind("load",function(){var d=e.attr("data-"+i.data_attribute),f=b.devicePixelRatio;2==f&&(d=d.replace("_190x190.jpg","_460x460.jpg").replace("_230x230.jpg","_460x460.jpg").replace("|220w_330h","|440w_660h")),e.hide(),e.is("img")?e.attr("src",d):e.css("background-image","url('"+d+"')"),e[i.effect](i.effect_speed),c.loaded=!0;var h=a.grep(g,function(a){return!a.loaded});if(g=a(h),e.removeAttr("data-"+i.data_attribute).removeClass("lazy"),i.load){var j=g.length;i.load.call(c,j,i)}}).attr("src",e.attr("data-"+i.data_attribute))}}),0!==i.event.indexOf("scroll")&&e.bind(i.event,function(){c.loaded||e.trigger("appear")})}),e.bind("resize",function(){j()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&g.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){j()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, require(9)))

/***/ },
/* 7 */
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, jQuery, $) {jQuery.fn.pagination=function(a,b){return b=jQuery.extend({items_per_page:10,num_display_entries:10,current_page:0,num_edge_entries:0,link_to:"#",prev_text:"Prev",next_text:"Next",ellipse_text:"...",prev_show_always:!0,next_show_always:!0,simple:!1,jump:!0,callback:function(){return!1}},b||{}),this.each(function(){function c(){return Math.ceil(a/b.items_per_page)}function d(){var a=Math.ceil(b.num_display_entries/2),d=c(),e=d-b.num_display_entries,f=g>a?Math.max(Math.min(g-a,e),0):0,h=g>a?Math.min(g+a,d):Math.min(b.num_display_entries,d);return[f,h]}function e(a,c){g=a,f();var d=b.callback(a,h);return d||(c.stopPropagation?c.stopPropagation():c.cancelBubble=!0),d}function f(){h.empty();var a=d(),f=c(),i=function(a){return function(b){return e(a,b)}},j=function(a,c){if(a=0>a?0:f>a?a:f-1,c=jQuery.extend({text:a+1,classes:""},c||{}),a==g)var d=jQuery("<span class='current'>"+c.text+"</span>");else var d=jQuery("<a>"+c.text+"</a>").attr("vda","link|flip").bind("click",i(a)).attr("href",b.link_to.replace(/__id__/,a));c.classes&&d.addClass(c.classes),h.append(d)};if(b.prev_text&&(g>0||b.prev_show_always)&&j(g-1,{text:b.prev_text,classes:"prev"}),a[0]>0&&b.num_edge_entries>0){for(var k=Math.min(b.num_edge_entries,a[0]),l=0;k>l;l++)j(l);b.num_edge_entries<a[0]&&b.ellipse_text&&jQuery("<span class='ellipse'>"+b.ellipse_text+"</span>").appendTo(h)}for(var l=a[0];l<a[1];l++)j(l);if(a[1]<f&&b.num_edge_entries>0){f-b.num_edge_entries>a[1]&&b.ellipse_text&&jQuery("<span class='ellipse'>"+b.ellipse_text+"</span>").appendTo(h);for(var m=Math.max(f-b.num_edge_entries,a[1]),l=m;f>l;l++)j(l)}b.simple&&h.append('<span class="vam pageinfo"><span class="text-error currentPage">'+(g+1)+"</span>/"+f+"</span>"),b.next_text&&(f-1>g||b.next_show_always)&&j(g+1,{text:b.next_text,classes:"next"}),b.jump&&!b.simple&&(h.append('<div class="pager-jump"><span class="pager-text">\u5171 '+f+' \u9875 \u8df3\u8f6c\u5230\u7b2c</span><div class="pager-textbox-wrapper"><input value="'+(g+1)+'" class="jump-textbox"></div><span class="pager-text">\u9875</span><button class="jump-button">\u786e\u5b9a</button></div>'),$(".jump-button").bind("click",function(a){a=a||window.event;var b=$(this).parent().find(".jump-textbox").val();""!=b&&(b>f&&(b=f),0>=b&&(b=1),e(b-1,a))}))}var g=b.current_page;a=!a||0>a?1:a,b.items_per_page=!b.items_per_page||b.items_per_page<0?1:b.items_per_page;var h=jQuery(this);this.selectPage=function(a){e(a)},this.prevPage=function(){return g>0?(e(g-1),!0):!1},this.nextPage=function(){return g<c()-1?(e(g+1),!0):!1},f()})};
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, require(9), require(9)))

/***/ },
/* 8 */
/***/ function(module, exports, require) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};true?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"=='function'&&require(16)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return m}.apply(null, __WEBPACK_AMD_DEFINE_ARRAY__)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);
	//# sourceMappingURL=underscore-min.map

/***/ },
/* 9 */
/***/ function(module, exports, require) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=e.length,n=ie.type(e);return"function"!==n&&!ie.isWindow(e)&&(!(1!==e.nodeType||!t)||("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e))}function r(e,t,n){if(ie.isFunction(t))return ie.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return ie.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(de.test(t))return ie.filter(t,e,n);t=ie.filter(t,e)}return ie.grep(e,function(e){return ie.inArray(e,t)>=0!==n})}function i(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function o(e){var t=xe[e]={};return ie.each(e.match(be)||[],function(e,n){t[n]=!0}),t}function a(){he.addEventListener?(he.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1)):(he.detachEvent("onreadystatechange",s),e.detachEvent("onload",s))}function s(){(he.addEventListener||"load"===event.type||"complete"===he.readyState)&&(a(),ie.ready())}function l(e,t,n){if(void 0===n&&1===e.nodeType){var r="data-"+t.replace(Ee,"-$1").toLowerCase();if(n=e.getAttribute(r),"string"==typeof n){try{n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:Ne.test(n)?ie.parseJSON(n):n)}catch(e){}ie.data(e,t,n)}else n=void 0}return n}function u(e){var t;for(t in e)if(("data"!==t||!ie.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function c(e,t,n,r){if(ie.acceptData(e)){var i,o,a=ie.expando,s=e.nodeType,l=s?ie.cache:e,u=s?e[a]:e[a]&&a;if(u&&l[u]&&(r||l[u].data)||void 0!==n||"string"!=typeof t)return u||(u=s?e[a]=J.pop()||ie.guid++:a),l[u]||(l[u]=s?{}:{toJSON:ie.noop}),"object"!=typeof t&&"function"!=typeof t||(r?l[u]=ie.extend(l[u],t):l[u].data=ie.extend(l[u].data,t)),o=l[u],r||(o.data||(o.data={}),o=o.data),void 0!==n&&(o[ie.camelCase(t)]=n),"string"==typeof t?(i=o[t],null==i&&(i=o[ie.camelCase(t)])):i=o,i}}function f(e,t,n){if(ie.acceptData(e)){var r,i,o=e.nodeType,a=o?ie.cache:e,s=o?e[ie.expando]:ie.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){ie.isArray(t)?t=t.concat(ie.map(t,ie.camelCase)):t in r?t=[t]:(t=ie.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;for(;i--;)delete r[t[i]];if(n?!u(r):!ie.isEmptyObject(r))return}(n||(delete a[s].data,u(a[s])))&&(o?ie.cleanData([e],!0):ne.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}function d(){return!0}function p(){return!1}function h(){try{return he.activeElement}catch(e){}}function m(e){var t=Oe.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function g(e,t){var n,r,i=0,o=typeof e.getElementsByTagName!==Ce?e.getElementsByTagName(t||"*"):typeof e.querySelectorAll!==Ce?e.querySelectorAll(t||"*"):void 0;if(!o)for(o=[],n=e.childNodes||e;null!=(r=n[i]);i++)!t||ie.nodeName(r,t)?o.push(r):ie.merge(o,g(r,t));return void 0===t||t&&ie.nodeName(e,t)?ie.merge([e],o):o}function y(e){je.test(e.type)&&(e.defaultChecked=e.checked)}function v(e,t){return ie.nodeName(e,"table")&&ie.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function b(e){return e.type=(null!==ie.find.attr(e,"type"))+"/"+e.type,e}function x(e){var t=Ve.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function w(e,t){for(var n,r=0;null!=(n=e[r]);r++)ie._data(n,"globalEval",!t||ie._data(t[r],"globalEval"))}function T(e,t){if(1===t.nodeType&&ie.hasData(e)){var n,r,i,o=ie._data(e),a=ie._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;r<i;r++)ie.event.add(t,n,s[n][r])}a.data&&(a.data=ie.extend({},a.data))}}function C(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!ne.noCloneEvent&&t[ie.expando]){i=ie._data(t);for(r in i.events)ie.removeEvent(t,r,i.handle);t.removeAttribute(ie.expando)}"script"===n&&t.text!==e.text?(b(t).text=e.text,x(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),ne.html5Clone&&e.innerHTML&&!ie.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&je.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}}function N(t,n){var r,i=ie(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?r.display:ie.css(i[0],"display");return i.detach(),o}function E(e){var t=he,n=Ze[e];return n||(n=N(e,t),"none"!==n&&n||(Ke=(Ke||ie("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=(Ke[0].contentWindow||Ke[0].contentDocument).document,t.write(),t.close(),n=N(e,t),Ke.detach()),Ze[e]=n),n}function k(e,t){return{get:function(){var n=e();if(null!=n)return n?void delete this.get:(this.get=t).apply(this,arguments)}}}function S(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=dt.length;i--;)if(t=dt[i]+n,t in e)return t;return r}function A(e,t){for(var n,r,i,o=[],a=0,s=e.length;a<s;a++)r=e[a],r.style&&(o[a]=ie._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&Ae(r)&&(o[a]=ie._data(r,"olddisplay",E(r.nodeName)))):(i=Ae(r),(n&&"none"!==n||!i)&&ie._data(r,"olddisplay",i?n:ie.css(r,"display"))));for(a=0;a<s;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}function D(e,t,n){var r=lt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function j(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;o<4;o+=2)"margin"===n&&(a+=ie.css(e,n+Se[o],!0,i)),r?("content"===n&&(a-=ie.css(e,"padding"+Se[o],!0,i)),"margin"!==n&&(a-=ie.css(e,"border"+Se[o]+"Width",!0,i))):(a+=ie.css(e,"padding"+Se[o],!0,i),"padding"!==n&&(a+=ie.css(e,"border"+Se[o]+"Width",!0,i)));return a}function L(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=et(e),a=ne.boxSizing&&"border-box"===ie.css(e,"boxSizing",!1,o);if(i<=0||null==i){if(i=tt(e,t,o),(i<0||null==i)&&(i=e.style[t]),rt.test(i))return i;r=a&&(ne.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+j(e,t,n||(a?"border":"content"),r,o)+"px"}function H(e,t,n,r,i){return new H.prototype.init(e,t,n,r,i)}function _(){return setTimeout(function(){pt=void 0}),pt=ie.now()}function q(e,t){var n,r={height:e},i=0;for(t=t?1:0;i<4;i+=2-t)n=Se[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function M(e,t,n){for(var r,i=(bt[t]||[]).concat(bt["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function O(e,t,n){var r,i,o,a,s,l,u,c,f=this,d={},p=e.style,h=e.nodeType&&Ae(e),m=ie._data(e,"fxshow");n.queue||(s=ie._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,f.always(function(){f.always(function(){s.unqueued--,ie.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],u=ie.css(e,"display"),c="none"===u?ie._data(e,"olddisplay")||E(e.nodeName):u,"inline"===c&&"none"===ie.css(e,"float")&&(ne.inlineBlockNeedsLayout&&"inline"!==E(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",ne.shrinkWrapBlocks()||f.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],mt.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!m||void 0===m[r])continue;h=!0}d[r]=m&&m[r]||ie.style(e,r)}else u=void 0;if(ie.isEmptyObject(d))"inline"===("none"===u?E(e.nodeName):u)&&(p.display=u);else{m?"hidden"in m&&(h=m.hidden):m=ie._data(e,"fxshow",{}),o&&(m.hidden=!h),h?ie(e).show():f.done(function(){ie(e).hide()}),f.done(function(){var t;ie._removeData(e,"fxshow");for(t in d)ie.style(e,t,d[t])});for(r in d)a=M(h?m[r]:0,r,f),r in m||(m[r]=a.start,h&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function F(e,t){var n,r,i,o,a;for(n in e)if(r=ie.camelCase(n),i=t[r],o=e[n],ie.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=ie.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function B(e,t,n){var r,i,o=0,a=vt.length,s=ie.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;for(var t=pt||_(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;a<l;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),o<1&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:ie.extend({},t),opts:ie.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:pt||_(),duration:n.duration,tweens:[],createTween:function(t,n){var r=ie.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(F(c,u.opts.specialEasing);o<a;o++)if(r=vt[o].call(u,e,c,u.opts))return r;return ie.map(c,M,u),ie.isFunction(u.opts.start)&&u.opts.start.call(e,u),ie.fx.timer(ie.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function P(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(be)||[];if(ie.isFunction(n))for(;r=o[i++];)"+"===r.charAt(0)?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function R(e,t,n,r){function i(s){var l;return o[s]=!0,ie.each(e[s]||[],function(e,s){var u=s(t,n,r);return"string"!=typeof u||a||o[u]?a?!(l=u):void 0:(t.dataTypes.unshift(u),i(u),!1)}),l}var o={},a=e===zt;return i(t.dataTypes[0])||!o["*"]&&i("*")}function W(e,t){var n,r,i=ie.ajaxSettings.flatOptions||{};for(r in t)void 0!==t[r]&&((i[r]?e:n||(n={}))[r]=t[r]);return n&&ie.extend(!0,e,n),e}function $(e,t,n){for(var r,i,o,a,s=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"));if(i)for(a in s)if(s[a]&&s[a].test(i)){l.unshift(a);break}if(l[0]in n)o=l[0];else{for(a in n){if(!l[0]||e.converters[a+" "+l[0]]){o=a;break}r||(r=a)}o=o||r}if(o)return o!==l[0]&&l.unshift(o),n[o]}function z(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e.throws)t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}function I(e,t,n,r){var i;if(ie.isArray(t))ie.each(t,function(t,i){n||Ut.test(e)?r(e,i):I(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==ie.type(t))r(e,t);else for(i in t)I(e+"["+i+"]",t[i],n,r)}function X(){try{return new e.XMLHttpRequest}catch(e){}}function U(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}function V(e){return ie.isWindow(e)?e:9===e.nodeType&&(e.defaultView||e.parentWindow)}var J=[],Y=J.slice,G=J.concat,Q=J.push,K=J.indexOf,Z={},ee=Z.toString,te=Z.hasOwnProperty,ne={},re="1.11.1",ie=function(e,t){return new ie.fn.init(e,t)},oe=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ae=/^-ms-/,se=/-([\da-z])/gi,le=function(e,t){return t.toUpperCase()};ie.fn=ie.prototype={jquery:re,constructor:ie,selector:"",length:0,toArray:function(){return Y.call(this)},get:function(e){return null!=e?e<0?this[e+this.length]:this[e]:Y.call(this)},pushStack:function(e){var t=ie.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return ie.each(this,e,t)},map:function(e){return this.pushStack(ie.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(Y.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:Q,sort:J.sort,splice:J.splice},ie.extend=ie.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof a&&(u=a,a=arguments[s]||{},s++),"object"==typeof a||ie.isFunction(a)||(a={}),s===l&&(a=this,s--);s<l;s++)if(null!=(i=arguments[s]))for(r in i)e=a[r],n=i[r],a!==n&&(u&&n&&(ie.isPlainObject(n)||(t=ie.isArray(n)))?(t?(t=!1,o=e&&ie.isArray(e)?e:[]):o=e&&ie.isPlainObject(e)?e:{},a[r]=ie.extend(u,o,n)):void 0!==n&&(a[r]=n));return a},ie.extend({expando:"jQuery"+(re+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===ie.type(e)},isArray:Array.isArray||function(e){return"array"===ie.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!ie.isArray(e)&&e-parseFloat(e)>=0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isPlainObject:function(e){var t;if(!e||"object"!==ie.type(e)||e.nodeType||ie.isWindow(e))return!1;try{if(e.constructor&&!te.call(e,"constructor")&&!te.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(e){return!1}if(ne.ownLast)for(t in e)return te.call(e,t);for(t in e);return void 0===t||te.call(e,t)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?Z[ee.call(e)]||"object":typeof e},globalEval:function(t){t&&ie.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(ae,"ms-").replace(se,le)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;o<a&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;o<a&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(oe,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?ie.merge(r,"string"==typeof e?[e]:e):Q.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(K)return K.call(t,e,n);for(r=t.length,n=n?n<0?Math.max(0,r+n):n:0;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;)e[i++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[i++]=t[r++];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),l=[];if(s)for(;o<a;o++)i=t(e[o],o,r),null!=i&&l.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&l.push(i);return G.apply([],l)},guid:1,proxy:function(e,t){var n,r,i;if("string"==typeof t&&(i=e[t],t=e,e=i),ie.isFunction(e))return n=Y.call(arguments,2),r=function(){return e.apply(t||this,n.concat(Y.call(arguments)))},r.guid=e.guid=e.guid||ie.guid++,r},now:function(){return+new Date},support:ne}),ie.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){Z["[object "+t+"]"]=t.toLowerCase()});var ue=function(e){function t(e,t,n,r){var i,o,a,s,l,u,f,p,h,m;if((t?t.ownerDocument||t:R)!==H&&L(t),t=t||H,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(q&&!r){if(i=ve.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&B(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((a=i[3])&&w.getElementsByClassName&&t.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(a)),n}if(w.qsa&&(!M||!M.test(e))){if(p=f=P,h=t,m=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(u=E(e),(f=t.getAttribute("id"))?p=f.replace(xe,"\\$&"):t.setAttribute("id",p),p="[id='"+p+"'] ",l=u.length;l--;)u[l]=p+d(u[l]);h=be.test(e)&&c(t.parentNode)||t,m=u.join(",")}if(m)try{return Z.apply(n,h.querySelectorAll(m)),n}catch(e){}finally{f||t.removeAttribute("id")}}}return S(e.replace(le,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>T.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[P]=!0,e}function i(e){var t=H.createElement("div");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)T.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||J)-(~e.sourceIndex||J);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function u(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function c(e){return e&&typeof e.getElementsByTagName!==V&&e}function f(){}function d(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function p(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=$++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,l,u=[W,o];if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(l=t[P]||(t[P]={}),(s=l[r])&&s[0]===W&&s[1]===o)return u[2]=s[2];if(l[r]=u,u[2]=e(t,n,a))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,n,r){for(var i=0,o=n.length;i<o;i++)t(e,n[i],r);return r}function g(e,t,n,r,i){for(var o,a=[],s=0,l=e.length,u=null!=t;s<l;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),u&&t.push(s)));return a}function y(e,t,n,i,o,a){return i&&!i[P]&&(i=y(i)),o&&!o[P]&&(o=y(o,a)),r(function(r,a,s,l){var u,c,f,d=[],p=[],h=a.length,y=r||m(t||"*",s.nodeType?[s]:s,[]),v=!e||!r&&t?y:g(y,d,e,s,l),b=n?o||(r?e:h||i)?[]:a:v;if(n&&n(v,b,s,l),i)for(u=g(b,p),i(u,[],s,l),c=u.length;c--;)(f=u[c])&&(b[p[c]]=!(v[p[c]]=f));if(r){if(o||e){if(o){for(u=[],c=b.length;c--;)(f=b[c])&&u.push(v[c]=f);o(null,b=[],u,l)}for(c=b.length;c--;)(f=b[c])&&(u=o?te.call(r,f):d[c])>-1&&(r[u]=!(a[u]=f))}}else b=g(b===a?b.splice(h,b.length):b),o?o(null,a,b,l):Z.apply(a,b)})}function v(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],a=o||T.relative[" "],s=o?1:0,l=p(function(e){return e===t},a,!0),u=p(function(e){return te.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==A)||((t=n).nodeType?l(e,n,r):u(e,n,r))}];s<i;s++)if(n=T.relative[e[s].type])c=[p(h(c),n)];else{if(n=T.filter[e[s].type].apply(null,e[s].matches),n[P]){for(r=++s;r<i&&!T.relative[e[r].type];r++);return y(s>1&&h(c),s>1&&d(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(le,"$1"),n,s<r&&v(e.slice(s,r)),r<i&&v(e=e.slice(r)),r<i&&d(e))}c.push(n)}return h(c)}function b(e,n){var i=n.length>0,o=e.length>0,a=function(r,a,s,l,u){var c,f,d,p=0,h="0",m=r&&[],y=[],v=A,b=r||o&&T.find.TAG("*",u),x=W+=null==v?1:Math.random()||.1,w=b.length;for(u&&(A=a!==H&&a);h!==w&&null!=(c=b[h]);h++){if(o&&c){for(f=0;d=e[f++];)if(d(c,a,s)){l.push(c);break}u&&(W=x)}i&&((c=!d&&c)&&p--,r&&m.push(c))}if(p+=h,i&&h!==p){for(f=0;d=n[f++];)d(m,y,a,s);if(r){if(p>0)for(;h--;)m[h]||y[h]||(y[h]=Q.call(l));y=g(y)}Z.apply(l,y),u&&!r&&y.length>0&&p+n.length>1&&t.uniqueSort(l)}return u&&(W=x,A=v),m};return i?r(a):a}var x,w,T,C,N,E,k,S,A,D,j,L,H,_,q,M,O,F,B,P="sizzle"+-new Date,R=e.document,W=0,$=0,z=n(),I=n(),X=n(),U=function(e,t){return e===t&&(j=!0),0},V="undefined",J=1<<31,Y={}.hasOwnProperty,G=[],Q=G.pop,K=G.push,Z=G.push,ee=G.slice,te=G.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1},ne="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",re="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe=ie.replace("w","w#"),ae="\\["+re+"*("+ie+")(?:"+re+"*([*^$|!~]?=)"+re+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+oe+"))|)"+re+"*\\]",se=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ae+")*)|.*)\\)|)",le=new RegExp("^"+re+"+|((?:^|[^\\\\])(?:\\\\.)*)"+re+"+$","g"),ue=new RegExp("^"+re+"*,"+re+"*"),ce=new RegExp("^"+re+"*([>+~]|"+re+")"+re+"*"),fe=new RegExp("="+re+"*([^\\]'\"]*?)"+re+"*\\]","g"),de=new RegExp(se),pe=new RegExp("^"+oe+"$"),he={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie.replace("w","w*")+")"),ATTR:new RegExp("^"+ae),PSEUDO:new RegExp("^"+se),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+re+"*(even|odd|(([+-]|)(\\d*)n|)"+re+"*(?:([+-]|)"+re+"*(\\d+)|))"+re+"*\\)|)","i"),bool:new RegExp("^(?:"+ne+")$","i"),needsContext:new RegExp("^"+re+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+re+"*((?:-\\d)?\\d*)"+re+"*\\)|)(?=[^-]|$)","i")},me=/^(?:input|select|textarea|button)$/i,ge=/^h\d$/i,ye=/^[^{]+\{\s*\[native \w/,ve=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,be=/[+~]/,xe=/'|\\/g,we=new RegExp("\\\\([\\da-f]{1,6}"+re+"?|("+re+")|.)","ig"),Te=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{Z.apply(G=ee.call(R.childNodes),R.childNodes),G[R.childNodes.length].nodeType}catch(e){Z={apply:G.length?function(e,t){K.apply(e,ee.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}w=t.support={},N=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},L=t.setDocument=function(e){var t,n=e?e.ownerDocument||e:R,r=n.defaultView;return n!==H&&9===n.nodeType&&n.documentElement?(H=n,_=n.documentElement,q=!N(n),r&&r!==r.top&&(r.addEventListener?r.addEventListener("unload",function(){L()},!1):r.attachEvent&&r.attachEvent("onunload",function(){L()})),w.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=i(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=ye.test(n.getElementsByClassName)&&i(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),w.getById=i(function(e){return _.appendChild(e).id=P,!n.getElementsByName||!n.getElementsByName(P).length}),w.getById?(T.find.ID=function(e,t){if(typeof t.getElementById!==V&&q){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},T.filter.ID=function(e){var t=e.replace(we,Te);return function(e){return e.getAttribute("id")===t}}):(delete T.find.ID,T.filter.ID=function(e){var t=e.replace(we,Te);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),T.find.TAG=w.getElementsByTagName?function(e,t){if(typeof t.getElementsByTagName!==V)return t.getElementsByTagName(e)}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=w.getElementsByClassName&&function(e,t){if(typeof t.getElementsByClassName!==V&&q)return t.getElementsByClassName(e)},O=[],M=[],(w.qsa=ye.test(n.querySelectorAll))&&(i(function(e){e.innerHTML="<select msallowclip=''><option selected=''></option></select>",e.querySelectorAll("[msallowclip^='']").length&&M.push("[*^$]="+re+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||M.push("\\["+re+"*(?:value|"+ne+")"),e.querySelectorAll(":checked").length||M.push(":checked")}),i(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&M.push("name"+re+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||M.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),M.push(",.*:")})),(w.matchesSelector=ye.test(F=_.matches||_.webkitMatchesSelector||_.mozMatchesSelector||_.oMatchesSelector||_.msMatchesSelector))&&i(function(e){w.disconnectedMatch=F.call(e,"div"),F.call(e,"[s!='']:x"),O.push("!=",se)}),M=M.length&&new RegExp(M.join("|")),O=O.length&&new RegExp(O.join("|")),t=ye.test(_.compareDocumentPosition),B=t||ye.test(_.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return j=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r?r:(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&r||!w.sortDetached&&t.compareDocumentPosition(e)===r?e===n||e.ownerDocument===R&&B(R,e)?-1:t===n||t.ownerDocument===R&&B(R,t)?1:D?te.call(D,e)-te.call(D,t):0:4&r?-1:1)}:function(e,t){if(e===t)return j=!0,0;var r,i=0,o=e.parentNode,s=t.parentNode,l=[e],u=[t];if(!o||!s)return e===n?-1:t===n?1:o?-1:s?1:D?te.call(D,e)-te.call(D,t):0;if(o===s)return a(e,t);for(r=e;r=r.parentNode;)l.unshift(r);for(r=t;r=r.parentNode;)u.unshift(r);for(;l[i]===u[i];)i++;return i?a(l[i],u[i]):l[i]===R?-1:u[i]===R?1:0},n):H},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==H&&L(e),n=n.replace(fe,"='$1']"),w.matchesSelector&&q&&(!O||!O.test(n))&&(!M||!M.test(n)))try{var r=F.call(e,n);if(r||w.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return t(n,H,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==H&&L(e),B(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==H&&L(e);var n=T.attrHandle[t.toLowerCase()],r=n&&Y.call(T.attrHandle,t.toLowerCase())?n(e,t,!q):void 0;return void 0!==r?r:w.attributes||!q?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(j=!w.detectDuplicates,D=!w.sortStable&&e.slice(0),e.sort(U),j){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return D=null,e},C=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=C(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=C(t);return n},T=t.selectors={cacheLength:50,createPseudo:r,match:he,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(we,Te),e[3]=(e[3]||e[4]||e[5]||"").replace(we,Te),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&de.test(n)&&(t=E(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(we,Te).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=z[e+" "];return t||(t=new RegExp("(^|"+re+")"+e+"("+re+"|$)"))&&z(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,f,d,p,h,m=o!==a?"nextSibling":"previousSibling",g=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(g){if(o){for(;m;){for(f=t;f=f[m];)if(s?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;h=m="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?g.firstChild:g.lastChild],a&&v){for(c=g[P]||(g[P]={}),u=c[e]||[],p=u[0]===W&&u[1],d=u[0]===W&&u[2],f=p&&g.childNodes[p];f=++p&&f&&f[m]||(d=p=0)||h.pop();)if(1===f.nodeType&&++d&&f===t){c[e]=[W,p,d];break}}else if(v&&(u=(t[P]||(t[P]={}))[e])&&u[0]===W)d=u[1];else for(;(f=++p&&f&&f[m]||(d=p=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++d||(v&&((f[P]||(f[P]={}))[e]=[W,d]),f!==t)););return d-=i,d===r||d%r===0&&d/r>=0}}},PSEUDO:function(e,n){var i,o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[P]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=te.call(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=k(e.replace(le,"$1"));return i[P]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return function(t){return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),lang:r(function(e){return pe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(we,Te).toLowerCase(),function(t){var n;do if(n=q?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===_},focus:function(e){return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},header:function(e){return ge.test(e.nodeName)},input:function(e){return me.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:u(function(){return[0]}),last:u(function(e,t){return[t-1]}),eq:u(function(e,t,n){return[n<0?n+t:n]}),even:u(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:u(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:u(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:u(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[x]=s(x);for(x in{submit:!0,reset:!0})T.pseudos[x]=l(x);return f.prototype=T.filters=T.pseudos,T.setFilters=new f,E=t.tokenize=function(e,n){var r,i,o,a,s,l,u,c=I[e+" "];if(c)return n?0:c.slice(0);for(s=e,l=[],u=T.preFilter;s;){r&&!(i=ue.exec(s))||(i&&(s=s.slice(i[0].length)||s),l.push(o=[])),r=!1,(i=ce.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(le," ")}),s=s.slice(r.length));for(a in T.filter)!(i=he[a].exec(s))||u[a]&&!(i=u[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));
	if(!r)break}return n?s.length:s?t.error(e):I(e,l).slice(0)},k=t.compile=function(e,t){var n,r=[],i=[],o=X[e+" "];if(!o){for(t||(t=E(e)),n=t.length;n--;)o=v(t[n]),o[P]?r.push(o):i.push(o);o=X(e,b(i,r)),o.selector=e}return o},S=t.select=function(e,t,n,r){var i,o,a,s,l,u="function"==typeof e&&e,f=!r&&E(e=u.selector||e);if(n=n||[],1===f.length){if(o=f[0]=f[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&w.getById&&9===t.nodeType&&q&&T.relative[o[1].type]){if(t=(T.find.ID(a.matches[0].replace(we,Te),t)||[])[0],!t)return n;u&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=he.needsContext.test(e)?0:o.length;i--&&(a=o[i],!T.relative[s=a.type]);)if((l=T.find[s])&&(r=l(a.matches[0].replace(we,Te),be.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&d(o),!e)return Z.apply(n,r),n;break}}return(u||k(e,f))(r,t,!q,n,be.test(e)&&c(t.parentNode)||t),n},w.sortStable=P.split("").sort(U).join("")===P,w.detectDuplicates=!!j,L(),w.sortDetached=i(function(e){return 1&e.compareDocumentPosition(H.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(ne,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);ie.find=ue,ie.expr=ue.selectors,ie.expr[":"]=ie.expr.pseudos,ie.unique=ue.uniqueSort,ie.text=ue.getText,ie.isXMLDoc=ue.isXML,ie.contains=ue.contains;var ce=ie.expr.match.needsContext,fe=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,de=/^.[^:#\[\.,]*$/;ie.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ie.find.matchesSelector(r,e)?[r]:[]:ie.find.matches(e,ie.grep(t,function(e){return 1===e.nodeType}))},ie.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(ie(e).filter(function(){for(t=0;t<i;t++)if(ie.contains(r[t],this))return!0}));for(t=0;t<i;t++)ie.find(e,r[t],n);return n=this.pushStack(i>1?ie.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&ce.test(e)?ie(e):e||[],!1).length}});var pe,he=e.document,me=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ge=ie.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:me.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||pe).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof ie?t[0]:t,ie.merge(this,ie.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:he,!0)),fe.test(n[1])&&ie.isPlainObject(t))for(n in t)ie.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}if(r=he.getElementById(n[2]),r&&r.parentNode){if(r.id!==n[2])return pe.find(e);this.length=1,this[0]=r}return this.context=he,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):ie.isFunction(e)?"undefined"!=typeof pe.ready?pe.ready(e):e(ie):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),ie.makeArray(e,this))};ge.prototype=ie.fn,pe=ie(he);var ye=/^(?:parents|prev(?:Until|All))/,ve={children:!0,contents:!0,next:!0,prev:!0};ie.extend({dir:function(e,t,n){for(var r=[],i=e[t];i&&9!==i.nodeType&&(void 0===n||1!==i.nodeType||!ie(i).is(n));)1===i.nodeType&&r.push(i),i=i[t];return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),ie.fn.extend({has:function(e){var t,n=ie(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(ie.contains(this,n[t]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=ce.test(e)||"string"!=typeof e?ie(e,t||this.context):0;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&ie.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?ie.unique(o):o)},index:function(e){return e?"string"==typeof e?ie.inArray(this[0],ie(e)):ie.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ie.unique(ie.merge(this.get(),ie(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ie.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return ie.dir(e,"parentNode")},parentsUntil:function(e,t,n){return ie.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return ie.dir(e,"nextSibling")},prevAll:function(e){return ie.dir(e,"previousSibling")},nextUntil:function(e,t,n){return ie.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return ie.dir(e,"previousSibling",n)},siblings:function(e){return ie.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return ie.sibling(e.firstChild)},contents:function(e){return ie.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:ie.merge([],e.childNodes)}},function(e,t){ie.fn[e]=function(n,r){var i=ie.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=ie.filter(r,i)),this.length>1&&(ve[e]||(i=ie.unique(i)),ye.test(e)&&(i=i.reverse())),this.pushStack(i)}});var be=/\S+/g,xe={};ie.Callbacks=function(e){e="string"==typeof e?xe[e]||o(e):ie.extend({},e);var t,n,r,i,a,s,l=[],u=!e.once&&[],c=function(o){for(n=e.memory&&o,r=!0,a=s||0,s=0,i=l.length,t=!0;l&&a<i;a++)if(l[a].apply(o[0],o[1])===!1&&e.stopOnFalse){n=!1;break}t=!1,l&&(u?u.length&&c(u.shift()):n?l=[]:f.disable())},f={add:function(){if(l){var r=l.length;!function t(n){ie.each(n,function(n,r){var i=ie.type(r);"function"===i?e.unique&&f.has(r)||l.push(r):r&&r.length&&"string"!==i&&t(r)})}(arguments),t?i=l.length:n&&(s=r,c(n))}return this},remove:function(){return l&&ie.each(arguments,function(e,n){for(var r;(r=ie.inArray(n,l,r))>-1;)l.splice(r,1),t&&(r<=i&&i--,r<=a&&a--)}),this},has:function(e){return e?ie.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],i=0,this},disable:function(){return l=u=n=void 0,this},disabled:function(){return!l},lock:function(){return u=void 0,n||f.disable(),this},locked:function(){return!u},fireWith:function(e,n){return!l||r&&!u||(n=n||[],n=[e,n.slice?n.slice():n],t?u.push(n):c(n)),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!r}};return f},ie.extend({Deferred:function(e){var t=[["resolve","done",ie.Callbacks("once memory"),"resolved"],["reject","fail",ie.Callbacks("once memory"),"rejected"],["notify","progress",ie.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return ie.Deferred(function(n){ie.each(t,function(t,o){var a=ie.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&ie.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?ie.extend(e,r):r}},i={};return r.pipe=r.then,ie.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=Y.call(arguments),a=o.length,s=1!==a||e&&ie.isFunction(e.promise)?a:0,l=1===s?e:ie.Deferred(),u=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?Y.call(arguments):i,r===t?l.notifyWith(n,r):--s||l.resolveWith(n,r)}};if(a>1)for(t=new Array(a),n=new Array(a),r=new Array(a);i<a;i++)o[i]&&ie.isFunction(o[i].promise)?o[i].promise().done(u(i,r,o)).fail(l.reject).progress(u(i,n,t)):--s;return s||l.resolveWith(r,o),l.promise()}});var we;ie.fn.ready=function(e){return ie.ready.promise().done(e),this},ie.extend({isReady:!1,readyWait:1,holdReady:function(e){e?ie.readyWait++:ie.ready(!0)},ready:function(e){if(e===!0?!--ie.readyWait:!ie.isReady){if(!he.body)return setTimeout(ie.ready);ie.isReady=!0,e!==!0&&--ie.readyWait>0||(we.resolveWith(he,[ie]),ie.fn.triggerHandler&&(ie(he).triggerHandler("ready"),ie(he).off("ready")))}}}),ie.ready.promise=function(t){if(!we)if(we=ie.Deferred(),"complete"===he.readyState)setTimeout(ie.ready);else if(he.addEventListener)he.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1);else{he.attachEvent("onreadystatechange",s),e.attachEvent("onload",s);var n=!1;try{n=null==e.frameElement&&he.documentElement}catch(e){}n&&n.doScroll&&!function e(){if(!ie.isReady){try{n.doScroll("left")}catch(t){return setTimeout(e,50)}a(),ie.ready()}}()}return we.promise(t)};var Te,Ce="undefined";for(Te in ie(ne))break;ne.ownLast="0"!==Te,ne.inlineBlockNeedsLayout=!1,ie(function(){var e,t,n,r;n=he.getElementsByTagName("body")[0],n&&n.style&&(t=he.createElement("div"),r=he.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),typeof t.style.zoom!==Ce&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ne.inlineBlockNeedsLayout=e=3===t.offsetWidth,e&&(n.style.zoom=1)),n.removeChild(r))}),function(){var e=he.createElement("div");if(null==ne.deleteExpando){ne.deleteExpando=!0;try{delete e.test}catch(e){ne.deleteExpando=!1}}e=null}(),ie.acceptData=function(e){var t=ie.noData[(e.nodeName+" ").toLowerCase()],n=+e.nodeType||1;return(1===n||9===n)&&(!t||t!==!0&&e.getAttribute("classid")===t)};var Ne=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Ee=/([A-Z])/g;ie.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?ie.cache[e[ie.expando]]:e[ie.expando],!!e&&!u(e)},data:function(e,t,n){return c(e,t,n)},removeData:function(e,t){return f(e,t)},_data:function(e,t,n){return c(e,t,n,!0)},_removeData:function(e,t){return f(e,t,!0)}}),ie.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=ie.data(o),1===o.nodeType&&!ie._data(o,"parsedAttrs"))){for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=ie.camelCase(r.slice(5)),l(o,r,i[r])));ie._data(o,"parsedAttrs",!0)}return i}return"object"==typeof e?this.each(function(){ie.data(this,e)}):arguments.length>1?this.each(function(){ie.data(this,e,t)}):o?l(o,e,ie.data(o,e)):void 0},removeData:function(e){return this.each(function(){ie.removeData(this,e)})}}),ie.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=ie._data(e,t),n&&(!r||ie.isArray(n)?r=ie._data(e,t,ie.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ie.queue(e,t),r=n.length,i=n.shift(),o=ie._queueHooks(e,t),a=function(){ie.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return ie._data(e,n)||ie._data(e,n,{empty:ie.Callbacks("once memory").add(function(){ie._removeData(e,t+"queue"),ie._removeData(e,n)})})}}),ie.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?ie.queue(this[0],e):void 0===t?this:this.each(function(){var n=ie.queue(this,e,t);ie._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&ie.dequeue(this,e)})},dequeue:function(e){return this.each(function(){ie.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=ie.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=ie._data(o[a],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ke=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Se=["Top","Right","Bottom","Left"],Ae=function(e,t){return e=t||e,"none"===ie.css(e,"display")||!ie.contains(e.ownerDocument,e)},De=ie.access=function(e,t,n,r,i,o,a){var s=0,l=e.length,u=null==n;if("object"===ie.type(n)){i=!0;for(s in n)ie.access(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,ie.isFunction(r)||(a=!0),u&&(a?(t.call(e,r),t=null):(u=t,t=function(e,t,n){return u.call(ie(e),n)})),t))for(;s<l;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:u?t.call(e):l?t(e[0],n):o},je=/^(?:checkbox|radio)$/i;!function(){var e=he.createElement("input"),t=he.createElement("div"),n=he.createDocumentFragment();if(t.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",ne.leadingWhitespace=3===t.firstChild.nodeType,ne.tbody=!t.getElementsByTagName("tbody").length,ne.htmlSerialize=!!t.getElementsByTagName("link").length,ne.html5Clone="<:nav></:nav>"!==he.createElement("nav").cloneNode(!0).outerHTML,e.type="checkbox",e.checked=!0,n.appendChild(e),ne.appendChecked=e.checked,t.innerHTML="<textarea>x</textarea>",ne.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue,n.appendChild(t),t.innerHTML="<input type='radio' checked='checked' name='t'/>",ne.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,ne.noCloneEvent=!0,t.attachEvent&&(t.attachEvent("onclick",function(){ne.noCloneEvent=!1}),t.cloneNode(!0).click()),null==ne.deleteExpando){ne.deleteExpando=!0;try{delete t.test}catch(e){ne.deleteExpando=!1}}}(),function(){var t,n,r=he.createElement("div");for(t in{submit:!0,change:!0,focusin:!0})n="on"+t,(ne[t+"Bubbles"]=n in e)||(r.setAttribute(n,"t"),ne[t+"Bubbles"]=r.attributes[n].expando===!1);r=null}();var Le=/^(?:input|select|textarea)$/i,He=/^key/,_e=/^(?:mouse|pointer|contextmenu)|click/,qe=/^(?:focusinfocus|focusoutblur)$/,Me=/^([^.]*)(?:\.(.+)|)$/;ie.event={global:{},add:function(e,t,n,r,i){var o,a,s,l,u,c,f,d,p,h,m,g=ie._data(e);if(g){for(n.handler&&(l=n,n=l.handler,i=l.selector),n.guid||(n.guid=ie.guid++),(a=g.events)||(a=g.events={}),(c=g.handle)||(c=g.handle=function(e){return typeof ie===Ce||e&&ie.event.triggered===e.type?void 0:ie.event.dispatch.apply(c.elem,arguments)},c.elem=e),t=(t||"").match(be)||[""],s=t.length;s--;)o=Me.exec(t[s])||[],p=m=o[1],h=(o[2]||"").split(".").sort(),p&&(u=ie.event.special[p]||{},p=(i?u.delegateType:u.bindType)||p,u=ie.event.special[p]||{},f=ie.extend({type:p,origType:m,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ie.expr.match.needsContext.test(i),namespace:h.join(".")},l),(d=a[p])||(d=a[p]=[],d.delegateCount=0,u.setup&&u.setup.call(e,r,h,c)!==!1||(e.addEventListener?e.addEventListener(p,c,!1):e.attachEvent&&e.attachEvent("on"+p,c))),u.add&&(u.add.call(e,f),f.handler.guid||(f.handler.guid=n.guid)),i?d.splice(d.delegateCount++,0,f):d.push(f),ie.event.global[p]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,f,d,p,h,m,g=ie.hasData(e)&&ie._data(e);if(g&&(c=g.events)){for(t=(t||"").match(be)||[""],u=t.length;u--;)if(s=Me.exec(t[u])||[],p=m=s[1],h=(s[2]||"").split(".").sort(),p){for(f=ie.event.special[p]||{},p=(r?f.delegateType:f.bindType)||p,d=c[p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=d.length;o--;)a=d[o],!i&&m!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(d.splice(o,1),a.selector&&d.delegateCount--,f.remove&&f.remove.call(e,a));l&&!d.length&&(f.teardown&&f.teardown.call(e,h,g.handle)!==!1||ie.removeEvent(e,p,g.handle),delete c[p])}else for(p in c)ie.event.remove(e,p+t[u],n,r,!0);ie.isEmptyObject(c)&&(delete g.handle,ie._removeData(e,"events"))}},trigger:function(t,n,r,i){var o,a,s,l,u,c,f,d=[r||he],p=te.call(t,"type")?t.type:t,h=te.call(t,"namespace")?t.namespace.split("."):[];if(s=c=r=r||he,3!==r.nodeType&&8!==r.nodeType&&!qe.test(p+ie.event.triggered)&&(p.indexOf(".")>=0&&(h=p.split("."),p=h.shift(),h.sort()),a=p.indexOf(":")<0&&"on"+p,t=t[ie.expando]?t:new ie.Event(p,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:ie.makeArray(n,[t]),u=ie.event.special[p]||{},i||!u.trigger||u.trigger.apply(r,n)!==!1)){if(!i&&!u.noBubble&&!ie.isWindow(r)){for(l=u.delegateType||p,qe.test(l+p)||(s=s.parentNode);s;s=s.parentNode)d.push(s),c=s;c===(r.ownerDocument||he)&&d.push(c.defaultView||c.parentWindow||e)}for(f=0;(s=d[f++])&&!t.isPropagationStopped();)t.type=f>1?l:u.bindType||p,o=(ie._data(s,"events")||{})[t.type]&&ie._data(s,"handle"),o&&o.apply(s,n),o=a&&s[a],o&&o.apply&&ie.acceptData(s)&&(t.result=o.apply(s,n),t.result===!1&&t.preventDefault());if(t.type=p,!i&&!t.isDefaultPrevented()&&(!u._default||u._default.apply(d.pop(),n)===!1)&&ie.acceptData(r)&&a&&r[p]&&!ie.isWindow(r)){c=r[a],c&&(r[a]=null),ie.event.triggered=p;try{r[p]()}catch(e){}ie.event.triggered=void 0,c&&(r[a]=c)}return t.result}},dispatch:function(e){e=ie.event.fix(e);var t,n,r,i,o,a=[],s=Y.call(arguments),l=(ie._data(this,"events")||{})[e.type]||[],u=ie.event.special[e.type]||{};if(s[0]=e,e.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,e)!==!1){for(a=ie.event.handlers.call(this,e,l),t=0;(i=a[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,o=0;(r=i.handlers[o++])&&!e.isImmediatePropagationStopped();)e.namespace_re&&!e.namespace_re.test(r.namespace)||(e.handleObj=r,e.data=r.data,n=((ie.event.special[r.origType]||{}).handle||r.handler).apply(i.elem,s),void 0!==n&&(e.result=n)===!1&&(e.preventDefault(),e.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,a=[],s=t.delegateCount,l=e.target;if(s&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(i=[],o=0;o<s;o++)r=t[o],n=r.selector+" ",void 0===i[n]&&(i[n]=r.needsContext?ie(n,this).index(l)>=0:ie.find(n,this,null,[l]).length),i[n]&&i.push(r);i.length&&a.push({elem:l,handlers:i})}return s<t.length&&a.push({elem:this,handlers:t.slice(s)}),a},fix:function(e){if(e[ie.expando])return e;var t,n,r,i=e.type,o=e,a=this.fixHooks[i];for(a||(this.fixHooks[i]=a=_e.test(i)?this.mouseHooks:He.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new ie.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||he),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,a.filter?a.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button,a=t.fromElement;return null==e.pageX&&null!=t.clientX&&(r=e.target.ownerDocument||he,i=r.documentElement,n=r.body,e.pageX=t.clientX+(i&&i.scrollLeft||n&&n.scrollLeft||0)-(i&&i.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(i&&i.scrollTop||n&&n.scrollTop||0)-(i&&i.clientTop||n&&n.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?t.toElement:a),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==h()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){if(this===h()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if(ie.nodeName(this,"input")&&"checkbox"===this.type&&this.click)return this.click(),!1},_default:function(e){return ie.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=ie.extend(new ie.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?ie.event.trigger(i,null,t):ie.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},ie.removeEvent=he.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===Ce&&(e[r]=null),e.detachEvent(r,n))},ie.Event=function(e,t){return this instanceof ie.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?d:p):this.type=e,t&&ie.extend(this,t),this.timeStamp=e&&e.timeStamp||ie.now(),void(this[ie.expando]=!0)):new ie.Event(e,t)},ie.Event.prototype={isDefaultPrevented:p,isPropagationStopped:p,isImmediatePropagationStopped:p,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=d,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=d,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=d,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},ie.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){ie.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||ie.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),ne.submitBubbles||(ie.event.special.submit={setup:function(){return!ie.nodeName(this,"form")&&void ie.event.add(this,"click._submit keypress._submit",function(e){var t=e.target,n=ie.nodeName(t,"input")||ie.nodeName(t,"button")?t.form:void 0;n&&!ie._data(n,"submitBubbles")&&(ie.event.add(n,"submit._submit",function(e){e._submit_bubble=!0}),ie._data(n,"submitBubbles",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&ie.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return!ie.nodeName(this,"form")&&void ie.event.remove(this,"._submit")}}),ne.changeBubbles||(ie.event.special.change={setup:function(){return Le.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(ie.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),ie.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),ie.event.simulate("change",this,e,!0)})),!1):void ie.event.add(this,"beforeactivate._change",function(e){var t=e.target;Le.test(t.nodeName)&&!ie._data(t,"changeBubbles")&&(ie.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||ie.event.simulate("change",this.parentNode,e,!0)}),ie._data(t,"changeBubbles",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type)return e.handleObj.handler.apply(this,arguments)},teardown:function(){return ie.event.remove(this,"._change"),!Le.test(this.nodeName)}}),ne.focusinBubbles||ie.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){ie.event.simulate(t,e.target,ie.event.fix(e),!0)};ie.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=ie._data(r,t);i||r.addEventListener(e,n,!0),ie._data(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=ie._data(r,t)-1;i?ie._data(r,t,i):(r.removeEventListener(e,n,!0),ie._removeData(r,t))}}}),ie.fn.extend({on:function(e,t,n,r,i){var o,a;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(o in e)this.on(o,t,n,e[o],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=p;else if(!r)return this;return 1===i&&(a=r,r=function(e){return ie().off(e),a.apply(this,arguments)},r.guid=a.guid||(a.guid=ie.guid++)),this.each(function(){ie.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,ie(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=p),this.each(function(){ie.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){ie.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ie.event.trigger(e,t,n,!0)}});var Oe="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Fe=/ jQuery\d+="(?:null|\d+)"/g,Be=new RegExp("<(?:"+Oe+")[\\s/>]","i"),Pe=/^\s+/,Re=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,We=/<([\w:]+)/,$e=/<tbody/i,ze=/<|&#?\w+;/,Ie=/<(?:script|style|link)/i,Xe=/checked\s*(?:[^=]|=\s*.checked.)/i,Ue=/^$|\/(?:java|ecma)script/i,Ve=/^true\/(.*)/,Je=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ye={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ne.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Ge=m(he),Qe=Ge.appendChild(he.createElement("div"));Ye.optgroup=Ye.option,Ye.tbody=Ye.tfoot=Ye.colgroup=Ye.caption=Ye.thead,Ye.th=Ye.td,ie.extend({clone:function(e,t,n){var r,i,o,a,s,l=ie.contains(e.ownerDocument,e);if(ne.html5Clone||ie.isXMLDoc(e)||!Be.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Qe.innerHTML=e.outerHTML,Qe.removeChild(o=Qe.firstChild)),!(ne.noCloneEvent&&ne.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ie.isXMLDoc(e)))for(r=g(o),s=g(e),a=0;null!=(i=s[a]);++a)r[a]&&C(i,r[a]);if(t)if(n)for(s=s||g(e),r=r||g(o),a=0;null!=(i=s[a]);a++)T(i,r[a]);else T(e,o);return r=g(o,"script"),r.length>0&&w(r,!l&&g(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){for(var i,o,a,s,l,u,c,f=e.length,d=m(t),p=[],h=0;h<f;h++)if(o=e[h],o||0===o)if("object"===ie.type(o))ie.merge(p,o.nodeType?[o]:o);else if(ze.test(o)){for(s=s||d.appendChild(t.createElement("div")),l=(We.exec(o)||["",""])[1].toLowerCase(),c=Ye[l]||Ye._default,s.innerHTML=c[1]+o.replace(Re,"<$1></$2>")+c[2],i=c[0];i--;)s=s.lastChild;if(!ne.leadingWhitespace&&Pe.test(o)&&p.push(t.createTextNode(Pe.exec(o)[0])),!ne.tbody)for(o="table"!==l||$e.test(o)?"<table>"!==c[1]||$e.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;i--;)ie.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u);for(ie.merge(p,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=d.lastChild}else p.push(t.createTextNode(o));for(s&&d.removeChild(s),ne.appendChecked||ie.grep(g(p,"input"),y),h=0;o=p[h++];)if((!r||ie.inArray(o,r)===-1)&&(a=ie.contains(o.ownerDocument,o),s=g(d.appendChild(o),"script"),a&&w(s),n))for(i=0;o=s[i++];)Ue.test(o.type||"")&&n.push(o);return s=null,d},cleanData:function(e,t){for(var n,r,i,o,a=0,s=ie.expando,l=ie.cache,u=ne.deleteExpando,c=ie.event.special;null!=(n=e[a]);a++)if((t||ie.acceptData(n))&&(i=n[s],o=i&&l[i])){if(o.events)for(r in o.events)c[r]?ie.event.remove(n,r):ie.removeEvent(n,r,o.handle);l[i]&&(delete l[i],u?delete n[s]:typeof n.removeAttribute!==Ce?n.removeAttribute(s):n[s]=null,J.push(i))}}}),ie.fn.extend({text:function(e){return De(this,function(e){return void 0===e?ie.text(this):this.empty().append((this[0]&&this[0].ownerDocument||he).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=v(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=v(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?ie.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||ie.cleanData(g(n)),n.parentNode&&(t&&ie.contains(n.ownerDocument,n)&&w(g(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&ie.cleanData(g(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&ie.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ie.clone(this,e,t)})},html:function(e){return De(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e)return 1===t.nodeType?t.innerHTML.replace(Fe,""):void 0;if("string"==typeof e&&!Ie.test(e)&&(ne.htmlSerialize||!Be.test(e))&&(ne.leadingWhitespace||!Pe.test(e))&&!Ye[(We.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(Re,"<$1></$2>");try{for(;n<r;n++)t=this[n]||{},1===t.nodeType&&(ie.cleanData(g(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,ie.cleanData(g(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=G.apply([],e);var n,r,i,o,a,s,l=0,u=this.length,c=this,f=u-1,d=e[0],p=ie.isFunction(d);if(p||u>1&&"string"==typeof d&&!ne.checkClone&&Xe.test(d))return this.each(function(n){var r=c.eq(n);p&&(e[0]=d.call(this,n,r.html())),r.domManip(e,t)});if(u&&(s=ie.buildFragment(e,this[0].ownerDocument,!1,this),n=s.firstChild,1===s.childNodes.length&&(s=n),n)){for(o=ie.map(g(s,"script"),b),i=o.length;l<u;l++)r=s,l!==f&&(r=ie.clone(r,!0,!0),i&&ie.merge(o,g(r,"script"))),t.call(this[l],r,l);if(i)for(a=o[o.length-1].ownerDocument,ie.map(o,x),l=0;l<i;l++)r=o[l],Ue.test(r.type||"")&&!ie._data(r,"globalEval")&&ie.contains(a,r)&&(r.src?ie._evalUrl&&ie._evalUrl(r.src):ie.globalEval((r.text||r.textContent||r.innerHTML||"").replace(Je,"")));s=n=null}return this}}),ie.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){ie.fn[e]=function(e){for(var n,r=0,i=[],o=ie(e),a=o.length-1;r<=a;r++)n=r===a?this:this.clone(!0),ie(o[r])[t](n),Q.apply(i,n.get());return this.pushStack(i)}});var Ke,Ze={};!function(){var e;ne.shrinkWrapBlocks=function(){if(null!=e)return e;e=!1;var t,n,r;return n=he.getElementsByTagName("body")[0],n&&n.style?(t=he.createElement("div"),r=he.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),typeof t.style.zoom!==Ce&&(t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",t.appendChild(he.createElement("div")).style.width="5px",e=3!==t.offsetWidth),n.removeChild(r),e):void 0}}();var et,tt,nt=/^margin/,rt=new RegExp("^("+ke+")(?!px)[a-z%]+$","i"),it=/^(top|right|bottom|left)$/;e.getComputedStyle?(et=function(e){return e.ownerDocument.defaultView.getComputedStyle(e,null)},tt=function(e,t,n){var r,i,o,a,s=e.style;return n=n||et(e),a=n?n.getPropertyValue(t)||n[t]:void 0,n&&(""!==a||ie.contains(e.ownerDocument,e)||(a=ie.style(e,t)),rt.test(a)&&nt.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0===a?a:a+""}):he.documentElement.currentStyle&&(et=function(e){
	return e.currentStyle},tt=function(e,t,n){var r,i,o,a,s=e.style;return n=n||et(e),a=n?n[t]:void 0,null==a&&s&&s[t]&&(a=s[t]),rt.test(a)&&!it.test(t)&&(r=s.left,i=e.runtimeStyle,o=i&&i.left,o&&(i.left=e.currentStyle.left),s.left="fontSize"===t?"1em":a,a=s.pixelLeft+"px",s.left=r,o&&(i.left=o)),void 0===a?a:a+""||"auto"}),function(){function t(){var t,n,r,i;n=he.getElementsByTagName("body")[0],n&&n.style&&(t=he.createElement("div"),r=he.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),t.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",o=a=!1,l=!0,e.getComputedStyle&&(o="1%"!==(e.getComputedStyle(t,null)||{}).top,a="4px"===(e.getComputedStyle(t,null)||{width:"4px"}).width,i=t.appendChild(he.createElement("div")),i.style.cssText=t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",t.style.width="1px",l=!parseFloat((e.getComputedStyle(i,null)||{}).marginRight)),t.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=t.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",s=0===i[0].offsetHeight,s&&(i[0].style.display="",i[1].style.display="none",s=0===i[0].offsetHeight),n.removeChild(r))}var n,r,i,o,a,s,l;n=he.createElement("div"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",i=n.getElementsByTagName("a")[0],r=i&&i.style,r&&(r.cssText="float:left;opacity:.5",ne.opacity="0.5"===r.opacity,ne.cssFloat=!!r.cssFloat,n.style.backgroundClip="content-box",n.cloneNode(!0).style.backgroundClip="",ne.clearCloneStyle="content-box"===n.style.backgroundClip,ne.boxSizing=""===r.boxSizing||""===r.MozBoxSizing||""===r.WebkitBoxSizing,ie.extend(ne,{reliableHiddenOffsets:function(){return null==s&&t(),s},boxSizingReliable:function(){return null==a&&t(),a},pixelPosition:function(){return null==o&&t(),o},reliableMarginRight:function(){return null==l&&t(),l}}))}(),ie.swap=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};var ot=/alpha\([^)]*\)/i,at=/opacity\s*=\s*([^)]*)/,st=/^(none|table(?!-c[ea]).+)/,lt=new RegExp("^("+ke+")(.*)$","i"),ut=new RegExp("^([+-])=("+ke+")","i"),ct={position:"absolute",visibility:"hidden",display:"block"},ft={letterSpacing:"0",fontWeight:"400"},dt=["Webkit","O","Moz","ms"];ie.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=tt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:ne.cssFloat?"cssFloat":"styleFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=ie.camelCase(t),l=e.style;if(t=ie.cssProps[s]||(ie.cssProps[s]=S(l,s)),a=ie.cssHooks[t]||ie.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];if(o=typeof n,"string"===o&&(i=ut.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(ie.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||ie.cssNumber[s]||(n+="px"),ne.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),!(a&&"set"in a&&void 0===(n=a.set(e,n,r)))))try{l[t]=n}catch(e){}}},css:function(e,t,n,r){var i,o,a,s=ie.camelCase(t);return t=ie.cssProps[s]||(ie.cssProps[s]=S(e.style,s)),a=ie.cssHooks[t]||ie.cssHooks[s],a&&"get"in a&&(o=a.get(e,!0,n)),void 0===o&&(o=tt(e,t,r)),"normal"===o&&t in ft&&(o=ft[t]),""===n||n?(i=parseFloat(o),n===!0||ie.isNumeric(i)?i||0:o):o}}),ie.each(["height","width"],function(e,t){ie.cssHooks[t]={get:function(e,n,r){if(n)return st.test(ie.css(e,"display"))&&0===e.offsetWidth?ie.swap(e,ct,function(){return L(e,t,r)}):L(e,t,r)},set:function(e,n,r){var i=r&&et(e);return D(e,n,r?j(e,t,r,ne.boxSizing&&"border-box"===ie.css(e,"boxSizing",!1,i),i):0)}}}),ne.opacity||(ie.cssHooks.opacity={get:function(e,t){return at.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=ie.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===ie.trim(o.replace(ot,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=ot.test(o)?o.replace(ot,i):o+" "+i)}}),ie.cssHooks.marginRight=k(ne.reliableMarginRight,function(e,t){if(t)return ie.swap(e,{display:"inline-block"},tt,[e,"marginRight"])}),ie.each({margin:"",padding:"",border:"Width"},function(e,t){ie.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+Se[r]+t]=o[r]||o[r-2]||o[0];return i}},nt.test(e)||(ie.cssHooks[e+t].set=D)}),ie.fn.extend({css:function(e,t){return De(this,function(e,t,n){var r,i,o={},a=0;if(ie.isArray(t)){for(r=et(e),i=t.length;a<i;a++)o[t[a]]=ie.css(e,t[a],!1,r);return o}return void 0!==n?ie.style(e,t,n):ie.css(e,t)},e,t,arguments.length>1)},show:function(){return A(this,!0)},hide:function(){return A(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ae(this)?ie(this).show():ie(this).hide()})}}),ie.Tween=H,H.prototype={constructor:H,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ie.cssNumber[n]?"":"px")},cur:function(){var e=H.propHooks[this.prop];return e&&e.get?e.get(this):H.propHooks._default.get(this)},run:function(e){var t,n=H.propHooks[this.prop];return this.options.duration?this.pos=t=ie.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):H.propHooks._default.set(this),this}},H.prototype.init.prototype=H.prototype,H.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=ie.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){ie.fx.step[e.prop]?ie.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[ie.cssProps[e.prop]]||ie.cssHooks[e.prop])?ie.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},H.propHooks.scrollTop=H.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ie.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},ie.fx=H.prototype.init,ie.fx.step={};var pt,ht,mt=/^(?:toggle|show|hide)$/,gt=new RegExp("^(?:([+-])=|)("+ke+")([a-z%]*)$","i"),yt=/queueHooks$/,vt=[O],bt={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=gt.exec(t),o=i&&i[3]||(ie.cssNumber[e]?"":"px"),a=(ie.cssNumber[e]||"px"!==o&&+r)&&gt.exec(ie.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,ie.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};ie.Animation=ie.extend(B,{tweener:function(e,t){ie.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;r<i;r++)n=e[r],bt[n]=bt[n]||[],bt[n].unshift(t)},prefilter:function(e,t){t?vt.unshift(e):vt.push(e)}}),ie.speed=function(e,t,n){var r=e&&"object"==typeof e?ie.extend({},e):{complete:n||!n&&t||ie.isFunction(e)&&e,duration:e,easing:n&&t||t&&!ie.isFunction(t)&&t};return r.duration=ie.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in ie.fx.speeds?ie.fx.speeds[r.duration]:ie.fx.speeds._default,null!=r.queue&&r.queue!==!0||(r.queue="fx"),r.old=r.complete,r.complete=function(){ie.isFunction(r.old)&&r.old.call(this),r.queue&&ie.dequeue(this,r.queue)},r},ie.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=ie.isEmptyObject(e),o=ie.speed(t,n,r),a=function(){var t=B(this,ie.extend({},e),o);(i||ie._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=ie.timers,a=ie._data(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&yt.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||ie.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=ie._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=ie.timers,a=r?r.length:0;for(n.finish=!0,ie.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),ie.each(["toggle","show","hide"],function(e,t){var n=ie.fn[t];ie.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(q(t,!0),e,r,i)}}),ie.each({slideDown:q("show"),slideUp:q("hide"),slideToggle:q("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){ie.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),ie.timers=[],ie.fx.tick=function(){var e,t=ie.timers,n=0;for(pt=ie.now();n<t.length;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||ie.fx.stop(),pt=void 0},ie.fx.timer=function(e){ie.timers.push(e),e()?ie.fx.start():ie.timers.pop()},ie.fx.interval=13,ie.fx.start=function(){ht||(ht=setInterval(ie.fx.tick,ie.fx.interval))},ie.fx.stop=function(){clearInterval(ht),ht=null},ie.fx.speeds={slow:600,fast:200,_default:400},ie.fn.delay=function(e,t){return e=ie.fx?ie.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e,t,n,r,i;t=he.createElement("div"),t.setAttribute("className","t"),t.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=t.getElementsByTagName("a")[0],n=he.createElement("select"),i=n.appendChild(he.createElement("option")),e=t.getElementsByTagName("input")[0],r.style.cssText="top:1px",ne.getSetAttribute="t"!==t.className,ne.style=/top/.test(r.getAttribute("style")),ne.hrefNormalized="/a"===r.getAttribute("href"),ne.checkOn=!!e.value,ne.optSelected=i.selected,ne.enctype=!!he.createElement("form").enctype,n.disabled=!0,ne.optDisabled=!i.disabled,e=he.createElement("input"),e.setAttribute("value",""),ne.input=""===e.getAttribute("value"),e.value="t",e.setAttribute("type","radio"),ne.radioValue="t"===e.value}();var xt=/\r/g;ie.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=ie.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,ie(this).val()):e,null==i?i="":"number"==typeof i?i+="":ie.isArray(i)&&(i=ie.map(i,function(e){return null==e?"":e+""})),t=ie.valHooks[this.type]||ie.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=ie.valHooks[i.type]||ie.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(xt,""):null==n?"":n)}}}),ie.extend({valHooks:{option:{get:function(e){var t=ie.find.attr(e,"value");return null!=t?t:ie.trim(ie.text(e))}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||i<0,a=o?null:[],s=o?i+1:r.length,l=i<0?s:o?i:0;l<s;l++)if(n=r[l],(n.selected||l===i)&&(ne.optDisabled?!n.disabled:null===n.getAttribute("disabled"))&&(!n.parentNode.disabled||!ie.nodeName(n.parentNode,"optgroup"))){if(t=ie(n).val(),o)return t;a.push(t)}return a},set:function(e,t){for(var n,r,i=e.options,o=ie.makeArray(t),a=i.length;a--;)if(r=i[a],ie.inArray(ie.valHooks.option.get(r),o)>=0)try{r.selected=n=!0}catch(e){r.scrollHeight}else r.selected=!1;return n||(e.selectedIndex=-1),i}}}}),ie.each(["radio","checkbox"],function(){ie.valHooks[this]={set:function(e,t){if(ie.isArray(t))return e.checked=ie.inArray(ie(e).val(),t)>=0}},ne.checkOn||(ie.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var wt,Tt,Ct=ie.expr.attrHandle,Nt=/^(?:checked|selected)$/i,Et=ne.getSetAttribute,kt=ne.input;ie.fn.extend({attr:function(e,t){return De(this,ie.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){ie.removeAttr(this,e)})}}),ie.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===Ce?ie.prop(e,t,n):(1===o&&ie.isXMLDoc(e)||(t=t.toLowerCase(),r=ie.attrHooks[t]||(ie.expr.match.bool.test(t)?Tt:wt)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=ie.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void ie.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(be);if(o&&1===e.nodeType)for(;n=o[i++];)r=ie.propFix[n]||n,ie.expr.match.bool.test(n)?kt&&Et||!Nt.test(n)?e[r]=!1:e[ie.camelCase("default-"+n)]=e[r]=!1:ie.attr(e,n,""),e.removeAttribute(Et?n:r)},attrHooks:{type:{set:function(e,t){if(!ne.radioValue&&"radio"===t&&ie.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),Tt={set:function(e,t,n){return t===!1?ie.removeAttr(e,n):kt&&Et||!Nt.test(n)?e.setAttribute(!Et&&ie.propFix[n]||n,n):e[ie.camelCase("default-"+n)]=e[n]=!0,n}},ie.each(ie.expr.match.bool.source.match(/\w+/g),function(e,t){var n=Ct[t]||ie.find.attr;Ct[t]=kt&&Et||!Nt.test(t)?function(e,t,r){var i,o;return r||(o=Ct[t],Ct[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,Ct[t]=o),i}:function(e,t,n){if(!n)return e[ie.camelCase("default-"+t)]?t.toLowerCase():null}}),kt&&Et||(ie.attrHooks.value={set:function(e,t,n){return ie.nodeName(e,"input")?void(e.defaultValue=t):wt&&wt.set(e,t,n)}}),Et||(wt={set:function(e,t,n){var r=e.getAttributeNode(n);if(r||e.setAttributeNode(r=e.ownerDocument.createAttribute(n)),r.value=t+="","value"===n||t===e.getAttribute(n))return t}},Ct.id=Ct.name=Ct.coords=function(e,t,n){var r;if(!n)return(r=e.getAttributeNode(t))&&""!==r.value?r.value:null},ie.valHooks.button={get:function(e,t){var n=e.getAttributeNode(t);if(n&&n.specified)return n.value},set:wt.set},ie.attrHooks.contenteditable={set:function(e,t,n){wt.set(e,""!==t&&t,n)}},ie.each(["width","height"],function(e,t){ie.attrHooks[t]={set:function(e,n){if(""===n)return e.setAttribute(t,"auto"),n}}})),ne.style||(ie.attrHooks.style={get:function(e){return e.style.cssText||void 0},set:function(e,t){return e.style.cssText=t+""}});var St=/^(?:input|select|textarea|button|object)$/i,At=/^(?:a|area)$/i;ie.fn.extend({prop:function(e,t){return De(this,ie.prop,e,t,arguments.length>1)},removeProp:function(e){return e=ie.propFix[e]||e,this.each(function(){try{this[e]=void 0,delete this[e]}catch(e){}})}}),ie.extend({propFix:{for:"htmlFor",class:"className"},prop:function(e,t,n){var r,i,o,a=e.nodeType;if(e&&3!==a&&8!==a&&2!==a)return o=1!==a||!ie.isXMLDoc(e),o&&(t=ie.propFix[t]||t,i=ie.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=ie.find.attr(e,"tabindex");return t?parseInt(t,10):St.test(e.nodeName)||At.test(e.nodeName)&&e.href?0:-1}}}}),ne.hrefNormalized||ie.each(["href","src"],function(e,t){ie.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),ne.optSelected||(ie.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),ie.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ie.propFix[this.toLowerCase()]=this}),ne.enctype||(ie.propFix.enctype="encoding");var Dt=/[\t\r\n\f]/g;ie.fn.extend({addClass:function(e){var t,n,r,i,o,a,s=0,l=this.length,u="string"==typeof e&&e;if(ie.isFunction(e))return this.each(function(t){ie(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(be)||[];s<l;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Dt," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");a=ie.trim(r),n.className!==a&&(n.className=a)}return this},removeClass:function(e){var t,n,r,i,o,a,s=0,l=this.length,u=0===arguments.length||"string"==typeof e&&e;if(ie.isFunction(e))return this.each(function(t){ie(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(be)||[];s<l;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Dt," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");a=e?ie.trim(r):"",n.className!==a&&(n.className=a)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):ie.isFunction(e)?this.each(function(n){ie(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var t,r=0,i=ie(this),o=e.match(be)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else n!==Ce&&"boolean"!==n||(this.className&&ie._data(this,"__className__",this.className),this.className=this.className||e===!1?"":ie._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;n<r;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Dt," ").indexOf(t)>=0)return!0;return!1}}),ie.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){ie.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),ie.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var jt=ie.now(),Lt=/\?/,Ht=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;ie.parseJSON=function(t){if(e.JSON&&e.JSON.parse)return e.JSON.parse(t+"");var n,r=null,i=ie.trim(t+"");return i&&!ie.trim(i.replace(Ht,function(e,t,i,o){return n&&t&&(r=0),0===r?e:(n=i||t,r+=!o-!i,"")}))?Function("return "+i)():ie.error("Invalid JSON: "+t)},ie.parseXML=function(t){var n,r;if(!t||"string"!=typeof t)return null;try{e.DOMParser?(r=new DOMParser,n=r.parseFromString(t,"text/xml")):(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t))}catch(e){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||ie.error("Invalid XML: "+t),n};var _t,qt,Mt=/#.*$/,Ot=/([?&])_=[^&]*/,Ft=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Bt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Pt=/^(?:GET|HEAD)$/,Rt=/^\/\//,Wt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,$t={},zt={},It="*/".concat("*");try{qt=location.href}catch(e){qt=he.createElement("a"),qt.href="",qt=qt.href}_t=Wt.exec(qt.toLowerCase())||[],ie.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qt,type:"GET",isLocal:Bt.test(_t[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":It,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":ie.parseJSON,"text xml":ie.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?W(W(e,ie.ajaxSettings),t):W(ie.ajaxSettings,e)},ajaxPrefilter:P($t),ajaxTransport:P(zt),ajax:function(e,t){function n(e,t,n,r){var i,c,y,v,x,T=t;2!==b&&(b=2,s&&clearTimeout(s),u=void 0,a=r||"",w.readyState=e>0?4:0,i=e>=200&&e<300||304===e,n&&(v=$(f,w,n)),v=z(f,v,w,i),i?(f.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(ie.lastModified[o]=x),x=w.getResponseHeader("etag"),x&&(ie.etag[o]=x)),204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=v.state,c=v.data,y=v.error,i=!y)):(y=T,!e&&T||(T="error",e<0&&(e=0))),w.status=e,w.statusText=(t||T)+"",i?h.resolveWith(d,[c,T,w]):h.rejectWith(d,[w,T,y]),w.statusCode(g),g=void 0,l&&p.trigger(i?"ajaxSuccess":"ajaxError",[w,f,i?c:y]),m.fireWith(d,[w,T]),l&&(p.trigger("ajaxComplete",[w,f]),--ie.active||ie.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,a,s,l,u,c,f=ie.ajaxSetup({},t),d=f.context||f,p=f.context&&(d.nodeType||d.jquery)?ie(d):ie.event,h=ie.Deferred(),m=ie.Callbacks("once memory"),g=f.statusCode||{},y={},v={},b=0,x="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c)for(c={};t=Ft.exec(a);)c[t[1].toLowerCase()]=t[2];t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(f.mimeType=e),this},statusCode:function(e){var t;if(e)if(b<2)for(t in e)g[t]=[g[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||x;return u&&u.abort(t),n(0,t),this}};if(h.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,f.url=((e||f.url||qt)+"").replace(Mt,"").replace(Rt,_t[1]+"//"),f.type=t.method||t.type||f.method||f.type,f.dataTypes=ie.trim(f.dataType||"*").toLowerCase().match(be)||[""],null==f.crossDomain&&(r=Wt.exec(f.url.toLowerCase()),f.crossDomain=!(!r||r[1]===_t[1]&&r[2]===_t[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(_t[3]||("http:"===_t[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=ie.param(f.data,f.traditional)),R($t,f,t,w),2===b)return w;l=f.global,l&&0===ie.active++&&ie.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!Pt.test(f.type),o=f.url,f.hasContent||(f.data&&(o=f.url+=(Lt.test(o)?"&":"?")+f.data,delete f.data),f.cache===!1&&(f.url=Ot.test(o)?o.replace(Ot,"$1_="+jt++):o+(Lt.test(o)?"&":"?")+"_="+jt++)),f.ifModified&&(ie.lastModified[o]&&w.setRequestHeader("If-Modified-Since",ie.lastModified[o]),ie.etag[o]&&w.setRequestHeader("If-None-Match",ie.etag[o])),(f.data&&f.hasContent&&f.contentType!==!1||t.contentType)&&w.setRequestHeader("Content-Type",f.contentType),w.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+It+"; q=0.01":""):f.accepts["*"]);for(i in f.headers)w.setRequestHeader(i,f.headers[i]);if(f.beforeSend&&(f.beforeSend.call(d,w,f)===!1||2===b))return w.abort();x="abort";for(i in{success:1,error:1,complete:1})w[i](f[i]);if(u=R(zt,f,t,w)){w.readyState=1,l&&p.trigger("ajaxSend",[w,f]),f.async&&f.timeout>0&&(s=setTimeout(function(){w.abort("timeout")},f.timeout));try{b=1,u.send(y,n)}catch(e){if(!(b<2))throw e;n(-1,e)}}else n(-1,"No Transport");return w},getJSON:function(e,t,n){return ie.get(e,t,n,"json")},getScript:function(e,t){return ie.get(e,void 0,t,"script")}}),ie.each(["get","post"],function(e,t){ie[t]=function(e,n,r,i){return ie.isFunction(n)&&(i=i||r,r=n,n=void 0),ie.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),ie.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ie.fn[t]=function(e){return this.on(t,e)}}),ie._evalUrl=function(e){return ie.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,throws:!0})},ie.fn.extend({wrapAll:function(e){if(ie.isFunction(e))return this.each(function(t){ie(this).wrapAll(e.call(this,t))});if(this[0]){var t=ie(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return ie.isFunction(e)?this.each(function(t){ie(this).wrapInner(e.call(this,t))}):this.each(function(){var t=ie(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=ie.isFunction(e);return this.each(function(n){ie(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){ie.nodeName(this,"body")||ie(this).replaceWith(this.childNodes)}).end()}}),ie.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0||!ne.reliableHiddenOffsets()&&"none"===(e.style&&e.style.display||ie.css(e,"display"))},ie.expr.filters.visible=function(e){return!ie.expr.filters.hidden(e)};var Xt=/%20/g,Ut=/\[\]$/,Vt=/\r?\n/g,Jt=/^(?:submit|button|image|reset|file)$/i,Yt=/^(?:input|select|textarea|keygen)/i;ie.param=function(e,t){var n,r=[],i=function(e,t){t=ie.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=ie.ajaxSettings&&ie.ajaxSettings.traditional),ie.isArray(e)||e.jquery&&!ie.isPlainObject(e))ie.each(e,function(){i(this.name,this.value)});else for(n in e)I(n,e[n],t,i);return r.join("&").replace(Xt,"+")},ie.fn.extend({serialize:function(){return ie.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=ie.prop(this,"elements");return e?ie.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!ie(this).is(":disabled")&&Yt.test(this.nodeName)&&!Jt.test(e)&&(this.checked||!je.test(e))}).map(function(e,t){var n=ie(this).val();return null==n?null:ie.isArray(n)?ie.map(n,function(e){return{name:t.name,value:e.replace(Vt,"\r\n")}}):{name:t.name,value:n.replace(Vt,"\r\n")}}).get()}}),ie.ajaxSettings.xhr=void 0!==e.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&X()||U()}:X;var Gt=0,Qt={},Kt=ie.ajaxSettings.xhr();e.ActiveXObject&&ie(e).on("unload",function(){for(var e in Qt)Qt[e](void 0,!0)}),ne.cors=!!Kt&&"withCredentials"in Kt,Kt=ne.ajax=!!Kt,Kt&&ie.ajaxTransport(function(e){if(!e.crossDomain||ne.cors){var t;return{send:function(n,r){var i,o=e.xhr(),a=++Gt;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)void 0!==n[i]&&o.setRequestHeader(i,n[i]+"");o.send(e.hasContent&&e.data||null),t=function(n,i){var s,l,u;if(t&&(i||4===o.readyState))if(delete Qt[a],t=void 0,o.onreadystatechange=ie.noop,i)4!==o.readyState&&o.abort();else{u={},s=o.status,"string"==typeof o.responseText&&(u.text=o.responseText);try{l=o.statusText}catch(e){l=""}s||!e.isLocal||e.crossDomain?1223===s&&(s=204):s=u.text?200:404}u&&r(s,l,u,o.getAllResponseHeaders())},e.async?4===o.readyState?setTimeout(t):o.onreadystatechange=Qt[a]=t:t()},abort:function(){t&&t(void 0,!0)}}}}),ie.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return ie.globalEval(e),e}}}),ie.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),ie.ajaxTransport("script",function(e){if(e.crossDomain){var t,n=he.head||ie("head")[0]||he.documentElement;return{send:function(r,i){t=he.createElement("script"),t.async=!0,e.scriptCharset&&(t.charset=e.scriptCharset),t.src=e.url,t.onload=t.onreadystatechange=function(e,n){(n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,n||i(200,"success"))},n.insertBefore(t,n.firstChild)},abort:function(){t&&t.onload(void 0,!0)}}}});var Zt=[],en=/(=)\?(?=&|$)|\?\?/;ie.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Zt.pop()||ie.expando+"_"+jt++;return this[e]=!0,e}}),ie.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=t.jsonp!==!1&&(en.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&en.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=ie.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(en,"$1"+i):t.jsonp!==!1&&(t.url+=(Lt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||ie.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Zt.push(i)),a&&ie.isFunction(o)&&o(a[0]),a=o=void 0}),"script"}),ie.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||he;var r=fe.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=ie.buildFragment([e],t,i),i&&i.length&&ie(i).remove(),ie.merge([],r.childNodes))};var tn=ie.fn.load;ie.fn.load=function(e,t,n){if("string"!=typeof e&&tn)return tn.apply(this,arguments);var r,i,o,a=this,s=e.indexOf(" ");return s>=0&&(r=ie.trim(e.slice(s,e.length)),e=e.slice(0,s)),ie.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(o="POST"),a.length>0&&ie.ajax({url:e,type:o,dataType:"html",data:t}).done(function(e){i=arguments,a.html(r?ie("<div>").append(ie.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){a.each(n,i||[e.responseText,t,e])}),this},ie.expr.filters.animated=function(e){return ie.grep(ie.timers,function(t){return e===t.elem}).length};var nn=e.document.documentElement;ie.offset={setOffset:function(e,t,n){var r,i,o,a,s,l,u,c=ie.css(e,"position"),f=ie(e),d={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=ie.css(e,"top"),l=ie.css(e,"left"),u=("absolute"===c||"fixed"===c)&&ie.inArray("auto",[o,l])>-1,u?(r=f.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(l)||0),ie.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(d.top=t.top-s.top+a),null!=t.left&&(d.left=t.left-s.left+i),"using"in t?t.using.call(e,d):f.css(d)}},ie.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){ie.offset.setOffset(this,e,t)});var t,n,r={top:0,left:0},i=this[0],o=i&&i.ownerDocument;if(o)return t=o.documentElement,ie.contains(t,i)?(typeof i.getBoundingClientRect!==Ce&&(r=i.getBoundingClientRect()),n=V(o),{top:r.top+(n.pageYOffset||t.scrollTop)-(t.clientTop||0),left:r.left+(n.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}):r},position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===ie.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),ie.nodeName(e[0],"html")||(n=e.offset()),n.top+=ie.css(e[0],"borderTopWidth",!0),n.left+=ie.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-ie.css(r,"marginTop",!0),left:t.left-n.left-ie.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||nn;e&&!ie.nodeName(e,"html")&&"static"===ie.css(e,"position");)e=e.offsetParent;return e||nn})}}),ie.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n=/Y/.test(t);ie.fn[e]=function(r){return De(this,function(e,r,i){var o=V(e);return void 0===i?o?t in o?o[t]:o.document.documentElement[r]:e[r]:void(o?o.scrollTo(n?ie(o).scrollLeft():i,n?i:ie(o).scrollTop()):e[r]=i)},e,r,arguments.length,null)}}),ie.each(["top","left"],function(e,t){ie.cssHooks[t]=k(ne.pixelPosition,function(e,n){if(n)return n=tt(e,t),rt.test(n)?ie(e).position()[t]+"px":n})}),ie.each({Height:"height",Width:"width"},function(e,t){ie.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){ie.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),a=n||(r===!0||i===!0?"margin":"border");return De(this,function(t,n,r){var i;return ie.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?ie.css(t,n,a):ie.style(t,n,r,a);
	},t,o?r:void 0,o,null)}})}),ie.fn.size=function(){return this.length},ie.fn.andSelf=ie.fn.addBack,"function"=='function'&&require(16)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return ie}.apply(null, __WEBPACK_AMD_DEFINE_ARRAY__)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var rn=e.jQuery,on=e.$;return ie.noConflict=function(t){return e.$===ie&&(e.$=on),t&&e.jQuery===ie&&(e.jQuery=rn),ie},typeof t===Ce&&(e.jQuery=e.$=ie),e.jQuery=e.$=ie,ie});

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, require) {

	!/* require */(/* empty */function() { /* WEBPACK VAR INJECTION */(function(require, $) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [require(3), require(2), require(5)]; (function (api, common) {
	    //实现搜索输入框的输入提示js类
	    var lastKeyWords,
	        matchListCache = {},
	        hotDatas = [];
	    var oSearchSuggest = function (searchFuc) {
	        // function oSearchSuggest(searchFuc) {
	        var searchsubmit = $('#btnSearch'),
	            input = $('#q'),
	            suggestWrap = $('#gov_search_suggest'),
	            key = "",
	            init = function () {
	                var hotWords = searchsubmit.siblings('.search_keywords').children('a.item');
	                hotWords.each(function(){
	                    hotDatas.push($(this).text());
	                });
	
	                input.bind('focus', function () {
	                    var _q = $.trim(input.val());
	                    if (_q == '') {
	                        var aData =  [];
	                        if ($.cookie('searchHistory')) {
	                            aData = $.cookie('searchHistory').split(',');
	                        }else{
	                            aData = hotDatas;
	                        }
	                        searchSuggest.dataDisplay(aData, true);
	                    } else {
	                        sendKeyWordToBack();
	                    }
	                });
	                input.bind('keyup', sendKeyWord);
	                input.bind('blur', function () {
	                    setTimeout(hideSuggest, 300);
	                });
	                $("form#search_tab_content_q").submit(function(e){
	                    if(suggestWrap.find('li.selected').length > 0){
	                        console.log(suggestWrap.find('li.selected').eq(0).find('a').attr('href'));
	                        location.href = suggestWrap.find('li.selected').eq(0).find('a').attr('href');
	                        return false;
	                    }
	                    var _q  = $('#q').val().trim();
	                    if(_q==''){
	                        location.href = '/search.html';
	                        return false;
	                    }else{
	                        if(_q.indexOf(' ') > -1){
	                            _q = encodeURIComponent(_q);
	                            location.href = '/search.html?q='+_q;
	                            return false;
	                        }
	                    }
	                });
	                $("form#search_tab_content_shop").submit(function(e){
	                    var _q  = $('#searchKey').val().trim();
	                    if(_q==''){
	                        location.href = '/shopsearch.html';
	                        return false;
	                    }else{
	                        if(_q.indexOf(' ') > -1){
	                            _q = decodeURIComponent(_q);
	                            location.href = '/shopsearch.html?searchKey='+_q;
	                            return false;
	                        }
	                    }
	                });
	            },
	            hideSuggest = function () {
	                suggestWrap.hide();
	            },
	        //发送请求，根据关键字到后台查询
	            sendKeyWord = function (event) {
	                //键盘选择下拉项
	                if (suggestWrap.css('display') == 'block' && event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {
	                    var current = suggestWrap.find('li.selected');
	                    if (event.keyCode == 38) {
	                        if (current.length > 0) {
	                            var prevLi = current.removeClass('selected').prev();
	                            if (prevLi.length > 0) {
	                                prevLi.addClass('selected');
	                                input.val(prevLi.attr('q'));
	                            }
	                        } else {
	                            var last = suggestWrap.find('li:last');
	                            last.addClass('selected');
	                            input.val(last.attr('q'));
	                        }
	                    } else if (event.keyCode == 40) {
	                        if (current.length > 0) {
	                            var nextLi = current.removeClass('selected').next();
	                            if (nextLi.length > 0) {
	                                nextLi.addClass('selected');
	                                input.val(nextLi.attr('q'));
	                            }
	                        } else {
	                            var first = suggestWrap.find('li:first');
	                            first.addClass('selected');
	                            input.val(first.attr('q'));
	                        }
	                    }
	                    //输入字符
	                } else {
	                    var valText = $.trim(input.val());
	                    if (valText == '' || valText == key) {
	                        return;
	                    }
	                    searchFuc(valText);
	                    key = valText;
	                }
	            };
	        //请求返回后，执行数据展示
	        this.dataDisplay = function (data, isHistory) {
	            if (data.length <= 0) {
	                suggestWrap.hide();
	                return;
	            }
	            if (data.length >= 10) {
	                data.length = 10;
	                // $(".search-img").show()
	            }
	
	            //往搜索框下拉建议显示栏中添加条目并显示
	            var li, _q,
	                tmpFrag = document.createDocumentFragment();
	            suggestWrap.find('ul').html('');
	            for (var i = 0; i < data.length; i++) {
	                li = document.createElement('LI');
	                var _item = data[i];
	                if (_item.tcid) {
	                    _q = lastKeyWords;
	                    li.innerHTML = '<a href="/search.html?tcid=' + _item.tcid + '&q=' + encodeURIComponent(_q) + '" title="' + _q + '" target="_blank"><div class="title"><span class="q">' + _q + '</span><span class="cate">在<span>' + _item.tcname + ' </span>分类下搜索</span></div></a>';
	                    li.title = _q;
	                } else {
	                	if(isHistory){
	                    	_q = _item;
	                	}else{
	                    	_q = _item[0];
	                	}
	                    li.innerHTML = '<a href="/search.html?q=' + encodeURIComponent(_q) + '" title="' + _q + '"><div class="title"><span class="q">' + _q + '</span></div></a>';
	                    li.title = _q;
	                }
	                li.setAttribute('q', _q);
	                tmpFrag.appendChild(li);
	            }
	            suggestWrap.find('ul').append(tmpFrag);
	            suggestWrap.show();
	            cuvvic.sendShow('', $('#gov_search_suggest .search-img a:eq(0)'));
	            //为下拉选项绑定鼠标事件,实现鼠标点击选取
	            suggestWrap.find('li').hover(function () {
	                suggestWrap.find('li').removeClass('selected');
	                $(this).addClass('selected');
	            }, function () {
	                $(this).removeClass('selected');
	            }).bind('mousedown', function () {
	                input.val(this.title);
	                suggestWrap.hide();
	                searchsubmit.click();
	            });
	        };
	        init();
	    };
	    //实例化输入提示的JS,参数为进行查询操作时要调用的函数名
	    var searchSuggest = new oSearchSuggest(common.throttle(sendKeyWordToBack, 800, true, true)) //cgx
	
	    //这是一个模似函数，实p现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。本函数由程序员进行修改实现查询的请求
	    //参数为一个字符串，是搜索输入框中当前的内容
	    function sendKeyWordToBack() {
	        var sSearchKey = $.trim($("#q").val() || '');
	        $("#q").bind("input propertychange", function (event) {
	            sSearchKey = $("#q").val();
	        });
	        if (matchListCache[sSearchKey + '']) {
	            searchSuggest.dataDisplay(matchListCache[sSearchKey + '']);
	            return;
	        }
	        $.ajax({
	            url: "/rest/suggest", //后台webservice里的方法名称根据自己需要实现返回数据位json
	            type: "get",
	            dataType: "json",
	            async: false,
	            contentType: "application/json; charset=utf-8",
	            data: {q: sSearchKey},
	            traditional: false,
	            beforeSend: function (x) {
	                x.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	            },
	            success: function (data) {
	                var aData = [],
	                    _data = data.data;
	                lastKeyWords = sSearchKey;
	                aData = formatSuggestData(sSearchKey, _data);
	                searchSuggest.dataDisplay(aData);
	            },
	            error: function (msg, e) {
	                // $("#filter_stationType").html("SQL语句有错误");
	            },
	            complete: function (x) {
	            }
	        });
	    }
	
	    function formatSuggestData(q, aData) {
	        var list = [],
	            cats = aData.cats || [],
	            suggests = aData.suggests || [];
	        list = $.merge(cats, suggests);
	        matchListCache[q + ''] = list;
	        return list;
	    }
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, require, require(9)))}());


/***/ },
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, $) {var api = require(3)
	// var tpl = require('text!' + _WEB_Cfg.domain +'/static/quicklogin.html')
	// var css = require('css!'+_WEB_Cfg.staticPath + '/css/qlogin3.css')
	require(15)
	
	
		var SMSDELAY = 100; //短信重发间隔
		var _VERIFYCODEURL = "/apic/verifyCode/generate";
		var Main = function () {};
	
		var showError = function(text){
			$('.err-info').show();
			$('.err-info span').text(text);
		};
		var hideError = function(){
			$('.err-info').hide();
			$('.err-info span').text('');
		};
		$.extend(Main.prototype, {
			isShow:0,//是否显示验证码,默认0不显示
			goHref:'',
			smsDelay:true,//发送短信验证码
			smsDelayInterval:'',
			smsSendTag:false,//是否发送短信验证码
			autoVal:0,//记录自动登录值
			userNameExist:'',//存储已经存在的用户名
			doNotReload: false,
			init: function(href, doNotReload, cb){
				var self = this;
				if(href){
					self.goHref = href;
				}
				if(doNotReload){
					self.doNotReload = true;
				}
				if($.isFunction(cb)){
					self.cb = cb;
				}
				self.showLoginBox();
			},
			showLoginBox:function(){
				var self = this;
				self.closeLoginBox();
				$.ajax({
					url: _WEB_Cfg.domain +'/static/quicklogin.html',
					type: 'get',
					dataType: 'html',
					success: function(data){
						console.log(data);
					}
				})
	
	
				$(document.body).append(tpl);
				self.setPositionLoginBox();
				$('.qlogin').show();
				cuvvic.sendShow("", $('#submitLogin'));
				self.setAuto();
				self.addEvent();
			},
			setPositionLoginBox:function(){
				var _height = $(window).height(),
					_boxHeight = 280;
				$('.qlogin').css({top:(_height - _boxHeight)/2 + 'px'});
			},
			setAuto:function(){
				var _auto = $.cookie('userLoginAuto');
				if(_auto && _auto == 1){
					$('.v-single-check').addClass('checked');
					$('#auto').val(1);
				}
			},
	
			closeLoginBox:function(){
				this.smsSendTag = false;
				this.isShow = 0;
				$('.w-loginbg,.qlogin').remove();
			},
			addEvent: function(){
				var self = this;
				var _errorIcon = '<i class="vvicon error-icon">&#xe616;</i>';
				var myValidate = $('#j-qlogin-form').validate({
						debug: true,
						onfocusout: false,
						focusInvalid:false,
						focusCleanup:true,
						rules:{
							username: "required",
							password: "required",
							secCode:{
								required:function(){
									return (self.isShow != 0)?true:false;
								}
							},
							//用户是否要发送手机验证码
							smsCode:{
								required:function(){
									$('#smsBox').removeClass('hide');
									return self.smsSendTag;
								}
							}
						},
						messages: {
							username: '请输入登录账户',
							password: '请输入登录密码',
							secCode: '请输入验证码',
							smsCode:'请输入短信验证码'
						},
						errorPlacement: function (error, element) {
						},
	
						showErrors:function(errorMap,errorList){
							var _errorArray = [];
							if(errorList.length <= 0){
								return false;
							}
	
							var errorName = $(errorList[0].element).attr('id'),
								$box = '';
	
							if(errorName == 'secCode'){
								$('#codeBox').removeClass('hide');
								$box = $('#secCode').parent();
							}else if(errorName == 'smsCode'){
								$('#smsBox').removeClass('hide');
								$box = $('.sms-input');
							}else{
								$box = $('#' + errorName).parents('dl');
							}
	
							for(var i in errorMap){
								_errorArray.push(errorMap[i]);
							}
							self.errorTip(_errorArray[0]);
							$box.addClass('error-focus');
						},
						submitHandler: function () {
							$('#names-error').remove();
							self.login();
						}
					});
	
				$('.v-single-check').on('click', function(){
					var $this = $(this);
					if($this.hasClass('checked')){
						$this.removeClass('checked');
						$('#auto').val(0);
					}else{
						$this.addClass('checked');
						$('#auto').val(1);
					}
				});
	
				$('.code-btn').on('click', function(){
					self.changeCode();
				});
	
				$("#username").blur(function(){
					var _name = $(this).val(),
						$this = this;
					if($.trim(_name).length > 0){
						self.sendShowCode(_name);
					}
				});
	
				$('input[type="text"],input[type="password"]').focus(function(){
					$('#names-error').remove();
					$('.error-focus').removeClass('error-focus');
					self.activeSendSmsBtn();
					if($(this).attr('name') == 'secCode' || $(this).attr('name') == 'smsCode'){
						$(this).parent('dd').removeClass('error-focus').addClass('focus');
						return;
					}
					$(this).parents('dl').removeClass('error-focus').addClass('focus');
				}).blur(function(){
					self.activeSendSmsBtn();
					if($(this).attr('name') == 'secCode' || $(this).attr('name') == 'smsCode'){
						$(this).parent('dd').removeClass('focus');
						return;
					}
					$(this).parents('dl').removeClass('focus');
				});
	
				$('.sms-btn').on('click',function(){
					if(self.smsSendTag && !$(this).hasClass('btn-disable')){
						self.sendSms();
					}
				});
	
				$('.qlogin-close').on('click',function(){
					self.closeLoginBox();
				});
	
				$(window).resize(function(){
					self.setPositionLoginBox();
				});
			},
	
			//错误提示的封装
			errorTip:function(txt){
				var _inner = '<label id="names-error" class="error" for="names"><i class="vvicon error-icon">&#xe616;</i>' + txt + '</label>';
				$('#names-error').remove();
				$('.error-focus').removeClass('error-focus');
				$('.login-other').prepend(_inner);
			},
			errorWarm:function(index){
				switch (index){
					case 1:
						$('#secCode').parent().addClass('error-focus');
						break;
					case 2:
						$('#password').parents('dl').addClass('error-focus');
						break;
					case 3:
						$('#userPhoneCode').parent().addClass('error-focus');
						break;
					default:
						$('#password').parents('dl').addClass('error-focus');
						break;
				}
			},
			login: function(){
				var self = this,
					_data =  {
						username: $("#username", $('.qlogin')).val(),
						password: $("#password").val(),
						auto: $("#auto").val(),
						user_key: $.cookie('user_key') || ''
					};
				// console.log(_data);
				self.autoVal = _data['auto'];
				///是否显示验证码
				if(self.isShow != 0){
					var addSecCode = $('#secCode').val();
					if(addSecCode != '' || addSecCode.length > 0){
						_data['secCode'] = addSecCode;
					}else{
						self.errorTip('请输入图形验证码');
						$('.code-input').addClass('error-focus');
						return false;
					}
	
				}
				//短信验证码
				if(self.smsSendTag){
					var addSmsCode = $('#userPhoneCode').val();
					if(addSmsCode != '' || addSmsCode.length > 0){
						_data['smsCode'] = addSmsCode;
					}else{
						self.errorTip('请输入短信验证码');
						$('.sms-input').addClass('error-focus');
						return false;
					}
	
				}
	
				api.service.account.login(_data, function(data){
					if(data.code != 200){
						self.isShow = 1;
						self.changeCode();
						self.errorTip(data.message);
						//显示验证码
						$('#codeBox').removeClass('hide').find('input').val('');
						// 防止用户多次登录。
						setTimeout(function(){self.isLogin = false}, 2000);
						self.isShow = 1;
						self.errorWarm(data.error_type);
						//用户手机号未激活的
						if(data.code == 509){
							self.smsSendTag = true;
							$('#smsBox').removeClass('hide');
						}
						return false;
					}
					self.isLogin=true;
					self.smsSendTag = false;
					self.closeLoginBox();
					self.isShow = 0;
	
					self.setCookies(data.data);
	
					if(self.goHref != '' || self.goHref.length > 0){
						/*var _tag = window.open('about:blank');
						_tag.location.href = self.goHref;*/
						/**阻止浏览器拦截**/
						var _a = document.createElement('a');
						_a.setAttribute('href',self.goHref);
						_a.setAttribute('target','_blank');
						_a.setAttribute('id','windonGoHref');
						// 防止反复添加
						if(!document.getElementById('windonGoHref')) {
							document.body.appendChild(_a);
						}
						_a.click();
					}
					if(!self.doNotReload){
						var dateTime = new Date(new Date() - 24 * 60 * 60 * 1000);
						$.cookie('user_key', '', {path: '/', expires: dateTime});
						window.location.reload();
					}else{
						if($.isFunction(self.cb)){
							self.cb();
						}
					}
					$("body").on('keyup',function(e){
						if(e.which==13){
							$("a.layui-layer-btn0").click();
						}
					});
					return;
				});
			},
			changeCode: function(){
				var time = new Date();
				$('#secCodeImg').attr('src', _VERIFYCODEURL + '?' + time.getTime());
			},
			setCookies: function(_user){
				var _expires = 1,
					self = this;
				if(self.autoVal==1){
					_expires = 30;
				}
	
				// 用户类型
				var _ut = _user.type; //用户类型
				$.cookie('ut', _ut , { path: '/', expires: _expires });
				// 用户id
				$.cookie('uid', _user.id , { path: '/' , domain: '.vvic.com', expires: _expires });
				// 用户username
				$.cookie('umc', _user.mobile_confirm, { path: '/' , expires: _expires});
				$.cookie('mobile', _user.mobile, { path: '/' , expires: _expires});
				// 拿货单数量
				$.cookie('pn', _user.pack_amount, { path: '/' , expires: _expires});
				$.cookie('defaultShopId', _user.default_shop_id, { path: '/' , expires: _expires});
				$.cookie('defaultShopName', _user.default_shop_name, { path: '/' , expires: _expires});
				$.cookie('uno', _user.orders_amount, { path: '/' , expires: _expires});
				$.cookie('userLoginAuto',self.autoVal,{ path: '/' , expires: _expires*3});
			},
			//短信验证码
			sendSms: function() {
				var $this = this,
					$btn = $('.sms-btn'),
					_data={
						username: $("#username", $('.qlogin')).val(),
						password: $("#password").val(),
						secCode: $("#secCode").val()
					};
				if($("#secCode").val() == '' || $("#secCode").val().length <= 0){
					$this.errorTip('请输入图形验证码');
					$('.code-input').addClass('error-focus');
					return false;
				}
				api.getData('/apic/getSmsCode','get',_data,function(data){
					var _obj=data,
						status=_obj.code;
					switch(!0){
						case (status==200):{
							$btn.addClass('btn-disable');
							layer.msg('已发送手机短信验证码');
							//loginVm.smsDelay = SMSDELAY
							$btn.text('重新发送(' + SMSDELAY + '秒)');
							$this.smsDelayInterval = setInterval(function() {
								if (SMSDELAY < 2) {
									$this.smsDelay = false;
									$btn.text('获取短信验证码').removeClass('btn-disable');
									clearInterval($this.smsDelayInterval);
									return;
								}
								SMSDELAY--;
								$btn.text('重新发送(' + SMSDELAY + '秒)');
							}, 1000);
							return;
							break;
						}
					}
					layer.msg(_obj.message);
					$this.smsDelay=true;
					$btn.text('获取短信验证码').removeClass('btn-disable');
	
				});
				return false;
			},
			//获取短信验证按钮激活
			activeSendSmsBtn:function(){
				var username = $("#username").val(),
					password = $("#password").val(),
					secCode = $('#secCode').val(),
					sendSms = this.smsSendTag;
				if(sendSms && username && password && secCode){
					$('.sms-btn').removeClass('btn-disabled');
				}else{
					$('.sms-btn').addClass('btn-disabled');
				}
	
			},
			//发送图形验证码
			sendShowCode:function(name){
				var	self = this,
					_data = {username:$('#username').val()},
					_name = name;
				if(self.userNameExist == _name){
					return false;
				}else{
					self.userNameExist = _name;
					self.isShow = 0;
					self.smsSendTag = false;
					$('#smsBox,#codeBox').addClass('hide');
				}
				api.service.user.loginShowCode(_data, function(r){
					$('#codeBox').find('input').val('');
					if(r && r.code == 200){
						var _is_show = r.data.is_show;
						if(_is_show != 0){
							self.isShow = _is_show;
							$('#codeBox').removeClass('hide');
						}else{
							self.isShow = 0;
							$('#codeBox').addClass('hide');
						}
					}
				});
			}
		});
	
		var main = new Main();
		module.exports = main;
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, require(9)))

/***/ },
/* 15 */
/***/ function(module, exports, require) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(require, jQuery) {!function(a,b){"use strict";var d,e,c=a._WEB_Cfg.jsLibPath+"jquery.layer/",f={getPath:function(){var a=document.scripts,b=a[a.length-1],d=b.src;if(!b.getAttribute("merge"))return c?c:d.substring(0,d.lastIndexOf("/")+1)}(),enter:function(a){13===a.keyCode&&a.preventDefault()},config:{},end:{},btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},g={v:"2.1",ie6:!!a.ActiveXObject&&!a.XMLHttpRequest,index:0,path:f.getPath,config:function(a,b){var c=0;return a=a||{},g.cache=f.config=d.extend(f.config,a),g.path=f.config.path||g.path,"string"==typeof a.extend&&(a.extend=[a.extend]),g.use("skin/layer.css",a.extend&&a.extend.length>0?function e(){var d=a.extend;g.use(d[d[c]?c:c-1],c<d.length?function(){return++c,e}():b)}():b),this},use:function(a,b,c){var f=d("head")[0],a=a.replace(/\s/g,""),h=/\.css$/.test(a),i=document.createElement(h?"link":"script"),j="layui_layer_"+a.replace(/\.|\//g,"");return g.path?(h&&(i.rel="stylesheet"),i[h?"href":"src"]=/^http:\/\//.test(a)?a:g.path+a,i.id=j,d("#"+j)[0]||f.appendChild(i),function k(){(h?1989===parseInt(d("#"+j).css("width")):g[c||j])?function(){b&&b();try{h||f.removeChild(i)}catch(a){}}():setTimeout(k,100)}(),this):void 0},ready:function(a,b){var c="function"==typeof a;return c&&(b=a),g.config(d.extend(f.config,function(){return c?{}:{path:a}}()),b),this},alert:function(a,b,c){var e="function"==typeof b;return e&&(c=b),g.open(d.extend({content:a,yes:c},e?{}:b))},confirm:function(a,b,c,e){var h="function"==typeof b;return h&&(e=c,c=b),g.open(d.extend({content:a,btn:f.btn,yes:c,cancel:e},h?{}:b))},msg:function(a,c,e){var h="function"==typeof c,j=f.config.skin,k=(j?j+" "+j+"-msg":"")||"layui-layer-msg",l=i.anim.length-1;return h&&(e=c),g.open(d.extend({content:a,time:3e3,shade:!1,skin:k,title:!1,closeBtn:!1,btn:!1,end:e},h&&!f.config.skin?{skin:k+" layui-layer-hui",shift:l}:function(){return c=c||{},(-1===c.icon||c.icon===b&&!f.config.skin)&&(c.skin=k+" "+(c.skin||"layui-layer-hui")),c}()))},load:function(a,b){return g.open(d.extend({type:3,icon:a||0,shade:.01},b))},tips:function(a,b,c){return g.open(d.extend({type:4,content:[a,b],closeBtn:!1,time:3e3,maxWidth:210},c))},stock:function(a,b,c){var d=g.tips(a,b,{tips:[2,"#FEFAEC"],skin:"stock-less",time:1e3});b.bind("mouseleave",function(){g.close(d)})},vtips:function(a,b){g.tips(a,b,{tips:[3,"#FEFAEC"],skin:"vtips",time:1e5});b.bind("mouseleave",function(){})}},h=function(a){var b=this;b.index=++g.index,b.config=d.extend({},b.config,f.config,a),b.creat()};h.pt=h.prototype;var i=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];i.anim=["layui-anim","layui-anim-01","layui-anim-02","layui-anim-03","layui-anim-04","layui-anim-05","layui-anim-06"],h.pt.config={type:0,shade:.3,fix:!0,move:i[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,shift:0,icon:-1,scrollbar:!0,tips:2},h.pt.vessel=function(a,b){var c=this,d=c.index,e=c.config,g=e.zIndex+d,h="object"==typeof e.title,j=e.maxmin&&(1===e.type||2===e.type),k=e.title?'<div class="layui-layer-title" style="'+(h?e.title[1]:"")+'">'+(h?e.title[0]:e.title)+"</div>":"";return e.zIndex=g,b([e.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+d+'" times="'+d+'" style="'+("z-index:"+(g-1)+"; background-color:"+(e.shade[1]||"#000")+"; opacity:"+(e.shade[0]||e.shade)+"; filter:alpha(opacity="+(100*e.shade[0]||100*e.shade)+");")+'"></div>':"",'<div class="'+i[0]+" "+(i.anim[e.shift]||"")+(" layui-layer-"+f.type[e.type])+(0!=e.type&&2!=e.type||e.shade?"":" layui-layer-border")+" "+(e.skin||"")+'" id="'+i[0]+d+'" type="'+f.type[e.type]+'" times="'+d+'" showtime="'+e.time+'" conType="'+(a?"object":"string")+'" style="z-index: '+g+"; width:"+e.area[0]+";height:"+e.area[1]+(e.fix?"":";position:absolute;")+'">'+(a&&2!=e.type?"":k)+'<div class="layui-layer-content'+(0==e.type&&-1!==e.icon?" layui-layer-padding":"")+(3==e.type?" layui-layer-loading"+e.icon:"")+'">'+(0==e.type&&-1!==e.icon?'<i class="layui-layer-ico layui-layer-ico'+e.icon+'"></i>':"")+(1==e.type&&a?"":e.content||"")+'</div><span class="layui-layer-setwin">'+function(){var a=j?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return e.closeBtn&&(a+='<a class="layui-layer-ico '+i[7]+" "+i[7]+(e.title?e.closeBtn:4==e.type?"1":"2")+'" href="javascript:;"></a>'),a}()+"</span>"+(e.btn?function(){var a="";"string"==typeof e.btn&&(e.btn=[e.btn]);for(var b=0,c=e.btn.length;c>b;b++){var d=e.target?e.target[b]:"";a+="_blank"==d?'<a class="'+i[6]+b+'" target="_blank" class="link" href="'+e.src[b]+'">'+e.btn[b]+"</a>":'<a class="'+i[6]+b+'">'+e.btn[b]+"</a>"}return'<div class="'+i[6]+'">'+a+"</div>"}():"")+"</div>"],k),c},h.pt.creat=function(){var a=this,b=a.config,c=a.index,j=b.content,k="object"==typeof j;switch("string"==typeof b.area&&(b.area="auto"===b.area?["",""]:[b.area,""]),b.type){case 0:b.btn="btn"in b?b.btn:f.btn[0],g.closeAll("dialog");break;case 2:var j=b.content=k?b.content:[b.content||"http://layer.layui.com","auto"];b.content='<iframe scrolling="'+(b.content[1]||"auto")+'" allowtransparency="true" id="'+i[4]+c+'" name="'+i[4]+c+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+b.content[0]+'"></iframe>';break;case 3:b.title=!1,b.closeBtn=!1,-1===b.icon&&0===b.icon,g.closeAll("loading");break;case 4:k||(b.content=[b.content,"body"]),b.follow=b.content[1],b.content=b.content[0]+'<i class="layui-layer-TipsG"></i><i class="layui-layer-TipsS"></i>',b.title=!1,b.shade=!1,b.fix=!1,b.tips="object"==typeof b.tips?b.tips:[b.tips,!0],b.tipsMore||g.closeAll("tips")}a.vessel(k,function(e,f){d("body").append(e[0]),k?function(){2==b.type||4==b.type?function(){d("body").append(e[1])}():function(){j.parents("."+i[0])[0]||(j.show().addClass("layui-layer-wrap").wrap(e[1]),d("#"+i[0]+c).find("."+i[5]).before(f))}()}():d("body").append(e[1]),a.layero=d("#"+i[0]+c),b.scrollbar||i.html.css("overflow","hidden").attr("layer-full",c)}).auto(c),2==b.type&&g.ie6&&a.layero.find("iframe").attr("src",j[0]),d(document).off("keydown",f.enter).on("keydown",f.enter),a.layero.on("keydown",function(a){d(document).off("keydown",f.enter)}),4==b.type?a.tips():a.offset(),b.fix&&e.on("resize",function(){a.offset(),(/^\d+%$/.test(b.area[0])||/^\d+%$/.test(b.area[1]))&&a.auto(c),4==b.type&&a.tips()}),b.time<=0||setTimeout(function(){g.close(a.index)},b.time),a.move().callback()},h.pt.auto=function(a){function k(a){a=f.find(a),a.height(g[1]-h-j-2*(0|parseFloat(a.css("padding"))))}var b=this,c=b.config,f=d("#"+i[0]+a);""===c.area[0]&&c.maxWidth>0&&(/MSIE 7/.test(navigator.userAgent)&&c.btn&&f.width(f.innerWidth()),f.outerWidth()>c.maxWidth&&f.width(c.maxWidth));var g=[f.innerWidth(),f.innerHeight()],h=f.find(i[1]).outerHeight()||0,j=f.find("."+i[6]).outerHeight()||0;switch(c.type){case 2:k("iframe");break;default:""===c.area[1]?c.fix&&g[1]>=e.height()&&(g[1]=e.height(),k("."+i[5])):k("."+i[5])}return b},h.pt.offset=function(){var a=this,b=a.config,c=a.layero,d=[c.outerWidth(),c.outerHeight()],f="object"==typeof b.offset;a.offsetTop=(e.height()-d[1])/2,a.offsetLeft=(e.width()-d[0])/2,f?(a.offsetTop=b.offset[0],a.offsetLeft=b.offset[1]||a.offsetLeft):"auto"!==b.offset&&(a.offsetTop=b.offset,"rb"===b.offset&&(a.offsetTop=e.height()-d[1],a.offsetLeft=e.width()-d[0])),b.fix||(a.offsetTop=/%$/.test(a.offsetTop)?e.height()*parseFloat(a.offsetTop)/100:parseFloat(a.offsetTop),a.offsetLeft=/%$/.test(a.offsetLeft)?e.width()*parseFloat(a.offsetLeft)/100:parseFloat(a.offsetLeft),a.offsetTop+=e.scrollTop(),a.offsetLeft+=e.scrollLeft()),c.css({top:a.offsetTop,left:a.offsetLeft})},h.pt.tips=function(){var a=this,b=a.config,c=a.layero,f=[c.outerWidth(),c.outerHeight()],g=d(b.follow);g[0]||(g=d("body"));var h={width:g.outerWidth(),height:g.outerHeight(),top:g.offset().top,left:g.offset().left},j=c.find(".layui-layer-TipsG"),k=b.tips[0];b.tips[1]||j.remove(),h.autoLeft=function(){h.left+f[0]-e.width()>0?(h.tipLeft=h.left+h.width-f[0],j.css({right:12,left:"auto"})):h.tipLeft=h.left},h.where=[function(){h.autoLeft(),h.tipTop=h.top-f[1]-10,j.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",b.tips[1])},function(){h.tipLeft=h.left+h.width+10,h.tipTop=h.top,j.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",b.tips[1])},function(){h.autoLeft(),h.tipTop=h.top+h.height+10,j.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",b.tips[1])},function(){h.tipLeft=h.left-f[0]-10,h.tipTop=h.top,j.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",b.tips[1])}],h.where[k-1](),1===k?h.top-(e.scrollTop()+f[1]+16)<0&&h.where[2]():2===k?e.width()-(h.left+h.width+f[0]+16)>0||h.where[3]():3===k?h.top-e.scrollTop()+h.height+f[1]+16-e.height()>0&&h.where[0]():4===k&&f[0]+16-h.left>0&&h.where[1](),c.find("."+i[5]).css({"background-color":b.tips[1],"padding-right":b.closeBtn?"30px":""}),c.css({left:h.tipLeft,top:h.tipTop})},h.pt.move=function(){var a=this,b=a.config,c={setY:0,moveLayer:function(){var a=c.layero,b=parseInt(a.css("margin-left")),d=parseInt(c.move.css("left"));0===b||(d-=b),"fixed"!==a.css("position")&&(d-=a.parent().offset().left,c.setY=0),a.css({left:d,top:parseInt(c.move.css("top"))-c.setY})}},f=a.layero.find(b.move);return b.move&&f.attr("move","ok"),f.css({cursor:b.move?"move":"auto"}),d(b.move).on("mousedown",function(a){if(a.preventDefault(),"ok"===d(this).attr("move")){c.ismove=!0,c.layero=d(this).parents("."+i[0]);var f=c.layero.offset().left,g=c.layero.offset().top,h=c.layero.outerWidth()-6,j=c.layero.outerHeight()-6;d("#layui-layer-moves")[0]||d("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+f+"px; top:"+g+"px; width:"+h+"px; height:"+j+'px; z-index:2147483584"></div>'),c.move=d("#layui-layer-moves"),b.moveType&&c.move.css({visibility:"hidden"}),c.moveX=a.pageX-c.move.position().left,c.moveY=a.pageY-c.move.position().top,"fixed"!==c.layero.css("position")||(c.setY=e.scrollTop())}}),d(document).mousemove(function(a){if(c.ismove){var d=a.pageX-c.moveX,f=a.pageY-c.moveY;if(a.preventDefault(),!b.moveOut){c.setY=e.scrollTop();var g=e.width()-c.move.outerWidth(),h=c.setY;0>d&&(d=0),d>g&&(d=g),h>f&&(f=h),f>e.height()-c.move.outerHeight()+c.setY&&(f=e.height()-c.move.outerHeight()+c.setY)}c.move.css({left:d,top:f}),b.moveType&&c.moveLayer(),d=f=g=h=null}}).mouseup(function(){try{c.ismove&&(c.moveLayer(),c.move.remove(),b.moveEnd&&b.moveEnd()),c.ismove=!1}catch(a){c.ismove=!1}}),a},h.pt.callback=function(){function e(){var b=c.cancel&&c.cancel(a.index);b===!1||g.close(a.index)}var a=this,b=a.layero,c=a.config;a.openLayer(),c.success&&(2==c.type?b.find("iframe").on("load",function(){c.success(b,a.index)}):c.success(b,a.index)),g.ie6&&a.IE6(b),b.find("."+i[6]).children("a:not(.link)").on("click",function(){var f=d(this).index();c["btn"+(f+1)]&&c["btn"+(f+1)](a.index,b),0===f?c.yes?c.yes(a.index,b):g.close(a.index):1===f?e():c["btn"+(f+1)]||g.close(a.index)}),b.find("."+i[7]).on("click",e),c.shadeClose&&d("#layui-layer-shade"+a.index).on("click",function(){g.close(a.index)}),b.find(".layui-layer-min").on("click",function(){g.min(a.index,c),c.min&&c.min(b)}),b.find(".layui-layer-max").on("click",function(){d(this).hasClass("layui-layer-maxmin")?(g.restore(a.index),c.restore&&c.restore(b)):(g.full(a.index,c),c.full&&c.full(b))}),c.end&&(f.end[a.index]=c.end)},f.reselect=function(){d.each(d("select"),function(a,b){var c=d(this);c.parents("."+i[0])[0]||1==c.attr("layer")&&d("."+i[0]).length<1&&c.removeAttr("layer").show(),c=null})},h.pt.IE6=function(a){function f(){a.css({top:c+(b.config.fix?e.scrollTop():0)})}var b=this,c=a.offset().top;f(),e.scroll(f),d("select").each(function(a,b){var c=d(this);c.parents("."+i[0])[0]||"none"===c.css("display")||c.attr({layer:"1"}).hide(),c=null})},h.pt.openLayer=function(){var a=this;g.zIndex=a.config.zIndex,g.setTop=function(a){var b=function(){g.zIndex++,a.css("z-index",g.zIndex+1)};return g.zIndex=parseInt(a[0].style.zIndex),a.on("mousedown",b),g.zIndex}},f.record=function(a){var b=[a.outerWidth(),a.outerHeight(),a.position().top,a.position().left+parseFloat(a.css("margin-left"))];a.find(".layui-layer-max").addClass("layui-layer-maxmin"),a.attr({area:b})},f.rescollbar=function(a){i.html.attr("layer-full")==a&&(i.html[0].style.removeProperty?i.html[0].style.removeProperty("overflow"):i.html[0].style.removeAttribute("overflow"),i.html.removeAttr("layer-full"))},a.layer=g,g.getChildFrame=function(a,b){return b=b||d("."+i[4]).attr("times"),d("#"+i[0]+b).find("iframe").contents().find(a)},g.getFrameIndex=function(a){return d("#"+a).parents("."+i[4]).attr("times")},g.iframeAuto=function(a){if(a){var b=g.getChildFrame("html",a).outerHeight(),c=d("#"+i[0]+a),e=c.find(i[1]).outerHeight()||0,f=c.find("."+i[6]).outerHeight()||0;c.css({height:b+e+f}),c.find("iframe").css({height:b})}},g.iframeSrc=function(a,b){d("#"+i[0]+a).find("iframe").attr("src",b)},g.style=function(a,b){var c=d("#"+i[0]+a),e=c.attr("type"),g=c.find(i[1]).outerHeight()||0,h=c.find("."+i[6]).outerHeight()||0;(e===f.type[1]||e===f.type[2])&&(c.css(b),e===f.type[2]&&c.find("iframe").css({height:parseFloat(b.height)-g-h}))},g.min=function(a,b){var c=d("#"+i[0]+a),e=c.find(i[1]).outerHeight()||0;f.record(c),g.style(a,{width:180,height:e,overflow:"hidden"}),c.find(".layui-layer-min").hide(),"page"===c.attr("type")&&c.find(i[4]).hide(),f.rescollbar(a)},g.restore=function(a){var b=d("#"+i[0]+a),c=b.attr("area").split(",");b.attr("type");g.style(a,{width:parseFloat(c[0]),height:parseFloat(c[1]),top:parseFloat(c[2]),left:parseFloat(c[3]),overflow:"visible"}),b.find(".layui-layer-max").removeClass("layui-layer-maxmin"),b.find(".layui-layer-min").show(),"page"===b.attr("type")&&b.find(i[4]).show(),f.rescollbar(a)},g.full=function(a){var c,b=d("#"+i[0]+a);f.record(b),i.html.attr("layer-full")||i.html.css("overflow","hidden").attr("layer-full",a),clearTimeout(c),c=setTimeout(function(){var c="fixed"===b.css("position");g.style(a,{top:c?0:e.scrollTop(),left:c?0:e.scrollLeft(),width:e.width(),height:e.height()}),b.find(".layui-layer-min").hide()},100)},g.title=function(a,b){var c=d("#"+i[0]+(b||g.index)).find(i[1]);c.html(a)},g.close=function(a){var b=d("#"+i[0]+a),c=b.attr("type");if(b[0]){if(c===f.type[1]&&"object"===b.attr("conType")){b.children(":not(."+i[5]+")").remove();for(var e=0;2>e;e++)b.find(".layui-layer-wrap").unwrap().hide()}else{if(c===f.type[2])try{var h=d("#"+i[4]+a)[0];h.contentWindow.document.write(""),h.contentWindow.close(),b.find("."+i[5])[0].removeChild(h)}catch(j){}b[0].innerHTML="",b.remove()}d("#layui-layer-moves, #layui-layer-shade"+a).remove(),g.ie6&&f.reselect(),f.rescollbar(a),d(document).off("keydown",f.enter),"function"==typeof f.end[a]&&f.end[a](),delete f.end[a]}},g.closeAll=function(a){d.each(d("."+i[0]),function(){var b=d(this),c=a?b.attr("type")===a:1;c&&g.close(b.attr("times")),c=null})},f.run=function(){d=jQuery,e=d(a),i.html=d("html"),g.open=function(a){var b=new h(a);return b.index}},true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return f.run(),g.use("skin/layer.css"),g}.call(exports, require, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):function(){f.run(),g.use("skin/layer.css")}()}(window);
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, require(9)))

/***/ },
/* 16 */
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, __webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, require, {}))

/***/ }
/******/ ])
/*
//@ sourceMappingURL=common.js.map
*/