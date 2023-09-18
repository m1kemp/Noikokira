//import { update } from "lodash";

//import { method } from "lodash";



//-------------MAP-----------------------
var map = L.map('map').setView([38.246639,21.734573],40);

let formCreated=false;
let markers = [];

var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);


var redIcon = L.icon({
   iconUrl: 'img/red-marker.png',
   iconSize:[40,40]
});
function getData1(type){
  var formData = new FormData();
  const endpoint = "/database/get";
  formData.append("type", type);

  fetch(endpoint, {method: "POST", body: formData})
  .then((r)=>r.json()).then((res) => {
     var jsonData = res.message;
     for (let i = 0; i < jsonData.length; i++){
        const dArr = [jsonData[i].store_name, jsonData[i].store_lat,jsonData[i].store_lon];
        var marker = L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).bindPopup('Supermarket'+' '+jsonData[i].store_name).on('click', function(evt){clickStore(dArr);}).addTo(map);
        markers.push(marker);
     }
  })
  .catch(err => console.error(err))
}
function createDataForm(dArr) {
   // Clear element
   document.getElementById("upFile").innerHTML = "";
   document.getElementById("upFile").style.marginRight = "400px";
   const node = document.createElement("div");
   node.classList.add("offer-container"); // Apply the offer container style
 
   const titleNode = document.createElement("div");
   titleNode.classList.add("offer-title"); // Apply the offer title style
   const titleText = document.createTextNode(dArr[0] + " Offers");
   titleNode.appendChild(titleText);
 
   node.appendChild(titleNode);
 
   const ulTag = document.createElement("ul");
 
   endpoint = "/database/search";
 
   var formData = new FormData();
   formData.append("type", "offer");
   formData.append("sName", dArr[0]);
   formData.append("lat", dArr[1]);
   formData.append("lon", dArr[2]);
   
   fetch(endpoint, { method: "POST", body: formData })
     .then((r) => r.json())
     .then((res) => {
       var jsonData = res.message[0];
       console.log(jsonData);
       var button = document.createElement("input");
       button.setAttribute("type","button")
       button.setAttribute("id","button");
       button.setAttribute("value","Create new offer");
       
       var  butDel=document.createElement("input");
       butDel.setAttribute("type","button")
       butDel.setAttribute("id","delBut");
       butDel.setAttribute("value","  Delete offer   ");

       for (var i = 0; i < jsonData.length; i++) {
         var liTag = document.createElement("li");
         var linkTag = document.createElement("a");
         var price=jsonData.price;
        
           

         var itemName = encodeURIComponent(jsonData[i].item_name);
         var priceComp = encodeURIComponent(jsonData[i].price);
         var idComp = encodeURIComponent(jsonData[i].item_id);
         linkTag.href = `/product/detail?itemName=${itemName}&price=${priceComp}&item_id=${idComp}`;
         linkTag.target = "_blank";
        
         linkTag.appendChild(
           document.createTextNode(
            
             "Product: " + jsonData[i].item_name + " Price: -" +price
           )
         );

         liTag.appendChild(linkTag);
         ulTag.appendChild(liTag);
       }
 
       const detailsNode = document.createElement("div");
       detailsNode.classList.add("offer-details"); // Apply the offer details style
       detailsNode.appendChild(ulTag);
       
 
       node.appendChild(detailsNode);
       node.appendChild(button);
       node.appendChild(butDel);
       document.getElementById("upFile").appendChild(node);
       button.addEventListener("click", () =>{
         location.href="/offer/create"
     } );
     delBut.addEventListener("click", () =>{
      location.href="/offer/delete"
  } );

     })
 
     .catch((error) => {
       console.error("Error:", error);
     });
 }





function clickStore(storeName){
   createDataForm(storeName);
}


   //Fetch data from backend
