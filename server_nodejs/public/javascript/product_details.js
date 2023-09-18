var like=document.getElementById("like-button");

var dislike=document.getElementById("dislike-button");

  like.addEventListener("click", () =>{
    
    const node = document.createElement("div");
    const text = document.createTextNode("Thanks bro");
    node.appendChild(text);
    like.appendChild(node)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const offer = urlParams.get('offer_id')

    const endpoint = "/database/update";
    var formData = new FormData();
    formData.append("type", "prodLike");
    formData.append("offerId", offer);
    fetch(endpoint, { method: "POST", body: formData })

} );

dislike.addEventListener("click", () =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const offer = urlParams.get('offer_id')

  const endpoint = "/database/update";
  var formData = new FormData();
  formData.append("type", "prodDislike");
  formData.append("offerId", offer);
  fetch(endpoint, { method: "POST", body: formData })
  //console.log("Disliked");
});