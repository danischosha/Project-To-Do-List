var form = document.getElementById("form");
var textInput = document.getElementById("textInput");
var dateInput = document.getElementById("dateInput");
var timeInput = document.getElementById("timeInput");
var textarea = document.getElementById("textarea");
var msg = document.getElementById("msg");
var tasks = document.getElementById("tasks");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    formValidation();
});
function formValidation() {
    var date = new Date();
    var currentDate = date.toISOString().split('T')[0];
    var dateInput = document.getElementById("dateInput");
    dateInput.setAttribute("min", currentDate);
    if (textInput.value === "") {
        msg.innerHTML = "*task cannot be blank*";
        return false;
    }
    else if (dateInput.value < currentDate) {
        return false;
    }
    else {
        return uploadNewItemToLocal();
    }
}
function uploadNewItemToLocal() {
    var newTaskObj = createNewTasksObject(textInput.value, dateInput.value, timeInput.value, textarea.value);
    //פה אנחנו שולחים למתודה שתייצור אובייקט ומקבלים בחזרה אובייקט ואנחנו שמים אותה במשתנה
    var storageArray = getTasksFromLocal();
    storageArray.push(newTaskObj);
    updateObjectToLocal(storageArray);
    clearForm();
    createTasks();
}
//יוצרת אובייקט
function createNewTasksObject(textInput, dateInput, timeInput, textarea) {
    return {
        textInput: textInput,
        dateInput: dateInput,
        timeInput: timeInput,
        textarea: textarea,
    };
}
function getTasksFromLocal() {
    var productArrayJson = localStorage.getItem("tasks");
    var productArray = JSON.parse(productArrayJson);
    if (Array.isArray(productArray)) {
        return productArray;
    }
    else {
        return [];
    }
}
function updateObjectToLocal(newArray) {
    localStorage.setItem("tasks", JSON.stringify(newArray));
}
function createTasks() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = "".concat(day, "-").concat(month, "-").concat(year);
    tasks.innerHTML = '';
    var storageArray = getTasksFromLocal();
    var index = 0;
    for (var _i = 0, storageArray_1 = storageArray; _i < storageArray_1.length; _i++) {
        var task = storageArray_1[_i];
        var noteDiv = document.createElement('div');
        noteDiv.style.backgroundColor = getRandomColor(); // צבע רנדומלי לדיב
        noteDiv.id = 'note';
        noteDiv.innerHTML = "\n    <hr/>\n    <p  onclick=\"deleteItem(".concat(index, ", this.parentNode)\"  class=\"fas fa-trash-alt\">  press to delete </p>\n      <h4>").concat(currentDate, "</h4>\n      <h3>").concat(task.textInput, "</h3>\n      <h4>").concat(task.textarea, "</span>\n      <h5>Due data: ").concat(task.dateInput, " || ").concat(task.timeInput, " \u25D5 </h5>\n\n    ");
        tasks.appendChild(noteDiv);
        index++;
    }
    clearForm();
}
var deleteItem = function (index, parentDiv) {
    var storageArray = getTasksFromLocal();
    storageArray.splice(index, 1);
    updateObjectToLocal(storageArray);
    parentDiv.remove();
};
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
