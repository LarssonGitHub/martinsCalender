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
const postContainer = document.getElementById('postContainer')

//global Date 
let unalteredDate = new Date();
let date = new Date();

// För date Debugging
// date.setDate(date.getDate() + 3)
// unalteredDate.setDate(unalteredDate.getDate() + 4)

// Array for days
const calenderDays = ["SÖNDAG", "MÅNDAG", "TISDAG", "ONSDAG", "TORSDAG", "FREDAG", "LÖRDAG"]

// Stores id respective data from fetch requests
let jsonApiEvents;
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

function setDomDataObject(domDataObject, currentDayOffset) {
    date.setDate(date.getDate() + currentDayOffset);
    domDataObject.dataset.date = date.toLocaleString("sv-SE").slice(0, 10);
}

function setDomDaydate(AlterDomDateHeading, currentDayOffset) {
    date.setDate(date.getDate() + currentDayOffset);
    if (date.getTime() === unalteredDate.getTime()) {
        AlterDomDateHeading.classList.add("todaysDate")
        AlterDomDateHeading.innerHTML = `<h2 class="domDate">${date.toLocaleString("sv-SE").slice(5, 10)}</h2><h4 class="domDay">${calenderDays[date.getDay()]}</h4>`
        return;
    } 

    //Must be a better way.... For some reason.. todaysDate stays, even when replaying function...
    AlterDomDateHeading.classList.remove("todaysDate")
    AlterDomDateHeading.innerHTML = `<h2 class="domDate">${date.toLocaleString("sv-SE").slice(5, 10)}</h2><h4 class="domDay">${calenderDays[date.getDay()]}</h4>`
}

function cleanDomEvents(domDataObject) {
    domDataObject.innerHTML = "";
}

function alterDomDataAttribute() {
    //extremly shady build to append date..... Need to use something else than 2 for of loops..
    let currentDayOffset;
    currentDayOffset = 0;
    for (let domDataObject of domDayObjects) {
        setDomDataObject(domDataObject, currentDayOffset)
        cleanDomEvents(domDataObject)
        currentDayOffset = 1;
    }
    currentDayOffset = -6;
    for (let AlterDomDateHeading of containerWeekDay) {
        setDomDaydate(AlterDomDateHeading, currentDayOffset)
        currentDayOffset = 1;
    }
    date.setDate(date.getDate() - 6);
}

function filterJsonApiAfterDateEvents(domObject) {
    return jsonApiEvents.filter(event => event.date === domObject.dataset.date)
}

function appendEventToDom(jsonDateEvents) {
    //remember to use fragment martin.. 
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

function appendDomData() {
    for (let domObject of domDayObjects) {
        let jsonDateEvents = filterJsonApiAfterDateEvents(domObject);
        let fragment = appendEventToDom(jsonDateEvents)
        domObject.appendChild(fragment);
    }
}

function modifyDomWeek() {
    alterDomDataAttribute()
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

// Fetch Data

//get
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
    date.setDate(date.getDate() - 7);
    modifyDomWeek();
})


incrementWeek.addEventListener('click', () => {
    console.log("increment");
    date.setDate(date.getDate() + 7);
    modifyDomWeek();
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
