var username="";
var password="";
var email="";

//Fetch username from server
const endpoint = "/user/credentials";
fetch(endpoint, {method: "POST"})
.then((r)=>r.json()).then((res) => {
    email = res.message[0];
    username = res.message[1];
    password = res.message[2];

 })
 .catch(err => console.error(err))



//Wait for the page to load and then print the credentials
window.onload = function(){
    //Set username
    const userField=document.getElementById("username");
    userField.setAttribute("value",username);

    //Set email
    const emailField=document.getElementById("email");
    emailField.setAttribute("value",email);

    //Set password
    const passField=document.getElementById("password");
    passField.setAttribute("value",email);
}