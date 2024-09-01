const token = window.localStorage.getItem("token");

// =================================================== oclock handel
let todaytime = new Date()
let oclock = todaytime.getHours()
let oclockmessage=document.getElementById("oclock")
if (oclock < 12) {
  oclockmessage.innerText="Good Morning👋"
} else if (oclock < 18) {
  oclockmessage.innerText="Good Afternoon👋"
} else {
  oclockmessage.innerText="Good Evening👋"
}

// =================================================== to user name
let userNameVisibility=document.getElementById("userName")
fetch(`http://localhost:3000/user`,{
  headers: {
    Authorization: token,
  },
  method: "GET",
})
.then((Response) => {
  return Response.text();
})
.then((result) => {
  userNameVisibility.innerText+=JSON.parse(result).username
})
// =================================================== to Logout
const logout=document.getElementById("logout")
logout.addEventListener("click",()=>{
  fetch("http://localhost:3000/api#/", {
    headers: {
      Authorization: token,
    },
    method: "GET",
  })
  window.location.href = "login.html";
})

// =================================================== get brands

async function getbrands(){

  const response = await fetch("http://localhost:3000/sneaker/brands", {
        headers: {
          Authorization: token,
        },
        method: "GET",
      })
      const _brand=await response.json()
      return _brand
    }
    getbrands().then(_brand=>{
      let bransp = document.getElementById("brands");
      for (let i = 0; i <= _brand.length-1; i++) {
        bransp.innerHTML += `<div
              id="${_brand[i]}"
              class="brand cursor-pointer border-2 bg-[#FFFFFF] border-[#343A40] rounded-[25px] h-[39px] text-nowrap content-center px-[20px]"
            >
            ${_brand[i]}
            </div>`;
      }
      let breansarray=document.querySelectorAll('.brand')
      breansarray.forEach(but=>{

        but.addEventListener("click",()=>{
          if(but.innerText==="All"){
            document.getElementById("notfound").style.display = "none";
            document.getElementById("card-box").style.display = "grid";
            document.getElementById("pages").style.display = "flex"; 
            document.getElementById("pages2").style.display = "none";
            const cardBox = document.getElementById("card-box")
            cardBox.innerHTML=""
            pagedata(1)

          }
          else if(but.innerText==="See All"){
            document.getElementById("notfound").style.display = "none";
            document.getElementById("card-box").style.display = "grid";
            document.getElementById("pages").style.display = "flex"; 
            document.getElementById("pages2").style.display = "none";
            pagedata(1)
          }else if(but.innerText==="NIKE"){
            searchdata(1,but.innerText)
            document.getElementById("pages2").innerHTML=`<div class="nike cursor-pointer " id="pagenike1">1</div><div class="nike cursor-pointer" id="pagenike2">2</div>`
            document.getElementById("pagenike1").addEventListener("click",()=>{searchdata(1,but.innerText)})
            document.getElementById("pagenike2").addEventListener("click",()=>{searchdata(2,but.innerText)})
            document.getElementById("pages").style.display = "none"; 
            document.getElementById("pages2").style.display = "flex";

            const nike = document.querySelectorAll(".nike");
            nike.forEach((number) => {
              number.addEventListener("click", function () {
                nike.forEach((num) => num.classList.remove("active"));
                this.classList.add("active");
              });
            });
            
          }else{
            searchdata(1,but.innerText)
            document.getElementById("pages2").style.display = "none";
          }
          
        })
      })
    })
    getbrands();


// =================================================== To page data
function pagedata(num) {
  fetch(`http://localhost:3000/sneaker?page=${num}&limit=10`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  })
    .then((Response) => {
      return Response.text();
    })
    .then((result) => {
      let carddata = JSON.parse(result);
      const totalPages = localStorage.setItem(
        "totalPages",
        carddata.totalPages
      );
      const cardBox = document.getElementById("card-box")
      for (let i = 0; i < carddata.data.length; i++) {
        cardBox.innerHTML +=`<div id="${carddata.data[i].id}" class="cardclick cursor-pointer flex flex-col gap-y-3">
                         <div class="w-[182px] h-[182px] bg-[#f3f3f3] rounded-3xl relative">
                             <img class="absolute top-5 left-5 w-[142px] h-[142px]" src="${carddata.data[i].imageURL}">
                         </div>
                         <p class="font-inter font-bold text-xl leading-6 truncate">${carddata.data[i].name}</p>
                         <p class="font-inter font-semibold text-base leading-4">$ ${carddata.data[i].price}</p>
                         </div>`;
      }
      document.getElementById("pages").style.display = "flex"; 
      document.getElementById("pages2").style.display = "none"; 
      getcardindata(carddata)
    });
}
pagedata(1);
// =================================================== To number of pages

