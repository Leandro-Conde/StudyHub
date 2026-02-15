let filtroAtual = "todas";
//elementos dom
const form = document.querySelector("#task");
const taskList = document.querySelector("#task-list"); //não vai mudar
const titulo = document.querySelector("#titulo");
const prioridade = document.querySelector ("#prioridade");

const filtroTodas = document.getElementById("filtroTodas");
const filtroPendentes = document.getElementById("filtroPendentes");
const filtroConcluidas = document.getElementById("filtroConcluidas");
const clearBtn = document.getElementById("clearCompleted");
const contador = document.getElementById("contador");

function updateCounter() {
    const total = tasks.length;
    const concluidas = tasks.filter(task => task.concluida).length;
    const pendentes = total - concluidas;

    contador.textContent = `Total: ${total} pendentes: ${pendentes} | Concluidas: ${concluidas}`;
}

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

clearBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.concluida);

    saveTasks();
    renderTasks();
})

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

    tarefasFiltradas.forEach((task) =>{
        const li = document.createElement("li");

        li.textContent = `${task.titulo} (${task.prioridade})`;
        
        //botao de editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        
        editBtn.addEventListener("click" , (e) => {e.stopPropagation();
        
            li.innerHTML = "";

            //cria input
            const input = document.createElement("input")
            input.type = "text";
            input.value = task.titulo;

            //botao criado: salvar
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Salvar";

            //botao salvar
            saveBtn.addEventListener("click", () => {
                const novoTexto = input.value.trim();

                if (novoTexto !=="") {
                    task.titulo = novoTexto;
                    saveTasks();
                    renderTasks();
                }
            });

            //salvar com enter
            input.addEventListener("keydown", (Event) => {
                if (Event.key === "Enter") {
                    saveBtn.click();
                }
                if (Event.key === "Escape") {
                    renderTasks(); //cancela edição
                }
            });

                li.appendChild(input);
                li.appendChild(saveBtn);

                input.focus();

                });

        

        //toggle
        li.addEventListener("click", () => {task.concluida = !task.concluida;
    saveTasks();
    renderTasks();

    updateCounter();
});
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
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            renderTasks();
        });

        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


