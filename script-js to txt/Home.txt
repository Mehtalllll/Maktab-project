// =================================================== token

const token = window.localStorage.getItem("token");

// =================================================== value

const pages1 = document.getElementById("pages");
const pages2 = document.getElementById("pages2");
const cardbox = document.getElementById("card-box");
const notFound = document.getElementById("notfound");

// =================================================== oclock handel

let todaytime = new Date();
let oclock = todaytime.getHours();
let oclockmessage = document.getElementById("oclock");
if (oclock < 12) {
  oclockmessage.innerText = "Good Morning👋";
} else if (oclock < 18) {
  oclockmessage.innerText = "Good Afternoon👋";
} else {
  oclockmessage.innerText = "Good Evening👋";
}

// =================================================== to user name

let userNameVisibility = document.getElementById("userName");
fetch(`http://localhost:3000/user`, {
  headers: {
    Authorization: token,
  },
  method: "GET",
})
  .then((Response) => {
    return Response.text();
  })
  .then((result) => {
    userNameVisibility.innerText += JSON.parse(result).username;
  });

// =================================================== to Logout

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  fetch("http://localhost:3000/api#/", {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  window.location.href = "login.html";
});

// =================================================== To htmlcard

function cardHtml(i, response) {
  return `<div id="${response.data[i].id}" class="w-full h-[250px] cardclick cursor-pointer flex flex-col items-center gap-y-3">
          <div class="w-full max-w-[182px] h-full max-h-[182px] flex justify-center items-center  bg-[#f3f3f3] rounded-3xl relative">
              <img class="w-[100%] h-4/6 rounded-3xl " src="${response.data[i].imageURL}">
          </div>
          <p class="w-full font-inter font-bold text-xl leading-3 truncate ">${response.data[i].name}</p>
          <p class="w-full font-inter font-semibold text-base leading-4">$${response.data[i].price}.00</p>
          </div>`;
}

// =================================================== to filtering brands

