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

let columnbasesbasesbasedescription = "";
let topsbinding = 0;
let bottomsbinding = 0;
let topbars = 0;
let bottombars = 0;
let columnbasesbasesbaselaborpercent = 0;
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

function getlengthofcolumnbasesbottomonereinforcement() {
    const mainReinforcementSize = steelsize[getnonnumericdata("columnbasesmainreinforcementsizeselect")];
    const columnbasesWidth = getdata("columnbaseswidthinput");
    const coverAndSpacing = getdata("columnbasesmainreinforcementcoverselect") * 2; // Cover on both sides
    const mainsbend = 12.5 * 2 * mainReinforcementSize;
    return Math.max(columnbasesWidth - coverAndSpacing + mainsbend, 0);
}

function getlengthofcolumnbasestoponereinforcement() {
    const mainReinforcementSize = steelsize[getnonnumericdata("columnbasestopreinforcementsizeselect")];
    const columnbasesWidth = getdata("columnbaseslengthinput");
    const coverAndSpacing = getdata("columnbasesmainreinforcementcoverselect")  * 2; // Cover on both sides
    const reinforcementSpacing = 12.5 * 2 * mainReinforcementSize;
    var length= Math.max(columnbasesWidth - coverAndSpacing + reinforcementSpacing, 0);
    return length
}

function getnumberofbottoms() {
    const spaces = Math.ceil(getdata("columnbaseslengthinput") / getdata("bottomsspaceinput"));
    const number = spaces * getdata("columnbasesnumberinput");
    const niobar = Math.floor(12000 / getlengthofcolumnbasesbottomonereinforcement());
    bottombars = Math.ceil(number / niobar);
    bottomsbinding = Math.ceil(bottombars * steelweightperfullbar[getnonnumericdata("columnbasesmainreinforcementsizeselect")] * 0.013);
}

function getnumberoftops() {
    const spaces = Math.ceil(getdata("columnbaseswidthinput") / getdata("topspaceinput"));
    console.log (`spaces=${spaces}`)
    const number = spaces * getdata("columnbasesnumberinput");
    const niobar = Math.floor(12000 / getlengthofcolumnbasestoponereinforcement());
    topbars = Math.ceil(number / niobar);
    topsbinding = Math.ceil(topbars * steelweightperfullbar[getnonnumericdata("columnbasestopreinforcementsizeselect")] * 0.013);
}

function comparecolumnbasessteel() {
    getnumberoftops();
    getnumberofbottoms();
    const mainReinforcementSize = getnonnumericdata("columnbasesmainreinforcementsizeselect");
    const topReinforcementSize = getnonnumericdata("columnbasestopreinforcementsizeselect");

    columnbaseslaborpercent = getdata("columnbaseslaborpercentinput");

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
    const barslaborcost = (barsmaterialcost * columnbaseslaborpercent) / 100;

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
    } = comparecolumnbasessteel();

    const mainReinforcementSize = getnonnumericdata("columnbasesmainreinforcementsizeselect");
    const topReinforcementSize = getnonnumericdata("columnbasestopreinforcementsizeselect");
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
    var cementbrand=getnonnumericdata("columnbasescementbrandselect")
    return cementbrand
}
function getcementcost(){
    var cementprice= materialprice["cement"][getcementbrand()]
    return cementprice
}
function getsandbrand(){
    var sandbrand= getnonnumericdata("columnbasessandbrandselect")
    return sandbrand
}
function getsandcost(){
    var sandprice= materialprice["sand"][getsandbrand()]
    return sandprice
}
function getballastbrand(){
    var ballastbrand=getnonnumericdata("columnbasesballastbrandselect")
    return ballastbrand
}
function getballastcost(){
    ballastprice= materialprice["ballast"][getballastbrand()]
    return ballastprice
}
function getmixratio(){
    ratio=getnonnumericdata("columnbasesconcretemixselect")
    return ratio
}
function getdepth() {
    var depth=getdata("columnbasesdepthinput");
    return depth
}
function calculatecolumnbasesvolume() {
    var volume=getdata("columnbaseswidthinput") * getdata("columnbaseslengthinput") * getdepth() * getdata("columnbasesnumberinput") / 1000000000;
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
    concretecement= Math.ceil((getconcretecementcomponent() * calculatecolumnbasesvolume()*1.54 * 28.96) / calculatemixsum());
    return concretecement
}
function calculateconcretesand() {
    var concretesand= Math.ceil((getconcretesandcomponent() * calculatecolumnbasesvolume()*1.54 * 1.52) / calculatemixsum())
    return concretesand
}
function calculateconcreteballast() {
    var concreteballast= Math.ceil((getconcreteballastcomponent() * calculatecolumnbasesvolume()*1.54 * 1.62) / calculatemixsum())
    return concreteballast
}
function calculateconcretecementcost() {
    var cementcost= getcementcost()* calculateconcretecement();
    return cementcost
}
function calculateconcretesandcost() {
    var sandcost=  getsandcost()* calculateconcretesand();
    console.log(`sand price=ksh.${sandcost}`)
    return sandcost
}
function calculateconcreteballastcost() {
    return getballastcost() * calculateconcreteballast();}
