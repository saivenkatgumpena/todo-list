let tasks = JSON.parse(localStorage.getItem("folderTasks")) || {
    Personal: [],
    Work: [],
    Shopping: []
  };
  
  function getCurrentFolder() {
    return document.getElementById("folder").value;
  }
  
  function renderTasks() {
    const folder = getCurrentFolder();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    tasks[folder].forEach((task, index) => {
      const li = document.createElement("li");
  
      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" onchange="toggleDone(${index})" ${task.done ? "checked" : ""}/>
          <span class="${task.done ? "task-done" : ""}">${task.text}</span>
        </div>
        <button onclick="deleteTask(${index})">❌</button>
      `;
      taskList.appendChild(li);
    });
  
    localStorage.setItem("folderTasks", JSON.stringify(tasks));
  }
  
  function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    const folder = getCurrentFolder();
  
    if (text !== "") {
      tasks[folder].push({ text, done: false });
      input.value = "";
      renderTasks();
    }
  }
  
  function toggleDone(index) {
    const folder = getCurrentFolder();
    tasks[folder][index].done = !tasks[folder][index].done;
    renderTasks();
  }
  
  function deleteTask(index) {
    const folder = getCurrentFolder();
    tasks[folder].splice(index, 1);
    renderTasks();
  }
  
  // Initial render
  renderTasks();
// Add task on Enter key press
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
    