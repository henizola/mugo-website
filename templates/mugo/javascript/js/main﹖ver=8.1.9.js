/**
 * @package	 VWEB CMS PKG
 * @subpackage	 VWEB CMS - Javascript/jQuery Custom Attachment
 * @author       <admin@vweb.ge>
 * @copyright	 Copyright (C) 2017 - 2019 VWEB CMS. All Rights Reserved.
 * @website      www.vweb.ge
 * @license	 GNU General Public License Version 2 or later; see License.txt
 *
 */
jQuery(window).on("load", function (e) {
  gsap.to("body", 0, {
    css: {
      visibility: "visible",
    },
  });
});
// Contact Animation
jQuery(document).ready(function () {
  jQuery(".contact dd").addClass("anim");
  jQuery(".contact .control-group").addClass("animleft");
});

/// VWEB GSAP ///
var gsap = gsap;
var TweenLite = TweenLite;
var TweenMax = TweenMax;
var pos = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
var posc = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
var mouse = {
  x: pos.x,
  y: pos.y,
};
var mouse = {
  x: posc.x,
  y: posc.y,
};
var speed = 0.1;
var speedslower = 0.2;
var c = document.querySelector(".c");
var p = document.querySelector(".p");
var xSetc = gsap.quickSetter(c, "x", "px");
var ySetc = gsap.quickSetter(c, "y", "px");
var xSetp = gsap.quickSetter(p, "x", "px");
var ySetp = gsap.quickSetter(p, "y", "px");

gsap.set(p, {
  xPercent: -50,
  yPercent: -50,
});
gsap.set(c, {
  xPercent: -50,
  yPercent: -50,
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  posc.x += (mouse.x - posc.x) * speed;
  posc.y += (mouse.y - posc.y) * speed;
  xSetc(posc.x);
  ySetc(posc.y);
});

gsap.ticker.add(() => {
  pos.x += (mouse.x - pos.x) * speedslower;
  pos.y += (mouse.y - pos.y) * speedslower;
  xSetp(pos.x);
  ySetp(pos.y);
});

var pointer = ".p svg.pointer circle";
var circle = ".c svg.circle circle";
var circles = ".c svg.pointer circle, .c svg.circle circle";
var shaperight = ".c svg.arrows g.right line";
var shapeleft = ".c svg.arrows g.left line";
var plus = ".c svg.plus";
var span = ".c span";

function drawright(e) {
  var tl = gsap.timeline();
  tl.to(
    shaperight,
    0.6,
    {
      strokeDashoffset: 0,
    },
    ""
  ).to(
    circle,
    0.6,
    {
      opacity: 0,
      x: -70,
    },
    ""
  );
}

function undrawright(e) {
  var tl = gsap.timeline();
  tl.to(
    shaperight,
    0.6,
    {
      strokeDashoffset: 60,
    },
    ""
  ).to(
    circle,
    0.6,
    {
      opacity: 1,
      x: 0,
    },
    ""
  );
}

function drawleft(e) {
  var tl = gsap.timeline();
  tl.to(
    shapeleft,
    0.6,
    {
      strokeDashoffset: 0,
    },
    ""
  ).to(
    circle,
    1,
    {
      opacity: 0,
      x: 70,
    },
    ""
  );
}

function undrawleft(e) {
  var tl = gsap.timeline();
  tl.to(
    shapeleft,
    0.6,
    {
      strokeDashoffset: 60,
    },
    ""
  ).to(
    circle,
    1,
    {
      opacity: 1,
      x: 0,
    },
    ""
  );
}

function drawplus(e) {
  var tl = gsap.timeline();
  tl.to(
    plus,
    1.2,
    {
      strokeDashoffset: 0,
      opacity: 1,
      scale: 1.1,
      ease: Strong.easeOut,
      rotation: 720,
    },
    ""
  );
}

gsap.set(plus, {
  opacity: 0,
});

function undrawplus(e) {
  var tl = gsap.timeline();
  tl.to(
    plus,
    1.2,
    {
      strokeDashoffset: 0,
      opacity: 0,
      scale: 0,
      ease: Strong.easeOut,
      rotation: 0,
    },
    ""
  );
}

function drawspan(e) {
  var tl = gsap.timeline();
  tl.to(
    circle,
    0.4,
    {
      stroke: "rgb(255,255,255)",
      x: 0,
      scale: 1.1,
      fill: "rgb(255,255,255)",
    },
    ""
  )
    .to(
      span,
      0.2,
      {
        opacity: 1,
        x: 0,
      },
      ""
    )
    .to(pointer, 0.2, {
      scale: 0,
    })
    .to(plus, 0.2, {
      scale: 0,
    });
}

