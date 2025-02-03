var spacearea=0
var slabarearea=0
var hardcoredensity=1.8
var blindingdensity=1.6
let brccost;
let polythenecost;
let hardcorecost;
let blindingcost;
let foundationslabconcretecost;
let foundationslabcost;
let foundationslabformworkcost;
var plinth=0
function addplinth(){
    length=getdata("plinthinput")
    plinth+=length
    document.getElementById("totalplinthinput").value=plinth
    document.getElementById("plinthinput").value=""
}
function calculatelengthoffoundationslabformwork(){
    const plinth=getdata("totalplinthinput")
    const length=Math.ceil(3.28*plinth/1000)
    const timber = getnonnumericdata("foundationslabformworktimberselect")
    const timbersize = getnonnumericdata("foundationslabformworktimbersizeselect")
    const price=materialprice["timber"][timber][timbersize]
    const cost=length*price
    const labor=cost*getdata("laborpercent")/100
    const total =cost+labor
    foundationslabformworkcost=total
    let description
    if (total===0||isNaN(total)||total===Infinity){
        description=""
    }else{
        description=`<b><u>sawn timber as described in sides of ground floor slab</u></b><br>${timbersize} ${timber}...${length}...ft...${price}...${cost}<br><b>MATERIAL COST......${cost}<br>LABOR COST......${labor}<br><u>SUBTOTAL......${total}</u></b>`
    }
    return description
}
function calculateslabfoundationcost(){
    if(brccost===Infinity||isNaN(brccost)){
        brccost=0
    }
    if(polythenecost===Infinity||isNaN(polythenecost)){
        polythenecost=0
    }
    if(hardcorecost===Infinity||isNaN(hardcorecost)){
        hardcorecost=0
    }
    if(blindingcost===Infinity||isNaN(blindingcost)){
        blindingcost=0
    }
    if(foundationslabconcretecost===Infinity||isNaN(foundationslabconcretecost)){
        foundationslabconcretecost=0
    }
    if(foundationslabformworkcost===Infinity||isNaN(foundationslabformworkcost)){
        foundationslabformworkcost=0
    }
    foundationslabcost=brccost+polythenecost+hardcorecost+blindingcost+foundationslabconcretecost+foundationslabformworkcost
    return `<b><u>TOTAL......${foundationslabcost}</u></b>`
}

