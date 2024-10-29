function submitForm() {
    function getNumericValue(elementId, defaultValue = 0) {
        var value = parseFloat(document.getElementById(elementId).value);
        return isNaN(value) ? defaultValue : value;
    }
    // default material cost
    var defaultCementCost=700
    var defaultSandCost=1000
    var defaultBallastCost=2000
    var default400x200x200Cost=80
    var default360x180x180Cost=65
    var default300x150x150Cost=25
    var defaultR6Cost=400
    var defaultD8Cost=900
    var defaultD10Cost=1150
    var defaultD12Cost=1500
    var defaultD16Cost=2800
    var defaultD20Cost=450
    defaultbindingWireCost=150
    // Get the selected work type
    var worksSelect = document.getElementById("works");
    var selectedWork = worksSelect.value;
    var cement=0;
    var sand=0;
    var ballast=0;
    var cementRate=getNumericValue("cementprice",defaultCementCost);
    var sandRate=getNumericValue("sandPrice",defaultSandCost);
    var ballastRate=getNumericValue("ballastPrice",defaultBallastCost);
    var blockCost=0
    var wallingCost=0
    var cementCost=0;
    var sandCost=0;
    var ballastCost=0;
    var concreteCost=0;
    var rate=0
    var mainsprice=0
    var mainsCost=0
    var linksCost=0
    var rebarCost=0
    var linksprice=0
    var steelfactor=22*12*7850/28000000
    var priceOfBinding=getNumericValue("bindingPrice",defaultbindingWireCost)
    // Check if the selected work type is "wall"
    if (selectedWork === "wall") {
        // If yes, execute the form submission logic
        
        // Get the total area input value
        var totalArea = parseFloat(document.getElementById("wallAreaInput").value);
        
        // Calculate the result only for "wall" work type
        var blocksSize = document.getElementById("blocksDropDownMenu").value;
        var blockDimensions = blocksSize.split("x");
        var blockLength = parseFloat(blockDimensions[0]);
        var blockHeight = parseFloat(blockDimensions[1]);
        var blockThickness = parseFloat(blockDimensions[2]);
        var blockArea = (blockLength + 20) * (blockHeight + 20) / 1000000;
        var numberOfBlocks = totalArea / blockArea;
        var blockVolume = blockLength * blockHeight * blockThickness * numberOfBlocks / 1000000000;
        var wallVolume = totalArea * blockThickness / 1000;
        var mortaVolume = wallVolume - blockVolume;
        var dryMorta = mortaVolume * 1.3;
        var ratio = document.getElementById("mortaRatioDropDownMenu").value;
        var ratioList = ratio.split(":");
        var cementComponent = parseFloat(ratioList[0]);
        var sandComponent = parseFloat(ratioList[1]);
        var sum = cementComponent + sandComponent;
        var sand = sandComponent * dryMorta * 1.52 / sum;
        var cement = cementComponent * dryMorta * 28.96 / sum;
        cementCost=cementRate*cement
        sandCost=sand*sandRate
        if (blocksSize==="400x200x200"){
            blockRate=getNumericValue("400x200x200BlockPrice",default400x200x200Cost)
        } else if (blocksSize==="360x180x180"){
            blockRate=getNumericValue("360x180x180BlockPrice",default360x180x180Cost)
        } else if (blocksSize==="300x150x150"){
            blockRate=getNumericValue("300x150x150BlockPrice",default300x150x150Cost)
        }
        blockCost=blockRate*numberOfBlocks
        wallingCost=cementCost+sandCost+blockCost
        rate=wallingCost/totalArea
        // Update the resultLabel with the calculated values
        if (totalArea > 0) {
            document.getElementById("resultLabel").innerHTML = totalArea.toFixed(2) +"sqm of wall of "+ blocksSize + " blocks  in "+ ratio+" cement sand morta"+"<br>blocks..."+numberOfBlocks.toFixed(0) + "...no..." + blockRate + "..." + blockCost.toFixed(0) + "<br>cement..." + cement.toFixed(0) + "...bags..." + cementRate + "..." + cementCost.toFixed(0) + "<br>sand..." + sand.toFixed(0) + "...tons..." + sandRate + "..." + sandCost.toFixed(0)+"<br>total.............."+wallingCost.toFixed(0)+"<br>rate............."+rate.toFixed(0)+"per sqm";
        }
    }
    if (token==="pro"){
        if (selectedWork === "plastering") {
        var area = parseFloat(document.getElementById("plasterAreaInputField").value);
        var thickness = parseFloat(document.getElementById("plasterThicknessRatio").value);
        var ratio = document.getElementById("plasterRatioDropDownMenu").value;
        var volume = area * thickness / 1000;
        var dryVolume = 1.3 * volume;
        var ratioList = ratio.split(":");
        var cementComponent = parseFloat(ratioList[0]);
        var sandComponent = parseFloat(ratioList[1]);
        var sum = cementComponent + sandComponent;
        var sand = sandComponent * dryVolume * 1.52 / sum;
        var cement = cementComponent * dryVolume * 28.96 / sum;
        cementCost=cement*cementRate;
        sandCost=sand*sandRate;
        plasterCost=sandCost+cementCost
        rate=plasterCost/area
        if (volume > 0) {
            document.getElementById("resultLabel").innerHTML = area.toFixed(0)+"sqm of "+thickness+"mm thick ("+ratio+") cement sand plaster "+ "<br>cement:..." + cement.toFixed(2) + "...bags..."+ cementRate + "..." + cementCost.toFixed(0) + "<br>sand:..." + sand.toFixed(2) + "...tons...." + sandRate + "..." + sandCost.toFixed(0)+"<br>plaster cost............."+plasterCost.toFixed(0)+"<br>rate............."+rate.toFixed(0)+"per sqm";
        }
    }else if (selectedWork === "rebar") {
        var length = parseFloat(document.getElementById("structureLength").value);
        var width = parseFloat(document.getElementById("structureWidth").value);
        var depth = parseFloat(document.getElementById("structureDepth").value);
        var number = parseFloat(document.getElementById("structureNo").value);
        var cover=parseFloat(document.getElementById("cover").value);
        var linksLength=2*(width+depth-4*(cover));
        var spacing=parseFloat(document.getElementById("linksSpacing").value);
        var numberOfLinks=number*length/spacing
        var numberOfLinksBars=linksLength*numberOfLinks/12000
        var numbeOfMainsInStructure=parseFloat(document.getElementById("mainsNo").value);
        var mainBarNumber=numbeOfMainsInStructure*number*length/12000;
        var mainsBars=parseFloat(document.getElementById("mainReinforcementBars").value);
        var linksBars=parseFloat(document.getElementById("linksReinforcementBars").value);
        if (linksBars===6){
            linksprice=getNumericValue("r6price",defaultR6Cost);
        }else if (linksBars===8){
            linksprice=getNumericValue("D8price",defaultD8Cost);
        }else if (linksBars===10){
            linksprice=getNumericValue("D10price",defaultD10Cost);
        }else if (linksBars===12){
            linksprice=getNumericValue("D12price",defaultD12Cost);
        }else if (linksBars===16){
            linksprice=getNumericValue("D16price",defaultD16Cost);
        }else if (linksBars===20){
            linksprice=getNumericValue("D20price",defaultD20Cost);
        }
        if (mainsBars===6){
            mainsprice=getNumericValue("r6price",defaultR6Cost);
        }else if (mainsBars===8){
            mainsprice=getNumericValue("D8price",defaultD8Cost);
        }else if (mainsBars===10){
            mainsprice=getNumericValue("D10price",defaultD10Cost);
        }else if (mainsBars===12){
            mainsprice=getNumericValue("D12price",defaultD12Cost);
        }else if (mainsBars===16){
            mainsprice=getNumericValue("D16price",defaultD16Cost);
        }else if (mainsBars===20){
            mainsprice=getNumericValue("D20price",defaultD20Cost);
        }
        mainsCost=mainsprice*mainBarNumber
        linksCost=numberOfLinksBars*linksprice
        var structuretype=document.getElementById("rebarDropDownMenu").value
        var mainsweight=mainBarNumber*(mainsBars**2)*steelfactor
        var linksweight=numberOfLinksBars*(linksBars**2)*steelfactor
        var weight=linksweight+mainsweight
        var bindingWire=0.013*weight
        var bindingWireCost=priceOfBinding*bindingWire
        rebarCost=mainsCost+linksCost+bindingWireCost
        if (numberOfLinksBars>0){
            if (linksBars===mainsBars){
                var numberofbars=mainBarNumber+numberOfLinksBars;
                var costOfSimilarBars=linksCost+mainsCost
                document.getElementById("resultLabel").innerHTML =number + "no." + structuretype + length + "mm x" + width + "mm x" + depth + "mm" + "<br>D"+mainsBars + "..." + numberofbars.toFixed(0)+"...no..."+mainsprice+"..."+costOfSimilarBars.toFixed(0)+"<br>Binding wire..."+bindingWire.toFixed(0)+"...kg..."+priceOfBinding+"..."+bindingWireCost.toFixed(0)+"<br>rebar cost.............."+rebarCost.toFixed(0);
            }else {
                document.getElementById("resultLabel").innerHTML =number + "no." + structuretype + length + "mmx" + width + "mmx" + depth + "mm" + "<br>D"+mainsBars + "..." + mainBarNumber.toFixed(0)+"...no..."+mainsprice+"..."+mainsCost.toFixed(0) + "<br>D " +linksBars + "..." + numberOfLinksBars.toFixed(0)+"...no..."+linksprice+"..."+linksCost.toFixed(0)+"<br>Binding wire..."+bindingWire.toFixed(0)+"...kg..."+priceOfBinding+"..."+bindingWireCost.toFixed(0)+"<br>rebar cost.............."+rebarCost.toFixed(0);}
        }
    }else if (selectedWork === "concrete") {
        var volume = parseFloat(document.getElementById("concreteVolumeInputField").value);
        var dryMorta = volume * 1.54;
        var ratio = document.getElementById("concreteRatioDropDownMenu").value;
        var ratioList = ratio.split(":");
        var cementComponent = parseFloat(ratioList[0]);
        var sandComponent = parseFloat(ratioList[1]);
        var ballastComponent = parseFloat(ratioList[2]);
        var sum = cementComponent + sandComponent + ballastComponent;
        sand = sandComponent * dryMorta * 1.52 / sum;
        ballast = ballastComponent * dryMorta * 1.62 / sum;
        cement = cementComponent * dryMorta * 28.96 / sum;
        cementCost=cementRate*cement;
        sandCost=sand*sandRate;
        ballastCost=ballastRate*ballast;
        concreteCost=cementCost+sandCost+ballastCost
        rate=concreteCost/volume
        if (volume > 0) {
            document.getElementById("resultLabel").innerHTML =  volume.toFixed(2) + "cm of (" + ratio +") concrete mix"+ "<br>cement..." + cement.toFixed(0) + "...bags..." + cementRate + "..." + cementCost.toFixed(0) + "<br>sand..." + sand.toFixed(2) + "...ton..." + sandRate + "..." + sandCost.toFixed(0) + "<br>ballast..." + ballast.toFixed(2) + "...tons..." + ballastRate + "..." + ballastCost.toFixed(0) + "<br> concrete cost....................." + concreteCost.toFixed(0) + "<br> rate ............." + rate.toFixed(0)+"per cm";
        }
    }
        
    }else{
        document.getElementById("tokensbutton").innerHTML = `<b>
        get key at ksh.300 per month to proceed<br>
        Go to MPESA<br>
        Lipa na MPESA<br>
        Pay Bill<br>
        Pay Bill No: 222111<br>
        Account No: 2243426</br>
        or have key, press to enter key</b>`;
    }
}

