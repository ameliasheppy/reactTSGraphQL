console.log("HEEYYYY!")

//now we are discussing utility types
//helpful for type transformations

//partial util type
interface Assignment {
    studentId:string,
    title:string,
    grade:number, 
    verified?: boolean
}

const updateAssignment = (assign: Assignment,
     propsToUpdate:Partial<Assignment>):Assignment =>{
        return {...assign, ...propsToUpdate}
}
//we only want to specify some props to change, only the props that we pass in
//that allows us to only pass in some of the props and declare they are props of assignment

const assign1: Assignment = {
    studentId: "compsci",
    title:"Capstone",
    grade: 0
}

console.log(updateAssignment(assign1, {grade:95}));
const assignGraded: Assignment = updateAssignment(assign1, {grade: 95})//the partial util type allows us to only update one prop


//other util types
//                          Required and Readonly
//this will mean that all of the props, even the one that we made optional will be req'd!
const recordAssignment = (assign: Required<Assignment>):Assignment =>{
    //send to db and modi data
    return assign
}

//we are setting it to the above assignGraded. can only leave verified as a bool
const assignVerified: Readonly<Assignment> = {
    ...assignGraded, verified: true
}
//won't work with only assignGraded bc that doesn't have verified in it. 
//if we want to use assignGraded, spread it out, and then add on verified
recordAssignment({...assignGraded, verified:true})

//      record is the most common util type!
const hexColorsMap: Record<string, string> = {
    red:"FF0000",
    green:"00FF00",
    blue:"0000FF"
}
//above has a str for key and str for val
//lets make a union type of str literals
type Strudents = "Sara" | "Kelly"
//another truncated type
type letterGrades = "A" | "B" | "C"
//now lets create a record grades
const finalGrades: Record<Strudents, letterGrades> = {
    Sara: "B",
    Kelly:"A"
}
//can only provide the right vals from the types. can't do Dave:"Z"
// we could use an interface though

interface Grades {
    assign1: number,
    assign2: number
}

const gradeData: Record<Strudents, Grades>= {
    Sara: {assign1: 91, assign2:98},
    Kelly: {assign1: 89, assign2:67}
}

//we have gone from util types as a simple hex code to using different string literal types and an interface
//Can use record in many useful ways


                        //Pick and Omit
                        //Pick what we want to use from our interface
type AssignResult = Pick<Assignment, "studentId" | "grade">
const score: AssignResult = {
    studentId:'k9732',
    grade:89
}
//omit does the opposite. with pick, we chose which ones we wanted to use. with omit, we leave out the ones we omit
type AssignPreview = Omit<Assignment, "grade" | "verified">
//TS is happy bc we aren't entering what we omitted
const preview: AssignPreview = {
studentId:"h743",
title:"Capstone",
}

            //Exclude and extract
//don't work with interfaces, they work with string literal union types
//hover to see which the types are made of
type adjustedGrade = Exclude<letterGrades, "C">
type highGrades = Extract<letterGrades, "A"|"B">

                //Nonnullable
//hover to see which are held in the types
type AllPossibleGrades = "Dave" | "John" | null | undefined
//but now we only want the names, not the null vals
type NameOnly = NonNullable<AllPossibleGrades>

//Return type:
//we could totally make the below var here and then use it in the arr func. 
//but it's much easier to make if after the func
// type newAssign = {title: string, points: number}

const createNewAssign = (title: string, points: number) =>{
    return {title, points}
}
//when it make the var down here, it is better bc we can then work off of a func that we didn't create, like with a lib
//then if our vars change, they will still work with the func, won't have to change the func too
type newAssign = ReturnType<typeof createNewAssign>

const tsAssign: newAssign = createNewAssign("Utility types", 100)
console.log(tsAssign)

//parameters
type AssignParams = Parameters<typeof createNewAssign>
//look at that! hover and see that it put our stuff in a tuple!

const assignArgs: AssignParams = ["Generic", 100]
const tsAssign2: newAssign = createNewAssign(...assignArgs)
console.log(tsAssign2);

//with a recent TS release, we can now use Awaited
        //Awaited ---> util type that helps with return type of a promise

interface User {
    id: number,
    name:string,
    username:string,
    email:string
}
const fetchUsers = async (): Promise<User[]> => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json()
    }).catch(err =>{
        if(err instanceof Error) console.log(err.message);
        
      })
      return data
}

//return is a promise with an arr of users
//if we get an instanceof error, log what it is
//ts will get the data and return it to us.
//to get the return type:
type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>
//we don't want the prom, we want the return type, so add awaited to our above

fetchUsers().then(users => console.log(users))