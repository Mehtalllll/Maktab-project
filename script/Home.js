
import { token } from "module";
console.log(token);

fetch("http://localhost:3000/sneaker?page=1&limit=10&search=&brands=",{
    
    // headers: {
    //     Authorization : 
    // },
    method:"GET",
})
.then((Response)=>{
    return Response.text()
})
.then((result)=>{
    console.log(JSON.parse(result));
    
})