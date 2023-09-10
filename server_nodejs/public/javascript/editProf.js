var username="";


//Fetch username from server
const endpoint = "/user/credentials";
fetch(endpoint, {method: "POST"})
.then((r)=>r.json()).then((res) => {
    username = res.message;
 })
 .catch(err => console.error(err))



//Wait for the page to load and then print the credentials
window.onload = function(){
    const userField=document.getElementById("username");
    userField.setAttribute("value",username);
}