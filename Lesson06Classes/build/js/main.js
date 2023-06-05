"use strict";
console.log("hey from lesson 6");
//we need a constructor to make classes
//must have the redunancy of name twice here.
//once the name is assigned it can not be changed. 
//public can be accessed anywhere/
//private is only avail in the class
//protected is a modifier
//assignments in the body of the constr are not req'd here
//it is not an error to leave them as the original, but not req'd
class Coder {
    constructor(name, music, age, lang = 'Typescript') {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    //since age is private, we must access it from inside the class here in a method
    getAge() {
        return `I am ${this.age} `;
    }
}
//this is the structure that we need. the constr takes them as params when we instantiate
//so so much wet, we need to make the code DRY
//called a              VISIBILITY MODIFIER
//use public, which is the vis mod. add a vis mod to each param and then we can remove the redundant ones
//now to instantiate, using the default param
//age is private, ONLY accessible in this class
//protected can be accessed in the class here OR extended/dereived classes. 
//
const Dave = new Coder('Dave', 'Rock', 41);
//constr are a lot like passing params to funcs
//this will work, bc put a private prop in a public method
console.log(Dave.getAge());
//this would not work bc it is private
// console.log(Dave.age);               ERROR!!!!!!!!!!!!!
//below errors bc it is protected! only accessible in the class
// console.log(Dave.lang);
//but the above 2 CL"s will work in JS bc it's valid JS
class WebDev extends Coder {
    constructor(computer, name, music, age) {
        //we are extending a class, with TS/JS so it needs to receive a super
        super(name, music, age);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return `I write ${this.lang}`;
    }
}
const Amy = new WebDev('Windows', 'Amy', 'Country', 23);
console.log(Amy);
console.log(Amy.getLang());
console.log(Amy.getAge());
class TubaIst {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Payton = new TubaIst('James', 'tuba');
console.log(Payton.play('blows'));
//________________________________________________________________________
//make a new class 
//the static keyword means that count does not apply to any instantiation of the class. it applies to the class itself. So count is not in the instances, it is IN THE CLASS!
class Peeps {
    static getCount() {
        return Peeps.count;
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count;
    }
}
Peeps.count = 0;
//getCount is also called directly in the class
//the id will increment when we have instances of the class made
const John = new Peeps('John');
const John2 = new Peeps('Jack');
const John3 = new Peeps('James');
console.log(John.id);
console.log(John2.id);
console.log(John3.id);
console.log(Peeps.count);
//static applies directly to the class and not to the things we instantiate with the class
//now lets work with getters and setters like what we use in React in JS
class Thread {
    constructor() {
        this.usedState = [];
    }
    //the below getter will return an arr with string data in it
    //below is readonly bc there is a getter, no setter
    get data() {
        return this.usedState;
    }
    //create the setter 
    set data(value) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.usedState = value;
            //must put the return below bc setters CAN NOT RETURN A VALUE the empty return is ok.
            return;
        }
        else
            throw new Error('Param is not an arr of strings');
    }
}
//every is a HOF method that we can call on arrays. pretty handy!
//every will return t/f. if every is a string, is true!
const myThread = new Thread();
myThread.data = ["Green", "Orange", "Magenta"];
console.log(myThread.data);
//use a spread to grab all of them in an array and add a new color!
myThread.data = [...myThread.data, 'Navy'];
console.log(myThread.data);
