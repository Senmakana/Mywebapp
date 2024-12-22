function getrebar(structure, type) {
    // Retrieve input values
    let length = retrieve(`${structure} length`);
    let number = retrieve(`${structure} number`);
    let depth = retrieve(`${structure} depth`);
    let width = retrieve(`${structure} width`);
    let spacing = retrieve(`${structure} ${type} spacing`);
    const diameter = retrieve(`${structure} ${type} diameter`);
    const barnumber = retrieve(`${structure} ${type} number`);
    const cover = retrieve(`${structure} cover`) || 0; // Ensure cover is defined
    const bendOption = retrieve(`${structure} ${type} bend option`) || false;
    const extensionOption = retrieve(`${structure} ${type} extension option`) || false;

    // Calculate bend and extension based on options
    const bend = bendOption ? diameter * 25 : 0;
    const extension = extensionOption ? diameter * 50 : 0;

    let totalBars = retrieve(`${structure} ${type} D${diameter}`) || 0;

    // Define structures and bar calculation logic
    const structures = {
        "column": {
            "mains": {
                "barlength": length + bend + extension,
                "required": number * barnumber
            },
            "links": {
                "barlength": 2 * (width + depth) - 4 * cover,
                "required": Math.ceil((number * length) / spacing),
            },
        },
        "beam": {
            "mains": {
                "barlength": length + bend + extension,
                "required": number * barnumber
            },
            "links": {
                "barlength": 2 * (width + depth) - 4 * cover,
                "required": Math.ceil((number * length) / spacing),
            },
        },
        "slab": {
            "tops": {
                "barlength": length + bend + extension,
                "required": Math.ceil((number * width) / spacing),
            },
            "bottoms": {
                "barlength": width + bend + extension,
                "required": Math.ceil((number * length) / spacing),
            },
        },
    };

    // Get barlength and required bars for the structure and type
    const barlength = structures[structure][type]["barlength"];
    const required = structures[structure][type]["required"];

    // Store barlength
    store(`${structure} ${type} bar length`, barlength);

    // Calculate bars per full bar (standard length: 12,000 mm)
    const barsPerFullBar = Math.floor(12000 / barlength);
    store(`${structure} ${type} bars per full bar`, barsPerFullBar);

    // Store required bars
    store(`${structure} ${type} bars`, required);

    // Calculate total bars
    let bars = Math.ceil(required / barsPerFullBar);
    totalBars += bars;
    store(`${structure} ${type} D${diameter}`, totalBars);
    store(`${structure} number`,number)
    // Generate and return the description
    const description = getdescription(`D${diameter}`, totalBars, "no");
    return description;
}