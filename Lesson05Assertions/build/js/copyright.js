"use strict";
// const year = document.getElementById('year')
// const thisYear = new Date().getFullYear()
// year.setAttribute("datetime", thisYear)
// year?.textContent = thisYear
//above has lots of errors on line 3 and 4
let year;
year = document.getElementById('year');
let thisYear;
//force this year to be a string
thisYear = new Date().getFullYear().toString();
//now we need to fix it so that it is not null, add a type guard
if (year) {
    year.setAttribute("datetime", thisYear);
    year.textContent = thisYear;
}
//or we can do this, it will use type assertions!
//this is an alternate way to do it! It has type assertions doing a lot for us!
const year2 = document.getElementById('year2');
const thisYear2 = new Date().getFullYear().toString();
year2.setAttribute("datetime", thisYear2);
year2.textContent = thisYear2;
