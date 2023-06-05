"use strict";
console.log("working...");
//all of the above types are nums
const todaysMoney = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
//we can use bracket OR dot notation to access our obj
console.log((todaysMoney.Pizza));
console.log(todaysMoney['Pizza']);
//now how can we dyn'ly access the vals?
let prop = "Pizza";
// console.log(todaysMoney[prop]);                         error bc needs index signature
//lets use it for a function!
//no type:any will be assigned bc of our above index sig
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction];
    }
    return total;
};
console.log(todaysNet(todaysMoney));

