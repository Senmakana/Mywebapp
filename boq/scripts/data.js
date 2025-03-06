// data.js

// Materials data with subcategories

const quantities = {
    earthworks: [
        { name: 'strip foundation excavation', unit: 'cm' },
        { name: 'column foundation excavation', unit: 'cm' },
        { name: 'backfilling', unit: 'cm' },
        { name: '300mm hardcore filling', unit: 'cm' },
        { name: '50mm blinding over hardcore', unit: 'sm' },
        { name: 'anti-termite treatment', unit: 'sm' }
    ],
    formworks: [
        { name: 'strip foundation footing formworks', unit: 'sm' },
        { name: 'column foundations formworks', unit: 'sm' },
        { name: 'foundation columns formworks', unit: 'sm' },
        { name: 'ground beam formworks', unit: 'sm' },
        { name: 'foundation floor slab formworks', unit: 'lm' },
        { name: 'super structural columns formworks', unit: 'sm' },
        { name: 'super structural beams formworks', unit: 'sm' },
        { name: 'slab formworks', unit: 'sm' }
    ],
    rebarworks: [
        { name: 'strip foundation footing rebar', unit: 'kg' },
        { name: 'column foundation rebar', unit: 'kg' },
        { name: 'foundation columns rebar', unit: 'kg' },
        { name: 'ground beam rebar', unit: 'kg' },
        { name: 'brc', unit: 'sm' },
        { name: 'super structural columns rebar', unit: 'kg' },
        { name: 'super structural beams rebar', unit: 'kg' },
        { name: 'slab rebar', unit: 'kg' }
    ],
    concreteworks: [
        { name: 'strip foundation footing concrete', unit: 'cm' },
        { name: 'column foundation concrete', unit: 'cm' },
        { name: 'foundation columns concrete', unit: 'cm' },
        { name: 'ground beam concrete', unit: 'cm' },
        { name: 'foundation floor slab concrete', unit: 'sm' },
        { name: 'super structural columns concrete', unit: 'cm' },
        { name: 'super structural beams concrete', unit: 'cm' },
        { name: 'slab concrete', unit: 'cm' }
    ],
    blockworks: [
        { name: 'sub structural wall', unit: 'sm' },
        { name: 'super structural wall', unit: 'sm' }
    ],
    roofingworks: [ // Add the "block" category
        { name: 'iron sheet roof', unit: 'sm' },
        { name: 'hurvey tile roof', unit: 'sm' },
        { name: 'clay tile roof', unit: 'sm' }
    ],
    plasterworks: [ // Add the "block" category
        { name: 'wall plaster', unit: 'sm' },
        { name: 'floor plaster', unit: 'sm' },
        { name: 'ceiling plaster', unit: 'sm' }
    ],
    paintworks: [ // Add the "block" category
        { name: 'wall painting', unit: 'sm' },
        { name: 'floor painting', unit: 'sm' },
        { name: 'ceiling painting', unit: 'sm' }
    ],
    tileworks: [ // Add the "block" category
        { name: 'floor tiles', unit: 'sm' },
        { name: 'wall tiles', unit: 'sm' }
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