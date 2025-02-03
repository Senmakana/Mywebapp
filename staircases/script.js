let concretecost;
let formworkcost;
let stairreinforcementcost;
let staircasecost;
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
        "poles":{
            "length":0
        },
        "casuarina":{
            "1500":130,
            "3000":250
        },
        "mangroove":{
            "1500":150,
            "3000":280
        },
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
    },
    "fencing":{
        "barbed wire":{
            "length":515000,
            "cost":7000
        },
        "fencing posts":{
            "wooden posts":{
                "length":1800,
                "cost":200
            },
            "concrete posts":{
                "length":2000,
                "cost":1500
            }
        }
    },
    "nails":{
        '1"':1960,
        '2"':331,
        '3"':120,
        '4"':64,
        '5"':35,
        "cost":200
    }
};
const steelsize = {
    "D8": 8,
    "D10": 10,
    "D12": 12,
    "D16": 16,
    "D20": 20
};
const steelweightperfullbar = {
    "D8": 4.74,
    "D10": 7.40,
    "D12": 10.66,
    "D16": 18.95,
    "D20": 29.61
};
function gotocolumnworks() {
    const works = document.getElementById("stairworksselect").value;
    const sections = [
        "stairconcretediv",
        "stairreinforcementdiv",
        "stairformworkdiv",
        "stairlabordiv",
    ];
    // Hide all sections first
    sections.forEach((id) => {
        document.getElementById(id).style.display = "none";
    });

    // Show the selected section if it matches
    const targetDiv = `stair${works}div`;
    if (sections.includes(targetDiv)) {
        document.getElementById(targetDiv).style.display = "inline-block";
    }
}
function getdata(widget) {
    const data = parseFloat(document.getElementById(widget)?.value);
    return isNaN(data) ? 0: data;
}
function calculateareaofatriangle(length, width) {
    return length*width/2000000
}
function calculatevolume(area, depth) {
    return area*depth/1000
}
function calculatevolumeofsteps() {
    var length = getdata("treadlengthinput")
    var width = getdata("riserlengthinput")
    var depth = getdata("stairwidthinput")
    var number = getdata("stepsnumberinput")
    var stairs = getdata("stairsnumberinput")
    var area = calculateareaofatriangle(length, width)
    var volume = calculatevolume(area, depth)*number*stairs
    return volume
}
function calculatestairslantheight() {
    var length = getdata("treadlengthinput")
    var width = getdata("riserlengthinput")
    var depth = getdata("stairwidthinput")
    var number = getdata("stepsnumberinput")
    var stairs = getdata("stairsnumberinput")
    var hypotenuse = Math.ceil(((length**2)+(width**2))**0.5*number)
    return hypotenuse

}
function calculatestairlength() {
    var landing = getdata("landinglengthinput")
    var number = getdata("landingnumberinput")
    var landinlength = landing*number
    var slant = calculatestairslantheight()
    var length = landinlength+slant
    return length
}
function calculatevolumeofslab() {
    var thickness = getdata("stairslabthicknessinput")
    var length = calculatestairlength()
    var width = getdata("stairwidthinput")
    var number = getdata("stairsnumberinput")
    var volume = thickness*length*width*number/1000000000
    return volume

}
function calculatestairvolume() {
    var volume = calculatevolumeofslab()+calculatevolumeofsteps()
    return volume
}
function calculateconcretematerials(volume, index, factor) {
    var concretemix = document.getElementById("stairconcretemixselect").value
    var ratiolist = concretemix.split(":")
    var sum = parseFloat(ratiolist[0])+parseFloat(ratiolist[1])+parseFloat(ratiolist[2])
    var component = parseFloat(ratiolist[index])
    var material = component*volume*factor/sum
    return material
}
function calculatestairconcretematerials() {
    const volume = calculatestairvolume()*1.54
    const cementtype = document.getElementById("cementbrandselect").value
    const cementprice = materialprice["cement"][cementtype]
    const cement = Math.ceil(calculateconcretematerials(volume, 0, 28.96))
    const cementcost = cement*cementprice
    const cementdescription = `${cementtype} cement...${cement}...bags...${cementprice}...${cementcost}`
    const sandtype = document.getElementById("sandbrandselect").value
    const sandprice = materialprice["sand"][sandtype]
    const sand = Math.ceil(calculateconcretematerials(volume, 1, 1.52))
    const sandcost = sand*sandprice
    const sanddescription = `${sandtype}...${sand}...tons...${sandprice}...${sandcost}`
    const ballasttype = document.getElementById("ballastbrandselect").value
    const ballastprice = materialprice["ballast"][ballasttype]
    const ballast = Math.ceil(calculateconcretematerials(volume, 2, 1.62))
    const ballastcost = ballast*ballastprice
    const ballastdescription = `${ballasttype} ballast...${ballast}...tons...${ballastprice}...${ballastcost}`
    const materialcost = cementcost+sandcost+ballastcost
    const laborcost = getdata("laborpercentageinput")*materialcost/100
    concretecost = materialcost+laborcost
    var concretemix = document.getElementById("stairconcretemixselect").value
    const concretedescription = `<b><u>(${concretemix}) reinforced concrete mix<br>as described in staircases</u></b>`
    var description = `${concretedescription}<br>${cementdescription}<br>${sanddescription}<br>${ballastdescription}<br><b>MATERIAL COST......${materialcost}<br>LABOR COST......${laborcost}<br><u>SUBTOTAL......${concretecost}</u></b>`
    if (concretecost===0||isNaN(concretecost)){
        return ""
    }else{
        return description
    }
}
function calculatestairformwork() {
    const length = calculatestairlength()/1000
    const stepsnumber = getdata("stepsnumberinput")
    const stairwidth = getdata("stairwidthinput")/1000
    const slabthickness = getdata("stairslabthicknessinput")/1000
    const riser = getdata("riserlengthinput")/1000
    const stairs = getdata("stairsnumberinput")
    const stepstoppers = stairwidth*stepsnumber
    const sides = 2*(slabthickness+riser)
    const soffitsandsidewidth = sides+stairwidth
    const soffitsandsidearea = soffitsandsidewidth*length
    const formworktimbersize = document.getElementById("stairformworktimbersizeselect").value
    const formworktimbersizelist = formworktimbersize.split("x")
    const widthofformworktimber = formworktimbersizelist[0]/1000
    const lengthofsoffittimber = soffitsandsidearea/widthofformworktimber
    const soffitssidesandstepstoppers=Math.ceil((lengthofsoffittimber+stepstoppers)*stairs*3.28)
    const formworktimbertype=document.getElementById("stairformworktimberselect").value
    console.log(formworktimbertype)
    const soffitandsideformworkprice=materialprice["timber"][formworktimbertype][formworktimbersize]
    const materialcostforsoffitsandsides=soffitandsideformworkprice*soffitssidesandstepstoppers
    const soffitssidesandstepstoppersdescription=`${formworktimbersize}...${soffitssidesandstepstoppers}...ft...${soffitandsideformworkprice}...${materialcostforsoffitsandsides}`
    const spacebetweensupports=getdata("stairformworktimbersupportselect")/1000
    const supportimbersize=document.getElementById("stairformworksupportsizeselect").value
    const numberofsupports=Math.ceil(length*stairs/spacebetweensupports)
    const lengthofsupport=Math.ceil(numberofsupports*soffitsandsidewidth*3.28)
    const priceofsupport=materialprice["timber"][formworktimbertype][supportimbersize]
    const costofsupport=priceofsupport*lengthofsupport
    const horizontalsupportdescription=`${supportimbersize}...${lengthofsupport}...ft...${priceofsupport}...${costofsupport}`
    const poles=document.getElementById("staircasepoleselect").value
    const poleslength=document.getElementById("staircasepolelengthselect").value
    const lateralnumberofverticalsupport=Math.ceil(stairwidth/spacebetweensupports)
    const numberofverticalsupports=lateralnumberofverticalsupport*numberofsupports
    const polesprice=materialprice["timber"][poles][poleslength]
    const polescost=polesprice*numberofverticalsupports
    let polesdescription;
    if (polescost===0){
        polesdescription=""
    }else{
        polesdescription=`${poleslength}mm...${poles}...${numberofverticalsupports}...${polesprice}...${polescost}`
    }
    const formworworkmaterialcost=polescost+materialcostforsoffitsandsides+costofsupport
    const laborcost=formworworkmaterialcost*getdata("laborpercentageinput")/100
    formworkcost=laborcost+formworworkmaterialcost
    
    if (formworkcost===0||isNaN(formworkcost)){
        return ""
    }else{
        return `<b><u>Sawn timber formwork as described in staircases</u></b><br>${soffitssidesandstepstoppersdescription}<br>${horizontalsupportdescription}<br>${polesdescription}<br><b>MATERIAL COST......${formworworkmaterialcost}<br>LABOR COST......${laborcost}<br><u>SUBTOTAL......${formworkcost}</u></b>`
    }
}
function calculatestaircasecost(){
    if (formworkcost===Infinity||isNaN(formworkcost)){
        formworkcost=0
    }
    if (concretecost===Infinity||isNaN(concretecost)){
        concretecost=0
    }
    if (stairreinforcementcost===Infinity||isNaN(stairreinforcementcost)){
        stairreinforcementcost=0
    }
    staircasecost =formworkcost+concretecost+stairreinforcementcost
    if (staircasecost===0||isNaN(staircasecost)){
        return ""
    }else{
        return `<b><u>TOTAL COST......${staircasecost}</u></b>`
    }
}
function calculatestaircaserebar(){
    const length = calculatestairlength()/1000
    const stepsnumber = getdata("stepsnumberinput")
    const stairwidth = getdata("stairwidthinput")/1000
    const slabthickness = getdata("stairslabthicknessinput")/1000
    const riser = getdata("riserlengthinput")/1000
    const stairs = getdata("stairsnumberinput")
    const cover=getdata("stairmainreinforcementcoverselect")/1000
    const bottombars=document.getElementById("stairmainreinforcementsizeselect").value
    bottombarsize=steelsize[bottombars]/1000
    bottombend=bottombarsize*12.5*2
    const extension=stairwidth*2/4
    const bottomlength = stairwidth+extension+bottombend-2*cover
    const numberofbottomsinonefullbar=Math.floor(12/bottomlength)
    const spacebetweenbottoms=getdata("stairmainreinforcementnumberselect")/1000
    const numberofbottombars=Math.ceil(length/spacebetweenbottoms)*stairs
    const numberoffullbottombars=Math.ceil(numberofbottombars/numberofbottomsinonefullbar*1.5)
    const priceofbottoms=materialprice["steel"][bottombars]
    const costofbottoms=priceofbottoms*numberoffullbottombars
    let bottomsdescriptin
    if (costofbottoms===0||isNaN(costofbottoms)||costofbottoms===Infinity){bottomsdescriptin=""
    }else{
        bottomsdescriptin=`bottoms (${bottombars})...${numberoffullbottombars}...no....${priceofbottoms}...${costofbottoms}`
    }
    const topbars=document.getElementById("stairlinksreinforcementsizeselect").value
    const topbarsize=steelsize[topbars]/1000
    const topcantilever=12.5*topbarsize
    const slant=calculatestairslantheight()/1000
    const topbarbend=slant/4
    const topbendanfcant=topbarbend+topcantilever
    const lengthoftopbar=length+2*topbendanfcant
    let numberoftopsinfullbar=Math.floor(12/lengthoftopbar)
    let spacebetweentops=getdata("stairmainreinforcementspscingselect")/1000
    const numberoftopbars=Math.ceil(stairs*stairwidth/spacebetweentops)
    const tops=Math.ceil(numberoftopbars/numberoftopsinfullbar*1.5)
    const topsprice=materialprice["steel"][topbars]
    const topscost=tops*topsprice
    let topsdescription;
    if (topscost===0||isNaN(topscost)||topscost===Infinity){
        topsdescription=""
    }else{
        topsdescription=(`tops(${topbars})...${tops}...no...${topsprice}...${topscost}`)
    }
    const bottomweight=steelweightperfullbar[bottombars]*numberoffullbottombars
    const topweight=steelweightperfullbar[topbars]*tops
    const bindingwire=Math.ceil(0.013*(topweight+bottomweight))
    const bindingwireprice=materialprice["steel"]["bindingwire"]
    const bindingwirecost=bindingwire*bindingwireprice
    let bindingwiredescription;
    if (bindingwirecost===0||isNaN(bindingwirecost)||bindingwirecost===Infinity){
        bindingwiredescription=""
    }else{
        bindingwiredescription=`bindingwire...${bindingwire}...kg...${bindingwireprice}...${bindingwirecost}`
    }
    const reinforcementmaterialscost=bindingwirecost+topscost+costofbottoms
    const laborcost=getdata("laborpercentageinput")*reinforcementmaterialscost/100
    stairreinforcementcost=reinforcementmaterialscost+laborcost
    let reinforcementdescription;
    if (stairreinforcementcost===0||stairreinforcementcost===Infinity||isNaN(stairreinforcementcost))
        {reinforcementdescription=""
        }else{
            reinforcementdescription=`<b><u>Deformed steel reinforcements as described in staircases</u></b><br>${bottomsdescriptin}<br>${topsdescription}<br>${bindingwiredescription}<br><b>MATERIALS COST......${reinforcementmaterialscost}<br>LABOR COST......${laborcost}<br><u>SUBTOTAL......${stairreinforcementcost}</u></b>`
        }
    return reinforcementdescription
}

function showstairconcrete() {
    document.getElementById("infomationlabel").innerHTML = `${calculatestairformwork()}<br>${calculatestaircaserebar()}<br>${calculatestairconcretematerials()}<br>${calculatestaircasecost()}`
}
document.getElementById("stairworksselect").addEventListener("change", gotocolumnworks)
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", showstairconcrete);
});