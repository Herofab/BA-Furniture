window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });

  $(document).ready(function () {
    $("#toggle-nav").click(function () {
      $(".bottom-bar nav").slideToggle();
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar"); // Ensure this matches your navbar's class
    let atBottom = false;

    window.addEventListener(
      "scroll",
      function () {
        const windowHeight =
          "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
          // User is at the bottom of the page
          atBottom = true;
          navbar.classList.add("hidden");
        } else if (atBottom) {
          // User has scrolled up from the bottom
          atBottom = false;
          navbar.classList.remove("hidden");
        }
      },
      false
    );
  });

  document.addEventListener("DOMContentLoaded", function () {
    const showButton = document.getElementById("showFullscreenDiv");
    const fullscreenDiv = document.getElementById("fullscreenDiv");
    const closeButton = document.getElementById("closeFullscreenDiv");

    showButton.addEventListener("click", function () {
      fullscreenDiv.classList.add("show");
      fullscreenDiv.classList.remove("hide");
      fullscreenDiv.style.display = "block"; // Ensure it's visible for the animation
    });

    closeButton.addEventListener("click", function () {
      fullscreenDiv.classList.add("hide");
      setTimeout(() => {
        fullscreenDiv.style.display = "none"; // Hide after animation completes
        fullscreenDiv.classList.remove("show", "hide"); // Clean up classes
      }, 500); // Match the duration of the slideDown animation
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const menLink = document.getElementById("menLink");
    const menContent = document.getElementById("menContent");
    const closeMenContent = document.getElementById("closeMenContent");

    menLink.addEventListener("click", function (event) {
      event.preventDefault();
      menContent.classList.add("show");
      menContent.classList.remove("hide");
      menContent.style.display = "block"; // Ensure this is set to allow the animation to be visible
    });

    closeMenContent.addEventListener("click", function () {
      menContent.classList.add("hide");
      menContent.classList.remove("show");
      setTimeout(() => {
        menContent.style.display = "none";
        menContent.classList.remove("hide");
      }, 500); // Ensure this matches the animation duration
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const menLink = document.getElementById("brandLink");
    const menContent = document.getElementById("brandContent");
    const closeMenContent = document.getElementById("closebrandContent");

    menLink.addEventListener("click", function (event) {
      event.preventDefault();
      menContent.classList.add("show");
      menContent.classList.remove("hide");
      menContent.style.display = "block"; // Ensure this is set to allow the animation to be visible
    });

    closeMenContent.addEventListener("click", function () {
      menContent.classList.add("hide");
      menContent.classList.remove("show");
      setTimeout(() => {
        menContent.style.display = "none";
        menContent.classList.remove("hide");
      }, 500); // Ensure this matches the animation duration
    });
  });
  //women content
  document.addEventListener("DOMContentLoaded", function () {
    const menLink = document.getElementById("womenLink");
    const menContent = document.getElementById("womenContent");
    const closeMenContent = document.getElementById("closeWomenContent");

    menLink.addEventListener("click", function (event) {
      event.preventDefault();
      menContent.classList.add("show");
      menContent.classList.remove("hide");
      menContent.style.display = "block"; // Ensure this is set to allow the animation to be visible
    });

    closeMenContent.addEventListener("click", function () {
      menContent.classList.add("hide");
      menContent.classList.remove("show");
      setTimeout(() => {
        menContent.style.display = "none";
        menContent.classList.remove("hide");
      }, 500); // Ensure this matches the animation duration
    });
  });
  //Kids content
  document.addEventListener("DOMContentLoaded", function () {
    const menLink = document.getElementById("kidsLink");
    const menContent = document.getElementById("kidsContent");
    const closeMenContent = document.getElementById("closeKidsContent");

    menLink.addEventListener("click", function (event) {
      event.preventDefault();
      menContent.classList.add("show");
      menContent.classList.remove("hide");
      menContent.style.display = "block"; // Ensure this is set to allow the animation to be visible
    });

    closeMenContent.addEventListener("click", function () {
      menContent.classList.add("hide");
      menContent.classList.remove("show");
      setTimeout(() => {
        menContent.style.display = "none";
        menContent.classList.remove("hide");
      }, 500); // Ensure this matches the animation duration
    });
  });

    
   
      //shoes content
      document.addEventListener("DOMContentLoaded", function () {
        const menShoesLink = document.getElementById("menShoesLink");
        const menShoesContent = document.getElementById("menShoesContent");
        const closeMenShoesContent = document.getElementById(
          "closeMenShoesContent"
        );

        console.log("JS Loaded"); // Debugging line

        menShoesLink.addEventListener("click", function (event) {
          console.log("SHOES clicked"); // Debugging line
          event.preventDefault();
          menShoesContent.style.display = "block"; // Use direct style manipulation as a test
          menShoesContent.style.opacity = 1;
          menShoesContent.style.transform = "translateX(0)";
        });

        closeMenShoesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          menShoesContent.style.opacity = 0;
          setTimeout(() => {
            menShoesContent.style.display = "none";
            menShoesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
        const menAccessoriesLink = document.getElementById("menAccessoryLink");
        const menAccessoriesContent = document.getElementById(
          "menAccessoryContent"
        );
        const closeMenAccessoriesContent = document.getElementById(
          "closeMenAccessoryContent"
        );

        console.log("JS Loaded"); // Debugging line

        menAccessoriesLink.addEventListener("click", function (event) {
          console.log("ACCESSORIES clicked"); // Debugging line
          event.preventDefault();
          menAccessoriesContent.style.display = "block";
          menAccessoriesContent.style.opacity = 1;
          menAccessoriesContent.style.transform = "translateX(0)";
        });

        closeMenAccessoriesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          menAccessoriesContent.style.opacity = 0;
          setTimeout(() => {
            menAccessoriesContent.style.display = "none";
            menAccessoriesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
        const menClothesLink = document.getElementById("menClothesLink");
        const menClothesContent = document.getElementById("menClothesContent");
        const closeMenClothesContent = document.getElementById(
          "closeMenClothesContent"
        );

        console.log("JS Loaded"); // Debugging line

        menClothesLink.addEventListener("click", function (event) {
          console.log("CLOTHES clicked"); // Debugging line
          event.preventDefault();
          menClothesContent.style.display = "block";
          menClothesContent.style.opacity = 1;
          menClothesContent.style.transform = "translateX(0)";
        });

        closeMenClothesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          menClothesContent.style.opacity = 0;
          setTimeout(() => {
            menClothesContent.style.display = "none";
            menClothesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      //---------------------------------------------------Women started---------------------------------
      //women contents child   for shoes----------------------------------------------------------------------------------
      document.addEventListener("DOMContentLoaded", function () {
        const womenShoesLink = document.getElementById("womenShoesLink");
        const womenShoesContent = document.getElementById("womenShoesContent");
        const closeWomenShoesContent = document.getElementById(
          "closeWomenShoesContent"
        );

        console.log("JS Loaded"); // Debugging line

        womenShoesLink.addEventListener("click", function (event) {
          console.log("SHOES clicked"); // Debugging line
          event.preventDefault();
          womenShoesContent.style.display = "block"; // Use direct style manipulation as a test
          womenShoesContent.style.opacity = 1;
          womenShoesContent.style.transform = "translateX(0)";
        });

        closeWomenShoesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          womenShoesContent.style.opacity = 0;
          setTimeout(() => {
            womenShoesContent.style.display = "none";
            womenShoesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      //------------------------------------for clothes------------------------------
      document.addEventListener("DOMContentLoaded", function () {
        const womenClothesLink = document.getElementById("womenClothesLink");
        const womenClothesContent = document.getElementById(
          "womenClothesContent"
        );
        const closeWomenClothesContent = document.getElementById(
          "closeWomenClothesContent"
        );

        console.log("JS Loaded"); // Debugging line

        womenClothesLink.addEventListener("click", function (event) {
          console.log("CLOTHES clicked"); // Debugging line
          event.preventDefault();
          womenClothesContent.style.display = "block"; // Use direct style manipulation as a test
          womenClothesContent.style.opacity = 1;
          womenClothesContent.style.transform = "translateX(0)";
        });

        closeWomenClothesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          womenClothesContent.style.opacity = 0;
          setTimeout(() => {
            womenClothesContent.style.display = "none";
            womenClothesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      //---------------------------------------For Accessory-----------------------------------
      document.addEventListener("DOMContentLoaded", function () {
        const womenAccessoryLink =
          document.getElementById("womenAccessoryLink");
        const womenAccessoryContent = document.getElementById(
          "womenAccessoryContent"
        );
        const closeWomenAccessoryContent = document.getElementById(
          "closeWomenAccessoryContent"
        );

        console.log("JS Loaded"); // Debugging line

        womenAccessoryLink.addEventListener("click", function (event) {
          console.log("ACCESSORY clicked"); // Debugging line
          event.preventDefault();
          womenAccessoryContent.style.display = "block"; // Use direct style manipulation as a test
          womenAccessoryContent.style.opacity = 1;
          womenAccessoryContent.style.transform = "translateX(0)";
        });

        closeWomenAccessoryContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          womenAccessoryContent.style.opacity = 0;
          setTimeout(() => {
            womenAccessoryContent.style.display = "none";
            womenAccessoryContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      //---------------------------------------------------Women end---------------------------------
      //---------------------------------------------------kids started---------------------------------
      //---------------------------------------------------kids shoes---------------------------------
      document.addEventListener("DOMContentLoaded", function () {
        const kidsShoesLink = document.getElementById("kidsShoesLink");
        const kidsShoesContent = document.getElementById("kidsShoesContent");
        const closeKidsShoesContent = document.getElementById(
          "closekidsShoesContent"
        );

        console.log("JS Loaded"); // Debugging line

        kidsShoesLink.addEventListener("click", function (event) {
          console.log("KIDS SHOES clicked"); // Debugging line
          event.preventDefault();
          kidsShoesContent.style.display = "block";
          kidsShoesContent.style.opacity = 1;
          kidsShoesContent.style.transform = "translateX(0)";
        });

        closeKidsShoesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          kidsShoesContent.style.opacity = 0;
          setTimeout(() => {
            kidsShoesContent.style.display = "none";
            kidsShoesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      //-----------------------------------------kids accessories------------------------
      document.addEventListener("DOMContentLoaded", function () {
        const kidsAccessoryLink = document.getElementById("kidsAccessoryLink");
        const kidsAccessoryContent = document.getElementById(
          "kidsAccessoryContent"
        );
        const closeKidsAccessoryContent = document.getElementById(
          "closeKidsAccessoryContent"
        );

        console.log("JS Loaded"); // Debugging line

        kidsAccessoryLink.addEventListener("click", function (event) {
          console.log("KIDS ACCESSORY clicked"); // Debugging line
          event.preventDefault();
          kidsAccessoryContent.style.display = "block";
          kidsAccessoryContent.style.opacity = 1;
          kidsAccessoryContent.style.transform = "translateX(0)";
        });

        closeKidsAccessoryContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          kidsAccessoryContent.style.opacity = 0;
          setTimeout(() => {
            kidsAccessoryContent.style.display = "none";
            kidsAccessoryContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
      //-------------------------------------------------kids clothes------------------------
      document.addEventListener("DOMContentLoaded", function () {
        const kidsClothesLink = document.getElementById("kidsClothesLink");
        const kidsClothesContent =
          document.getElementById("kidsClothesContent");
        const closeKidsClothesContent = document.getElementById(
          "closeKidsClothesContent"
        );

        console.log("JS Loaded"); // Debugging line

        kidsClothesLink.addEventListener("click", function (event) {
          console.log("KIDS CLOTHES clicked"); // Debugging line
          event.preventDefault();
          kidsClothesContent.style.display = "block";
          kidsClothesContent.style.opacity = 1;
          kidsClothesContent.style.transform = "translateX(0)";
        });

        closeKidsClothesContent.addEventListener("click", function () {
          console.log("Close clicked"); // Debugging line
          kidsClothesContent.style.opacity = 0;
          setTimeout(() => {
            kidsClothesContent.style.display = "none";
            kidsClothesContent.style.transform = "translateX(100%)";
          }, 500); // Match the duration of the animation
        });
      });
   
        
      window.addEventListener('pageshow', function(event) {
          if (event.persisted) {
              window.location.reload();
          }
      });

      $(document).ready(function(){
$("#toggle-nav").click(function(){
$(".bottom-bar nav").slideToggle();
});
});

function search(event) {
  if (event.key === 'Enter') {
    const searchTerm = event.target.value;
    window.location.href = `/search/${searchTerm}`;
  }
}
function search(event) {
const searchTerm = event.target.value;
const suggestionsContainer = document.getElementById('suggestions-container');

if (searchTerm.trim() === '') {
    // If the search box is empty, hide the suggestions container
    suggestionsContainer.style.display = 'none';
    return;
}

if (event.key === 'Enter') {
    // If the user presses Enter, redirect to the search results page
    window.location.href = `/search/${searchTerm}`;
} else {
    // If the user is typing, fetch and display search suggestions
    if (searchTerm.length > 2) { // Only search if the input is at least 3 characters long
        fetch(`/search-suggestions/${searchTerm}`)
            .then(response => response.json())
            .then(products => {
                suggestionsContainer.innerHTML = ''; // Clear previous suggestions
                products.forEach(product => {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('suggestion');
                    suggestion.innerHTML = `
                        <img src="${product.image.replace('/public', '')}" alt="${product.title}" width="50" height="50">
                        <span>${product.title}</span>
                        <span>${product.price.toLocaleString()}</span>
                    `;
                    // Add an onclick event to the suggestion to redirect to the product_display page
                    suggestion.onclick = function() {
                        window.location.href = `/product_display/${product._id}`;
                    };
                    suggestionsContainer.appendChild(suggestion);
                });
                // Show the suggestions container after adding suggestions
                suggestionsContainer.style.display = 'block';
            });
    } else {
        // If the input is too short, clear the suggestions and hide the suggestions container
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
    }
}
}

  