import axios from "axios";

// =================================================== Function for password visibility
const logsin = document.getElementById("singinlogin") as HTMLElement;
const usernameInput = document.getElementById("Username") as HTMLInputElement;
const passwordInput = document.getElementById("myInput") as HTMLInputElement;
const errorthrow = document.getElementById("error") as HTMLElement;
const backbut = document.getElementById("back") as HTMLElement;
const passwordlogin = document.getElementById("passwordlogin") as HTMLElement;

// =================================================== Function for password visibility
function myFunction(): void {
  const x = document.getElementById("myInput") as HTMLInputElement;
  const eye = document.getElementById("eye") as HTMLElement;

  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

  if (eye.style.opacity === "1") {
    eye.style.opacity = ".5";
  } else {
    eye.style.opacity = "1";
  }
}

// =================================================== Function To manage not being empty
(() => {
  if (usernameInput && passwordInput) {
    usernameInput.addEventListener("keyup", () => {
      const passwordlength = passwordInput.value.length;
      const usernamelength = usernameInput.value.length;
      if (usernamelength > 0 && passwordlength > 0) {
        logsin.style.backgroundColor = "#212529";
        logsin.style.borderColor = "#212529";
      } else {
        logsin.style.backgroundColor = "#6f7174";
        logsin.style.borderColor = "#6f7174";
      }
    });

    passwordInput.addEventListener("keyup", () => {
      const usernamelength = usernameInput.value.length;
      const passwordlength = passwordInput.value.length;
      if (usernamelength > 0 && passwordlength > 0) {
        logsin.style.backgroundColor = "#212529";
        logsin.style.borderColor = "#212529";
      } else {
        logsin.style.backgroundColor = "#6f7174";
        logsin.style.borderColor = "#6f7174";
      }
    });
  }
})();

// =================================================== To Login
interface UserObject {
  username: string;
  password: string;
}

let userobje: UserObject = { username: '', password: '' };

logsin.addEventListener("click", () => {
  userobje = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  loginresponse(userobje);
});

async function loginresponse(data: UserObject): Promise<void> {
  try {
    const response = await axios.post(`http://localhost:3000/auth/login`, data);
    window.localStorage.setItem("token", response.data.token);
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
    throw "successfully";
  } catch (error: any) {
    console.log(error);

    if (error === "successfully") {
      errorthrow.innerHTML = `<div class="errorClick py-2 px-2 rounded-lg bg-green-600 text-white cursor-pointer opacity-30 hover:opacity-100 animate-fade">successfully</div>`;
    }

    if (error.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((element: string) => {
          errorthrow.innerHTML += `<div class="errorClick py-2 px-2 rounded-lg bg-red-600 text-white cursor-pointer opacity-30 hover:opacity-100 animate-fade">${element}</div>`;
        });
      } else {
        errorthrow.innerHTML = `<div class="errorClick py-2 px-2 rounded-lg bg-red-600 text-white cursor-pointer opacity-30 hover:opacity-100 animate-fade">${error.response.data.message}</div>`;
      }
    }

    const errorItems = document.querySelectorAll(".errorClick");
    errorItems.forEach((item) => {
      item.addEventListener("click", () => {
        item.outerHTML = "";
      });
    });

    setTimeout(() => {
      errorthrow.innerHTML = "";
    }, 5000);
  }
}

// =================================================== To Back button
if (backbut) {
  backbut.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (passwordlogin) {
  passwordlogin.addEventListener("click", myFunction);
}
