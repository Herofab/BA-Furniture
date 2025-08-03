document.getElementById('category').addEventListener('change', function() {
    window.location.href = '/menchildpages/mnewarrivals?category=' + this.value;
  });

  document.getElementById('price').addEventListener('change', function() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('price', this.value);
    window.location.search = urlParams.toString();
  });

  const types = {
    accessories: ['caps', 'football', 'bottles', 'pump', 'mats', 'socks', 'belts', 'jim', 'weight', 'bags', 'speq', 'vaulet', 'gloves', 'facemask'],
    footwear: ['sneakers', 'running', 'walking', 'jim', 'slip', 'sandles', 'motorsports', 'cricket', 'badminton', 'tenis', 'basketball', 'football', 'ride', 'blaze'],
    clothes: ['tshirt', 'polo', 'jacket', 'sewtshirt', 'pants', 'shorts', 'tsuits', 'jerysays', 'homewear', 'thermal', 'innerwear', 'motorsports']
  };
  document.getElementById('size').addEventListener('change', function() {
    const category = this.value;
    const typeSelect = document.getElementById('type');
    const selectedCategoryElement = document.querySelector('.mt-4');
  
    // Clear all existing options
    typeSelect.innerHTML = '';
  
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Type';
    typeSelect.appendChild(defaultOption);
  
    // Add new options
    const options = types[category];
    for (const option of options) {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      typeSelect.appendChild(optionElement);
    }
    selectedCategoryElement.textContent = category;
   
  
  });
  document.getElementById('type').addEventListener('change', function() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('type', this.value);
    window.location.search = urlParams.toString();
  });

  // colors
  fetch('/get-distinct-colors')
.then(response => response.json())
.then(colors => {
const colorSelect = document.getElementById('color');

// Clear all existing options
colorSelect.innerHTML = '';

// Add default option
const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = 'Select Color';
colorSelect.appendChild(defaultOption);

// Add new options
for (const color of colors) {
  const optionElement = document.createElement('option');
  optionElement.value = color;
  optionElement.textContent = color;
  colorSelect.appendChild(optionElement);
}
})
.catch(err => console.error(err));

document.getElementById('color').addEventListener('change', function() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('color', this.value);
    window.location.search = urlParams.toString();
  });