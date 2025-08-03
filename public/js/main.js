jQuery.noConflict();
jQuery(document).ready(function ($) {
  // You can use $ here as an alias for jQuery
  var s = $(".bottom-bar");
  var pos = s.position();
  jQuery(window).scroll(function () {
    var windowpos = jQuery(window).scrollTop();
    if (windowpos >= pos.top && windowpos >= 50) {
      $(".bottom-bar").addClass("top");
    } else {
      $(".bottom-bar").removeClass("top");
    }
  });
});



// tabs Code
jQuery(".tabs a").click(function (e) {
  e.preventDefault();
  jQuery(".tabs a").removeClass("active");
  jQuery(this).addClass("active");
});

// Slider Code
const items = document.querySelectorAll(".slider");

const expand = (slider, i) => {
  items.forEach((it, ind) => {
    if (i === ind) return;
    it.clicked = false;
  });
  gsap.to(items, {
    width: slider.clicked ? "15vw" : "8vw",
    duration: 1,
    ease: "power2",
  });

  slider.clicked = !slider.clicked;
  gsap.to(slider, {
    width: slider.clicked ? "55vw" : "15vw",
    duration: 1,
    ease: "power2",
  });
};

items.forEach((slider, i) => {
  slider.clicked = false;
  slider.addEventListener("click", () => expand(slider, i));
});


// Search Form
jQuery(document).ready(function () {
  let searchForm = document.querySelector('.search-form');
  let searchBtn = document.querySelector('#search-btn');
  if (searchForm && searchBtn) {
    searchBtn.onclick = () => {
      searchForm.classList.toggle('active');
    };
  }
});

// Product Detail Slider
(function(jQuery) {
  jQuery(function () {
    jQuery(".attrib .option").click(function () {
      jQuery(this).siblings().removeClass("activ");
      jQuery(this).addClass("activ");
    });
    jQuery(".zoomControl").click(function () {
      jQuery(this).parents(".productCard").addClass("morph");
      jQuery("body").addClass("noScroll");
    });
    jQuery(".closePreview").click(function () {
      jQuery(this).parents(".productCard").removeClass("morph");
      jQuery("body").removeClass("noScroll");
    });
    jQuery(".movControl").click(function () {
      let imgActiv = jQuery(this).parents(".preview").find(".imgs img.activ");
      if (jQuery(this).hasClass("left")) {
        imgActiv.index() == 0
          ? jQuery(".imgs img").last().addClass("activ")
          : jQuery(".imgs img.activ").prev().addClass("activ");
      } else {
        imgActiv.index() == jQuery(".imgs img").length - 1
          ? jQuery(".imgs img").first().addClass("activ")
          : jQuery(".imgs img.activ").next().addClass("activ");
      }
      imgActiv.removeClass("activ");
    });
  });
})(jQuery);
