
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
      //document.getElementById("par").remove();
      //document.getElementById("myFile").remove();
      //document.getElementById("but").remove();
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
      //document.getElementById("par2").remove();
      //document.getElementById("myFile2").remove();
      //document.getElementById("but2").remove();
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

      //document.getElementById("par3").remove();
      //document.getElementById("myFile3").remove();
      //document.getElementById("but3").remove();

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
      //document.getElementById("par4").remove();
      //document.getElementById("myFile4").remove();
      //document.getElementById("but4").remove();
      //one4=true;
   }
   )
}

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
   .catch(err => console.error(err));

}

