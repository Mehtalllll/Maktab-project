// =================================================== token1

const token1: string | null = window.localStorage.getItem("token");

// =================================================== value

const pages1 = document.getElementById("pages") as HTMLElement | null;
const pages2 = document.getElementById("pages2") as HTMLElement | null;
const cardbox = document.getElementById("card-box") as HTMLElement | null;
const notFound = document.getElementById("notfound") as HTMLElement | null;

// =================================================== oclock handel

const todaytime: Date = new Date();
const oclock: number = todaytime.getHours();
const oclockmessage = document.getElementById("oclock") as HTMLElement | null;

if (oclock < 12) {
  oclockmessage!.innerText = "Good Morning👋";
} else if (oclock < 18) {
  oclockmessage!.innerText = "Good Afternoon👋";
} else {
  oclockmessage!.innerText = "Good Evening👋";
}

// =================================================== to user name

const userNameVisibility = document.getElementById("userName") as HTMLElement | null;

fetch(`http://localhost:3000/user`, {
  headers: {
    Authorization: token1 || '',
  },
  method: "GET",
})
  .then((response) => response.text())
  .then((result) => {
    userNameVisibility!.innerText += JSON.parse(result).username;
  });

// =================================================== to Logout

const logout = document.getElementById("logout") as HTMLElement | null;
logout?.addEventListener("click", () => {
  fetch("http://localhost:3000/api#/", {
    headers: {
      Authorization: token1 || '',
    },
    method: "GET",
  });
  window.location.href = "login.html";
});

// =================================================== To htmlcard

function cardHtml(i: number, response: any): string {
  return `<div id="${response.data[i].id}" class="w-full h-[250px] cardclick cursor-pointer flex flex-col items-center gap-y-3">
          <div class="w-full max-w-[182px] h-full max-h-[182px] flex justify-center items-center bg-[#f3f3f3] rounded-3xl relative">
              <img class="w-[100%] h-4/6 rounded-3xl " src="${response.data[i].imageURL}">
          </div>
          <p class="w-full font-inter font-bold text-xl leading-3 truncate ">${response.data[i].name}</p>
          <p class="w-full font-inter font-semibold text-base leading-4">$${response.data[i].price}.00</p>
          </div>`;
}

// =================================================== to filtering brands

interface BrandResponse {
  total: number;
  totalPages: number;
  data: any[];
}

async function brandfilter(num: number, filter: string): Promise<BrandResponse> {
  const response = await fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10&brands=${filter}`,
    {
      headers: {
        Authorization: token1 || '',
      },
      method: "GET",
    }
  );
  return await response.json();
}

// =================================================== to brands visibility

async function getbrands(): Promise<string[]> {
  const response = await fetch("http://localhost:3000/sneaker/brands", {
    headers: {
      Authorization: token1 || '',
    },
    method: "GET",
  });
  return await response.json();
}

getbrands().then((brands) => {
  const bransp = document.getElementById("brands") as HTMLElement | null;

  bransp!.innerHTML = `<div class=" brand cursor-pointer border-2 bg-black text-white border-[#343A40] rounded-[25px] h-[39px] text-nowrap content-center px-[20px]">
      All
    </div>`;

  brands.forEach((brand) => {
    bransp!.innerHTML += `<div id="${brand}" class="brand cursor-pointer border-2 bg-[#FFFFFF] border-[#343A40] rounded-[25px] h-[39px] text-nowrap content-center px-[20px]">
            ${brand}
            </div>`;
  });

  const brandStyle = document.querySelectorAll<HTMLDivElement>(".brand");
  brandStyle.forEach((brand) =>
    brand.addEventListener("click", () => {
      brandStyle.forEach(num => {
        num.style.backgroundColor = "white";
        num.style.color = "black";
      });
      brand.style.backgroundColor = "black";
      brand.style.color = "white";
    })
  );
  filterclick();
});

// =================================================== to filter brands click

function filterclick(): void {
  const breansarray = document.querySelectorAll<HTMLDivElement>(".brand");
  breansarray.forEach((but) => {
    but.addEventListener("click", () => {
      if (but.innerText === "All" || but.innerText === "See All") {
        notFound?.style.setProperty('display', 'none');
        cardbox?.style.setProperty('display', 'grid');
        pages1?.style.setProperty('display', 'flex');
        pages2?.style.setProperty('display', 'none');
        cardbox!.innerHTML = "";
        pagedata2(1);
      } else {
        brandfilter(1, but.innerText).then((brand) => {
          if (Number(brand.total) > 10) {
            pages2!.innerHTML = `<div class="active numbersearch cursor-pointer" id="1">1</div>`;
            for (let i = 2; i <= brand.totalPages; i++) {
              pages2!.innerHTML += `<div class="numbersearch cursor-pointer" id="page${i}">${i}</div>`;
            }
            pages1?.style.setProperty('display', 'none');
            pages2?.style.setProperty('display', 'flex');
            cardbox!.innerHTML = "";
            brand.data.forEach((_, i) => {
              cardbox!.innerHTML += cardHtml(i, brand);
            });

            const numbersearch = document.querySelectorAll<HTMLDivElement>(".numbersearch");
            numbersearch.forEach((page) => {
              page.addEventListener("click", () => {
                cardbox!.innerHTML = "";
                brandfilter(Number(page.innerText), but.innerText).then((page) => {
                  page.data.forEach((_, i) => {
                    cardbox!.innerHTML += cardHtml(i, page);
                  });
                });
              });

              // =================================================== To pagination style

              numbersearch.forEach((number) => {
                number.addEventListener("click", function () {
                  numbersearch.forEach((num) =>
                    num.classList.remove("active")
                  );
                  this.classList.add("active");
                });
              });
            });
          } else {
            pages2!.innerHTML = "";
            pages1?.style.setProperty('display', 'none');
            pages2?.style.setProperty('display', 'flex');
            cardbox!.innerHTML = "";
            brand.data.forEach((_, i) => {
              cardbox!.innerHTML += cardHtml(i, brand);
            });
          }
        });
      }
    });
  });
}

// =================================================== To page data

interface PageResponse {
  total: number;  
  totalPages: number;
  data: any[];
}

async function pagedata(num: number): Promise<PageResponse> {
  const response = await fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10`,
    {
      headers: {
        Authorization: token1 || '',
      },
      method: "GET",
    }
  );
  return await response.json();
}

