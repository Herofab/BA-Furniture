document.addEventListener('DOMContentLoaded', (event) => {
    const genderSelect = document.getElementById('gender');
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');

    const subcategories = {
        men: {
            accessories: ['caps', 'football', 'waterbottles', 'socks', 'duffels', 'backpacks', 'belts', 'protective', 'movement', 'golf', 'wristbands', 'vaulet', 'gloves', 'basketball'],
            footwear: ['training', 'running', 'tennis', 'football', 'hiking', 'sandle', 'backetball', 'sneakers', 'formal', 'lifestyle', 'walking', 'motorsports', 'ride', 'blaze'],
            clothes: ['tops', 'polo', 'jacket', 'long-sleeve', 'pants', 'shorts', 'track-suits', 'compression', 'hoodies', 'socks', 'lifestyle', 'motorsports']
        },
        women: {
            accessories: ['caps', 'backpacks', 'bags', 'wristbands', 'waterbottles', 'duffels', 'fitness', 'protective', 'movement', 'football', 'basketball', 'hijab','gloves'],
            footwear: ['training', 'lifestyle', 'sandle', 'running', 'tennis', 'hiking', 'sneakers', 'walking', 'slip'],
            clothes: ['hoodies', 'tops', 'jacket', 'compression', 'socks', 'pants', 'sports-bra', 'shorts', 'long-sleeve', 'track-suits', 'polo','lifestyle']
        },
        kids: {
            accessories: ['caps', 'backpacks', 'bags', 'wristbands', 'waterbottles', 'duffels', 'protective', 'gloves', 'football', 'basketball', 'eyewear'],
            footwear: ['training', 'lifestyle', 'sandle', 'running', 'schoolshoes', 'bigkids', 'little-kids', 'football', 'tenis','basketball','toddler'],
            clothes: ['hoodies', 'tops', 'jacket', 'long-sleeve', 'shorts', 'pants', 'compression', 'jersey', 'socks', 'track-suits','lifestyle','polo'],
        }
    };

    function updateSubcategoryOptions() {
        const gender = genderSelect.value;
        const category = categorySelect.value;

        // Clear all existing options
        subcategorySelect.innerHTML = '';

        // Add new options
        const options = subcategories[gender][category];
        for (const option of options) {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            subcategorySelect.appendChild(optionElement);
        }
    }

    // Listen for changes in the gender and category selections
    genderSelect.addEventListener('change', updateSubcategoryOptions);
    categorySelect.addEventListener('change', updateSubcategoryOptions);

    // Call the function once to populate the initial subcategory options
    updateSubcategoryOptions();
});