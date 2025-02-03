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
    },
    "fencing":{
        "barbed wire":{
            "length":515000,
            "cost":7000
        },
        "fencing posts":{
            "wooden posts":{
                "length":1800,
                "cost":550
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
let length=0
function getdata(widget) {
    const data = parseFloat(document.getElementById(widget)?.value);
    return isNaN(data) ? 0 : data;
}
function addlength(){
    length+=getdata("lengthofbarbedwirefenceinput")
    document.getElementById("totallengthlabel").innerHTML=`${length}`
    document.getElementById("lengthofbarbedwirefenceinput").value=""
}
function calculatenumberofbarbedwirerounds(){
    number= Math.ceil(materialprice["fencing"]["fencing posts"][document.getElementById("fencingpostselect").value]["length"]/getdata("spacebetweenbarbedwire"))
        console.log(number)
    return number
}
function calculatelengthofbarbedwire(){
    var len= length*calculatenumberofbarbedwirerounds()
    return len
}
function calculatenumberofbarbedwirerolls(){
    var number= Math.ceil(calculatelengthofbarbedwire()/materialprice["fencing"][document.getElementById("fencingmaterialselect").value]["length"])
    return number
}
function calculatecostofbarbedwire(){
    return calculatenumberofbarbedwirerolls()*materialprice["fencing"][document.getElementById("fencingmaterialselect").value]["cost"]
}
function calculatenumberoffencingpost(){
    return Math.ceil(length/getdata("spacebetweenposts"))
}
function calculatecostoffencingposts(){
    return calculatenumberoffencingpost()  *materialprice["fencing"]["fencing posts"][document.getElementById("fencingpostselect").value]["cost"]
}
function calculatefencingmaterialcost(){
    const cost1 = calculatecostoffencingposts()
    const cost2 = calculatecostofbarbedwire()
    if(cost1===Infinity || isNaN(cost1)){
        cost1=0
    }
    if(cost2===Infinity || isNaN(cost2)){
        cost2=0
    }
    return cost1+cost2
}
function describefen(){
    return `<b><u>${length/1000}m fence with ${materialprice["fencing"]["fencing posts"][document.getElementById("fencingpostselect").value]["length"]}m high ${document.getElementById("fencingpostselect").value} at ${getdata("spacebetweenposts")}mm<br> intervals and ${document.getElementById("fencingmaterialselect").value} at ${getdata("spacebetweenbarbedwire")}mm intervals</u></b>`
}
function calculatefencinglaborcost(){
    return calculatefencingmaterialcost()*getdata("fencinglaborpercentinput")/100
}
function calculatefencingcost(){
    return calculatefencinglaborcost()+calculatefencingmaterialcost()
}
function describefencing(){
    const cost = calculatecostofbarbedwire()
    if(cost ===0 || cost===Infinity || isNaN(cost)){
        return ""
    }else{
        return`${document.getElementById("fencingmaterialselect").value}...${calculatenumberofbarbedwirerolls()}...rolls...${materialprice["fencing"][document.getElementById("fencingmaterialselect").value]["cost"]}...${calculatecostofbarbedwire()}`}
}
function describefencingposts(){
    const cost = calculatecostoffencingposts()
    if(cost ===0 || cost===Infinity || isNaN(cost)){
        return ""
    }else{
        return `${document.getElementById("fencingpostselect").value} ${calculatenumberoffencingpost()}...pieces...${materialprice["fencing"]["fencing posts"][document.getElementById("fencingpostselect").value]["cost"]}...${calculatecostoffencingposts()}`
    }
}
function show(){
    document.getElementById("infomationlabel").innerHTML=`${describefen()}<br>${describefencing()}<br>${describefencingposts()}<b><br>MATERIALS COST........${calculatefencingmaterialcost()}<br>LABOR COST.....${calculatefencinglaborcost()}<br><u>SUB TOTAL....${calculatefencingcost()}</u></b>`
}
document.getElementById("addfencelengthbutton").addEventListener("click",addlength)
document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("change", show);
});