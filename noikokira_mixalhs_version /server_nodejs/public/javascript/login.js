const toggle = document.querySelector("#toggle");
const pass = document.querySelector("#password");

toggle.addEventListener("click",toggleFunc);

function toggleFunc(){
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
}