const totalPages = window.localStorage.getItem("totalPages");
const pages = document.getElementById("pages");
const cardbox = document.getElementById("card-box");
for (let i = 1; i <= totalPages; i++) {
  pages.innerHTML += `<div class="number cursor-pointer" id="page${i}">${i}</div>`;
}

for (let i = 1; i <= totalPages; i++) {
  if (document.getElementById(`page${i}`)) {
    let page = document.getElementById(`page${i}`);
    page.addEventListener("click", () => {
      cardbox.innerHTML = "";
      pagedata(i);
    });
  }
}

const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
  number.addEventListener("click", function () {
    numbers.forEach((num) => num.classList.remove("active"));
    this.classList.add("active");
  });
});

// // =================================================== To search handel

document.getElementById("search").addEventListener("keyup", () => {
  let keyWord = document.getElementById("search").value;
  searchdata(1, keyWord);
});

 function searchdata(num, search) {
   fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10&search=${search}`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  )
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      let searchdata = JSON.parse(result);
      if (!document.getElementById("search").value) {
        for (let i = 1; i <= totalPages; i++) {
          if (document.getElementById(`page${i}`)) {
            document
              .getElementById(`page${i}`)
              .addEventListener("click", () => {
                cardbox.innerHTML = "";
                pagedata(i);
              });
          }
        }
      }
      if (searchdata.total == 0) {
        document.getElementById("notfound").style.display = "block";
        document.getElementById("card-box").style.display = "none";
        document.getElementById("pages").style.display = "none"; 
      } else if (searchdata.total > 0) {
        document.getElementById("notfound").style.display = "none";
        document.getElementById("card-box").style.display = "grid";
        document.getElementById("pages").style.display = "flex"; 
        const totalPagesforsearch = localStorage.setItem(
          "totalPagesforsearch",
          searchdata.totalPages
        );
        // console.log(searchdata.totalPages);
        
        let localSearch = "";
        for (let i = 0; i < searchdata.data.length; i++) {
          localSearch += `<div id="${searchdata.data[i].id}" class="cardclick cursor-pointer flex flex-col gap-y-3">
            <div class="w-[182px] h-[182px] bg-[#f3f3f3] rounded-3xl relative">
                <img class="absolute top-5 left-5 w-[142px] h-[142px]" src="${searchdata.data[i].imageURL}">
            </div>
            <p class="font-inter font-bold text-xl leading-6 truncate">${searchdata.data[i].name}</p>
            <p class="font-inter font-semibold text-base leading-4">$ ${searchdata.data[i].price}</p>
            </div>
            `;
        }
        cardbox.innerHTML = localSearch;
        document.getElementById("pages").style.display = "none"; 
        document.getElementById("pages2").style.display = "flex";
        getcardinsearch(searchdata)
      }
    });
}

const pages2 = document.getElementById("pages2");

const totalPagesforsearch = window.localStorage.getItem("totalPagesforsearch");
document.getElementById("search").addEventListener("keyup",()=>{
  const totalPagesforsearch = window.localStorage.getItem("totalPagesforsearch");
  pages2.innerHTML=""
  for (let i = 1; i <= totalPagesforsearch; i++) {
    pages2.innerHTML+=`<div class="number cursor-pointer" id="page2${i}">${i}</div>`
  }

  for (let i = 1; i <= totalPagesforsearch; i++) {
    if (document.getElementById(`page2${i}`)) {
      let page = document.getElementById(`page2${i}`);
      page.addEventListener("click", () => {
        cardbox.innerHTML = "";
        searchdata(i,document.getElementById("search").value)
      });
    }
  }
})




// // =================================================== To card click
function getcardindata(carddata){
  const cardclick = document.querySelectorAll(".cardclick");
  
  cardclick.forEach((card) => {
    card.addEventListener("click", function () {
     localStorage.setItem("cardid",JSON.stringify(card.id)) 
     window.location.href = "item.html";
    });
  });
}

function getcardinsearch(searchdata){
  const cardclick = document.querySelectorAll(".cardclick");
  
  cardclick.forEach((card) => {
    card.addEventListener("click", function () {
      localStorage.setItem("cardid",JSON.stringify(card.id)) 
      window.location.href = "item.html";
    });
  });
}


