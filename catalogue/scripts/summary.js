// summary.js

function generateCurrencyOptions() {
    const currencySelect = document.getElementById('currencySelect');
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.symbol;
        option.textContent = `${currency.symbol} (${currency.name})`;
        currencySelect.appendChild(option);
    });
}

generateCurrencyOptions();

function updateSummary() {
    const tbody = document.querySelector('#summaryTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    let totalCost = 0;
    const currency = document.getElementById('currencySelect').value;

    // Iterate over each category in the materials object
    Object.keys(materials).forEach(category => {
        // Iterate over each material in the category
        materials[category].forEach(material => {
            const qty = parseFloat(localStorage.getItem(`quantities/${material.name.replace(/\s+/g, '').toLowerCase()}quantity`)) || 0;
            const price = parseFloat(localStorage.getItem(`prices/${material.name.replace(/\s+/g, '').toLowerCase()}price`)) || 0;

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
    });

    document.getElementById('totalCost').textContent = `${currency}${totalCost.toFixed(2)}`;
}
document.getElementById('currencySelect').addEventListener('change', updateSummary);

window.addEventListener('load', updateSummary);

// Update table title dynamically
document.getElementById('updateTitleButton').addEventListener('click', function() {
    const tableTitleInput = document.getElementById('tableTitleInput').value;
    document.getElementById('tableTitle').textContent = tableTitleInput;
});

document.getElementById('downloadPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableTitle = document.getElementById('tableTitle').textContent;

    doc.setFontSize(18);
    doc.text(tableTitle, 10, 10);

    doc.autoTable({
        html: '#summaryTable',
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('Material_Catalogue_Summary.pdf');
    alert('PDF has been downloaded successfully!');
});