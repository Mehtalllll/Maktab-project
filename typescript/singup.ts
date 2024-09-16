import axios from "axios";

// ===================================================value
let logsin = document.getElementById("singinlogin") as HTMLButtonElement | null;
let usernameInput = document.getElementById("Username") as HTMLInputElement | null;
let passwordInput = document.getElementById("myInput") as HTMLInputElement | null;
const errorthrow = document.getElementById("error") as HTMLElement | null;

// ===================================================Function for password visibility
function myFunction() {
    const x = document.getElementById("myInput") as HTMLInputElement | null;
    const eye = document.getElementById("eye") as HTMLElement | null;
    
    if (x && eye) {
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
}

// ===================================================Function To manage not being empty
(() => {
    (() => {
        if (usernameInput && passwordInput && logsin) {
            const updateButtonState = () => {
                const passwordlength = passwordInput.value.length;
                const usernamelength = usernameInput.value.length;

                if (usernamelength > 0 && passwordlength > 0) {
                    logsin.style.backgroundColor = "#212529";
                    logsin.style.borderColor = "#212529";
                } else {
                    logsin.style.backgroundColor = "#6f7174";
                    logsin.style.borderColor = "#6f7174";
                }
            };

            usernameInput.addEventListener("keyup", updateButtonState);
            passwordInput.addEventListener("keyup", updateButtonState);
        }
    })();
})();

// =================================================== To sign in
interface UserObject {
    username: string;
    password: string;
}

let userobje: UserObject = { username: '', password: '' };

if (logsin) {
    logsin.addEventListener("click", () => {
        if (usernameInput && passwordInput) {
            userobje = {
                username: usernameInput.value,
                password: passwordInput.value,
            };
            singupresponse(userobje);
        }
    });
}

async function singupresponse(data: UserObject) {
    try {
        const response = await axios.post(`http://localhost:3000/auth/signup`, data);
        setTimeout(() => {
            window.location.href = "Login.html";
        }, 1000);
        throw "successfully";
    } catch (error: any) {
        console.log(error);

        if (error === "successfully" && errorthrow) {
            errorthrow.innerHTML = `<div class="errorClick py-2 px-2 rounded-lg bg-green-600 text-white cursor-pointer opacity-30 hover:opacity-100 animate-fade">successfully</div>`;
        }

        if (error?.response?.data?.message && errorthrow) {
            if (Array.isArray(error.response.data.message)) {
                error.response.data.message.forEach((element: string) => {
                    errorthrow!.innerHTML += `<div class="errorClick py-2 px-2 rounded-lg bg-red-600 text-white cursor-pointer opacity-30 hover:opacity-100 animate-fade">${element}</div>`;
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

        if (errorthrow) {
            setTimeout(() => { errorthrow.innerHTML = ""; }, 5000);
        }
    }
}

// =================================================== To Back button
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("passwordsignup")?.addEventListener("click", myFunction);
