const wallArea=retrieve("wallarea")
const joints=20;
function calculateBlocks(){
    const block=retrieve("building blocks")||"360x180x180";
    const sizes=block.split("x");
    const length=parseFloat(sizes[0]);
    const height=parseFloat(sizes[2]);
    const thickness=parseInt(sizes[1]);
    const builtLength=length+joints;
    const builtHeight=height+joints;
    const area= builtLength * builtHeight/1000000
    store("blockthickess",thickness)
    store("blockarea",area)
    const number=Math.ceil(wallArea/area)
    store("blocks",number)
    const unitWallVolume=wallArea*thickness/1000;
    const blocksVolume=number*length*thickness*height/1000000000;
    const morta=1.3*(unitWallVolume-blocksVolume)
    store("morta",morta)
    const description=getdescription(`${block} blocks`,`${number}`,"pcs")
    return description;
        }
const cemfactor=28.96;
const sanfactor=1520
function calculateMix(type,ratioType,mix){
    const cementbrand=retrieve(`${type} cementbrand`)
    const sandbrand=retrieve(`${type} sandbrand`)
    const ratio=retrieve(ratioType)||"1:3"
    const ratios=ratio.split(":")
    const cem=parseFloat(ratios[0])
    const san=parseFloat(ratios[1])
    const sum=cem+san
    const cement=Math.ceil(cem*cemfactor*mix/sum)
    const sand=Math.ceil(san*sanfactor*mix/sum)
    const sandDescription=getdescription(sandbrand,sand,"kg")
    const cementDescription=getdescription(cementbrand,cement,'50 kg bags')
    const description=`<u>${type}</u><br>${sandDescription}<br>${cementDescription}`
    return description
            }