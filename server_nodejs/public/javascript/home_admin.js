//import { update } from "lodash";

//import { method } from "lodash";

/*
// Add products
const addButton=document.getElementById("addPr");
addButton.addEventListener("click",addProduct);
let one=true;
function addProduct(){
   while(one===true){
   const node1= document.createElement("p");
   node1.setAttribute("id","par");
   const textNode=document.createTextNode("Add file with new products");
   node1.appendChild(textNode);
   document.getElementById("upFile").appendChild(node1);

   const form=document.createElement("form");
   

   const input1=document.createElement("input");
   input1.setAttribute( "type","file");
   input1.setAttribute("id",'myFile') ;
   input1.setAttribute("name",'filename');
   input1.setAttribute("accept",'.json');

   const button1=document.createElement("input"); 
   button1.setAttribute("type",'button');
   button1.setAttribute("id","but");
   button1.setAttribute("value","upload");
   form.appendChild(input1);
   form.appendChild(button1);
   document.getElementById("upFile").appendChild(form);
   one=false;
   console.log(document.getElementsByName);
   }
   
  const removeButton =document.getElementById("but");
   removeButton.addEventListener("click",()=>{
      //Upload button Click
      let file = document.getElementById("myFile").files[0]
      uploadFile(file);
      updateDatabase(file.name, "addProd");
      document.getElementById("par").remove();
      document.getElementById("myFile").remove();
      document.getElementById("but").remove();
   one=true;
   }
   )
}

//Remove products

const addButton2=document.getElementById("deletePr");
addButton2.addEventListener("click",removeProduct);
let one2=true;
function removeProduct(){
  while(one2===true){
   const node2= document.createElement("p");
   node2.setAttribute("id","par2");
   const textNode2=document.createTextNode("Add file to remove products");
   node2.appendChild(textNode2);
   document.getElementById("upFile").appendChild(node2);

   const form2=document.createElement("form");
 

   const input2=document.createElement("input");
   input2.setAttribute( "type","file");
   input2.setAttribute("id",'myFile2') ;
   input2.setAttribute("name",'filename2');
   input2.setAttribute("accept",'.json');

   const button2=document.createElement("input"); 
   button2.setAttribute("type",'button');
   button2.setAttribute("id","but2");
   button2.setAttribute("value","upload");
   form2.appendChild(input2);
   form2.appendChild(button2);
   document.getElementById("upFile").appendChild(form2);
   one2=false;
  }
   const removeButton2 =document.getElementById("but2");
   removeButton2.addEventListener("click",()=>{
      //Upload button Click
      let file = document.getElementById("myFile2").files[0]
      uploadFile(file);
      updateDatabase(file.name, "deleteProd");
      document.getElementById("par2").remove();
      document.getElementById("myFile2").remove();
      document.getElementById("but2").remove();
      one2=true;
   }
   )
}


//Add supermarkets

const addButton3=document.getElementById("addSuper");
addButton3.addEventListener("click",addSuper);
let one3=true;    //TODO: Refactor "one3" variable and all other similar variables
function addSuper(){
   while(one3===true){
   const node3= document.createElement("p");
   node3.setAttribute("id","par3");
   const textNode3=document.createTextNode("Add file with new supermarkets");
   node3.appendChild(textNode3);
   document.getElementById("upFile").appendChild(node3);

   const form3=document.createElement("form"); //TODO: Add post method to form
   

   const input3=document.createElement("input");
   input3.setAttribute( "type","file");
   input3.setAttribute("id",'myFile3') ;
   input3.setAttribute("name",'filename3');
   input3.setAttribute("accept",'.json');

   const button3=document.createElement("input"); 
   button3.setAttribute("type",'button');
   button3.setAttribute("value","upload");
   button3.setAttribute("id","but3");
   form3.appendChild(input3);
   form3.appendChild(button3);
   document.getElementById("upFile").appendChild(form3);
   one3=false;
   }
   const removeButton3 =document.getElementById("but3");
   removeButton3.addEventListener("click",()=>{
      //Upload button Click
      let file = document.getElementById("myFile3").files[0]

      //Get file Name
      var fileName = document.getElementById("myFile3").value;
      console.log(fileName);

      uploadFile(file);

      //Update database from uploaded file
      updateDatabase(file.name, "addSuper");

      document.getElementById("par3").remove();
      document.getElementById("myFile3").remove();
      document.getElementById("but3").remove();

      one3=true;
   }
   )
}

//Remove supermarkets

const addButton4=document.getElementById("deleteSuper");
addButton4.addEventListener("click",deleteSuper);
let one4=true;
function deleteSuper(){
   while(one4===true){
   const node4= document.createElement("p");
   node4.setAttribute("id","par4");
   const textNode4=document.createTextNode("Add file to remove supermarkets");
   node4.appendChild(textNode4);
   document.getElementById("upFile").appendChild(node4);

   const form4=document.createElement("form");
  

   const input4=document.createElement("input");
   input4.setAttribute( "type","file");
   input4.setAttribute("id",'myFile4') ;
   input4.setAttribute("name",'filename4');
   input4.setAttribute("accept",'.json');

   const button4=document.createElement("input"); 
   button4.setAttribute("type",'button');
   button4.setAttribute("value","upload");
   button4.setAttribute("id","but4");
   form4.appendChild(input4);
   form4.appendChild(button4);
   document.getElementById("upFile").appendChild(form4);
   one4=false;
   }
   const removeButton4 =document.getElementById("but4");
   removeButton4.addEventListener("click",()=>{
      //Upload button Click
      let file = document.getElementById("myFile4").files[0]
      uploadFile(file);
      updateDatabase(file.name, "deleteSuper");
      document.getElementById("par4").remove();
      document.getElementById("myFile4").remove();
      document.getElementById("but4").remove();
      one4=true;
   }
   )
}
//Add Offers

const addButton5=document.getElementById("addOffer");
addButton5.addEventListener("click",addOffer);
let one5=true;    //TODO: Refactor "one3" variable and all other similar variables
function addOffer(){
   while(one5===true){
   const node5= document.createElement("p");
   node5.setAttribute("id","par5");
   const textNode5=document.createTextNode("Add file with new offers");
   node5.appendChild(textNode5);
   document.getElementById("upFile").appendChild(node5);

   const form5=document.createElement("form"); //TODO: Add post method to form
   

   const input5=document.createElement("input");
   input5.setAttribute( "type","file");
   input5.setAttribute("id",'myFile5') ;
   input5.setAttribute("name",'filename5');
   input5.setAttribute("accept",'.json');

   const button5=document.createElement("input"); 
   button5.setAttribute("type",'button');
   button5.setAttribute("value","upload");
   button5.setAttribute("id","but5");
   form5.appendChild(input5);
   form5.appendChild(button5);
   document.getElementById("upFile").appendChild(form5);
   one5=false;
   }
   const removeButton5 =document.getElementById("but5");
   removeButton5.addEventListener("click",()=>{
      //Upload button Click
      let file = document.getElementById("myFile5").files[0]

      //Get file Name
      var fileName = document.getElementById("myFile5").value;
      console.log(fileName);

      uploadFile(file);

      //Update database from uploaded file
      updateDatabase(file.name, "addOffer");

      document.getElementById("par5").remove();
      document.getElementById("myFile5").remove();
      document.getElementById("but5").remove();

      one5=true;
   }
   )
}
//Remove offers

const addButton6=document.getElementById("deleteOffer");
addButton6.addEventListener("click",deleteOffer);
let one6=true;
function deleteOffer(){
   while(one6===true){
   const node6= document.createElement("p");
   node6.setAttribute("id","par6");
   const textNode6=document.createTextNode("Add file to remove offers");
   node6.appendChild(textNode6);
   document.getElementById("upFile").appendChild(node6);

   const form6=document.createElement("form");
  

   const input6=document.createElement("input");
   input6.setAttribute( "type","file");
   input6.setAttribute("id",'myFile6') ;
   input6.setAttribute("name",'filename6');
   input6.setAttribute("accept",'.json');

   const button6=document.createElement("input"); 
   button6.setAttribute("type",'button');
   button6.setAttribute("value","upload");
   button6.setAttribute("id","but6");
   form6.appendChild(input6);
   form6.appendChild(button6);
   document.getElementById("upFile").appendChild(form6);
   one6=false;
   }
   const removeButton6 =document.getElementById("but6");
   removeButton6.addEventListener("click",()=>{
      //Upload button Click
      let file = document.getElementById("myFile6").files[0]
      uploadFile(file);
      updateDatabase(file.name, "deleteOffer");
      document.getElementById("par6").remove();
      document.getElementById("myFile6").remove();
      document.getElementById("but6").remove();
      one6=true;
   }
   )
}*/
function addData(message,type,bodyType) {
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

  alert('Generate User clicked!'); 
});

 const addButton = document.getElementById("addPr");
 addButton.addEventListener("click", () => addData("Add Products",1,"addProd"));
 
 const addButton2 = document.getElementById("deletePr");
 addButton2.addEventListener("click", () => addData("Delete Products",2,"deleteProd"));
 
 const addButton3 = document.getElementById("addSuper");
 addButton3.addEventListener("click", () => addData("Add Supermarkets",3,"addSuper"));

 const addButton4 = document.getElementById("deleteSuper");
 addButton4.addEventListener("click", () => addData("Delete Supermarkets",4,"deleteSuper"));


 const addButton5 = document.getElementById("addOffer");
 addButton5.addEventListener("click", () => addData("Add Offers",5,"addOfer"));

 const addButton6 = document.getElementById("deleteOffer");
 addButton6.addEventListener("click", () => addData("Delete Offers",6,"deleteOffer"));




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