function getData(type){
   var formData = new FormData();
   const endpoint = "/database/get";
   formData.append("type", type);

   fetch(endpoint, {method: "POST", body: formData})
   .then((r)=>r.json()).then((res) => {
      var jsonData = res.message;
      for (let i = 0; i < jsonData.length; i++){
         const dArr = [jsonData[i].store_name, jsonData[i].store_lat,jsonData[i].store_lon];
         var marker = L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).bindPopup('Supermarket'+' '+jsonData[i].store_name).on('click', function(evt){clickStore(dArr);}).addTo(map);
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

let formCreated1 = false;
const marketButton= document.getElementById("searchSuper");
marketButton.addEventListener("click",()=> {
   if(!formCreated1)
   find("Search Supermarkets")
   //formCreated1=true;
});

const productButton=document.getElementById("searchPr");
productButton.addEventListener("click",()=>{
   if(!formCreated1){
      find("Search Products")
      //formCreated1=true;
   }
});

function find(message){
   //Clear element
   document.getElementById("upFile").innerHTML="";

   const node=document.createElement("p");
   node.setAttribute("id","superText");
        
   const textNode=document.createTextNode(` ${message}`);

   node.appendChild(textNode);

   document.getElementById("upFile").appendChild(node);

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
      
   document.getElementById("upFile").appendChild(form);

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
               const dArr = [jsonData[i].store_name, jsonData[i].store_lat, jsonData[i].store_lon];
               var marker = L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).bindPopup('Supermarket'+' '+jsonData[i].store_name + " Product: " + jsonData[i].item_name).on('click', function(evt){clickStore(dArr);}).addTo(map);
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
         var jsonData = res.message[0];
         var jsonData = res.message[0];
         console.log(jsonData[0]);
         clearAllMarkers();
         for(var i = 0; i<jsonData.length; i++){
            const dArr = [jsonData[i].store_name, jsonData[i].store_lat,jsonData[i].store_lon];
            var marker = L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).bindPopup('Supermarket'+' '+jsonData[i].store_name + " Product: " + jsonData[i].item_name).on('click', function(evt){clickStore(dArr);}).addTo(map);
            markers.push(marker);
         }
      })
  
      .catch((error) => {
         console.error("Error:", error);
      });
   }); 
}
















// ----------FUNCTION FOR ADD , DELETE SUPERMARKET ,DATA---------------------
function addData(message,type,bodyType) {
   document.getElementById("upFile").innerHTML = "";
   const node = document.createElement("p");
   node.setAttribute("id", `par${type}`);
   node.setAttribute("class", `par1`);
   const textNode = document.createTextNode(` ${message}`);
   node.appendChild(textNode);
   document.getElementById("upFile").appendChild(node);
 
   const form = document.createElement("form");
 
   const input = document.createElement("input");
   input.setAttribute("type", "file");
   input.setAttribute("id", `myFile${type}`);
   input.setAttribute("class", `myFile1`);
   input.setAttribute("name", `filename${type}`);
   input.setAttribute("accept", ".json");
 
   const button = document.createElement("input");
   button.setAttribute("type", "button");
   button.setAttribute("id", `but${type}`);
   button.setAttribute("class", `but1`);
   button.setAttribute("value", "upload");
   form.appendChild(input);
   form.appendChild(button);
   document.getElementById("upFile").appendChild(form);
 
   let one = true;
 
   const removeButton = document.getElementById(`but${type}`);
   removeButton.addEventListener("click", () => {
     let file = document.getElementById(`myFile${type}`).files[0];
     uploadFile(file);
     updateDatabase(file.name, `${bodyType}`);
     document.getElementById(`par${type}`).remove();
     document.getElementById(`myFile${type}`).remove();
     document.getElementById(`but${type}`).remove();
     one = true;
     formCreated1=false;
   });
 }
const offerLink = document.getElementById("offer");
offerLink.addEventListener("click",function(event){
   event.preventDefault();
   const endpoint = "/offer/generate";
   fetch(endpoint, {method: "post"});
 })


const genLink = document.getElementById('gen');
genLink.addEventListener('click', function(event) {
  event.preventDefault();
  const endpoint = "/user/generate";
  fetch(endpoint, {method: "post"});
});

 const addButton = document.getElementById("addPr");
 addButton.addEventListener("click", () =>{

 addData("Add Products",1,"addProd")}
 
 );

 
 const addButton2 = document.getElementById("deletePr");
 addButton2.addEventListener("click", () => {

  addData("Delete Products",2,"deleteProd")}

  );
 
 const addButton3 = document.getElementById("addSuper");
 addButton3.addEventListener("click", () => {

  addData("Add Supermarkets",3,"addSuper")}

);

 const addButton4 = document.getElementById("deleteSuper");
 addButton4.addEventListener("click", () => {

    addData("Delete Supermarkets",4,"deleteSuper")}
  
    );


 const addButton5 = document.getElementById("addOffer");
 addButton5.addEventListener("click", () =>{

  addData("Add Offers",5,"addOfer")}
 );

 const addButton6 = document.getElementById("deleteOffer");
 addButton6.addEventListener("click", () =>{
  addData("Delete Offers",6,"deleteOffer")}
 );




function uploadFile(file){
   let formData = new FormData();
   const endpoint = "/upload";
   
   formData.append("file", file);
   fetch(endpoint, {method: "POST", body: formData})
   
   .then(json => console.log(json))
   .catch(err => console.error(err));
   alert('File Uploaded');
   
}

function updateDatabase(fileName, type){
   let formData= new FormData();
   const endpoint = "/database/update";

   formData.append("fileName", fileName)
   formData.append("type", type);

   fetch(endpoint, {method: "POST", body: formData})
   .catch(err => console.error(b));

}

