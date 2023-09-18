var like=document.getElementById("like-button");

var dislike=document.getElementById("dislike-button");

  like.addEventListener("click", () =>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('itemName')
    //TODO:Add functionality for offer like and dislike
    console.log(product);

} );

dislike.addEventListener("click", () =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('itemName')
  //TODO:Add functionality for offer like and dislike
  console.log(product);
});