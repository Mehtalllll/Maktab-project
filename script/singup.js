import axios from "axios"
// ===================================================value
let logsin=document.getElementById("singinlogin")
let usernameInput=document.getElementById("Username")
let passwordInput=document.getElementById("myInput")
const errorthrow=document.getElementById("error")

// ===================================================Function for paswor visibility

function myFunction() {
    let x = document.getElementById("myInput");
    let eye=document.getElementById("eye");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    if(eye.style.opacity === "1"){
        eye.style.opacity=".5";
    } else {
        eye.style.opacity="1";
      }
  }

// ===================================================Function To manage not being empty
(() => {
  (() => {
    if ((usernameInput, passwordInput)) {
      usernameInput.addEventListener("keyup", () => {
        let passwordlength = passwordInput.value.split("").length;
        let usernamelength = usernameInput.value.split("").length;
        if (usernamelength > 0 && passwordlength > 0) {
          logsin.style.backgroundColor = "#212529";
          logsin.style.borderColor = "#212529";
        } else {
          logsin.style.backgroundColor = "#6f7174";
          logsin.style.borderColor = "#6f7174";
        }
      });
      passwordInput.addEventListener("keyup", () => {
        let usernamelength = usernameInput.value.split("").length;
        let passwordlength = passwordInput.value.split("").length;
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
})();

// =================================================== To to sign in
let userobje = {};
logsin.addEventListener("click", () => {
  console.log("booos");
  
  userobje = {
    username: `${usernameInput.value}`,
    password: `${passwordInput.value}`,
  };
  singupresponse(userobje);
});

async function singupresponse(data) {
  try {
    const response = await axios.post(`http://localhost:3000/auth/signup`, data);
    setTimeout(()=>{
                    window.location.href = "Login.html"
                  },1000)
    throw "successfully"
  } catch (error) {
    console.log(error);
    
    if(error=="successfully"){
      errorthrow.innerHTML = `<div class="errorClick py-2 px-2 rounded-lg bg-green-600 text-white  cursor-pointer opacity-30 hover:opacity-100 animate-fade">successfully</div>`;
    }
    
      if(error.response.data.message){
        if(Array.isArray(error.response.data.message)==true){
    error.response.data.message.forEach(element => {
      errorthrow.innerHTML += `<div class="errorClick py-2 px-2 rounded-lg bg-red-600 text-white  cursor-pointer opacity-30 hover:opacity-100 animate-fade">${element}</div>`;
    });
     }
        if(Array.isArray(error.response.data.message)==false){
          errorthrow.innerHTML = `<div class="errorClick py-2 px-2 rounded-lg bg-red-600 text-white  cursor-pointer opacity-30 hover:opacity-100 animate-fade">${error.response.data.message}</div>`;
     }
    }

        const errorItem=document.querySelectorAll(".errorClick")
        errorItem.forEach(item=>{
          item.addEventListener("click",()=>{
            item.outerHTML=""
          })
        })
        setTimeout(()=>{errorthrow.innerHTML=""},5000)
  }
}
// =================================================== To Back button
document.getElementById("back").addEventListener("click",()=>{
  window.location.href = "index.html";
})
document.getElementById("passwordsignup").addEventListener("click",myFunction)