function calculateconcretematerialcost(){
    var materialscost= calculateconcretecementcost()+calculateconcretesandcost()+calculateconcreteballastcost()
    console.log(`materials=${materialscost}`)
    return materialscost
}
function calculateconcretelabor(){
    columnbaseslaborpercent = getdata("columnbaseslaborpercentinput");
    return calculateconcretematerialcost()*columnbaseslaborpercent/100
}
function calculateconcretecost(){
    var concretecost= calculateconcretelabor()+calculateconcretematerialcost()
    console.log(`concrete cost=${concretecost}`)
    return concretecost
}
function setconcretedescription(){
    const cost = calculateconcretecost();
    console.log(`yes${cost}`)
    if (isNaN(cost) || cost === 0) {
        return ""; // Return empty string if cost is NaN or 0
    } else {
        return `<b><u>
            ${calculatecolumnbasesvolume()} cubic metres of <br>
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
function calculatecolumnbasescost(){
    var concretecost=calculateconcretecost()
    var rebarcost=reinforcementcost
    if (isNaN(concretecost)){
        concretecost=0
    }
    if (isNaN(rebarcost)|| rebarcost===Infinity){
        rebarcost=0
    }
    const cost=concretecost+rebarcost
    return cost
}
function showInfo() {
    const rebardescription = barsdescription();
    const concretedescription = setconcretedescription();
    document.getElementById("infomationlabel").innerHTML = `<i>${concretedescription}<br>${rebardescription}<br><b><u>TOTAL....${calculatecolumnbasescost()}</u></b></i>`
}
function gotocolumnbasesconcretescreen(){
    document.getElementById("columnbasesconcretediv").style.display="inline-block"
    document.getElementById("columnbasesdimensionsdiv").style.display="none"
    document.getElementById("columnbasesrebardiv").style.display="none"
}
function gotocolumnbaseslaborscreen(){
    document.getElementById("columnbasesdimensionsdiv").style.display="none"
    document.getElementById("columnbaseslabordiv").style.display="inline-block"
}
function gotocolumnbasesrebascreen(){
    document.getElementById("columnbasesconcretediv").style.display="none"
    document.getElementById("columnbasesdimensionsdiv").style.display="none"
    document.getElementById("columnbasesrebardiv").style.display="inline-block"
}
function gotocolumnbasesrebascreen(){
    document.getElementById("columnbasesconcretediv").style.display="none"
    document.getElementById("columnbasesdimensionsdiv").style.display="none"
    document.getElementById("columnbasesrebardiv").style.display="inline-block"
}
function gotocolumnbasesdimensionscreen(){
    document.getElementById("columnbaseslabordiv").style.display="none"
    document.getElementById("columnbasesconcretediv").style.display="none"
    document.getElementById("columnbasesdimensionsdiv").style.display="inline-block"
    document.getElementById("columnbasesrebardiv").style.display="none"
}
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", showInfo);
});