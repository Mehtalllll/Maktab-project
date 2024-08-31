const token = window.localStorage.getItem("token");
const id = localStorage.getItem("cardid");

async function cardRender(id) {
  const response = await fetch(
    `http://localhost:3000/sneaker/item/${JSON.parse(id)}`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  const result = await response.json();
  return result;
}
cardRender(id).then((respone) => {
  document.getElementById("category").innerHTML = `<p>${
    respone.category.charAt(0).toUpperCase() +
    respone.category.slice(1).toLowerCase()
  } Sportwear</p><img src="public/Vector.svg" />`;
  document.getElementById(
    "img"
  ).innerHTML = `<img class="w-[340px] h-[340px]" src="${respone.imageURL}" />`;
  document.getElementById("Pricep").innerHTML = `<p>$<p id="pricetotal">${respone.price}</p>.00</p>`;
});
// =================================================== To total price
const plus=document.getElementById("plus")
const minus=document.getElementById("minus")
const totalnum=document.getElementById("totalnum")
const pricetotal=document.getElementById("pricetotal")

plus.addEventListener("click",()=>{
    totalnum.innerText=Number(totalnum.innerText)+1
    pricetotal.innerHTML=Number(pricetotal.innerText)*Number(totalnum.innerText)

})

minus.addEventListener("click",()=>{
    if(Number(totalnum.innerText)>0){
        totalnum.innerText=Number(totalnum.innerText)-1
    }
})