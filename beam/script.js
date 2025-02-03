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
    return document.getElementById("beamsmainreinforcementsizeselect").value
}
function getmainscost(){
    return materialprice["steel"][getmainbrand()]
}
function getlinksbrand(){
    return document.getElementById("beamslinksreinforcementsizeselect").value
}
function getlinkcost(){
    return materialprice["steel"][getlinksbrand()]
}
function getbeamplanarperimeter(){
    return 2*getdepth()
}
function getbeamformworkarea(){
    return getbeamplanarperimeter()*getlength()*getnumber()
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
    return Math.ceil(0.00328084*getbeamformworkarea()/gettimberformworkwidth())
}
function formsupportspacing(){
    return parseFloat(document.getElementById("formworktimbersupportselect").value)
}
function getnumberofsupport(){
    return Math.ceil(getlength()*getnumber()/formsupportspacing())
}
function getlengthofsupport(){
    return Math.ceil(getnumberofsupport()*getbeamplanarperimeter()*0.00328084)
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

    // Log to debug if needed
    console.log("Timber Formwork Cost: ", timberFormworkCost);
    console.log("Timber Support Cost: ", timberSupportCost);

    // Return the HTML string with the calculated values inserted
    if (isNaN(totalCost) || totalCost === 0) {
        return ""; // Return empty string if cost is NaN or 0
    }else{
    return `<b><u>sawn timber formwork as described in beams</u></b><br>
        ${timberSize} ${timberType}: ${timberFormworkLength} fts at ${timberFormworkPrice}/ton = ${timberFormworkCost}<br>
        ${timberSupportSize} ${timberType}: ${getlengthofsupport()} ft at ${timberSupportPrice}/ft = ${timberSupportCost}<br>
        MATERIALS COST: ${materialCost}<br>
        LABOR COST: ${laborCost}<br>
        SUBTOTAL: ${totalCost}`;
    }
}
function getmixratio(){
    return document.getElementById("beamconcretemixselect").value
}
function getlength() {
    return parseFloat(document.getElementById("beamlengthinput").value);
}
function getwidth() {
    return parseFloat(document.getElementById("beamwidthinput").value);
}
function getdepth() {
    return parseFloat(document.getElementById("beamdepthinput").value);
}
function getnumber() {
    return parseFloat(document.getElementById("beamnumberinput").value);
}
function calculatebeamvolume() {
    var volume=getlength() * getwidth() * getdepth() * getnumber() / 1000000000;
    document.getElementById("beamnvolumeinput").value=volume;
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
    return Math.ceil((getconcretecementcomponent() * calculatebeamvolume()*1.54 * 28.96) / calculatemixsum());
}
function calculateconcretesand() {
    return Math.ceil((getconcretesandcomponent() * calculatebeamvolume()*1.54 * 1.52) / calculatemixsum())
}
function calculateconcreteballast() {
    return Math.ceil((getconcreteballastcomponent() * calculatebeamvolume()*1.54 * 1.62) / calculatemixsum())
}
function calculateconcretecementcost() {
    return getcementcost()* calculateconcretecement();}
function calculateconcretesandcost() {
    return getsandcost() * calculateconcretesand();}
function calculateconcreteballastcost() {
    return getballastcost() * calculateconcreteballast();}