// Function to update form elements based on the selected work type
function updateFormElements() {
    var worksSelect = document.getElementById("works");
    // Get the selected work type
    var selectedWork = worksSelect.value;
    // Update form elements based on the selected work type
    if (selectedWork === "concrete") {
        document.getElementById("structureLength").style.display="none"
        document.getElementById("structureWidth").style.display="none"
        document.getElementById("structureDepth").style.display="none"
        document.getElementById("linksSpacing").style.display="none"
        document.getElementById("mainsNo").style.display="none"
        document.getElementById("structureNo").style.display="none"
        document.getElementById("mainReinforcementBars").style.display="none"
        document.getElementById("linksReinforcementBars").style.display="none"
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("concreteVolumeInputField").style.display="inline-block"
        document.getElementById("concreteRatioDropDownMenu").style.display="inline-block"
        document.getElementById("blocksDropDownMenu").style.display="none"
        document.getElementById("mortaRatioDropDownMenu").style.display="none"
        document.getElementById("wallAreaInput").style.display="none"
        document.getElementById("plasterThicknessRatio").style.display="none"
        document.getElementById("plasterAreaInputField").style.display="none"
        document.getElementById("plasterRatioDropDownMenu").style.display="none"
        document.getElementById("resultLabel").innerHTML = "";
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("cover").style.display="none"
        document.getElementById("400x200x200BlockPrice").style.display="none"
        document.getElementById("360x180x180BlockPrice").style.display="none"
        document.getElementById("300x150x150BlockPrice").style.display="none"
        document.getElementById("cementprice").style.display="none"
        document.getElementById("sandPrice").style.display="none"
        document.getElementById("ballastPrice").style.display="none"
        document.getElementById("bindingPrice").style.display="none"
        document.getElementById("r6price").style.display="none"
        document.getElementById("D8price").style.display="none"
        document.getElementById("D10price").style.display="none"
        document.getElementById("D12price").style.display="none"
        document.getElementById("D16price").style.display="none"
        document.getElementById("D20price").style.display="none"
    }else if (selectedWork==="plastering"){
        document.getElementById("cover").style.display="none"
        document.getElementById("structureLength").style.display="none"
        document.getElementById("structureWidth").style.display="none"
        document.getElementById("structureDepth").style.display="none"
        document.getElementById("linksSpacing").style.display="none"
        document.getElementById("mainsNo").style.display="none"
        document.getElementById("structureNo").style.display="none"
        document.getElementById("mainReinforcementBars").style.display="none"
        document.getElementById("linksReinforcementBars").style.display="none"
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("blocksDropDownMenu").style.display="none"
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("mortaRatioDropDownMenu").style.display="none"
        document.getElementById("wallAreaInput").style.display="none"
        document.getElementById("concreteVolumeInputField").style.display="none"
        document.getElementById("concreteRatioDropDownMenu").style.display="none"
        document.getElementById("plasterThicknessRatio").style.display="inline-block"
        document.getElementById("plasterAreaInputField").style.display="inline-block"
        document.getElementById("plasterRatioDropDownMenu").style.display="inline-block"
        document.getElementById("resultLabel").innerHTML = "";
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("400x200x200BlockPrice").style.display="none"
        document.getElementById("360x180x180BlockPrice").style.display="none"
        document.getElementById("300x150x150BlockPrice").style.display="none"
        document.getElementById("cementprice").style.display="none"
        document.getElementById("sandPrice").style.display="none"
        document.getElementById("ballastPrice").style.display="none"
        document.getElementById("bindingPrice").style.display="none"
        document.getElementById("r6price").style.display="none"
        document.getElementById("D8price").style.display="none"
        document.getElementById("D10price").style.display="none"
        document.getElementById("D12price").style.display="none"
        document.getElementById("D16price").style.display="none"
        document.getElementById("D20price").style.display="none"
    }else if (selectedWork==="rebar"){
        structure=document.getElementById("rebarDropDownMenu").value
        document.getElementById("structureLength").style.display="inline-block"
        document.getElementById("cover").style.display="inline-block"
        document.getElementById("structureWidth").style.display="inline-block"
        document.getElementById("structureDepth").style.display="inline-block"
        document.getElementById("structureNo").style.display="inline-block"
        document.getElementById("linksSpacing").style.display="inline-block"
        document.getElementById("mainsNo").style.display="inline-block"
        document.getElementById("mainReinforcementBars").style.display="inline-block"
        document.getElementById("linksReinforcementBars").style.display="inline-block"
        document.getElementById("rebarDropDownMenu").style.display="inline-block"
        document.getElementById("blocksDropDownMenu").style.display="none"
        document.getElementById("mortaRatioDropDownMenu").style.display="none"
        document.getElementById("wallAreaInput").style.display="none"
        document.getElementById("concreteVolumeInputField").style.display="none"
        document.getElementById("concreteRatioDropDownMenu").style.display="none"
        document.getElementById("plasterThicknessRatio").style.display="none"
        document.getElementById("plasterAreaInputField").style.display="none"
        document.getElementById("plasterRatioDropDownMenu").style.display="none"
        document.getElementById("resultLabel").innerHTML = "";
        document.getElementById("400x200x200BlockPrice").style.display="none"
        document.getElementById("360x180x180BlockPrice").style.display="none"
        document.getElementById("300x150x150BlockPrice").style.display="none"
        document.getElementById("cementprice").style.display="none"
        document.getElementById("sandPrice").style.display="none"
        document.getElementById("ballastPrice").style.display="none"
        document.getElementById("bindingPrice").style.display="none"
        document.getElementById("r6price").style.display="none"
        document.getElementById("D8price").style.display="none"
        document.getElementById("D10price").style.display="none"
        document.getElementById("D12price").style.display="none"
        document.getElementById("D16price").style.display="none"
        document.getElementById("D20price").style.display="none"
    }else if (selectedWork==="materials"){
        document.getElementById("structureLength").style.display="none"
        document.getElementById("structureWidth").style.display="none"
        document.getElementById("structureDepth").style.display="none"
        document.getElementById("linksSpacing").style.display="none"
        document.getElementById("mainsNo").style.display="none"
        document.getElementById("structureNo").style.display="none"
        document.getElementById("mainReinforcementBars").style.display="none"
        document.getElementById("linksReinforcementBars").style.display="none"
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("concreteVolumeInputField").style.display="none"
        document.getElementById("concreteRatioDropDownMenu").style.display="none"
        document.getElementById("blocksDropDownMenu").style.display="none"
        document.getElementById("mortaRatioDropDownMenu").style.display="none"
        document.getElementById("wallAreaInput").style.display="none"
        document.getElementById("plasterThicknessRatio").style.display="none"
        document.getElementById("plasterAreaInputField").style.display="none"
        document.getElementById("plasterRatioDropDownMenu").style.display="none"
        document.getElementById("resultLabel").innerHTML = "";
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("cover").style.display="none"
        document.getElementById("400x200x200BlockPrice").style.display="inline-block"
        document.getElementById("360x180x180BlockPrice").style.display="inline-block"
        document.getElementById("300x150x150BlockPrice").style.display="inline-block"
        document.getElementById("cementprice").style.display="inline-block"
        document.getElementById("sandPrice").style.display="inline-block"
        document.getElementById("ballastPrice").style.display="inline-block"
        document.getElementById("bindingPrice").style.display="inline-block"
        document.getElementById("r6price").style.display="inline-block"
        document.getElementById("D8price").style.display="inline-block"
        document.getElementById("D10price").style.display="inline-block"
        document.getElementById("D12price").style.display="inline-block"
        document.getElementById("D16price").style.display="inline-block"
        document.getElementById("D20price").style.display="inline-block"
    }else if (selectedWork==="wall"){
        document.getElementById("cover").style.display="none"
        document.getElementById("structureLength").style.display="none"
        document.getElementById("structureWidth").style.display="none"
        document.getElementById("structureDepth").style.display="none"
        document.getElementById("linksSpacing").style.display="none"
        document.getElementById("mainsNo").style.display="none"
        document.getElementById("structureNo").style.display="none"
        document.getElementById("mainReinforcementBars").style.display="none"
        document.getElementById("linksReinforcementBars").style.display="none"
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("blocksDropDownMenu").style.display="inline-block"
        document.getElementById("mortaRatioDropDownMenu").style.display="inline-block"
        document.getElementById("wallAreaInput").style.display="inline-block"
        document.getElementById("concreteVolumeInputField").style.display="none"
        document.getElementById("concreteRatioDropDownMenu").style.display="none"
        document.getElementById("plasterThicknessRatio").style.display="none"
        document.getElementById("plasterAreaInputField").style.display="none"
        document.getElementById("plasterRatioDropDownMenu").style.display="none"
        document.getElementById("resultLabel").innerHTML = "";
        document.getElementById("rebarDropDownMenu").style.display="none"
        document.getElementById("400x200x200BlockPrice").style.display="none"
        document.getElementById("360x180x180BlockPrice").style.display="none"
        document.getElementById("300x150x150BlockPrice").style.display="none"
        document.getElementById("cementprice").style.display="none"
        document.getElementById("sandPrice").style.display="none"
        document.getElementById("ballastPrice").style.display="none"
        document.getElementById("bindingPrice").style.display="none"
        document.getElementById("r6price").style.display="none"
        document.getElementById("D8price").style.display="none"
        document.getElementById("D10price").style.display="none"
        document.getElementById("D12price").style.display="none"
        document.getElementById("D16price").style.display="none"
        document.getElementById("D20price").style.display="none"
    }
}
function toggleVisibility() {
    document.getElementById("inputTokens").style.display="block";
    document.getElementById("stokens").style.display="block";
    }
