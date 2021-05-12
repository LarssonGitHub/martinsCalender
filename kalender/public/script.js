window.onload = getData();

//Global Dom vars

const domDayObjects = document.querySelectorAll('.domDayObjects');
const containerWeekDay = document.querySelectorAll('.containerWeekDay');
const reduceWeek = document.getElementById('reduceWeek');
const incrementWeek = document.getElementById('incrementWeek');
const postForm = document.getElementById('postForm');
const putForm = document.getElementById('EditForm');
const editContainer = document.getElementById('editContainer');
const deleteEvent = document.getElementById('deleteEvent');
const closeEditContainerBtn = document.getElementById('closeEditContainerBtn');
const closePostContainerBtn = document.getElementById('closePostContainerBtn');
const postDataEventBtn = document.getElementById('postDataEventBtn');
const postContainer = document.getElementById('postContainer');
const fullDateHeading = document.getElementById('fullDateHeading');

//global Date 
let unalteredDate = new Date();
let date = new Date();

// Array for days
const calenderDays = ["SÖNDAG", "MÅNDAG", "TISDAG", "ONSDAG", "TORSDAG", "FREDAG", "LÖRDAG"]
const calenderMonths = [ "JANUARI", "FEBRUARI", "MARS", "APRIL", "MAJ", "JUNI", "JULI", "AUGUSTI", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"]

// Stores id respective data from fetch requests
let jsonApiData;
let storedEventID;

//Hide popup...

function showshowEditEventValues(eventValues) {
    document.getElementById('custId').value = eventValues.id;
    document.getElementById('editTitle').value = eventValues.title;
    document.getElementById('editDate').value = eventValues.date;
    document.getElementById('editStarttime').value = eventValues.starttime;
    document.getElementById('editEndtime').value = eventValues.endtime;
    document.getElementById('editNotes').value = eventValues.notes;
}

//display alter and post sections
function showEditEventContainer(eventValues) {
    // console.log(eventValues);
    editContainer.hidden = false;
    postContainer.hidden = true;
    showshowEditEventValues(eventValues)
}

function showPostEventContainer() {
    postContainer.hidden = false;
    editContainer.hidden = true;
}


// functions for manipulating and appending dom.

function domResponseFromApi(alertText) {
    alert(alertText)
}

function setDomDataObject(domDataObject) {
    domDataObject.dataset.date = date.toLocaleString("sv-SE").slice(0, 10);
}

function setDomDaydate(AlterDomDateHeading) {
    AlterDomDateHeading.classList.remove("todaysDate")
    AlterDomDateHeading.innerHTML = `<h2 class="domDate">${date.getDate()}/${date.getMonth() + 1}</h2><h4 class="domDay">${calenderDays[date.getDay()]}</h4>`

    if (date.getTime() === unalteredDate.getTime()) {
        AlterDomDateHeading.classList.add("todaysDate")
    } 
}

function cleanOldHtmlEvents(domDataObject) {
    domDataObject.innerHTML = "";
}

function incrementDateObject (itteration) {
    date.setDate(date.getDate() + itteration);
}

function reduceDateObject (itteration) {
    date.setDate(date.getDate() - itteration);
}

function manipulateDomElements() {
    for (let AlterDomDateHeading of containerWeekDay) {
        setDomDaydate(AlterDomDateHeading)
        incrementDateObject(1)
    }
    reduceDateObject(7) 
}

function alterDomDataAttribute() {
    for (let domDataObject of domDayObjects) {
        setDomDataObject(domDataObject)
        cleanOldHtmlEvents(domDataObject)
        incrementDateObject(1)
    }
    reduceDateObject(7) 
}

function filterJsonData(domObject) {
    return jsonApiData.filter(data => data.date === domObject.dataset.date)
 
}

function appendEventToHtml(jsonDateEvents) {
    //remember to use fragment martin.. Must be a better way... 
    let fragments = new DocumentFragment();
    for (jsonDateEvent of jsonDateEvents) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("event");
        newDiv.id = jsonDateEvent.id;
        newDiv.innerHTML =
            `<p class="eventTitle" >${jsonDateEvent.title}</p><p class="eventTime" >${jsonDateEvent.starttime}-${jsonDateEvent.endtime}</p><button class="alterDataBtn">Ändra</button>`;
        fragments.appendChild(newDiv);
    }
    return fragments;
}

