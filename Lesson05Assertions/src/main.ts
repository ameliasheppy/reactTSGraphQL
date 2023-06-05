const greet = "hello world"
console.log("bananas!");

//sometimes we have info about the type of a val that TS doesn't know about
//so we can use type assertions or type casting 
//tells TS we have more details than TS and it need to listen to us.

//   remember tsc --init and tsc -w
//make some aliases with the type keyword
type One = string;
type Two = string | number;
type Three = "hello";

//convert to more or less specific
let a: One = "Hellooooo";
console.log(a)
//we assigned a type that is less specific. 
//this is called assignment to a less specific type
let b = a as Two

let c = a as Three

//as is a magical word. same as using angle brackets. 
let d = <One>'world'
//in the angle brackets, we can put types instead of a type alias or literal. <> is not as common though
let e = <string | number>'world'

//can't use <> in React

//when would we use assertions for narrowing?

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string =>{
    if(c === "add") return a + b
    return '' + a + b
}
//this is where an assertion is handy!
//ts won't error bc it is worrying that the nums will add to a str
//assert with 'as string' to tell TS that it can just look at them as strings
let myVal: string = addOrConcat(2,2,'concat') as string
//watch out! TS see no problem here, but a string is returned!
//we are telling TS that this is right, BUT IT IS NOT!!!!!!!!
let myValue: number = addOrConcat(2,2,'add') as number

// 10 as string   ERRRORRRR    Ts is checking and says no thanks! 

//we can do force casting or double casting to over rule TS
(10 as unknown) as string
//bc we have to make 10 into an unknown first and then can use it as a string

//assetions are very useful when working with the DOM/web pages
//TS is confused, bc it says that this could be an HTMLElement or null
//TS does not do well with id's
const img = document.querySelector('img') as HTMLImageElement
//this is a better way to use an id.
//use a non null indicator with the ! on the end if we want
// const myImg = document.getElementById('#img')!
///but the element tag still works best
const myImg = document.getElementById('#img')  as HTMLImageElement
//let's access a prop on the img. an img would have a src prop.
//ts can not do this unless we assert that it is an HTMLImageElement
img.src
myImg.src    //needs us to be specific

//dont need the non null assertion with an assertion type.
const nextImage = <HTMLImageElement>document.getElementById("#id")