// price.js

// Function to generate price input fields
function generatePriceInputs() {
    const section = document.querySelector('#priceForm fieldset');
    materials.forEach(material => {
        const label = document.createElement('label');
        label.textContent = `${material.name} price:`;
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `enter ${material.name} price`;
        input.id = `${material.name}price`;
        input.name = `${material.name}price`;
        input.min = 0;
        section.appendChild(label);
        section.appendChild(input);
    });
}

// Generate price inputs on page load
generatePriceInputs();

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