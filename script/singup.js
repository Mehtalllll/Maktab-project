
let logsin=document.getElementById("singinlogin")
let username=document.getElementById("Username")
let password=document.getElementById("myInput")
const error=document.getElementById("error")

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

(()=>{
    (()=>{
        username.addEventListener("keyup",()=>{
            let passwordlength=password.value.split("").length
            let usernamelength=username.value.split("").length
            if(usernamelength>0 && passwordlength>0){
              logsin.style.backgroundColor="#212529"
              logsin.style.borderColor="#212529"
              
            }else{
              logsin.style.backgroundColor="#6f7174"
              logsin.style.borderColor="#6f7174"
            }
    })
        password.addEventListener("keyup",()=>{
            let usernamelength=username.value.split("").length
            let passwordlength=password.value.split("").length
            if(usernamelength>0 && passwordlength>0){
                logsin.style.backgroundColor="#212529"
                logsin.style.borderColor="#212529"
    
            }else{
                logsin.style.backgroundColor="#6f7174"
                logsin.style.borderColor="#6f7174"
            }
    })
    
    })()
})()

// =================================================== To to sign in


logsin.addEventListener("click", () => {
  let userobje = {
    "username":`${username.value}`,
    "password":`${password.value}`
}  

  fetch("http://localhost:3000/auth/signup", {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    method:"POST",
    body: JSON.stringify(userobje),
  })
    .then((response)=>{return response.text();   
    })
    .then((result)=>{
        if(JSON.parse(result).message && JSON.parse(result).message!=undefined){
            error.style.color="#f86c55"
            console.log(JSON.parse(result).message);
            error.innerHTML=JSON.parse(result).message
            setTimeout(()=>{error.innerHTML=""},3000)
        }else{
            error.style.color="#298f29"
            error.innerHTML="Successfully"
            setTimeout(()=>{
              window.location.href = "Login.html";
            },500)
        }

    })
    .catch((erroe) => {
      error.innerHTML=error.text()
    });
});
// =================================================== To Back button
document.getElementById("back").addEventListener("click",()=>{
  window.location.href = "index.html";
})
document.getElementById("passwordsignup").addEventListener("click",myFunction)