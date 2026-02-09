//elementos dom
const form = document.querySelector("#task");
const taskList = document.querySelector("#task-list"); //não vai mudar
const titulo = document.querySelector("#titulo");
const prioridade = document.querySelector ("#prioridade");

//estado da aplicação
let tasks = []; //vai mudar

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
        prioridade: priority
    };
    tasks.push(newTask);

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
