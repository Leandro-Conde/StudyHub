let filtroAtual = "todas";
//elementos dom
const form = document.querySelector("#task");
const taskList = document.querySelector("#task-list"); //não vai mudar
const titulo = document.querySelector("#titulo");
const prioridade = document.querySelector ("#prioridade");

const filtroTodas = document.getElementById("filtroTodas");
const filtroPendentes = document.getElementById("filtroPendentes");
const filtroConcluidas = document.getElementById("filtroConcluidas");

//estado da aplicação
let tasks = []; //vai mudar

filtroTodas.addEventListener("click",() =>  {
    filtroAtual = "todas";
    renderTasks();
})

filtroPendentes.addEventListener("click",() =>  {
    filtroAtual = "pendentes";
    renderTasks();
})

filtroConcluidas.addEventListener("click",() =>  {
    filtroAtual = "concluidas";
    renderTasks();
});


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

    let tarefasFiltradas = tasks;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tasks.filter(task => !task.concluida);
    } if (filtroAtual === "concluidas") {
        tarefasFiltradas = tasks.filter(task => task.concluida);
    }

    tarefasFiltradas.forEach((task, index) =>{
        const li = document.createElement("li");

        li.textContent = `${task.titulo} (${task.prioridade})`;

        //ao concluir vai adicionar uma class
        if (task.concluida) {
            li.classList.add("feito");
        }

            //criar botao
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";

            //evento click
            deleteBtn.addEventListener("click", (e) =>{
            e.stopPropagation();//evita marcar como concluida
            tasks.splice(index, 1);//remove 1 item da posição index
            saveTasks();
            renderTasks();
            
        });

        //evento de click
        li.addEventListener("click", () => {

            tasks[index].concluida = !tasks[index].concluida;
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
});
}

