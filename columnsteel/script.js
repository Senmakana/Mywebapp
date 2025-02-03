let materialprice = {
    "block":{
        "400x200x200": 80,
        "360x180x180": 60,
        "300x150x150": 25,
        "150x100x75": 13
    },
    "cement":{
        "bamburi":750,
        "simba":720,
        "mombasa":700,
        "rhino":650
    },
    "sand": {
        "river sand":1350,
        "pit sand":100
    },
    "ballast": {
        "mazeras":2000,
        "lunguma":1750,
        "calcium":1000
    },
    "steel":{
        "D8":800,
        "D10":1000,
        "D12":1200,
        "D16":1600,
        "D20":2000,
        "bindingwire":200
    },
    "timber":{
        "pine":{
            "150x25":40,
            "200x25":60,
            "50x50":20
        },
        "mnazi":{
            "150x25":18,
            "200x25":25,
            "50x50":15
        }
    }
};
steelweightperfullbar={
    "D8":4.74,
    "D10":7.40,
    "D12":10.66,
    "D16":18.95,
    "D20":29.61
}
function getdata(widget) {
    const data = parseFloat(document.getElementById(widget)?.value);
    return isNaN(data) ? 0 : data;
}
function getcementbrand(){
    return document.getElementById("cementbrandselect").value
}
function getcementcost(){
    return materialprice["cement"][getcementbrand()]
}
function getsandbrand(){
    return document.getElementById("sandbrandselect").value
}
function getsandcost(){
    return materialprice["sand"][getsandbrand()]
}
function getballastbrand(){
    return document.getElementById("ballastbrandselect").value
}
function getballastcost(){
    return materialprice["ballast"][getballastbrand()]
}
function getmainbrand(){
    return document.getElementById("columnsmainreinforcementsizeselect").value
}
function getmainscost(){
    return materialprice["steel"][getmainbrand()]
}
function getlinksbrand(){
    return document.getElementById("columnslinksreinforcementsizeselect").value
}
function getlinkcost(){
    return materialprice["steel"][getlinksbrand()]
}
function getcolumnplanarperimeter(){
    return 2*(getdata("columndepthinput")+getdata("columnwidthinput"))
}
function getcolumnformworkarea(){
    return getcolumnplanarperimeter()*getdata("columnlengthinput")*getdata("columnnumberinput")
}
function gettimberformworktype(){
    return document.getElementById("formworktimberselect").value
}
function gettimberformworksize(){
    return document.getElementById("formworktimbersizeselect").value
}
function gettimberformworkprice() {
    const timberType = gettimberformworktype();
    const timberSize = gettimberformworksize();
    // Check if the timberType and timberSize are valid in the materialprice object
    if (!timberType || !timberSize || 
        !materialprice["timber"][timberType] || 
        !materialprice["timber"][timberType][timberSize]) {
        console.warn("Invalid timber type or size. Returning default price of 0.");
        return 0; // Default price or an error indicator
    }
    return materialprice["timber"][timberType][timberSize];
}
function gettimberformworkwidth(){
    const size=gettimberformworksize()
    const sizelist=size.split("x")
    return parseFloat(sizelist[0])
}
function gettimberformworklength(){
    return Math.ceil(0.00328084*getcolumnformworkarea()/gettimberformworkwidth())
}
function formsupportspacing(){
    return getdata("formworktimbersupportselect")
}
function getnumberofsupport(){
    return Math.ceil(getdata("columnlengthinput")*getdata("columnnumberinput")/formsupportspacing())
}
function getlengthofsupport(){
    return Math.ceil(getnumberofsupport()*getcolumnplanarperimeter()*0.00328084)
}
function getcostofformwork(){
    return gettimberformworklength()*gettimberformworkprice()
}
function gettimbersupportsize(){
    return document.getElementById("formworksupportsizeselect").value
}
function gettimbersupportprice(){
    return materialprice["timber"][gettimberformworktype()][gettimbersupportsize()]
}
function getcostofformworksupport(){
    return getlengthofsupport()*gettimbersupportprice()
}
function calculateformworkmaterialcost(){
    return getcostofformwork()+getcostofformworksupport()
}
function calculateformworklaborcost(){
    return calculateformworkmaterialcost()*getlaborpecent()/100
}
function calculateformworkcost(){
    return calculateformworklaborcost()+calculateformworkmaterialcost()
}
function setformworkdescription() {
    // Get the necessary values
    const timberType = gettimberformworktype();
    const timberSize = gettimberformworksize();
    const timberFormworkPrice = gettimberformworkprice();
    const timberFormworkLength = gettimberformworklength();
    const timberSupportSize = gettimbersupportsize();
    const timberSupportPrice = gettimbersupportprice();
    const materialCost = calculateformworkmaterialcost();
    const laborCost = calculateformworklaborcost();
    const totalCost = calculateformworkcost();

    // Calculate costs by calling functions to get values
    const timberFormworkCost = getcostofformwork(); // Ensure this returns a number
    const timberSupportCost = getcostofformworksupport(); // Ensure this returns a number
    // Return the HTML string with the calculated values inserted
    if (isNaN(totalCost) || totalCost === 0  || totalCost===Infinity) {
        return ""; // Return empty string if cost is NaN or 0
    }else{
    return `<b><u>sawn timber formwork as described in columns</u></b><br>
        ${timberSize} ${timberType}: ${timberFormworkLength} fts at ${timberFormworkPrice}/ton = ${timberFormworkCost}<br>
        ${timberSupportSize} ${timberType}: ${getlengthofsupport()} ft at ${timberSupportPrice}/ft = ${timberSupportCost}<br>
        MATERIALS COST: ${materialCost}<br>
        LABOR COST: ${laborCost}<br>
        SUBTOTAL: ${totalCost}`;
    }
}
function getmixratio(){
    return document.getElementById("columnconcretemixselect").value
}
function calculatecolumnvolume() {
    var volume=getdata("columnlengthinput") *getdata("columnwidthinput") * getdata("columndepthinput") * getdata("columnnumberinput") / 1000000000;
    document.getElementById("columnnvolumeinput").value=volume;
    return volume
}
function getconcretemix() {
    const ratio=getmixratio();
    return ratio.split(":");
}
function getconcretecementcomponent(){
    return parseFloat(getconcretemix()[0]);
}
function getconcretesandcomponent(){
    return parseFloat(getconcretemix()[1]);
}
function getconcreteballastcomponent(){
    return parseFloat(getconcretemix()[2]);
}
function calculatemixsum(){
    return getconcretecementcomponent() + getconcretesandcomponent() + getconcreteballastcomponent();
}

