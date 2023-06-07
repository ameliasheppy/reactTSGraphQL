import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    //two methods on our list
    clear(): void,
    //below we are rendering a fullList of the FullList type
    render(fullList: FullList):void
}

//make a class that will create a list item for every item that is added to the list
//make a template!

export default class ListTemplate implements DOMList{
    //define the ul
    ul: HTMLUListElement

    //this is a singleton. 
    //what does that mean? 
    //only want one of these -------- a ul ------------- per list
    //get it, the ul is our list
    //so for a singleton, we do:
    static instance: ListTemplate = new ListTemplate()
    //sets it to a singleton list template

    //make sure that we get the right id from our index.html
    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    //below will clear the list on the DOM, don't need to save it to localS, it's just a display
    clear(): void{
        this.ul.innerHTML = ''
    }
    
    //below, with render, we can use the FullList from our class as a type
    render(fullList: FullList):void{
        //handle all the things in here
        //clear what we have so we don't duplicate the list
        this.clear()

        fullList.list.forEach(item => {
            //go through each ele, make a list ele with all of the things on it
            //need an li with a class of item, an input/checkbox with an id, tabindex, a label linked to the id with a for, a description in the label
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const checkboxxy = document.createElement("input") as HTMLInputElement
            checkboxxy.type = "checkbox"
            //the id will be unique
            //why don't we need the _id and _checked?
            //bc we are using getters and setters!
            checkboxxy.id = item.id
            checkboxxy.tabIndex = 0
            checkboxxy.checked = item.checked
            li.append(checkboxxy)

            checkboxxy.addEventListener('change', () =>{
                item.checked = !item.checked
                fullList.save()
            })
            //need to make our label
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className='button'
            button.textContent = "X"
            li.append(button)

            button.addEventListener("click", () => {
                fullList.removeItem(item.id)
                // fullList.save()  <----dont need to save bc the above method saves
                this.render(fullList)
                //we are in this render func. but look, when the button is clicked, we render
                //this will not create an inf loop bc it only runs when the button is clicked
            })

            //we made the list items, now add each li to the ul parent!
            this.ul.append(li)
        })
    }
}
//template is done!!
