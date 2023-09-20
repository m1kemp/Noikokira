const prodForm = document.getElementById("product_name");
const superForm = document.getElementById("superName");



var myElement = document.getElementById("myElement");
var user_id = myElement.getAttribute("data-user-id");
console.log("User ID:", user_id);

class offer{
   constructor(item_id, store_id, price){
      this.item_id = item_id;
      this.store_id = store_id;
      this.price = price;
   }
}

var selectedOffer = new offer("-", "-", -1);

prodForm.oninput = async function(){
    // Get the user's input value
    var message = "Search Products";
    const userInput = prodForm.value;

    // Now you can use userInput for further processing or submit it to the server
    // Example: Send userInput to the server using fetch or AJAX
    endpoint = "/database/search";

    var formData = new FormData();
    if(message == "Search Supermarkets"){
       //Send super to get supermarkets
       formData.append("type", "supernd");
    }else if(message == "Search Products"){
       formData.append("type", "prodAll");
    }


    formData.append("term", userInput);
    const controller = new AbortController();
    const id = setTimeout(()=> controller.abort(), 2000);
    await fetch(endpoint, {method: "POST", body: formData, timeout: 2000, signal:controller.signal})
       .then((r)=>r.json()).then((res) => {
          var jsonData = res.message[0];
          if(userInput!="" && jsonData[0] != undefined){
            document.getElementById("suggestionProd").innerHTML = jsonData[0].item_name;
            if(jsonData.length == 1){
               document.getElementById("suggestionProd").style.color = "green";
               selectedOffer.item_id = jsonData[0].item_id;

            }else{
               document.getElementById("suggestionProd").style.color = "black";
               selectedOffer.item_id = "";
            }
          }else{
            document.getElementById("suggestionProd").innerHTML = "";
            selectedOffer.item_id = "";
          }
       })
   
       .catch((error) => {
          console.error("Error:", error);
       });
       clearTimeout(id);

 };

superForm.oninput = async function(){
    // Get the user's input value
    var message = "Search Supermarkets";
    const userInput = superForm.value;

    // Now you can use userInput for further processing or submit it to the server
    // Example: Send userInput to the server using fetch or AJAX
    endpoint = "/database/search";

    var formData = new FormData();
    if(message == "Search Supermarkets"){
       //Send super to get supermarkets
       formData.append("type", "supernd");
    }else if(message == "Search Products"){
       formData.append("type", "prod");
    }


    formData.append("term", userInput);
    const controller = new AbortController();
    const id = setTimeout(()=> controller.abort(), 2000);
    await fetch(endpoint, {method: "POST", body: formData, timeout: 2000, signal:controller.signal})
       .then((r)=>r.json()).then((res) => {
          var jsonData = res.message[0];
          if(userInput!="" && jsonData[0] != undefined){
            document.getElementById("suggestionSuper").innerHTML = jsonData[0].store_name;
            console.log(jsonData);
            if(jsonData.length == 1){
               document.getElementById("suggestionSuper").style.color = "green";
               selectedOffer.store_id = jsonData[0].store_id;
               
            }else{
               document.getElementById("suggestionSuper").style.color = "black";
               selectedOffer.store_id = "";
            }
          }else{
            document.getElementById("suggestionSuper").innerHTML = "";
            selectedOffer.store_id = "";
          }
       })
   
       .catch((error) => {
          console.error("Error:", error);
       });
       clearTimeout(id);

 };


 const priceInput = document.getElementById("price");
   priceInput.oninput = function(){
      //Only accept positive numbers
      if(priceInput.value <= 0){
         priceInput.value = 0;
         priceInput.style.color = "red";
         selectedOffer.price = 0;
      }
      else{
         priceInput.style.color = "black";
         selectedOffer.price = priceInput.value;
      }
   }

const button = document.getElementById("submitOffer");
button.addEventListener("click", () =>{
   var user_id = "";
   //Check if all the field have been correctly filled
   if(selectedOffer.item_id != "" && selectedOffer.store_id != "" && selectedOffer.price != 0){
      fetch("/user/credentials", { method: "POST", body: formData })
     .then((r) => r.json())
     .then((res) => {user_id = res.message[3]});
      //console.log(user_id);
      const endpoint="/database/update";
      var formData = new FormData();
      formData.append("type", "addOffer");
      //formData.append("queryValues", [0, 0, selectedOffer.price, selectedOffer.item_id, selectedOffer.store_id, user_id]);
      formData.append("price", selectedOffer.price);
      formData.append("item_id", selectedOffer.item_id);
      formData.append("store_id", selectedOffer.store_id);
      formData.append("user_id", 1);
      fetch(endpoint, { method: "POST", body: formData});
   } 
});
