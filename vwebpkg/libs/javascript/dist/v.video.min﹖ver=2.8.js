/**
 * V_Video 1.0.0
 */
! function(e, t, r, s) {
    "use strict";

    function o(t, r) {
        this._element = e(t), this._settings = e.extend({}, o._defaults, r), this._defaults = e.extend(!0, {}, o._defaults), this._name = "V_Video", this._version = "1.0.2", this._updated = "07.01.19", this.init()
    }
    o._defaults = {
        showControls: !0,
        showControlsOnHover: !0,
        controlsHoverSensitivity: 3e3,
        showScrubber: !0,
        showTimer: !1,
        showPlayPauseBtn: !0,
        showSoundControl: !1,
        showFullScreen: !1,
        keyboardControls: !0,
        themeClass: "V-VideoTheme",
        fontAwesomeControlIcons: !0,
        autoPlay: !1,
        allowPlayPause: !0,
        loop: !1,
        allowReplay: !0,
        playInModal: !1,
        showCloseBtn: !1,
        closeModalOnFinish: !1,
        gtmTagging: !1,
        gtmOptions: {},
        vimeo_url: null
    }, o.prototype.init = function() {
        var e = this;
        return e._settings.vimeo_url ? e.initVimeo() : (e._video = e._element.find("video")[0] === s ? e.createVideoTags() : e._element.find("video"), e.buildWrapper()), e._video || e._settings.vimeo_url ? void e.trigger("load_player") : (e.trigger("error"), !1)
    }, o.prototype.buildWrapper = function() {
        var t = this;
        t._video.wrap('<div class="V-VideoPlayerWrapper"><div class="V-VideoPlayer ' + t._settings.themeClass + (t._settings.fontAwesomeControlIcons ? " hasIcons" : "") + '"></div>'), t._playerWrapper = t._element.find(".V-VideoPlayer"), t._video.wrap('<div class="V-VideoHolder' + (t._settings.fontAwesomeControlIcons ? " hasIcons" : "") + '"></div>'), t._video.attr("id") || t._video.attr("id", t.generateRandomId()), t._settings.vimeo_url || (t._player = r.getElementById(t._element.find("video").attr("id"))), t._settings.playInModal && !t._settings.vimeo_url && (e("body").append('<div class="V-VideoModal" id="' + t._element.find("video").attr("id") + '_modal"><div class="videoModalHolder"></div></div>'), t._element.append('<div class="V-VideoPosterImage' + (t._settings.fontAwesomeControlIcons ? " hasIcons" : "") + '"><img src="' + t._video.attr("poster") + '" /></div>')), t._settings.showControls ? t.buildControls() : !t._settings.showControls && t._settings.allowPlayPause ? t.playpauseEvents() : t._settings.showControls || t._settings.allowPlayPause || !t._settings.autoPlay || t._settings.vimeo_url || t.startAutoPlay(), t._settings.showControls || t._settings.allowPlayPause || t._playerWrapper.addClass("noControls")
    }, o.prototype.createVideoTags = function() {
        var e = this,
            t = e._element.data();
        return t.video ? (e._element.html('<video src="' + t.video + '" playsinline type="' + t.type + '" poster="' + t.poster + '"><source src="' + t.video + '" type="' + t.type + '"></video>'), e._element.find("video")) : (console.log("There was an error loading your video"), !1)
    }, o.prototype.buildControls = function() {
        var e = this;
        e._element.find(".V-VideoPlayer").append('<div class="videocontrols' + (e._settings.fontAwesomeControlIcons ? " hasIcons" : "") + '"></div>'), e._settings.showScrubber ? e.addProgressBar() : e._element.find(".videocontrols").addClass("noProgressBar").prepend('<div id="progressSpacer" class="controlbutton"></div>'), e._settings.showTimer && e.addTimer(), e._settings.showSoundControl && e.addSoundControl(), e._settings.showFullScreen && e.addFullScreen(), e._settings.showPlayPauseBtn ? e.addPlayPauseBtn() : e._element.find(".videocontrols").addClass("noPP").prepend('<div id="playpauseHolder" class="controlbutton"></div>'), e._settings.showCloseBtn && e.addCloseBtn(), e.clickEvents()
    }, o.prototype.addProgressBar = function() {
        var e = this;
        e._element.find(".videocontrols").addClass("hasProgressBar").append('<div id="progressholder" class="controlbutton"><div id="fullvideoprogress"></div><div id="buffered"></div><div id="progress"></div><div id="progresscircle"></div></div>')
    }, o.prototype.addTimer = function() {
        var e = this;
        e._element.find(".videocontrols").addClass("hasTimer").append('<div id="timeholder" class="controlbutton"><span id="currenttime">00:00</span> / <span id="totaltime">00:00</span></div>')
    }, o.prototype.addSoundControl = function() {
        var e = this;
        e._element.find(".videocontrols").addClass("hasSound").append('<div id="soundcontrol" class="controlbutton"><span class="mutebutton' + (e._settings.fontAwesomeControlIcons ? " Icons" : "localAsset") + '">' + (e._settings.fontAwesomeControlIcons ? '<i class="stroke-icon icon-Volume"></i>' : "") + '</span><span class="soundbars"><span class="soundbar active" data-value=".25"></span><span class="soundbar active" data-value=".50"></span><span class="soundbar active" data-value=".75"></span><span class="soundbar active" data-value="1"></span></span></div>')
    }, o.prototype.addFullScreen = function() {
        var e = this;
        e._element.find(".videocontrols").addClass("hasFullScreen").append('<div id="fullscreenbutton" class="controlbutton"><span class="' + (e._settings.fontAwesomeControlIcons ? "Icons" : "localAsset") + '">' + (e._settings.fontAwesomeControlIcons ? '<i class="stroke-icons icon-FullScreen"></i>' : "") + "</span></div>")
    }, o.prototype.addPlayPauseBtn = function() {
        var e = this;
        e._element.find(".videocontrols").addClass("hasPlayPause").prepend('<div id="playpause" class="controlbutton"><span class="' + (e._settings.fontAwesomeControlIcons ? "Icons" : "localAsset") + '">' + (e._settings.fontAwesomeControlIcons ? '<i class="stroke-icons icon-Pause"></i>' : "") + "</span></div>")
    }, o.prototype.addCloseBtn = function() {
        var e = this;
        e._element.find(".V-VideoPlayerWrapper").append('<div id="closeVideo"><span class="' + (e._settings.fontAwesomeControlIcons ? "Icons" : "localAsset") + '">' + (e._settings.fontAwesomeControlIcons ? '<i class="far fa-times-circle"></i>' : "") + "</span></div>")
    }, o.prototype.clickEvents = function() {
        var t = this;
        t.playpauseEvents(), t._playerWrapper.find("#playpause").unbind("click"), t._playerWrapper.find("#playpause").on("click", function() {
            t._playerWrapper.hasClass("playing") ? t.pause() : t._playerWrapper.hasClass("finished") ? t._settings.allowReplay ? t.replay() : null : t.play()
        }), t._playerWrapper.find("#soundcontrol").unbind("click"), t._playerWrapper.find("#soundcontrol").find(".mutebutton").on("click", function() {
            t._settings.vimeo_url ? t._player.getVolume().then(function(e) {
                t.mute(0 === e)
            }) : t.mute(e(t._player).prop("muted"))
        }), t._playerWrapper.find("#soundcontrol").find(".soundbar").each(function() {
            e(this).unbind("click"), e(this).on("click", function() {
                t.adjustVolume(e(this).data("value"))
            })
        }), t._playerWrapper.find("#fullscreenbutton").unbind("click"), t._playerWrapper.find("#fullscreenbutton").on("click", function() {
            t.fullScreen()
        }), t._playerWrapper.parent().find("#closeVideo").unbind("click"), t._playerWrapper.parent().find("#closeVideo").on("click", function() {
            t.close()
        }), t._playerWrapper.find("#progressholder").unbind("mousemove"), t._playerWrapper.find("#progressholder").unbind("click"), t._playerWrapper.find("#progressholder").on("mousemove", function(e) {
            t.updateOrb(e)
        }).on("click", function(e) {
            e.stopPropagation();
            var r = e.pageX - t._playerWrapper.find("#progressholder").offset().left,
                s = t._playerWrapper.find("#progressholder").width() + parseFloat(t._playerWrapper.find("#progressholder").css("padding-right")) + parseFloat(t._playerWrapper.find("#progressholder").css("padding-left"));
            t._settings.vimeo_url ? t._player.getDuration().then(function(e) {
                t.goTo(r / s * e)
            }) : t.goTo(r / s * t._player.duration)
        }), t._settings.playInModal && !t._settings.vimeo_url && (t._element.find(".V-VideoPosterImage").unbind("click"), t._element.find(".V-VideoPosterImage").on("click", function() {
            t.openInModal()
        }))
    }, o.prototype.playpauseEvents = function() {
        var t = this;
        t._element.find(".V-VideoHolder").unbind("click"), t._element.find(".V-VideoHolder").unbind("mousemove"), t._element.find(".V-VideoHolder").unbind("mouseout"), t._element.find(".V-VideoHolder").on("click", function() {
            t._playerWrapper.hasClass("playing") ? t.pause() : t._playerWrapper.hasClass("finished") ? t._settings.allowReplay ? t.replay() : null : t.play()
        }).on("mousemove", function() {
            t._settings.showControls && t._playerWrapper.hasClass("hideOverlay") && (clearTimeout(t._motion_timer), t._playerWrapper.removeClass("hideOverlay").find(".videocontrols").removeClass("hide"))
        }).on("mouseout", function() {
            t._player.paused || t._settings.showControls && (clearTimeout(t._motion_timer), t._motion_timer = setTimeout(function() {
                t._playerWrapper.addClass("hideOverlay").find(".videocontrols").addClass("hide")
            }, t._settings.controlsHoverSensitivity))
        }), t._settings.keyboardControls && (e("body").unbind("keyup"), e("body").on("keyup", function(e) {
            32 == e.keyCode && (t._playerWrapper.hasClass("playing") ? t.pause() : t._playerWrapper.hasClass("finished") ? t._settings.allowReplay ? t.replay() : null : t.play())
        })), t._settings.autoPlay && !t._settings.vimeo_url && t.startAutoPlay()
    }, o.prototype.startAutoPlay = function() {
        var e = this;
        e._playerWrapper.addClass("playing"), e._settings.vimeo_url ? (e._player.setVolume(0), e._player.play()) : (e._player.autoplay = !0, e._player.muted = !0, e._player.load()), e._settings.showControls && (clearTimeout(e._motion_timer), e._motion_timer = setTimeout(function() {
            e._playerWrapper.addClass("hideOverlay").find(".videocontrols").addClass("hide")
        }, e._settings.controlsHoverSensitivity)), e.trigger("autoplayStart")
    }, o.prototype.play = function() {
        var e = this;
        e._playerWrapper.addClass("playing").removeClass("paused"), e._player.play(), e._settings.fontAwesomeControlIcons ? e._playerWrapper.find("#playpause").html('<span class="Icons"><i class="stroke-icons icon-Pause"></i></span>') : e._playerWrapper.find("#playpause").addClass("isPlaying"), e._settings.showControls && (e._settings.showScrubber || e._settings.showTimer) && (e._settings.vimeo_url ? (e._player.on("progress", function(t) {
            e.updateVimeoBuffer(e, t)
        }), e._player.on("timeupdate", function(t) {
            e.updateVimeoProgress(e, t)
        })) : e._progress = setInterval(function() {
            e.updateProgress(e)
        }, 100)), e._settings.showControls && (clearTimeout(e._motion_timer), e._motion_timer = setTimeout(function() {
            e._playerWrapper.addClass("hideOverlay").find(".videocontrols").addClass("hide")
        }, e._settings.controlsHoverSensitivity)), e.trigger("play")
    }, o.prototype.pause = function() {
        var e = this;
        e._playerWrapper.removeClass("playing").addClass("paused").removeClass("hideOverlay"), e._settings.fontAwesomeControlIcons ? e._playerWrapper.find("#playpause").html('<span class="Icons"><i class="stroke-icons icon-Play"></i></span>') : e._playerWrapper.find("#playpause").removeClass("isPlaying"), e._settings.showControls && (e._settings.showScrubber || e._settings.showTimer) && (clearInterval(e._progress), e._settings.vimeo_url && (e._player.off("progress"), e._player.off("timeupdate"))), e._settings.showControls && (clearTimeout(e._motion_timer), e._playerWrapper.removeClass("hideOverlay").find(".videocontrols").removeClass("hide")), e._player.pause(), e.trigger("pause")
    }, o.prototype.replay = function() {
        var e = this;
        e._settings.showControls && (e._settings.showScrubber || e._settings.showTimer) && (clearInterval(e._progress), e._settings.vimeo_url && (e._player.off("progress"), e._player.off("timeupdate"))), e._settings.showControls && (clearTimeout(e._motion_timer), e._playerWrapper.removeClass("hideOverlay").find(".videocontrols").removeClass("hide")), e._playerWrapper.removeClass("finished").find(".videocontrols").removeClass("hide"), e.goTo(0), e.play(), e.trigger("replay")
    }, o.prototype.fullScreen = function() {
        var s = this;
        s._isFs ? navigator.userAgent.toLowerCase().indexOf("safari") > -1 && navigator.userAgent.toLowerCase().indexOf("mobile") > -1 ? (s._isFs = !1, s._playerWrapper.removeClass("isFullscreen").removeClass("fallbackFS"), s.trigger("videoExitFullScreen"), e("body").removeClass("noScroll"), t.scrollTo(s._scrollPos.x, s._scrollPos.y)) : s.runPrefixMethod(r, "CancelFullScreen") : navigator.userAgent.toLowerCase().indexOf("safari") > -1 && navigator.userAgent.toLowerCase().indexOf("mobile") > -1 ? (s._playerWrapper.addClass("isFullscreen").addClass("fallbackFS"), s._scrollPos = {
            x: t.scrollX || 0,
            y: t.scrollY || 0
        }, e("body").addClass("noScroll"), s._isFs = !0, s.trigger("videoEnterFullScreen")) : (s.runPrefixMethod(navigator.userAgent.toLowerCase().indexOf("safari") > -1 ? s._settings.vimeo_url ? s._video.element : s._video[0] : s._playerWrapper[0], navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? "RequestFullScreen" : "RequestFullscreen"), r.addEventListener("webkitfullscreenchange", function() {
            s._isFs ? (s._isFs = !1, s._playerWrapper.removeClass("isFullscreen"), s.trigger("videoExitFullScreen")) : (s._isFs = !0, s._playerWrapper.addClass("isFullscreen"), s.trigger("videoEnterFullScreen"))
        }, !1), r.addEventListener("mozfullscreenchange", function() {
            s._isFs ? (s._isFs = !1, s._playerWrapper.removeClass("isFullscreen"), s.trigger("videoExitFullScreen")) : (s._isFs = !0, s._playerWrapper.addClass("isFullscreen"), s.trigger("videoEnterFullScreen"))
        }, !1), r.addEventListener("fullscreenchange", function() {
            s._isFs ? (s._isFs = !1, s._playerWrapper.removeClass("isFullscreen"), s.trigger("videoExitFullScreen")) : (s._isFs = !0, s._playerWrapper.addClass("isFullscreen"), s.trigger("videoEnterFullScreen"))
        }, !1), r.addEventListener("MSFullscreenChange", function() {
            s._isFs ? (s._isFs = !1, s._playerWrapper.removeClass("isFullscreen"), s.trigger("videoExitFullScreen")) : (s._isFs = !0, s._playerWrapper.addClass("isFullscreen"), s.trigger("videoEnterFullScreen"))
        }, !1))
    }, o.prototype.mute = function(t) {
        var r = this;
        if (t) {
            r._settings.fontAwesomeControlIcons ? r._element.find(".videocontrols").find(".mutebutton").html('<i class="stroke-icon icon-Volume"></i>') : r._element.find(".videocontrols").find(".mutebutton").removeClass("isMuted");
            var s = !0;
            r._element.find(".soundbar").each(function() {
                s && e(this).addClass("active"), parseFloat(e(this).data("value")) === parseFloat(r._element.find(".videocontrols").find(".mutebutton").data("current")) && (s = !1)
            }), r._settings.vimeo_url ? r._player.setVolume(parseFloat(r._element.find(".soundbar.active").last().data("value"))) : r._player.muted = !1, r.trigger("unmute")
        } else r._settings.vimeo_url ? r._player.setVolume(0) : r._player.muted = !0, r._settings.fontAwesomeControlIcons ? r._element.find(".videocontrols").find(".mutebutton").html('<i class="stroke-icons icon-Mute"></i>').data("current", r._element.find(".soundbar.active").last().data("value")) : r._element.find(".videocontrols").find(".mutebutton").addClass("isMuted"), r._element.find(".soundbar.active").removeClass("active"), r.trigger("mute")
    }, o.prototype.adjustVolume = function(t) {
        var r = this;
        r._settings.vimeo_url ? r._player.setVolume(parseFloat(t)) : (e(r._player).prop("muted") && (r._player.muted = !1), r._player.volume = parseFloat(t));
        var s = !0;
        r._element.find(".soundbar.active").removeClass("active"), r._element.find(".soundbar").each(function() {
            s && e(this).addClass("active"), parseFloat(e(this).data("value")) === parseFloat(t) && (s = !1)
        }), r.trigger("volume_change", {
            action: {
                name: "volume",
                value: {
                    vol: t
                }
            }
        })
    }, o.prototype.close = function() {
        var t = this;
        t._playerWrapper.hasClass("playing") && t.pause(), t._playerWrapper.removeClass("finished").find(".videocontrols").removeClass("hide"), t._settings.playInModal && (e("#" + t._video.attr("id") + "_modal").removeClass("show"), e("#" + t._video.attr("id") + "_modal").find(".videoModalHolder").empty()), t.trigger("closeVideo")
    }, o.prototype.updateProgress = function(e) {
        e._playerWrapper.find("#buffered").css("width", e._player.buffered.end(e._player.buffered.length - 1) / e._player.duration * 100 + "%"), e._playerWrapper.find("#progress").css("width", e._player.currentTime / e._player.duration * 100 + "%");
        var t = e.sformat(e._player.currentTime),
            r = e.sformat(e._player.duration);
        if (e._playerWrapper.find("#currenttime").text(t), e._playerWrapper.find("#totaltime").text(r), e._player.ended && e.videoEnded(), e._settings.gtmTagging && typeof dataLayer !== s)
            for (var o in e._settings.gtmOptions) Math.floor(e._player.currentTime / e._player.duration * 100) === parseFloat(e._settings.gtmOptions[o].time) && (e.checkTaging(e._settings.gtmOptions[o].name) || e.sendTag(e._settings.gtmOptions[o].type, name));
        e.trigger("video_progress", {
            action: {
                name: "progress",
                value: {
                    buffered: e._player.buffered.end(e._player.buffered.length - 1) / e._player.duration * 100,
                    duration: e._player.duration,
                    currentTime: e._player.currentTime / e._player.duration * 100
                }
            }
        })
    }, o.prototype.updateVimeoBuffer = function(e, t) {
        e._playerWrapper.find("#buffered").css("width", 100 * t.percent + "%");
        var r = e.sformat(t.duration);
        e._playerWrapper.find("#totaltime").text(r)
    }, o.prototype.updateVimeoProgress = function(e, t) {
        e._playerWrapper.find("#progress").css("width", 100 * t.percent + "%");
        var r = e.sformat(t.seconds);
        if (e._playerWrapper.find("#currenttime").text(r), t.duration === t.seconds && e.videoEnded(), e._settings.gtmTagging && typeof dataLayer !== s)
            for (var o in e._settings.gtmOptions) Math.floor(t.seconds / t.duration * 100) === parseFloat(e._settings.gtmOptions[o].time) && (e.checkTaging(e._settings.gtmOptions[o].name) || e.sendTag(e._settings.gtmOptions[o].type, name));
        e.trigger("video_progress_vimeo", {
            action: {
                name: "progress_vimeo",
                value: {
                    duration: t.duration,
                    currentTime: r
                }
            }
        })
    }, o.prototype.sformat = function(e) {
        var t = [Math.floor(e / 60) % 60, Math.floor(e % 60)];
        return jQuery.map(t, function(e) {
            return (10 > e ? "0" : "") + e
        }).join(":")
    }, o.prototype.updateOrb = function(e) {
        var t = this,
            r = e.pageX - t._playerWrapper.find("#progressholder").offset().left,
            s = r - t._playerWrapper.find("#progresscircle").width() / 2,
            o = t._playerWrapper.find("#progressholder").width() + parseFloat(t._playerWrapper.find("#progressholder").css("padding-right")) + parseFloat(t._playerWrapper.find("#progressholder").css("padding-left")) - t._playerWrapper.find("#progresscircle").width() / 2;
        t._playerWrapper.find("#progresscircle").css("left", s > o ? o : s + "px")
    }, o.prototype.goTo = function(e) {
        var t = this;
        t._settings.vimeo_url ? t._player.setCurrentTime(e) : (t._player.currentTime = e, t.updateProgress(t))
    }, o.prototype.videoEnded = function() {
        var e = this;
        e._playerWrapper.removeClass("playing").removeClass("paused").addClass(e._settings.closeModalOnFinish ? "closing" : "finished").removeClass("hideOverlay").find(".videocontrols").addClass("hide"), clearInterval(e._progress), e._settings.vimeo_url && (e._player.off("progress"), e._player.off("timeupdate")), clearTimeout(e._motion_timer), e._settings.loop && !e._settings.vimeo_url && e.replay(), e._settings.closeModalOnFinish && setTimeout(function() {
            e.close()
        }, 300), e.trigger("videoEnded")
    }, o.prototype.openInModal = function() {
        var t = this;
        t._playerWrapper.parent().appendTo("#" + t._video.attr("id") + "_modal .videoModalHolder"), e("#" + t._video.attr("id") + "_modal").addClass("show"), t.play(), t.clickEvents(), t.trigger("modalOpen")
    }, o.prototype.initVimeo = function() {
        var r = this;
        t.Vimeo ? r.createVimeoEmbed() : e.ajax({
            url: "https://player.vimeo.com/api/player.js",
            type: "GET",
            dataType: "script",
            success: function() {
                r.createVimeoEmbed()
            },
            error: function(e, t, r) {
                console.log("Vimeo SDK (player.js) failed to load", r)
            }
        })
    }, o.prototype.createVimeoEmbed = function() {
        var e = this;
        e._element.append('<div class="V-VideoExternalPlayer"></div>'), e._video = e._element.find(".V-VideoExternalPlayer"), e.buildWrapper();
        var s = r.createElement("iframe"),
            o = /^.*(vimeo.com\/|video\/)(\d+).*/;
        s.setAttribute("src", "https://player.vimeo.com/video/" + (e._settings.vimeo_url.match(o) ? RegExp.jQuery2 : e._settings.vimeo_url) + "?controls=0"), s.setAttribute("allowfullscreen", ""), s.setAttribute("allowtransparency", ""), s.setAttribute("allow", "autoplay"), e._element.find(".V-VideoHolder").addClass("vimeoPlayer").find(".V-VideoExternalPlayer").append(s);
        var a = new t.Vimeo.Player(s);
        e._video = a, e._player = a, e._settings.loop && e._player.setLoop(!0), e._settings.autoPlay && e.startAutoPlay(), e.trigger("vimeo_iframe")
    }, o.prototype.generateRandomId = function() {
        for (var e = this, t = "", r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", s = 0; 10 > s; s++) t += r[Math.round(Math.random() * (r.length - 1))];
        return e._settings.id = t, t
    }, o.prototype.sendTag = function(e, t) {
        var r = this,
            s = {};
        s[e] = t, dataLayer.push(s), r.trigger("sentTag")
    }, o.prototype.checkTaging = function(e) {
        if (typeof dataLayer !== s) {
            for (var t in dataLayer)
                if (dataLayer[t].event === e) return !0;
            return !1
        }
        return !0
    }, o.prototype.runPrefixMethod = function(e, t) {
        for (var r, s, o = ["webkit", "moz", "ms", "o", ""], a = 0; a < o.length && !e[r];) {
            if (r = t, "" == o[a] && (r = r.substr(0, 1).toLowerCase() + r.substr(1)), r = o[a] + r, s = typeof e[r], "undefined" != s) return o = [o[a]], "function" == s ? e[r]() : e[r];
            a++
        }
    }, o.prototype.destroy = function() {
        var t = this;
        t._player.pause(), t.goTo(0), clearInterval(t._progress), t._settings.vimeo_url && (t._player.off("progress"), t._player.off("timeupdate")), clearTimeout(t._motion_timer), e(t._element).removeData("vid.V_Video"), t.trigger("destroyed")
    }, o.prototype.update = function(e) {
        for (var t in e) t in this._settings && (this._settings[t] = e[t]);
        this.trigger("updated_settings", {
            action: {
                name: "settings",
                value: {
                    updated: e,
                    all: this._settings
                }
            }
        })
    }, o.prototype.trigger = function(t, r, s) {
        var o = e.camelCase(e.grep(["on", t, s], function(e) {
                return e
            }).join("-").toLowerCase()),
            a = e.Event([t, "vid", s || "V_Video"].join(".").toLowerCase(), e.extend({
                relatedTarget: this
            }, status, r));
        return this.register({
            name: t
        }), this._element.trigger(a), this._settings && "function" == typeof this._settings[o] && this._settings[o].call(this, a), a
    }, o.prototype.register = function(t) {
        if (e.event.special[t.name] || (e.event.special[t.name] = {}), !e.event.special[t.name].vid) {
            var r = e.event.special[t.name]._default;
            e.event.special[t.name]._default = function(e) {
                return !r || !r.apply || e.namespace && -1 !== e.namespace.indexOf("vid") ? e.namespace && e.namespace.indexOf("vid") > -1 : r.apply(this, arguments)
            }, e.event.special[t.name].vid = !0
        }
    }, e.fn.V_Video = function(t) {
        var r = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var s = e(this),
                a = s.data("vid.V_Video");
            if (a || (a = new o(this, "object" == typeof t && t), s.data("vid.V_Video", a)), "string" == typeof t) try {
                a[t].apply(a, r)
            } catch (n) {
                a.trigger("error", {
                    action: {
                        name: "update",
                        error: {
                            message: n
                        }
                    }
                })
            }
        })
    }, e.fn.V_Video.Constructor = o
}(window.jQuery, window, document);