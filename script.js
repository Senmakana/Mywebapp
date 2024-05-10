function submitForm() {
  var lengthInputValue = parseFloat(document.getElementById("lengthInputField").value);
  var widthInputValue = parseFloat(document.getElementById("widthInputField").value);
  var thicknessInputValue = parseFloat(document.getElementById("thicknessInputField").value);
  var resultLabel = document.getElementById("resultLabel");
  var heightInputValue = parseFloat(document.getElementById("heightInputField").value);
  
  // Get block size and split it by "×"
  var blocksSize = document.getElementById("blocks").value;
  var blockDimensions = blocksSize.split("x");
  
  // Extract block length, height, and thickness
  var blockLength = parseFloat(blockDimensions[0]);
  var blockHeight = parseFloat(blockDimensions[1]);
  var blockThickness = parseFloat(blockDimensions[2]);

  // Calculate block area
  var blockArea = (blockLength + 20) * (blockHeight + 20) / 1000000;

  // Calculate total area and number of blocks
  var totalArea = lengthInputValue * widthInputValue / 1000000;
  var numberOfBlocks = totalArea / blockArea;
  var blockVolume = blockLength * blockHeight * blockThickness * numberOfBlocks / 1000000000;
  var wallVolume = totalArea * blockThickness / 1000;
  var mortaVolume = wallVolume - blockVolume;
  var dryMorta = mortaVolume * 1.3;
  var ratio = document.getElementById("ratio").value;
  var ratioList = ratio.split(":");
  
  // Extract block length, height, and thickness
  var cementComponent = parseFloat(ratioList[0]);
  var sandComponent = parseFloat(ratioList[1]);
  var sum = cementComponent + sandComponent;
  var sand = sandComponent * dryMorta * 1.52 / sum;
  var cement = cementComponent * dryMorta * 28.96 / sum;

  resultLabel.innerHTML = "Area: " + totalArea.toFixed(2) + " sqm<br>Blocks size: " + blocksSize + "<br>Number of blocks: " + numberOfBlocks.toFixed(2) + "<br>Ratio: " + ratio + "<br>Bags of cement: " + cement.toFixed(2) + "<br>Tons of sand: " + sand.toFixed(2);
}
