export interface Item{
    id: string,
    item: string,
    check: boolean
}

//this is our DM to decribe out items
//id, item and checked refer to the getters and setters
//when we have the state of the class, each needs an _id, etc
//would be passed into constr as private
export default  class ListItem implements Item{
    //we don't need assignments in the {} bc we assigned them in this class
constructor(
    private _id:string = '',
    private _item: string = '',
    private _checked: boolean = false,
) {}
//now we need to implement the interface with all of the getters and setters
//ts knows we are using a getter and a setter
get id(): string {
    return this._id
}
//now set the id 
set id(id:string){
    this._id = id
}
get item(): string{
    return this._item 
}
set item(item:string){
    this._item= item
}
get checked (): boolean{
    return this._checked
}
set checked(checked: boolean){
    this._checked= checked
}
}