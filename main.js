import "./style.css";

let slid1 = document.getElementById(`_slid-1`);
let slid2 = document.getElementById(`_slid-2`);
let slid3 = document.getElementById(`_slid-3`);
(() => {
  slid1.addEventListener("click", () => {
    slid1.style.backgroundColor = "#000000";
    slid2.style.backgroundColor = "#808080";
    slid3.style.backgroundColor = "#808080";
  });
  slid2.addEventListener("click", () => {
    slid1.style.backgroundColor = "#808080";
    slid2.style.backgroundColor = "#000000";
    slid3.style.backgroundColor = "#808080";
  });
  slid3.addEventListener("click", () => {
    slid1.style.backgroundColor = "#808080";
    slid2.style.backgroundColor = "#808080";
    slid3.style.backgroundColor = "#000000";
  });
})();

const nextbutton=document.getElementById("nextbt")
nextbutton.addEventListener("click",()=>{
    document.getElementById("scroll").scrollTo(500, 0);
    slid1.style.backgroundColor = "#808080";
    slid2.style.backgroundColor = "#000000";
    slid3.style.backgroundColor = "#808080";
    nextbutton.addEventListener("click",()=>{
    document.getElementById("scroll").scrollTo(1000, 0);
    slid1.style.backgroundColor = "#808080";
    slid2.style.backgroundColor = "#808080";
    slid3.style.backgroundColor = "#000000";
    nextbutton.textContent="Get Started"
    nextbutton.outerHTML=`<a href="Login.html" class="w-ws flex justify-center">${nextbutton.outerHTML}</a>`
    
    
})

})

