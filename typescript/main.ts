import "./style.css";


let slid1 = document.getElementById("_slid-1") as HTMLElement;
let slid2 = document.getElementById("_slid-2") as HTMLElement;
let slid3 = document.getElementById("_slid-3") as HTMLElement;

if (slid1 && slid2 && slid3) {
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
}

const nextButton = document.getElementById("nextbt") as HTMLButtonElement;
const scrollElement = document.getElementById("scroll");

if (nextButton && scrollElement) {
  nextButton.addEventListener("click", () => {
    scrollElement.scrollTo(500, 0);
    if (slid1 && slid2 && slid3) {
      slid1.style.backgroundColor = "#808080";
      slid2.style.backgroundColor = "#000000";
      slid3.style.backgroundColor = "#808080";
    }

    nextButton.addEventListener("click", () => {
      scrollElement.scrollTo(1000, 0);
      if (slid1 && slid2 && slid3) {
        slid1.style.backgroundColor = "#808080";
        slid2.style.backgroundColor = "#808080";
        slid3.style.backgroundColor = "#000000";
      }
      nextButton.textContent = "Get Started";
      nextButton.outerHTML = `<a href="Login.html" class="w-ws flex justify-center">${nextButton.outerHTML}</a>`;
    });
  });
}
