//tsc -- init 
//tsc -w

                // type aliases
//lets create a type that can be resused in multiple places!
//it will be a union type
type stringOrNumber = string | number
//now lets do it this way:
type stringOrNumberArray = (string | number)[]
//with the above, we can now put a type alias IN a type alias. 
type ObbyJecty = {
    name: string, 
    active?: boolean, 
    //below will set albums to an array of strings or nums
    albums: (string | number)[]
}

type userId = stringOrNumber
//userId is now a string or a number, it is an alias!
//why is a type diff than an interface?
//can't do the user id with it!

// interface userId2 = stringOrNumber      ERRORRR
//think of an interface more like an obj or class
//think of a type like we did with the type being assigned to userId as an alias

//                  Literal types!
let myName: 'Amelia'
//    wuttttt. we just made a type of our name!!!! hover and see!
//cant reassign 
// myName = "Jesse"         error! fix with maybe a union type?

let ourNames: "Amelia" | "Ben" | "Jesse"
//a literal type is pretty much a const!
//super useful for union types. like if we need a var where a user can only choose a few options
//or shipped, delivered, returned
//can also do literals with numbers

//literal types and type aliases keep our code dry

//functtions:           best to give implicit types! remember, num or str. bc add or concat
//remember TS knows if we add two nums, it will return a num, but we can explicitly tell it what type to return. it's smart to do so!
const add = (a: number, b: number):number=>{
    return a + b
}

//sets to return type of void bc we are CL, not returning!
//any func with a side effect, no return at all === void
const logMsg = (message:any) =>{
    console.log(message)
}

logMsg("hello")
logMsg(add(2,3))
logMsg(true)

//still a function, but a regular func, not an arrow func
let subtract = function (c:number, d:number):number{
    return c -d
}
console.log(subtract(9,8));

//we used a func that takes a num, a second num, and returns a num 
//for add and subtract. why not just make a type?
type mathFunction = (a:number, b: number) => number

//hover and see that it applied the type alias!
//it infers that c and d are nums, no other type!
let multiply: mathFunction = function(c, d){
    return c*d
}
logMsg(multiply(2,3))

//interface also an option for a type alias to use in funcs
interface mathFunction2{
    (a: number, b: number): number
}
//see! The interface will work
let divide: mathFunction2 = function(e,f){
    return e/f
}
logMsg(divide(9,3))
//but when we are thinking of interfaces
                // think of classes

//if it is an interface, think of a class and extending it!
//funcs have types/basic types/type aliases!

// now let's look at optional params!
//want to make it optional? add a type guard. it will narrow the type applied to the var!
//if we just add the ? to make c optional, it will make c be undefined and err bc can't add to unde
//add a type guard!
const addAll = (a: number, b: number, c?: number): number =>{
    if(typeof c !== "undefined"){
        return a + b + c
    }
  //func needs a return that will not error! instead of an else, throw a diff return option!
  return a + b
}
//that would add all three

//optional params must be the last in the list. 
//now how do we do default vals? 
//say we never want c to be unde, so we give it a default val if user doesn't give it one!
const addAll2 = (a: number, b: number, c: number=2): number =>{
  return a + b + c
}
logMsg(addAll(2,3,12))
logMsg(addAll(2,3))
logMsg(addAll2(2,3))

//if we want for a to be a default val too and not pass one, we must give a the value of undefined in the call
//if we don't, it will assign 3, the only num we pass, as a 
//so we must give it unde so it will leave the other nums alone
// logMsg(addAll(undefined, 3))

//              rest params
const total = (a:number, ...nums:number[]):number =>{
    return a + nums.reduce((prev,curr) => prev + curr)
}
//below, don't pass in an arr. just pass in what would go in an arr
//rest is the rest of the params
logMsg(total(1,2,3,4,5))

//the never type is only for funcs that return errors or have inf loops
const createError = (errMsg: string) =>{
    throw new Error(errMsg)
}
//for the love, do not call the below, but hover and see that it is 
//never bc TS is smart and sees that it will never be false
const infinite = () =>{
    let i: number =1
    while(true){
        i++
        //add the below so that it will be void instead of never
        //if (i > 100) break
        //no explicit return, so will be void!
    }
}

//if you see that never is being inferred, see if you have an error

const numberOrString = (value: number | string): string => {
    if(typeof value === 'string') return 'string'
    if(typeof value === 'number') return 'number'
    return createError('This should never happen!')
}

//above, we are using a createError. we used type guards to check the val, and then the option to throw an error if undefined would occur
//if we are using type guards a lot, create a custom type guard
const isNumber = (value: any): boolean=>{
    return typeof value === 'number'
    ? true :false
}
//now can
const numberOrStringCustomGuards = (value: number | string): string => {
    if(typeof value === 'string') return 'string'
    if(isNumber(value)) return 'number'
    return createError('This should never happen!')
}
