//- selecting DOM elements
const form = document.querySelector('form');
const input = document.querySelector('.input');
const ul = document.querySelector('ul');
const li = document.querySelector('li');
const clearBtn = document.querySelector('.clear-btn');
const button = document.querySelector('button');
// set and get data from local storage
const getItems = () => JSON.parse(localStorage.getItem('itemList'));
const setItems = (arr) => localStorage.setItem('itemList', JSON.stringify(arr));

let data = getItems();
class Obj {
  constructor(task) {
    this.id = Math.random().toString(32).slice(-3);
    this.task = task;
    this.done = false;
  }
};

//-- Creating a new <li> based on text entry
const makeLi = (text, id, done) => {
  const newLi = document.createElement('li');
  newLi.setAttribute('id', id);
  const textSpan = document.createElement('span');
  textSpan.className = 'text-span';
  const trashDiv = document.createElement('span');
  trashDiv.className = 'far fa-trash-alt';
  textSpan.textContent = text;
  textSpan.style.textDecoration = done ? 'line-through' : '';
  newLi.appendChild(textSpan);
  newLi.appendChild(trashDiv);
  // marking task as done
  newLi.addEventListener('click', () => {
    const item = data.find(item => item.id === id)
    if (!item.done) {
      textSpan.style.textDecoration = 'line-through';
      item['done'] = true;
      setItems(data);
    } else {
      textSpan.style.textDecoration = '';
      item['done'] = false;
      setItems(data);
    }
  });
  // deleting li element after clicking it's trashDiv childElement
  trashDiv.addEventListener('click', event => {
	  event.target.parentNode.remove(event.target);
  });

  ul.prepend(newLi);
};

//Get items from Local Storage
if (data === null) {
  data = [];
  // localStorage.setItem('itemList', '[]');
} else if (data !== null) {
  data.forEach(item => makeLi(item['task'], item['id'], item['done']));
};

// Creating a new task
const handleSubmit = (event) => {
  event.preventDefault();

  // preventing an empty input
  if (input.value.trim() === '') {
    return input.value = '';
  };

  // creating a new object based on the entry value
  const newTask = new Obj(input.value);

  // creating a new li element based on entry value
  makeLi(newTask['task'], newTask['id'], newTask['done']);

  data.push(newTask);
  setItems(data);

  input.value = '';
};

form.addEventListener('submit', handleSubmit);
button.addEventListener('click', handleSubmit);

//-- Clear button functionality
clearBtn.addEventListener('click', event => {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';
  data = [];
  localStorage.removeItem('itemList');
});