function untoggleVisibility() {
    document.getElementById("inputTokens").style.display="none";
    document.getElementById("stokens").style.display="none";
    }
let token = "basic"; // Starting token count

function createLabel() {
    // Check if the token value is "pro"
    if (token === "pro") {
        // Update the token value in the label
        document.getElementById("tokensbutton").innerHTML = `${token}`;

        // Create a new label element
        const label = document.createElement("label");

        // Get the content of an existing element with the ID "resultLabel" and use innerHTML to preserve formatting
        const contents = document.getElementById("resultLabel").innerHTML;
        label.innerHTML = contents;

        // Append the label to the body (or you can specify another container)
        document.body.appendChild(label);
    } else {
        document.getElementById("tokensbutton").innerHTML = `<b>
        get key at ksh.300 per month to proceed<br>
        Go to MPESA<br>
        Lipa na MPESA<br>
        Pay Bill<br>
        Pay Bill No: 222111<br>
        Account No: 2243426</br>
        or have key, press to enter key</b>`;
    }
}
function removeLastLabel() {
    // Get all label elements on the page
    const labels = document.getElementsByTagName("label");
    
    // Check if there's at least one label on the page
    if (labels.length > 0) {
        // Remove the last label in the list
        labels[labels.length - 1].remove();
    }
}
async function loadTokens() {
    const inputTokens = document.getElementById("inputTokens").value;
    try {
        // Fetch the tokens.json file from GitHub
        const response = await fetch('https://raw.githubusercontent.com/Senmakana/Tokens/main/tokens.json');
        if (!response.ok) throw new Error("Failed to fetch tokens.json from GitHub.");

        const data = await response.json();

        // Retrieve the token expiry date using the inputTokens value as the key
        const tokenExpiryDateStr = data[inputTokens]; // Assume this returns a date string

        // Check if the key exists in the JSON
        if (tokenExpiryDateStr) {
            const tokenExpiryDate = new Date(tokenExpiryDateStr); // Convert to Date object
            const now = new Date();

            // Check if the expiry date has lapsed
            if (now > tokenExpiryDate) {
                token = "basic"; // Token has expired
            } else {
                token = "pro"; // Token is valid
            }

            // Update the tokens button with the status
            document.getElementById("tokensbutton").innerHTML = `${token}`;

            // Call createLabel to create the label based on the updated token
            createLabel();
        } else {
            alert("Token key not found in data.");
        }
    } catch (error) {
        console.error("Error fetching token data:", error);
        alert("Failed to load tokens.");
    }
    untoggleVisibility();
}

