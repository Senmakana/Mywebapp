function getdata(id, structure) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id "${id}" not found.`);
        return 0;
    }
    const data = element.value;
    store(`${structure} ${id}`, data);
    return data ? (isNaN(data) ? data : parseFloat(data)) : 0;
}


function clear(id) {
    document.getElementById(id).value = "";
}

function retrieve(dataname) {
    const data = sessionStorage.getItem(dataname); // Change to localStorage for persistence
    console.log(`Retrieved: ${dataname} = ${data}`);
    return data && !isNaN(data) ? parseFloat(data) : data;
}

function store(dataname, data) {
    console.log(`Storing: ${dataname} = ${data}`);
    sessionStorage.setItem(dataname, data); // Change to localStorage for persistence
}

function focusinput(id) {
    document.getElementById(id).focus();
}

function getdescription(item, quantity, unit) {
    if (quantity != 0 && !isNaN(quantity) && quantity != undefined && quantity!=Infinity) {
        return `${item}...${quantity}...${unit}`;
    }
    return "";
}
function getrebar(structure, type, data1, data2) {
    // Collect data from the inputs
    const val1 = getdata(data1, `${structure} ${type}`);
    const val2 = getdata(data2, `${structure} ${type}`);

    // You can validate these values before proceeding if necessary
    if (!val1 || !val2) {
        console.error("One or more required inputs are missing.");
        return;
    }
}

function getAppendix(structure,type){
    const extensionOption=document.getElementById("extensionradio").checked;
    const bendOption=document.getElementById("bendradio").checked;
    store(`${structure} ${type} extensionoption`,extensionOption)
    store(`${structure} ${type} bendoption`,bendOption)
}
function getconcretesettings(structure){

    const cementbrand=getdata("cementbrand",structure)
    const sandbrand=getdata("sandbrand",structure)
    const ballastbrand=getdata("ballastbrand",structure)
    const ratio=getdata("ratio",structure)
}
function getformworkInformation(structure,type){
    const brand=getdata("brand",`${structure} ${type}`)
    const size=getdata("size",`${structure} ${type} ${brand}`)
    const sizes=size.split("x")
    const length=parseInt(sizes[0])
    const width=parseInt(sizes[1]);
    const area=length*width/1000000;
    store(`${structure} ${brand} ${type}`,area)
}