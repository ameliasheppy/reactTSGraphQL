//what are generics?
//ts defines particular types and enforces them 
//ts allows for generics bc sometimes we just don't know what type will be passed in
//below will just take a str, return a str
const stringEcho = (arg: string): string => arg
//we can only do one thing with the above func
//what if we want to do lots of things with that func?

const echo = <T>(arg:T): T =>arg
//now we can use this generically it will work with any type we pass in
//we will be providing the type in front, in the param, and then the return
//this is great for utility funcs
//lets make a new func to play with
//imagine that T is a type var placeholder
//null and arrays will reutrn an obj, so we want to make sure that we are excluding them
const isObj = <T>(arg: T):boolean =>{
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}
//we want to be able to pass in any type and check if they are an actual obj
console.log(isObj(true));
console.log(isObj("John"));
console.log(isObj([1,2,3]));
console.log(isObj({name: "john"}));
console.log(isObj(null));

//a sign that we need a generic is when the func has to think about what it will return to us
//the double bang is wild. look it up!
//we are saying, if there is a length, make it false, it there is not length, make it true
//an empty obj or arr is true, but we want to see if there is something in it!
//specify the shape of obj to return
const isTrue = <T>(arg:T):{arg:T, is:boolean} =>{
    if(Array.isArray(arg) && !arg.length){
        return {arg, is:false}
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length){
        return {arg, is:false}
    }
    return { arg, is: !!arg}
}
//the double bang takes something that is a str, obj and then 
//turns it into a bool
//we could've done a larger if statement with all of the checks in it, but that seems like a lot

console.log(isTrue(false))
console.log(isTrue(0));
console.log(isTrue({name: 'Dave'}))
//we can check anything we want with this func to see if it is an obj 
//we could do this with an interface too

interface BoolCheck<T>{
    value: T,
    is:boolean
}

//we can't just use arg again, we need to use value:arg
const isTrueInterface = <T>(arg:T):BoolCheck<T>=>{
    if(Array.isArray(arg) && !arg.length){
        return {value:arg, is:false}
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length){
        return {value:arg, is:false}
    }
    return { value:arg, is: !!arg}
}
//above we used a generic type holder in the interface and then used
//the interface as part of our func now lets see how to it with an interface again

interface HasID{
    id:number
}

//we can use the extends keyword to do stuff with our generic types too
const processUser = <T extends HasID>(user:T): T=>{
    //process the user with logic and return user
    //ts knows that the user that is passed in has to have an id number
    return user
}
console.log(processUser({id:1, name:'Dave'}));
// console.log(processUser({name:'Dave'}));
//above will error bc knows that it needs an id

//better, bigger ex with extends
//phew below is a mouthful. what is it?!?!?
//we are building K as a keyof the first type we pass in, which is T
//we want it to return users which is an array of T and they a key of K
//it will return T, with K in it as an array
const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key:K):T[K][] =>{
    return users.map(user=>user[key])
}
//imagine that T is an obj that has an ID and this is going to be a 
//user obj and K is the keys of T, the keys of the user obj
//so we will have an arr of user objs
//user[key] will id the val from the user and that's the type of  the array we have 
//our array will be all of the vals that we id'd
const usersArray = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      },
]

//got the above from json placeholder 
//lets use our func on it
//once we type this: console.log(getUsersProperty(usersArray, ""));
//intellisense tells us all of the props on the user that we can access from the top level, but not the nested ones
console.log(getUsersProperty(usersArray, "name"));
console.log(getUsersProperty(usersArray, "email"));
//t is the user obj type and the keys are mapped without an assertion bc the K extends keyof is here as we pass in a type var
//great use of generics!
console.log(getUsersProperty(usersArray, "username"));

class StateObject<T>{
    private data:T
    constructor(value: T){
        this.data = value
    }
    //use type T in a getter
    get state(): T {
        return this.data
    }

    //need a setter too. set state, val is T
    set state(value: T){
        this.data = value
    }
}
const store = new StateObject("John")
console.log(store.state);
store.state= "Dave"
//above is okay bc it's a string. can't ressign to a num
//it did not know the type until we passed in John. 

//we can set it to accept multiple types. 
//below we set it to 15 in an array. now set it
const myState = new StateObject<(string|number|boolean)[]>([15])
myState.state = (["Dave", 42, true])
console.log(myState);
console.log(myState.state);

