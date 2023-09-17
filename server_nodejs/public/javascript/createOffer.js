const prodForm = document.getElementById("product_name");
const superForm = document.getElementById("superName");

prodForm.oninput = async function(){
    // Get the user's input value
    var message = "Search Products";
    console.log(message);
    const userInput = prodForm.value;

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
          if(userInput!=""){
            document.getElementById("suggestionProd").innerHTML = jsonData[0].item_name;
          }else{
            document.getElementById("suggestionProd").innerHTML = "";
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
    console.log(message);
    const userInput = superForm.value;

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
          if(userInput!=""){
            document.getElementById("suggestionSuper").innerHTML = jsonData[0].store_name;
          }else{
            document.getElementById("suggestionSuper").innerHTML = "";
          }
       })
   
       .catch((error) => {
          console.error("Error:", error);
       });
       clearTimeout(id);

 };


var button = document.getElementById("submitOffer");

button.addEventListener("click", () =>{
    console.log(prodForm.getAttribute("value"));  
});
