// quantity.js

// Function to generate quantity input fields for a specific category
function generateQuantityInputs(category) {
    const section = document.querySelector('#quantityForm fieldset');
    if (!materials[category]) {
        console.error(`Category "${category}" not found in materials object.`);
        return;
    }
    materials[category].forEach(material => {
        const label = document.createElement('label');
        label.textContent = `${material.name} quantity:`;
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `enter ${material.name} quantity`;
        input.id = `${material.name.replace(/\s+/g, '').toLowerCase()}quantity`;
        input.name = `${material.name.replace(/\s+/g, '').toLowerCase()}quantity`;
        input.min = 0;
        section.appendChild(label);
        section.appendChild(input);
    });
}

// Generate quantity inputs on page load based on the category in the URL
const category = window.location.pathname
    .split('/')
    .pop() // Get the last part of the URL (e.g., "cement.html")
    .replace('.html', ''); // Remove ".html" (e.g., "cement")

generateQuantityInputs(category);

// Save quantity data to localStorage on input
document.getElementById('quantityForm').addEventListener('input', function() {
    const inputs = document.querySelectorAll('#quantityForm input');
    inputs.forEach(input => {
        localStorage.setItem(`quantities/${input.id}`, input.value);
    });
});

// Load saved quantity data on page load
window.addEventListener('load', function() {
    const inputs = document.querySelectorAll('#quantityForm input');
    inputs.forEach(input => {
        input.value = localStorage.getItem(`quantities/${input.id}`) || '';
    });
});

// Reset form and clear localStorage for quantities
document.querySelector('button[type="reset"]').addEventListener('click', function() {
    const inputs = document.querySelectorAll('#quantityForm input');
    inputs.forEach(input => {
        localStorage.removeItem(`quantities/${input.id}`);
    });
});