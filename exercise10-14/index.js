var moment = require('moment');
require('moment-timezone');

//1.
let start_Date = moment([1998, 11, 16]); // add date in the yy / mm / dd format.
let end_Date = moment(); //today
let totalDays = end_Date.diff(start_Date, 'days');
console.log(totalDays)

//2.
let bday = moment("1998-11-16", "YYYY-MM-DD");
let currentDate = moment();

let duration = moment.duration(currentDate.diff(bday));

let years = duration.years();
let months = duration.months();
let days = duration.days();

console.log(years + " years, " + months + " months, and " + days + " days");

//1.
const closestDate = (date1, date2) => {
    let now = moment()
    let durationDate1 = moment.duration(now.diff(date1));
    let durationDate2 = moment.duration(now.diff(date2));
    if (durationDate1>durationDate2) {
        console.log (date2);}
        else{
        console.log (date1)
        }
    }

closestDate("1998-11-16", "2000-10-20");

//2.
const closestDate1 = (date1, date2) => {
    let now = moment()
    let durationDate1 = moment.duration(now.diff(date1));
    let durationDate2 = moment.duration(now.diff(date2));
    if (durationDate1>durationDate2) {
        console.log ('The first date is before the second date');}
        else{
        console.log ('The first date is after the second date')
        }
    }

closestDate1("1998-11-16", "2000-10-20");

//3.

let currentTimeinLondon = moment().tz('Europe/London').format('YYYY-MM-DD HH:mm:ss');
console.log(currentTimeinLondon);