function undrawspan(e) {
  var tl = gsap.timeline();
  tl.to(
    circle,
    0.4,
    {
      stroke: "#6d6d6d",
      x: 0,
      scale: 1,
      fill: "transparent",
    },
    ""
  )
    .to(
      span,
      0.2,
      {
        opacity: 0,
        x: 0,
      },
      ""
    )
    .to(pointer, 0.2, {
      scale: 1,
    })
    .to(plus, 0.2, {
      scale: 1,
    });
}

var Expo = Expo;

// Event Functions
function hover(e) {
  var tl = gsap.timeline();
  tl.to(c, 0.4, {
    scale: 1.4,
    ease: Expo.easeInOut,
  }).to(pointer, 0.2, {
    scale: 0,
  });
}

function unhover(e) {
  var tl = gsap.timeline();
  tl.to(c, 0.4, {
    scale: 1,
  }).to(pointer, 0.2, {
    scale: 1,
  });
}

function colorcircle(e) {
  TweenLite.to(circle, 0.2, {
    stroke: "#6d6d6d",
  });
}

function uncolorcircle(e) {
  TweenLite.to(circle, 0.2, {
    stroke: "rgb(255,255,255)",
  });
}

function colorpointer(e) {
  TweenLite.to(pointer, 0.2, {
    fill: "#6d6d6d",
  });
}

function uncolorpointer(e) {
  TweenLite.to(pointer, 0.2, {
    fill: "rgb(255,255,255)",
  });
}

