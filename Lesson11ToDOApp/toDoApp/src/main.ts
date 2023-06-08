import './css/style.css'

//we are going to import our stuff here as a main page
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void  => {
//get the instances for the fullList and the template
const fullList = FullList.instance
const template = ListTemplate.instance

const itemEntryFOrm = document.getElementById("itemEntryForm") as HTMLFormElement
itemEntryFOrm.addEventListener("submit", (event:SubmitEvent): void =>{
  event.preventDefault()
  //prevent a reload of the page
  
//now we need to create the entry form and the submit handler
//in the index.html, the id for the input is addItem, so we will use that
const input = document.getElementById('newItem') as HTMLInputElement
const newEntryText: string = input.value.trim()
//after the time, if the input value is empty, return so that we dont add empty items to the list
if(!newEntryText.length) return
//calc the item if, cant use the length of list, grab the last item, calc id is one bigger than last
const itemId: number = fullList.list.length
? parseInt(fullList.list[fullList.list.length -1].id) + 1
: 1
const newItem = new ListItem(itemId.toString(), newEntryText)

fullList.addItem(newItem)
template.render(fullList)
})
//itemId uses [] to access that element of the arr and then we say .id to get that specific val from the item obj
//add listener to the form, instad of using inference to submit, explicitly say it!

const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
clearItems?.addEventListener('click', ():void =>{
  fullList.clearList()
  template.clear()
})
//the buttons methods above will only happen when the button is clicked. But, the page will load
//need to load the whole app and the template to render the list
fullList.load()
template.render(fullList)

}


//this tells the program, don't run the app until all of our content is loaded!!
document.addEventListener("DOMContentLoaded", initApp)