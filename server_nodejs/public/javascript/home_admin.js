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








getData1("super");


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
     formCreated=false;
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

