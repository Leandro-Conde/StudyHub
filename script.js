//elementos dom
const form = document.querySelector("#task");
const taskList = document.querySelector("#task-list"); //não vai mudar
const titulo = document.querySelector("#titulo");
const prioridade = document.querySelector ("#prioridade");

//estado da aplicação
let tasks = []; //vai mudar

//salvando as tarefas
function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function loadTasks() {
    const data = localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data);
    } else {
        tasks=[];
    }
    renderTasks();
}
loadTasks();


//formulário
form.addEventListener("submit", (Event) => {
    Event.preventDefault();//reload(impede)

    const title = titulo.value.trim();
    const priority = prioridade.value;

    //validação
    if (title === "") {
        alert("Digite um título");
        return;
    }

    //array
    const newTask = {
        titulo: title,
        prioridade: priority,
        concluida: false
    };
    tasks.push(newTask);
    saveTasks();
    //Atualiza a tela
    renderTasks();

    //limpa o form
    titulo.value = "";
    prioridade.value= "media";
});

//renderização
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) =>{
        const li = document.createElement("li");

        li.textContent = `${task.titulo} (${task.prioridade})`;

        taskList.appendChild(li);
    });
}

