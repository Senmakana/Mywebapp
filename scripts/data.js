function getdata(widget) {
    const data = document.getElementById(widget)?.value; // Safely retrieve the input value
    if (data !== undefined && data !== null) {
        store(widget, data); // Store the correct key-value pair
        const description = `${widget}=${data}`; // Generate the description dynamically
        displayonlabels(`${widget}label`, description); // Update the label
        clear(widget); // Clear the input field
    }
}
function run(id, event, action) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener(event, action);
    }
}
function displayonlabels(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text; // Use textContent to set plain text
    }
}
function clear(id) {
    const element = document.getElementById(id);
    if (element) {
        element.value = ""; // Clear the input value
    }
}
function store(key, value) {
    if (key){
        remove(key)
        localStorage.setItem(key, value);
    }
}

function retrieve(key) {
    const value = localStorage.getItem(key);
    return isNaN(value) ? value : parseFloat(value); // Check if the value is numeric, otherwise return as is
}
function remove(key){
    localStorage.removeItem(key)
}
function getlength() {
    const length = retrieve("length");
    var totallength=retrieve("total length")||0
    totallength += length;
    store("total length", totallength);
    const description = `Total length = ${totallength}`;
    displayonlabels("totallengthlabel", description);
}
function calculateoveralllength() {
    const length = retrieve("total length");
    const number = retrieve("number");
    const total = number * length;
    var overallength=retrieve("overall length")||0
    overallength += total;
    store("overall length", overallength);
    const description = `Overall length = ${overallength}`;
    displayonlabels("overallengthlabel", description);
    remove("total length")
}
function calculatearea() {
    const length = retrieve("overall length")/1000;
    const width = retrieve("width")/1000;
    const area = length * width;
    var totalarea=retrieve("area")||0
    totalarea += area;
    store("total area", totalarea);
    const description = `Total area = ${totalarea}`;
    displayonlabels("arealabel", description);
}
function calculatevolume(){
    const area=retrieve("area")
    const depth=retrieve("depth")/1000
    var totalvolume=retrieve("volume")||0
    const volume=area*depth
    totalvolume+=volume;
    store("volume",totalvolume)
    description=`volume=${totalvolume}cm`
    displayonlabels("volumelabel",description)
}
run("length", "change", () => {
    getdata("length");
    getlength();
});
run("width", "change", () => {
    getdata("width");
    calculatearea();
});
run("depth", "change", () => {
    getdata("depth");
    calculatevolume();
});
run("number", "change", () => {
    getdata("number");
    calculateoveralllength();
    calculatearea();
});