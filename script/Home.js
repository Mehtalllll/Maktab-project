const token=window.localStorage.getItem("token");
    

    fetch(`http://localhost:3000/sneaker?page=1&limit=10`,{
    
        headers: {
            Authorization : token
        },
        method:"GET",
    })
    .then((Response)=>{
        return Response.text()
    })
    .then((result)=>{
        let carddata=JSON.parse(result)
         console.log(carddata);
         
        for (let i = 0; i <=carddata.perPage ; i++) {
            const cardBox= document.getElementById("card-box")
            
            cardBox.innerHTML+=`<div id="${carddata.data.id}" class="flex flex-col gap-y-3">
                         <div class="w-[182px] h-[182px] bg-[#f3f3f3] rounded-3xl relative">
                             <img class="absolute top-5 left-5 w-[142px] h-[142px]" src="${carddata.data[i].imageURL}">
                         </div>
                         <p class="font-inter font-bold text-xl leading-6 truncate">${carddata.data[i].name}</p>
                         <p class="font-inter font-semibold text-base leading-4">$ ${carddata.data[i].price}</p>
                         </div>`
             
         }
        })
            


