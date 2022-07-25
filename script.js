const fi=document.querySelector(".filein")
const cimg=document.querySelector(".choose")
const pimg=document.querySelector(".preimg img")
const filname=document.querySelector(".filterinfo .name");
const filop=document.querySelectorAll(".filter button");
const filval=document.querySelector(".filterinfo .value");
const filslid=document.querySelector(".slider input");
const resetbtn=document.querySelector(".resetfilter");
const rotoption=document.querySelectorAll(".rotate button");
const savebtn=document.querySelector(".save");
let bright=100,saturation=100,inversion=0;grayscale=0 ,rotate=0,fliphor=1,flipver=1;
const chimg= ()=>{
    let chf =fi.files[0];
    //console.log(chf);
    pimg.src=URL.createObjectURL(chf);
    pimg.addEventListener("load",()=>{
document.querySelector(".container").classList.remove("stop");
    });
}
fi.addEventListener("change",chimg)
cimg.addEventListener("click",() => fi.click())
filop.forEach(option =>{
option.addEventListener("click",()=>{
    document.querySelector(".filter .ab ").classList.remove("ab");
    option.classList.add("ab");
    filname.innerText=option.innerText;
    if(option.id==="bri")
    {
        filslid.max="200";
        filslid.value= bright;
        filval.innerText=`${bright}%`;
    }
    else if(option.id==="sat")
    {
        filslid.max="200";
        filslid.value= saturation;
        filval.innerText=`${saturation}%`;
    }
   else if(option.id==="gray")
    {filslid.max="100";
        filslid.value= grayscale;
        filval.innerText=`${grayscale}%`;
    }
    else
    {filslid.max="100";
        filslid.value= inversion;
        filval.innerText=`${inversion}%`;
    }


})
});

const applyfilt=()=>{
    pimg.style.transform=`rotate(${rotate}deg) scale(${fliphor},${flipver})  `
pimg.style.filter=`brightness(${bright}%) saturate(${saturation}%) invert(${inversion}%)  grayscale(${grayscale}%)`;
}


const updatefilval= ()=>{
//console.log(filslid.value);
filval.innerText=`${filslid.value}%`
const filselected=document.querySelector(".filter .ab");
if(filselected.id==="bri")
{
    bright=filslid.value;
}
else if(filselected.id==="sat")
{
    saturation=filslid.value;
}
else if(filselected.id==="gray")
{
    grayscale=filslid.value;
}
else 
{
    inversion=filslid.value;
}
applyfilt();
}

rotoption.forEach(option =>{
option.addEventListener("click",()=>{
   // console.log(option);
   if(option.id==="left")
   {
    rotate=rotate-90;
   }
  else if(option.id==="right")
   {
    rotate=rotate+90;
   }
   else if(option.id==="hor")
   {
    fliphor=(fliphor===1) ? -1:1;
    
   }
   else
   {
    flipver =(flipver===1 )? -1:1;
   }

   
   applyfilt();
});
});

const resetfil =()=>{
  bright=100,saturation=100,inversion=0;grayscale=0 ,rotate=0,fliphor=1,flipver=1;
  filop[0].click();
  applyfilt();
};

const savechange =()=>{
   // console.log("egd");
   const canvas=document.createElement("canvas");
   const ctx=canvas.getContext("2d");
   canvas.width=pimg.naturalWidth;
   canvas.height=pimg.naturalHeight;
   ctx.translate(-canvas.width / 2,-canvas.height / 2);
   if(rotate!==0)
   {
    ctx.rotate(rotate*Math.PI/180);
   }
   ctx.filter=`brightness(${bright}%) saturate(${saturation}%) invert(${inversion}%)  grayscale(${grayscale}%)`;
   ctx.scale(fliphor,flipver);
   ctx.drawImage(pimg,-canvas.width / 2,-canvas.height / 2,canvas.width,canvas.height);
   const lurl=document.createElement("a");
   lurl.download="editedimg.jpg";
   lurl.href=canvas.toDataURL();
   lurl.click();

}
filslid.addEventListener("input",updatefilval );
resetbtn.addEventListener("click",resetfil );
savebtn.addEventListener("click",savechange ); 
