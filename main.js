let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");

let tasks = document.getElementById("tasks");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});



function formValidation() {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  const dateInput = document.getElementById("dateInput");
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

    noteDiv.style.backgroundColor = getRandomColor(); 
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