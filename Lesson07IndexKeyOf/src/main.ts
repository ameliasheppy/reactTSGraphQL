
console.log("working...")
//ctl shift i opens the console

//index signatures. 
//used to make an obj when you don't know the keys, buy you know the shape of the obj

//we know the types of the keys and the type of the vals that we need
//TS demands an index sig when we attempt to access an obj prop dynamically
interface TransactionObj{
    [index:string]:number
    Pizza:number, 
    Books:number, 
    Job: number,
}

//above has no index sig, ew, does not work! Keeps giving type any to stuff
//this is the shape of our obj! 
//we are saying: hey, all of keys will be strings and have a number value 
// interface TransactionObj{
//     [index:string]:number
// }
//but we can combine the two! I am c/p'ing my index sig and adding it above in my obj
//all of the above types are nums
const todaysMoney : TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    //now that we set up our obj with an index sig, we can add in extra k/v that aren't in the interface
    //it will have to be a num though bc we set our interface to only take nums
    Man:54
}
//we can use bracket OR dot notation to access our obj
console.log((todaysMoney.Pizza));
console.log(todaysMoney['Pizza']);
//now how can we dyn'ly access the vals?

let prop: string = "Pizza"
// console.log(todaysMoney[prop]);                         error bc needs index signature

//lets use it for a function!
//no type:any will be assigned bc of our above index sig
const todaysNet = (transactions: TransactionObj):number =>{
    let total = 0
    for(const transaction in transactions){
        total += transactions[transaction]
    }
    return total
}

console.log(todaysNet(todaysMoney));
//make a new interface
interface Student {
    //what if we want for our index sig to take all of the below types instead of just num like above?
    [key: string]:string | number | number[] | undefined
    name: string, 
    GPA: number,
    //below is optional bc of ?. it is an array of nums
    //but if optional, and no val provided, will be type undefined
    //ts gets big mad, so we need to set it in the index sig that 
    //undefined is a poss
    classes?: number[]
}

const student1: Student= {
    name:'Doug', 
    GPA:4.0,
    classes: [100,200]
}
//well, that's a problem! adding the index sig allows us to have a type of undefined, 
//which is not great, bc as seen below, we can try to access something that doesn't exist
console.log(student1.test);

for (const key in student1){
    console.log(`${key}: ${student1[key]}`)
}

//how can we iterate through an obj with no index sig? 
//use an assertion

for (const key in student1){
    console.log(`${key}: ${student1[key as keyof Student]}`)
}
//key of creates a union type, which is a string literal, allows us to loop through the obj
//we ref a lowercase student instead of the Student here bc
Object.keys(student1).map(key =>{
    console.log(student1[key as keyof typeof student1])
})
//above we are saying, we don't know what the typeof is, so we are just retrieving the typeof by a ref to the obj itself

//now let's look at a function with a student obj passed into it. it will be typeof student
//we can say keyof student
const logStudentKey = (student1: Student, key: keyof Student): void =>{
    console.log(`Student ${key}: ${student1[key]}`)
}
//key is a string literal made of the names in student, and we can access indi things on the student1. 
//accessing the GPA by 'GPA' which was made in Student
logStudentKey(student1, 'GPA')
logStudentKey(student1, 'name')

//////////////////////////////////////////////////////////////////////
interface Incomes{
    [key:string]:number
}
//we could also provide an index sig like below:
type Streams = 'salary' | 'bonus' | 'sidehustle'

//below we are making a type with a type utility in it
//the syntax is smaller, and allows us to use strin template literals still
type Incomes2 = Record<Streams, number>
//above could cause issues bc not specifically setting a prop. if diff prop types and taking nums/strings
//it's weird bc saying all salary could be num | str

const monthlyIncomes: Incomes = {
    salary: 500,
    bonus: 100,
    sideHustle: 323
}
// const monthlyIncomes2: Incomes2 = {
//     salary: 500,
//     bonus: 100,
//     sideHustle: 323,
// }
//this works if an idex sig, does not work if no index sig
for (const revenue in monthlyIncomes){
    console.log(monthlyIncomes[revenue])
}
//this is how we do it for no index sig. we need to use an assertin
// for (const revenue in monthlyIncomes2){
//     console.log(monthlyIncomes2[revenue as keyof Incomes2]);
    
// }

//if you use the record ulility type insted of an index sig, you still need to access keyof