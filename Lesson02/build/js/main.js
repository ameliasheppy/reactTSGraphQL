"use strict";
//run tsc -w to watch/compile anything in the build folder
//run tsc --init to get the config folder
//ts infers data types!
let myName = "Dave";
//ts says, oh ok, that is a string! 
//ts did a type inference. it sees we made a str, so is uses a str
//we are implicity showing it is a str
//is not strictly stated, but we can
let myName2 = "Jesse";
// myName = 42    will give us an error bc ts is cool!
let isLoading;
isLoading = true;
let album;
let daysUntilConv;
//the above all have type inf,TS is happy with that. 
//even any is a data type, but like....don't set to any please..
//below should add, but to fit TS, we must set the params to nums
//if we don't assign a type, it will assign any type and then is sassy
//could be nums or a concat
const sum = (a, b) => {
    return a + b;
};
//ts infers what it should return, ie, here a num!
//could be b to a string and ts will infer that it should return a str like what happens when you add num to str in js
//              union types!!!!!
//tell ts that the var can hold one of many types
let couch;
//would err couch = any
//may use a union type for an API req.
//the res is a num, but we need to set as a str
let postId;
//bools can be 0 or 1, so may need to do:
let isOnline;
//existing proj to TS? not sure what data type a regex is?
//mouse over and TS will tell us what to set it to
let re = /\w+/g; //becomes the below
let betterRe = /\w+/g;
//ts uses inference on the above,but we can declare it for sure to help TS
//intellisense is super helpful! use it!
