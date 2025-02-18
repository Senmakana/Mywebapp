// Corrected additional.js with default values
function calculateQuantities() {
    var cement = Math.ceil((parseFloat(localStorage.getItem("wall/plaster/cement")) || 0) +
                 (parseFloat(localStorage.getItem("floor/plaster/cement")) || 0) +
                 (parseFloat(localStorage.getItem("ceiling/plaster/cement")) || 0) +
                 (parseFloat(localStorage.getItem("column/concrete/cement")) || 0) +
                 (parseFloat(localStorage.getItem("beam/concrete/cement")) || 0) +
                 (parseFloat(localStorage.getItem("slab/concrete/cement")) || 0) +
                 (parseFloat(localStorage.getItem("substructural/wall/cement")) || 0) +
                 (parseFloat(localStorage.getItem("superstructural/wall/cement")) || 0));
    localStorage.setItem("quantities/cementquantity", cement);

    var sand = Math.ceil((parseFloat(localStorage.getItem("wall/plaster/sand")) || 0) +
               (parseFloat(localStorage.getItem("floor/plaster/sand")) || 0) +
               (parseFloat(localStorage.getItem("ceiling/plaster/sand")) || 0) +
               (parseFloat(localStorage.getItem("column/concrete/sand")) || 0) +
               (parseFloat(localStorage.getItem("beam/concrete/sand")) || 0) +
               (parseFloat(localStorage.getItem("slab/concrete/sand")) || 0) +
               (parseFloat(localStorage.getItem("substructural/wall/sand")) || 0) +
               (parseFloat(localStorage.getItem("superstructural/wall/sand")) || 0));
    localStorage.setItem("quantities/sandquantity", sand);

    var ballast =Math.ceil( (parseFloat(localStorage.getItem("column/concrete/ballast")) || 0) +
                  (parseFloat(localStorage.getItem("beam/concrete/ballast")) || 0) +
                  (parseFloat(localStorage.getItem("slab/concrete/ballast")) || 0));
    localStorage.setItem("quantities/ballastquantity", ballast);

    var D8 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D8")) || 0) +
             (parseFloat(localStorage.getItem("beam/mains/D8")) || 0) +
             (parseFloat(localStorage.getItem("column/links/D8")) || 0) +
             (parseFloat(localStorage.getItem("column/mains/D8")) || 0) +
             (parseFloat(localStorage.getItem("slab/links/D8")) || 0) +
             (parseFloat(localStorage.getItem("slab/mains/D8")) || 0));
    localStorage.setItem("quantities/D8quantity", D8);

    var D10 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D10")) || 0) +
              (parseFloat(localStorage.getItem("beam/mains/D10")) || 0) +
              (parseFloat(localStorage.getItem("column/links/D10")) || 0) +
              (parseFloat(localStorage.getItem("column/mains/D10")) || 0) +
              (parseFloat(localStorage.getItem("slab/links/D10")) || 0) +
              (parseFloat(localStorage.getItem("slab/mains/D10")) || 0));
    localStorage.setItem("quantities/D10quantity", D10);

    var D12 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D12")) || 0) +
              (parseFloat(localStorage.getItem("beam/mains/D12")) || 0) +
              (parseFloat(localStorage.getItem("column/links/D12")) || 0) +
              (parseFloat(localStorage.getItem("column/mains/D12")) || 0) +
              (parseFloat(localStorage.getItem("slab/links/D12")) || 0) +
              (parseFloat(localStorage.getItem("slab/mains/D12")) || 0));
    localStorage.setItem("quantities/D12quantity", D12);

    var D16 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D16")) || 0) +
              (parseFloat(localStorage.getItem("beam/mains/D16")) || 0) +
              (parseFloat(localStorage.getItem("column/links/D16")) || 0) +
              (parseFloat(localStorage.getItem("column/mains/D16")) || 0) +
              (parseFloat(localStorage.getItem("slab/links/D16")) || 0) +
              (parseFloat(localStorage.getItem("slab/mains/D16")) || 0));
    localStorage.setItem("quantities/D16quantity", D16);

    var D20 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D20")) || 0) +
              (parseFloat(localStorage.getItem("beam/mains/D20")) || 0) +
              (parseFloat(localStorage.getItem("column/links/D20")) || 0) +
              (parseFloat(localStorage.getItem("column/mains/D20")) || 0) +
              (parseFloat(localStorage.getItem("slab/links/D20")) || 0) +
              (parseFloat(localStorage.getItem("slab/mains/D20")) || 0));
    localStorage.setItem("quantities/D20quantity", D20);

    var D25 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D25")) || 0) +
              (parseFloat(localStorage.getItem("beam/mains/D25")) || 0) +
              (parseFloat(localStorage.getItem("column/links/D25")) || 0) +
              (parseFloat(localStorage.getItem("column/mains/D25")) || 0) +
              (parseFloat(localStorage.getItem("slab/links/D25")) || 0) +
              (parseFloat(localStorage.getItem("slab/mains/D25")) || 0));
    localStorage.setItem("quantities/D25quantity", D25);

    var D32 = Math.ceil((parseFloat(localStorage.getItem("beam/links/D32")) || 0) +
              (parseFloat(localStorage.getItem("beam/mains/D32")) || 0) +
              (parseFloat(localStorage.getItem("column/links/D32")) || 0) +
              (parseFloat(localStorage.getItem("column/mains/D32")) || 0) +
              (parseFloat(localStorage.getItem("slab/links/D32")) || 0) +
              (parseFloat(localStorage.getItem("slab/mains/D32")) || 0));
    localStorage.setItem("quantities/D32quantity", D32);

    // Trigger table population after quantities are calculated
    if (window.populateSummaryTable) {
        window.populateSummaryTable();
    }
}

// Run the calculation on page load
calculateQuantities();