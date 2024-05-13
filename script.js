function submitForm() {
    // Get the selected work type
    var worksSelect = document.getElementById("works");
    var selectedWork = worksSelect.value;

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

        // Update the resultLabel with the calculated values
        if (totalArea>0){
            resultLabel.innerHTML = "Area: " + totalArea.toFixed(2) + " sqm<br>Blocks size: " + blocksSize + "<br>Number of blocks: " + numberOfBlocks.toFixed(2) + "<br>Ratio: " + ratio + "<br>Bags of cement: " + cement.toFixed(2) + "<br>Tons of sand: " + sand.toFixed(2);
        }

    } else {
        // If not, do nothing or display a message indicating that the form cannot be submitted for this work type
        var volume = parseFloat(document.getElementById("concreteVolumeInputField").value);
        var dryMorta=volume*1.54
        var ratio = document.getElementById("concreteRatioDropDownMenu").value;
        var ratioList = ratio.split(":");
        var cementComponent = parseFloat(ratioList[0]);
        var sandComponent = parseFloat(ratioList[1]);
        var ballastComponent = parseFloat(ratioList[2]);
        var sum = cementComponent + sandComponent +ballastComponent;
        var sand = sandComponent * dryMorta * 1.52 / sum;
        var ballast = ballastComponent * dryMorta * 1.62 / sum;
        var cement = cementComponent * dryMorta * 28.96 / sum;

        // Update the resultLabel with the calculated values
        if (volume>0){
            resultLabel.innerHTML = "concrete volume: " + volume.toFixed(2) + "<br>Ratio: " + ratio + "<br>Bags of cement: " + cement.toFixed(2) + "<br>Tons of sand: " + sand.toFixed(2) + "<br>Tons of ballas: " + ballast.toFixed(2);
        }

    }
}
// Function to update form elements based on the selected work type
function updateFormElements() {
    var worksSelect = document.getElementById("works");
    // Get the selected work type
    var selectedWork = worksSelect.value;

    // Update form elements based on the selected work type
    if (selectedWork === "concrete") {
        document.getElementById("concreteVolumeInputField").style.display="inline-block"
        document.getElementById("concreteRatioDropDownMenu").style.display="inline-block"
        document.getElementById("blocksDropDownMenu").style.display="none"
        document.getElementById("mortaRatioDropDownMenu").style.display="none"
        document.getElementById("wallAreaInput").style.display="none"
        document.getElementById("resultLabel").innerHTML = "";
    } else if (selectedWork==="wall"){
        document.getElementById("blocksDropDownMenu").style.display="inline-block"
        document.getElementById("mortaRatioDropDownMenu").style.display="inline-block"
        document.getElementById("wallAreaInput").style.display="inline-block"
        document.getElementById("concreteVolumeInputField").style.display="none"
        document.getElementById("concreteRatioDropDownMenu").style.display="none"
        document.getElementById("resultLabel").innerHTML = "";

    }
}

// Add event listener to the works select element
document.getElementById("works").addEventListener("change", updateFormElements);

// Call the updateFormElements function initially to set initial state
updateFormElements();
document.getElementById("wallAreaInput").addEventListener("input", submitForm);
document.getElementById("blocksDropDownMenu").addEventListener("change", submitForm);
document.getElementById("mortaRatioDropDownMenu").addEventListener("change", submitForm);
document.getElementById("concreteVolumeInputField").addEventListener("input", submitForm);
document.getElementById("concreteRatioDropDownMenu").addEventListener("change", submitForm);