function calculatepolythenesheet(){
    const area=getdata("slabareainput")
    const length=Math.ceil(area/1.8)
    const polythene = getnonnumericdata("polytheneselect")
    const price=materialprice["polythene sheet"][polythene]
    const cost=length*price
    const labor=cost*getdata("laborpercent")/100
    const total =cost+labor
    polythenecost=total
    let description
    if (total===0||isNaN(total)||total===Infinity){
        description=""
    }else{
        description=`<b><u>polythene sheet over the building area</u></b><br>${polythene} polythene sheet...${length}...meters...${price}...${cost}<br><b>MATERIAL COST......${cost}<br>LABOR COST......${labor}<br><u>SUBTOTAL......${total}</u></b>`
    }
    return description
}
function calculatebrc(){
    const area=getdata("slabareainput")
    const rolls=Math.ceil(area/96)
    const brc = getnonnumericdata("brcselect")
    const price=materialprice["steel"]["brc"][brc]
    const cost=rolls*price
    const labor=cost*getdata("laborpercent")/100
    const total =cost+labor
    brccost=total
    let description
    if (total===0||isNaN(total)||total===Infinity){
        description=""
    }else{
        description=`<b><u>brc wiremesh over the building area</u></b><br>${brc} wiremesh...${rolls}...rolls...${price}...${cost}<br><b>MATERIAL COST......${cost}<br>LABOR COST......${labor}<br><u>SUBTOTAL......${total}</u></b>`
    }
    return description
}
function getnonnumericdata(widget) {
    return document.getElementById(widget).value;
}
function getdata(widget) {
    const data = parseFloat(document.getElementById(widget)?.value);
    return isNaN(data) ? 0: data;
}
function calculatespacearea(){
    const length=getdata("hardcorespacelength")
    const width=getdata("hardcorespacewidth")
    const number=getdata("hardcorespacenumber")
    const area=length*width*number/1000000
    return area
}
function calculateslabarea(){
    const length=getdata("slablengthinput")
    const width=getdata("slabwidthinput")
    const number=getdata("slabnumberinput")
    const area=length*width*number/1000000
    return area
}
function addslabareas(){
    slabarearea+=calculateslabarea()
    document.getElementById("slabareainput").value=`${slabarearea}`
    document.getElementById("slablengthinput").value=""
    document.getElementById("slabwidthinput").value=""
    document.getElementById("slabnumberinput").value=""
}
function addspaceareas(){
    spacearea+=calculatespacearea()
    document.getElementById("hardcorearealabel").value=`${spacearea}`
    document.getElementById("hardcorespacelength").value=""
    document.getElementById("hardcorespacewidth").value=""
    document.getElementById("hardcorespacenumber").value=""
}
function calculatehardcore(){
    const depth=getdata("hardcoredepth")
    const area=getdata("hardcorearealabel")
    const density=hardcoredensity
    const volume=area*depth/1000
    const weight=Math.ceil(volume*density)
    const hardcore=getnonnumericdata("hardcoreselect")
    const price=materialprice["fillings"]["hardcore"][hardcore]
    const cost=price*weight
    const labor=cost*getdata("laborpercent")/100
    const total =cost+labor
    hardcorecost=total
    let description
    if (total===0||isNaN(total)||total===Infinity){
        description=""
    }else{
        description=`<b><u>${depth}mm well compacted hard over the building area</u></b><br>${hardcore}...${weight}...tons...${price}...${cost}<br><b>MATERIAL COST......${cost}<br>LABOR COST......${labor}<br><u>SUBTOTAL......${total}</u></b>`
    }
    return description
}
function calculateblinding(){
    const depth=getdata("blindingdepth")
        const area=getdata("hardcorearealabel")
    const density=blindingdensity
    const volume=area*depth/1000
    const weight=Math.ceil(volume*density)
    const blinding=getnonnumericdata("blindingcoreselect")
    const price=materialprice["fillings"]["blinding"][blinding]
    console.log(price)
    const cost=price*weight
    const labor=cost*getdata("laborpercent")/100
    const total =cost+labor
    let description
    blindingcost=total
    if (total===0||isNaN(total)||total===Infinity){
        description=""
    }else{
        description=`<b><u>${depth}mm well consolidated blinding over the building area</u></b><br>${blinding}...${weight}...tons...${price}...${cost}<br><b>MATERIAL COST......${cost}<br>LABOR COST......${labor}<br><u>SUBTOTAL......${total}</u></b>`
    }
    return description
}
function calculateconcretematerials(volume, index, factor) {
    var concretemix = document.getElementById("foundationslabconcretemixselect").value
    var ratiolist = concretemix.split(":")
    var sum = parseFloat(ratiolist[0])+parseFloat(ratiolist[1])+parseFloat(ratiolist[2])
    var component = parseFloat(ratiolist[index])
    var material = component*volume*factor/sum
    return material
}
function calculatefoundationslab() {
    area=getdata("slabareainput")
    thickness=getdata("slabthicknessinput")/1000
    const volume =area*thickness *1.54
    console.log(volume)
    const cementtype = document.getElementById("foundationslabcementbrandselect").value
    const cementprice = materialprice["cement"][cementtype]
    const cement = Math.ceil(calculateconcretematerials(volume, 0, 28.96))
    const cementcost = cement*cementprice
    const cementdescription = `${cementtype} cement...${cement}...bags...${cementprice}...${cementcost}`
    const sandtype = document.getElementById("foundationslabsandbrandselect").value
    const sandprice = materialprice["sand"][sandtype]
    const sand = Math.ceil(calculateconcretematerials(volume, 1, 1.52))
    const sandcost = sand*sandprice
    const sanddescription = `${sandtype}...${sand}...tons...${sandprice}...${sandcost}`
    const ballasttype = document.getElementById("foundationslabballastbrandselect").value
    const ballastprice = materialprice["ballast"][ballasttype]
    const ballast = Math.ceil(calculateconcretematerials(volume, 2, 1.62))
    const ballastcost = ballast*ballastprice
    const ballastdescription = `${ballasttype} ballast...${ballast}...tons...${ballastprice}...${ballastcost}`
    const materialcost = cementcost+sandcost+ballastcost
    const laborcost = getdata("laborpercent")*materialcost/100
    stripfoundationfootingconcretecost = materialcost+laborcost
    foundationslabconcretecost=stripfoundationfootingconcretecost
    var concretemix = document.getElementById("foundationslabconcretemixselect").value
    const concretedescription = `<b><u>(${concretemix}) reinforced concrete mix<br>as described in strip foundation</u></b>`
    var description = `${concretedescription}<br>${cementdescription}<br>${sanddescription}<br>${ballastdescription}<br><b>MATERIAL COST......${materialcost}<br>LABOR COST......${laborcost}<br><u>SUBTOTAL......${stripfoundationfootingconcretecost}</u></b>`
    if (stripfoundationfootingconcretecost===0||isNaN(stripfoundationfootingconcretecost)){
        return ""
    }else{
        return description
    }
}
function displayfoundationslab(){
    const cost = calculateslabfoundationcost()
    if (cost===0){
        document.getElementById("infomationlabel").innerHTML=""
    }else{
        document.getElementById("infomationlabel").innerHTML=`${calculatehardcore()}<br>${calculateblinding()}<br>${calculatepolythenesheet()}<br>${calculatebrc()}<br>${calculatelengthoffoundationslabformwork()}<br>${calculatefoundationslab()}<br>${cost}`
    }
}

document.getElementById("fillingworksselect").addEventListener("change",navigatefillings)
document.getElementById("floorslabworksselect").addEventListener("change",navigatefoundtionfloorslab)
document.getElementById("foundationslabworksselect").addEventListener("change",navigatefoundtionslab)
document.getElementById("addplinthbutton").addEventListener("click",addplinth)
document.getElementById("addhardcorespacebutton").addEventListener("click",addspaceareas)
document.getElementById("addslabbutton").addEventListener("click",addslabareas)
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", displayfoundationslab);
});