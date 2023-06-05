let form = document.getElementById("form");
let textInput: HTMLInputElement = document.getElementById("textInput") as HTMLInputElement;
let dateInput: HTMLInputElement = document.getElementById("dateInput") as HTMLInputElement;
let timeInput: HTMLInputElement = document.getElementById("timeInput") as HTMLInputElement;

let textarea: HTMLInputElement = document.getElementById("textarea") as HTMLInputElement;

let msg: HTMLInputElement = document.getElementById("msg") as HTMLInputElement;


let tasks: HTMLInputElement = document.getElementById("tasks") as HTMLInputElement;






form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});



function formValidation() {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  let dateInput: HTMLInputElement = document.getElementById("dateInput") as HTMLInputElement;
  dateInput.setAttribute("min", currentDate);

  if (textInput.value === "") {
    msg.innerHTML = "*task cannot be blank*";
    return false;
  } else if (dateInput.value < currentDate) {
    return false;
  } else {
    return uploadNewItemToLocal();
  }
}





function uploadNewItemToLocal() {

  const newTaskObj = createNewTasksObject(textInput.value, dateInput.value, timeInput.value, textarea.value
  );
  //פה אנחנו שולחים למתודה שתייצור אובייקט ומקבלים בחזרה אובייקט ואנחנו שמים אותה במשתנה

  const storageArray = getTasksFromLocal();
  storageArray.push(newTaskObj);
  updateObjectToLocal(storageArray);
  clearForm();
  createTasks();





}


//יוצרת אובייקט
function createNewTasksObject(textInput, dateInput, timeInput, textarea) {
  return {
    textInput,
    dateInput,
    timeInput,
    textarea,
  };
}






function getTasksFromLocal() {
  const productArrayJson = localStorage.getItem("tasks");
  const productArray = JSON.parse(productArrayJson);
  if (Array.isArray(productArray)) {
    return productArray;
  } else {
    return [];
  }
}




function updateObjectToLocal(newArray) {
  localStorage.setItem("tasks", JSON.stringify(newArray));
}







function createTasks() {

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  tasks.innerHTML = '';

  const storageArray = getTasksFromLocal();
  let index = 0;
  for (const task of storageArray) {
    const noteDiv = document.createElement('div');

    noteDiv.style.backgroundColor = getRandomColor(); // צבע רנדומלי לדיב
    noteDiv.id = 'note';
    noteDiv.innerHTML = `
    <hr/>
    <p  onclick="deleteItem(${index}, this.parentNode)"  class="fas fa-trash-alt">  press to delete </p>
      <h4>${currentDate}</h4>
      <h3>${task.textInput}</h3>
      <h4>${task.textarea}</span>
      <h5>Due data: ${task.dateInput} || ${task.timeInput} ◕ </h5>

    `;
    tasks.appendChild(noteDiv);
    index++;
  }
  clearForm();
}

const deleteItem = (index, parentDiv) => {
  const storageArray = getTasksFromLocal();
  storageArray.splice(index, 1);
  updateObjectToLocal(storageArray);
  parentDiv.remove();
}




function clearForm() {
  textInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  textarea.value = "";
}



function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}