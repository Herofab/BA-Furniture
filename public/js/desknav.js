window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
var $j = jQuery.noConflict();

// Now you can use $j instead of $
$j(document).ready(function() {
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

function displaySuggestions(event) {
console.log('displaySuggestions called'); // Add this line to check if the function is being called
// ... rest of the function ...

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
                  window.location.href = `/product/${product._id}`;
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

// Attach the displaySuggestions function to the input's keypress event
document.getElementById('search_box').addEventListener('keypress', displaySuggestions);