// BARBA & GSAP Transitions
function pageTransition() {
  var tl = gsap.timeline();
  tl.to(".barba-loader", 1.2, {
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".barba-loader", 1, {
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".barba-loader", {
    left: "-100%",
  });
}

// DOM Events Variables
var links = jQuery(
  "header.transparent a, header.default a, footer a, .wrapper a, .category-childs a, .submenu-childs a, button, .item-wrap"
);
var iscolor = jQuery("header.default, footer, .wrapper, .breadcrumbs");
var nocolor = jQuery(
  ".mod-article-image, .item-image-wrap, .projects .item-wrap, .V-VideoPlayerWrapper"
);
var images = jQuery(
  ".more-projects .mod-article-image, .category .item-wrapper .item-image, .projects .item-wrap"
);
var draggable = jQuery(".featured-articles, .project.article .carousel");
var carousel = jQuery(".project.article .carousel");
iscolor.hover(colorcircle, uncolorcircle);
iscolor.hover(colorpointer, uncolorpointer);
links.hover(hover, unhover);
carousel.hover(hover, unhover);
nocolor.hover(uncolorcircle, colorcircle);
images.hover(drawplus, undrawplus);
jQuery(document).ready(function () {
  var articlenavnext = jQuery("ul.pager.pagenav li.next a");
  var articlenavprev = jQuery("ul.pager.pagenav li.previous a");
  jQuery(".tparrows.rightarrow").hover(drawright, undrawright);
  jQuery(".tparrows.leftarrow").hover(drawleft, undrawleft);
  articlenavnext.hover(drawright, undrawright);
  articlenavprev.hover(drawleft, undrawleft);
});
draggable.hover(drawspan, undrawspan);

var tl = gsap.timeline();
tl.to(".loading-screen", {
  duration: 1.6,
  y: "-100%",
  ease: "Expo.easeInOut",
  delay: 2,
});

var tl = gsap.timeline();
gsap.set(".loading-screen .logo", {
  y: 200,
  opacity: 0,
});
tl.to(".loading-screen .logo", 1.8, {
  delay: 0.2,
  opacity: 1,
  y: 0,
  ease: "Expo.easeInOut",
});

// GSAP Smooth Scroll + Parallax + Global Animations

var ScrollTrigger = ScrollTrigger;
var ASScroll = ASScroll;

gsap.registerPlugin(ScrollTrigger);

const asscroll = new ASScroll.default({
  customScrollbar: true,
});

ScrollTrigger.defaults({
  scroller: "main",
});

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? asscroll.scrollTo(value)
      : -asscroll.smoothScrollPos;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

asscroll.on("raf", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => asscroll.onResize());

window.addEventListener("load", () => {
  const totalScroll =
    document.querySelector(".asscroll-container").scrollHeight - innerHeight;

  //GSAP Lazy Load On Scroll

  ScrollTrigger.config({ limitCallbacks: true });

  gsap.utils.toArray(".lazy, .lazy > img").forEach((image) => {
    let newSRC = image.dataset.src,
      newImage = document.createElement("img"),
      loadImage = () => {
        (newImage.onload = () => {
          newImage.onload = null; // No Recursion
          newImage.srcset = image.srcset; // Swap Source Attr
          image.srcset = newSRC;

          gsap.set(newImage, {
            position: "absolute",
            top: image.offsetTop,
            left: image.offsetLeft,
            width: image.offsetWidth,
            height: image.offsetHeight,
          });
          image.parentNode.appendChild(newImage);
          gsap.to(newImage, {
            opacity: 0,
            onComplete: () => newImage.parentNode.removeChild(newImage),
          });
          st && st.kill();
        }),
          (newImage.srcset = newSRC);
      },
      // Act Lazy Load On Scroll
      st = ScrollTrigger.create({
        trigger: image,
        start: "20% bottom",
        onEnter: loadImage,
        onEnterBack: loadImage,
      });
  });

  jQuery(document).ready(function () {
    var image = jQuery("img.lazy");
    jQuery("img.lazy").removeAttr("data-src");
    setTimeout(function () {
      image.attr("loaded");
      if (typeof image !== "undefined" && image !== false) {
        jQuery("img.lazy").removeAttr("data-src");
      }
    }, 0);
  });

  // Animations
  var CoverItems = jQuery(".slider, .cover, .page-cover");
  gsap.set(CoverItems, {
    y: 50,
    opacity: 0,
  });
  ScrollTrigger.batch(CoverItems, {
    start: "-20 bottom",
    end: "0 top",
    onToggle: (batch) =>
      gsap.to(batch, {
        delay: 0,
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.15,
        },
      }),
  });

  var Items = jQuery(
    ".anim, .header nav.navbar .container-menu ul, .header nav.navbar .container-menu ul li, .header.transparent nav.navbar .container-menu ul li, .header nav.navbar .container-logo, .navf ul.nav.menu.mod-list li, .copyrights .container-logo, .vweb-socials.default .vweb-socials-link, .article-text p, .article-text h4, .article-text div, .vwebsocialshare-container"
  );
  gsap.set(Items, {
    y: 50,
    opacity: 0,
    skewY: 1,
  });
  ScrollTrigger.batch(Items, {
    start: "-50 bottom",
    end: "0 top",
    onToggle: (batch) =>
      gsap.to(batch, {
        delay: 0,
        duration: 1,
        opacity: 1,
        y: 0,
        skewY: 0,
        stagger: {
          each: 0.13,
        },
      }),
  });

  //Lines
  var Line = jQuery(".lines .st");
  gsap.set(Line, {
    height: "100%",
  });
  ScrollTrigger.batch(Line, {
    start: "100px bottom",
    end: "0 top",
    onToggle: (batch) =>
      gsap.to(batch, {
        delay: 0,
        duration: 1,
        height: "100px",
        stagger: {
          each: 0.15,
        },
      }),
  });

  //Animate Mob Menu Items
  var notopened = 0;
  jQuery(".navbar-toggler").click(function () {
    var delay_time = 0;
    jQuery(".mob-nav").addClass("show");
    jQuery(".header > nav").toggleClass("position-absolute act");
    console.log(notopened);
    if (notopened === 0) {
      gsap.to(jQuery(".mob-nav"), 1, {
        x: "-100%",
        ease: "Expo.easeInOut",
      });

      jQuery(".mob-nav ul.nav.mod-list li").each(function () {
        gsap.to(jQuery(this), 1.4, {
          x: "-80%",
          scaleX: 1,
          delay: delay_time,
          ease: "Expo.easeInOut",
        });
        delay_time += 0.04;
      });
      notopened = 1;
    } else {
      notopened = 0;
      gsap.to(jQuery(".mob-nav"), 1.4, {
        x: 0,
        ease: "Expo.easeInOut",
      });
      jQuery(".mob-nav ul.nav.mod-list li").each(function () {
        gsap.to(jQuery(this), 1, {
          x: 0,
          delay: delay_time,
          ease: "Expo.easeInOut",
        });
        delay_time += 0.02;
      });
    }
  });

  gsap.set(".animleft", {
    x: 50,
    opacity: 0,
  });
  ScrollTrigger.batch(".animleft", {
    start: "0 bottom",
    end: "0 top",
    onToggle: (batch) =>
      gsap.to(batch, {
        delay: 0,
        duration: 1.4,
        opacity: 1,
        x: 0,
        ease: "easeinOut",
        stagger: {
          each: 0.4,
        },
      }),
  });

  asscroll.enable(false, true, document.querySelector("main"));
});

// VWEB CMS *** Google GTAG
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-155180296-1");
// Mailer Lite Localize
jQuery(window).on("load", function (e) {
  //jQuery("#ml-webforms-popup-1653802, .ml-webforms-popup-overlay").wrapAll('<div class="mailerlite"></div>');
});
// VWEB DEV Mobile Menu UX
jQuery(document).ready(function () {
  jQuery(".bars").click(function () {
    jQuery(this).toggleClass("nav-toggler");
    jQuery("body").toggleClass("position-fixed");
  });
});

jQuery(document).ready(function () {
  //Empty DOM Remover
  jQuery(".item-image:empty").remove();
});

// VWEB CMS DEV Owl Carousel 2.1.1
jQuery(document).ready(function () {
  if (jQuery("div.owl-item > div").not(':has("img")')) {
    jQuery(".article-slider .slide").not(':has("img")').remove();
  }
  jQuery(".owl-item:empty").remove();
  jQuery(".owl-item .cloned").remove();
});
jQuery(document).ready(function () {
  var vwebprojectpageslider = jQuery(".article-slider .carousel div.first");
  var featuredarticlescarousel = jQuery(
    ".featured .featured-articles .item-row"
  );
  jQuery(
    ".featured .featured-articles .item-row, .services .mod-vweb-category .item-row, .more-projects .item-row"
  ).addClass("owl-carousel owl-theme first");
  var vwebprojectpagemoduleslider = jQuery(".more-projects .item-row");
  var vwebservicesmoduleslider = jQuery(".more-projects .item-row");
  var vwebprojectpagemodulesliderservices = jQuery(
    ".vweb-sp-more-projects-services .mod-vweb-articles-category-wrapper .row"
  );
  var vwebblogpageslider = jQuery(".carousel.blog div.first");
  var vwebOwlChangeSlide = 4; // Mobile -1, Desktop + 1
  var slide = vwebOwlChangeSlide;
  if (jQuery(window).width() < 600) {
    var slide = vwebOwlChangeSlide;
    slide--;
  } else if (jQuery(window).width() > 999) {
    var slide = vwebOwlChangeSlide;
    slide++;
  } else {
    var slide = vwebOwlChangeSlide;
  }

  featuredarticlescarousel.owlCarousel({
    nav: false,
    dots: false,
    items: 3,
    slideBy: 2,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplayHoverPause: true,
    smartSpeed: 1200,
    animateIn: "",
    animateOut: "",
    touchDrag: true,
    mouseDrag: true,
    loop: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1180: {
        items: 3,
      },
    },
    responsiveRefreshRate: 1,
  });
  vwebprojectpageslider.owlCarousel({
    nav: false,
    dots: false,
    items: 1,
    autoplay: false,
    autoWidth: false,
    stagePadding: 100,
    margin: 10,
    autoplayTimeout: 7000,
    smartSpeed: 1200,
    autoplayHoverPause: true,
    touchDrag: true,
    mouseDrag: true,
    loop: false,
    rewind: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: false,
        margin: 10,
      },
      480: {
        stagePadding: false,
        margin: 10,
      },
      576: {
        stagePadding: false,
        margin: 10,
      },
      768: {
        stagePadding: false,
        margin: 10,
      },
      992: {
        items: 1,
      },
      1025: {
        items: 1,
      },
    },
    responsiveRefreshRate: 1,
  });

  vwebprojectpagemoduleslider.owlCarousel({
    nav: false,
    dots: true,
    items: 3,
    slideBy: 3,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    animateIn: "",
    animateOut: "",
    touchDrag: false,
    mouseDrag: false,
    loop: false,
    rewind: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      480: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      576: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      768: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      992: {
        items: 2,
      },
      1025: {
        items: 3,
      },
    },
    responsiveRefreshRate: 1,
  });
  vwebservicesmoduleslider.owlCarousel({
    nav: false,
    dots: true,
    items: 3,
    slideBy: 3,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    animateIn: "",
    animateOut: "",
    touchDrag: false,
    mouseDrag: false,
    loop: false,
    rewind: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      480: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      576: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      768: {
        items: 1,
        dots: false,
        touchDrag: true,
      },
      992: {
        items: 2,
      },
      1025: {
        items: 3,
      },
    },
    responsiveRefreshRate: 1,
  });
  vwebprojectpagemodulesliderservices.owlCarousel({
    nav: false,
    dots: true,
    items: 4,
    slideBy: 4,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    animateIn: "",
    animateOut: "",
    touchDrag: false,
    mouseDrag: false,
    loop: false,
    rewind: true,
    responsiveRefreshRate: 100,
  });
  vwebblogpageslider.owlCarousel({
    nav: false,
    dots: false,
    items: 1,
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplayHoverPause: true,
    smartSpeed: 1200,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    touchDrag: false,
    mouseDrag: false,
    loop: true,
    rewind: false,
    responsiveRefreshRate: 100,
  });
  var owl = jQuery(".first");
  owl.owlCarousel();
  owl.on("translated.owl.carousel", function (event) {
    jQuery(".right").removeClass("nonr");
    jQuery(".left").removeClass("nonl");
    //VWEB CMS jQuery UI/UX Owl Pause
    jQuery(".first, .second").hover(
      function (e) {
        owl.trigger("stop.owl.autoplay");
        jQuery(".first, .second").addClass("pause").removeClass("play");
      }, // Vise
      function (e) {
        owl.trigger("play.owl.autoplay");
        jQuery(".first, .second").addClass("play").removeClass("pause");
      } // Versa
    );
    jQuery(".owl-dots .owl-dot").click(function () {
      owl.trigger("stop.owl.autoplay");
    });
    if (jQuery(".first .owl-next").is(".disabled")) {
      jQuery(
        ".carousel .right, .carousel2 .right, .carousel3 .right "
      ).addClass("nonr");
    }
    if (jQuery(".first .owl-prev").is(".disabled")) {
      jQuery(".carousel .left, .carousel2 .left, .carousel3 .left").addClass(
        "nonl"
      );
    }
    jQuery(".carousel-two .item").removeClass("active");
    var c = jQuery(
      ".carousel .owl-item.active, .carousel2 .owl-item.active, .carousel3 .owl-item.active"
    ).index();
    jQuery(".carousel-two .item").eq(c).addClass("active");
    var d = Math.ceil((c + 1) / slide) - 1;
    jQuery(".carousel-two .owl-dots .owl-dot").eq(d).trigger("click");
  });
  // owl.on("dragged.owl.carousel", function(event) {
  //  if (event.relatedTarget.state.direction === "left") {
  // $(".owl-carousel").not(this).trigger("next.owl.carousel");
  // } else {
  //  $(".owl-carousel").not(this).trigger("prev.owl.carousel");
  //   }
  // });

  jQuery(".right").click(function () {
    jQuery(
      ".carousel .owl-next, .carousel2 .owl-next, .carousel3 .owl-next"
    ).trigger("click");
  });
  jQuery(".left").click(function () {
    jQuery(
      ".carousel .owl-prev, .carousel2 .owl-prev, .carousel3 .owl-prev"
    ).trigger("click");
  });
  jQuery(".carousel-two .item").click(function () {
    var b = jQuery(".item").index(this);
    jQuery(
      ".carousel .owl-dots .owl-dot, .carousel2 .owl-dots .owl-dot, .carousel3 .owl-dots .owl-dot"
    )
      .eq(b)
      .trigger("click");
    jQuery(".carousel-two .item").removeClass("active");
    jQuery(this).addClass("active");
  });
  var owl2 = jQuery(".second");
  owl2.owlCarousel();
  owl2.on("translated.owl.carousel", function (event) {
    jQuery(".right-t").removeClass("nonr-t");
    jQuery(".left-t").removeClass("nonl-t");
    if (jQuery(".second .owl-next").is(".disabled")) {
      jQuery(".carousel-two .right-t").addClass("nonr-t");
    }
    if (jQuery(".second .owl-prev").is(".disabled")) {
      jQuery(".carousel-two .left-t").addClass("nonl-t");
    }
  });
  jQuery(".right-t").click(function () {
    jQuery(".carousel-two .owl-next").trigger("click");
  });
  jQuery(".left-t").click(function () {
    jQuery(".carousel-two .owl-prev").trigger("click");
  });
});
//VWEB CMS jQuery UI/UX
//jQuery(document).ready(function(){
// owl = jQuery(".owl-carousel").owlCarousel({
//   autoplay: true,
//   autoplayTimeout: 7000
// });
// owl.on('changed.owl.carousel', function(e) {
//    owl.trigger('stop.owl.autoplay');
// owl.trigger('play.owl.autoplay');
// });
//});
jQuery(document).ready(function () {
  jQuery("div.attribdisplaynone").remove();
});

