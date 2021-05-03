// // //Ideas on..... Calender.. I don't fucking know.

// // var dt = new Date();
// // //Note how you need to go - 1 if you want to go back.. If you want your current month, you need to go 1, or it will be 1 month back

// //  var month = dt.getMonth() + 1;
// //  var year = dt.getFullYear() + 2;


// // daysInMonth = new Date(year, month, 0).getDate();


// // for (i = 1; i <= daysInMonth; i++){
// //     console.log(`${i} day of month ${month} of year ${year}`);
// // }

// // // console.log("its' the month", month);
// // // console.log("the yeyear", year);
// // // console.log( daysInMonth);

// // a = new Date("2021-04-23T13:28:48.674Z"); //Will siplay this today (If any empty, it will choose the default value)
// // d = new Date(2021, 3, 24);
// // c = new Date();

// // v = new Date();

// // // The toLocaleString() method converts a Date object to a string, using locale settings.
// // // The default language depends on the locale setup on your computer. 
// // //This is sweden! Since your computer is fucked up, this is a safty mesure..
// // console.log(v.toLocaleString("sv-SE"));

// //Dont forget setting shit and stuff....


// let date = new Date();

// //to match a week...
// let currentDay = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'söndag', 'lördag']
// console.log("day of....", currentDay[date.getDay() - 1]); //Since getday starts from 1....

// console.log("today dates is!!!     ", date.toLocaleString("sv-SE"));

// console.log("its' the month", date.getMonth() + 1);
// console.log("its' the year", date.getFullYear());
// console.log("date of....", date.getDate());







var tomorrow = new Date(1419785527580)
let kiss = tomorrow.setDate(tomorrow.getDate() +2);

console.log(kiss);

// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// var date = new Date();

// console.log(date.addDays(5));


// 
function alterWeek(boolean) {
    if (boolean === 'increment') {
        date.setDate(date.getDate() + 7);
        alert("incr")
        return;
    } else {
    date.setDate(date.getDate() - 7);
    }
    updateCalender();
}
