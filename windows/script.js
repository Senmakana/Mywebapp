var windowarea = 0;
var soffitlength = 0;
var walllength = 0;
var wallarea = 0;
let numberofblocks;
let blocklength;
let blockheight;
let blocksize;
let mortacement;
let mortasand;
let mortamix;
let blockthickness;
let bagofmortacement;
let tonsofmortasand;
let cementcost = 0;
let sandcost = 0;

let materialprice = {
    "block": {
        "400x200x200": 80,
        "360x180x180": 60,
        "300x150x150": 25,
        "150x100x75": 13
    },
    "cement": {
        "bamburi": 750,
        "simba": 720,
        "mombasa": 700,
        "rhino": 650
    },
    "sand": {
        "river sand": 1350,
        "pit sand": 1000
    },
    "ballast": {
        "mazeras": 2000,
        "lunguma": 1750,
        "calcium": 1000
    },
    "steel": {
        "D8": 800,
        "D10": 1000,
        "D12": 1200,
        "D16": 1600,
        "D20": 2000,
        "bindingwire": 200
    },
    "timber": {
        "pine": {
            "150x25": 40,
            "200x25": 60,
            "50x50": 20
        },
        "mnazi": {
            "150x25": 18,
            "200x25": 25,
            "50x50": 15
        }
    }
};

// Helper function for area calculation
function calculatearea(length, width, number) {
    return (length * width * number) / 1000000;
}

function addwalllength() {
    walllength += getdata("walllengthinput") * getdata("wallnumberinput");
    document.getElementById("totalwalllengthinput").value = walllength;
    document.getElementById("walllengthinput").value = "";
    document.getElementById("wallnumberinput").value = "";
    return walllength;
}

// Separate the calculation functions from display functions
function updateWindowArea() {
    windowarea = calculatearea(getdata("windowlengthinput"), getdata("windowwidthinput"), getdata("windownumberinput"));
}

function updateWallArea() {
    var area = calculatearea(getdata("totalwalllengthinput"), getdata("wallheightinput"), 1);
    wallarea+=area
}

function getnetwallarea() {
    var area= wallarea - windowarea;
    return area
}

// Helper functions for getting data from inputs
function getnonnumericdata(widget) {
    return document.getElementById(widget).value;
}

function getdata(widget) {
    const data = parseFloat(document.getElementById(widget).value);
    return isNaN(data) ? 0 : data;
}

function updateSoffitLength() {
    soffitlength = getdata("windowlengthinput") * getdata("windownumberinput");
}

// Reset functions
function clearwindowscreen() {
    document.getElementById("wallareainput").value = getnetwallarea();
    document.getElementById("windowlengthinput").value = "";
    document.getElementById("windowwidthinput").value = "";
    document.getElementById("windownumberinput").value = "";
}

function clearwallscreen() {
    document.getElementById("wallareainput").value = getnetwallarea();
    document.getElementById("totalwalllengthinput").value = "";
    document.getElementById("wallheightinput").value = "";
    document.getElementById("walllengthinput").value = "";
    document.getElementById("wallnumberinput").value = "";
}

// Display function for window information
function displaywindowinformation() {
    updateWindowArea();
    updateWallArea();
    updateSoffitLength();
    document.getElementById("infomationlabel").innerHTML = walldescription();
}

// Material pricing functions
function getblocksize() {
    return document.getElementById("blockselect").value;
}

function getmortamix() {
    return document.getElementById("mortamixselect").value;
}

function getcementtype() {
    return getnonnumericdata("cementselect");
}

function getsandtype() {
    return getnonnumericdata("sandselect");
}

function getblocksprice() {
    return materialprice["block"][getblocksize()];
}

function getcementprice() {
    return materialprice["cement"][getcementtype()];
}

function getsandprice() {
    return materialprice["sand"][getsandtype()];
}

// Block calculation functions
function getnumberofblocks() {
    blocksize = getblocksize();
    let blocksizelist = blocksize.split("x");
    blocklength = parseFloat(blocksizelist[0]);
    blockthickness = parseFloat(blocksizelist[1]);
    blockheight = parseFloat(blocksizelist[2]);
    let length = blocklength + 20;
    let height = blockheight + 20;
    let area = (length * height) / 1000000;
    numberofblocks = Math.ceil(getdata("wallareainput") / area);
    return numberofblocks;
}

function getcostofblock() {
    return getblocksprice() * getnumberofblocks();
}

// Mortar calculation functions
function calculatemorta() {
    mortamix = getmortamix();
    let mortalist = mortamix.split(":");
    mortacement = parseFloat(mortalist[0]);
    mortasand = parseFloat(mortalist[1]);
}

function calculatemortavolume() {
    calculatemorta();
    let blockwallvolume = parseFloat(document.getElementById("wallareainput").value) * blockthickness / 1000;
    let blockvolume = (blockthickness * blocklength * blockheight * numberofblocks) / 1000000000;
    let drymix = 1.3 * (blockwallvolume - blockvolume);
    let sum = mortasand + mortacement;
    bagofmortacement = Math.ceil((mortacement * drymix * 28.96) / sum);
    tonsofmortasand = (mortasand * drymix * 1.52 / sum).toFixed(1);
    cementcost = bagofmortacement * getcementprice();
    sandcost = tonsofmortasand * getsandprice();
}

function getwallmaterialcost() {
    calculatemortavolume();
    return getcostofblock() + cementcost + sandcost;
}

function getwalllaborcost() {
    return (getdata("laborpercentageinput") * getwallmaterialcost()) / 100;
}

function getwallcost() {
    return getwalllaborcost() + getwallmaterialcost();
}

// Wall description display
function walldescription() {
    return `
        <b><u>${blockthickness}mm thick masonry wall of ${getblocksize()} block in (${getmortamix()}) cement-sand mortar</u></b><br>
        ${getcementtype()} cement: ${bagofmortacement} bags @ ${getcementprice()} each = ${cementcost}<br>
        ${getsandtype()} sand: ${tonsofmortasand} tons @ ${getsandprice()} each = ${sandcost}<br>
        ${getblocksize()} blocks: ${getnumberofblocks()} units @ ${getblocksprice()} each = ${getcostofblock()}<br>
        <b>Material cost: ${getwallmaterialcost()}</b><br>
        Labor cost: ${getwalllaborcost()}<br>
        <b><u>Total wall cost: ${getwallcost()}</u></b>
    `;
}
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", displaywindowinformation);
});
document.getElementById("addwindowsbutton").addEventListener("click", clearwindowscreen);
document.getElementById("addwallbutton").addEventListener("click", addwalllength);
document.getElementById("addtotalwallareabutton").addEventListener("click", clearwallscreen);