//OWL Carousel Full Screen
var fullscreen = false;
jQuery("span.fullscreen").click(function () {
  jQuery(".carousel").toggleClass("fullscreen");
  jQuery("body").toggleClass("fullscreen scroll-disable overflow-hidden");
  console.log(fullscreen);
  if (fullscreen === false) {
    asscroll.disable();
    gsap.to(jQuery(".carousel"), 1, {
      position: "absolute",
      paddingBottom: "0",
      height: "100vh",
      width: "100vw",
      background: "#fff",
      scale: 1.05,
      ease: "Expo.easeInOut",
    });
    fullscreen = true;
  } else {
    fullscreen = false;
    gsap.to(jQuery(".carousel"), 1.4, {
      position: "relative",
      paddingBottom: "45%",
      height: "auto",
      width: "100%",
      background: "transparent",
      scale: 1,
      ease: "Expo.easeInOut",
    });
  }
});

// VWEB CMS MS-IE  Exp. Operator //
jQuery(document).ready(function () {
  function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  }

  if (isIE()) {
  } else {
  }
});
//VWEB CMS MB Devcie Run

if (
  /Android|webOS|iPhone|iPod|Tablet|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  jQuery(document).ready(function () {});

  function vwebTouchfunction() {
    jQuery(".vwebswipe").fadeOut(700);
  }
}

