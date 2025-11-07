//------------------------- Preloader
$(function () {
  setTimeout(() => {
    $(".preloader").fadeOut("slow");
  }, 1000);
});
// ------------------------- scroll header
(function ($) {
  "use strict";
  $(function () {
    $(document).on("click", ".navbar-anchor", function (e) {
      var $menu = $(this).next(".ul-design");

      
      if ($menu.length) {
        e.preventDefault();
      } else {
        return; 
      }

      var $allMenus = $(".ul-design.show");
      if ($menu.hasClass("show")) {
        $menu.css({
          transform: "translateY(15px)",
          opacity: "0",
        });
        setTimeout(function () {
          $menu.removeClass("show");
        }, 350);
      } else {
        $allMenus.each(function () {
          $(this).css({
            transform: "translateY(15px)",
            opacity: "0",
          });
          setTimeout(
            function () {
              $(this).removeClass("show");
            }.bind(this),
            350
          );
        });
        $menu.addClass("show").css({
          transform: "translateY(0)",
          opacity: "1",
        });
      }
    });
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".li-nav").length) {
        $(".ul-design.show").each(function () {
          $(this).css({
            transform: "translateY(15px)",
            opacity: "0",
          });
          setTimeout(
            function () {
              $(this).removeClass("show");
            }.bind(this),
            350
          );
        });
      }
    });
  });
})(jQuery);
// ------------------------------- Header scroll Active
(function ($) {
  "use strict";
  $(window).on("scroll", function () {
    const scrollTop = parseInt($(this).scrollTop(), 10);
    if (scrollTop > 0) {
      $("[data-header]").addClass("active");
    } else {
      $("[data-header]").removeClass("active");
    }
  });
})(jQuery);
// ------------------------- menu open close
(function ($) {
  "use strict";
  $(function () {
    $(document).on("click", ".menu-design", function () {
      $("#menu").addClass("active");
    });
    $(document).on("click", ".close-btn", function () {
      $("#menu").removeClass("active");
    });
    $(document).on("click", ".menu-anhor", function () {
      $(".menu-anhor p, .menu-anhor i").css("color", "");
      $(this).find("p, i").css("color", "#9FD456");
    });
  });
})(jQuery);
// ----------------------- drop down open close
(function ($) {
  "use strict";
  $(function () {
    $(document).on("click", ".menu-anhor", function () {
      const $clickedDropdown = $(this).next(".under-menu-li");
      const $clickedIcon = $(this).find("i");
      const isOpen = $clickedDropdown.hasClass("open");
      $(".under-menu-li.open")
        .not($clickedDropdown)
        .each(function () {
          const $otherDropdown = $(this);
          const $otherIcon = $otherDropdown.prev(".menu-anhor").find("i");
          $otherDropdown.animate(
            { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 },
            500,
            "swing",
            function () {
              $otherDropdown.removeClass("open");
            }
          );
          $otherIcon.css({
            transition: "transform 0.4s ease",
            transform: "rotate(0deg)",
          });
        });
      if (isOpen) {
        $clickedDropdown.animate(
          { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 },
          500,
          "swing",
          function () {
            $clickedDropdown.removeClass("open");
          }
        );
        $clickedIcon.css({
          transition: "transform 0.4s ease",
          transform: "rotate(0deg)",
        });
      } else {
        $clickedDropdown.css({
          height: "auto",
          paddingTop: 40,
          paddingBottom: 20,
        });
        const fullHeight = parseInt($clickedDropdown.outerHeight(), 10);
        $clickedDropdown.css({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          opacity: 0,
        });
        $clickedDropdown.addClass("open").animate(
          {
            height: fullHeight,
            paddingTop: 40,
            paddingBottom: 20,
            opacity: 1,
          },
          500,
          "swing",
          function () {
            $clickedDropdown.css("height", "auto");
          }
        );
        $clickedIcon.css({
          transition: "transform 0.4s ease",
          transform: "rotate(45deg)",
        });
      }
    });
  });
})(jQuery);
// ------------------------ smoth scroll
(function ($) {
  "use strict";
  $(function () {
    const $body = $("body");
    const $jsScroll = $(".js-scroll");
    const speed = 0.02;
    let offset = 0;
    let raf;
    if ($jsScroll.length) {
      function setBodyHeight() {
        const height = $jsScroll[0].getBoundingClientRect().height;
        $body.css("height", parseInt(height, 10) + "px");
      }
      setBodyHeight();
      $(window).on("resize", setBodyHeight);
      function smoothScroll() {
        offset += (window.pageYOffset - offset) * speed;
        $jsScroll.css("transform", `translateY(-${offset}px) translateZ(0)`);
        raf = requestAnimationFrame(smoothScroll);
      }
      smoothScroll();
    }
  });
})(jQuery);
// ----------------------- left counter dersign
(function ($) {
  "use strict";
  $(function () {
    let counterStarted = false;
    function isInViewport($el) {
      if ($el.length === 0) return false;
      const elementTop = $el.offset().top;
      const elementBottom = elementTop + $el.outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
    function startCounter() {
      $(".count").each(function () {
        const $this = $(this);
        let startNumber = 0;
        const target = parseInt($this.data("number"), 10);
        const counter = setInterval(function () {
          startNumber++;
          $this.text(startNumber);
          if (startNumber >= target) {
            clearInterval(counter);
          }
        }, 150);
      });
    }
    $(window).on("scroll load", function () {
      const $aboutData = $(".about-data");
      if ($aboutData.length && !counterStarted && isInViewport($aboutData)) {
        counterStarted = true;
        startCounter();
      }
    });
  });
})(jQuery);
// ---------------------- Second counter
(function ($) {
  "use strict";
  $(function () {
    let started = false;
    function isInViewport($el) {
      const rect = $el[0].getBoundingClientRect();
      return (
        rect.top < (window.innerHeight || $(window).height()) &&
        rect.bottom >= 0
      );
    }
    function startCounter() {
      $(".counter-js").each(function () {
        const $counter = $(this);
        let count = 0;
        const target = parseInt($counter.data("count"), 10);
        function updateCount() {
          if (count < target) {
            count++;
            $counter.text(count);
            setTimeout(updateCount, 10);
          } else {
            $counter.text(target);
          }
        }
        updateCount();
      });
    }
    $(window).on("scroll", function () {
      if (!started) {
        const $triggerElements = $(".bihind-the-squre");
        $triggerElements.each(function () {
          if (isInViewport($(this))) {
            started = true;
            setTimeout(function () {
              startCounter();
            }, 2000);
            return false;
          }
        });
      }
    });
  });
})(jQuery);
// --------------------- appointment slider
(function ($) {
  "use strict";
  $(function () {
    const images = [
      "assets/images/appointment/image-1.png",
      "assets/images/appointment/image-2.png",
      "assets/images/appointment/image-3.png",
      "assets/images/appointment/image-4.png",
    ];
    let index = 0;
    const $div = $(".main-div-appoint");
    // Initial background
    $div.css("background-image", "url(" + images[index] + ")");
    // Auto-change every 3 seconds
    setInterval(function () {
      index = (index + 1) % images.length;
      $div.css("background-image", "url(" + images[index] + ")");
    }, 3000);
  });
})(jQuery);
// --------------------- Date time
$(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    duration: "fast",
  });
});
$(document).ready(function () {
  $("#datepicker").on("change keyup", function () {
    if ($(this).val().trim() !== "") {
      $(".data-relative").show();
    } else {
      $(".data-relative").show();
    }
  });
});
// ------------------ Succes slider
$(document).ready(function () {
  $(".design-slick-succes-main").slick({
    centermode: true,
    slidesToShow: 4,
    centerPadding: "40px",
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 2000,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
// ------------------ testimonail all slider
$(document).ready(function () {
  $(".testimonial-detail").slick({
    centerMode: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 800,
    dots: true,
    fade: true,
    autoplay: true,
    cssEase: "linear",
    asNavFor: ".image-testimonail-slide",
  });
  $(".image-testimonail-slide").slick({
    centerMode: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 800,
    fade: true,
    autoplay: true,
    cssEase: "linear",
    asNavFor: ".testimonial-detail",
  });
});
// -------------------------- FAQ Section Design
(function ($) {
  "use strict";
  $(function () {
    $(document).on("click", ".faq-question", function () {
      const parent = $(this).parent();
      $(".faq-question p").css("color", "");
      $(".data-open-faq").css("display", "flex");
      $(".data-close-faq").hide();
      if (!parent.hasClass("active")) {
        $(".faq-item").removeClass("active");
        $(".faq-answer").slideUp(300);
        $(".line-faq").slideUp(300);
        parent.addClass("active");
        parent.find(".faq-answer").slideDown(300);
        parent.find(".line-faq").slideDown(300);
        $(this).find("p").css("color", "#9FD456");
        $(this).find(".data-open-faq").hide();
        $(this).find(".data-close-faq").css("display", "flex");
      } else {
        parent.removeClass("active");
        parent.find(".faq-answer").slideUp(300);
        parent.find(".line-faq").slideUp(300);
        $(this).find(".data-open-faq").css("display", "flex");
        $(this).find(".data-close-faq").hide();
      }
    });
  });
})(jQuery);
// --------------------- video-popup
$(document).ready(function () {
  $(".popup-youtube").magnificPopup({
    type: "iframe",
  });
});
/*----------------------- Whole Page Scrolling Animation -----------------------------*/
$(document).ready(function () {
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      $(entry.target).toggleClass("show", entry.isIntersecting);
    });
  });
  let hiddenElements = $(
    ".fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down"
  );
  hiddenElements.each(function () {
    observer.observe(this);
  });
});
// --------------------- separate scroll
$(window).on("scroll", function () {
  const scrollTop = parseInt($(this).scrollTop(), 10);
  if (scrollTop > 5) {
    $("[data-header]").addClass("active");
  } else {
    $("[data-header]").removeClass("active");
  }
});
// ------------- signle team-progress design
(function ($) {
  "use strict";
  $(document).on("DOMContentLoaded", function () {
    let progressAnimated = false;
    function isInViewport($el) {
      if ($el.length === 0) return false;
      const elementTop = $el.offset().top;
      const elementBottom = elementTop + $el.outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
    function startProgress() {
      setTimeout(function () {
        $(".progress-bar").each(function () {
          const $this = $(this);
          const percent = parseInt($this.data("percent"), 10);
          const $percentText = $this
            .closest(".skill-box")
            .find(".skill-percent");
          const progressWidth = $this.closest(".progress").width();
          $this.animate(
            { width: percent + "%" },
            {
              duration: 1500,
              step: function (now) {
                const current = parseInt(now, 10);
                $percentText.text(current + "%");
                const moveX = (now / 100) * (progressWidth - 30);
                $percentText.css("transform", "translateX(" + moveX + "px)");
              },
              complete: function () {
                $percentText.text(percent + "%");
              },
            }
          );
        });
      }, 100);
    }
    $(window).on("scroll resize", function () {
      const $target = $(".data-term-team");
      if ($target.length && !progressAnimated && isInViewport($target)) {
        progressAnimated = true;
        startProgress();
      }
    });
  });
})(jQuery);
// ----------------------------------- FAQ data
(function ($) {
  "use strict";
  $(document).on("DOMContentLoaded", function () {
    $(document).on("click", ".question-design-li", function (e) {
      e.preventDefault();
      $(".question-design-li").removeClass("active");
      $(this).addClass("active");
    });
  });
})(jQuery);
// ------------------------ testimonail loader
(function ($) {
  "use strict";
  $(document).on("DOMContentLoaded", function () {
    $(".seprate-test").slice(0, 9).show();
    $(document).on("click touchstart", ".load-more", function (e) {
      e.preventDefault();
      $(".seprate-test:hidden").slice(0, 3).slideDown();
      if ($(".seprate-test:hidden").length === 0) {
        $(".load-more").css("visibility", "hidden");
        $(".data-spot-testimonial").css("display", "none");
      }
      $("html, body").animate(
        {
          scrollTop: $(this).offset().top,
        },
        1000
      );
    });
  });
})(jQuery);
// ------------------------ project-1 loader
(function ($) {
  "use strict";
  $(document).on("DOMContentLoaded", function () {
    $(".data-project-1").slice(0, 9).show();
    $(document).on("click touchstart", ".load-more", function (e) {
      e.preventDefault();
      $(".data-project-1:hidden").slice(0, 3).slideDown();
      if ($(".data-project-1:hidden").length === 0) {
        $(".load-more").css("visibility", "hidden");
        $(".data-spot-testimonial").css("display", "none");
      }
      $("html, body").animate(
        {
          scrollTop: $(this).offset().top,
        },
        1000
      );
    });
  });
})(jQuery);
// ------------------------ project-2 loader
(function ($) {
  "use strict";
  $(document).on("DOMContentLoaded", function () {
    $(".project-two").slice(0, 9).show();
    $(document).on("click touchstart", ".load-more", function (e) {
      e.preventDefault();
      $(".project-two:hidden").slice(0, 3).slideDown();
      if ($(".project-two:hidden").length === 0) {
        $(".load-more").css("visibility", "hidden");
        $(".data-spot-testimonial").css("display", "none");
      }
      $("html, body").animate(
        {
          scrollTop: $(this).offset().top,
        },
        1000
      );
    });
  });
})(jQuery);
// -------------------- project three slider
$(function () {
  var $slider = $(".slideshow .slider"),
    maxItems = $(".item", $slider).length,
    dragging = false,
    tracking,
    rightTracking;
  var $sliderRight = $(".slideshow")
    .clone()
    .addClass("slideshow-right")
    .appendTo($(".split-slideshow"));
  var rightItems = $(".item", $sliderRight).toArray();
  var reverseItems = rightItems.reverse();
  $(".slider", $sliderRight).html("");
  for (var i = 0; i < maxItems; i++) {
    $(reverseItems[i]).appendTo($(".slider", $sliderRight));
  }
  $(".slideshow-right .slider").slick({
    swipe: false,
    vertical: true,
    arrows: false,
    infinite: true,
    speed: 950,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    initialSlide: maxItems - 1,
  });
  if ($(".slideshow-text").length) {
    $(".slideshow-text").slick({
      swipe: false,
      vertical: true,
      arrows: false,
      infinite: true,
      speed: 900,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    });
  }
  $slider.addClass("slideshow-left");
  $(".slideshow-left")
    .slick({
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      infinite: true,
      dots: true,
      speed: 1000,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var rightSlider = $(".slideshow-right .slider");
      var textSlider = $(".slideshow-text");
      if (
        currentSlide > nextSlide &&
        nextSlide === 0 &&
        currentSlide === maxItems - 1
      ) {
        rightSlider.slick("slickGoTo", -1);
        textSlider.length && textSlider.slick("slickGoTo", maxItems);
      } else if (
        currentSlide < nextSlide &&
        currentSlide === 0 &&
        nextSlide === maxItems - 1
      ) {
        rightSlider.slick("slickGoTo", maxItems);
        textSlider.length && textSlider.slick("slickGoTo", -1);
      } else {
        rightSlider.slick("slickGoTo", maxItems - 1 - nextSlide);
        textSlider.length && textSlider.slick("slickGoTo", nextSlide);
      }
    })
    .on("mousewheel", function (event) {
      event.preventDefault();
      if (event.deltaY < 0) {
        $(this).slick("slickNext");
      } else {
        $(this).slick("slickPrev");
      }
    })
    .on("mousedown touchstart", function () {
      dragging = true;
      tracking = $(".slick-track", $slider).css("transform");
      tracking = tracking !== "none" ? parseInt(tracking.split(",")[5]) : 0;
      rightTracking = $(".slideshow-right .slick-track").css("transform");
      rightTracking =
        rightTracking !== "none" ? parseInt(rightTracking.split(",")[5]) : 0;
    })
    .on("mousemove touchmove", function () {
      if (dragging) {
        var newTracking = $(".slideshow-left .slick-track").css("transform");
        newTracking =
          newTracking !== "none" ? parseInt(newTracking.split(",")[5]) : 0;
        var diffTracking = newTracking - tracking;
        $(".slideshow-right .slick-track").css({
          transform:
            "matrix(1, 0, 0, 1, 0, " + (rightTracking - diffTracking) + ")",
        });
      }
    })
    .on("mouseleave touchend mouseup", function () {
      dragging = false;
    });
});
// ----------------------------- Project Four
(function ($) {
  "use strict";
  const images = [
    { src: "assets/images/project-3/image-1.png", text: "Residential Solar" },
    { src: "assets/images/project-3/image-2.png", text: "Commercial Solar" },
    { src: "assets/images/project-3/image-3.png", text: "Solar Panel" },
    { src: "assets/images/project-3/image-4.png", text: "Hybrid Solar" },
  ];
  $(document).ready(function () {
    const cols = 3;
    const $main = $("#main");
    const parts = [];
    let current = 0;
    let playing = false;
    $.each(images, function (i, imgObj) {
      $("<img/>")[0].src = imgObj.src;
    });
    for (let col = 0; col < cols; col++) {
      const $part = $("<div>")
        .addClass("part")
        .css("--x", (-100 / cols) * col + "vw");
      const $section = $("<div>").addClass("section");
      const $img = $("<img>").attr("src", images[current].src);
      $section.append($img);
      if (col === Math.floor(cols / 2)) {
        const $text = $("<a>")
          .addClass("project-four-text")
          .attr("href", "single-projects.html")
          .text(images[current].text);
        $section.append($text);
      }
      $part.append($section);
      $main.append($part);
      parts.push($part);
    }
    const animOptions = { duration: 2.3, ease: "power4.inOut" };
    function go(dir) {
      if (playing) return;
      playing = true;
      if (current + dir < 0) current = images.length - 1;
      else if (current + dir >= images.length) current = 0;
      else current += dir;
      function up($part, $next) {
        $part.append($next);
        gsap.to($part[0], {
          ...animOptions,
          y: -window.innerHeight,
          onComplete: function () {
            $part.children().first().remove();
            gsap.set($part[0], { y: 0 });
          },
        });
      }
      function down($part, $next) {
        $part.prepend($next);
        gsap.set($part[0], { y: -window.innerHeight });
        gsap.to($part[0], {
          ...animOptions,
          y: 0,
          onComplete: function () {
            $part.children().last().remove();
            playing = false;
          },
        });
      }
      $.each(parts, function (i, $part) {
        const $next = $("<div>").addClass("section");
        const $img = $("<img>").attr("src", images[current].src);
        $next.append($img);
        if (i === Math.floor(cols / 2)) {
          const $text = $("<a>")
            .addClass("project-four-text")
            .attr("href", "single-projects.html")
            .text(images[current].text);
          $next.append($text);
        }
        if ((i - Math.max(0, dir)) % 2) down($part, $next);
        else up($part, $next);
      });
    }
    $(window).on("keydown", function (e) {
      if (["ArrowDown", "ArrowRight"].includes(e.key)) go(1);
      else if (["ArrowUp", "ArrowLeft"].includes(e.key)) go(-1);
    });
    let startY = null;
    let endY = null;
    let clicked = false;
    function onStart(e) {
      clicked = true;
      startY = e.clientY || e.originalEvent.touches?.[0]?.clientY;
    }
    function onMove(e) {
      if (clicked) endY = e.originalEvent.touches?.[0]?.clientY;
    }
    function onEnd(e) {
      endY = e.clientY || endY;
      if (clicked && startY && Math.abs(startY - endY) >= 40) {
        go(startY - endY > 0 ? 1 : -1);
      }
      clicked = false;
      startY = null;
      endY = null;
    }
    $(window)
      .on("mousedown touchstart", onStart)
      .on("touchmove", onMove)
      .on("mouseup touchend", onEnd);
    let scrollTimeout;
    $(window).on("wheel mousewheel", function (e) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const deltaY =
          e.originalEvent.deltaY || e.originalEvent.wheelDelta * -1;
        if (deltaY < -40) go(-1);
        else if (deltaY >= 40) go(1);
      }, 50);
    });
  });
})(jQuery);
// ------------------------------------------ about-detail
$(document).ready(function () {
  $(".deright-sport").slick({
    centermode: false,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});
// ------------------------ blog-1 loader
(function ($) {
  "use strict";
  $(document).ready(function () {
    const $blogItems = $(".data-blog-1");
    const $loadMoreBtn = $(".load-more");
    const $testimonial = $(".data-spot-testimonial");
    $blogItems.slice(0, 9).css("display", "flex");
    $("body").on("click", ".load-more", function (e) {
      e.preventDefault();
      $blogItems
        .filter(":hidden")
        .slice(0, 3)
        .css({ display: "flex", opacity: 0 })
        .animate({ opacity: 1 }, 400);
      if ($blogItems.filter(":hidden").length === 0) {
        $loadMoreBtn.css("visibility", "hidden");
        $testimonial.hide();
      }
      $("html, body").animate(
        {
          scrollTop: $loadMoreBtn.offset().top,
        },
        600
      );
    });
  });
})(jQuery);
// ----------------------------------------- project 2
(function () {
  "use strict";
  const $$ = (selector, context = document) =>
    Array.prototype.slice.call(context.querySelectorAll(selector));
  function _fncSliderInit($slider, options) {
    const prefix = ".fnc-";
    const $slidesCont = $slider.querySelector(prefix + "slider__slides");
    const $slides = $$(prefix + "slide", $slider);
    const $controls = $$(prefix + "nav__control", $slider);
    const $controlsBgs = $$(prefix + "nav__bg", $slider);
    const $progressAS = $$(prefix + "nav__control-progress", $slider);
    const numOfSlides = $slides.length;
    let curSlide = 1;
    let sliding = false;
    const computedStyle = getComputedStyle($slidesCont);
    const slidingAT = parseFloat(computedStyle.transitionDuration || 0) * 1000;
    const slidingDelay = parseFloat(computedStyle.transitionDelay || 0) * 1000;
    let autoSlidingActive = false;
    let autoSlidingTO;
    const autoSlidingDelay = 5000;
    let autoSlidingBlocked = false;
    let $activeSlide, $activeControlsBg, $prevControl;
    // Assign unique IDs
    $slides.forEach(($slide, i) => $slide.classList.add(`fnc-slide-${i + 1}`));
    $controls.forEach(($control, i) => {
      $control.dataset.slide = i + 1;
      $control.classList.add(`fnc-nav__control-${i + 1}`);
    });
    $controlsBgs.forEach(($bg, i) => $bg.classList.add(`fnc-nav__bg-${i + 1}`));
    function afterSlidingHandler() {
      const prevSlide = $slider.querySelector(".m--previous-slide");
      const prevNavBg = $slider.querySelector(".m--previous-nav-bg");
      prevSlide?.classList.remove("m--active-slide", "m--previous-slide");
      prevNavBg?.classList.remove("m--active-nav-bg", "m--previous-nav-bg");
      $activeSlide.classList.remove("m--before-sliding");
      $activeControlsBg?.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      void $prevControl.offsetTop; // force reflow
      $prevControl.classList.remove("m--reset-progress");
      sliding = false;
      if (autoSlidingActive && !autoSlidingBlocked) setAutoslidingTO();
    }
    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      clearTimeout(autoSlidingTO);
      curSlide = slideID;
      $prevControl = $slider.querySelector(".m--active-control");
      $prevControl?.classList.remove("m--active-control");
      $prevControl?.classList.add("m--prev-control");
      const newControl = $slider.querySelector(
        `${prefix}nav__control-${slideID}`
      );
      newControl?.classList.add("m--active-control");
      $activeSlide = $slider.querySelector(`${prefix}slide-${slideID}`);
      $activeControlsBg = $slider.querySelector(`${prefix}nav__bg-${slideID}`);
      const oldSlide = $slider.querySelector(".m--active-slide");
      const oldNavBg = $slider.querySelector(".m--active-nav-bg");
      oldSlide?.classList.add("m--previous-slide");
      oldNavBg?.classList.add("m--previous-nav-bg");
      $activeSlide.classList.add("m--before-sliding");
      $activeControlsBg?.classList.add("m--nav-bg-before");
      void $activeSlide.offsetTop; // force reflow
      $activeSlide.classList.add("m--active-slide");
      $activeControlsBg?.classList.add("m--active-nav-bg");
      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
    }
    function controlClickHandler(e) {
      e.preventDefault();
      if (sliding || this.classList.contains("m--active-control")) return;
      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }
      const slideID = parseInt(this.dataset.slide, 10);
      performSliding(slideID);
    }
    $controls.forEach(($control) =>
      $control.addEventListener("click", controlClickHandler)
    );
    function setAutoslidingTO() {
      clearTimeout(autoSlidingTO);
      const delay =
        parseInt(options.autoSlidingDelay || autoSlidingDelay, 10) +
        slidingAT +
        slidingDelay;
      curSlide = curSlide + 1 > numOfSlides ? 1 : curSlide + 1;
      autoSlidingTO = setTimeout(() => performSliding(curSlide), delay);
    }
    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;
      autoSlidingActive = true;
      setAutoslidingTO();
      $slider.classList.add("m--with-autosliding");
      const delay =
        parseInt(options.autoSlidingDelay || autoSlidingDelay, 10) +
        slidingDelay +
        slidingAT;
      $progressAS.forEach(
        ($progress) =>
          ($progress.style.transition = `transform ${delay / 1000}s`)
      );
    }
    const firstControl = $slider.querySelector(".fnc-nav__control:first-child");
    firstControl?.classList.add("m--active-control");
  }
  window.fncSlider = function (sliderSelector, options) {
    $$(sliderSelector).forEach(($slider) => _fncSliderInit($slider, options));
  };
  document.addEventListener("DOMContentLoaded", () => {
    fncSlider(".example-slider", { autoSlidingDelay: 4000 });
    const $demoCont = document.querySelector(".demo-cont");
    document.body.addEventListener("click", (e) => {
      if (e.target.closest(".fnc-slide__action-btn")) {
        $demoCont?.classList.toggle("credits-active");
      } else if (e.target.closest(".demo-cont__credits-close")) {
        $demoCont?.classList.remove("credits-active");
      } else if (e.target.closest(".js-activate-global-blending")) {
        document
          .querySelector(".example-slider")
          ?.classList.toggle("m--global-blending-active");
      }
    });
  });
})();
// -------------------- slider Comming soon
$(".slider-coming").slick({
  draggable: true,
  arrows: false,
  dots: false,
  fade: true,
  speed: 1200,
  infinite: true,
  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
  autoplay: true,
  autoplaySpeed: 1000,
  pauseOnHover: false,
});
// ------------------------------------ comming soon Time counter
(function ($) {
  "use strict";
  $(function () {
    var targetDate = new Date(Date.UTC(2026, 3, 1));
    var options = { year: "numeric", month: "long", day: "numeric" };
    var longDate = targetDate.toLocaleDateString("en-US", options);
    $("#long-date").text(longDate);
    var now = new Date();
    var days = daysBetween(now, targetDate);
    var secondsLeft = secondsDifference(now, targetDate);
    var hours = Math.floor(secondsLeft / 3600);
    secondsLeft -= hours * 3600;
    var minutes = Math.floor(secondsLeft / 60);
    secondsLeft -= minutes * 60;
    var seconds = Math.floor(secondsLeft);
    startCountdown(days, hours, minutes, seconds);
  });
  function daysBetween(date1, date2) {
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.round((date2 - date1) / oneDay);
  }
  function secondsDifference(date1, date2) {
    var oneDay = 1000 * 60 * 60 * 24;
    var difference = (date2 - date1) / oneDay;
    var offset = difference - Math.floor(difference);
    return offset * (60 * 60 * 24);
  }
  function startCountdown(days, hours, minutes, seconds) {
    var $days = $("#js-days");
    var $hours = $("#js-hours");
    var $minutes = $("#js-minutes");
    var $seconds = $("#js-seconds");
    $("#input-container").hide();
    $("#countdown-container").show();
    displayValue($days, days);
    displayValue($hours, hours);
    displayValue($minutes, minutes);
    displayValue($seconds, seconds);
    var interval = setInterval(function () {
      if (seconds > 0) {
        seconds--;
        displayValue($seconds, seconds);
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
        updateValues("minutes");
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
        updateValues("hours");
      } else if (days > 0) {
        days--;
        hours = 23;
        minutes = 59;
        seconds = 59;
        updateValues("days");
      } else {
        clearInterval(interval);
      }
    }, 1000);
    function updateValues(context) {
      if (context === "days") {
        displayValue($days, days);
        displayValue($hours, hours);
        displayValue($minutes, minutes);
        displayValue($seconds, seconds);
      } else if (context === "hours") {
        displayValue($hours, hours);
        displayValue($minutes, minutes);
        displayValue($seconds, seconds);
      } else if (context === "minutes") {
        displayValue($minutes, minutes);
        displayValue($seconds, seconds);
      }
    }
    function displayValue($target, value) {
      var newDigit = $("<span></span>").text(pad(value)).addClass("new");
      $target.prepend(newDigit);
      $target.find(".current").addClass("old").removeClass("current");
      setTimeout(function () {
        $target.find(".old").remove();
        $target.find(".new").addClass("current").removeClass("new");
      }, 900);
    }
  }
  function pad(number) {
    return ("0" + number).slice(-2);
  }
})(jQuery);
// ------------------------------ scrolll Btn
(function ($) {
  "use strict";
  $(function () {
    var $scrollBtn = $("#scroll");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $scrollBtn.fadeIn().css("display", "flex");
      } else {
        $scrollBtn.fadeOut();
      }
    });
    $scrollBtn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  });
})(jQuery);
/*------------------------------------- Index main background home slider-------------------------------------*/
$(document).ready(function () {
  $(".video-slider-slider")
    .slick({
      dots: false,
      fade: true,
      speed: 1000,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
      arrows: false,
      autoplay: true,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 1299,
          settings: {
            arrows: false,
          },
        },
      ],
    })
    .on("init", function () {
      $(".slick-active .slide-content").css({
        opacity: "1",
        transform: "translateY(0)",
      });
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(
        '.slick-slide[data-slick-index="' + currentSlide + '"] .slide-content'
      ).css({
        opacity: "0",
        transform: "translateY(30px)",
      });
    })
    .on("afterChange", function (event, slick, currentSlide) {
      $(
        '.slick-slide[data-slick-index="' + currentSlide + '"] .slide-content'
      ).css({
        opacity: "1",
        transform: "translateY(0)",
      });
    });
});
// ---------------------- trelxt
(function ($) {
  "use strict";
  $(function () {
    var $textElements = $(".title-about");
    function updateTextProgress() {
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      $textElements.each(function () {
        var $el = $(this);
        var elOffset = $el.offset().top;
        var start = elOffset - windowHeight * 0.8;
        var end = elOffset - windowHeight * 0.2;
        var progress = (scrollTop - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        $el.css("background-size", progress * 100 + "% 100%");
      });
    }
    var ticking = false;
    $(window).on("scroll resize", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateTextProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
    updateTextProgress();
  });
})(jQuery);
// ---------------------------------- services-detail-title
(function ($) {
  "use strict";
  $(function () {
    var $textElements = $(".services-detail-title");
    function updateTextProgress() {
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      $textElements.each(function () {
        var $el = $(this);
        var elOffset = $el.offset().top;
        var start = elOffset - windowHeight * 0.8;
        var end = elOffset - windowHeight * 0.2;
        var progress = (scrollTop - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        $el.css("background-size", progress * 100 + "% 100%");
      });
    }
    var ticking = false;
    $(window).on("scroll resize", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateTextProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
    updateTextProgress();
  });
})(jQuery);
// ---------------------------------------- Click data Offered
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const currentPage =
      window.location.pathname.split("/").pop() || "index-slider.html";
    const menuLinks = document.querySelectorAll(".ul-nav a");
    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || href.startsWith("javascript:")) return;
      const isMatch =
        href === currentPage ||
        (currentPage === "" && href === "index-slider.html") ||
        currentPage.includes(href);
      if (isMatch) {
        link.classList.add("active");
        const parent = link.closest(".ul-design");
        if (parent) {
          const parentTrigger = parent.previousElementSibling;
          if (parentTrigger && parentTrigger.tagName === "A") {
            parentTrigger.classList.add("active");
          }
        }
      }
    });
  });
})();