function sortAPiDataAndAppendToHtmlCalender() {
    for (let domObject of domDayObjects) {
        let jsonDateEvents = filterJsonData(domObject);
        let fragment = appendEventToHtml(jsonDateEvents)
        domObject.appendChild(fragment);
    }
}

function offsetDateObjectToMonday() {
    //Whoever made the date and day object with 1 resp 0 hated the world...
    let validateMonday = date.getDay() || 7;
    date.setDate(date.getDate() - validateMonday + 1);
    // console.log(date);
}

function alterDataAndDom() {
    offsetDateObjectToMonday()
    alterDomDataAttribute()
    manipulateDomElements()
    sortAPiDataAndAppendToHtmlCalender()
    getWeekAndAppendToHtmlHeader()
}

function getWeek() {
    //No getWeek() in javascript... WHYYYYYYY?
    let validateMonday = date.getDay() || 7;
    date.setDate(date.getDate() - validateMonday + 1);
    date.setDate(date.getDate() + 4 - validateMonday);   
    var yearStart = new Date(date.getFullYear(), 0, 1);
    let currentWeek = Math.ceil((((date - yearStart) / 86400000) - 1)/7);
    date.setDate(date.getDate() - 4 + validateMonday);
    return currentWeek;
}

function appendHtmlToHeading(currentWeek) {
fullDateHeading.innerHTML =  `<h3 id="year"> ${date.getFullYear()}</h3> <h1 id="week">Vecka: ${currentWeek}</h1> <h3 id="month"> ${calenderMonths[date.getMonth()]}</h3>`;
}

function appendHtmlToHeaderIncrementWeekBtn(currentWeek) {
    currentWeek += 1;
    incrementWeek.textContent = 'V: ' + currentWeek;
}

function appendHtmlToHeaderReduceWeekBtn(currentWeek) {
    currentWeek -= 1;
    reduceWeek.textContent = 'V: ' + currentWeek;
}

function getWeekAndAppendToHtmlHeader() { 
    let currentWeek = getWeek()
    appendHtmlToHeading(currentWeek)
    appendHtmlToHeaderIncrementWeekBtn(currentWeek)
    appendHtmlToHeaderReduceWeekBtn(currentWeek)
}


// Fetch Data

//get
function getData() {
    fetch('/api/')
        .then(resp => resp.json())
        .then(data => {
            jsonApiData = data;
            alterDataAndDom()
        }).catch((error) => {
            console.error('Error:', error);
        });
};


//get ID
domDayObjects.forEach(eventContainer => {
    eventContainer.addEventListener("click", (e) => {
        console.log(e.target);
        //This is a horrible way to do it.... Shady build
        if (e.target.nodeName === "BUTTON") {
            storedEventID = e.target.parentElement.id;
            fetch('/api/' + storedEventID)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);

                    showEditEventContainer(data[0]);
                }).catch(err => {
                    console.log(err.message);
                })
        }
    });
});

//Event post
postForm.addEventListener("submit", e => {
    e.preventDefault()
   
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };
    fetch('/api/', options)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let message = data.message;
            domResponseFromApi(message);
            window.location.reload();
        }).catch(err => {
            console.log(err);
            domResponseFromApi(err);
        });
})

//put
putForm.addEventListener("submit", e => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };
    fetch('/api/' + storedEventID, options)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let message = data.message;
            domResponseFromApi(message);
            window.location.reload();
        }).catch(err => {
            console.log(err);
            domResponseFromApi(err);
        });
})

//delete
deleteEvent.addEventListener("click", e => {
    console.log(storedEventID);
    e.preventDefault()
    const options = {
        method: 'DELETE',
    };
    fetch('/api/' + storedEventID, options)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let message = data.message;
            domResponseFromApi(message);
            window.location.reload();
        }).catch(err => {
            console.log(err);
            domResponseFromApi(err);
        });
})

//Events

reduceWeek.addEventListener('click', () => {
    console.log("reduce");
    reduceDateObject(7)
    alterDataAndDom();
})

incrementWeek.addEventListener('click', () => {
    console.log("increment");
    incrementDateObject(7)
    alterDataAndDom();
})

closeEditContainerBtn.addEventListener('click', () => {
    editContainer.hidden = true;
})

closePostContainerBtn.addEventListener('click', () => {
    postContainer.hidden = true;
})

postDataEventBtn.addEventListener('click', () => {
    showPostEventContainer()
})