if (
  /Android|webOS|iPhone|iPod|Tablet|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
}

jQuery(document).ready(function () {
  jQuery(".contact-address span.jicons-text").remove();
});

if (jQuery(".chosen-container").length > 0) {
  jQuery(".chosen-container").on("touchstart", function (e) {
    e.stopPropagation();
    e.preventDefault();
    jQuery(this).trigger("mousedown");
  });
}

jQuery(document).ready(function () {
  jQuery(".mod-vweb-articles-category-wrapper .row").addClass(
    "owl-carousel owl-theme first"
  );
  jQuery(".owl-carousel .owl-dots .owl-dot").append(
    '<svg class="countdown"><circle cx="8" cy="8" r="2.5" fill="#fff"></circle><circle class="circletimer" r="5.5" cx="8" cy="8"></circle></svg>'
  );
  jQuery("div.vwebsocialshare-container").insertAfter(
    "div.mugo_project_service"
  );
  jQuery("div.vwebsocialshare-container").insertAfter("div.article-params");
  jQuery(
    ".vwebsocialshare-container .vwebsocialshare-share-fbsh a span"
  ).remove();
  jQuery(".vwebsocialshare-container .vwebsocialshare-share-fbsh a").append(
    '<span class="vwebsocialshare-share-fbshcustom fa fa-facebook-f"></span>'
  );
  jQuery(".vwebsocialshare-container .vwebsocialshare-share-lin a").append(
    '<span class="vwebsocialshare-share-lincustom fa fa-linkedin-in"></span>'
  );
  jQuery(
    ".vwebsocialshare-container .vwebsocialshare-share-pinterest a"
  ).append(
    '<span class="vwebsocialshare-share-pinterestcustom fa fa-pinterest"></span>'
  );
  jQuery("body:lang(en) .vwebsocialshare-container").append(
    "<h5>SOCIAL MEDIA</h5>"
  );
  jQuery("body:lang(ru) .vwebsocialshare-container").append(
    "<h5>СОЦИАЛЬНЫЕ МЕДИА</h5>"
  );
  jQuery("body:lang(ka) .vwebsocialshare-container").append(
    "<h5 class='caps'>სოც მედია</h5>"
  );
  jQuery("body:lang(en) .vwebsocialshare-container").append(
    "<div class='vweb-share-heading'>Share</div>"
  );
  jQuery("body:lang(ru) .vwebsocialshare-container").append(
    "<div class='vweb-share-heading'>Поделиться</div>"
  );
  jQuery("body:lang(ka) .vwebsocialshare-container").append(
    "<div class='vweb-share-heading'>გაზიარება</div>"
  );
  jQuery(".vwebsocialshare-container h5").insertBefore(
    ".vwebsocialshare-subcontainer"
  );
  jQuery("div.vweb-share-heading").insertBefore(
    ".vwebsocialshare-subcontainer"
  );
  jQuery(".vweb-sp-more-projects-wrapper .owl-dots").insertAfter(
    ".vweb-sp-more-projects-wrapper"
  );
});
jQuery(function () {
  var header = jQuery("");
  jQuery(window).scroll(function () {
    var scroll = jQuery(window).scrollTop();
    if (scroll >= 1) {
      header
        .addClass(" scrolled")
        .attr(
          "style",
          "background-color:#fff; position: fixed; padding-top: 25px; padding-bottom: 15px; border-bottom: 1px #ececec solid"
        );
    } else {
      header.removeClass(" scrolled").removeAttr("style");
    }
  });
});
jQuery(document).ready(function () {
  if (
    /Android|webOS|iPhone|iPod|iPad|Tablet|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return false;
  } else {
    jQuery(".blog.root .items-row.row-1 .item .item-wrap")
      .insertBefore(".blog .items-row.row-1 .item .item-image")
      .addClass("padding-right");
    jQuery(".blog.root .items-row.row-1 .item .item-category").addClass(
      "align-right"
    );
    jQuery(".blog.root .items-row.row-3 .item .item-wrap")
      .insertBefore(".blog .items-row.row-3 .item .item-image")
      .addClass("padding-right");
    jQuery(".blog.root .items-row.row-3 .item .item-category").addClass(
      "align-right"
    );
    jQuery(".blog.root .items-row.row-5 .item .item-wrap")
      .insertBefore(".blog .items-row.row-5 .item .item-image")
      .addClass("padding-right");
    jQuery(".blog.root .items-row.row-5 .item .item-category").addClass(
      "align-right"
    );
    jQuery(".blog.root .items-row.row-7 .item .item-wrap")
      .insertBefore(".blog .items-row.row-7 .item .item-image")
      .addClass("padding-right");
    jQuery(".blog.root .items-row.row-7 .item .item-category").addClass(
      "align-right"
    );
    jQuery(".blog.root .items-row.row-9 .item .item-wrap")
      .insertBefore(".blog .items-row.row-9 .item .item-image")
      .addClass("padding-right");
    jQuery(".blog.root .items-row.row-9 .item .item-category").addClass(
      "align-right"
    );
    jQuery(".blog.root .items-row.row-11 .item .item-wrap")
      .insertBefore(".blog .items-row.row-11 .item .item-image")
      .addClass("padding-right");
    jQuery(".blog.root .items-row.row-11 .item .item-category").addClass(
      "align-right"
    );

    jQuery(".services .items-row.row-1 .item .item-wrap")
      .insertBefore(".services .items-row.row-1 .item .item-image")
      .addClass("padding-right");

    jQuery(".services .items-row.row-3 .item .item-wrap")
      .insertBefore(".services .items-row.row-3 .item .item-image")
      .addClass("padding-right");

    jQuery(".services .items-row.row-5 .item .item-wrap")
      .insertBefore(".services .items-row.row-5 .item .item-image")
      .addClass("padding-right");

    jQuery(".services .items-row.row-7 .item .item-wrap")
      .insertBefore(".services .items-row.row-7 .item .item-image")
      .addClass("padding-right");
  }
});
// Fallback of not having link
jQuery("li:not(:has(a))").addClass("unlinked");

