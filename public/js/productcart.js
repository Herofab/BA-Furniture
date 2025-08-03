let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
  if(cart.style.right == '-100%'){
      cart.style.right = '0';
      container.style.transform = 'translateX(-400px)';
  }else{
      cart.style.right = '-100%';
      container.style.transform = 'translateX(0)';
  }
})
close.addEventListener('click', function (){
  cart.style.right = '-100%';
  container.style.transform = 'translateX(0)';
})
let products = null;
// get data from file json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

//show datas product in list 
function addDataToHTML(){
    // remove datas default from HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // add new datas
    if(products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">Rs.${product.price}</div>
            <div class="aaloo">  <a href="#" class="heart-link"
            ><i class="fa-regular fa-heart"></i
          ></a>
            <button onclick="addCart(${product.id})">Add To Cart</button>
            </div>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}
//use cookie so the cart doesn't get lost on refresh page


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}             
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('cart-item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">Rs.${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}


("use strict");
!(function (t) {
  (t.fn.tilt = function (s) {
    var i = function () {
        this.ticking ||
          (requestAnimationFrame(g.bind(this)), (this.ticking = !0));
      },
      e = function () {
        t(this).on("mousemove", r),
          t(this).on("mouseenter", n),
          this.settings.reset && t(this).on("mouseleave", l);
      },
      a = function () {
        var s = this;
        void 0 !== this.timeout && clearTimeout(this.timeout),
          t(this).css({
            transition: this.settings.speed + "ms " + this.settings.easing,
          }),
          this.settings.glare &&
            this.glareElement.css({
              transition:
                "opacity " + this.settings.speed + "ms " + this.settings.easing,
            }),
          (this.timeout = setTimeout(function () {
            t(s).css({ transition: "" }),
              s.settings.glare && s.glareElement.css({ transition: "" });
          }, this.settings.speed));
      },
      n = function (s) {
        (this.ticking = !1),
          t(this).css({ "will-change": "transform" }),
          a.call(this),
          t(this).trigger("tilt.mouseEnter");
      },
      h = function (s) {
        return (
          "undefined" == typeof s &&
            (s = {
              pageX: t(this).offset().left + t(this).outerWidth() / 2,
              pageY: t(this).offset().top + t(this).outerHeight() / 2,
            }),
          { x: s.pageX, y: s.pageY }
        );
      },
      r = function (t) {
        (this.mousePositions = h(t)), i.call(this);
      },
      l = function () {
        a.call(this),
          (this.reset = !0),
          i.call(this),
          t(this).trigger("tilt.mouseLeave");
      },
      o = function () {
        var s = t(this).width(),
          i = t(this).height(),
          e = t(this).offset().left,
          a = t(this).offset().top,
          n = (this.mousePositions.x - e) / s,
          h = (this.mousePositions.y - a) / i,
          r = (this.settings.maxTilt / 2 - n * this.settings.maxTilt).toFixed(
            2
          ),
          l = (h * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(
            2
          ),
          o =
            Math.atan2(
              this.mousePositions.x - (e + s / 2),
              -(this.mousePositions.y - (a + i / 2))
            ) *
            (180 / Math.PI);
        return {
          tiltX: r,
          tiltY: l,
          percentageX: 100 * n,
          percentageY: 100 * h,
          angle: o,
        };
      },
      g = function () {
        return (
          (this.transforms = o.call(this)),
          this.reset
            ? ((this.reset = !1),
              t(this).css(
                "transform",
                "perspective(" +
                  this.settings.perspective +
                  "px) rotateX(0deg) rotateY(0deg)"
              ),
              void (
                this.settings.glare &&
                (this.glareElement.css(
                  "transform",
                  "rotate(180deg) scale(1.75)"
                ),
                this.glareElement.css(
                  "opacity",
                  "" + this.settings.maxGlare / 4
                ))
              ))
            : (t(this).css(
                "transform",
                "perspective(" +
                  this.settings.perspective +
                  "px) rotateX(" +
                  ("x" === this.settings.axis ? 0 : this.transforms.tiltY) +
                  "deg) rotateY(" +
                  ("y" === this.settings.axis ? 0 : this.transforms.tiltX) +
                  "deg) scale3d(" +
                  this.settings.scale +
                  "," +
                  this.settings.scale +
                  "," +
                  this.settings.scale +
                  ")"
              ),
              this.settings.glare &&
                (this.glareElement.css(
                  "transform",
                  "rotate(" + this.transforms.angle + "deg) scale(1.75)"
                ),
                this.glareElement.css(
                  "opacity",
                  "" +
                    (this.transforms.percentageY * this.settings.maxGlare) / 100
                )),
              t(this).trigger("change", [this.transforms]),
              void (this.ticking = !1))
        );
      },
      c = function () {
        if (!this.settings.glarePrerender) {
          t(this).append(
            '<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'
          ),
            (this.glareElementWrapper = t(this).find(".js-tilt-glare")),
            (this.glareElement = t(this).find(".js-tilt-glare-inner"));
          var s = {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          };
          this.glareElementWrapper.css(s).css({ overflow: "hidden" }),
            this.glareElement
              .css(s)
              .css({
                "background-image":
                  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                opacity: "" + this.settings.maxGlare / 2,
                transform: "rotate(180deg) scale(1.75)",
              });
        }
      };
    return (
      (t.fn.tilt.destroy = function () {
        t(this).each(function () {
          t(this).find(".js-tilt-glare").remove(),
            t(this).css({ "will-change": "", transform: "" }),
            t(this).off("mousemove mouseenter mouseleave");
        });
      }),
      (t.fn.tilt.getValues = function () {
        var s = [];
        return (
          t(this).each(function () {
            (this.mousePositions = h.call(this)), s.push(o.call(this));
          }),
          s
        );
      }),
      (t.fn.tilt.reset = function () {
        t(this).each(function () {
          var s = this;
          (this.mousePositions = h.call(this)),
            (this.settings = t(this).data("settings")),
            l.call(this),
            setTimeout(function () {
              s.reset = !1;
            }, this.settings.transition);
        });
      }),
      this.each(function () {
        var i = this;
        (this.settings = t.extend(
          {
            maxTilt: t(this).is("[data-tilt-max]")
              ? t(this).data("tilt-max")
              : 20,
            perspective: t(this).is("[data-tilt-perspective]")
              ? t(this).data("tilt-perspective")
              : 300,
            easing: t(this).is("[data-tilt-easing]")
              ? t(this).data("tilt-easing")
              : "cubic-bezier(.03,.98,.52,.99)",
            scale: t(this).is("[data-tilt-scale]")
              ? t(this).data("tilt-scale")
              : "1",
            speed: t(this).is("[data-tilt-speed]")
              ? t(this).data("tilt-speed")
              : "400",
            transition:
              !t(this).is("[data-tilt-transition]") ||
              t(this).data("tilt-transition"),
            axis: t(this).is("[data-tilt-axis]")
              ? t(this).data("tilt-axis")
              : null,
            reset:
              !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
            glare:
              !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
            maxGlare: t(this).is("[data-tilt-maxglare]")
              ? t(this).data("tilt-maxglare")
              : 1,
          },
          s
        )),
          (this.init = function () {
            t(i).data("settings", i.settings),
              i.settings.glare && c.call(i),
              e.call(i);
          }),
          this.init();
      })
    );
  }),
    t("[data-tilt]").tilt();
})(jQuery);



$(".button").click(function() {
  $(this).toggleClass("animate");
  $(this).toggleClass("active");
});
