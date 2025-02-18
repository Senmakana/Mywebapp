// script.js

// Function to generate input fields for materials
function generateMaterialInputs(sectionId, placeholderPrefix, type) {
    const section = document.getElementById(sectionId);
    materials.forEach(material => {
        const label = document.createElement('label');
        label.textContent = `${material.name} ${placeholderPrefix}:`;
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = `enter ${material.name} ${placeholderPrefix}`;
        input.id = `${material.name}${placeholderPrefix}`;
        input.name = `${material.name}${placeholderPrefix}`;
        input.min = 0;
        section.appendChild(label);
        section.appendChild(input);
    });
}

// Function to generate currency options
function generateCurrencyOptions() {
    const currencySelect = document.getElementById('currencySelect');
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.symbol;
        option.textContent = `${currency.symbol} (${currency.name})`;
        currencySelect.appendChild(option);
    });
}

// Generate quantity and price inputs
generateMaterialInputs('quantitySection', 'quantity', 'number');
generateMaterialInputs('priceSection', 'price', 'number');

// Generate currency options
generateCurrencyOptions();

// Save data to localStorage with namespacing
document.getElementById('materialForm').addEventListener('input', function() {
    const inputs = document.querySelectorAll('#materialForm input');
    inputs.forEach(input => {
        if (input.id.includes('quantity')) {
            // Store in quantities namespace
            localStorage.setItem(`quantities/${input.id}`, input.value);
        } else if (input.id.includes('price')) {
            // Store in prices namespace
            localStorage.setItem(`prices/${input.id}`, input.value);
        }
    });
    updateSummary(); // Update the summary table
});

// Load saved data on page load
window.addEventListener('load', function() {
    const inputs = document.querySelectorAll('#materialForm input');
    inputs.forEach(input => {
        if (input.id.includes('quantity')) {
            // Retrieve from quantities namespace
            input.value = localStorage.getItem(`quantities/${input.id}`) || '';
        } else if (input.id.includes('price')) {
            // Retrieve from prices namespace
            input.value = localStorage.getItem(`prices/${input.id}`) || '';
        }
    });
    updateSummary(); // Update the summary table
});

// Calculate total cost on form submission
document.getElementById('materialForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    updateSummary(); // Update the summary table
});

// Reset form and clear localStorage
document.querySelector('button[type="reset"]').addEventListener('click', function() {
    // Clear only quantities and prices namespaces
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('quantities/') || key.startsWith('prices/')) {
            localStorage.removeItem(key);
        }
    });
    updateSummary(); // Clear the summary table
});

// Add event listener to currency select
document.getElementById('currencySelect').addEventListener('change', function() {
    updateSummary(); // Update the summary table when currency changes
});

// Update the summary table
function updateSummary() {
    const tbody = document.querySelector('#summaryTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    let totalCost = 0;
    const currency = document.getElementById('currencySelect').value;

    materials.forEach(material => {
        const qty = parseFloat(localStorage.getItem(`quantities/${material.name}quantity`)) || 0;
        const price = parseFloat(localStorage.getItem(`prices/${material.name}price`)) || 0;

        // Only add to the table if quantity is greater than zero
        if (qty > 0) {
            const cost = qty * price;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${material.name}</td>
                <td>${qty}</td>
                <td>${material.unit}</td>
                <td>${currency}${price.toFixed(2)}</td>
                <td>${currency}${cost.toFixed(2)}</td>
            `;
            tbody.appendChild(row);

            totalCost += cost;
        }
    });

    // Update total cost
    document.getElementById('totalCost').textContent = `${currency}${totalCost.toFixed(2)}`;
}

// Download PDF
document.getElementById('downloadPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Material Catalogue Summary", 10, 10);

    // Add table
    doc.autoTable({
        html: '#summaryTable',
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] }
    });

    // Save PDF
    doc.save('Material_Catalogue_Summary.pdf');

    // Notify the user
    alert('PDF has been downloaded successfully!');
});