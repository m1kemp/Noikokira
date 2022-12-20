var map = L.map('map').setView([38.246639,21.734573],40);

var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

L.marker([ 38.245985579010124, 21.733685269781077]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.');


var redIcon = L.icon({
   iconUrl: 'red-marker.png',
iconSize:[40,40]
});
    

     

     fetch("./supermarket.json")
         .then((response) =>response.json())
         .then((json)=>console.log(json));
     
         

    const myList = document.querySelector("ul");
        fetch("./supermarket.json")
         .then((response) =>{
            if (!response.ok) {
               throw new Error(`HTTP error, status = ${response.status}`);
             }

             return response.json();

         })
         .then((data)=>{
            for (const product of data.elements) {
               const listItem = document.createElement("li");
               listItem.textContent=`${product.lat} ${product.lon} ` ;
               L.marker([product.lat,product.lon],{icon:redIcon}).addTo(map).bindPopup('Supermarket'+' '+product.tags.name);
               myList.appendChild(listItem);}

         }
         )
         .catch((error) => {
            const p = document.createElement("p");
            p.appendChild(document.createTextNode(`Error: ${error.message}`));
            document.body.insertBefore(p, myList);
          }); 
         
          
        

         