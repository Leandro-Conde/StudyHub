const form = document.querySelector("#task");
const taskList = document.querySelector("#task-list"); //não vai mudar

let tasks = []; //vai mudar

form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    alert("Formulário enviado");
});