var like=document.getElementById("like-button");

var dislike=document.getElementById("dislike-button");

  like.addEventListener("click", () =>{
    
    const node = document.createElement("div");
    const text = document.createTextNode("Thanks bro");
    node.appendChild(text);
    like.appendChild(node)

} );