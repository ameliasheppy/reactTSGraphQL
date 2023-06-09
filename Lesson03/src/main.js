"use strict";
//tsc -- init 
//tsc -w
//lets start with arrays!
//hover the intellisnse to see the syntax of how to write the arr in TS
let stringArray = ["one", "hey", "Dave"];
let guitarsArray = ["blue", "green", "red", 23233];
let mixedArray = ["Fire", true, 9886766];
// stringArray[0] = 42              TS ERROR! only str in this
stringArray[0] = "John"; //success!
stringArray.push("Jesse");
console.log(stringArray);
guitarsArray[0] = 1987;
//success bc it is a mixed arr, can switch bc of type unions
guitarsArray.unshift("Jim");
console.log(guitarsArray);
mixedArray.unshift(true);
// stringArray = mixedArray     ERROR bc strArr only takes strs!
//reassignment works one way - the arr we are adding to MUST accept the types of the arr we are adding to it!
//can add arr of nums to mixed, but not arr of nums to arrString
let test = [];
//ts thinks aboce is any
let bands = [];
//bands can ONLY HOLD STRINGS NOW! not any like above with test.
bands.push("Jesse");
// bands.push(boolean)     ERRORSSS!
//want to assign a specific length and type to the arr?
//use a tuple! 
let myTuple = ["Dave", 42, true];
//must have those in that specific data positions! 
//hover over and see that it is not a tuple! 
let superNotATuple = ["john", 1, false];
superNotATuple = myTuple; //heck yeah, it works!
// myTuple = mixedArray //ERRORRRR!!!! This can't be assigned to the wrong type
//superNotATuple is seen as a wild card that doesn't only hold e things and so TS is worried and mad and errors!
// myTuple[3] = 42    ERROR bc no 4th position! Could assign to 
//the position that takes a number
// OBJECTS
let myObj;
//all the things are objs, even arrays!
myObj = [];
console.log(typeof (myObj));
//it is still an obj, bc that is what we set it to!
//or could:
myObj = bands;
myObj = {};
const exampleObject = {
    prop1: 'Dave',
    prop2: true
};
//look at the hover! TS assigned types! try resetting the props 
//to a new type and it will error
// exampleObject.prop1 = 12                 ERRRORRRR
exampleObject.prop2 = false; //success bc is a bool
//must add all of the props or will error
let thang = {
    name: 'eddy',
    active: false,
    albums: [1983, "Hey friends!"]
};
console.log(thang);
//hover and see what TS expects. it's really cool!
//can't add on new props to the obj!
//how can we make a prop optional?
//add a ? before the colon in the obj like with active up there
//see, now we can leave off the active status!
let thang2 = {
    name: "jeru",
    albums: [9, "hey"]
};
console.log(thang2);
//use the obj in a func!
const heyGuys = (dudes) => {
    return `Hello ${dudes.name}!`;
};
//look          look            look!
//use an obj to destr and get the values!
console.log(heyGuys(thang));
console.log(heyGuys(thang2));
let bluey = {
    name: 'Bruce',
    species: 12
};
//nice to use interface for classes!
//could go change obbyJecty to interface and be fine!
//we can't call a method on an undefined property!! 
//check to see if prop exists with narrowing
const heySharks = (shark) => {
    if (SharedWorker.name) {
        return `Hello ${shark.name.toUpperCase()}!`;
    }
    return "Hello, anonymouse!!";
};
console.log(heySharks(bluey));
//              ENUMS
//enums are added to the JS at RT
//enums are not type level. they are a feature, but not additions
//the below are enumerated. when we CL them, we get their index
//not the value, the index!!!!!!
var Grade;
(function (Grade) {
    Grade[Grade["F"] = 0] = "F";
    Grade[Grade["D"] = 1] = "D";
    Grade[Grade["C"] = 2] = "C";
    Grade[Grade["B"] = 3] = "B";
    Grade[Grade["A"] = 4] = "A";
})(Grade || (Grade = {}));
console.log(Grade.F);
console.log(Grade.C);
//we can adapt our enums by giving them vals to adv the val
var GradeChartAtOne;
(function (GradeChartAtOne) {
    GradeChartAtOne[GradeChartAtOne["F"] = 7] = "F";
    GradeChartAtOne[GradeChartAtOne["D"] = 8] = "D";
    GradeChartAtOne[GradeChartAtOne["C"] = 9] = "C";
})(GradeChartAtOne || (GradeChartAtOne = {}));
console.log(GradeChartAtOne.D);