async function brandfilter(num, filter) {
  const response = await fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10&brands=${filter}`,
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

// =================================================== to brands visibility

async function getbrands() {
  const response = await fetch("http://localhost:3000/sneaker/brands", {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  const _brand = await response.json();
  return _brand;
}
getbrands().then((_brand) => {
  let bransp = document.getElementById("brands");

  bransp.innerHTML =`<div
      class=" brand cursor-pointer border-2 bg-black text-white border-[#343A40] rounded-[25px] h-[39px] text-nowrap content-center px-[20px]"
    >
      All
    </div>`;

  for (let i = 0; i <= _brand.length - 1; i++) {
    bransp.innerHTML += `<div
              id="${_brand[i]}"
              class="brand cursor-pointer border-2 bg-[#FFFFFF] border-[#343A40] rounded-[25px] h-[39px] text-nowrap content-center px-[20px]"
            >
            ${_brand[i]}
            </div>`;
  }
  const brandStyle=document.querySelectorAll(".brand")
    brandStyle.forEach((brand) =>
    brand.addEventListener("click", () => {
      brandStyle.forEach(num=>{
        num.style.backgroundColor="white"
        num.style.color="black"
      })
      brand.style.backgroundColor ="black"
      brand.style.color ="white"


      
    })
  );
  filterclick();
});

// =================================================== to filter brands click

function filterclick() {
  let breansarray = document.querySelectorAll(".brand");
  breansarray.forEach((but) => {
    but.addEventListener("click", () => {
      if (but.innerText === "All") {
        document.getElementById("notfound").style.display = "none";
        document.getElementById("card-box").style.display = "grid";
        document.getElementById("pages").style.display = "flex";
        document.getElementById("pages2").style.display = "none";
        cardbox.innerHTML = "";
        pagedata2(1);
      } else if (but.innerText === "See All") {
        document.getElementById("notfound").style.display = "none";
        document.getElementById("card-box").style.display = "grid";
        document.getElementById("pages").style.display = "flex";
        document.getElementById("pages2").style.display = "none";
        pagedata2(1);
      } else {
        // برند فیلتر صفحه و اسم برند
        brandfilter(1, but.innerText).then((brand) => {
          if (Number(brand.total) > 10) {
            pages2.innerHTML = `<div class="active numbersearch cursor-pointer" id="1">1</div>`;
            for (let i = 2; i <= brand.totalPages; i++) {
              pages2.innerHTML += `<div class="numbersearch cursor-pointer" id="page${i}">${i}</div>`;
              document.getElementById("pages").style.display = "none";
              document.getElementById("pages2").style.display = "flex";
              cardbox.innerHTML = "";
              for (let i = 0; i < brand.data.length; i++) {
                cardbox.innerHTML += cardHtml(i, brand);
              }

              const numbersearch = document.querySelectorAll(".numbersearch");
              numbersearch.forEach((page) => {
                page.addEventListener("click", () => {
                  cardbox.innerHTML = "";
                  brandfilter(page.innerText, but.innerText).then((_page) => {
                    for (let i = 0; i < brand.data.length; i++) {
                      cardbox.innerHTML += cardHtml(i, _page);
                    }
                  });
                });

                // =================================================== To pageination style

                numbersearch.forEach((number) => {
                  number.addEventListener("click", function () {
                    numbersearch.forEach((num) =>
                      num.classList.remove("active")
                    );
                    this.classList.add("active");
                  });
                });
              });
            }
          } else {
            // console.log(brand);
            // چون یک صفحه است صفحه بندی نشون داده نمیشه
            pages2.innerHTML = "";
            document.getElementById("pages").style.display = "none";
            document.getElementById("pages2").style.display = "flex";
            cardbox.innerHTML = "";
            for (let i = 0; i < brand.data.length; i++) {
              cardbox.innerHTML += cardHtml(i, brand);
            }
          }
        });
      }
    });
  });
}

// =================================================== To page data

async function pagedata(num) {
  const response = await fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10`,
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
function pagedata2(num) {
  pagedata(num).then((result) => {
    let carddata = result;
    const totalPages = localStorage.setItem("totalPages", carddata.totalPages);
    for (let i = 0; i < carddata.data.length; i++) {
      cardbox.innerHTML += cardHtml(i, result);
    }
    document.getElementById("pages").style.display = "flex";
    document.getElementById("pages2").style.display = "none";
    getcardindata(carddata);
  });
}
// بصورت دفالت صفحه اول نمایش داده میشه
pagedata2(1);

// =================================================== To number of pages

const totalPages = window.localStorage.getItem("totalPages");
const pages = document.getElementById("pages");

for (let i = 2; i <= totalPages; i++) {
  pages.innerHTML += `<div class="number cursor-pointer" id="page${i}">${i}</div>`;
}

// =================================================== To page number click

const numbers = document.querySelectorAll(".number");
numbers.forEach((pageid) => {
  pageid.addEventListener("click", () => {
    cardbox.innerHTML = "";
    pagedata2(pageid.innerText);
  });
});

// =================================================== To page number style

numbers.forEach((number) => {
  number.addEventListener("click", function () {
    numbers.forEach((num) => num.classList.remove("active"));
    this.classList.add("active");
  });
});

// // =================================================== To search handel

document.getElementById("search").addEventListener("keyup", () => {
  setTimeout(() => {
    let keyWord = document.getElementById("search").value;
    searchdata2(1, keyWord);
  }, 700);
});

async function searchdata(num, search) {
  const response = await fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10&search=${search}`,
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

function searchdata2(num, search) {
  searchdata(num, search).then((result) => {
    let searchdata = result;
    let dataSearch = document.getElementById("search");

    if (!dataSearch.value) {
      cardbox.innerHTML = "";
      pagedata2(1);
    }

    if (searchdata.total == 0) {
      notFound.style.display = "block";
      cardbox.style.display = "none";
      pages1.style.display = "none";
    } else if (searchdata.total > 0) {
      notFound.style.display = "none";
      cardbox.style.display = "grid";

      let localSearch = "";
      for (let i = 0; i < searchdata.data.length; i++) {
        localSearch += cardHtml(i, searchdata);
      }
      cardbox.innerHTML = localSearch;
      pages1.style.display = "none";
      pages2.style.display = "flex";
      getcardinsearch(searchdata);
      
      
      pages2.innerHTML = `<div class="active number numbersearch cursor-pointer" id="page21">1</div>`;
      for (let i = 2; i <= searchdata.totalPages; i++) {
        pages2.innerHTML += `<div class="number numbersearch cursor-pointer" id="page2${i}">${i}</div>`;
      }
      
      pageInationForSearch(search);
      
    }
  });
}

// // =================================================== To pageination for search

function pageInationForSearch(search) {

  const numbersearch = document.querySelectorAll(".numbersearch");
  numbersearch.forEach((page) => {
    page.addEventListener("click", () => {
      cardbox.innerHTML = "";
      searchdata2(page.innerText, search);
    });
  });
}

// // =================================================== To card click
function getcardindata(carddata) {
  const cardclick = document.querySelectorAll(".cardclick");

  cardclick.forEach((card) => {
    card.addEventListener("click", function () {
      localStorage.setItem("cardid", JSON.stringify(card.id));
      window.location.href = "item.html";
    });
  });
}

function getcardinsearch(searchdata) {
  const cardclick = document.querySelectorAll(".cardclick");

  cardclick.forEach((card) => {
    card.addEventListener("click", function () {
      localStorage.setItem("cardid", JSON.stringify(card.id));
      window.location.href = "item.html";
    });
  });
}
