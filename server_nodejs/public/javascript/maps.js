

var map = L.map('map').setView([38.246639,21.734573],40);

var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

L.marker([ 38.245985579010124, 21.733685269781077]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.');


var redIcon = L.icon({
   iconUrl: 'img/red-marker.png',
iconSize:[40,40]
});
   const jasonPath="./jason/supermarket.json"

     

    
     
         
    const myList = document.querySelector("ul[class='supermarkets']");
        fetch(jasonPath)
         .then((response) =>{
            if (!response.ok) {
               throw new Error(`HTTP error, status = ${response.status}`);
             }

             return response.json();

         })
         .then((data)=>{
            for (const stores of data.elements) {
               
             //  con.query("INSERT INTO store (store_id,store_name,store_lat,store_lon) VALUES (stores.id,stores.tags.name,stores.lat,stores.lon");
                
               //const listItem = document.createElement("li");
             //  listItem.textContent=`${product.lat} ${product.lon} ` ;
             if(stores.tags.name){
               L.marker([stores.lat,stores.lon],{icon:redIcon}).addTo(map).bindPopup('Supermarket'+' '+stores.tags.name);}
              // myList.appendChild(listItem);
            }

         }
         )
         .catch((error) => {
            const p = document.createElement("p");
            p.appendChild(document.createTextNode(`Error: ${error.message}`));
            document.body.insertBefore(p, myList);
          }); 
         
          
        

         