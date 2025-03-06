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

    // Iterate over each category
    Object.keys(quantities).forEach(category => {
        let categorySubtotal = 0;
        const itemsWithData = [];

        // Collect items with quantity > 0
        quantities[category].forEach(quantity => {
            const qtyKey = `quantities/${quantity.name.replace(/\s+/g, '').toLowerCase()}quantity`;
            const priceKey = `prices/${quantity.name.replace(/\s+/g, '').toLowerCase()}price`;
            const qty = parseFloat(localStorage.getItem(qtyKey)) || 0;
            const price = parseFloat(localStorage.getItem(priceKey)) || 0;

            if (qty > 0) {
                itemsWithData.push({ quantity, qty, price, cost: qty * price });
            }
        });

        if (itemsWithData.length === 0) return; // Skip empty categories

        // Add category header
        const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const headerRow = document.createElement('tr');
        headerRow.className = 'category-header';
        headerRow.innerHTML = `<td colspan="5">${displayCategory}</td>`;
        tbody.appendChild(headerRow);

        // Add item rows
        itemsWithData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.quantity.name}</td>
                <td>${item.qty}</td>
                <td>${item.quantity.unit}</td>
                <td>${currency}${item.price.toFixed(2)}</td>
                <td>${currency}${item.cost.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
            categorySubtotal += item.cost;
        });

        // Add subtotal row
        const subtotalRow = document.createElement('tr');
        subtotalRow.className = 'subtotal';
        subtotalRow.innerHTML = `
            <td colspan="4">Subtotal (${displayCategory})</td>
            <td>${currency}${categorySubtotal.toFixed(2)}</td>
        `;
        tbody.appendChild(subtotalRow);

        totalCost += categorySubtotal;
    });

    // Update grand total
    document.getElementById('totalCost').textContent = `${currency}${totalCost.toFixed(2)}`;
}

document.getElementById('currencySelect').addEventListener('change', updateSummary);
window.addEventListener('load', updateSummary);

// Rest of the code remains unchanged...}
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