function calculateconcretecement() {
    return Math.ceil((getconcretecementcomponent() * calculatecolumnvolume()*1.54 * 28.96) / calculatemixsum());
}
function calculateconcretesand() {
    return Math.ceil((getconcretesandcomponent() * calculatecolumnvolume()*1.54 * 1.52) / calculatemixsum())
}
function calculateconcreteballast() {
    return Math.ceil((getconcreteballastcomponent() * calculatecolumnvolume()*1.54 * 1.62) / calculatemixsum())
}
function calculateconcretecementcost() {
    return getcementcost()* calculateconcretecement();
}
function calculateconcretesandcost() {
    return getsandcost() * calculateconcretesand();}
function calculateconcreteballastcost() {
    return getballastcost() * calculateconcreteballast();}
function calculateconcretematerialcost(){
    return calculateconcretecementcost()+calculateconcretesandcost()+calculateconcreteballastcost()
}
function getlaborpecent(){
    return getdata("columnnlaborinput")
}
function calculateconcretelabor(){
    return calculateconcretematerialcost()*getlaborpecent()/100
}
function calculateconcretecost(){
    return calculateconcretelabor()+calculateconcretematerialcost()
}
function calculateRingLength() {
    const cover = getdata("columnsmainreinforcementcoverselect");
    const ringLength = getdata("columnwidthinput") - 2 * cover;
    const ringWidth = getdata("columndepthinput") - 2 * cover;
    const ringBarLength = 2 * (ringLength + ringWidth);
    return Math.ceil(12000 / ringBarLength); // Number of rings from one full bar
}
function calculateRingNumber() {
    const spacing = getdata("columnsmainreinforcementspscingselect");
    return Math.ceil((getdata("columnnumberinput") * getdata("columnlengthinput")) / spacing); // Total number of rings needed
}
function calculateFullRingBars() {
    return Math.ceil(calculateRingNumber() / calculateRingLength()); // Full bars needed for all rings
}
function calculateLengthOfMainBars() {
    const extension = getdata("extensioninput");
    return getdata("columnlengthinput") + extension;
}
function calculateNumberOfMainBarsInOneFullBar() {
    return Math.ceil(12000 / calculateLengthOfMainBars()); // Number of main bars in one full bar
}
function calculateNumberOfMainBars() {
    const numberOfMainBarsInAColumn = getdata("columnsmainreinforcementnumberselect");
    return getdata("columnnumberinput") * numberOfMainBarsInAColumn; // Total number of main bars
}
function calculateNumberOfMainFullBars() {
    return Math.ceil(calculateNumberOfMainBars() / calculateNumberOfMainBarsInOneFullBar()); // Full bars needed for main bars
}
function calculateWeightOfMainSteel() {
    const mains = document.getElementById("columnsmainreinforcementsizeselect").value;
    return steelweightperfullbar[mains] * calculateNumberOfMainFullBars();
}
function calculateWeightOfLinksSteel() {
    const links = document.getElementById("columnslinksreinforcementsizeselect").value;
    return steelweightperfullbar[links] * calculateFullRingBars();
}
function calculateWeightOfSteel(){
    return Math.ceil(calculateWeightOfLinksSteel() + calculateWeightOfMainSteel());
}
function calculateWeightOfBindingWire() {
    return Math.ceil(calculateWeightOfSteel() * 0.013); // Binding wire weight, 1.3% of steel weight
}
function getlinksize(){
    return document.getElementById("columnslinksreinforcementsizeselect").value;
}
function getmainsize(){
    return document.getElementById("columnsmainreinforcementsizeselect").value;
}
function getcostofmains(){
    return calculateNumberOfMainFullBars()*getmainscost()
}
function getcostoflinks(){
    return calculateFullRingBars()*getlinkcost()
}
function getcostofbindingwire(){
    return calculateWeightOfBindingWire()*materialprice["steel"]["bindingwire"]
}
function getcolumnreinforcementmaterialscost(){
    return getcostofbindingwire()+getcostoflinks()+getcostofmains()
}
function getcolumnreinforcementlaborcost(){
    return getlaborpecent()*getcolumnreinforcementmaterialscost()/100
}
function getcolumnreinforcementcost(){
    return getcolumnreinforcementlaborcost()+getcolumnreinforcementmaterialscost()
}
function getcolumncost(){
    let reinforcementCost = getcolumnreinforcementcost();
    let concreteCost = calculateconcretecost();
    let formworkcost=calculateformworkcost();

    if (isNaN(reinforcementCost)) {  // Corrected
        reinforcementCost = 0;
    }
    if (isNaN(concreteCost)) {       // Corrected
        concreteCost = 0;
    }
    if (isNaN(formworkcost)) {       // Corrected
        formworkcost = 0;
    }
    return reinforcementCost + concreteCost + formworkcost;  // Adjusted return value
}
function setconcretedescription(){
    const cost = calculateconcretecost();
    if (isNaN(cost) || cost === 0  || cost===Infinity) {
        return ""; // Return empty string if cost is NaN or 0
    } else {
        return `<b><u>
            ${calculatecolumnvolume()} cubic metres of <br>
            (${getmixratio()}) concrete mix</u></b><br>
            ${getballastbrand()} ballast: ${calculateconcreteballast().toFixed(2)} units at ${getballastcost()}/ton = ${calculateconcreteballastcost()}<br>
            ${getcementbrand()} cement: ${calculateconcretecement()} bags at ${getcementcost()}/bag = ${calculateconcretecementcost()}<br>
            ${getsandbrand()}: ${calculateconcretesand()} tons at ${getsandcost()}/ton = ${calculateconcretesandcost()}<br>
            MATERIALS COST: ${calculateconcretematerialcost()}<br>
            LABOR COST: ${calculateconcretelabor()}<br>
            SUBTOTAL: ${Math.round(calculateconcretecost())}
        `;
    }
}
function setRebarDescription() {
    const cost = getcolumnreinforcementcost();
    if (isNaN(cost) || cost === 0 || cost===Infinity) {
        return ""; // Return empty string if cost is NaN or 0
    } else {
        return `<b><u>Reinforcement</u></b><br>
            Links (${getlinksize()}) - ${calculateFullRingBars()} bars at ${getlinkcost()} = ${getcostoflinks()}<br>
            Main Bars (${getmainsize()}) - ${calculateNumberOfMainFullBars()} bars at ${getmainscost()} = ${getcostofmains()}<br>
            Binding Wire - ${calculateWeightOfBindingWire()} kg at ${materialprice["steel"]["bindingwire"]} = ${getcostofbindingwire()}<br>
            Materials............${getcolumnreinforcementmaterialscost()}<br>
            Labor............${getcolumnreinforcementlaborcost()}<br>
            Subtotal............${getcolumnreinforcementcost()}`;
    }
}
function gotocolumnworks() {
    const works = document.getElementById("columnworksdiv").value;
    const sections = [
        "columnconcretediv",
        "columnreinforcementdiv",
        "columnformworkdiv",
        "columnlabordiv",
    ];

    // Hide all sections first
    sections.forEach((id) => {
        document.getElementById(id).style.display = "none";
    });

    // Show the selected section if it matches
    const targetDiv = `column${works}div`;
    if (sections.includes(targetDiv)) {
        document.getElementById(targetDiv).style.display = "inline-block";
    }
}

document.getElementById("columnworksdiv").addEventListener("change",gotocolumnworks)

function showInfo() {
    const rebardescription = setRebarDescription();
    const concretedescription = setconcretedescription();
    const formworkdescription = setformworkdescription();

    document.getElementById("infomationlabel").innerHTML = `${concretedescription}<br>${rebardescription}<br>${formworkdescription}<br><b><u>Total: ${getcolumncost()}</u></b>`;
}
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", showInfo);
});