// Event listeners
document.getElementById("stokens").addEventListener("click", loadTokens);
document.getElementById("tokensbutton").addEventListener("click", toggleVisibility);
document.getElementById("works").addEventListener("change", updateFormElements);


// Call the updateFormElements function initially to set initial state
updateFormElements();
document.getElementById("wallAreaInput").addEventListener("input", submitForm);
document.getElementById("blocksDropDownMenu").addEventListener("change", submitForm);
document.getElementById("mortaRatioDropDownMenu").addEventListener("change", submitForm);
document.getElementById("concreteVolumeInputField").addEventListener("input", submitForm);
document.getElementById("concreteRatioDropDownMenu").addEventListener("change", submitForm);
document.getElementById("plasterThicknessRatio").addEventListener("input", submitForm);
document.getElementById("plasterAreaInputField").addEventListener("input", submitForm);
document.getElementById("plasterRatioDropDownMenu").addEventListener("change", submitForm);
document.getElementById("structureWidth").addEventListener("change", submitForm);
document.getElementById("structureLength").addEventListener("change", submitForm);
document.getElementById("structureDepth").addEventListener("change", submitForm);
document.getElementById("structureNo").addEventListener("change", submitForm);
document.getElementById("linksSpacing").addEventListener("change", submitForm);
document.getElementById("mainsNo").addEventListener("change", submitForm);
document.getElementById("mainReinforcementBars").addEventListener("change", submitForm);
document.getElementById("linksReinforcementBars").addEventListener("change", submitForm);
document.getElementById("cover").addEventListener("change", submitForm);
document.getElementById("works").addEventListener("change", submitForm);
document.getElementById("printPrint").addEventListener("click", createLabel);

document.getElementById("deletebutton").addEventListener("click", removeLastLabel);