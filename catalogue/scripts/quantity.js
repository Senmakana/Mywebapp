// quantity.js

// Function to generate quantity input fields
function generateQuantityInputs() {
    const section = document.querySelector('#quantityForm fieldset');
    materials.forEach(material => {
        const label = document.createElement('label');
        label.textContent = `${material.name} quantity:`;
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `enter ${material.name} quantity`;
        input.id = `${material.name}quantity`;
        input.name = `${material.name}quantity`;
        input.min = 0;
        section.appendChild(label);
        section.appendChild(input);
    });
}

// Generate quantity inputs on page load
generateQuantityInputs();

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