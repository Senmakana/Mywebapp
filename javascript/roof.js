const rooflength=retrieve("roof length")
const eavelength=retrieve("roof eave")
const rafter=retrieve("slant height")
const length=rooflength+eavelength;
// Refactored data structure
const effectiveAreas = {
    "2 meter": 1.44,
    "2.5 meter": 1.84,
    "3 meter": 2.24
            };
// Dropdowns for gauge and length
function calculatemabati() {
    const selectedGauge = retrieve("mabati gauge")
    const selectedLength = retrieve("mabati length")
    if (effectiveAreas[selectedLength]) {
        const effectiveArea = effectiveAreas[selectedLength];
        // Simulated roof area retrieval
        const roofarea = retrieve("roof area"); // Default to 50m²
        const numberOfRoofingSheet = Math.ceil(roofarea / effectiveArea);
        const description = getdescription(`${selectedGauge} ${selectedLength} mabati`,numberOfRoofingSheet,"no.")
        return description;
        }
    }
function calculate(structure){
    const timber=retrieve(`${structure} timber`)
    const size=retrieve(`${structure} size`)
    const space=retrieve(`${structure} spacing`)
    const number=retrieve("roof number")
    const timberLength=Math.ceil(number*length*rafter/space/1000)
    store (`${timber} ${structure}`,timberLength)
    const description = getdescription(`${size} ${timber} ${structure}`,timberLength,"m")
    return description
        }
function calculateRoof(){
    rafters=calculate("rafter")
    purlins=calculate("purlin")
    mabati=calculatemabati()
    document.getElementById("results").innerHTML=`${rafters}<br>${purlins}<br>${mabati}`
}
function calculateTotalRoof(){
    const length=getdata("length","roof")
    const width=getdata("width","roof")
    const pitch=retrieve("roof pitch")
    const eaveLength=retrieve("roof eave")
    const number=getdata("number","roof")
    let roofArea=retrieve("roof area")||0
    const pitchRadians = pitch * (Math.PI / 180);
    const totalWidth=width+eaveLength
    const totalLength=length+eaveLength
    const slantHeight = totalWidth / Math.cos(pitchRadians);
    const area = number * slantHeight * totalLength/1000000;
    if (area!=0){
        roofArea+=Math.ceil(area);
        clear("length")
        clear("width")
        clear("number")
        store("roof area",roofArea)
        focusinput("length")
        document.getElementById("results").innerHTML=`${roofArea}sm`}
    store("slant height",slantHeight)
}