function calculateconcretematerialcost(){
    return calculateconcretecementcost()+calculateconcretesandcost()+calculateconcreteballastcost()
}
function getlaborpecent(){
    return parseFloat(document.getElementById("beamnlaborinput").value)
}
function calculateconcretelabor(){
    return calculateconcretematerialcost()*getlaborpecent()/100
}
function calculateconcretecost(){
    return calculateconcretelabor()+calculateconcretematerialcost()
}
function calculateRingLength() {
    const cover = parseFloat(document.getElementById("beamsmainreinforcementcoverselect").value);
    const ringLength = getwidth() - 2 * cover;
    const ringWidth = getdepth() - 2 * cover;
    const ringBarLength = 2 * (ringLength + ringWidth);
    return Math.ceil(12000 / ringBarLength); // Number of rings from one full bar
}
function calculateRingNumber() {
    const spacing = parseFloat(document.getElementById("beamsmainreinforcementspscingselect").value);
    return Math.ceil((getnumber() * getlength()) / spacing); // Total number of rings needed
}
function calculateFullRingBars() {
    return Math.ceil(calculateRingNumber() / calculateRingLength()); // Full bars needed for all rings
}
function calculateLengthOfMainBars() {
    const extension = parseFloat(document.getElementById("extensioninput").value);
    return getlength() + extension;
}
function calculateNumberOfMainBarsInOneFullBar() {
    return Math.ceil(12000 / calculateLengthOfMainBars()); // Number of main bars in one full bar
}
function calculateNumberOfMainBars() {
    const numberOfMainBarsInAColumn = parseFloat(document.getElementById("beamsmainreinforcementnumberselect").value);
    return getnumber() * numberOfMainBarsInAColumn; // Total number of main bars
}
function calculateNumberOfMainFullBars() {
    return Math.ceil(calculateNumberOfMainBars() / calculateNumberOfMainBarsInOneFullBar()); // Full bars needed for main bars
}
function calculateWeightOfMainSteel() {
    const mains = document.getElementById("beamsmainreinforcementsizeselect").value;
    return steelweightperfullbar[mains] * calculateNumberOfMainFullBars();
}
function calculateWeightOfLinksSteel() {
    const links = document.getElementById("beamslinksreinforcementsizeselect").value;
    return steelweightperfullbar[links] * calculateFullRingBars();
}
function calculateWeightOfSteel(){
    return Math.ceil(calculateWeightOfLinksSteel() + calculateWeightOfMainSteel());
}
function calculateWeightOfBindingWire() {
    return Math.ceil(calculateWeightOfSteel() * 0.013); // Binding wire weight, 1.3% of steel weight
}
function getlinksize(){
    return document.getElementById("beamslinksreinforcementsizeselect").value;
}
function getmainsize(){
    return document.getElementById("beamsmainreinforcementsizeselect").value;
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
function getbeamreinforcementmaterialscost(){
    return getcostofbindingwire()+getcostoflinks()+getcostofmains()
}
function getbeamreinforcementlaborcost(){
    return getlaborpecent()*getbeamreinforcementmaterialscost()/100
}
function getbeamreinforcementcost(){
    return getbeamreinforcementlaborcost()+getbeamreinforcementmaterialscost()
}
function getbeamcost(){
    let reinforcementCost = getbeamreinforcementcost();
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
    if (isNaN(cost) || cost === 0) {
        return ""; // Return empty string if cost is NaN or 0
    } else {
        return `<b><u>
            ${calculatebeamvolume()} cubic metres of <br>
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
    const cost = getbeamreinforcementcost();
    if (isNaN(cost) || cost === 0) {
        return ""; // Return empty string if cost is NaN or 0
    } else {
        return `<b><u>Reinforcement</u></b><br>
            Links (${getlinksize()}) - ${calculateFullRingBars()} bars at ${getlinkcost()} = ${getcostoflinks()}<br>
            Main Bars (${getmainsize()}) - ${calculateNumberOfMainFullBars()} bars at ${getmainscost()} = ${getcostofmains()}<br>
            Binding Wire - ${calculateWeightOfBindingWire()} kg at ${materialprice["steel"]["bindingwire"]} = ${getcostofbindingwire()}<br>
            Materials............${getbeamreinforcementmaterialscost()}<br>
            Labor............${getbeamreinforcementlaborcost()}<br>
            Subtotal............${getbeamreinforcementcost()}`;
    }
}
function showInfo() {
    const rebardescription = setRebarDescription();
    const concretedescription = setconcretedescription();
    const formworkdescription = setformworkdescription();

    document.getElementById("infomationlabel").innerHTML = `${concretedescription}<br>${rebardescription}<br>${formworkdescription}<br><b><u>Total: ${getbeamcost()}</u></b>`;
}
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", showInfo);
});