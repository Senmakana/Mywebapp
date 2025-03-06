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

    // Configure pagination settings
    const maxRowsPerPage = 20; // Adjust this value as needed
    let startY = 25; // Initial Y position after title
    let currentPage = 1;
    
    // Extract all rows (including headers and subtotals)
    const allRows = Array.from(document.querySelectorAll('#summaryTable tbody tr'));
    
    // Split rows into chunks that respect category boundaries
    let currentChunk = [];
    let currentCategory = null;

    allRows.forEach((row, index) => {
        const isCategoryHeader = row.classList.contains('category-header');
        const isSubtotal = row.classList.contains('subtotal');

        // Start new chunk if:
        // - New category detected, or
        // - Current chunk exceeds max rows
        if (isCategoryHeader && (currentChunk.length >= maxRowsPerPage || currentCategory !== null)) {
            generatePdfPage();
            currentChunk = [];
        }

        // Track current category
        if (isCategoryHeader) {
            currentCategory = row.textContent.trim();
        }

        currentChunk.push(row);

        // Force new page after subtotal if chunk is full
        if (isSubtotal && currentChunk.length >= maxRowsPerPage) {
            generatePdfPage();
            currentChunk = [];
            currentCategory = null;
        }

        // Generate page for last chunk
        if (index === allRows.length - 1) {
            generatePdfPage();
        }
    });

    function generatePdfPage() {
        if (currentPage > 1) doc.addPage();
        
        // Clone the original table
        const tempTable = document.createElement('table');
        tempTable.innerHTML = document.getElementById('summaryTable').innerHTML;
        const tbody = tempTable.querySelector('tbody');
        tbody.innerHTML = '';
        currentChunk.forEach(row => tbody.appendChild(row.cloneNode(true)));

        // Generate PDF table
        doc.autoTable({
            html: tempTable,
            startY: startY,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133] },
            didParseCell: (data) => {
                if (data.row.element.classList.contains('category-header') || 
                    data.row.element.classList.contains('subtotal')) {
                    data.row.pageBreak = 'avoid';
                }
            }
        });

        currentPage++;
        startY = 10; // Reset Y position for subsequent pages
    }

    doc.save('Material_Catalogue_Summary.pdf');
    alert('PDF has been downloaded successfully!');
});
