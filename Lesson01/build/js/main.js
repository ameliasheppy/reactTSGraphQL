"use strict";
let username = 'Dave';
console.log(username);
//any time we make a change, we need to run tsc main.ts
//ts usually goes in the src, and html, css goes into build
//how can we do this?
let a = 12;
let b = '6';
let c = 2;
//we can console.log(a/b) in js and js is like okay cool, buddy. 
//ts gets mad!
//confused about your JS? c/p it into a TS file and it will compile it and show us errors
//this is how we can tell TS that our vars will be nums
let math1 = 4;
let math2 = 12;
let math3 = 14;
//go to config and change 
//"noEmitOnError":true    as active
//when we do this, TS won't compile to JS the things that have errors!
//can do it in the terminal with the below command
// tsc --noEmitOnError -w
//          DO NOT WANT TO COMPILE WITH ERRORS!!!!!!!!!