//Video Custom Article
jQuery(document).ready(function () {
  jQuery(function () {
    var vwebMediaVideo = jQuery(
      ".featured-articles .mod-vweb-category .item .item-image.mod-article-image video.item-video"
    );
    vwebMediaVideo.hover(
      function () {
        jQuery(this);
        this.play();
      },
      function () {
        jQuery(this);
        this.pause();
      }
    );
  });
});

//TABs
jQuery(document).ready(function () {
  jQuery(".tabs-menu a").click(function (event) {
    event.preventDefault();
    jQuery(this).parent().addClass("current");
    jQuery(this).parent().siblings().removeClass("current");
    var tab = jQuery(this).attr("href");
    jQuery(".tab-content").not(tab).css("display", "none");
    jQuery(tab).fadeIn(1200);
  });
});

//jQuery Cursor
jQuery(document).ready(function () {
  var mouseX = 0,
    mouseY = 0;
  var xp = 0,
    yp = 0;
  jQuery(document).mousemove(function (e) {
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30;
  });
  setInterval(function () {
    xp += (mouseX - xp) / 6;
    yp += (mouseY - yp) / 6;
    jQuery("").css({
      left: xp + "px",
      top: yp + "px",
      cursor: "none",
    });
  }, 15);
});
jQuery(document).ready(function () {
  jQuery(".vweb-slider ul li").each(function () {
    jQuery(":not(.slotholder, .defaultimg, .vweb-videolayer)", this).wrapAll(
      '<div class="captions-wrapper"></div>'
    );
  });
});

