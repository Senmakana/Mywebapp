// data.js

// Materials data with subcategories

const materials = {
    cement: [
        { name: 'Bamburi Cement', unit: 'bags' },
        { name: 'Rhino Cement', unit: 'bags' },
        { name: 'Mombasa Cement', unit: 'bags' },
        { name: 'Nguvu Cement', unit: 'bags' }
    ],
    sand: [
        { name: 'River Sand', unit: 'tons' },
        { name: 'Pit Sand', unit: 'tons' }
    ],
    ballast: [
        { name: 'Calcium Ballast', unit: 'tons' },
        { name: 'Lunguma Ballast', unit: 'tons' },
        { name: 'Mazeras Ballast', unit: 'tons' },
        { name: 'Coral Ballast', unit: 'tons' }
    ],
    metals: [
        { name: 'D8', unit: 'pcs' },
        { name: 'D10', unit: 'pcs' },
        { name: 'D12', unit: 'pcs' },
        { name: 'D16', unit: 'pcs' },
        { name: 'D20', unit: 'pcs' },
        { name: 'D25', unit: 'pcs' },
        { name: 'D32', unit: 'pcs' }
    ],
    bindingWire: [
        { name: 'Binding Wire', unit: 'kg' }
    ],
    block: [ // Add the "block" category
        { name: '400x200x200', unit: 'pcs' },
        { name: '360x180x180', unit: 'pcs' },
        { name: '300x150x150', unit: 'pcs' }
    ]
};
// Currencies data (unchanged)
const currencies = [
    { symbol: '£', name: 'GBP' },
    { symbol: '€', name: 'EUR' },
    { symbol: '¥', name: 'JPY' },
    { symbol: '$', name: 'USD' },
    { symbol: 'Ksh', name: 'KES' }
];