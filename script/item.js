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

  // =================================================== To total price

  const plus=document.getElementById("plus")
  const minus=document.getElementById("minus")
  const totalnum=document.getElementById("totalnum")
  const pricetotal=document.getElementById("pricetotal")
  
  plus.addEventListener("click",()=>{
      totalnum.innerText=Number(totalnum.innerText)+1
      pricetotal.innerHTML=Number(pricetotal.innerText)+Number(respone.price)
  
  })
  
  minus.addEventListener("click",()=>{
      if(Number(totalnum.innerText)>1){
          totalnum.innerText=Number(totalnum.innerText)-1
          pricetotal.innerText=Number(pricetotal.innerText)-Number(respone.price)
      }
  })
});

// =================================================== back to her man

const backbut=document.getElementById("back")
backbut.addEventListener("click",()=>{
    window.location.href = "Home.html";
})
// =================================================== back to her man

const selected = document.querySelectorAll(".selected");

selected.forEach((color) => {
  color.addEventListener("click", function () {
    selected.forEach((num) => num.classList.remove("select"));
    this.classList.add("select");
  });
});
const selectedcolor = document.querySelectorAll(".selectedcolor");

selectedcolor.forEach((color) => {
  color.addEventListener("click", function () {
    selectedcolor.forEach((num) => num.classList.remove("select"));
    this.classList.add("select");
  });
});