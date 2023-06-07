import ListItem from "./ListItem";

//now we want an new interface that will refer to the getter for the list and have methods for it. 
//an arr of list items
//a load method with void return to load the list
//a way to save the list that is void
//a way to clear the list


//notice the above are void? that's bc we are working with the DOM.
//we aren't really returning anything. we just want to do the func

interface List{
    list: ListItem[],
    load():void,
    save():void,
    clearList(): void,
    addItem(itemObj: ListItem): void, 
    removeItem(id:string): void
}

//above are the methods and a getter
export default class FullList implements List{
    //constr that will rec a list. should be private.
    //list will have a getter and then all of the above methods
    //list will only have one instance of list made bc we only 
    //need one list in the app so to do that we put private in front of the constructor 
    //and we put static instance: FullList <-- to refer to the class name when this is static and it will instantiate a new list below

    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[]=[]){}

    //make our list getter
    get list(): ListItem[]{
        return this._list 
    }

    //big method! Several steps for in here
    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        //we saved our list to localS below as myList, get it with that!
        //now we need to set up a type guard
        if (typeof storedList !== "string") return
        //we dont want to go any farther if it isn't what we want
        //otherwise, parse it
        const parsedList: {_id: string, _item:string, _checked: boolean}[] = JSON.parse(storedList)
        //our parsedList has it's type set on it with _b4 each, and it is set to an array that we parse and get the stored list from 
        parsedList.forEach(itemObj => {
            //into our new listItem we pass in what it gets when it is created
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            //use the below instance of the list to call the add Item method and pass in the item
            FullList.instance.addItem(newListItem)
            //so we have retrieved everything from localS, created new items with a parsed list, stringifying the items, and populating our list again
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }
    
    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: any): void {
        this._list.push(itemObj)
        //save list with new item in it
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}