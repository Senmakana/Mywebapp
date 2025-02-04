const materialprice = {
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

const steelweightperfullbar = {
    "D8": 4.74,
    "D10": 7.40,
    "D12": 10.66,
    "D16": 18.95,
    "D20": 29.61
};

const steelsize = {
    "D8": 8,
    "D10": 10,
    "D12": 12,
    "D16": 16,
    "D20": 20
};
let mainsbend;

let columnstartersbasesbasedescription = "";
let topsbinding = 0;
let bottomsbinding = 0;
let topbars = 0;
let bottombars = 0;
let columnstartersbasesbaselaborpercent = 0;
let topscost = 0;
let bottomscost = 0;
let costofbars = 0;
let identicalbars = 0;
let reinforcementcost;

function getnonnumericdata(widget) {
    return document.getElementById(widget)?.value || "";
}

function getdata(widget) {
    const data = parseFloat(document.getElementById(widget)?.value);
    return isNaN(data) ? 0 : data;
}

function getlengthofcolumnstartersbottomonereinforcement() {
    const mainReinforcementSize = steelsize[getnonnumericdata("columnstartersmainreinforcementsizeselect")];
    const columnstartersWidth = getdata("columnstarterslengthinput");
    const coverAndSpacing = getdata("columnstartersmainreinforcementcoverselect") // Cover on both sides
    const mainsbend = 25*mainReinforcementSize;
    const extension=50*mainReinforcementSize
    const length = Math.max(columnstartersWidth - coverAndSpacing + mainsbend+extension+450, 0);
    return length
}

function getlengthofcolumnstarterstoponereinforcement() {
    const length=getdata("columnstartersdepthinput")
    const width=getdata("columnstarterswidthinput")
    const mainReinforcementSize = steelsize[getnonnumericdata("columnstarterstopreinforcementsizeselect")];
    const coverAndSpacing = getdata("columnstartersmainreinforcementcoverselect")  * 4; // Cover on both sides
    const reinforcementSpacing = 12.5 * 2 * mainReinforcementSize;
    var link=2*(length+width)-coverAndSpacing+reinforcementSpacing
    console.log(`link length=${link}`)
    return link
}

function getnumberofbottoms() {
    const number = getdata("bottomsspaceinput") * getdata("columnstartersnumberinput");
    const niobar = Math.floor(12000 / getlengthofcolumnstartersbottomonereinforcement());
    bottombars = Math.ceil(number / niobar);
    bottomsbinding = Math.ceil(bottombars * steelweightperfullbar[getnonnumericdata("columnstartersmainreinforcementsizeselect")] * 0.013);
}

function getnumberoftops() {
    const mainReinforcementSize = steelsize[getnonnumericdata("columnstartersmainreinforcementsizeselect")];
    const columnstartersWidth = getdata("columnstarterslengthinput");
    const coverAndSpacing = getdata("columnstartersmainreinforcementcoverselect") // Cover on both sides
    const mainsbend = 25*mainReinforcementSize;
    const extension=50*mainReinforcementSize
    const length = Math.max(columnstartersWidth - coverAndSpacing+450, 0);

    const spaces = Math.ceil(length/ getdata("topspaceinput"));
    const number = spaces * getdata("columnstartersnumberinput");
    const niobar = Math.floor(12000 / getlengthofcolumnstarterstoponereinforcement());
    topbars = Math.ceil(number / niobar);
    topsbinding = Math.ceil(topbars * steelweightperfullbar[getnonnumericdata("columnstarterstopreinforcementsizeselect")] * 0.013);
    return length
}

function comparecolumnstarterssteel() {
    getnumberoftops();
    getnumberofbottoms();
    const mainReinforcementSize = getnonnumericdata("columnstartersmainreinforcementsizeselect");
    const topReinforcementSize = getnonnumericdata("columnstarterstopreinforcementsizeselect");

    columnstarterslaborpercent = getdata("columnstarterslaborpercentinput");

    if (mainReinforcementSize === topReinforcementSize) {
        identicalbars = bottombars + topbars;
        costofbars = identicalbars * materialprice["steel"][mainReinforcementSize];
    } else {
        bottomscost = bottombars * materialprice["steel"][mainReinforcementSize];
        topscost = topbars * materialprice["steel"][topReinforcementSize];
        costofbars = bottomscost + topscost;
    }

    const totalbindingwire = topsbinding + bottomsbinding;
    const bindingwirecost = totalbindingwire * materialprice["steel"]["bindingwire"];
    const barsmaterialcost = bindingwirecost + costofbars;
    const barslaborcost = (barsmaterialcost * columnstarterslaborpercent) / 100;

    return {
        barsmaterialcost,
        barslaborcost,
        barscost: barsmaterialcost + barslaborcost,
        bindingwirecost,
        totalbindingwire
    };
}

function barsdescription() {
    const {
        barsmaterialcost,
        barslaborcost,
        barscost,
        bindingwirecost,
        totalbindingwire
    } = comparecolumnstarterssteel();

    const mainReinforcementSize = getnonnumericdata("columnstartersmainreinforcementsizeselect");
    const topReinforcementSize = getnonnumericdata("columnstarterstopreinforcementsizeselect");
    const bottomsprice=bottombars * materialprice["steel"][mainReinforcementSize];
    const topsprice=materialprice["steel"][topReinforcementSize];
    const bindingwireprice=materialprice["steel"]["bindingwire"];
    reinforcementcost = barscost;
    if (isNaN(reinforcementcost) || reinforcementcost === 0 || reinforcementcost === Infinity)  {
        return ""; // Return empty string if cost is NaN or 0
            } else {
            if (mainReinforcementSize === topReinforcementSize) {
                return `<b><u>Reinforced concrete as describe in<br>column bases</u></b><br>${mainReinforcementSize}...${identicalbars}...bars....${materialprice["steel"][mainReinforcementSize]}...${costofbars} <br>Binding Wire....${totalbindingwire}...kg...${bindingwireprice}... ${bindingwirecost} <br><b>MATERIALS COST...${barsmaterialcost}<br> LABOR COST...${barslaborcost}<br> SUBTOTAL...${barscost}</b>`;
            } else {
            return`<b><u>Reinforced concrete as described in <br> column bases</u></b><br>
                    ${topReinforcementSize}...${topbars}...bars...${topsprice}...${topscost} <br>
                    ${mainReinforcementSize}... ${bottombars}...bars...${bottomsprice}... ${bottomscost} <br>
                    Binding Wire...${totalbindingwire}...kg...${bindingwireprice}... ${bindingwirecost} <br>
                    <b>MATERIALS COST...${barsmaterialcost}<br> LABOR COST...${barslaborcost}<br> SUBTOTAL...${barscost}
                </b>`;
            }
            }
}
function getcementbrand(){
    var cementbrand=getnonnumericdata("columnstarterscementbrandselect")
    return cementbrand
}
function getcementcost(){
    var cementprice= materialprice["cement"][getcementbrand()]
    return cementprice
}
function getsandbrand(){
    var sandbrand= getnonnumericdata("columnstarterssandbrandselect")
    return sandbrand
}
function getsandcost(){
    var sandprice= materialprice["sand"][getsandbrand()]
    return sandprice
}
function getballastbrand(){
    var ballastbrand=getnonnumericdata("columnstartersballastbrandselect")
    return ballastbrand
}
function getballastcost(){
    ballastprice= materialprice["ballast"][getballastbrand()]
    return ballastprice
}
function getmixratio(){
    ratio=getnonnumericdata("columnstartersconcretemixselect")
    return ratio
}
function getdepth() {
    var depth=getdata("columnstartersdepthinput");
    return depth
}
function calculatecolumnstartersvolume() {
    var volume=getdata("columnstarterswidthinput") * getnumberoftops() * getdepth() * getdata("columnstartersnumberinput") / 1000000000;
    return volume
}
function getconcretemix() {
    const ratio=getmixratio();
    var ratiolist= ratio.split(":");
    return ratiolist
}
function getconcretecementcomponent(){
    var cementcomponent= parseFloat(getconcretemix()[0]);
    return cementcomponent
}
function getconcretesandcomponent(){
    return parseFloat(getconcretemix()[1]);
}
function getconcreteballastcomponent(){
    return parseFloat(getconcretemix()[2]);
}
function calculatemixsum(){
    var sum= getconcretecementcomponent() + getconcretesandcomponent() + getconcreteballastcomponent();
    return sum
}

function calculateconcretecement() {
    concretecement= Math.ceil((getconcretecementcomponent() * calculatecolumnstartersvolume()*1.54 * 28.96) / calculatemixsum());
    return concretecement
}
function calculateconcretesand() {
    var concretesand= Math.ceil((getconcretesandcomponent() * calculatecolumnstartersvolume()*1.54 * 1.52) / calculatemixsum())
    return concretesand
}
function calculateconcreteballast() {
    var concreteballast= Math.ceil((getconcreteballastcomponent() * calculatecolumnstartersvolume()*1.54 * 1.62) / calculatemixsum())
    return concreteballast
}
function calculateconcretecementcost() {
    var cementcost= getcementcost()* calculateconcretecement();
    return cementcost
}
function calculateconcretesandcost() {
    var sandcost=  getsandcost()* calculateconcretesand();
    return sandcost
}
function calculateconcreteballastcost() {
    return getballastcost() * calculateconcreteballast();}
function calculateconcretematerialcost(){
    var materialscost= calculateconcretecementcost()+calculateconcretesandcost()+calculateconcreteballastcost()
    return materialscost
}
function calculateconcretelabor(){
    columnstarterslaborpercent = getdata("columnstarterslaborpercentinput");
    return calculateconcretematerialcost()*columnstarterslaborpercent/100
}
function calculateconcretecost(){
    var concretecost= calculateconcretelabor()+calculateconcretematerialcost()
    return concretecost
}
function setconcretedescription(){
    const cost = calculateconcretecost();
    if (isNaN(cost) || cost === 0) {
        return ""; // Return empty string if cost is NaN or 0
    } else {
        return `<b><u>
            ${calculatecolumnstartersvolume()} cubic metres of <br>
            (${getmixratio()}) concrete mix as described in column bases</u></b><br>
            ${getballastbrand()} ballast: ${calculateconcreteballast().toFixed(2)} units at ${getballastcost()}/ton = ${calculateconcreteballastcost()}<br>
            ${getcementbrand()} cement: ${calculateconcretecement()} bags at ${getcementcost()}/bag = ${calculateconcretecementcost()}<br>
            ${getsandbrand()}: ${calculateconcretesand()} tons at ${getsandcost()}/ton = ${calculateconcretesandcost()}<br>
            <b>MATERIALS COST: ${calculateconcretematerialcost()}<br>
            LABOR COST: ${calculateconcretelabor()}<br>
            SUBTOTAL: ${Math.round(calculateconcretecost())}
        </b>`;
    }
}
function calculatecolumnstarterscost(){
    var concretecost=calculateconcretecost()
    var rebarcost=reinforcementcost
    var formWorkCost = calculatecolumnstarterformworkcost();
    if (isNaN(formWorkCost)){
        formWorkCost=0
    }
    if (isNaN(concretecost)){
        concretecost=0
    }
    if (isNaN(rebarcost)|| rebarcost===Infinity){
        rebarcost=0
    }
    const cost=concretecost+rebarcost+formWorkCost
    return cost
}
function showInfo() {
    const rebardescription = barsdescription();
    const concretedescription = setconcretedescription();
    const formworkdescription=setformworkdescription()
    document.getElementById("infomationlabel").innerHTML = `<i>${concretedescription}<br>${rebardescription}<br>${formworkdescription}<br><b><u>TOTAL....${calculatecolumnstarterscost()}</u></b></i>`
}

//formworkscript
function getcolumnstarterplanarperimeter(){
    return 2*(getdata("columnstarterswidthinput")+getdata("columnstartersdepthinput"))
}
function getcolumnstarterformworkarea(){
    return getcolumnstarterplanarperimeter()*getnumberoftops()*getdata("columnstartersnumberinput")
}
function getcolumnstartertimberformworktype(){
    return document.getElementById("columnstarterformworktimberselect").value
}
function getcolumnstartertimberformworksize(){
    return document.getElementById("columnstarterformworktimbersizeselect").value
}
function getcolumnstartertimberformworkprice() {
    const timberType = getcolumnstartertimberformworktype();
    const timberSize = getcolumnstartertimberformworksize();
    // Check if the timberType and timberSize are valid in the materialprice object
    if (!timberType || !timberSize || 
        !materialprice["timber"][timberType] || 
        !materialprice["timber"][timberType][timberSize]) {
        console.warn("Invalid timber type or size. Returning default price of 0.");
        return 0; // Default price or an error indicator
    }
    return materialprice["timber"][timberType][timberSize];
}
function getcolumnstartertimberformworkwidth(){
    const size=getcolumnstartertimberformworksize()
    const sizelist=size.split("x")
    return parseFloat(sizelist[0])
}
function getcolumnstartertimberformworklength(){
    return Math.ceil(0.00328084*getcolumnstarterformworkarea()/getcolumnstartertimberformworkwidth())
}
function formcolumnstartersupportspacing(){
    return parseFloat(document.getElementById("columnstarterformworktimbersupportselect").value)
}
function getcolumnstarternumberofsupport(){
    return Math.ceil(getnumberoftops()*getdata("columnstartersnumberinput")/getdata("columnstarterformworktimbersupportselect"))
}
function getcolumnstarterlengthofsupport(){
    return Math.ceil(getcolumnstarternumberofsupport()*getcolumnstarterplanarperimeter()*0.00328084)
}
function getcolumnstartercostofformwork(){
    return getcolumnstartertimberformworklength()*getcolumnstartertimberformworkprice()
}
function getcolumnstartertimbersupportsize(){
    return document.getElementById("columnstarterformworksupportsizeselect").value
}
function getcolumnstartertimbersupportprice(){
    return materialprice["timber"][getcolumnstartertimberformworktype()][getcolumnstartertimbersupportsize()]
}
function getcolumnstartercostofformworksupport(){
    return getcolumnstarterlengthofsupport()*getcolumnstartertimbersupportprice()
}
function calculatecolumnstarterformworkmaterialcost(){
    return getcolumnstartercostofformwork()+getcolumnstartercostofformworksupport()
}
function calculatecolumnstarterformworklaborcost(){
    return calculatecolumnstarterformworkmaterialcost()*getdata("columnstarterslaborpercentinput")/100
}
function calculatecolumnstarterformworkcost(){
    return calculatecolumnstarterformworklaborcost()+calculatecolumnstarterformworkmaterialcost()
}
function setformworkdescription() {
    // Get the necessary values
    const timberType = getcolumnstartertimberformworktype();
    const timberSize = getcolumnstartertimberformworksize();
    const timberFormworkPrice = getcolumnstartertimberformworkprice();
    const timberFormworkLength = getcolumnstartertimberformworklength();
    const timberSupportSize = getcolumnstartertimbersupportsize();
    const timberSupportPrice = getcolumnstartertimbersupportprice();
    const materialCost = calculatecolumnstarterformworkmaterialcost();
    const laborCost = calculatecolumnstarterformworklaborcost();
    const totalCost = calculatecolumnstarterformworkcost();

    // Calculate costs by calling functions to get values
    const timberFormworkCost = getcolumnstartercostofformwork(); // Ensure this returns a number
    const timberSupportCost = getcolumnstartercostofformworksupport(); // Ensure this returns a number

    // Log to debug if needed
    console.log("Timber Formwork Cost: ", timberFormworkCost);
    console.log("Timber Support Cost: ", timberSupportCost);

    // Return the HTML string with the calculated values inserted
    if (isNaN(totalCost) || totalCost === 0) {
        return ""; // Return empty string if cost is NaN or 0
    }else{
    return `<b><u>sawn timber formwork as described in columns</u></b><br>
        ${timberSize} ${timberType}: ${timberFormworkLength} fts at ${timberFormworkPrice}/ton = ${timberFormworkCost}<br>
        ${timberSupportSize} ${timberType}: ${getcolumnstarterlengthofsupport()} ft at ${timberSupportPrice}/ft = ${timberSupportCost}<br>
        <b>MATERIALS COST: ${materialCost}<br>
        LABOR COST: ${laborCost}<br>
        SUBTOTAL: ${totalCost}<b>`;
    }
}
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", showInfo);
});