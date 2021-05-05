     //Global vars

     const domDayObjects = document.querySelectorAll('.domDayObjects');
     const reduceWeek = document.getElementById("reduceWeek");
     const incrementWeek = document.getElementById("incrementWeek");

     let unalteredDate = new Date();
     let date = new Date();

     // Debugging
     // date.setDate(date.getDate() + 3)
     // unalteredDate.setDate(unalteredDate.getDate() + 4)


     let jsonApiEvents;
alert("Hej")
    //  window.onload = getData();

     // Fetch Data

     function getData() {
         fetch('/api/')
             .then(resp => resp.json())
             .then(data => {
                 jsonApiEvents = data;
                 calculateCurrentDay()
             }).catch((error) => {
                 console.error('Error:', error);
             });
     };




     
     // functions for manipulating and appending dom.

     function setDomDataObject(domDataObject, a) {
         date.setDate(date.getDate() + a);
             domDataObject.dataset.date = date.toLocaleString("sv-SE").slice(0, 10);
             // console.log(domJsonObjectChildren.dataset.date);
     }

     function markCurrentDay(domDataObject) {
      //Mark current local date
      if (date.getTime() === unalteredDate.getTime()) {
                 domDataObject.style.backgroundColor = "green"
             } else {
                 domDataObject.style.backgroundColor = "transparent"
             }
         }

     function cleanDomEvents(domDataObject) {
         domDataObject.innerHTML = `<div>${date.toLocaleString("sv-SE").slice(5, 10)}</div>`;
         return;
     }
    
     function alterDomData() {
         let a;
         a = 0;
         for (let domDataObject of domDayObjects) {
           setDomDataObject(domDataObject, a) 
             cleanDomEvents(domDataObject)
             markCurrentDay(domDataObject)
             a = 1;
         }
         date.setDate(date.getDate() - 6);
         return;
     }

     function appendDomData() {
         for (let domObject of domDayObjects) {
             console.log(jsonApiEvents);
             let jsonDateEvents = jsonApiEvents.filter(event => event.date === domObject.dataset.date)
             console.log(jsonDateEvents);



             for (jsonDateEvent of jsonDateEvents) {
                 let newDiv = document.createElement("div");
                 newDiv.classList.add("event");
                 newDiv.id = jsonDateEvent.id;
                 newDiv.innerHTML =
                     `<p>${jsonDateEvent.title}</p><p>Tid ${jsonDateEvent.starttime}-${jsonDateEvent.endtime}</p>`;
                 domObject.appendChild(newDiv);
             }
         }
         return
     }

     function modifyDomWeek() {
         alterDomData()
         appendDomData()
     }

     function calculateCurrentDay() {
         let validateDay = date.getDay();
         if (validateDay !== 1) {
             if (validateDay === 0) {
                 validateDay + 7;
             }
             date.setDate(date.getDate() - validateDay + 1);
         }
         modifyDomWeek()
     }



     //Events

     reduceWeek.addEventListener('click', () => {
         console.log("reduce");
         date.setDate(date.getDate() - 7);
         modifyDomWeek();
     })


     incrementWeek.addEventListener('click', () => {
         console.log("increment");
         date.setDate(date.getDate() + 7);
         modifyDomWeek();
     })