// Calculate Elements Dimensions
function calcDimension() {
  var bodyWidth = jQuery(window).width();
  var bodyHeight = jQuery(window).height();
  var Item = jQuery(".projects .grid-item.default .item-image");
  var ItemVertical = jQuery(".projects .grid-item.vertical .item-image");
  var ItemHorizontalBig = jQuery(
    ".projects .grid-item.horizontal-big .item-image"
  );
  var ItemHorizontalHalf = jQuery(
    ".projects .grid-item.horizontal-half .item-image"
  );
  var value =
    parseFloat(jQuery(".projects .item .item-image").innerWidth()) / 1;
  //jQuery('.system').text(value.toFixed(2));
  var Multiplier = parseFloat(2.0);
  var NavMobile = jQuery(".mob-nav");
  var Slider = jQuery(".slider");
  var CarouselBlog = jQuery("div.carousel.blog");
  var Cover = jQuery(".cover");
  var Covers = jQuery(".page-cover");
  var ProjectCover = jQuery(".project.article-cover");
  var ServiceCover = jQuery(".services.article-cover");
  var BlogCover = jQuery(".blog.article-cover");
  var screenWidth = jQuery(window).width();
  var screenHeight = jQuery(window).height();
  var stylesSlider = {
    height: screenHeight * 0.8,
    width: screenWidth,
  };

  var ItemParams = {
    height: value.toFixed(2) - 50,
  };

  var ItemVerticalParams = {
    height: value.toFixed(2) * Multiplier.toFixed(2) - 100,
  };

  var ItemHorizontalBigParams = {
    height: value.toFixed(2) * Multiplier.toFixed(2) - 100,
  };

  var ItemHorizontalHalfParams = {
    height: value.toFixed(2) - 50,
  };

  var stylesCarousel = {
    height: screenHeight * 0.5,
    width: screenWidth,
  };

  var stylesCarouselMobile = {
    height: screenHeight * 0.6,
    width: screenWidth,
  };

  var stylesCover = {
    height: screenHeight * 0.6,
  };

  var stylesProjectCover = {
    height: screenHeight * 0.75,
    width: screenWidth,
  };

  var stylesServiceCover = {
    height: screenHeight * 0.4,
    width: screenWidth,
  };

  var stylesBlogCover = {
    height: screenHeight * 0.4,
    width: screenWidth,
  };

  var stylesBlogCoverMobile = {
    height: screenHeight * 0.6,
    width: screenWidth,
  };

  var stylesProjectCoverMobile = {
    height: screenHeight * 0.85,
    width: screenWidth,
  };

  var stylesSliderMobile = {
    height: screenHeight,
    width: screenWidth,
  };

  var stylesNavMobile = {
    height: screenHeight,
    width: screenWidth,
  };

  // Breakpoints
  if (bodyHeight <= 538) {
    jQuery(Slider).addClass("mobile");
  } else {
    jQuery(Slider).removeClass("mobile");
  }

  if (bodyHeight <= 600) {
    jQuery(Covers).addClass("fullscreen");
    jQuery(".captions-wrapper").addClass("actdown");
  } else {
    jQuery(Covers).removeClass("fullscreen");
    jQuery(".captions-wrapper").removeClass("actdown");
  }

  if (bodyHeight <= 768) {
    jQuery(Slider).css(stylesSliderMobile);
  } else {
    jQuery(Slider).css(stylesSlider);
  }

  if (bodyWidth <= 992) {
    jQuery(ProjectCover).css(stylesProjectCoverMobile);
    jQuery(BlogCover).css(stylesBlogCoverMobile);
    jQuery(CarouselBlog).css(stylesCarouselMobile);
  } else {
    jQuery(ProjectCover).css(stylesProjectCover);
    jQuery(BlogCover).css(stylesBlogCover);
    jQuery(CarouselBlog).css(stylesCarousel);
  }

  jQuery(NavMobile).css(stylesNavMobile);
  jQuery(Cover).css(stylesCover);
  jQuery(ServiceCover).css(stylesServiceCover);
  jQuery(Item).css(ItemParams);
  jQuery(ItemVertical).css(ItemVerticalParams);
  jQuery(ItemHorizontalBig).css(ItemHorizontalBigParams);
  jQuery(ItemHorizontalHalf).css(ItemHorizontalHalfParams);
}

