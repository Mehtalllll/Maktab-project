const token = window.localStorage.getItem("token");
// =================================================== get brands

(() => {
  fetch("http://localhost:3000/sneaker/brands", {
    headers: {
      Authorization: token,
    },
    method: "GET",
  })
    .then((Response) => {
      return Response.text();
    })
    .then((result) => {
      let brands = JSON.parse(result);
      let bransp = document.getElementById("brands");
      for (let i = 0; i <= brands.length; i++) {
        bransp.innerHTML += `<div
              id="${brands[i]}"
              class="brand border-2 bg-[#FFFFFF] border-[#343A40] rounded-[25px] h-[39px] text-nowrap content-center px-[20px]"
            >
            ${brands[i]}
            </div>`;
      }
      console.log(brands);
    });
})();

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
      for (let i = 0; i <= carddata.perPage - 1; i++) {
        const cardBox = document.getElementById("card-box")
        cardBox.innerHTML += `<div id="${carddata.data[i].id}" class="flex flex-col gap-y-3">
                         <div class="w-[182px] h-[182px] bg-[#f3f3f3] rounded-3xl relative">
                             <img class="absolute top-5 left-5 w-[142px] h-[142px]" src="${carddata.data[i].imageURL}">
                         </div>
                         <p class="font-inter font-bold text-xl leading-6 truncate">${carddata.data[i].name}</p>
                         <p class="font-inter font-semibold text-base leading-4">$ ${carddata.data[i].price}</p>
                         </div>`;
      }
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

async function searchdata(num, search) {
  await fetch(
    `http://localhost:3000/sneaker?page=1&limit=10&search=${search}`,
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
      } else if (searchdata.total > 0) {
        document.getElementById("notfound").style.display = "none";
        document.getElementById("card-box").style.display = "grid";
        let localSearch = "";
        for (let i = 0; i < searchdata.data.length; i++) {
          localSearch += `<div id="${searchdata.data[i].id}" class="flex flex-col gap-y-3">
            <div class="w-[182px] h-[182px] bg-[#f3f3f3] rounded-3xl relative">
                <img class="absolute top-5 left-5 w-[142px] h-[142px]" src="${searchdata.data[i].imageURL}">
            </div>
            <p class="font-inter font-bold text-xl leading-6 text-ellipsis">${searchdata.data[i].name}</p>
            <p class="font-inter font-semibold text-base leading-4">$ ${searchdata.data[i].price}</p>
            </div>
            `;
        }
        cardbox.innerHTML = localSearch;
      }
    });
}
