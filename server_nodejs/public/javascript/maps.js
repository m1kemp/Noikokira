

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

   
   //Fetch data from backend
   function getData(type){
      var formData = new FormData();
      const endpoint = "/database/get";

      formData.append("type", type);

      fetch(endpoint, {method: "POST", body: formData})
      .then((r)=>r.json()).then((res) => {
         var jsonData = res.message;
         for (let i = 0; i < jsonData.length; i++){
            L.marker([jsonData[i].store_lat,jsonData[i].store_lon],{icon:redIcon}).addTo(map).bindPopup('Supermarket'+' '+jsonData[i].store_name);
         }
      })
      .catch(err => console.error(err))
   }

   getData("super");

   /*
   //Data file name
   const jasonPath="./jason/supermarket.json"
   
   //For supermarkets
   const myList = document.querySelector("ul[class='supermarkets']");

   //Fetch file from server
   fetch(jasonPath)
   .then((response) =>{
        if (!response.ok) {
           throw new Error(`HTTP error, status = ${response.status}`);
        }

             return response.json();

         })

   //Loop on data and create markers on valid data points
   .then((data)=>{
      for (const stores of data.elements) {
         if(stores.tags.name){
            L.marker([stores.lat,stores.lon],{icon:redIcon}).addTo(map).bindPopup('Supermarket'+' '+stores.tags.name);
         }
         // myList.appendChild(listItem);
         }

      })
      .catch((error) => {
         const p = document.createElement("p");
         p.appendChild(document.createTextNode(`Error: ${error.message}`));
         document.body.insertBefore(p, myList);
      }); 
      */
         
          
        

         