jQuery(document).ready(function () {
  calcDimension();
});

jQuery(window).resize(function () {
  calcDimension();
});

//Init Masonry
jQuery(window).on("load", function (e) {
  jQuery(".grid").isotope({
    itemSelector: ".grid-item",
    percentPosition: true,
    masonry: {
      columnWidth: ".grid-sizer",
      gutter: false,
      fitWidth: false,
      horizontalOrder: false,
    },
  });
});

//Remove GSAP Items
jQuery(document).ready(function () {
  // Responsive Levels For Elements
  function actWidth() {
    var cp = jQuery(".v-c");
    var p = jQuery(".p");
    var c = jQuery(".c");
    var bodyWidth = jQuery(window).width();
    var nav = jQuery(".navbar-expand-lg .navbar-collapse");
    if (bodyWidth <= 992) {
      jQuery(".inverse").insertBefore(".reverse");
      nav.addClass("d-none").attr("style", "display: none !important");
      c.addClass("d-none");
      p.addClass("d-none");
      cp.addClass("d-none");
    } else {
      jQuery(".reverse").insertBefore(".inverse");
      nav.removeAttr("style", "display: none !important");
      c.removeClass("d-none");
      p.removeClass("d-none");
      cp.removeClass("d-none");
    }
  }

  jQuery(document).ready(function () {
    actWidth();
  });
  jQuery(window).resize(function () {
    actWidth();
  });
});

// GSAP Detect Mobile
jQuery(document).ready(function () {
  if (
    /Android|webOS|iPhone|iPod|iPad|Tablet|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    jQuery("div.asscroll-container").addClass("content-is-mobile");
    jQuery("main").addClass("full");
    jQuery("html").addClass("is-mobile");
    return false;
  } else {
  }
});

// Contact Page System Message Container
jQuery(document).ready(function () {
  jQuery(".system").insertBefore(".contact.wrapper .contact-form");
});

// V-Video
jQuery(document).ready(function () {
  var video = jQuery("#v-video").V_Video({
    showFullScreen: true,
    showSoundControl: true,
  });
});
