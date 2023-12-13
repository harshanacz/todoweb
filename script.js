document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

const harshanaczLink = document.getElementById("harshanaczLink");
harshanaczLink.addEventListener("click", function () {
    window.open("https://harshanacz.github.io/", "_blank");
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {

        const truncatedTitle = taskInput.value.substring(0, 20);


        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-title">${truncatedTitle}</div>
            <div class="close-icon" onclick="removeTask(this)">×</div>
        `;

        taskList.appendChild(li);


        saveTasks();


        taskInput.value = "";
    }
}


function removeTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;

    // Remove task from the task list
    taskList.removeChild(li);

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    // Store tasks in an array
    taskList.childNodes.forEach(function (task) {
        const taskText = task.querySelector(".task-title").innerText.trim();
        tasks.push({ text: taskText });
    });

    // Save tasks to local storage if available
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
        console.error("Error saving tasks to local storage:", e);
    }
}

function loadTasks() {
    const taskList = document.getElementById("taskList");

    try {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Populate the task list with stored tasks
        storedTasks.forEach(function (task) {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="task-title">${task.text}</div>
                <div class="close-icon" onclick="removeTask(this)">×</div>
            `;
            taskList.appendChild(li);
        });
    } catch (e) {
        console.error("Error loading tasks from local storage:", e);
    }
}
