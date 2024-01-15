/********************************************
	-	THEMEPUNCH TOOLS Ver. 1.0     -
	 Last Update of Tools 27.02.2015
*********************************************/

/*
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.6
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.skinkers.com/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function (a) {
  if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function (f) {
  var p = "left",
    o = "right",
    e = "up",
    x = "down",
    c = "in",
    z = "out",
    m = "none",
    s = "auto",
    l = "swipe",
    t = "pinch",
    A = "tap",
    j = "doubletap",
    b = "longtap",
    y = "hold",
    D = "horizontal",
    u = "vertical",
    i = "all",
    r = 10,
    g = "start",
    k = "move",
    h = "end",
    q = "cancel",
    a = "ontouchstart" in window,
    v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
    d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    B = "TouchSwipe";
  var n = {
    fingers: 1,
    threshold: 75,
    cancelThreshold: null,
    pinchThreshold: 20,
    maxTimeThreshold: null,
    fingerReleaseThreshold: 250,
    longTapThreshold: 500,
    doubleTapThreshold: 200,
    swipe: null,
    swipeLeft: null,
    swipeRight: null,
    swipeUp: null,
    swipeDown: null,
    swipeStatus: null,
    pinchIn: null,
    pinchOut: null,
    pinchStatus: null,
    click: null,
    tap: null,
    doubleTap: null,
    longTap: null,
    hold: null,
    triggerOnTouchEnd: true,
    triggerOnTouchLeave: false,
    allowPageScroll: "auto",
    fallbackToMouseEvents: true,
    excludedElements: "label, button, input, select, textarea, a, .noSwipe",
    preventDefaultEvents: true,
  };
  f.fn.swipe = function (G) {
    var F = f(this),
      E = F.data(B);
    if (E && typeof G === "string") {
      if (E[G]) {
        return E[G].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        f.error("Method " + G + " does not exist on jQuery.swipe");
      }
    } else {
      if (!E && (typeof G === "object" || !G)) {
        return w.apply(this, arguments);
      }
    }
    return F;
  };
  f.fn.swipe.defaults = n;
  f.fn.swipe.phases = {
    PHASE_START: g,
    PHASE_MOVE: k,
    PHASE_END: h,
    PHASE_CANCEL: q,
  };
  f.fn.swipe.directions = { LEFT: p, RIGHT: o, UP: e, DOWN: x, IN: c, OUT: z };
  f.fn.swipe.pageScroll = { NONE: m, HORIZONTAL: D, VERTICAL: u, AUTO: s };
  f.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: i };
  function w(E) {
    if (
      E &&
      E.allowPageScroll === undefined &&
      (E.swipe !== undefined || E.swipeStatus !== undefined)
    ) {
      E.allowPageScroll = m;
    }
    if (E.click !== undefined && E.tap === undefined) {
      E.tap = E.click;
    }
    if (!E) {
      E = {};
    }
    E = f.extend({}, f.fn.swipe.defaults, E);
    return this.each(function () {
      var G = f(this);
      var F = G.data(B);
      if (!F) {
        F = new C(this, E);
        G.data(B, F);
      }
    });
  }
  function C(a4, av) {
    var az = a || d || !av.fallbackToMouseEvents,
      J = az
        ? d
          ? v
            ? "MSPointerDown"
            : "pointerdown"
          : "touchstart"
        : "mousedown",
      ay = az
        ? d
          ? v
            ? "MSPointerMove"
            : "pointermove"
          : "touchmove"
        : "mousemove",
      U = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
      S = az ? null : "mouseleave",
      aD = d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel";
    var ag = 0,
      aP = null,
      ab = 0,
      a1 = 0,
      aZ = 0,
      G = 1,
      aq = 0,
      aJ = 0,
      M = null;
    var aR = f(a4);
    var Z = "start";
    var W = 0;
    var aQ = null;
    var T = 0,
      a2 = 0,
      a5 = 0,
      ad = 0,
      N = 0;
    var aW = null,
      af = null;
    try {
      aR.bind(J, aN);
      aR.bind(aD, a9);
    } catch (ak) {
      f.error("events not supported " + J + "," + aD + " on jQuery.swipe");
    }
    this.enable = function () {
      aR.bind(J, aN);
      aR.bind(aD, a9);
      return aR;
    };
    this.disable = function () {
      aK();
      return aR;
    };
    this.destroy = function () {
      aK();
      aR.data(B, null);
      aR = null;
    };
    this.option = function (bc, bb) {
      if (av[bc] !== undefined) {
        if (bb === undefined) {
          return av[bc];
        } else {
          av[bc] = bb;
        }
      } else {
        f.error("Option " + bc + " does not exist on jQuery.swipe.options");
      }
      return null;
    };
    function aN(bd) {
      if (aB()) {
        return;
      }
      if (f(bd.target).closest(av.excludedElements, aR).length > 0) {
        return;
      }
      var be = bd.originalEvent ? bd.originalEvent : bd;
      var bc,
        bb = a ? be.touches[0] : be;
      Z = g;
      if (a) {
        W = be.touches.length;
      } else {
        bd.preventDefault();
      }
      ag = 0;
      aP = null;
      aJ = null;
      ab = 0;
      a1 = 0;
      aZ = 0;
      G = 1;
      aq = 0;
      aQ = aj();
      M = aa();
      R();
      if (!a || W === av.fingers || av.fingers === i || aX()) {
        ai(0, bb);
        T = at();
        if (W == 2) {
          ai(1, be.touches[1]);
          a1 = aZ = au(aQ[0].start, aQ[1].start);
        }
        if (av.swipeStatus || av.pinchStatus) {
          bc = O(be, Z);
        }
      } else {
        bc = false;
      }
      if (bc === false) {
        Z = q;
        O(be, Z);
        return bc;
      } else {
        if (av.hold) {
          af = setTimeout(
            f.proxy(function () {
              aR.trigger("hold", [be.target]);
              if (av.hold) {
                bc = av.hold.call(aR, be, be.target);
              }
            }, this),
            av.longTapThreshold
          );
        }
        ao(true);
      }
      return null;
    }
    function a3(be) {
      var bh = be.originalEvent ? be.originalEvent : be;
      if (Z === h || Z === q || am()) {
        return;
      }
      var bd,
        bc = a ? bh.touches[0] : bh;
      var bf = aH(bc);
      a2 = at();
      if (a) {
        W = bh.touches.length;
      }
      if (av.hold) {
        clearTimeout(af);
      }
      Z = k;
      if (W == 2) {
        if (a1 == 0) {
          ai(1, bh.touches[1]);
          a1 = aZ = au(aQ[0].start, aQ[1].start);
        } else {
          aH(bh.touches[1]);
          aZ = au(aQ[0].end, aQ[1].end);
          aJ = ar(aQ[0].end, aQ[1].end);
        }
        G = a7(a1, aZ);
        aq = Math.abs(a1 - aZ);
      }
      if (W === av.fingers || av.fingers === i || !a || aX()) {
        aP = aL(bf.start, bf.end);
        al(be, aP);
        ag = aS(bf.start, bf.end);
        ab = aM();
        aI(aP, ag);
        if (av.swipeStatus || av.pinchStatus) {
          bd = O(bh, Z);
        }
        if (!av.triggerOnTouchEnd || av.triggerOnTouchLeave) {
          var bb = true;
          if (av.triggerOnTouchLeave) {
            var bg = aY(this);
            bb = E(bf.end, bg);
          }
          if (!av.triggerOnTouchEnd && bb) {
            Z = aC(k);
          } else {
            if (av.triggerOnTouchLeave && !bb) {
              Z = aC(h);
            }
          }
          if (Z == q || Z == h) {
            O(bh, Z);
          }
        }
      } else {
        Z = q;
        O(bh, Z);
      }
      if (bd === false) {
        Z = q;
        O(bh, Z);
      }
    }
    function L(bb) {
      var bc = bb.originalEvent;
      if (a) {
        if (bc.touches.length > 0) {
          F();
          return true;
        }
      }
      if (am()) {
        W = ad;
      }
      a2 = at();
      ab = aM();
      if (ba() || !an()) {
        Z = q;
        O(bc, Z);
      } else {
        if (
          av.triggerOnTouchEnd ||
          (av.triggerOnTouchEnd == false && Z === k)
        ) {
          bb.preventDefault();
          Z = h;
          O(bc, Z);
        } else {
          if (!av.triggerOnTouchEnd && a6()) {
            Z = h;
            aF(bc, Z, A);
          } else {
            if (Z === k) {
              Z = q;
              O(bc, Z);
            }
          }
        }
      }
      ao(false);
      return null;
    }
    function a9() {
      W = 0;
      a2 = 0;
      T = 0;
      a1 = 0;
      aZ = 0;
      G = 1;
      R();
      ao(false);
    }
    function K(bb) {
      var bc = bb.originalEvent;
      if (av.triggerOnTouchLeave) {
        Z = aC(h);
        O(bc, Z);
      }
    }
    function aK() {
      aR.unbind(J, aN);
      aR.unbind(aD, a9);
      aR.unbind(ay, a3);
      aR.unbind(U, L);
      if (S) {
        aR.unbind(S, K);
      }
      ao(false);
    }
    function aC(bf) {
      var be = bf;
      var bd = aA();
      var bc = an();
      var bb = ba();
      if (!bd || bb) {
        be = q;
      } else {
        if (
          bc &&
          bf == k &&
          (!av.triggerOnTouchEnd || av.triggerOnTouchLeave)
        ) {
          be = h;
        } else {
          if (!bc && bf == h && av.triggerOnTouchLeave) {
            be = q;
          }
        }
      }
      return be;
    }
    function O(bd, bb) {
      var bc = undefined;
      if (I() || V() || P() || aX()) {
        if (I() || V()) {
          bc = aF(bd, bb, l);
        }
        if ((P() || aX()) && bc !== false) {
          bc = aF(bd, bb, t);
        }
      } else {
        if (aG() && bc !== false) {
          bc = aF(bd, bb, j);
        } else {
          if (ap() && bc !== false) {
            bc = aF(bd, bb, b);
          } else {
            if (ah() && bc !== false) {
              bc = aF(bd, bb, A);
            }
          }
        }
      }
      if (bb === q) {
        a9(bd);
      }
      if (bb === h) {
        if (a) {
          if (bd.touches.length == 0) {
            a9(bd);
          }
        } else {
          a9(bd);
        }
      }
      return bc;
    }
    function aF(be, bb, bd) {
      var bc = undefined;
      if (bd == l) {
        aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]);
        if (av.swipeStatus) {
          bc = av.swipeStatus.call(
            aR,
            be,
            bb,
            aP || null,
            ag || 0,
            ab || 0,
            W,
            aQ
          );
          if (bc === false) {
            return false;
          }
        }
        if (bb == h && aV()) {
          aR.trigger("swipe", [aP, ag, ab, W, aQ]);
          if (av.swipe) {
            bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ);
            if (bc === false) {
              return false;
            }
          }
          switch (aP) {
            case p:
              aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]);
              if (av.swipeLeft) {
                bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
            case o:
              aR.trigger("swipeRight", [aP, ag, ab, W, aQ]);
              if (av.swipeRight) {
                bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
            case e:
              aR.trigger("swipeUp", [aP, ag, ab, W, aQ]);
              if (av.swipeUp) {
                bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
            case x:
              aR.trigger("swipeDown", [aP, ag, ab, W, aQ]);
              if (av.swipeDown) {
                bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
          }
        }
      }
      if (bd == t) {
        aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]);
        if (av.pinchStatus) {
          bc = av.pinchStatus.call(
            aR,
            be,
            bb,
            aJ || null,
            aq || 0,
            ab || 0,
            W,
            G,
            aQ
          );
          if (bc === false) {
            return false;
          }
        }
        if (bb == h && a8()) {
          switch (aJ) {
            case c:
              aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
              if (av.pinchIn) {
                bc = av.pinchIn.call(
                  aR,
                  be,
                  aJ || null,
                  aq || 0,
                  ab || 0,
                  W,
                  G,
                  aQ
                );
              }
              break;
            case z:
              aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
              if (av.pinchOut) {
                bc = av.pinchOut.call(
                  aR,
                  be,
                  aJ || null,
                  aq || 0,
                  ab || 0,
                  W,
                  G,
                  aQ
                );
              }
              break;
          }
        }
      }
      if (bd == A) {
        if (bb === q || bb === h) {
          clearTimeout(aW);
          clearTimeout(af);
          if (Y() && !H()) {
            N = at();
            aW = setTimeout(
              f.proxy(function () {
                N = null;
                aR.trigger("tap", [be.target]);
                if (av.tap) {
                  bc = av.tap.call(aR, be, be.target);
                }
              }, this),
              av.doubleTapThreshold
            );
          } else {
            N = null;
            aR.trigger("tap", [be.target]);
            if (av.tap) {
              bc = av.tap.call(aR, be, be.target);
            }
          }
        }
      } else {
        if (bd == j) {
          if (bb === q || bb === h) {
            clearTimeout(aW);
            N = null;
            aR.trigger("doubletap", [be.target]);
            if (av.doubleTap) {
              bc = av.doubleTap.call(aR, be, be.target);
            }
          }
        } else {
          if (bd == b) {
            if (bb === q || bb === h) {
              clearTimeout(aW);
              N = null;
              aR.trigger("longtap", [be.target]);
              if (av.longTap) {
                bc = av.longTap.call(aR, be, be.target);
              }
            }
          }
        }
      }
      return bc;
    }
    function an() {
      var bb = true;
      if (av.threshold !== null) {
        bb = ag >= av.threshold;
      }
      return bb;
    }
    function ba() {
      var bb = false;
      if (av.cancelThreshold !== null && aP !== null) {
        bb = aT(aP) - ag >= av.cancelThreshold;
      }
      return bb;
    }
    function ae() {
      if (av.pinchThreshold !== null) {
        return aq >= av.pinchThreshold;
      }
      return true;
    }
    function aA() {
      var bb;
      if (av.maxTimeThreshold) {
        if (ab >= av.maxTimeThreshold) {
          bb = false;
        } else {
          bb = true;
        }
      } else {
        bb = true;
      }
      return bb;
    }
    function al(bb, bc) {
      if (av.preventDefaultEvents === false) {
        return;
      }
      if (av.allowPageScroll === m) {
        bb.preventDefault();
      } else {
        var bd = av.allowPageScroll === s;
        switch (bc) {
          case p:
            if ((av.swipeLeft && bd) || (!bd && av.allowPageScroll != D)) {
              bb.preventDefault();
            }
            break;
          case o:
            if ((av.swipeRight && bd) || (!bd && av.allowPageScroll != D)) {
              bb.preventDefault();
            }
            break;
          case e:
            if ((av.swipeUp && bd) || (!bd && av.allowPageScroll != u)) {
              bb.preventDefault();
            }
            break;
          case x:
            if ((av.swipeDown && bd) || (!bd && av.allowPageScroll != u)) {
              bb.preventDefault();
            }
            break;
        }
      }
    }
    function a8() {
      var bc = aO();
      var bb = X();
      var bd = ae();
      return bc && bb && bd;
    }
    function aX() {
      return !!(av.pinchStatus || av.pinchIn || av.pinchOut);
    }
    function P() {
      return !!(a8() && aX());
    }
    function aV() {
      var be = aA();
      var bg = an();
      var bd = aO();
      var bb = X();
      var bc = ba();
      var bf = !bc && bb && bd && bg && be;
      return bf;
    }
    function V() {
      return !!(
        av.swipe ||
        av.swipeStatus ||
        av.swipeLeft ||
        av.swipeRight ||
        av.swipeUp ||
        av.swipeDown
      );
    }
    function I() {
      return !!(aV() && V());
    }
    function aO() {
      return W === av.fingers || av.fingers === i || !a;
    }
    function X() {
      return aQ[0].end.x !== 0;
    }
    function a6() {
      return !!av.tap;
    }
    function Y() {
      return !!av.doubleTap;
    }
    function aU() {
      return !!av.longTap;
    }
    function Q() {
      if (N == null) {
        return false;
      }
      var bb = at();
      return Y() && bb - N <= av.doubleTapThreshold;
    }
    function H() {
      return Q();
    }
    function ax() {
      return (W === 1 || !a) && (isNaN(ag) || ag < av.threshold);
    }
    function a0() {
      return ab > av.longTapThreshold && ag < r;
    }
    function ah() {
      return !!(ax() && a6());
    }
    function aG() {
      return !!(Q() && Y());
    }
    function ap() {
      return !!(a0() && aU());
    }
    function F() {
      a5 = at();
      ad = event.touches.length + 1;
    }
    function R() {
      a5 = 0;
      ad = 0;
    }
    function am() {
      var bb = false;
      if (a5) {
        var bc = at() - a5;
        if (bc <= av.fingerReleaseThreshold) {
          bb = true;
        }
      }
      return bb;
    }
    function aB() {
      return !!(aR.data(B + "_intouch") === true);
    }
    function ao(bb) {
      if (bb === true) {
        aR.bind(ay, a3);
        aR.bind(U, L);
        if (S) {
          aR.bind(S, K);
        }
      } else {
        aR.unbind(ay, a3, false);
        aR.unbind(U, L, false);
        if (S) {
          aR.unbind(S, K, false);
        }
      }
      aR.data(B + "_intouch", bb === true);
    }
    function ai(bc, bb) {
      var bd = bb.identifier !== undefined ? bb.identifier : 0;
      aQ[bc].identifier = bd;
      aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX;
      aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY;
      return aQ[bc];
    }
    function aH(bb) {
      var bd = bb.identifier !== undefined ? bb.identifier : 0;
      var bc = ac(bd);
      bc.end.x = bb.pageX || bb.clientX;
      bc.end.y = bb.pageY || bb.clientY;
      return bc;
    }
    function ac(bc) {
      for (var bb = 0; bb < aQ.length; bb++) {
        if (aQ[bb].identifier == bc) {
          return aQ[bb];
        }
      }
    }
    function aj() {
      var bb = [];
      for (var bc = 0; bc <= 5; bc++) {
        bb.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
      }
      return bb;
    }
    function aI(bb, bc) {
      bc = Math.max(bc, aT(bb));
      M[bb].distance = bc;
    }
    function aT(bb) {
      if (M[bb]) {
        return M[bb].distance;
      }
      return undefined;
    }
    function aa() {
      var bb = {};
      bb[p] = aw(p);
      bb[o] = aw(o);
      bb[e] = aw(e);
      bb[x] = aw(x);
      return bb;
    }
    function aw(bb) {
      return { direction: bb, distance: 0 };
    }
    function aM() {
      return a2 - T;
    }
    function au(be, bd) {
      var bc = Math.abs(be.x - bd.x);
      var bb = Math.abs(be.y - bd.y);
      return Math.round(Math.sqrt(bc * bc + bb * bb));
    }
    function a7(bb, bc) {
      var bd = (bc / bb) * 1;
      return bd.toFixed(2);
    }
    function ar() {
      if (G < 1) {
        return z;
      } else {
        return c;
      }
    }
    function aS(bc, bb) {
      return Math.round(
        Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2))
      );
    }
    function aE(be, bc) {
      var bb = be.x - bc.x;
      var bg = bc.y - be.y;
      var bd = Math.atan2(bg, bb);
      var bf = Math.round((bd * 180) / Math.PI);
      if (bf < 0) {
        bf = 360 - Math.abs(bf);
      }
      return bf;
    }
    function aL(bc, bb) {
      var bd = aE(bc, bb);
      if (bd <= 45 && bd >= 0) {
        return p;
      } else {
        if (bd <= 360 && bd >= 315) {
          return p;
        } else {
          if (bd >= 135 && bd <= 225) {
            return o;
          } else {
            if (bd > 45 && bd < 135) {
              return x;
            } else {
              return e;
            }
          }
        }
      }
    }
    function at() {
      var bb = new Date();
      return bb.getTime();
    }
    function aY(bb) {
      bb = f(bb);
      var bd = bb.offset();
      var bc = {
        left: bd.left,
        right: bd.left + bb.outerWidth(),
        top: bd.top,
        bottom: bd.top + bb.outerHeight(),
      };
      return bc;
    }
    function E(bb, bc) {
      return (
        bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom
      );
    }
  }
});

if (typeof console === "undefined") {
  var console = {};
  console.log =
    console.error =
    console.info =
    console.debug =
    console.warn =
    console.trace =
    console.dir =
    console.dirxml =
    console.group =
    console.groupEnd =
    console.time =
    console.timeEnd =
    console.assert =
    console.profile =
    console.groupCollapsed =
      function () {};
}

if (window.tplogs == true)
  try {
    console.groupCollapsed("ThemePunch GreenSocks Logs");
  } catch (e) {}

var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;

var punchgs = (window.GreenSockGlobals = {});

if (window.tplogs == true)
  try {
    console.info("Build GreenSock SandBox for ThemePunch Plugins");
    console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
  } catch (e) {}

/*!
 * VERSION: 1.16.0
 * DATE: 2015-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
(function (t, e) {
  "use strict";
  var i = (t.GreenSockGlobals = t.GreenSockGlobals || t);
  if (!i.TweenLite) {
    var s,
      r,
      n,
      a,
      o,
      l = function (t) {
        var e,
          s = t.split("."),
          r = i;
        for (e = 0; s.length > e; e++) r[s[e]] = r = r[s[e]] || {};
        return r;
      },
      h = l("com.greensock"),
      _ = 1e-10,
      u = function (t) {
        var e,
          i = [],
          s = t.length;
        for (e = 0; e !== s; i.push(t[e++]));
        return i;
      },
      m = function () {},
      f = (function () {
        var t = Object.prototype.toString,
          e = t.call([]);
        return function (i) {
          return (
            null != i &&
            (i instanceof Array ||
              ("object" == typeof i && !!i.push && t.call(i) === e))
          );
        };
      })(),
      c = {},
      p = function (s, r, n, a) {
        (this.sc = c[s] ? c[s].sc : []),
          (c[s] = this),
          (this.gsClass = null),
          (this.func = n);
        var o = [];
        (this.check = function (h) {
          for (var _, u, m, f, d = r.length, v = d; --d > -1; )
            (_ = c[r[d]] || new p(r[d], [])).gsClass
              ? ((o[d] = _.gsClass), v--)
              : h && _.sc.push(this);
          if (0 === v && n)
            for (
              u = ("com.greensock." + s).split("."),
                m = u.pop(),
                f = l(u.join("."))[m] = this.gsClass = n.apply(n, o),
                a &&
                  ((i[m] = f),
                  "function" == typeof define && define.amd
                    ? define(
                        (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                          s.split(".").pop(),
                        [],
                        function () {
                          return f;
                        }
                      )
                    : s === e &&
                      "undefined" != typeof module &&
                      module.exports &&
                      (module.exports = f)),
                d = 0;
              this.sc.length > d;
              d++
            )
              this.sc[d].check();
        }),
          this.check(!0);
      },
      d = (t._gsDefine = function (t, e, i, s) {
        return new p(t, e, i, s);
      }),
      v = (h._class = function (t, e, i) {
        return (
          (e = e || function () {}),
          d(
            t,
            [],
            function () {
              return e;
            },
            i
          ),
          e
        );
      });
    d.globals = i;
    var g = [0, 0, 1, 1],
      T = [],
      y = v(
        "easing.Ease",
        function (t, e, i, s) {
          (this._func = t),
            (this._type = i || 0),
            (this._power = s || 0),
            (this._params = e ? g.concat(e) : g);
        },
        !0
      ),
      w = (y.map = {}),
      P = (y.register = function (t, e, i, s) {
        for (
          var r,
            n,
            a,
            o,
            l = e.split(","),
            _ = l.length,
            u = (i || "easeIn,easeOut,easeInOut").split(",");
          --_ > -1;

        )
          for (
            n = l[_],
              r = s ? v("easing." + n, null, !0) : h.easing[n] || {},
              a = u.length;
            --a > -1;

          )
            (o = u[a]),
              (w[n + "." + o] =
                w[o + n] =
                r[o] =
                  t.getRatio ? t : t[o] || new t());
      });
    for (
      n = y.prototype,
        n._calcEnd = !1,
        n.getRatio = function (t) {
          if (this._func)
            return (this._params[0] = t), this._func.apply(null, this._params);
          var e = this._type,
            i = this._power,
            s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
          return (
            1 === i
              ? (s *= s)
              : 2 === i
              ? (s *= s * s)
              : 3 === i
              ? (s *= s * s * s)
              : 4 === i && (s *= s * s * s * s),
            1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
          );
        },
        s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        r = s.length;
      --r > -1;

    )
      (n = s[r] + ",Power" + r),
        P(new y(null, null, 1, r), n, "easeOut", !0),
        P(new y(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")),
        P(new y(null, null, 3, r), n, "easeInOut");
    (w.linear = h.easing.Linear.easeIn), (w.swing = h.easing.Quad.easeInOut);
    var b = v("events.EventDispatcher", function (t) {
      (this._listeners = {}), (this._eventTarget = t || this);
    });
    (n = b.prototype),
      (n.addEventListener = function (t, e, i, s, r) {
        r = r || 0;
        var n,
          l,
          h = this._listeners[t],
          _ = 0;
        for (
          null == h && (this._listeners[t] = h = []), l = h.length;
          --l > -1;

        )
          (n = h[l]),
            n.c === e && n.s === i
              ? h.splice(l, 1)
              : 0 === _ && r > n.pr && (_ = l + 1);
        h.splice(_, 0, { c: e, s: i, up: s, pr: r }),
          this !== a || o || a.wake();
      }),
      (n.removeEventListener = function (t, e) {
        var i,
          s = this._listeners[t];
        if (s)
          for (i = s.length; --i > -1; )
            if (s[i].c === e) return s.splice(i, 1), void 0;
      }),
      (n.dispatchEvent = function (t) {
        var e,
          i,
          s,
          r = this._listeners[t];
        if (r)
          for (e = r.length, i = this._eventTarget; --e > -1; )
            (s = r[e]),
              s &&
                (s.up
                  ? s.c.call(s.s || i, { type: t, target: i })
                  : s.c.call(s.s || i));
      });
    var k = t.requestAnimationFrame,
      S = t.cancelAnimationFrame,
      A =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      x = A();
    for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !k; )
      (k = t[s[r] + "RequestAnimationFrame"]),
        (S =
          t[s[r] + "CancelAnimationFrame"] ||
          t[s[r] + "CancelRequestAnimationFrame"]);
    v("Ticker", function (t, e) {
      var i,
        s,
        r,
        n,
        l,
        h = this,
        u = A(),
        f = e !== !1 && k,
        c = 500,
        p = 33,
        d = "tick",
        v = function (t) {
          var e,
            a,
            o = A() - x;
          o > c && (u += o - p),
            (x += o),
            (h.time = (x - u) / 1e3),
            (e = h.time - l),
            (!i || e > 0 || t === !0) &&
              (h.frame++, (l += e + (e >= n ? 0.004 : n - e)), (a = !0)),
            t !== !0 && (r = s(v)),
            a && h.dispatchEvent(d);
        };
      b.call(h),
        (h.time = h.frame = 0),
        (h.tick = function () {
          v(!0);
        }),
        (h.lagSmoothing = function (t, e) {
          (c = t || 1 / _), (p = Math.min(e, c, 0));
        }),
        (h.sleep = function () {
          null != r &&
            (f && S ? S(r) : clearTimeout(r),
            (s = m),
            (r = null),
            h === a && (o = !1));
        }),
        (h.wake = function () {
          null !== r ? h.sleep() : h.frame > 10 && (x = A() - c + 5),
            (s =
              0 === i
                ? m
                : f && k
                ? k
                : function (t) {
                    return setTimeout(t, 0 | (1e3 * (l - h.time) + 1));
                  }),
            h === a && (o = !0),
            v(2);
        }),
        (h.fps = function (t) {
          return arguments.length
            ? ((i = t),
              (n = 1 / (i || 60)),
              (l = this.time + n),
              h.wake(),
              void 0)
            : i;
        }),
        (h.useRAF = function (t) {
          return arguments.length ? (h.sleep(), (f = t), h.fps(i), void 0) : f;
        }),
        h.fps(t),
        setTimeout(function () {
          f && (!r || 5 > h.frame) && h.useRAF(!1);
        }, 1500);
    }),
      (n = h.Ticker.prototype = new h.events.EventDispatcher()),
      (n.constructor = h.Ticker);
    var R = v("core.Animation", function (t, e) {
      if (
        ((this.vars = e = e || {}),
        (this._duration = this._totalDuration = t || 0),
        (this._delay = Number(e.delay) || 0),
        (this._timeScale = 1),
        (this._active = e.immediateRender === !0),
        (this.data = e.data),
        (this._reversed = e.reversed === !0),
        B)
      ) {
        o || a.wake();
        var i = this.vars.useFrames ? q : B;
        i.add(this, i._time), this.vars.paused && this.paused(!0);
      }
    });
    (a = R.ticker = new h.Ticker()),
      (n = R.prototype),
      (n._dirty = n._gc = n._initted = n._paused = !1),
      (n._totalTime = n._time = 0),
      (n._rawPrevTime = -1),
      (n._next = n._last = n._onUpdate = n._timeline = n.timeline = null),
      (n._paused = !1);
    var C = function () {
      o && A() - x > 2e3 && a.wake(), setTimeout(C, 2e3);
    };
    C(),
      (n.play = function (t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (n.pause = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }),
      (n.resume = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!1);
      }),
      (n.seek = function (t, e) {
        return this.totalTime(Number(t), e !== !1);
      }),
      (n.restart = function (t, e) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(t ? -this._delay : 0, e !== !1, !0);
      }),
      (n.reverse = function (t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (n.render = function () {}),
      (n.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      }),
      (n.isActive = function () {
        var t,
          e = this._timeline,
          i = this._startTime;
        return (
          !e ||
          (!this._gc &&
            !this._paused &&
            e.isActive() &&
            (t = e.rawTime()) >= i &&
            i + this.totalDuration() / this._timeScale > t)
        );
      }),
      (n._enabled = function (t, e) {
        return (
          o || a.wake(),
          (this._gc = !t),
          (this._active = this.isActive()),
          e !== !0 &&
            (t && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !t && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (n._kill = function () {
        return this._enabled(!1, !1);
      }),
      (n.kill = function (t, e) {
        return this._kill(t, e), this;
      }),
      (n._uncache = function (t) {
        for (var e = t ? this : this.timeline; e; )
          (e._dirty = !0), (e = e.timeline);
        return this;
      }),
      (n._swapSelfInParams = function (t) {
        for (var e = t.length, i = t.concat(); --e > -1; )
          "{self}" === t[e] && (i[e] = this);
        return i;
      }),
      (n.eventCallback = function (t, e, i, s) {
        if ("on" === (t || "").substr(0, 2)) {
          var r = this.vars;
          if (1 === arguments.length) return r[t];
          null == e
            ? delete r[t]
            : ((r[t] = e),
              (r[t + "Params"] =
                f(i) && -1 !== i.join("").indexOf("{self}")
                  ? this._swapSelfInParams(i)
                  : i),
              (r[t + "Scope"] = s)),
            "onUpdate" === t && (this._onUpdate = e);
        }
        return this;
      }),
      (n.delay = function (t) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (n.duration = function (t) {
        return arguments.length
          ? ((this._duration = this._totalDuration = t),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== t &&
              this.totalTime(this._totalTime * (t / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (n.totalDuration = function (t) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(t) : this._totalDuration
        );
      }),
      (n.time = function (t, e) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(t > this._duration ? this._duration : t, e))
          : this._time;
      }),
      (n.totalTime = function (t, e, i) {
        if ((o || a.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > t && !i && (t += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var s = this._totalDuration,
              r = this._timeline;
            if (
              (t > s && !i && (t = s),
              (this._startTime =
                (this._paused ? this._pauseTime : r._time) -
                (this._reversed ? s - t : t) / this._timeScale),
              r._dirty || this._uncache(!1),
              r._timeline)
            )
              for (; r._timeline; )
                r._timeline._time !==
                  (r._startTime + r._totalTime) / r._timeScale &&
                  r.totalTime(r._totalTime, !0),
                  (r = r._timeline);
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime !== t || 0 === this._duration) &&
              (this.render(t, e, !1), z.length && $());
        }
        return this;
      }),
      (n.progress = n.totalProgress =
        function (t, e) {
          return arguments.length
            ? this.totalTime(this.duration() * t, e)
            : this._time / this.duration();
        }),
      (n.startTime = function (t) {
        return arguments.length
          ? (t !== this._startTime &&
              ((this._startTime = t),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, t - this._delay)),
            this)
          : this._startTime;
      }),
      (n.endTime = function (t) {
        return (
          this._startTime +
          (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (n.timeScale = function (t) {
        if (!arguments.length) return this._timeScale;
        if (
          ((t = t || _), this._timeline && this._timeline.smoothChildTiming)
        ) {
          var e = this._pauseTime,
            i = e || 0 === e ? e : this._timeline.totalTime();
          this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
        }
        return (this._timeScale = t), this._uncache(!1);
      }),
      (n.reversed = function (t) {
        return arguments.length
          ? (t != this._reversed &&
              ((this._reversed = t),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      }),
      (n.paused = function (t) {
        if (!arguments.length) return this._paused;
        var e,
          i,
          s = this._timeline;
        return (
          t != this._paused &&
            s &&
            (o || t || a.wake(),
            (e = s.rawTime()),
            (i = e - this._pauseTime),
            !t &&
              s.smoothChildTiming &&
              ((this._startTime += i), this._uncache(!1)),
            (this._pauseTime = t ? e : null),
            (this._paused = t),
            (this._active = this.isActive()),
            !t &&
              0 !== i &&
              this._initted &&
              this.duration() &&
              this.render(
                s.smoothChildTiming
                  ? this._totalTime
                  : (e - this._startTime) / this._timeScale,
                !0,
                !0
              )),
          this._gc && !t && this._enabled(!0, !1),
          this
        );
      });
    var D = v("core.SimpleTimeline", function (t) {
      R.call(this, 0, t),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (n = D.prototype = new R()),
      (n.constructor = D),
      (n.kill()._gc = !1),
      (n._first = n._last = n._recent = null),
      (n._sortChildren = !1),
      (n.add = n.insert =
        function (t, e) {
          var i, s;
          if (
            ((t._startTime = Number(e || 0) + t._delay),
            t._paused &&
              this !== t._timeline &&
              (t._pauseTime =
                t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
            t.timeline && t.timeline._remove(t, !0),
            (t.timeline = t._timeline = this),
            t._gc && t._enabled(!0, !0),
            (i = this._last),
            this._sortChildren)
          )
            for (s = t._startTime; i && i._startTime > s; ) i = i._prev;
          return (
            i
              ? ((t._next = i._next), (i._next = t))
              : ((t._next = this._first), (this._first = t)),
            t._next ? (t._next._prev = t) : (this._last = t),
            (t._prev = i),
            (this._recent = t),
            this._timeline && this._uncache(!0),
            this
          );
        }),
      (n._remove = function (t, e) {
        return (
          t.timeline === this &&
            (e || t._enabled(!1, !0),
            t._prev
              ? (t._prev._next = t._next)
              : this._first === t && (this._first = t._next),
            t._next
              ? (t._next._prev = t._prev)
              : this._last === t && (this._last = t._prev),
            (t._next = t._prev = t.timeline = null),
            t === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (n.render = function (t, e, i) {
        var s,
          r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; r; )
          (s = r._next),
            (r._active || (t >= r._startTime && !r._paused)) &&
              (r._reversed
                ? r.render(
                    (r._dirty ? r.totalDuration() : r._totalDuration) -
                      (t - r._startTime) * r._timeScale,
                    e,
                    i
                  )
                : r.render((t - r._startTime) * r._timeScale, e, i)),
            (r = s);
      }),
      (n.rawTime = function () {
        return o || a.wake(), this._totalTime;
      });
    var I = v(
        "TweenLite",
        function (e, i, s) {
          if (
            (R.call(this, i, s), (this.render = I.prototype.render), null == e)
          )
            throw "Cannot tween a null target.";
          this.target = e = "string" != typeof e ? e : I.selector(e) || e;
          var r,
            n,
            a,
            o =
              e.jquery ||
              (e.length &&
                e !== t &&
                e[0] &&
                (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
            l = this.vars.overwrite;
          if (
            ((this._overwrite = l =
              null == l
                ? Q[I.defaultOverwrite]
                : "number" == typeof l
                ? l >> 0
                : Q[l]),
            (o || e instanceof Array || (e.push && f(e))) &&
              "number" != typeof e[0])
          )
            for (
              this._targets = a = u(e),
                this._propLookup = [],
                this._siblings = [],
                r = 0;
              a.length > r;
              r++
            )
              (n = a[r]),
                n
                  ? "string" != typeof n
                    ? n.length &&
                      n !== t &&
                      n[0] &&
                      (n[0] === t ||
                        (n[0].nodeType && n[0].style && !n.nodeType))
                      ? (a.splice(r--, 1), (this._targets = a = a.concat(u(n))))
                      : ((this._siblings[r] = K(n, this, !1)),
                        1 === l &&
                          this._siblings[r].length > 1 &&
                          J(n, this, null, 1, this._siblings[r]))
                    : ((n = a[r--] = I.selector(n)),
                      "string" == typeof n && a.splice(r + 1, 1))
                  : a.splice(r--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = K(e, this, !1)),
              1 === l &&
                this._siblings.length > 1 &&
                J(e, this, null, 1, this._siblings);
          (this.vars.immediateRender ||
            (0 === i &&
              0 === this._delay &&
              this.vars.immediateRender !== !1)) &&
            ((this._time = -_), this.render(-this._delay));
        },
        !0
      ),
      E = function (e) {
        return (
          e &&
          e.length &&
          e !== t &&
          e[0] &&
          (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
        );
      },
      O = function (t, e) {
        var i,
          s = {};
        for (i in t)
          G[i] ||
            (i in e &&
              "transform" !== i &&
              "x" !== i &&
              "y" !== i &&
              "width" !== i &&
              "height" !== i &&
              "className" !== i &&
              "border" !== i) ||
            !(!U[i] || (U[i] && U[i]._autoCSS)) ||
            ((s[i] = t[i]), delete t[i]);
        t.css = s;
      };
    (n = I.prototype = new R()),
      (n.constructor = I),
      (n.kill()._gc = !1),
      (n.ratio = 0),
      (n._firstPT = n._targets = n._overwrittenProps = n._startAt = null),
      (n._notifyPluginsOfEnabled = n._lazy = !1),
      (I.version = "1.16.0"),
      (I.defaultEase = n._ease = new y(null, null, 1, 1)),
      (I.defaultOverwrite = "auto"),
      (I.ticker = a),
      (I.autoSleep = 120),
      (I.lagSmoothing = function (t, e) {
        a.lagSmoothing(t, e);
      }),
      (I.selector =
        t.$ ||
        t.jQuery ||
        function (e) {
          var i = t.$ || t.jQuery;
          return i
            ? ((I.selector = i), i(e))
            : "undefined" == typeof document
            ? e
            : document.querySelectorAll
            ? document.querySelectorAll(e)
            : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
        });
    var z = [],
      L = {},
      N = (I._internals = { isArray: f, isSelector: E, lazyTweens: z }),
      U = (I._plugins = {}),
      F = (N.tweenLookup = {}),
      j = 0,
      G = (N.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
      }),
      Q = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      q = (R._rootFramesTimeline = new D()),
      B = (R._rootTimeline = new D()),
      M = 30,
      $ = (N.lazyRender = function () {
        var t,
          e = z.length;
        for (L = {}; --e > -1; )
          (t = z[e]),
            t &&
              t._lazy !== !1 &&
              (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
        z.length = 0;
      });
    (B._startTime = a.time),
      (q._startTime = a.frame),
      (B._active = q._active = !0),
      setTimeout($, 1),
      (R._updateRoot = I.render =
        function () {
          var t, e, i;
          if (
            (z.length && $(),
            B.render((a.time - B._startTime) * B._timeScale, !1, !1),
            q.render((a.frame - q._startTime) * q._timeScale, !1, !1),
            z.length && $(),
            a.frame >= M)
          ) {
            M = a.frame + (parseInt(I.autoSleep, 10) || 120);
            for (i in F) {
              for (e = F[i].tweens, t = e.length; --t > -1; )
                e[t]._gc && e.splice(t, 1);
              0 === e.length && delete F[i];
            }
            if (
              ((i = B._first),
              (!i || i._paused) &&
                I.autoSleep &&
                !q._first &&
                1 === a._listeners.tick.length)
            ) {
              for (; i && i._paused; ) i = i._next;
              i || a.sleep();
            }
          }
        }),
      a.addEventListener("tick", R._updateRoot);
    var K = function (t, e, i) {
        var s,
          r,
          n = t._gsTweenID;
        if (
          (F[n || (t._gsTweenID = n = "t" + j++)] ||
            (F[n] = { target: t, tweens: [] }),
          e && ((s = F[n].tweens), (s[(r = s.length)] = e), i))
        )
          for (; --r > -1; ) s[r] === e && s.splice(r, 1);
        return F[n].tweens;
      },
      H = function (t, e, i, s) {
        var r,
          n,
          a = t.vars.onOverwrite;
        return (
          a && (r = a(t, e, i, s)),
          (a = I.onOverwrite),
          a && (n = a(t, e, i, s)),
          r !== !1 && n !== !1
        );
      },
      J = function (t, e, i, s, r) {
        var n, a, o, l;
        if (1 === s || s >= 4) {
          for (l = r.length, n = 0; l > n; n++)
            if ((o = r[n]) !== e)
              o._gc || (H(o, e) && o._enabled(!1, !1) && (a = !0));
            else if (5 === s) break;
          return a;
        }
        var h,
          u = e._startTime + _,
          m = [],
          f = 0,
          c = 0 === e._duration;
        for (n = r.length; --n > -1; )
          (o = r[n]) === e ||
            o._gc ||
            o._paused ||
            (o._timeline !== e._timeline
              ? ((h = h || V(e, 0, c)), 0 === V(o, h, c) && (m[f++] = o))
              : u >= o._startTime &&
                o._startTime + o.totalDuration() / o._timeScale > u &&
                (((c || !o._initted) && 2e-10 >= u - o._startTime) ||
                  (m[f++] = o)));
        for (n = f; --n > -1; )
          if (
            ((o = m[n]),
            2 === s && o._kill(i, t, e) && (a = !0),
            2 !== s || (!o._firstPT && o._initted))
          ) {
            if (2 !== s && !H(o, e)) continue;
            o._enabled(!1, !1) && (a = !0);
          }
        return a;
      },
      V = function (t, e, i) {
        for (
          var s = t._timeline, r = s._timeScale, n = t._startTime;
          s._timeline;

        ) {
          if (((n += s._startTime), (r *= s._timeScale), s._paused))
            return -100;
          s = s._timeline;
        }
        return (
          (n /= r),
          n > e
            ? n - e
            : (i && n === e) || (!t._initted && 2 * _ > n - e)
            ? _
            : (n += t.totalDuration() / t._timeScale / r) > e + _
            ? 0
            : n - e - _
        );
      };
    (n._init = function () {
      var t,
        e,
        i,
        s,
        r,
        n = this.vars,
        a = this._overwrittenProps,
        o = this._duration,
        l = !!n.immediateRender,
        h = n.ease;
      if (n.startAt) {
        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
          (r = {});
        for (s in n.startAt) r[s] = n.startAt[s];
        if (
          ((r.overwrite = !1),
          (r.immediateRender = !0),
          (r.lazy = l && n.lazy !== !1),
          (r.startAt = r.delay = null),
          (this._startAt = I.to(this.target, 0, r)),
          l)
        )
          if (this._time > 0) this._startAt = null;
          else if (0 !== o) return;
      } else if (n.runBackwards && 0 !== o)
        if (this._startAt)
          this._startAt.render(-1, !0),
            this._startAt.kill(),
            (this._startAt = null);
        else {
          0 !== this._time && (l = !1), (i = {});
          for (s in n) (G[s] && "autoCSS" !== s) || (i[s] = n[s]);
          if (
            ((i.overwrite = 0),
            (i.data = "isFromStart"),
            (i.lazy = l && n.lazy !== !1),
            (i.immediateRender = l),
            (this._startAt = I.to(this.target, 0, i)),
            l)
          ) {
            if (0 === this._time) return;
          } else
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
        }
      if (
        ((this._ease = h =
          h
            ? h instanceof y
              ? h
              : "function" == typeof h
              ? new y(h, n.easeParams)
              : w[h] || I.defaultEase
            : I.defaultEase),
        n.easeParams instanceof Array &&
          h.config &&
          (this._ease = h.config.apply(h, n.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (t = this._targets.length; --t > -1; )
          this._initProps(
            this._targets[t],
            (this._propLookup[t] = {}),
            this._siblings[t],
            a ? a[t] : null
          ) && (e = !0);
      else
        e = this._initProps(this.target, this._propLookup, this._siblings, a);
      if (
        (e && I._onPluginEvent("_onInitAllProps", this),
        a &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        n.runBackwards)
      )
        for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
      (this._onUpdate = n.onUpdate), (this._initted = !0);
    }),
      (n._initProps = function (e, i, s, r) {
        var n, a, o, l, h, _;
        if (null == e) return !1;
        L[e._gsTweenID] && $(),
          this.vars.css ||
            (e.style &&
              e !== t &&
              e.nodeType &&
              U.css &&
              this.vars.autoCSS !== !1 &&
              O(this.vars, e));
        for (n in this.vars) {
          if (((_ = this.vars[n]), G[n]))
            _ &&
              (_ instanceof Array || (_.push && f(_))) &&
              -1 !== _.join("").indexOf("{self}") &&
              (this.vars[n] = _ = this._swapSelfInParams(_, this));
          else if (
            U[n] &&
            (l = new U[n]())._onInitTween(e, this.vars[n], this)
          ) {
            for (
              this._firstPT = h =
                {
                  _next: this._firstPT,
                  t: l,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: !0,
                  n: n,
                  pg: !0,
                  pr: l._priority,
                },
                a = l._overwriteProps.length;
              --a > -1;

            )
              i[l._overwriteProps[a]] = this._firstPT;
            (l._priority || l._onInitAllProps) && (o = !0),
              (l._onDisable || l._onEnable) &&
                (this._notifyPluginsOfEnabled = !0);
          } else
            (this._firstPT =
              i[n] =
              h =
                {
                  _next: this._firstPT,
                  t: e,
                  p: n,
                  f: "function" == typeof e[n],
                  n: n,
                  pg: !1,
                  pr: 0,
                }),
              (h.s = h.f
                ? e[
                    n.indexOf("set") ||
                    "function" != typeof e["get" + n.substr(3)]
                      ? n
                      : "get" + n.substr(3)
                  ]()
                : parseFloat(e[n])),
              (h.c =
                "string" == typeof _ && "=" === _.charAt(1)
                  ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2))
                  : Number(_) - h.s || 0);
          h && h._next && (h._next._prev = h);
        }
        return r && this._kill(r, e)
          ? this._initProps(e, i, s, r)
          : this._overwrite > 1 &&
            this._firstPT &&
            s.length > 1 &&
            J(e, this, i, this._overwrite, s)
          ? (this._kill(i, e), this._initProps(e, i, s, r))
          : (this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (L[e._gsTweenID] = !0),
            o);
      }),
      (n.render = function (t, e, i) {
        var s,
          r,
          n,
          a,
          o = this._time,
          l = this._duration,
          h = this._rawPrevTime;
        if (t >= l)
          (this._totalTime = this._time = l),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || ((s = !0), (r = "onComplete")),
            0 === l &&
              (this._initted || !this.vars.lazy || i) &&
              (this._startTime === this._timeline._duration && (t = 0),
              (0 === t || 0 > h || (h === _ && "isPause" !== this.data)) &&
                h !== t &&
                ((i = !0), h > _ && (r = "onReverseComplete")),
              (this._rawPrevTime = a = !e || t || h === t ? t : _));
        else if (1e-7 > t)
          (this._totalTime = this._time = 0),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
            (0 !== o || (0 === l && h > 0)) &&
              ((r = "onReverseComplete"), (s = this._reversed)),
            0 > t &&
              ((this._active = !1),
              0 === l &&
                (this._initted || !this.vars.lazy || i) &&
                (h >= 0 && (h !== _ || "isPause" !== this.data) && (i = !0),
                (this._rawPrevTime = a = !e || t || h === t ? t : _))),
            this._initted || (i = !0);
        else if (((this._totalTime = this._time = t), this._easeType)) {
          var u = t / l,
            m = this._easeType,
            f = this._easePower;
          (1 === m || (3 === m && u >= 0.5)) && (u = 1 - u),
            3 === m && (u *= 2),
            1 === f
              ? (u *= u)
              : 2 === f
              ? (u *= u * u)
              : 3 === f
              ? (u *= u * u * u)
              : 4 === f && (u *= u * u * u * u),
            (this.ratio =
              1 === m ? 1 - u : 2 === m ? u : 0.5 > t / l ? u / 2 : 1 - u / 2);
        } else this.ratio = this._ease.getRatio(t / l);
        if (this._time !== o || i) {
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !i &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            )
              return (
                (this._time = this._totalTime = o),
                (this._rawPrevTime = h),
                z.push(this),
                (this._lazy = [t, e]),
                void 0
              );
            this._time && !s
              ? (this.ratio = this._ease.getRatio(this._time / l))
              : s &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== o &&
                  t >= 0 &&
                  (this._active = !0)),
              0 === o &&
                (this._startAt &&
                  (t >= 0
                    ? this._startAt.render(t, e, i)
                    : r || (r = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._time || 0 === l) &&
                  (e ||
                    this.vars.onStart.apply(
                      this.vars.onStartScope || this,
                      this.vars.onStartParams || T
                    ))),
              n = this._firstPT;
            n;

          )
            n.f
              ? n.t[n.p](n.c * this.ratio + n.s)
              : (n.t[n.p] = n.c * this.ratio + n.s),
              (n = n._next);
          this._onUpdate &&
            (0 > t &&
              this._startAt &&
              t !== -1e-4 &&
              this._startAt.render(t, e, i),
            e ||
              ((this._time !== o || s) &&
                this._onUpdate.apply(
                  this.vars.onUpdateScope || this,
                  this.vars.onUpdateParams || T
                ))),
            r &&
              (!this._gc || i) &&
              (0 > t &&
                this._startAt &&
                !this._onUpdate &&
                t !== -1e-4 &&
                this._startAt.render(t, e, i),
              s &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !e &&
                this.vars[r] &&
                this.vars[r].apply(
                  this.vars[r + "Scope"] || this,
                  this.vars[r + "Params"] || T
                ),
              0 === l &&
                this._rawPrevTime === _ &&
                a !== _ &&
                (this._rawPrevTime = 0));
        }
      }),
      (n._kill = function (t, e, i) {
        if (
          ("all" === t && (t = null),
          null == t && (null == e || e === this.target))
        )
          return (this._lazy = !1), this._enabled(!1, !1);
        e =
          "string" != typeof e
            ? e || this._targets || this.target
            : I.selector(e) || e;
        var s, r, n, a, o, l, h, _, u;
        if ((f(e) || E(e)) && "number" != typeof e[0])
          for (s = e.length; --s > -1; ) this._kill(t, e[s]) && (l = !0);
        else {
          if (this._targets) {
            for (s = this._targets.length; --s > -1; )
              if (e === this._targets[s]) {
                (o = this._propLookup[s] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (r = this._overwrittenProps[s] =
                    t ? this._overwrittenProps[s] || {} : "all");
                break;
              }
          } else {
            if (e !== this.target) return !1;
            (o = this._propLookup),
              (r = this._overwrittenProps =
                t ? this._overwrittenProps || {} : "all");
          }
          if (o) {
            if (
              ((h = t || o),
              (_ =
                t !== r &&
                "all" !== r &&
                t !== o &&
                ("object" != typeof t || !t._tempKill)),
              i && (I.onOverwrite || this.vars.onOverwrite))
            ) {
              for (n in h) o[n] && (u || (u = []), u.push(n));
              if (!H(this, i, e, u)) return !1;
            }
            for (n in h)
              (a = o[n]) &&
                (a.pg && a.t._kill(h) && (l = !0),
                (a.pg && 0 !== a.t._overwriteProps.length) ||
                  (a._prev
                    ? (a._prev._next = a._next)
                    : a === this._firstPT && (this._firstPT = a._next),
                  a._next && (a._next._prev = a._prev),
                  (a._next = a._prev = null)),
                delete o[n]),
                _ && (r[n] = 1);
            !this._firstPT && this._initted && this._enabled(!1, !1);
          }
        }
        return l;
      }),
      (n.invalidate = function () {
        return (
          this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this),
          (this._firstPT =
            this._overwrittenProps =
            this._startAt =
            this._onUpdate =
              null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          R.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -_), this.render(-this._delay)),
          this
        );
      }),
      (n._enabled = function (t, e) {
        if ((o || a.wake(), t && this._gc)) {
          var i,
            s = this._targets;
          if (s)
            for (i = s.length; --i > -1; )
              this._siblings[i] = K(s[i], this, !0);
          else this._siblings = K(this.target, this, !0);
        }
        return (
          R.prototype._enabled.call(this, t, e),
          this._notifyPluginsOfEnabled && this._firstPT
            ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            : !1
        );
      }),
      (I.to = function (t, e, i) {
        return new I(t, e, i);
      }),
      (I.from = function (t, e, i) {
        return (
          (i.runBackwards = !0),
          (i.immediateRender = 0 != i.immediateRender),
          new I(t, e, i)
        );
      }),
      (I.fromTo = function (t, e, i, s) {
        return (
          (s.startAt = i),
          (s.immediateRender =
            0 != s.immediateRender && 0 != i.immediateRender),
          new I(t, e, s)
        );
      }),
      (I.delayedCall = function (t, e, i, s, r) {
        return new I(e, 0, {
          delay: t,
          onComplete: e,
          onCompleteParams: i,
          onCompleteScope: s,
          onReverseComplete: e,
          onReverseCompleteParams: i,
          onReverseCompleteScope: s,
          immediateRender: !1,
          lazy: !1,
          useFrames: r,
          overwrite: 0,
        });
      }),
      (I.set = function (t, e) {
        return new I(t, 0, e);
      }),
      (I.getTweensOf = function (t, e) {
        if (null == t) return [];
        t = "string" != typeof t ? t : I.selector(t) || t;
        var i, s, r, n;
        if ((f(t) || E(t)) && "number" != typeof t[0]) {
          for (i = t.length, s = []; --i > -1; )
            s = s.concat(I.getTweensOf(t[i], e));
          for (i = s.length; --i > -1; )
            for (n = s[i], r = i; --r > -1; ) n === s[r] && s.splice(i, 1);
        } else
          for (s = K(t).concat(), i = s.length; --i > -1; )
            (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
        return s;
      }),
      (I.killTweensOf = I.killDelayedCallsTo =
        function (t, e, i) {
          "object" == typeof e && ((i = e), (e = !1));
          for (var s = I.getTweensOf(t, e), r = s.length; --r > -1; )
            s[r]._kill(i, t);
        });
    var W = v(
      "plugins.TweenPlugin",
      function (t, e) {
        (this._overwriteProps = (t || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = e || 0),
          (this._super = W.prototype);
      },
      !0
    );
    if (
      ((n = W.prototype),
      (W.version = "1.10.1"),
      (W.API = 2),
      (n._firstPT = null),
      (n._addTween = function (t, e, i, s, r, n) {
        var a, o;
        return null != s &&
          (a =
            "number" == typeof s || "=" !== s.charAt(1)
              ? Number(s) - i
              : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)))
          ? ((this._firstPT = o =
              {
                _next: this._firstPT,
                t: t,
                p: e,
                s: i,
                c: a,
                f: "function" == typeof t[e],
                n: r || e,
                r: n,
              }),
            o._next && (o._next._prev = o),
            o)
          : void 0;
      }),
      (n.setRatio = function (t) {
        for (var e, i = this._firstPT, s = 1e-6; i; )
          (e = i.c * t + i.s),
            i.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0),
            i.f ? i.t[i.p](e) : (i.t[i.p] = e),
            (i = i._next);
      }),
      (n._kill = function (t) {
        var e,
          i = this._overwriteProps,
          s = this._firstPT;
        if (null != t[this._propName]) this._overwriteProps = [];
        else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
        for (; s; )
          null != t[s.n] &&
            (s._next && (s._next._prev = s._prev),
            s._prev
              ? ((s._prev._next = s._next), (s._prev = null))
              : this._firstPT === s && (this._firstPT = s._next)),
            (s = s._next);
        return !1;
      }),
      (n._roundProps = function (t, e) {
        for (var i = this._firstPT; i; )
          (t[this._propName] ||
            (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
            (i.r = e),
            (i = i._next);
      }),
      (I._onPluginEvent = function (t, e) {
        var i,
          s,
          r,
          n,
          a,
          o = e._firstPT;
        if ("_onInitAllProps" === t) {
          for (; o; ) {
            for (a = o._next, s = r; s && s.pr > o.pr; ) s = s._next;
            (o._prev = s ? s._prev : n) ? (o._prev._next = o) : (r = o),
              (o._next = s) ? (s._prev = o) : (n = o),
              (o = a);
          }
          o = e._firstPT = r;
        }
        for (; o; )
          o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
            (o = o._next);
        return i;
      }),
      (W.activate = function (t) {
        for (var e = t.length; --e > -1; )
          t[e].API === W.API && (U[new t[e]()._propName] = t[e]);
        return !0;
      }),
      (d.plugin = function (t) {
        if (!(t && t.propName && t.init && t.API))
          throw "illegal plugin definition.";
        var e,
          i = t.propName,
          s = t.priority || 0,
          r = t.overwriteProps,
          n = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_roundProps",
            initAll: "_onInitAllProps",
          },
          a = v(
            "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
            function () {
              W.call(this, i, s), (this._overwriteProps = r || []);
            },
            t.global === !0
          ),
          o = (a.prototype = new W(i));
        (o.constructor = a), (a.API = t.API);
        for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
        return (a.version = t.version), W.activate([a]), a;
      }),
      (s = t._gsQueue))
    ) {
      for (r = 0; s.length > r; r++) s[r]();
      for (n in c)
        c[n].func ||
          t.console.log(
            "GSAP encountered missing dependency: com.greensock." + n
          );
    }
    o = !1;
  }
})(
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window,
  "TweenLite"
);

/*!
 * VERSION: 1.16.0
 * DATE: 2015-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TimelineLite",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (t, e, i) {
      var s = function (t) {
          e.call(this, t),
            (this._labels = {}),
            (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
            (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
            (this._sortChildren = !0),
            (this._onUpdate = this.vars.onUpdate);
          var i,
            s,
            r = this.vars;
          for (s in r)
            (i = r[s]),
              h(i) &&
                -1 !== i.join("").indexOf("{self}") &&
                (r[s] = this._swapSelfInParams(i));
          h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
        },
        r = 1e-10,
        n = i._internals,
        a = (s._internals = {}),
        o = n.isSelector,
        h = n.isArray,
        l = n.lazyTweens,
        _ = n.lazyRender,
        u = [],
        f = _gsScope._gsDefine.globals,
        p = function (t) {
          var e,
            i = {};
          for (e in t) i[e] = t[e];
          return i;
        },
        c = (a.pauseCallback = function (t, e, i, s) {
          var n,
            a = t._timeline,
            o = a._totalTime,
            h = t._startTime,
            l = t.ratio ? r : 0,
            _ = t.ratio ? 0 : r;
          if (e || !this._forcingPlayhead) {
            for (a.pause(h), n = t._prev; n && n._startTime === h; )
              (n._rawPrevTime = _), (n = n._prev);
            for (n = t._next; n && n._startTime === h; )
              (n._rawPrevTime = l), (n = n._next);
            e && e.apply(s || a, i || u), this._forcingPlayhead && a.seek(o);
          }
        }),
        m = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        d = (s.prototype = new e());
      return (
        (s.version = "1.16.0"),
        (d.constructor = s),
        (d.kill()._gc = d._forcingPlayhead = !1),
        (d.to = function (t, e, s, r) {
          var n = (s.repeat && f.TweenMax) || i;
          return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
        }),
        (d.from = function (t, e, s, r) {
          return this.add(((s.repeat && f.TweenMax) || i).from(t, e, s), r);
        }),
        (d.fromTo = function (t, e, s, r, n) {
          var a = (r.repeat && f.TweenMax) || i;
          return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
        }),
        (d.staggerTo = function (t, e, r, n, a, h, l, _) {
          var u,
            f = new s({
              onComplete: h,
              onCompleteParams: l,
              onCompleteScope: _,
              smoothChildTiming: this.smoothChildTiming,
            });
          for (
            "string" == typeof t && (t = i.selector(t) || t),
              t = t || [],
              o(t) && (t = m(t)),
              n = n || 0,
              0 > n && ((t = m(t)), t.reverse(), (n *= -1)),
              u = 0;
            t.length > u;
            u++
          )
            r.startAt && (r.startAt = p(r.startAt)), f.to(t[u], e, p(r), u * n);
          return this.add(f, a);
        }),
        (d.staggerFrom = function (t, e, i, s, r, n, a, o) {
          return (
            (i.immediateRender = 0 != i.immediateRender),
            (i.runBackwards = !0),
            this.staggerTo(t, e, i, s, r, n, a, o)
          );
        }),
        (d.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            this.staggerTo(t, e, s, r, n, a, o, h)
          );
        }),
        (d.call = function (t, e, s, r) {
          return this.add(i.delayedCall(0, t, e, s), r);
        }),
        (d.set = function (t, e, s) {
          return (
            (s = this._parseTimeOrLabel(s, 0, !0)),
            null == e.immediateRender &&
              (e.immediateRender = s === this._time && !this._paused),
            this.add(new i(t, 0, e), s)
          );
        }),
        (s.exportRoot = function (t, e) {
          (t = t || {}),
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
          var r,
            n,
            a = new s(t),
            o = a._timeline;
          for (
            null == e && (e = !0),
              o._remove(a, !0),
              a._startTime = 0,
              a._rawPrevTime = a._time = a._totalTime = o._time,
              r = o._first;
            r;

          )
            (n = r._next),
              (e && r instanceof i && r.target === r.vars.onComplete) ||
                a.add(r, r._startTime - r._delay),
              (r = n);
          return o.add(a, 0), a;
        }),
        (d.add = function (r, n, a, o) {
          var l, _, u, f, p, c;
          if (
            ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)),
            !(r instanceof t))
          ) {
            if (r instanceof Array || (r && r.push && h(r))) {
              for (
                a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0;
                _ > u;
                u++
              )
                h((f = r[u])) && (f = new s({ tweens: f })),
                  this.add(f, l),
                  "string" != typeof f &&
                    "function" != typeof f &&
                    ("sequence" === a
                      ? (l = f._startTime + f.totalDuration() / f._timeScale)
                      : "start" === a && (f._startTime -= f.delay())),
                  (l += o);
              return this._uncache(!0);
            }
            if ("string" == typeof r) return this.addLabel(r, n);
            if ("function" != typeof r)
              throw (
                "Cannot add " +
                r +
                " into the timeline; it is not a tween, timeline, function, or string."
              );
            r = i.delayedCall(0, r);
          }
          if (
            (e.prototype.add.call(this, r, n),
            (this._gc || this._time === this._duration) &&
              !this._paused &&
              this._duration < this.duration())
          )
            for (p = this, c = p.rawTime() > r._startTime; p._timeline; )
              c && p._timeline.smoothChildTiming
                ? p.totalTime(p._totalTime, !0)
                : p._gc && p._enabled(!0, !1),
                (p = p._timeline);
          return this;
        }),
        (d.remove = function (e) {
          if (e instanceof t) return this._remove(e, !1);
          if (e instanceof Array || (e && e.push && h(e))) {
            for (var i = e.length; --i > -1; ) this.remove(e[i]);
            return this;
          }
          return "string" == typeof e
            ? this.removeLabel(e)
            : this.kill(null, e);
        }),
        (d._remove = function (t, i) {
          e.prototype._remove.call(this, t, i);
          var s = this._last;
          return (
            s
              ? this._time > s._startTime + s._totalDuration / s._timeScale &&
                ((this._time = this.duration()),
                (this._totalTime = this._totalDuration))
              : (this._time =
                  this._totalTime =
                  this._duration =
                  this._totalDuration =
                    0),
            this
          );
        }),
        (d.append = function (t, e) {
          return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
        }),
        (d.insert = d.insertMultiple =
          function (t, e, i, s) {
            return this.add(t, e || 0, i, s);
          }),
        (d.appendMultiple = function (t, e, i, s) {
          return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
        }),
        (d.addLabel = function (t, e) {
          return (this._labels[t] = this._parseTimeOrLabel(e)), this;
        }),
        (d.addPause = function (t, e, s, r) {
          var n = i.delayedCall(0, c, ["{self}", e, s, r], this);
          return (n.data = "isPause"), this.add(n, t);
        }),
        (d.removeLabel = function (t) {
          return delete this._labels[t], this;
        }),
        (d.getLabelTime = function (t) {
          return null != this._labels[t] ? this._labels[t] : -1;
        }),
        (d._parseTimeOrLabel = function (e, i, s, r) {
          var n;
          if (r instanceof t && r.timeline === this) this.remove(r);
          else if (r && (r instanceof Array || (r.push && h(r))))
            for (n = r.length; --n > -1; )
              r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
          if ("string" == typeof i)
            return this._parseTimeOrLabel(
              i,
              s && "number" == typeof e && null == this._labels[i]
                ? e - this.duration()
                : 0,
              s
            );
          if (
            ((i = i || 0),
            "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
          )
            null == e && (e = this.duration());
          else {
            if (((n = e.indexOf("=")), -1 === n))
              return null == this._labels[e]
                ? s
                  ? (this._labels[e] = this.duration() + i)
                  : i
                : this._labels[e] + i;
            (i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1))),
              (e =
                n > 1
                  ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s)
                  : this.duration());
          }
          return Number(e) + i;
        }),
        (d.seek = function (t, e) {
          return this.totalTime(
            "number" == typeof t ? t : this._parseTimeOrLabel(t),
            e !== !1
          );
        }),
        (d.stop = function () {
          return this.paused(!0);
        }),
        (d.gotoAndPlay = function (t, e) {
          return this.play(t, e);
        }),
        (d.gotoAndStop = function (t, e) {
          return this.pause(t, e);
        }),
        (d.render = function (t, e, i) {
          this._gc && this._enabled(!0, !1);
          var s,
            n,
            a,
            o,
            h,
            f = this._dirty ? this.totalDuration() : this._totalDuration,
            p = this._time,
            c = this._startTime,
            m = this._timeScale,
            d = this._paused;
          if (t >= f)
            (this._totalTime = this._time = f),
              this._reversed ||
                this._hasPausedChild() ||
                ((n = !0),
                (o = "onComplete"),
                0 === this._duration &&
                  (0 === t ||
                    0 > this._rawPrevTime ||
                    this._rawPrevTime === r) &&
                  this._rawPrevTime !== t &&
                  this._first &&
                  ((h = !0),
                  this._rawPrevTime > r && (o = "onReverseComplete"))),
              (this._rawPrevTime =
                this._duration || !e || t || this._rawPrevTime === t ? t : r),
              (t = f + 1e-4);
          else if (1e-7 > t)
            if (
              ((this._totalTime = this._time = 0),
              (0 !== p ||
                (0 === this._duration &&
                  this._rawPrevTime !== r &&
                  (this._rawPrevTime > 0 ||
                    (0 > t && this._rawPrevTime >= 0)))) &&
                ((o = "onReverseComplete"), (n = this._reversed)),
              0 > t)
            )
              (this._active = !1),
                this._timeline.autoRemoveChildren && this._reversed
                  ? ((h = n = !0), (o = "onReverseComplete"))
                  : this._rawPrevTime >= 0 && this._first && (h = !0),
                (this._rawPrevTime = t);
            else {
              if (
                ((this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                0 === t && n)
              )
                for (s = this._first; s && 0 === s._startTime; )
                  s._duration || (n = !1), (s = s._next);
              (t = 0), this._initted || (h = !0);
            }
          else this._totalTime = this._time = this._rawPrevTime = t;
          if ((this._time !== p && this._first) || i || h) {
            if (
              (this._initted || (this._initted = !0),
              this._active ||
                (!this._paused &&
                  this._time !== p &&
                  t > 0 &&
                  (this._active = !0)),
              0 === p &&
                this.vars.onStart &&
                0 !== this._time &&
                (e ||
                  this.vars.onStart.apply(
                    this.vars.onStartScope || this,
                    this.vars.onStartParams || u
                  )),
              this._time >= p)
            )
              for (s = this._first; s && ((a = s._next), !this._paused || d); )
                (s._active ||
                  (s._startTime <= this._time && !s._paused && !s._gc)) &&
                  (s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = a);
            else
              for (s = this._last; s && ((a = s._prev), !this._paused || d); )
                (s._active || (p >= s._startTime && !s._paused && !s._gc)) &&
                  (s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = a);
            this._onUpdate &&
              (e ||
                (l.length && _(),
                this._onUpdate.apply(
                  this.vars.onUpdateScope || this,
                  this.vars.onUpdateParams || u
                ))),
              o &&
                (this._gc ||
                  ((c === this._startTime || m !== this._timeScale) &&
                    (0 === this._time || f >= this.totalDuration()) &&
                    (n &&
                      (l.length && _(),
                      this._timeline.autoRemoveChildren &&
                        this._enabled(!1, !1),
                      (this._active = !1)),
                    !e &&
                      this.vars[o] &&
                      this.vars[o].apply(
                        this.vars[o + "Scope"] || this,
                        this.vars[o + "Params"] || u
                      ))));
          }
        }),
        (d._hasPausedChild = function () {
          for (var t = this._first; t; ) {
            if (t._paused || (t instanceof s && t._hasPausedChild())) return !0;
            t = t._next;
          }
          return !1;
        }),
        (d.getChildren = function (t, e, s, r) {
          r = r || -9999999999;
          for (var n = [], a = this._first, o = 0; a; )
            r > a._startTime ||
              (a instanceof i
                ? e !== !1 && (n[o++] = a)
                : (s !== !1 && (n[o++] = a),
                  t !== !1 &&
                    ((n = n.concat(a.getChildren(!0, e, s))), (o = n.length)))),
              (a = a._next);
          return n;
        }),
        (d.getTweensOf = function (t, e) {
          var s,
            r,
            n = this._gc,
            a = [],
            o = 0;
          for (
            n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length;
            --r > -1;

          )
            (s[r].timeline === this || (e && this._contains(s[r]))) &&
              (a[o++] = s[r]);
          return n && this._enabled(!1, !0), a;
        }),
        (d.recent = function () {
          return this._recent;
        }),
        (d._contains = function (t) {
          for (var e = t.timeline; e; ) {
            if (e === this) return !0;
            e = e.timeline;
          }
          return !1;
        }),
        (d.shiftChildren = function (t, e, i) {
          i = i || 0;
          for (var s, r = this._first, n = this._labels; r; )
            r._startTime >= i && (r._startTime += t), (r = r._next);
          if (e) for (s in n) n[s] >= i && (n[s] += t);
          return this._uncache(!0);
        }),
        (d._kill = function (t, e) {
          if (!t && !e) return this._enabled(!1, !1);
          for (
            var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
              s = i.length,
              r = !1;
            --s > -1;

          )
            i[s]._kill(t, e) && (r = !0);
          return r;
        }),
        (d.clear = function (t) {
          var e = this.getChildren(!1, !0, !0),
            i = e.length;
          for (this._time = this._totalTime = 0; --i > -1; )
            e[i]._enabled(!1, !1);
          return t !== !1 && (this._labels = {}), this._uncache(!0);
        }),
        (d.invalidate = function () {
          for (var e = this._first; e; ) e.invalidate(), (e = e._next);
          return t.prototype.invalidate.call(this);
        }),
        (d._enabled = function (t, i) {
          if (t === this._gc)
            for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
          return e.prototype._enabled.call(this, t, i);
        }),
        (d.totalTime = function () {
          this._forcingPlayhead = !0;
          var e = t.prototype.totalTime.apply(this, arguments);
          return (this._forcingPlayhead = !1), e;
        }),
        (d.duration = function (t) {
          return arguments.length
            ? (0 !== this.duration() &&
                0 !== t &&
                this.timeScale(this._duration / t),
              this)
            : (this._dirty && this.totalDuration(), this._duration);
        }),
        (d.totalDuration = function (t) {
          if (!arguments.length) {
            if (this._dirty) {
              for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                (e = r._prev),
                  r._dirty && r.totalDuration(),
                  r._startTime > n && this._sortChildren && !r._paused
                    ? this.add(r, r._startTime - r._delay)
                    : (n = r._startTime),
                  0 > r._startTime &&
                    !r._paused &&
                    ((s -= r._startTime),
                    this._timeline.smoothChildTiming &&
                      (this._startTime += r._startTime / this._timeScale),
                    this.shiftChildren(-r._startTime, !1, -9999999999),
                    (n = 0)),
                  (i = r._startTime + r._totalDuration / r._timeScale),
                  i > s && (s = i),
                  (r = e);
              (this._duration = this._totalDuration = s), (this._dirty = !1);
            }
            return this._totalDuration;
          }
          return (
            0 !== this.totalDuration() &&
              0 !== t &&
              this.timeScale(this._totalDuration / t),
            this
          );
        }),
        (d.paused = function (e) {
          if (!e)
            for (var i = this._first, s = this._time; i; )
              i._startTime === s &&
                "isPause" === i.data &&
                (i._rawPrevTime = s),
                (i = i._next);
          return t.prototype.paused.apply(this, arguments);
        }),
        (d.usesFrames = function () {
          for (var e = this._timeline; e._timeline; ) e = e._timeline;
          return e === t._rootFramesTimeline;
        }),
        (d.rawTime = function () {
          return this._paused
            ? this._totalTime
            : (this._timeline.rawTime() - this._startTime) * this._timeScale;
        }),
        s
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t) {
    "use strict";
    var e = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[t];
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], e)
      : "undefined" != typeof module &&
        module.exports &&
        (require("./TweenLite.js"), (module.exports = e()));
  })("TimelineLite");

/*!
 /*!
 * VERSION: beta 1.15.2
 * DATE: 2015-01-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "easing.Back",
    ["easing.Ease"],
    function (t) {
      var e,
        i,
        s,
        r = _gsScope.GreenSockGlobals || _gsScope,
        n = r.com.greensock,
        a = 2 * Math.PI,
        o = Math.PI / 2,
        h = n._class,
        l = function (e, i) {
          var s = h("easing." + e, function () {}, !0),
            r = (s.prototype = new t());
          return (r.constructor = s), (r.getRatio = i), s;
        },
        _ = t.register || function () {},
        u = function (t, e, i, s) {
          var r = h(
            "easing." + t,
            { easeOut: new e(), easeIn: new i(), easeInOut: new s() },
            !0
          );
          return _(r, t), r;
        },
        c = function (t, e, i) {
          (this.t = t),
            (this.v = e),
            i &&
              ((this.next = i),
              (i.prev = this),
              (this.c = i.v - e),
              (this.gap = i.t - t));
        },
        f = function (e, i) {
          var s = h(
              "easing." + e,
              function (t) {
                (this._p1 = t || 0 === t ? t : 1.70158),
                  (this._p2 = 1.525 * this._p1);
              },
              !0
            ),
            r = (s.prototype = new t());
          return (
            (r.constructor = s),
            (r.getRatio = i),
            (r.config = function (t) {
              return new s(t);
            }),
            s
          );
        },
        p = u(
          "Back",
          f("BackOut", function (t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
          }),
          f("BackIn", function (t) {
            return t * t * ((this._p1 + 1) * t - this._p1);
          }),
          f("BackInOut", function (t) {
            return 1 > (t *= 2)
              ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
              : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
          })
        ),
        m = h(
          "easing.SlowMo",
          function (t, e, i) {
            (e = e || 0 === e ? e : 0.7),
              null == t ? (t = 0.7) : t > 1 && (t = 1),
              (this._p = 1 !== t ? e : 0),
              (this._p1 = (1 - t) / 2),
              (this._p2 = t),
              (this._p3 = this._p1 + this._p2),
              (this._calcEnd = i === !0);
          },
          !0
        ),
        d = (m.prototype = new t());
      return (
        (d.constructor = m),
        (d.getRatio = function (t) {
          var e = t + (0.5 - t) * this._p;
          return this._p1 > t
            ? this._calcEnd
              ? 1 - (t = 1 - t / this._p1) * t
              : e - (t = 1 - t / this._p1) * t * t * t * e
            : t > this._p3
            ? this._calcEnd
              ? 1 - (t = (t - this._p3) / this._p1) * t
              : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
            : this._calcEnd
            ? 1
            : e;
        }),
        (m.ease = new m(0.7, 0.7)),
        (d.config = m.config =
          function (t, e, i) {
            return new m(t, e, i);
          }),
        (e = h(
          "easing.SteppedEase",
          function (t) {
            (t = t || 1), (this._p1 = 1 / t), (this._p2 = t + 1);
          },
          !0
        )),
        (d = e.prototype = new t()),
        (d.constructor = e),
        (d.getRatio = function (t) {
          return (
            0 > t ? (t = 0) : t >= 1 && (t = 0.999999999),
            ((this._p2 * t) >> 0) * this._p1
          );
        }),
        (d.config = e.config =
          function (t) {
            return new e(t);
          }),
        (i = h(
          "easing.RoughEase",
          function (e) {
            e = e || {};
            for (
              var i,
                s,
                r,
                n,
                a,
                o,
                h = e.taper || "none",
                l = [],
                _ = 0,
                u = 0 | (e.points || 20),
                f = u,
                p = e.randomize !== !1,
                m = e.clamp === !0,
                d = e.template instanceof t ? e.template : null,
                g = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
              --f > -1;

            )
              (i = p ? Math.random() : (1 / u) * f),
                (s = d ? d.getRatio(i) : i),
                "none" === h
                  ? (r = g)
                  : "out" === h
                  ? ((n = 1 - i), (r = n * n * g))
                  : "in" === h
                  ? (r = i * i * g)
                  : 0.5 > i
                  ? ((n = 2 * i), (r = 0.5 * n * n * g))
                  : ((n = 2 * (1 - i)), (r = 0.5 * n * n * g)),
                p
                  ? (s += Math.random() * r - 0.5 * r)
                  : f % 2
                  ? (s += 0.5 * r)
                  : (s -= 0.5 * r),
                m && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                (l[_++] = { x: i, y: s });
            for (
              l.sort(function (t, e) {
                return t.x - e.x;
              }),
                o = new c(1, 1, null),
                f = u;
              --f > -1;

            )
              (a = l[f]), (o = new c(a.x, a.y, o));
            this._prev = new c(0, 0, 0 !== o.t ? o : o.next);
          },
          !0
        )),
        (d = i.prototype = new t()),
        (d.constructor = i),
        (d.getRatio = function (t) {
          var e = this._prev;
          if (t > e.t) {
            for (; e.next && t >= e.t; ) e = e.next;
            e = e.prev;
          } else for (; e.prev && e.t >= t; ) e = e.prev;
          return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
        }),
        (d.config = function (t) {
          return new i(t);
        }),
        (i.ease = new i()),
        u(
          "Bounce",
          l("BounceOut", function (t) {
            return 1 / 2.75 > t
              ? 7.5625 * t * t
              : 2 / 2.75 > t
              ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
              : 2.5 / 2.75 > t
              ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
              : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
          }),
          l("BounceIn", function (t) {
            return 1 / 2.75 > (t = 1 - t)
              ? 1 - 7.5625 * t * t
              : 2 / 2.75 > t
              ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
              : 2.5 / 2.75 > t
              ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
              : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
          }),
          l("BounceInOut", function (t) {
            var e = 0.5 > t;
            return (
              (t = e ? 1 - 2 * t : 2 * t - 1),
              (t =
                1 / 2.75 > t
                  ? 7.5625 * t * t
                  : 2 / 2.75 > t
                  ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                  : 2.5 / 2.75 > t
                  ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                  : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
              e ? 0.5 * (1 - t) : 0.5 * t + 0.5
            );
          })
        ),
        u(
          "Circ",
          l("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t);
          }),
          l("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
          }),
          l("CircInOut", function (t) {
            return 1 > (t *= 2)
              ? -0.5 * (Math.sqrt(1 - t * t) - 1)
              : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
          })
        ),
        (s = function (e, i, s) {
          var r = h(
              "easing." + e,
              function (t, e) {
                (this._p1 = t >= 1 ? t : 1),
                  (this._p2 = (e || s) / (1 > t ? t : 1)),
                  (this._p3 = (this._p2 / a) * (Math.asin(1 / this._p1) || 0)),
                  (this._p2 = a / this._p2);
              },
              !0
            ),
            n = (r.prototype = new t());
          return (
            (n.constructor = r),
            (n.getRatio = i),
            (n.config = function (t, e) {
              return new r(t, e);
            }),
            r
          );
        }),
        u(
          "Elastic",
          s(
            "ElasticOut",
            function (t) {
              return (
                this._p1 *
                  Math.pow(2, -10 * t) *
                  Math.sin((t - this._p3) * this._p2) +
                1
              );
            },
            0.3
          ),
          s(
            "ElasticIn",
            function (t) {
              return -(
                this._p1 *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t - this._p3) * this._p2)
              );
            },
            0.3
          ),
          s(
            "ElasticInOut",
            function (t) {
              return 1 > (t *= 2)
                ? -0.5 *
                    this._p1 *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin((t - this._p3) * this._p2)
                : 0.5 *
                    this._p1 *
                    Math.pow(2, -10 * (t -= 1)) *
                    Math.sin((t - this._p3) * this._p2) +
                    1;
            },
            0.45
          )
        ),
        u(
          "Expo",
          l("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t);
          }),
          l("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - 0.001;
          }),
          l("ExpoInOut", function (t) {
            return 1 > (t *= 2)
              ? 0.5 * Math.pow(2, 10 * (t - 1))
              : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
          })
        ),
        u(
          "Sine",
          l("SineOut", function (t) {
            return Math.sin(t * o);
          }),
          l("SineIn", function (t) {
            return -Math.cos(t * o) + 1;
          }),
          l("SineInOut", function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
          })
        ),
        h(
          "easing.EaseLookup",
          {
            find: function (e) {
              return t.map[e];
            },
          },
          !0
        ),
        _(r.SlowMo, "SlowMo", "ease,"),
        _(i, "RoughEase", "ease,"),
        _(e, "SteppedEase", "ease,"),
        p
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()();

/*!
 * VERSION: 1.16.0
 * DATE: 2015-03-01
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "plugins.CSSPlugin",
    ["plugins.TweenPlugin", "TweenLite"],
    function (t, e) {
      var i,
        r,
        s,
        n,
        a = function () {
          t.call(this, "css"),
            (this._overwriteProps.length = 0),
            (this.setRatio = a.prototype.setRatio);
        },
        o = _gsScope._gsDefine.globals,
        l = {},
        h = (a.prototype = new t("css"));
      (h.constructor = a),
        (a.version = "1.16.0"),
        (a.API = 2),
        (a.defaultTransformPerspective = 0),
        (a.defaultSkewType = "compensated"),
        (h = "px"),
        (a.suffixMap = {
          top: h,
          right: h,
          bottom: h,
          left: h,
          width: h,
          height: h,
          fontSize: h,
          padding: h,
          margin: h,
          perspective: h,
          lineHeight: "",
        });
      var u,
        f,
        p,
        c,
        _,
        d,
        m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
        g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        x = /(?:\d|\-|\+|=|#|\.)*/g,
        T = /opacity *= *([^)]*)/i,
        w = /opacity:([^;]*)/i,
        b = /alpha\(opacity *=.+?\)/i,
        P = /^(rgb|hsl)/,
        S = /([A-Z])/g,
        C = /-([a-z])/gi,
        O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        k = function (t, e) {
          return e.toUpperCase();
        },
        R = /(?:Left|Right|Width)/i,
        A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        D = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        M = /,(?=[^\)]*(?:\(|$))/gi,
        N = Math.PI / 180,
        L = 180 / Math.PI,
        X = {},
        z = document,
        F = function (t) {
          return z.createElementNS
            ? z.createElementNS("http://www.w3.org/1999/xhtml", t)
            : z.createElement(t);
        },
        I = F("div"),
        E = F("img"),
        Y = (a._internals = { _specialProps: l }),
        B = navigator.userAgent,
        U = (function () {
          var t = B.indexOf("Android"),
            e = F("a");
          return (
            (p =
              -1 !== B.indexOf("Safari") &&
              -1 === B.indexOf("Chrome") &&
              (-1 === t || Number(B.substr(t + 8, 1)) > 3)),
            (_ = p && 6 > Number(B.substr(B.indexOf("Version/") + 8, 1))),
            (c = -1 !== B.indexOf("Firefox")),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B)) &&
              (d = parseFloat(RegExp.$1)),
            e
              ? ((e.style.cssText = "top:1px;opacity:.55;"),
                /^0.55/.test(e.style.opacity))
              : !1
          );
        })(),
        j = function (t) {
          return T.test(
            "string" == typeof t
              ? t
              : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || ""
          )
            ? parseFloat(RegExp.$1) / 100
            : 1;
        },
        V = function (t) {
          window.console && console.log(t);
        },
        W = "",
        q = "",
        G = function (t, e) {
          e = e || I;
          var i,
            r,
            s = e.style;
          if (void 0 !== s[t]) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1),
              i = ["O", "Moz", "ms", "Ms", "Webkit"],
              r = 5;
            --r > -1 && void 0 === s[i[r] + t];

          );
          return r >= 0
            ? ((q = 3 === r ? "ms" : i[r]),
              (W = "-" + q.toLowerCase() + "-"),
              q + t)
            : null;
        },
        H = z.defaultView ? z.defaultView.getComputedStyle : function () {},
        Q = (a.getStyle = function (t, e, i, r, s) {
          var n;
          return U || "opacity" !== e
            ? (!r && t.style[e]
                ? (n = t.style[e])
                : (i = i || H(t))
                ? (n =
                    i[e] ||
                    i.getPropertyValue(e) ||
                    i.getPropertyValue(e.replace(S, "-$1").toLowerCase()))
                : t.currentStyle && (n = t.currentStyle[e]),
              null == s ||
              (n && "none" !== n && "auto" !== n && "auto auto" !== n)
                ? n
                : s)
            : j(t);
        }),
        Z = (Y.convertToPixels = function (t, i, r, s, n) {
          if ("px" === s || !s) return r;
          if ("auto" === s || !r) return 0;
          var o,
            l,
            h,
            u = R.test(i),
            f = t,
            p = I.style,
            c = 0 > r;
          if ((c && (r = -r), "%" === s && -1 !== i.indexOf("border")))
            o = (r / 100) * (u ? t.clientWidth : t.clientHeight);
          else {
            if (
              ((p.cssText =
                "border:0 solid red;position:" +
                Q(t, "position") +
                ";line-height:0;"),
              "%" !== s && f.appendChild)
            )
              p[u ? "borderLeftWidth" : "borderTopWidth"] = r + s;
            else {
              if (
                ((f = t.parentNode || z.body),
                (l = f._gsCache),
                (h = e.ticker.frame),
                l && u && l.time === h)
              )
                return (l.width * r) / 100;
              p[u ? "width" : "height"] = r + s;
            }
            f.appendChild(I),
              (o = parseFloat(I[u ? "offsetWidth" : "offsetHeight"])),
              f.removeChild(I),
              u &&
                "%" === s &&
                a.cacheWidths !== !1 &&
                ((l = f._gsCache = f._gsCache || {}),
                (l.time = h),
                (l.width = 100 * (o / r))),
              0 !== o || n || (o = Z(t, i, r, s, !0));
          }
          return c ? -o : o;
        }),
        $ = (Y.calculateOffset = function (t, e, i) {
          if ("absolute" !== Q(t, "position", i)) return 0;
          var r = "left" === e ? "Left" : "Top",
            s = Q(t, "margin" + r, i);
          return (
            t["offset" + r] - (Z(t, e, parseFloat(s), s.replace(x, "")) || 0)
          );
        }),
        K = function (t, e) {
          var i,
            r,
            s,
            n = {};
          if ((e = e || H(t, null)))
            if ((i = e.length))
              for (; --i > -1; )
                (s = e[i]),
                  (-1 === s.indexOf("-transform") || be === s) &&
                    (n[s.replace(C, k)] = e.getPropertyValue(s));
            else
              for (i in e)
                (-1 === i.indexOf("Transform") || we === i) && (n[i] = e[i]);
          else if ((e = t.currentStyle || t.style))
            for (i in e)
              "string" == typeof i &&
                void 0 === n[i] &&
                (n[i.replace(C, k)] = e[i]);
          return (
            U || (n.opacity = j(t)),
            (r = Me(t, e, !1)),
            (n.rotation = r.rotation),
            (n.skewX = r.skewX),
            (n.scaleX = r.scaleX),
            (n.scaleY = r.scaleY),
            (n.x = r.x),
            (n.y = r.y),
            Se &&
              ((n.z = r.z),
              (n.rotationX = r.rotationX),
              (n.rotationY = r.rotationY),
              (n.scaleZ = r.scaleZ)),
            n.filters && delete n.filters,
            n
          );
        },
        J = function (t, e, i, r, s) {
          var n,
            a,
            o,
            l = {},
            h = t.style;
          for (a in i)
            "cssText" !== a &&
              "length" !== a &&
              isNaN(a) &&
              (e[a] !== (n = i[a]) || (s && s[a])) &&
              -1 === a.indexOf("Origin") &&
              ("number" == typeof n || "string" == typeof n) &&
              ((l[a] =
                "auto" !== n || ("left" !== a && "top" !== a)
                  ? ("" !== n && "auto" !== n && "none" !== n) ||
                    "string" != typeof e[a] ||
                    "" === e[a].replace(y, "")
                    ? n
                    : 0
                  : $(t, a)),
              void 0 !== h[a] && (o = new ce(h, a, h[a], o)));
          if (r) for (a in r) "className" !== a && (l[a] = r[a]);
          return { difs: l, firstMPT: o };
        },
        te = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
        ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ie = function (t, e, i) {
          var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
            s = te[e],
            n = s.length;
          for (i = i || H(t, null); --n > -1; )
            (r -= parseFloat(Q(t, "padding" + s[n], i, !0)) || 0),
              (r -= parseFloat(Q(t, "border" + s[n] + "Width", i, !0)) || 0);
          return r;
        },
        re = function (t, e) {
          (null == t || "" === t || "auto" === t || "auto auto" === t) &&
            (t = "0 0");
          var i = t.split(" "),
            r =
              -1 !== t.indexOf("left")
                ? "0%"
                : -1 !== t.indexOf("right")
                ? "100%"
                : i[0],
            s =
              -1 !== t.indexOf("top")
                ? "0%"
                : -1 !== t.indexOf("bottom")
                ? "100%"
                : i[1];
          return (
            null == s
              ? (s = "center" === r ? "50%" : "0")
              : "center" === s && (s = "50%"),
            ("center" === r ||
              (isNaN(parseFloat(r)) && -1 === (r + "").indexOf("="))) &&
              (r = "50%"),
            e &&
              ((e.oxp = -1 !== r.indexOf("%")),
              (e.oyp = -1 !== s.indexOf("%")),
              (e.oxr = "=" === r.charAt(1)),
              (e.oyr = "=" === s.charAt(1)),
              (e.ox = parseFloat(r.replace(y, ""))),
              (e.oy = parseFloat(s.replace(y, "")))),
            r + " " + s + (i.length > 2 ? " " + i[2] : "")
          );
        },
        se = function (t, e) {
          return "string" == typeof t && "=" === t.charAt(1)
            ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
            : parseFloat(t) - parseFloat(e);
        },
        ne = function (t, e) {
          return null == t
            ? e
            : "string" == typeof t && "=" === t.charAt(1)
            ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e
            : parseFloat(t);
        },
        ae = function (t, e, i, r) {
          var s,
            n,
            a,
            o,
            l,
            h = 1e-6;
          return (
            null == t
              ? (o = e)
              : "number" == typeof t
              ? (o = t)
              : ((s = 360),
                (n = t.split("_")),
                (l = "=" === t.charAt(1)),
                (a =
                  (l
                    ? parseInt(t.charAt(0) + "1", 10) *
                      parseFloat(n[0].substr(2))
                    : parseFloat(n[0])) *
                    (-1 === t.indexOf("rad") ? 1 : L) -
                  (l ? 0 : e)),
                n.length &&
                  (r && (r[i] = e + a),
                  -1 !== t.indexOf("short") &&
                    ((a %= s),
                    a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)),
                  -1 !== t.indexOf("_cw") && 0 > a
                    ? (a = ((a + 9999999999 * s) % s) - (0 | (a / s)) * s)
                    : -1 !== t.indexOf("ccw") &&
                      a > 0 &&
                      (a = ((a - 9999999999 * s) % s) - (0 | (a / s)) * s)),
                (o = e + a)),
            h > o && o > -h && (o = 0),
            o
          );
        },
        oe = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          fuchsia: [255, 0, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0],
        },
        le = function (t, e, i) {
          return (
            (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t),
            0 |
              (255 *
                (1 > 6 * t
                  ? e + 6 * (i - e) * t
                  : 0.5 > t
                  ? i
                  : 2 > 3 * t
                  ? e + 6 * (i - e) * (2 / 3 - t)
                  : e) +
                0.5)
          );
        },
        he = (a.parseColor = function (t) {
          var e, i, r, s, n, a;
          return t && "" !== t
            ? "number" == typeof t
              ? [t >> 16, 255 & (t >> 8), 255 & t]
              : ("," === t.charAt(t.length - 1) &&
                  (t = t.substr(0, t.length - 1)),
                oe[t]
                  ? oe[t]
                  : "#" === t.charAt(0)
                  ? (4 === t.length &&
                      ((e = t.charAt(1)),
                      (i = t.charAt(2)),
                      (r = t.charAt(3)),
                      (t = "#" + e + e + i + i + r + r)),
                    (t = parseInt(t.substr(1), 16)),
                    [t >> 16, 255 & (t >> 8), 255 & t])
                  : "hsl" === t.substr(0, 3)
                  ? ((t = t.match(m)),
                    (s = (Number(t[0]) % 360) / 360),
                    (n = Number(t[1]) / 100),
                    (a = Number(t[2]) / 100),
                    (i = 0.5 >= a ? a * (n + 1) : a + n - a * n),
                    (e = 2 * a - i),
                    t.length > 3 && (t[3] = Number(t[3])),
                    (t[0] = le(s + 1 / 3, e, i)),
                    (t[1] = le(s, e, i)),
                    (t[2] = le(s - 1 / 3, e, i)),
                    t)
                  : ((t = t.match(m) || oe.transparent),
                    (t[0] = Number(t[0])),
                    (t[1] = Number(t[1])),
                    (t[2] = Number(t[2])),
                    t.length > 3 && (t[3] = Number(t[3])),
                    t))
            : oe.black;
        }),
        ue = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
      for (h in oe) ue += "|" + h + "\\b";
      ue = RegExp(ue + ")", "gi");
      var fe = function (t, e, i, r) {
          if (null == t)
            return function (t) {
              return t;
            };
          var s,
            n = e ? (t.match(ue) || [""])[0] : "",
            a = t.split(n).join("").match(v) || [],
            o = t.substr(0, t.indexOf(a[0])),
            l = ")" === t.charAt(t.length - 1) ? ")" : "",
            h = -1 !== t.indexOf(" ") ? " " : ",",
            u = a.length,
            f = u > 0 ? a[0].replace(m, "") : "";
          return u
            ? (s = e
                ? function (t) {
                    var e, p, c, _;
                    if ("number" == typeof t) t += f;
                    else if (r && M.test(t)) {
                      for (
                        _ = t.replace(M, "|").split("|"), c = 0;
                        _.length > c;
                        c++
                      )
                        _[c] = s(_[c]);
                      return _.join(",");
                    }
                    if (
                      ((e = (t.match(ue) || [n])[0]),
                      (p = t.split(e).join("").match(v) || []),
                      (c = p.length),
                      u > c--)
                    )
                      for (; u > ++c; ) p[c] = i ? p[0 | ((c - 1) / 2)] : a[c];
                    return (
                      o +
                      p.join(h) +
                      h +
                      e +
                      l +
                      (-1 !== t.indexOf("inset") ? " inset" : "")
                    );
                  }
                : function (t) {
                    var e, n, p;
                    if ("number" == typeof t) t += f;
                    else if (r && M.test(t)) {
                      for (
                        n = t.replace(M, "|").split("|"), p = 0;
                        n.length > p;
                        p++
                      )
                        n[p] = s(n[p]);
                      return n.join(",");
                    }
                    if (((e = t.match(v) || []), (p = e.length), u > p--))
                      for (; u > ++p; ) e[p] = i ? e[0 | ((p - 1) / 2)] : a[p];
                    return o + e.join(h) + l;
                  })
            : function (t) {
                return t;
              };
        },
        pe = function (t) {
          return (
            (t = t.split(",")),
            function (e, i, r, s, n, a, o) {
              var l,
                h = (i + "").split(" ");
              for (o = {}, l = 0; 4 > l; l++)
                o[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
              return s.parse(e, o, n, a);
            }
          );
        },
        ce =
          ((Y._setPluginRatio = function (t) {
            this.plugin.setRatio(t);
            for (
              var e,
                i,
                r,
                s,
                n = this.data,
                a = n.proxy,
                o = n.firstMPT,
                l = 1e-6;
              o;

            )
              (e = a[o.v]),
                o.r ? (e = Math.round(e)) : l > e && e > -l && (e = 0),
                (o.t[o.p] = e),
                (o = o._next);
            if ((n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t))
              for (o = n.firstMPT; o; ) {
                if (((i = o.t), i.type)) {
                  if (1 === i.type) {
                    for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++)
                      s += i["xn" + r] + i["xs" + (r + 1)];
                    i.e = s;
                  }
                } else i.e = i.s + i.xs0;
                o = o._next;
              }
          }),
          function (t, e, i, r, s) {
            (this.t = t),
              (this.p = e),
              (this.v = i),
              (this.r = s),
              r && ((r._prev = this), (this._next = r));
          }),
        _e =
          ((Y._parseToProxy = function (t, e, i, r, s, n) {
            var a,
              o,
              l,
              h,
              u,
              f = r,
              p = {},
              c = {},
              _ = i._transform,
              d = X;
            for (
              i._transform = null,
                X = e,
                r = u = i.parse(t, e, r, s),
                X = d,
                n &&
                  ((i._transform = _),
                  f && ((f._prev = null), f._prev && (f._prev._next = null)));
              r && r !== f;

            ) {
              if (
                1 >= r.type &&
                ((o = r.p),
                (c[o] = r.s + r.c),
                (p[o] = r.s),
                n || ((h = new ce(r, "s", o, h, r.r)), (r.c = 0)),
                1 === r.type)
              )
                for (a = r.l; --a > 0; )
                  (l = "xn" + a),
                    (o = r.p + "_" + l),
                    (c[o] = r.data[l]),
                    (p[o] = r[l]),
                    n || (h = new ce(r, l, o, h, r.rxp[l]));
              r = r._next;
            }
            return { proxy: p, end: c, firstMPT: h, pt: u };
          }),
          (Y.CSSPropTween = function (t, e, r, s, a, o, l, h, u, f, p) {
            (this.t = t),
              (this.p = e),
              (this.s = r),
              (this.c = s),
              (this.n = l || e),
              t instanceof _e || n.push(this.n),
              (this.r = h),
              (this.type = o || 0),
              u && ((this.pr = u), (i = !0)),
              (this.b = void 0 === f ? r : f),
              (this.e = void 0 === p ? r + s : p),
              a && ((this._next = a), (a._prev = this));
          })),
        de = (a.parseComplex = function (t, e, i, r, s, n, a, o, l, h) {
          (i = i || n || ""),
            (a = new _e(t, e, 0, 0, a, h ? 2 : 1, null, !1, o, i, r)),
            (r += "");
          var f,
            p,
            c,
            _,
            d,
            v,
            y,
            x,
            T,
            w,
            b,
            S,
            C = i.split(", ").join(",").split(" "),
            O = r.split(", ").join(",").split(" "),
            k = C.length,
            R = u !== !1;
          for (
            (-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) &&
              ((C = C.join(" ").replace(M, ", ").split(" ")),
              (O = O.join(" ").replace(M, ", ").split(" ")),
              (k = C.length)),
              k !== O.length && ((C = (n || "").split(" ")), (k = C.length)),
              a.plugin = l,
              a.setRatio = h,
              f = 0;
            k > f;
            f++
          )
            if (((_ = C[f]), (d = O[f]), (x = parseFloat(_)), x || 0 === x))
              a.appendXtra(
                "",
                x,
                se(d, x),
                d.replace(g, ""),
                R && -1 !== d.indexOf("px"),
                !0
              );
            else if (s && ("#" === _.charAt(0) || oe[_] || P.test(_)))
              (S = "," === d.charAt(d.length - 1) ? ")," : ")"),
                (_ = he(_)),
                (d = he(d)),
                (T = _.length + d.length > 6),
                T && !U && 0 === d[3]
                  ? ((a["xs" + a.l] += a.l ? " transparent" : "transparent"),
                    (a.e = a.e.split(O[f]).join("transparent")))
                  : (U || (T = !1),
                    a
                      .appendXtra(
                        T ? "rgba(" : "rgb(",
                        _[0],
                        d[0] - _[0],
                        ",",
                        !0,
                        !0
                      )
                      .appendXtra("", _[1], d[1] - _[1], ",", !0)
                      .appendXtra("", _[2], d[2] - _[2], T ? "," : S, !0),
                    T &&
                      ((_ = 4 > _.length ? 1 : _[3]),
                      a.appendXtra(
                        "",
                        _,
                        (4 > d.length ? 1 : d[3]) - _,
                        S,
                        !1
                      )));
            else if ((v = _.match(m))) {
              if (((y = d.match(g)), !y || y.length !== v.length)) return a;
              for (c = 0, p = 0; v.length > p; p++)
                (b = v[p]),
                  (w = _.indexOf(b, c)),
                  a.appendXtra(
                    _.substr(c, w - c),
                    Number(b),
                    se(y[p], b),
                    "",
                    R && "px" === _.substr(w + b.length, 2),
                    0 === p
                  ),
                  (c = w + b.length);
              a["xs" + a.l] += _.substr(c);
            } else a["xs" + a.l] += a.l ? " " + _ : _;
          if (-1 !== r.indexOf("=") && a.data) {
            for (S = a.xs0 + a.data.s, f = 1; a.l > f; f++)
              S += a["xs" + f] + a.data["xn" + f];
            a.e = S + a["xs" + f];
          }
          return a.l || ((a.type = -1), (a.xs0 = a.e)), a.xfirst || a;
        }),
        me = 9;
      for (h = _e.prototype, h.l = h.pr = 0; --me > 0; )
        (h["xn" + me] = 0), (h["xs" + me] = "");
      (h.xs0 = ""),
        (h._next =
          h._prev =
          h.xfirst =
          h.data =
          h.plugin =
          h.setRatio =
          h.rxp =
            null),
        (h.appendXtra = function (t, e, i, r, s, n) {
          var a = this,
            o = a.l;
          return (
            (a["xs" + o] += n && o ? " " + t : t || ""),
            i || 0 === o || a.plugin
              ? (a.l++,
                (a.type = a.setRatio ? 2 : 1),
                (a["xs" + a.l] = r || ""),
                o > 0
                  ? ((a.data["xn" + o] = e + i),
                    (a.rxp["xn" + o] = s),
                    (a["xn" + o] = e),
                    a.plugin ||
                      ((a.xfirst = new _e(
                        a,
                        "xn" + o,
                        e,
                        i,
                        a.xfirst || a,
                        0,
                        a.n,
                        s,
                        a.pr
                      )),
                      (a.xfirst.xs0 = 0)),
                    a)
                  : ((a.data = { s: e + i }),
                    (a.rxp = {}),
                    (a.s = e),
                    (a.c = i),
                    (a.r = s),
                    a))
              : ((a["xs" + o] += e + (r || "")), a)
          );
        });
      var ge = function (t, e) {
          (e = e || {}),
            (this.p = e.prefix ? G(t) || t : t),
            (l[t] = l[this.p] = this),
            (this.format =
              e.formatter ||
              fe(e.defaultValue, e.color, e.collapsible, e.multi)),
            e.parser && (this.parse = e.parser),
            (this.clrs = e.color),
            (this.multi = e.multi),
            (this.keyword = e.keyword),
            (this.dflt = e.defaultValue),
            (this.pr = e.priority || 0);
        },
        ve = (Y._registerComplexSpecialProp = function (t, e, i) {
          "object" != typeof e && (e = { parser: i });
          var r,
            s,
            n = t.split(","),
            a = e.defaultValue;
          for (i = i || [a], r = 0; n.length > r; r++)
            (e.prefix = 0 === r && e.prefix),
              (e.defaultValue = i[r] || a),
              (s = new ge(n[r], e));
        }),
        ye = function (t) {
          if (!l[t]) {
            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
            ve(t, {
              parser: function (t, i, r, s, n, a, h) {
                var u = o.com.greensock.plugins[e];
                return u
                  ? (u._cssRegister(), l[r].parse(t, i, r, s, n, a, h))
                  : (V("Error: " + e + " js file not loaded."), n);
              },
            });
          }
        };
      (h = ge.prototype),
        (h.parseComplex = function (t, e, i, r, s, n) {
          var a,
            o,
            l,
            h,
            u,
            f,
            p = this.keyword;
          if (
            (this.multi &&
              (M.test(i) || M.test(e)
                ? ((o = e.replace(M, "|").split("|")),
                  (l = i.replace(M, "|").split("|")))
                : p && ((o = [e]), (l = [i]))),
            l)
          ) {
            for (
              h = l.length > o.length ? l.length : o.length, a = 0;
              h > a;
              a++
            )
              (e = o[a] = o[a] || this.dflt),
                (i = l[a] = l[a] || this.dflt),
                p &&
                  ((u = e.indexOf(p)),
                  (f = i.indexOf(p)),
                  u !== f &&
                    (-1 === f
                      ? (o[a] = o[a].split(p).join(""))
                      : -1 === u && (o[a] += " " + p)));
            (e = o.join(", ")), (i = l.join(", "));
          }
          return de(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n);
        }),
        (h.parse = function (t, e, i, r, n, a) {
          return this.parseComplex(
            t.style,
            this.format(Q(t, this.p, s, !1, this.dflt)),
            this.format(e),
            n,
            a
          );
        }),
        (a.registerSpecialProp = function (t, e, i) {
          ve(t, {
            parser: function (t, r, s, n, a, o) {
              var l = new _e(t, s, 0, 0, a, 2, s, !1, i);
              return (l.plugin = o), (l.setRatio = e(t, r, n._tween, s)), l;
            },
            priority: i,
          });
        }),
        (a.useSVGTransformAttr = p);
      var xe,
        Te =
          "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
            ","
          ),
        we = G("transform"),
        be = W + "transform",
        Pe = G("transformOrigin"),
        Se = null !== G("perspective"),
        Ce = (Y.Transform = function () {
          (this.perspective = parseFloat(a.defaultTransformPerspective) || 0),
            (this.force3D =
              a.defaultForce3D !== !1 && Se ? a.defaultForce3D || "auto" : !1);
        }),
        Oe = window.SVGElement,
        ke = function (t, e, i) {
          var r,
            s = z.createElementNS("http://www.w3.org/2000/svg", t),
            n = /([a-z])([A-Z])/g;
          for (r in i)
            s.setAttributeNS(null, r.replace(n, "$1-$2").toLowerCase(), i[r]);
          return e.appendChild(s), s;
        },
        Re = z.documentElement,
        Ae = (function () {
          var t,
            e,
            i,
            r = d || (/Android/i.test(B) && !window.chrome);
          return (
            z.createElementNS &&
              !r &&
              ((t = ke("svg", Re)),
              (e = ke("rect", t, { width: 100, height: 50, x: 100 })),
              (i = e.getBoundingClientRect().width),
              (e.style[Pe] = "50% 50%"),
              (e.style[we] = "scaleX(0.5)"),
              (r = i === e.getBoundingClientRect().width && !(c && Se)),
              Re.removeChild(t)),
            r
          );
        })(),
        De = function (t, e, i, r) {
          var s, n;
          (r && (n = r.split(" ")).length) ||
            ((s = t.getBBox()),
            (e = re(e).split(" ")),
            (n = [
              (-1 !== e[0].indexOf("%")
                ? (parseFloat(e[0]) / 100) * s.width
                : parseFloat(e[0])) + s.x,
              (-1 !== e[1].indexOf("%")
                ? (parseFloat(e[1]) / 100) * s.height
                : parseFloat(e[1])) + s.y,
            ])),
            (i.xOrigin = parseFloat(n[0])),
            (i.yOrigin = parseFloat(n[1])),
            t.setAttribute("data-svg-origin", n.join(" "));
        },
        Me = (Y.getTransform = function (t, e, i, r) {
          if (t._gsTransform && i && !r) return t._gsTransform;
          var n,
            o,
            l,
            h,
            u,
            f,
            p,
            c,
            _,
            d,
            m = i ? t._gsTransform || new Ce() : new Ce(),
            g = 0 > m.scaleX,
            v = 2e-5,
            y = 1e5,
            x = Se
              ? parseFloat(Q(t, Pe, e, !1, "0 0 0").split(" ")[2]) ||
                m.zOrigin ||
                0
              : 0,
            T = parseFloat(a.defaultTransformPerspective) || 0;
          if (
            (we
              ? (o = Q(t, be, e, !0))
              : t.currentStyle &&
                ((o = t.currentStyle.filter.match(A)),
                (o =
                  o && 4 === o.length
                    ? [
                        o[0].substr(4),
                        Number(o[2].substr(4)),
                        Number(o[1].substr(4)),
                        o[3].substr(4),
                        m.x || 0,
                        m.y || 0,
                      ].join(",")
                    : "")),
            (n = !o || "none" === o || "matrix(1, 0, 0, 1, 0, 0)" === o),
            (m.svg = !!(
              Oe &&
              "function" == typeof t.getBBox &&
              t.getCTM &&
              (!t.parentNode || (t.parentNode.getBBox && t.parentNode.getCTM))
            )),
            m.svg &&
              (n &&
                -1 !== (t.style[we] + "").indexOf("matrix") &&
                ((o = t.style[we]), (n = !1)),
              De(
                t,
                Q(t, Pe, s, !1, "50% 50%") + "",
                m,
                t.getAttribute("data-svg-origin")
              ),
              (xe = a.useSVGTransformAttr || Ae),
              (l = t.getAttribute("transform")),
              n && l && -1 !== l.indexOf("matrix") && ((o = l), (n = 0))),
            !n)
          ) {
            for (
              l = (o || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
                h = l.length;
              --h > -1;

            )
              (u = Number(l[h])),
                (l[h] = (f = u - (u |= 0))
                  ? (0 | (f * y + (0 > f ? -0.5 : 0.5))) / y + u
                  : u);
            if (16 === l.length) {
              var w,
                b,
                P,
                S,
                C,
                O = l[0],
                k = l[1],
                R = l[2],
                D = l[3],
                M = l[4],
                N = l[5],
                X = l[6],
                z = l[7],
                F = l[8],
                I = l[9],
                E = l[10],
                Y = l[12],
                B = l[13],
                U = l[14],
                j = l[11],
                V = Math.atan2(X, E);
              m.zOrigin &&
                ((U = -m.zOrigin),
                (Y = F * U - l[12]),
                (B = I * U - l[13]),
                (U = E * U + m.zOrigin - l[14])),
                (m.rotationX = V * L),
                V &&
                  ((S = Math.cos(-V)),
                  (C = Math.sin(-V)),
                  (w = M * S + F * C),
                  (b = N * S + I * C),
                  (P = X * S + E * C),
                  (F = M * -C + F * S),
                  (I = N * -C + I * S),
                  (E = X * -C + E * S),
                  (j = z * -C + j * S),
                  (M = w),
                  (N = b),
                  (X = P)),
                (V = Math.atan2(F, E)),
                (m.rotationY = V * L),
                V &&
                  ((S = Math.cos(-V)),
                  (C = Math.sin(-V)),
                  (w = O * S - F * C),
                  (b = k * S - I * C),
                  (P = R * S - E * C),
                  (I = k * C + I * S),
                  (E = R * C + E * S),
                  (j = D * C + j * S),
                  (O = w),
                  (k = b),
                  (R = P)),
                (V = Math.atan2(k, O)),
                (m.rotation = V * L),
                V &&
                  ((S = Math.cos(-V)),
                  (C = Math.sin(-V)),
                  (O = O * S + M * C),
                  (b = k * S + N * C),
                  (N = k * -C + N * S),
                  (X = R * -C + X * S),
                  (k = b)),
                m.rotationX &&
                  Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 &&
                  ((m.rotationX = m.rotation = 0), (m.rotationY += 180)),
                (m.scaleX = (0 | (Math.sqrt(O * O + k * k) * y + 0.5)) / y),
                (m.scaleY = (0 | (Math.sqrt(N * N + I * I) * y + 0.5)) / y),
                (m.scaleZ = (0 | (Math.sqrt(X * X + E * E) * y + 0.5)) / y),
                (m.skewX = 0),
                (m.perspective = j ? 1 / (0 > j ? -j : j) : 0),
                (m.x = Y),
                (m.y = B),
                (m.z = U),
                m.svg &&
                  ((m.x -= m.xOrigin - (m.xOrigin * O - m.yOrigin * M)),
                  (m.y -= m.yOrigin - (m.yOrigin * k - m.xOrigin * N)));
            } else if (
              !(
                (Se &&
                  !r &&
                  l.length &&
                  m.x === l[4] &&
                  m.y === l[5] &&
                  (m.rotationX || m.rotationY)) ||
                (void 0 !== m.x && "none" === Q(t, "display", e))
              )
            ) {
              var W = l.length >= 6,
                q = W ? l[0] : 1,
                G = l[1] || 0,
                H = l[2] || 0,
                Z = W ? l[3] : 1;
              (m.x = l[4] || 0),
                (m.y = l[5] || 0),
                (p = Math.sqrt(q * q + G * G)),
                (c = Math.sqrt(Z * Z + H * H)),
                (_ = q || G ? Math.atan2(G, q) * L : m.rotation || 0),
                (d = H || Z ? Math.atan2(H, Z) * L + _ : m.skewX || 0),
                Math.abs(d) > 90 &&
                  270 > Math.abs(d) &&
                  (g
                    ? ((p *= -1),
                      (d += 0 >= _ ? 180 : -180),
                      (_ += 0 >= _ ? 180 : -180))
                    : ((c *= -1), (d += 0 >= d ? 180 : -180))),
                (m.scaleX = p),
                (m.scaleY = c),
                (m.rotation = _),
                (m.skewX = d),
                Se &&
                  ((m.rotationX = m.rotationY = m.z = 0),
                  (m.perspective = T),
                  (m.scaleZ = 1)),
                m.svg &&
                  ((m.x -= m.xOrigin - (m.xOrigin * q - m.yOrigin * G)),
                  (m.y -= m.yOrigin - (m.yOrigin * Z - m.xOrigin * H)));
            }
            m.zOrigin = x;
            for (h in m) v > m[h] && m[h] > -v && (m[h] = 0);
          }
          return (
            i &&
              ((t._gsTransform = m),
              m.svg &&
                (xe && t.style[we]
                  ? Fe(t.style, we)
                  : !xe &&
                    t.getAttribute("transform") &&
                    t.removeAttribute("transform"))),
            m
          );
        }),
        Ne = function (t) {
          var e,
            i,
            r = this.data,
            s = -r.rotation * N,
            n = s + r.skewX * N,
            a = 1e5,
            o = (0 | (Math.cos(s) * r.scaleX * a)) / a,
            l = (0 | (Math.sin(s) * r.scaleX * a)) / a,
            h = (0 | (Math.sin(n) * -r.scaleY * a)) / a,
            u = (0 | (Math.cos(n) * r.scaleY * a)) / a,
            f = this.t.style,
            p = this.t.currentStyle;
          if (p) {
            (i = l), (l = -h), (h = -i), (e = p.filter), (f.filter = "");
            var c,
              _,
              m = this.t.offsetWidth,
              g = this.t.offsetHeight,
              v = "absolute" !== p.position,
              y =
                "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                o +
                ", M12=" +
                l +
                ", M21=" +
                h +
                ", M22=" +
                u,
              w = r.x + (m * r.xPercent) / 100,
              b = r.y + (g * r.yPercent) / 100;
            if (
              (null != r.ox &&
                ((c = (r.oxp ? 0.01 * m * r.ox : r.ox) - m / 2),
                (_ = (r.oyp ? 0.01 * g * r.oy : r.oy) - g / 2),
                (w += c - (c * o + _ * l)),
                (b += _ - (c * h + _ * u))),
              v
                ? ((c = m / 2),
                  (_ = g / 2),
                  (y +=
                    ", Dx=" +
                    (c - (c * o + _ * l) + w) +
                    ", Dy=" +
                    (_ - (c * h + _ * u) + b) +
                    ")"))
                : (y += ", sizingMethod='auto expand')"),
              (f.filter =
                -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                  ? e.replace(D, y)
                  : y + " " + e),
              (0 === t || 1 === t) &&
                1 === o &&
                0 === l &&
                0 === h &&
                1 === u &&
                ((v && -1 === y.indexOf("Dx=0, Dy=0")) ||
                  (T.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                  (-1 === e.indexOf("gradient(" && e.indexOf("Alpha")) &&
                    f.removeAttribute("filter"))),
              !v)
            ) {
              var P,
                S,
                C,
                O = 8 > d ? 1 : -1;
              for (
                c = r.ieOffsetX || 0,
                  _ = r.ieOffsetY || 0,
                  r.ieOffsetX = Math.round(
                    (m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + w
                  ),
                  r.ieOffsetY = Math.round(
                    (g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b
                  ),
                  me = 0;
                4 > me;
                me++
              )
                (S = ee[me]),
                  (P = p[S]),
                  (i =
                    -1 !== P.indexOf("px")
                      ? parseFloat(P)
                      : Z(this.t, S, parseFloat(P), P.replace(x, "")) || 0),
                  (C =
                    i !== r[S]
                      ? 2 > me
                        ? -r.ieOffsetX
                        : -r.ieOffsetY
                      : 2 > me
                      ? c - r.ieOffsetX
                      : _ - r.ieOffsetY),
                  (f[S] =
                    (r[S] = Math.round(
                      i - C * (0 === me || 2 === me ? 1 : O)
                    )) + "px");
            }
          }
        },
        Le = (Y.set3DTransformRatio = function (t) {
          var e,
            i,
            r,
            s,
            n,
            a,
            o,
            l,
            h,
            u,
            f,
            p,
            _,
            d,
            m,
            g,
            v,
            y,
            x,
            T,
            w,
            b = this.data,
            P = this.t.style,
            S = b.rotation * N,
            C = b.scaleX,
            O = b.scaleY,
            k = b.scaleZ,
            R = b.x,
            A = b.y,
            D = b.z,
            M = b.perspective;
          if (
            !(
              (1 !== t && 0 !== t && b.force3D) ||
              b.force3D === !0 ||
              b.rotationY ||
              b.rotationX ||
              1 !== k ||
              M ||
              D ||
              (this.tween._totalTime !== this.tween._totalDuration &&
                this.tween._totalTime)
            )
          )
            return Xe.call(this, t), void 0;
          if (
            (c &&
              ((d = 1e-4),
              d > C && C > -d && (C = k = 2e-5),
              d > O && O > -d && (O = k = 2e-5),
              !M || b.z || b.rotationX || b.rotationY || (M = 0)),
            S || b.skewX)
          )
            (m = e = Math.cos(S)),
              (g = s = Math.sin(S)),
              b.skewX &&
                ((S -= b.skewX * N),
                (m = Math.cos(S)),
                (g = Math.sin(S)),
                "simple" === b.skewType &&
                  ((v = Math.tan(b.skewX * N)),
                  (v = Math.sqrt(1 + v * v)),
                  (m *= v),
                  (g *= v))),
              (i = -g),
              (n = m);
          else {
            if (!(b.rotationY || b.rotationX || 1 !== k || M || b.svg))
              return (
                (P[we] =
                  (b.xPercent || b.yPercent
                    ? "translate(" +
                      b.xPercent +
                      "%," +
                      b.yPercent +
                      "%) translate3d("
                    : "translate3d(") +
                  R +
                  "px," +
                  A +
                  "px," +
                  D +
                  "px)" +
                  (1 !== C || 1 !== O ? " scale(" + C + "," + O + ")" : "")),
                void 0
              );
            (e = n = 1), (i = s = 0);
          }
          (h = 1),
            (r = a = o = l = u = f = 0),
            (p = M ? -1 / M : 0),
            (_ = b.zOrigin),
            (d = 1e-6),
            (T = ","),
            (w = "0"),
            (S = b.rotationY * N),
            S &&
              ((m = Math.cos(S)),
              (g = Math.sin(S)),
              (o = -g),
              (u = p * -g),
              (r = e * g),
              (a = s * g),
              (h = m),
              (p *= m),
              (e *= m),
              (s *= m)),
            (S = b.rotationX * N),
            S &&
              ((m = Math.cos(S)),
              (g = Math.sin(S)),
              (v = i * m + r * g),
              (y = n * m + a * g),
              (l = h * g),
              (f = p * g),
              (r = i * -g + r * m),
              (a = n * -g + a * m),
              (h *= m),
              (p *= m),
              (i = v),
              (n = y)),
            1 !== k && ((r *= k), (a *= k), (h *= k), (p *= k)),
            1 !== O && ((i *= O), (n *= O), (l *= O), (f *= O)),
            1 !== C && ((e *= C), (s *= C), (o *= C), (u *= C)),
            (_ || b.svg) &&
              (_ && ((R += r * -_), (A += a * -_), (D += h * -_ + _)),
              b.svg &&
                ((R += b.xOrigin - (b.xOrigin * e + b.yOrigin * i)),
                (A += b.yOrigin - (b.xOrigin * s + b.yOrigin * n))),
              d > R && R > -d && (R = w),
              d > A && A > -d && (A = w),
              d > D && D > -d && (D = 0)),
            (x =
              b.xPercent || b.yPercent
                ? "translate(" + b.xPercent + "%," + b.yPercent + "%) matrix3d("
                : "matrix3d("),
            (x +=
              (d > e && e > -d ? w : e) +
              T +
              (d > s && s > -d ? w : s) +
              T +
              (d > o && o > -d ? w : o)),
            (x +=
              T +
              (d > u && u > -d ? w : u) +
              T +
              (d > i && i > -d ? w : i) +
              T +
              (d > n && n > -d ? w : n)),
            b.rotationX || b.rotationY
              ? ((x +=
                  T +
                  (d > l && l > -d ? w : l) +
                  T +
                  (d > f && f > -d ? w : f) +
                  T +
                  (d > r && r > -d ? w : r)),
                (x +=
                  T +
                  (d > a && a > -d ? w : a) +
                  T +
                  (d > h && h > -d ? w : h) +
                  T +
                  (d > p && p > -d ? w : p) +
                  T))
              : (x += ",0,0,0,0,1,0,"),
            (x += R + T + A + T + D + T + (M ? 1 + -D / M : 1) + ")"),
            (P[we] = x);
        }),
        Xe = (Y.set2DTransformRatio = function (t) {
          var e,
            i,
            r,
            s,
            n,
            a,
            o,
            l,
            h,
            u,
            f,
            p,
            c = this.data,
            _ = this.t,
            d = _.style,
            m = c.x,
            g = c.y;
          return !(
            c.rotationX ||
            c.rotationY ||
            c.z ||
            c.force3D === !0 ||
            ("auto" === c.force3D && 1 !== t && 0 !== t)
          ) ||
            (c.svg && xe) ||
            !Se
            ? ((s = c.scaleX),
              (n = c.scaleY),
              c.rotation || c.skewX || c.svg
                ? ((e = c.rotation * N),
                  (i = c.skewX * N),
                  (r = 1e5),
                  (a = Math.cos(e) * s),
                  (o = Math.sin(e) * s),
                  (l = Math.sin(e - i) * -n),
                  (h = Math.cos(e - i) * n),
                  i &&
                    "simple" === c.skewType &&
                    ((p = Math.tan(i)),
                    (p = Math.sqrt(1 + p * p)),
                    (l *= p),
                    (h *= p)),
                  c.svg &&
                    ((m += c.xOrigin - (c.xOrigin * a + c.yOrigin * l)),
                    (g += c.yOrigin - (c.xOrigin * o + c.yOrigin * h)),
                    (f = 1e-6),
                    f > m && m > -f && (m = 0),
                    f > g && g > -f && (g = 0)),
                  (u =
                    (0 | (a * r)) / r +
                    "," +
                    (0 | (o * r)) / r +
                    "," +
                    (0 | (l * r)) / r +
                    "," +
                    (0 | (h * r)) / r +
                    "," +
                    m +
                    "," +
                    g +
                    ")"),
                  c.svg && xe
                    ? _.setAttribute("transform", "matrix(" + u)
                    : (d[we] =
                        (c.xPercent || c.yPercent
                          ? "translate(" +
                            c.xPercent +
                            "%," +
                            c.yPercent +
                            "%) matrix("
                          : "matrix(") + u))
                : (d[we] =
                    (c.xPercent || c.yPercent
                      ? "translate(" +
                        c.xPercent +
                        "%," +
                        c.yPercent +
                        "%) matrix("
                      : "matrix(") +
                    s +
                    ",0,0," +
                    n +
                    "," +
                    m +
                    "," +
                    g +
                    ")"),
              void 0)
            : ((this.setRatio = Le), Le.call(this, t), void 0);
        });
      (h = Ce.prototype),
        (h.x =
          h.y =
          h.z =
          h.skewX =
          h.skewY =
          h.rotation =
          h.rotationX =
          h.rotationY =
          h.zOrigin =
          h.xPercent =
          h.yPercent =
            0),
        (h.scaleX = h.scaleY = h.scaleZ = 1),
        ve(
          "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",
          {
            parser: function (t, e, i, r, n, o, l) {
              if (r._lastParsedTransform === l) return n;
              r._lastParsedTransform = l;
              var h,
                u,
                f,
                p,
                c,
                _,
                d,
                m = (r._transform = Me(t, s, !0, l.parseTransform)),
                g = t.style,
                v = 1e-6,
                y = Te.length,
                x = l,
                T = {};
              if ("string" == typeof x.transform && we)
                (f = I.style),
                  (f[we] = x.transform),
                  (f.display = "block"),
                  (f.position = "absolute"),
                  z.body.appendChild(I),
                  (h = Me(I, null, !1)),
                  z.body.removeChild(I);
              else if ("object" == typeof x) {
                if (
                  ((h = {
                    scaleX: ne(null != x.scaleX ? x.scaleX : x.scale, m.scaleX),
                    scaleY: ne(null != x.scaleY ? x.scaleY : x.scale, m.scaleY),
                    scaleZ: ne(x.scaleZ, m.scaleZ),
                    x: ne(x.x, m.x),
                    y: ne(x.y, m.y),
                    z: ne(x.z, m.z),
                    xPercent: ne(x.xPercent, m.xPercent),
                    yPercent: ne(x.yPercent, m.yPercent),
                    perspective: ne(x.transformPerspective, m.perspective),
                  }),
                  (d = x.directionalRotation),
                  null != d)
                )
                  if ("object" == typeof d) for (f in d) x[f] = d[f];
                  else x.rotation = d;
                "string" == typeof x.x &&
                  -1 !== x.x.indexOf("%") &&
                  ((h.x = 0), (h.xPercent = ne(x.x, m.xPercent))),
                  "string" == typeof x.y &&
                    -1 !== x.y.indexOf("%") &&
                    ((h.y = 0), (h.yPercent = ne(x.y, m.yPercent))),
                  (h.rotation = ae(
                    "rotation" in x
                      ? x.rotation
                      : "shortRotation" in x
                      ? x.shortRotation + "_short"
                      : "rotationZ" in x
                      ? x.rotationZ
                      : m.rotation,
                    m.rotation,
                    "rotation",
                    T
                  )),
                  Se &&
                    ((h.rotationX = ae(
                      "rotationX" in x
                        ? x.rotationX
                        : "shortRotationX" in x
                        ? x.shortRotationX + "_short"
                        : m.rotationX || 0,
                      m.rotationX,
                      "rotationX",
                      T
                    )),
                    (h.rotationY = ae(
                      "rotationY" in x
                        ? x.rotationY
                        : "shortRotationY" in x
                        ? x.shortRotationY + "_short"
                        : m.rotationY || 0,
                      m.rotationY,
                      "rotationY",
                      T
                    ))),
                  (h.skewX = null == x.skewX ? m.skewX : ae(x.skewX, m.skewX)),
                  (h.skewY = null == x.skewY ? m.skewY : ae(x.skewY, m.skewY)),
                  (u = h.skewY - m.skewY) &&
                    ((h.skewX += u), (h.rotation += u));
              }
              for (
                Se && null != x.force3D && ((m.force3D = x.force3D), (_ = !0)),
                  m.skewType = x.skewType || m.skewType || a.defaultSkewType,
                  c =
                    m.force3D ||
                    m.z ||
                    m.rotationX ||
                    m.rotationY ||
                    h.z ||
                    h.rotationX ||
                    h.rotationY ||
                    h.perspective,
                  c || null == x.scale || (h.scaleZ = 1);
                --y > -1;

              )
                (i = Te[y]),
                  (p = h[i] - m[i]),
                  (p > v || -v > p || null != x[i] || null != X[i]) &&
                    ((_ = !0),
                    (n = new _e(m, i, m[i], p, n)),
                    i in T && (n.e = T[i]),
                    (n.xs0 = 0),
                    (n.plugin = o),
                    r._overwriteProps.push(n.n));
              return (
                (p = x.transformOrigin),
                m.svg &&
                  (p || x.svgOrigin) &&
                  (De(t, re(p), h, x.svgOrigin),
                  (n = new _e(
                    m,
                    "xOrigin",
                    m.xOrigin,
                    h.xOrigin - m.xOrigin,
                    n,
                    -1,
                    "transformOrigin"
                  )),
                  (n.b = m.xOrigin),
                  (n.e = n.xs0 = h.xOrigin),
                  (n = new _e(
                    m,
                    "yOrigin",
                    m.yOrigin,
                    h.yOrigin - m.yOrigin,
                    n,
                    -1,
                    "transformOrigin"
                  )),
                  (n.b = m.yOrigin),
                  (n.e = n.xs0 = h.yOrigin),
                  (p = xe ? null : "0px 0px")),
                (p || (Se && c && m.zOrigin)) &&
                  (we
                    ? ((_ = !0),
                      (i = Pe),
                      (p = (p || Q(t, i, s, !1, "50% 50%")) + ""),
                      (n = new _e(g, i, 0, 0, n, -1, "transformOrigin")),
                      (n.b = g[i]),
                      (n.plugin = o),
                      Se
                        ? ((f = m.zOrigin),
                          (p = p.split(" ")),
                          (m.zOrigin =
                            (p.length > 2 && (0 === f || "0px" !== p[2])
                              ? parseFloat(p[2])
                              : f) || 0),
                          (n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px"),
                          (n = new _e(m, "zOrigin", 0, 0, n, -1, n.n)),
                          (n.b = f),
                          (n.xs0 = n.e = m.zOrigin))
                        : (n.xs0 = n.e = p))
                    : re(p + "", m)),
                _ &&
                  (r._transformType =
                    (m.svg && xe) || (!c && 3 !== this._transformType) ? 2 : 3),
                n
              );
            },
            prefix: !0,
          }
        ),
        ve("boxShadow", {
          defaultValue: "0px 0px 0px 0px #999",
          prefix: !0,
          color: !0,
          multi: !0,
          keyword: "inset",
        }),
        ve("borderRadius", {
          defaultValue: "0px",
          parser: function (t, e, i, n, a) {
            e = this.format(e);
            var o,
              l,
              h,
              u,
              f,
              p,
              c,
              _,
              d,
              m,
              g,
              v,
              y,
              x,
              T,
              w,
              b = [
                "borderTopLeftRadius",
                "borderTopRightRadius",
                "borderBottomRightRadius",
                "borderBottomLeftRadius",
              ],
              P = t.style;
            for (
              d = parseFloat(t.offsetWidth),
                m = parseFloat(t.offsetHeight),
                o = e.split(" "),
                l = 0;
              b.length > l;
              l++
            )
              this.p.indexOf("border") && (b[l] = G(b[l])),
                (f = u = Q(t, b[l], s, !1, "0px")),
                -1 !== f.indexOf(" ") &&
                  ((u = f.split(" ")), (f = u[0]), (u = u[1])),
                (p = h = o[l]),
                (c = parseFloat(f)),
                (v = f.substr((c + "").length)),
                (y = "=" === p.charAt(1)),
                y
                  ? ((_ = parseInt(p.charAt(0) + "1", 10)),
                    (p = p.substr(2)),
                    (_ *= parseFloat(p)),
                    (g = p.substr((_ + "").length - (0 > _ ? 1 : 0)) || ""))
                  : ((_ = parseFloat(p)), (g = p.substr((_ + "").length))),
                "" === g && (g = r[i] || v),
                g !== v &&
                  ((x = Z(t, "borderLeft", c, v)),
                  (T = Z(t, "borderTop", c, v)),
                  "%" === g
                    ? ((f = 100 * (x / d) + "%"), (u = 100 * (T / m) + "%"))
                    : "em" === g
                    ? ((w = Z(t, "borderLeft", 1, "em")),
                      (f = x / w + "em"),
                      (u = T / w + "em"))
                    : ((f = x + "px"), (u = T + "px")),
                  y &&
                    ((p = parseFloat(f) + _ + g), (h = parseFloat(u) + _ + g))),
                (a = de(P, b[l], f + " " + u, p + " " + h, !1, "0px", a));
            return a;
          },
          prefix: !0,
          formatter: fe("0px 0px 0px 0px", !1, !0),
        }),
        ve("backgroundPosition", {
          defaultValue: "0 0",
          parser: function (t, e, i, r, n, a) {
            var o,
              l,
              h,
              u,
              f,
              p,
              c = "background-position",
              _ = s || H(t, null),
              m = this.format(
                (_
                  ? d
                    ? _.getPropertyValue(c + "-x") +
                      " " +
                      _.getPropertyValue(c + "-y")
                    : _.getPropertyValue(c)
                  : t.currentStyle.backgroundPositionX +
                    " " +
                    t.currentStyle.backgroundPositionY) || "0 0"
              ),
              g = this.format(e);
            if (
              (-1 !== m.indexOf("%")) != (-1 !== g.indexOf("%")) &&
              ((p = Q(t, "backgroundImage").replace(O, "")), p && "none" !== p)
            ) {
              for (
                o = m.split(" "),
                  l = g.split(" "),
                  E.setAttribute("src", p),
                  h = 2;
                --h > -1;

              )
                (m = o[h]),
                  (u = -1 !== m.indexOf("%")),
                  u !== (-1 !== l[h].indexOf("%")) &&
                    ((f =
                      0 === h
                        ? t.offsetWidth - E.width
                        : t.offsetHeight - E.height),
                    (o[h] = u
                      ? (parseFloat(m) / 100) * f + "px"
                      : 100 * (parseFloat(m) / f) + "%"));
              m = o.join(" ");
            }
            return this.parseComplex(t.style, m, g, n, a);
          },
          formatter: re,
        }),
        ve("backgroundSize", { defaultValue: "0 0", formatter: re }),
        ve("perspective", { defaultValue: "0px", prefix: !0 }),
        ve("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
        ve("transformStyle", { prefix: !0 }),
        ve("backfaceVisibility", { prefix: !0 }),
        ve("userSelect", { prefix: !0 }),
        ve("margin", {
          parser: pe("marginTop,marginRight,marginBottom,marginLeft"),
        }),
        ve("padding", {
          parser: pe("paddingTop,paddingRight,paddingBottom,paddingLeft"),
        }),
        ve("clip", {
          defaultValue: "rect(0px,0px,0px,0px)",
          parser: function (t, e, i, r, n, a) {
            var o, l, h;
            return (
              9 > d
                ? ((l = t.currentStyle),
                  (h = 8 > d ? " " : ","),
                  (o =
                    "rect(" +
                    l.clipTop +
                    h +
                    l.clipRight +
                    h +
                    l.clipBottom +
                    h +
                    l.clipLeft +
                    ")"),
                  (e = this.format(e).split(",").join(h)))
                : ((o = this.format(Q(t, this.p, s, !1, this.dflt))),
                  (e = this.format(e))),
              this.parseComplex(t.style, o, e, n, a)
            );
          },
        }),
        ve("textShadow", {
          defaultValue: "0px 0px 0px #999",
          color: !0,
          multi: !0,
        }),
        ve("autoRound,strictUnits", {
          parser: function (t, e, i, r, s) {
            return s;
          },
        }),
        ve("border", {
          defaultValue: "0px solid #000",
          parser: function (t, e, i, r, n, a) {
            return this.parseComplex(
              t.style,
              this.format(
                Q(t, "borderTopWidth", s, !1, "0px") +
                  " " +
                  Q(t, "borderTopStyle", s, !1, "solid") +
                  " " +
                  Q(t, "borderTopColor", s, !1, "#000")
              ),
              this.format(e),
              n,
              a
            );
          },
          color: !0,
          formatter: function (t) {
            var e = t.split(" ");
            return (
              e[0] +
              " " +
              (e[1] || "solid") +
              " " +
              (t.match(ue) || ["#000"])[0]
            );
          },
        }),
        ve("borderWidth", {
          parser: pe(
            "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
          ),
        }),
        ve("float,cssFloat,styleFloat", {
          parser: function (t, e, i, r, s) {
            var n = t.style,
              a = "cssFloat" in n ? "cssFloat" : "styleFloat";
            return new _e(n, a, 0, 0, s, -1, i, !1, 0, n[a], e);
          },
        });
      var ze = function (t) {
        var e,
          i = this.t,
          r = i.filter || Q(this.data, "filter") || "",
          s = 0 | (this.s + this.c * t);
        100 === s &&
          (-1 === r.indexOf("atrix(") &&
          -1 === r.indexOf("radient(") &&
          -1 === r.indexOf("oader(")
            ? (i.removeAttribute("filter"), (e = !Q(this.data, "filter")))
            : ((i.filter = r.replace(b, "")), (e = !0))),
          e ||
            (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"),
            -1 === r.indexOf("pacity")
              ? (0 === s && this.xn1) ||
                (i.filter = r + " alpha(opacity=" + s + ")")
              : (i.filter = r.replace(T, "opacity=" + s)));
      };
      ve("opacity,alpha,autoAlpha", {
        defaultValue: "1",
        parser: function (t, e, i, r, n, a) {
          var o = parseFloat(Q(t, "opacity", s, !1, "1")),
            l = t.style,
            h = "autoAlpha" === i;
          return (
            "string" == typeof e &&
              "=" === e.charAt(1) &&
              (e =
                ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
            h &&
              1 === o &&
              "hidden" === Q(t, "visibility", s) &&
              0 !== e &&
              (o = 0),
            U
              ? (n = new _e(l, "opacity", o, e - o, n))
              : ((n = new _e(l, "opacity", 100 * o, 100 * (e - o), n)),
                (n.xn1 = h ? 1 : 0),
                (l.zoom = 1),
                (n.type = 2),
                (n.b = "alpha(opacity=" + n.s + ")"),
                (n.e = "alpha(opacity=" + (n.s + n.c) + ")"),
                (n.data = t),
                (n.plugin = a),
                (n.setRatio = ze)),
            h &&
              ((n = new _e(
                l,
                "visibility",
                0,
                0,
                n,
                -1,
                null,
                !1,
                0,
                0 !== o ? "inherit" : "hidden",
                0 === e ? "hidden" : "inherit"
              )),
              (n.xs0 = "inherit"),
              r._overwriteProps.push(n.n),
              r._overwriteProps.push(i)),
            n
          );
        },
      });
      var Fe = function (t, e) {
          e &&
            (t.removeProperty
              ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) &&
                  (e = "-" + e),
                t.removeProperty(e.replace(S, "-$1").toLowerCase()))
              : t.removeAttribute(e));
        },
        Ie = function (t) {
          if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
            this.t.setAttribute("class", 0 === t ? this.b : this.e);
            for (var e = this.data, i = this.t.style; e; )
              e.v ? (i[e.p] = e.v) : Fe(i, e.p), (e = e._next);
            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
          } else
            this.t.getAttribute("class") !== this.e &&
              this.t.setAttribute("class", this.e);
        };
      ve("className", {
        parser: function (t, e, r, n, a, o, l) {
          var h,
            u,
            f,
            p,
            c,
            _ = t.getAttribute("class") || "",
            d = t.style.cssText;
          if (
            ((a = n._classNamePT = new _e(t, r, 0, 0, a, 2)),
            (a.setRatio = Ie),
            (a.pr = -11),
            (i = !0),
            (a.b = _),
            (u = K(t, s)),
            (f = t._gsClassPT))
          ) {
            for (p = {}, c = f.data; c; ) (p[c.p] = 1), (c = c._next);
            f.setRatio(1);
          }
          return (
            (t._gsClassPT = a),
            (a.e =
              "=" !== e.charAt(1)
                ? e
                : _.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") +
                  ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
            n._tween._duration &&
              (t.setAttribute("class", a.e),
              (h = J(t, u, K(t), l, p)),
              t.setAttribute("class", _),
              (a.data = h.firstMPT),
              (t.style.cssText = d),
              (a = a.xfirst = n.parse(t, h.difs, a, o))),
            a
          );
        },
      });
      var Ee = function (t) {
        if (
          (1 === t || 0 === t) &&
          this.data._totalTime === this.data._totalDuration &&
          "isFromStart" !== this.data.data
        ) {
          var e,
            i,
            r,
            s,
            n = this.t.style,
            a = l.transform.parse;
          if ("all" === this.e) (n.cssText = ""), (s = !0);
          else
            for (
              e = this.e.split(" ").join("").split(","), r = e.length;
              --r > -1;

            )
              (i = e[r]),
                l[i] &&
                  (l[i].parse === a
                    ? (s = !0)
                    : (i = "transformOrigin" === i ? Pe : l[i].p)),
                Fe(n, i);
          s && (Fe(n, we), this.t._gsTransform && delete this.t._gsTransform);
        }
      };
      for (
        ve("clearProps", {
          parser: function (t, e, r, s, n) {
            return (
              (n = new _e(t, r, 0, 0, n, 2)),
              (n.setRatio = Ee),
              (n.e = e),
              (n.pr = -10),
              (n.data = s._tween),
              (i = !0),
              n
            );
          },
        }),
          h = "bezier,throwProps,physicsProps,physics2D".split(","),
          me = h.length;
        me--;

      )
        ye(h[me]);
      (h = a.prototype),
        (h._firstPT = h._lastParsedTransform = h._transform = null),
        (h._onInitTween = function (t, e, o) {
          if (!t.nodeType) return !1;
          (this._target = t),
            (this._tween = o),
            (this._vars = e),
            (u = e.autoRound),
            (i = !1),
            (r = e.suffixMap || a.suffixMap),
            (s = H(t, "")),
            (n = this._overwriteProps);
          var l,
            h,
            c,
            d,
            m,
            g,
            v,
            y,
            x,
            T = t.style;
          if (
            (f &&
              "" === T.zIndex &&
              ((l = Q(t, "zIndex", s)),
              ("auto" === l || "" === l) && this._addLazySet(T, "zIndex", 0)),
            "string" == typeof e &&
              ((d = T.cssText),
              (l = K(t, s)),
              (T.cssText = d + ";" + e),
              (l = J(t, l, K(t)).difs),
              !U && w.test(e) && (l.opacity = parseFloat(RegExp.$1)),
              (e = l),
              (T.cssText = d)),
            (this._firstPT = h = this.parse(t, e, null)),
            this._transformType)
          ) {
            for (
              x = 3 === this._transformType,
                we
                  ? p &&
                    ((f = !0),
                    "" === T.zIndex &&
                      ((v = Q(t, "zIndex", s)),
                      ("auto" === v || "" === v) &&
                        this._addLazySet(T, "zIndex", 0)),
                    _ &&
                      this._addLazySet(
                        T,
                        "WebkitBackfaceVisibility",
                        this._vars.WebkitBackfaceVisibility ||
                          (x ? "visible" : "hidden")
                      ))
                  : (T.zoom = 1),
                c = h;
              c && c._next;

            )
              c = c._next;
            (y = new _e(t, "transform", 0, 0, null, 2)),
              this._linkCSSP(y, null, c),
              (y.setRatio = x && Se ? Le : we ? Xe : Ne),
              (y.data = this._transform || Me(t, s, !0)),
              (y.tween = o),
              n.pop();
          }
          if (i) {
            for (; h; ) {
              for (g = h._next, c = d; c && c.pr > h.pr; ) c = c._next;
              (h._prev = c ? c._prev : m) ? (h._prev._next = h) : (d = h),
                (h._next = c) ? (c._prev = h) : (m = h),
                (h = g);
            }
            this._firstPT = d;
          }
          return !0;
        }),
        (h.parse = function (t, e, i, n) {
          var a,
            o,
            h,
            f,
            p,
            c,
            _,
            d,
            m,
            g,
            v = t.style;
          for (a in e)
            (c = e[a]),
              (o = l[a]),
              o
                ? (i = o.parse(t, c, a, this, i, n, e))
                : ((p = Q(t, a, s) + ""),
                  (m = "string" == typeof c),
                  "color" === a ||
                  "fill" === a ||
                  "stroke" === a ||
                  -1 !== a.indexOf("Color") ||
                  (m && P.test(c))
                    ? (m ||
                        ((c = he(c)),
                        (c =
                          (c.length > 3 ? "rgba(" : "rgb(") +
                          c.join(",") +
                          ")")),
                      (i = de(v, a, p, c, !0, "transparent", i, 0, n)))
                    : !m || (-1 === c.indexOf(" ") && -1 === c.indexOf(","))
                    ? ((h = parseFloat(p)),
                      (_ = h || 0 === h ? p.substr((h + "").length) : ""),
                      ("" === p || "auto" === p) &&
                        ("width" === a || "height" === a
                          ? ((h = ie(t, a, s)), (_ = "px"))
                          : "left" === a || "top" === a
                          ? ((h = $(t, a, s)), (_ = "px"))
                          : ((h = "opacity" !== a ? 0 : 1), (_ = ""))),
                      (g = m && "=" === c.charAt(1)),
                      g
                        ? ((f = parseInt(c.charAt(0) + "1", 10)),
                          (c = c.substr(2)),
                          (f *= parseFloat(c)),
                          (d = c.replace(x, "")))
                        : ((f = parseFloat(c)),
                          (d = m ? c.replace(x, "") : "")),
                      "" === d && (d = a in r ? r[a] : _),
                      (c = f || 0 === f ? (g ? f + h : f) + d : e[a]),
                      _ !== d &&
                        "" !== d &&
                        (f || 0 === f) &&
                        h &&
                        ((h = Z(t, a, h, _)),
                        "%" === d
                          ? ((h /= Z(t, a, 100, "%") / 100),
                            e.strictUnits !== !0 && (p = h + "%"))
                          : "em" === d
                          ? (h /= Z(t, a, 1, "em"))
                          : "px" !== d && ((f = Z(t, a, f, d)), (d = "px")),
                        g && (f || 0 === f) && (c = f + h + d)),
                      g && (f += h),
                      (!h && 0 !== h) || (!f && 0 !== f)
                        ? void 0 !== v[a] &&
                          (c || ("NaN" != c + "" && null != c))
                          ? ((i = new _e(
                              v,
                              a,
                              f || h || 0,
                              0,
                              i,
                              -1,
                              a,
                              !1,
                              0,
                              p,
                              c
                            )),
                            (i.xs0 =
                              "none" !== c ||
                              ("display" !== a && -1 === a.indexOf("Style"))
                                ? c
                                : p))
                          : V("invalid " + a + " tween value: " + e[a])
                        : ((i = new _e(
                            v,
                            a,
                            h,
                            f - h,
                            i,
                            0,
                            a,
                            u !== !1 && ("px" === d || "zIndex" === a),
                            0,
                            p,
                            c
                          )),
                          (i.xs0 = d)))
                    : (i = de(v, a, p, c, !0, null, i, 0, n))),
              n && i && !i.plugin && (i.plugin = n);
          return i;
        }),
        (h.setRatio = function (t) {
          var e,
            i,
            r,
            s = this._firstPT,
            n = 1e-6;
          if (
            1 !== t ||
            (this._tween._time !== this._tween._duration &&
              0 !== this._tween._time)
          )
            if (
              t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time) ||
              this._tween._rawPrevTime === -1e-6
            )
              for (; s; ) {
                if (
                  ((e = s.c * t + s.s),
                  s.r ? (e = Math.round(e)) : n > e && e > -n && (e = 0),
                  s.type)
                )
                  if (1 === s.type)
                    if (((r = s.l), 2 === r))
                      s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
                    else if (3 === r)
                      s.t[s.p] =
                        s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                    else if (4 === r)
                      s.t[s.p] =
                        s.xs0 +
                        e +
                        s.xs1 +
                        s.xn1 +
                        s.xs2 +
                        s.xn2 +
                        s.xs3 +
                        s.xn3 +
                        s.xs4;
                    else if (5 === r)
                      s.t[s.p] =
                        s.xs0 +
                        e +
                        s.xs1 +
                        s.xn1 +
                        s.xs2 +
                        s.xn2 +
                        s.xs3 +
                        s.xn3 +
                        s.xs4 +
                        s.xn4 +
                        s.xs5;
                    else {
                      for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++)
                        i += s["xn" + r] + s["xs" + (r + 1)];
                      s.t[s.p] = i;
                    }
                  else
                    -1 === s.type
                      ? (s.t[s.p] = s.xs0)
                      : s.setRatio && s.setRatio(t);
                else s.t[s.p] = e + s.xs0;
                s = s._next;
              }
            else
              for (; s; )
                2 !== s.type ? (s.t[s.p] = s.b) : s.setRatio(t), (s = s._next);
          else
            for (; s; )
              2 !== s.type ? (s.t[s.p] = s.e) : s.setRatio(t), (s = s._next);
        }),
        (h._enableTransforms = function (t) {
          (this._transform = this._transform || Me(this._target, s, !0)),
            (this._transformType =
              (this._transform.svg && xe) || (!t && 3 !== this._transformType)
                ? 2
                : 3);
        });
      var Ye = function () {
        (this.t[this.p] = this.e),
          this.data._linkCSSP(this, this._next, null, !0);
      };
      (h._addLazySet = function (t, e, i) {
        var r = (this._firstPT = new _e(t, e, 0, 0, this._firstPT, 2));
        (r.e = i), (r.setRatio = Ye), (r.data = this);
      }),
        (h._linkCSSP = function (t, e, i, r) {
          return (
            t &&
              (e && (e._prev = t),
              t._next && (t._next._prev = t._prev),
              t._prev
                ? (t._prev._next = t._next)
                : this._firstPT === t && ((this._firstPT = t._next), (r = !0)),
              i
                ? (i._next = t)
                : r || null !== this._firstPT || (this._firstPT = t),
              (t._next = e),
              (t._prev = i)),
            t
          );
        }),
        (h._kill = function (e) {
          var i,
            r,
            s,
            n = e;
          if (e.autoAlpha || e.alpha) {
            n = {};
            for (r in e) n[r] = e[r];
            (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
          }
          return (
            e.className &&
              (i = this._classNamePT) &&
              ((s = i.xfirst),
              s && s._prev
                ? this._linkCSSP(s._prev, i._next, s._prev._prev)
                : s === this._firstPT && (this._firstPT = i._next),
              i._next && this._linkCSSP(i._next, i._next._next, s._prev),
              (this._classNamePT = null)),
            t.prototype._kill.call(this, n)
          );
        });
      var Be = function (t, e, i) {
        var r, s, n, a;
        if (t.slice) for (s = t.length; --s > -1; ) Be(t[s], e, i);
        else
          for (r = t.childNodes, s = r.length; --s > -1; )
            (n = r[s]),
              (a = n.type),
              n.style && (e.push(K(n)), i && i.push(n)),
              (1 !== a && 9 !== a && 11 !== a) ||
                !n.childNodes.length ||
                Be(n, e, i);
      };
      return (
        (a.cascadeTo = function (t, i, r) {
          var s,
            n,
            a,
            o,
            l = e.to(t, i, r),
            h = [l],
            u = [],
            f = [],
            p = [],
            c = e._internals.reservedProps;
          for (
            t = l._targets || l.target,
              Be(t, u, p),
              l.render(i, !0, !0),
              Be(t, f),
              l.render(0, !0, !0),
              l._enabled(!0),
              s = p.length;
            --s > -1;

          )
            if (((n = J(p[s], u[s], f[s])), n.firstMPT)) {
              n = n.difs;
              for (a in r) c[a] && (n[a] = r[a]);
              o = {};
              for (a in n) o[a] = u[s][a];
              h.push(e.fromTo(p[s], i, o, n));
            }
          return h;
        }),
        t.activate([a]),
        a
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t) {
    "use strict";
    var e = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[t];
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], e)
      : "undefined" != typeof module &&
        module.exports &&
        (require("../TweenLite.js"), (module.exports = e()));
  })("CSSPlugin");

/*!
 * VERSION: beta 0.3.3
 * DATE: 2014-10-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(function (t) {
  "use strict";
  var e = t.GreenSockGlobals || t,
    i = function (t) {
      var i,
        s = t.split("."),
        r = e;
      for (i = 0; s.length > i; i++) r[s[i]] = r = r[s[i]] || {};
      return r;
    },
    s = i("com.greensock.utils"),
    r = function (t) {
      var e = t.nodeType,
        i = "";
      if (1 === e || 9 === e || 11 === e) {
        if ("string" == typeof t.textContent) return t.textContent;
        for (t = t.firstChild; t; t = t.nextSibling) i += r(t);
      } else if (3 === e || 4 === e) return t.nodeValue;
      return i;
    },
    n = document,
    a = n.defaultView ? n.defaultView.getComputedStyle : function () {},
    o = /([A-Z])/g,
    h = function (t, e, i, s) {
      var r;
      return (
        (i = i || a(t, null))
          ? ((t = i.getPropertyValue(e.replace(o, "-$1").toLowerCase())),
            (r = t || i.length ? t : i[e]))
          : t.currentStyle && ((i = t.currentStyle), (r = i[e])),
        s ? r : parseInt(r, 10) || 0
      );
    },
    l = function (t) {
      return t.length &&
        t[0] &&
        ((t[0].nodeType && t[0].style && !t.nodeType) ||
          (t[0].length && t[0][0]))
        ? !0
        : !1;
    },
    _ = function (t) {
      var e,
        i,
        s,
        r = [],
        n = t.length;
      for (e = 0; n > e; e++)
        if (((i = t[e]), l(i)))
          for (s = i.length, s = 0; i.length > s; s++) r.push(i[s]);
        else r.push(i);
      return r;
    },
    u = ")eefec303079ad17405c",
    c = /(?:<br>|<br\/>|<br \/>)/gi,
    p = n.all && !n.addEventListener,
    f =
      "<div style='position:relative;display:inline-block;" +
      (p ? "*display:inline;*zoom:1;'" : "'"),
    m = function (t) {
      t = t || "";
      var e = -1 !== t.indexOf("++"),
        i = 1;
      return (
        e && (t = t.split("++").join("")),
        function () {
          return f + (t ? " class='" + t + (e ? i++ : "") + "'>" : ">");
        }
      );
    },
    d =
      (s.SplitText =
      e.SplitText =
        function (t, e) {
          if (("string" == typeof t && (t = d.selector(t)), !t))
            throw "cannot split a null element.";
          (this.elements = l(t) ? _(t) : [t]),
            (this.chars = []),
            (this.words = []),
            (this.lines = []),
            (this._originals = []),
            (this.vars = e || {}),
            this.split(e);
        }),
    g = function (t, e, i) {
      var s = t.nodeType;
      if (1 === s || 9 === s || 11 === s)
        for (t = t.firstChild; t; t = t.nextSibling) g(t, e, i);
      else (3 === s || 4 === s) && (t.nodeValue = t.nodeValue.split(e).join(i));
    },
    v = function (t, e) {
      for (var i = e.length; --i > -1; ) t.push(e[i]);
    },
    y = function (t, e, i, s, o) {
      c.test(t.innerHTML) && (t.innerHTML = t.innerHTML.replace(c, u));
      var l,
        _,
        p,
        f,
        d,
        y,
        T,
        w,
        x,
        b,
        P,
        S,
        C,
        k,
        R = r(t),
        A = e.type || e.split || "chars,words,lines",
        O = -1 !== A.indexOf("lines") ? [] : null,
        D = -1 !== A.indexOf("words"),
        M = -1 !== A.indexOf("chars"),
        L = "absolute" === e.position || e.absolute === !0,
        z = L ? "&#173; " : " ",
        I = -999,
        E = a(t),
        N = h(t, "paddingLeft", E),
        F = h(t, "borderBottomWidth", E) + h(t, "borderTopWidth", E),
        X = h(t, "borderLeftWidth", E) + h(t, "borderRightWidth", E),
        U = h(t, "paddingTop", E) + h(t, "paddingBottom", E),
        B = h(t, "paddingLeft", E) + h(t, "paddingRight", E),
        j = h(t, "textAlign", E, !0),
        Y = t.clientHeight,
        q = t.clientWidth,
        V = "</div>",
        G = m(e.wordsClass),
        Q = m(e.charsClass),
        W = -1 !== (e.linesClass || "").indexOf("++"),
        Z = e.linesClass,
        H = -1 !== R.indexOf("<"),
        $ = !0,
        K = [],
        J = [],
        te = [];
      for (
        W && (Z = Z.split("++").join("")),
          H && (R = R.split("<").join("{{LT}}")),
          l = R.length,
          f = G(),
          d = 0;
        l > d;
        d++
      )
        if (((T = R.charAt(d)), ")" === T && R.substr(d, 20) === u))
          (f += ($ ? V : "") + "<BR/>"),
            ($ = !1),
            d !== l - 20 &&
              R.substr(d + 20, 20) !== u &&
              ((f += " " + G()), ($ = !0)),
            (d += 19);
        else if (
          " " === T &&
          " " !== R.charAt(d - 1) &&
          d !== l - 1 &&
          R.substr(d - 20, 20) !== u
        ) {
          for (f += $ ? V : "", $ = !1; " " === R.charAt(d + 1); )
            (f += z), d++;
          (")" !== R.charAt(d + 1) || R.substr(d + 1, 20) !== u) &&
            ((f += z + G()), ($ = !0));
        } else f += M && " " !== T ? Q() + T + "</div>" : T;
      for (
        t.innerHTML = f + ($ ? V : ""),
          H && g(t, "{{LT}}", "<"),
          y = t.getElementsByTagName("*"),
          l = y.length,
          w = [],
          d = 0;
        l > d;
        d++
      )
        w[d] = y[d];
      if (O || L)
        for (d = 0; l > d; d++)
          (x = w[d]),
            (p = x.parentNode === t),
            (p || L || (M && !D)) &&
              ((b = x.offsetTop),
              O &&
                p &&
                b !== I &&
                "BR" !== x.nodeName &&
                ((_ = []), O.push(_), (I = b)),
              L &&
                ((x._x = x.offsetLeft),
                (x._y = b),
                (x._w = x.offsetWidth),
                (x._h = x.offsetHeight)),
              O &&
                ((D !== p && M) || (_.push(x), (x._x -= N)),
                p && d && (w[d - 1]._wordEnd = !0),
                "BR" === x.nodeName &&
                  x.nextSibling &&
                  "BR" === x.nextSibling.nodeName &&
                  O.push([])));
      for (d = 0; l > d; d++)
        (x = w[d]),
          (p = x.parentNode === t),
          "BR" !== x.nodeName
            ? (L &&
                ((S = x.style),
                D ||
                  p ||
                  ((x._x += x.parentNode._x), (x._y += x.parentNode._y)),
                (S.left = x._x + "px"),
                (S.top = x._y + "px"),
                (S.position = "absolute"),
                (S.display = "block"),
                (S.width = x._w + 1 + "px"),
                (S.height = x._h + "px")),
              D
                ? p && "" !== x.innerHTML
                  ? J.push(x)
                  : M && K.push(x)
                : p
                ? (t.removeChild(x), w.splice(d--, 1), l--)
                : !p &&
                  M &&
                  ((b = !O && !L && x.nextSibling),
                  t.appendChild(x),
                  b || t.appendChild(n.createTextNode(" ")),
                  K.push(x)))
            : O || L
            ? (t.removeChild(x), w.splice(d--, 1), l--)
            : D || t.appendChild(x);
      if (O) {
        for (
          L &&
            ((P = n.createElement("div")),
            t.appendChild(P),
            (C = P.offsetWidth + "px"),
            (b = P.offsetParent === t ? 0 : t.offsetLeft),
            t.removeChild(P)),
            S = t.style.cssText,
            t.style.cssText = "display:none;";
          t.firstChild;

        )
          t.removeChild(t.firstChild);
        for (k = !L || (!D && !M), d = 0; O.length > d; d++) {
          for (
            _ = O[d],
              P = n.createElement("div"),
              P.style.cssText =
                "display:block;text-align:" +
                j +
                ";position:" +
                (L ? "absolute;" : "relative;"),
              Z && (P.className = Z + (W ? d + 1 : "")),
              te.push(P),
              l = _.length,
              y = 0;
            l > y;
            y++
          )
            "BR" !== _[y].nodeName &&
              ((x = _[y]),
              P.appendChild(x),
              k && (x._wordEnd || D) && P.appendChild(n.createTextNode(" ")),
              L &&
                (0 === y &&
                  ((P.style.top = x._y + "px"), (P.style.left = N + b + "px")),
                (x.style.top = "0px"),
                b && (x.style.left = x._x - b + "px")));
          0 === l && (P.innerHTML = "&nbsp;"),
            D ||
              M ||
              (P.innerHTML = r(P).split(String.fromCharCode(160)).join(" ")),
            L && ((P.style.width = C), (P.style.height = x._h + "px")),
            t.appendChild(P);
        }
        t.style.cssText = S;
      }
      L &&
        (Y > t.clientHeight &&
          ((t.style.height = Y - U + "px"),
          Y > t.clientHeight && (t.style.height = Y + F + "px")),
        q > t.clientWidth &&
          ((t.style.width = q - B + "px"),
          q > t.clientWidth && (t.style.width = q + X + "px"))),
        v(i, K),
        v(s, J),
        v(o, te);
    },
    T = d.prototype;
  (T.split = function (t) {
    this.isSplit && this.revert(),
      (this.vars = t || this.vars),
      (this._originals.length =
        this.chars.length =
        this.words.length =
        this.lines.length =
          0);
    for (var e = this.elements.length; --e > -1; )
      (this._originals[e] = this.elements[e].innerHTML),
        y(this.elements[e], this.vars, this.chars, this.words, this.lines);
    return (
      this.chars.reverse(),
      this.words.reverse(),
      this.lines.reverse(),
      (this.isSplit = !0),
      this
    );
  }),
    (T.revert = function () {
      if (!this._originals) throw "revert() call wasn't scoped properly.";
      for (var t = this._originals.length; --t > -1; )
        this.elements[t].innerHTML = this._originals[t];
      return (
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this.isSplit = !1),
        this
      );
    }),
    (d.selector =
      t.$ ||
      t.jQuery ||
      function (e) {
        var i = t.$ || t.jQuery;
        return i
          ? ((d.selector = i), i(e))
          : "undefined" == typeof document
          ? e
          : document.querySelectorAll
          ? document.querySelectorAll(e)
          : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
      }),
    (d.version = "0.3.3");
})(_gsScope),
  (function (t) {
    "use strict";
    var e = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[t];
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], e)
      : "undefined" != typeof module &&
        module.exports &&
        (module.exports = e());
  })("SplitText");

try {
  window.GreenSockGlobals = null;
  window._gsQueue = null;
  window._gsDefine = null;

  delete window.GreenSockGlobals;
  delete window._gsQueue;
  delete window._gsDefine;
} catch (e) {}

try {
  window.GreenSockGlobals = oldgs;
  window._gsQueue = oldgs_queue;
} catch (e) {}

if (window.tplogs == true)
  try {
    console.groupEnd();
  } catch (e) {}

(function (e, t) {
  e.waitForImages = {
    hasImageProperties: [
      "backgroundImage",
      "listStyleImage",
      "borderImage",
      "borderCornerImage",
    ],
  };
  e.expr[":"].uncached = function (t) {
    var n = document.createElement("img");
    n.src = t.src;
    return e(t).is('img[src!=""]') && !n.complete;
  };
  e.fn.waitForImages = function (t, n, r) {
    if (e.isPlainObject(arguments[0])) {
      n = t.each;
      r = t.waitForAll;
      t = t.finished;
    }
    t = t || e.noop;
    n = n || e.noop;
    r = !!r;
    if (!e.isFunction(t) || !e.isFunction(n)) {
      throw new TypeError("An invalid callback was supplied.");
    }
    return this.each(function () {
      var i = e(this),
        s = [];
      if (r) {
        var o = e.waitForImages.hasImageProperties || [],
          u = /url\((['"]?)(.*?)\1\)/g;
        i.find("*").each(function () {
          var t = e(this);
          if (t.is("img:uncached")) {
            s.push({ src: t.attr("src"), element: t[0] });
          }
          e.each(o, function (e, n) {
            var r = t.css(n);
            if (!r) {
              return true;
            }
            var i;
            while ((i = u.exec(r))) {
              s.push({ src: i[2], element: t[0] });
            }
          });
        });
      } else {
        i.find("img:uncached").each(function () {
          s.push({ src: this.src, element: this });
        });
      }
      var f = s.length,
        l = 0;
      if (f == 0) {
        t.call(i[0]);
      }
      e.each(s, function (r, s) {
        var o = new Image();
        e(o).bind("load error", function (e) {
          l++;
          n.call(s.element, l, f, e.type == "load");
          if (l == f) {
            t.call(i[0]);
            return false;
          }
        });
        o.src = s.src;
      });
    });
  };
})(jQuery);
