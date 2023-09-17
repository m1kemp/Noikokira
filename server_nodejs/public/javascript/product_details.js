var like=document.getElementById("like-button");

var dislike=document.getElementById("dislike-button");

  like.addEventListener("click", () =>{
    
    const node = document.createElement("div");
    const text = document.createTextNode("Thanks bro");
    node.appendChild(text);
    like.appendChild(node)

} );

dislike.addEventListener("click", () =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('price')
  //TODO:Add functionality for offer like and dislike
  console.log(product);
});