// =================================================== Token and ID

const token: string | null = window.localStorage.getItem("token");
const id: string | null = localStorage.getItem("cardid");

// =================================================== Utility function to update URL parameters

function addOrUpdateURLparam(key: string, value: string): void {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
}

// =================================================== Fetch and render card data

interface CardResponse {
  id: string;
  brand: string;
  name: string;
  category: string;
  imageURL: string;
  price: number;
}

async function cardRender(id: string): Promise<CardResponse> {
  const response = await fetch(`http://localhost:3000/sneaker/item/${JSON.parse(id)}`, {
    headers: {
      Authorization: token || '',
    },
    method: "GET",
  });
  const result: CardResponse = await response.json();
  return result;
}

if (id) {
  cardRender(id).then((response) => {
    console.log(response);

    addOrUpdateURLparam("id", response.id);
    addOrUpdateURLparam("brand", response.brand);
    addOrUpdateURLparam("name", response.name);

    const categoryElement = document.getElementById("category") as HTMLElement;
    categoryElement.innerHTML = `<p>${
      response.category.charAt(0).toUpperCase() + response.category.slice(1).toLowerCase()
    } Sportwear</p><img src="public/Vector.svg" />`;

    const imgElement = document.getElementById("img") as HTMLElement;
    imgElement.innerHTML = `<img class="w-[340px] h-[340px]" src="${response.imageURL}" />`;

    const priceElement = document.getElementById("Pricep") as HTMLElement;
    priceElement.innerHTML = `<p>$<p id="pricetotal">${response.price}</p>.00</p>`;

    // =================================================== Total price handling

    const plus = document.getElementById("plus") as HTMLElement;
    const minus = document.getElementById("minus") as HTMLElement;
    const totalnum = document.getElementById("totalnum") as HTMLElement;
    const pricetotal = document.getElementById("pricetotal") as HTMLElement;

    plus.addEventListener("click", () => {
      totalnum.innerText = (Number(totalnum.innerText) + 1).toString();
      pricetotal.innerHTML = (Number(pricetotal.innerText) + response.price).toString();
    });

    minus.addEventListener("click", () => {
      if (Number(totalnum.innerText) > 1) {
        totalnum.innerText = (Number(totalnum.innerText) - 1).toString();
        pricetotal.innerText = (Number(pricetotal.innerText) - response.price).toString();
      }
    });
  });
}

// =================================================== Back button handling

const backbut = document.getElementById("back") as HTMLElement;
backbut.addEventListener("click", () => {
  window.location.href = "Home.html";
});

// =================================================== Handling color selection

const selected = document.querySelectorAll(".selected") as NodeListOf<HTMLElement>;

selected.forEach((color) => {
  color.addEventListener("click", function () {
    selected.forEach((num) => num.classList.remove("select"));
    this.classList.add("select");
  });
});

const selectedcolor = document.querySelectorAll(".selectedcolor") as NodeListOf<HTMLElement>;

selectedcolor.forEach((color) => {
  color.addEventListener("click", function () {
    selectedcolor.forEach((num) => num.classList.remove("select"));
    this.classList.add("select");
  });
});
