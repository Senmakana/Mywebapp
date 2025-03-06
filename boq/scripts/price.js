// price.js

// Function to generate price input fields for a specific category
function generatePriceInputs(category) {
    const section = document.querySelector('#priceForm fieldset');
    if (!quantities[category]) {
        console.error(`Category "${category}" not found in quantities object.`);
        return;
    }
    quantities[category].forEach(quantity => {
        const label = document.createElement('label');
        label.textContent = `${quantity.name} price:`;
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `enter ${quantity.name} price`;
        input.id = `${quantity.name.replace(/\s+/g, '').toLowerCase()}price`;
        input.name = `${quantity.name.replace(/\s+/g, '').toLowerCase()}price`;
        input.min = 0;
        section.appendChild(label);
        section.appendChild(input);
    });
}

// Generate price inputs on page load based on the category in the URL
const category = window.location.pathname
    .split('/')
    .pop() // Get the last part of the URL (e.g., "cement-prices.html")
    .replace('.html', '') // Remove ".html" (e.g., "cement-prices")
    .replace('-prices', ''); // Remove "-prices" (e.g., "cement")

generatePriceInputs(category);

// Save price data to localStorage on input
document.getElementById('priceForm').addEventListener('input', function() {
    const inputs = document.querySelectorAll('#priceForm input');
    inputs.forEach(input => {
        localStorage.setItem(`prices/${input.id}`, input.value);
    });
});

// Load saved price data on page load
window.addEventListener('load', function() {
    const inputs = document.querySelectorAll('#priceForm input');
    inputs.forEach(input => {
        input.value = localStorage.getItem(`prices/${input.id}`) || '';
    });
});

// Reset form and clear localStorage for prices
document.querySelector('button[type="reset"]').addEventListener('click', function() {
    const inputs = document.querySelectorAll('#priceForm input');
    inputs.forEach(input => {
        localStorage.removeItem(`prices/${input.id}`);
    });
});