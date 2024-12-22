function getvolume(concrete) {
    let length = getdata("length",concrete);
    let width = getdata("width",concrete);
    let depth = getdata("depth",concrete);
    let number = getdata("number",concrete);
    let totalvolume = retrieve(`${concrete} volume`) || 0;
    let formworkArea=retrieve(`${concrete} formwork area`)||0;
    let volume=0
    if (length > 0 && width > 0 && depth > 0 && number > 0) {
        volume = (length * width * depth * number) / 1000000000;
        const totalLength=number*length
        if (!isNaN(volume) && volume !== 0) {
            totalvolume += volume;
            store(`${concrete} concrete volume`, totalvolume);
            let formworkWidth;
            if (concrete=="column"){
                formworkWidth=(width+depth)*2;
            }else if(concrete=="beam"){
                formworkWidth=depth*2+width;
            }else if (concrete=="slab"){
                formworkWidth=width
            }
            area=totalLength*formworkWidth/1000000;
            formworkArea+=area
            store(`${concrete} formwork area`,formworkArea)
            clear("length");
            clear("width");
            clear("depth");
            clear("number");
            focusinput("length");
        }
    }
    areaDescription=getdescription(`${concrete} form work`,formworkArea,"sm")
    volumeDescription=getdescription(`${concrete} concrete`,formworkArea,"sm")
    store(`${concrete} volume`, totalvolume);
    areaDescription=getdescription(`${concrete} form work`,formworkArea,"sm")
    volumeDescription=getdescription(`${concrete} concrete`,totalvolume,"cm")
    return `${volumeDescription}<br>${areaDescription}`
}

function getconretematerials(concrete, defaultratio) {
    let concreteCement=retrieve("concrete cement")||0
    let concreteSand=retrieve("concrete sand")||0
    let concreteBallast=retrieve("concrete ballast")||0
    let ratio = retrieve(`${concrete} ratio`) || defaultratio;
    let ratios = ratio.split(":");
    if (ratios.length !== 3) {
        throw new Error("Invalid ratio format. Expected format: '1:2:4'.");
    }

    let volume = 1.54 * retrieve(`${concrete} volume`);
    let cem = parseFloat(ratios[0]);
    let san = parseFloat(ratios[1]);
    let bal = parseFloat(ratios[2]);
    let sum = cem + san + bal;

    const cementbrand = retrieve(`${concrete} cementbrand`);
    const sandbrand = retrieve(`${concrete} sandbrand`);
    const ballastbrand = retrieve(`${concrete} ballastbrand`);

    let cement = Math.ceil((cem * volume * 28.96) / sum);
    let cementdescription = getdescription(cementbrand, cement, "50kg bag");
    let sand = Math.ceil((san * volume * 1520) / sum);
    let sanddescription = getdescription(sandbrand, sand, "kg");
    let ballast = Math.ceil((bal * volume * 1620) / sum);
    let ballastdescription = getdescription(ballastbrand, ballast, "kg");

    let concretedescription = `${cementdescription}<br>${sanddescription}<br>${ballastdescription}`;

    store(`${concrete}${sandbrand}`, sand);
    store(`${concrete}${ballastbrand}`, ballast);
    store(`${concrete}${cementbrand}`, cement);
    
    return concretedescription;
}
function addconcretecement(){
    let concreteCement;
    const beamcementbrand = retrieve(`beam cementbrand`);
    const columncementbrand = retrieve(`column cementbrand`);
    const slabcementbrand = retrieve(`slab cementbrand`);
    const beamCement=retrieve(`beam ${beamcementbrand}`)
    const columnCement=retrieve(`column ${columncementbrand}`)
    const slabCement=retrieve(`slab ${slabcementbrand}`)
    if (slabCement==columnCement==beamCement){
        concreteCement=slabCement+columnCement+beamCement
        const concreteCementDescription= getdescription(slabcementbrand,concreteCement,"50 kg bags")
        return concreteCementDescription
    }else if (slabCement==columnCement){
        concreteCement=slabCement+columnCement
        const concreteCementDescription= getdescription(slabcementbrand,concreteCement,"50 kg bags")
        const otherdescription=getdescription(beamcementbrand,beamCement,"50 kg bags")
        return concreteCementDescription}
}
function getmarineboards(structure,type,units){
    const brand=retrieve(`${structure} ${type} brand`)
    const marinBoardArea=retrieve(`${structure} ${brand} ${type}`)
    const formworkArea=retrieve(`${structure} formwork area`)
    const marineBoards=Math.ceil(formworkArea/marinBoardArea)
    const size=retrieve(`${structure} ${type} ${brand}`)
    const description=getdescription(`${size} ${brand} ${type}`,marineBoards,units)
    return description
}

function calculateconcrete(structure,type1,type2,fmk1,fmk2) {
    const resultsElement = document.getElementById("results");
    const diameter1 = retrieve(`${structure} ${type1} diameter`);
    const diameter2 = retrieve(`${structure} ${type2} diameter`);
      firstbars=retrieve(`${structure} ${type1} D${diameter1}`) || 0;
      secondbars=retrieve(`${structure} ${type2} D${diameter2}`) || 0;
      secondbarsdescription=getdescription(`D${diameter2}`,secondbars,"no")
      firstbarsdescription=getdescription(`D${diameter1}`,firstbars,"no")
    if (resultsElement) {
        resultsElement.innerHTML = `${getconretematerials(structure, "1:2:4")}<br>${getmarineboards(structure,fmk1,"meters")}<br>${getmarineboards(structure,fmk2,"no.")}<br>${secondbarsdescription}<br>${firstbarsdescription}`;
    }
}