function pagedata2(num: number): void {
  pagedata(num).then((result) => {
    const carddata = result;
    localStorage.setItem("totalPages", carddata.totalPages.toString());
    cardbox!.innerHTML = "";
    carddata.data.forEach((_, i) => {
      cardbox!.innerHTML += cardHtml(i, result);
    });
    pages1?.style.setProperty('display', 'flex');
    pages2?.style.setProperty('display', 'none');
    getcardindata(carddata);
  });
}

// بصورت دفالت صفحه اول نمایش داده میشه
pagedata2(1);

// =================================================== To number of pages

const totalPages = window.localStorage.getItem("totalPages");
if (totalPages) {
  const pages = document.getElementById("pages") as HTMLElement | null;
  for (let i = 2; i <= Number(totalPages); i++) {
    pages!.innerHTML += `<div class="number cursor-pointer" id="page${i}">${i}</div>`;
  }
}

// =================================================== To page number click

const numbers = document.querySelectorAll<HTMLDivElement>(".number");
numbers.forEach((pageid) => {
  pageid.addEventListener("click", () => {
    cardbox!.innerHTML = "";
    pagedata2(Number(pageid.innerText));
  });
});

// =================================================== To page number style

numbers.forEach((number) => {
  number.addEventListener("click", function () {
    numbers.forEach((num) => num.classList.remove("active"));
    this.classList.add("active");
  });
});

// =================================================== To search handle

document.getElementById("search")?.addEventListener("keyup", () => {
  setTimeout(() => {
    const keyWord = (document.getElementById("search") as HTMLInputElement).value;
    searchdata2(1, keyWord);
  }, 700);
});

async function searchdata(num: number, search: string): Promise<PageResponse> {
  const response = await fetch(
    `http://localhost:3000/sneaker?page=${num}&limit=10&search=${search}`,
    {
      headers: {
        Authorization: token1 || '',
      },
      method: "GET",
    }
  );
  return await response.json();
}

function searchdata2(num: number, search: string): void {
  searchdata(num, search).then((result) => {
    const searchdata = result;
    const dataSearch = document.getElementById("search") as HTMLInputElement;

    if (!dataSearch.value) {
      cardbox!.innerHTML = "";
      pagedata2(1);
    }

    if (searchdata.total === 0) {
      notFound!.style.display = "block";
      cardbox!.style.display = "none";
      pages1?.style.setProperty('display', 'none');
    } else if (searchdata.total > 0) {
      notFound!.style.display = "none";
      cardbox!.style.display = "grid";

      let localSearch = "";
      searchdata.data.forEach((_, i) => {
        localSearch += cardHtml(i, searchdata);
      });
      cardbox!.innerHTML = localSearch;
      pages1?.style.setProperty('display', 'none');
      pages2?.style.setProperty('display', 'flex');
      getcardinsearch(searchdata);

      pages2!.innerHTML = `<div class="active number numbersearch cursor-pointer" id="page21">1</div>`;
      for (let i = 2; i <= searchdata.totalPages; i++) {
        pages2!.innerHTML += `<div class="number numbersearch cursor-pointer" id="page2${i}">${i}</div>`;
      }

      pageInationForSearch(search);
    }
  });
}

// =================================================== To pagination for search

function pageInationForSearch(search: string): void {
  const numbersearch = document.querySelectorAll<HTMLDivElement>(".numbersearch");
  numbersearch.forEach((page) => {
    page.addEventListener("click", () => {
      cardbox!.innerHTML = "";
      searchdata2(Number(page.innerText), search);
    });
  });
}

// =================================================== To card click

function getcardindata(carddata: PageResponse): void {
  const cardclick = document.querySelectorAll<HTMLDivElement>(".cardclick");

  cardclick.forEach((card) => {
    card.addEventListener("click", function () {
      localStorage.setItem("cardid", JSON.stringify(card.id));
      window.location.href = "item.html";
    });
  });
}

function getcardinsearch(searchdata: PageResponse): void {
  const cardclick = document.querySelectorAll<HTMLDivElement>(".cardclick");

  cardclick.forEach((card) => {
    card.addEventListener("click", function () {
      localStorage.setItem("cardid", JSON.stringify(card.id));
      window.location.href = "item.html";
    });
  });
}
