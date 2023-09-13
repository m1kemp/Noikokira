

var map = L.map('map').setView([38.246639,21.734573],40);


let markers = [];

var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);


var redIcon = L.icon({
   iconUrl: 'img/red-marker.png',
   iconSize:[40,40]
});

   
   //Fetch data from backend
function getData(type){
   var formData = new FormData();
   const endpoint = "/database/get";
   formData.append("type", type);

   fetch(endpoint, {method: "POST", body: formData})
   .then((r)=>r.json()).then((res) => {
      var jsonData = res.message;
      for (let i = 0; i < jsonData.length; i++){
         var marker = L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).bindPopup('Supermarket'+' '+jsonData[i].store_name).addTo(map);
         markers.push(marker);
      }
   })
   .catch(err => console.error(err))
}

function clearAllMarkers(){
   for(var i = 0; i < markers.length; i++){
      markers[i].remove();
   }
   markers = [];
}

getData("super");
let formCreated = false;
const marketButton= document.getElementById("supermarkets");
marketButton.addEventListener("click",()=> {
   if(!formCreated)
   find("Search Supermarkets")
   formCreated=true;
});

const productButton=document.getElementById("products");
productButton.addEventListener("click",()=>{
   if(!formCreated){
      find("Search Products")
      formCreated=true;
   }
});

function find(message){
   const node=document.createElement("p");
   node.setAttribute("id","superText");
        
   const textNode=document.createTextNode(` ${message}`);

   node.appendChild(textNode);

   document.getElementById("finder").appendChild(node);

   const form=document.createElement("form");
   const input=document.createElement("input");
   input.setAttribute("type","search");
   input.setAttribute("id","superInput");
   const button=document.createElement("input");
   button.setAttribute("type","submit");
   button.setAttribute("id","superButton");
   button.setAttribute("value","search");

      

      
   form.appendChild(input);
   form.appendChild(button);
      
   document.getElementById("finder").appendChild(form);

   //Trigger event on user type change
   document.getElementById("superInput").oninput = async function(){
      // Get the user's input value
      const userInput = input.value;
 
      // Now you can use userInput for further processing or submit it to the server
      // Example: Send userInput to the server using fetch or AJAX
      endpoint = "/database/search";

      var formData = new FormData();
      if(message == "Search Supermarkets"){
         //Send super to get supermarkets
         formData.append("type", "super");
      }else if(message == "Search Products"){
         formData.append("type", "prod");
      }

      formData.append("term", userInput);
      const controller = new AbortController();
      const id = setTimeout(()=> controller.abort(), 2000);
      await fetch(endpoint, {method: "POST", body: formData, timeout: 2000, signal:controller.signal})
         .then((r)=>r.json()).then((res) => {
            var jsonData = res.message[0];
            //Repeat above loop amd copy the code to the button event (below)
            console.log(jsonData[0]);
            clearAllMarkers();
            for(var i = 0; i<jsonData.length; i++){
               var marker = L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).bindPopup('Supermarket'+' '+jsonData[i].store_name + " Product: " + jsonData[i].item_name).addTo(map);
               markers.push(marker);
            }
         })
     
         .catch((error) => {
            console.error("Error:", error);
         });
         clearTimeout(id);
   }

   form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
 
      // Get the user's input value
      const userInput = input.value;
 
      // Now you can use userInput for further processing or submit it to the server
      // Example: Send userInput to the server using fetch or AJAX
      endpoint = "/database/search";

      var formData = new FormData();
      if(message == "Search Supermarkets"){
         //Send super to get supermarkets
         formData.append("type", "super");
      }else if(message == "Search Products"){
         formData.append("type", "prod");
      }

      formData.append("term", userInput);

      fetch(endpoint, {method: "POST", body: formData})
      .then((r)=>r.json()).then((res) => {
         var jsonData = res.message;
         //Repeat above loop amd copy the code to the button event (below)
         console.log(jsonData);
      })
  
      .catch((error) => {
         console.error("Error:", error);
      });
   }); 
}
         

         