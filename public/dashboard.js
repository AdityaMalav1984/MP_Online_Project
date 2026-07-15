const api = "/tasks";

// Optional: check if user should be here (simple check)
// In a real app this would use tokens
if (!document.referrer || (!document.referrer.includes('login.html') && window.location.pathname.includes('dashboard'))) {
    // just a visual thing for this demo
}

function loadTasks() {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            let rows = "";
            data.forEach(task => {
                const isCompleted = task.completed === 1;
                rows += `
                <tr class="${isCompleted ? 'task-completed' : ''}">
                    <td>#${task.id}</td>
                    <td>${task.employee_name}</td>
                    <td>${task.title}</td>
                    <td>
                        <input type="checkbox"
                        ${isCompleted ? "checked" : ""}
                        onchange="updateTask(${task.id}, this.checked ? 1 : 0)">
                    </td>
                    <td>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            });
            document.getElementById("taskTable").innerHTML = rows;
        })
        .catch(err => console.error("Error loading tasks:", err));
}

function addTask() {
    let employeeInput = document.getElementById("employee");
    let titleInput = document.getElementById("title");
    
    let employee = employeeInput.value.trim();
    let title = titleInput.value.trim();

    if (!employee || !title) {
        alert("Please fill in both fields");
        return;
    }

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employee_name: employee,
            title: title
        })
    })
    .then(() => {
        employeeInput.value = "";
        titleInput.value = "";
        loadTasks();
    })
    .catch(err => console.error("Error adding task:", err));
}

function updateTask(id, status) {
    fetch(api + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: status
        })
    })
    .then(() => loadTasks())
    .catch(err => console.error("Error updating task:", err));
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        fetch(api + "/" + id, {
            method: "DELETE"
        })
        .then(() => loadTasks())
        .catch(err => console.error("Error deleting task:", err));
    }
}

function logout() {
    window.location = "login.html";
}

// Load tasks on page load
loadTasks();
