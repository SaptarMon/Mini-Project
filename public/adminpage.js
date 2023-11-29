document.addEventListener('DOMContentLoaded', function () {
  // Fetch tasks when the page loads
  fetchTasks();
  getusersList();
 
  // Add event listeners for navigation links
  const createTaskLink = document.getElementById('createTaskLink');
  const Alltask1 = document.getElementById('Alltask');
  const currentTaskLink = document.getElementById('currentTaskLink');
  const completedTaskLink = document.getElementById('completedTaskLink');
  const searchTaskLink = document.getElementById('searchButton');
  //let ASSIGNED_TO_USER = document.getElementById("selectfield");
  const createTaskFormCancel = document.getElementById('createTaskFormCancel'); 
  createTaskFormCancel.addEventListener('click', hideCreateTaskForm);
 

  let searchButtonClicked= false;

  function searchTasks() {
    const searchInput = document.getElementById('searchInput').value;
 
    // Send a GET request to the server to search for tasks
    fetch(`/admin/search?query=${searchInput}`)
      .then(response => response.json())
      .then(tasks => displayTasks(tasks))
      .catch(error => console.error('Error searching tasks:', error))
      .then(()=>{
        searchButtonClicked=false;
      });
  }

  createTaskLink.addEventListener('click', showCreateTaskForm);
  currentTaskLink.addEventListener('click', showCurrentTasks);
  completedTaskLink.addEventListener('click', showCompletedTasks);
  searchTaskLink.addEventListener('click', 
  function(){
    if(!searchButtonClicked){ searchTasks()}});
  Alltask1.addEventListener('click',showalltask);

 
  // Event delegation for edit and delete buttons
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('editButton')) {
      const taskId = event.target.getAttribute('data-taskid');
      editTask(taskId);
    }
 
    if (event.target.classList.contains('deleteButton')) {
      const taskId = event.target.getAttribute('data-taskid');
      deleteTask(taskId);
    }
  });
 
  // Function to fetch tasks from the server
  function fetchTasks() {
    fetch('/admin/tasks')
      .then(response => response.json())
      .then(tasks => displayTasks(tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }
 
  // Function to display tasks in a table
  function displayTasks(tasks) {
    const taskTable = document.getElementById('taskTable');
    // Clear the existing table content
    taskTable.innerHTML = '';
 
    // Add table headers
    const headers = ['taskId','Task_Title', 'TASK_DESCRIPTION', 'PRIORITY_LEVEL', 'ASSIGNED_TO_USER','status', 'createdAt', 'updatedAt'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      if (header=='taskId'){
      th.innerHTML = header + `<span class="icon-arrow" onclick="sTable('${0}')">&UpArrow;</span>` ;
      headerRow.appendChild(th);}
      else{
        th.innerHTML = header ;
        headerRow.appendChild(th);
      }
    });
    headerRow.innerHTML += `<th>Actions  </th>`;
    taskTable.appendChild(headerRow);
 
    // Add task rows
    const headers1 = ['taskId','Task_Title', 'TASK_DESCRIPTION', 'PRIORITY_LEVEL', 'ASSIGNED_TO_USER','status', 'createdAt', 'updatedAt'];

    tasks.forEach(task => {
      const tr = document.createElement('tr');
      headers1.forEach(header => {
        const td = document.createElement('td');
        td.textContent = task[header];
        tr.appendChild(td);


      });
 
      // Add Edit and Delete buttons to each row
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'editButton';
      editButton.setAttribute('data-taskid', task._id);
 
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      deleteButton.setAttribute('data-taskid', task._id);
 
      const tdActions = document.createElement('td');
      tdActions.appendChild(editButton);
      tdActions.appendChild(deleteButton);
      tr.appendChild(tdActions);
 
      taskTable.appendChild(tr);
    });

    // const tdCreatedAt = document.createElement('th');
    // thCreatedAt.textContent = 'Created At';
    // tr.appendChild(thCreatedAt);

    // const tdUpdatedAt = document.createElement('th');
    // thUpdatedAt.textContent = 'Updated At';
    // tr.appendChild(thUpdatedAt);

    

  }
 
  // Function to show the create task form
  function showCreateTaskForm() {
    const createTaskForm = document.getElementById('createTaskForm');
    createTaskForm.style.display = 'block';
 
    // Add event listener for the form submission
    const createTaskFormSubmit = document.getElementById('createTaskFormSubmit');
    createTaskFormSubmit.addEventListener('click', submitTaskForm);
  }
 
  // Function to submit the create task form
  function submitTaskForm() {
    const taskForm = document.getElementById('taskForm');
    const formData = new FormData(taskForm);
    
 console.log("fx",Object.fromEntries(formData));
    // Send a POST request to create a new task
    fetch('/admin/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then(response => response.json())
      .then(() => {
        // After successfully creating a task, hide the form and refresh the task list
        hideCreateTaskForm();
        fetchTasks();
        displayTaskId(task);
      })
      .catch(error => console.error('Error creating task:', error));
  }
 
// function displayTaskId(task) {
//   const taskTable = document.getElementById('taskTable');
//   const tr = document.createElement('tr');
//   const tdTaskId = document.createElement('td');
//   tdTaskId.textContent = task.taskId;
//   tr.appendChild(tdTaskId);
  
//   taskTable.insertBefore(tr, taskTable.firstChild); // Insert the new row at the beginning

// }

  // Function to hide the create task form
  function hideCreateTaskForm() {
    const createTaskForm = document.getElementById('createTaskForm');
    createTaskForm.style.display = 'none';
  }
 

  function getusersList(){

  
    const url = "http://localhost:3000/users";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let length = data.length;
        console.log(length);
        let content =`<select name='ASSIGNED_TO_USER' id='ASSIGNED_TO_USER' required><option> Select User </option>`;
        for (i = 0; i < length; i++) {
          content += `<option value="${data[i].name}" data-extra="${data[i].name}">${data[i].name}</option>`;

          content += `<td>${data[i].createdAt}</td>`
          content += `<td>${data[i].updatedAt}</td>`;
        }
       content += `</select>`;
      //   let content=` <select id="PRIORITY_LEVEL2" name="PRIORITY_LEVEL2" required>
      //   <option value="High">High</option>
      //   <option value="Medium">Medium</option>
      //   <option value="Low">Low</option>
      // </select>`
        document.getElementById("ASSIGNED_TO_USER").innerHTML = content;
      })
    .catch((error) => {
        console.log(error.message);
    });

  }

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logout);
 
  // Function to handle logout
  function logout() {
  
    window.location.href = 'login.html';
  }










  
  currentTaskLink.addEventListener('click', showCurrentTasks);
  // Function to show current tasks
  function showCurrentTasks() {
    fetch('/admin/current-tasks')
        .then(response => response.json())
        .then(completedTasks => displayTasks(completedTasks))
        .catch(error => console.error('Error fetching completed tasks:', error));
    console.log('Show current tasks');
  }
 
  // Function to show completed tasks
  
    const completedTaskLink2 = document.getElementById('completedTaskLink');
    completedTaskLink2.addEventListener('click', showCompletedTasks);
   
    // ... existing code ...
   
    function showCompletedTasks() {
      fetch('/admin/completed-tasks')
        .then(response => response.json())
        .then(completedTasks => displayTasks(completedTasks))
        .catch(error => console.error('Error fetching completed tasks:', error));
    }

 
  // Function to show the search form
  function showSearchForm() {
    // Implement this based on your requirements
    console.log('Show search form');
  }

  function showalltask(){
    location.reload();
  }
 
 

     // Function to handle editing a task
function editTask(taskId) {
  
  let editfrm= document.getElementById("editTaskForm");
  editfrm.style.display="block";
  // Fetch the task details by taskId using GET method
  let url="http://localhost:3000/admin/tasks/"+taskId
  fetch(url)
    .then(response => response.json())
    .then(task => {
      console.log(task);
      // Populate the edit form with task details
      document.getElementById('editTaskId').value = task[0]._id;
      document.getElementById('editTaskTitle').value = task[0].Task_Title;
      document.getElementById('editTaskDescription').value = task[0].TASK_DESCRIPTION;
      // document.getElementById('editTaskDueDate').value = task[0].DUE_DATE;
      document.getElementById('editTaskPriority').value = task[0].PRIORITY_LEVEL;
      document.getElementById('editTaskAssignedTo').value = task[0].ASSIGNED_TO_USER;
 
      // Show the edit form
      document.getElementById('editTaskForm').style.display = 'block';
    })
    .catch(error => console.error('Error fetching task details for edit:', error));
}

const updatedata = document.getElementById('update1');
updatedata.addEventListener('click', updateTask);

const canceldata = document.getElementById('cancel1');
canceldata.addEventListener('click', cancelUpdateTask);

// Function to handle updating a task
function updateTask() {
  // Gather the updated task details from the form
  const taskId = document.getElementById('editTaskId').value;
  const title = document.getElementById('editTaskTitle').value;
  const description = document.getElementById('editTaskDescription').value;
  // const dueDate = document.getElementById('editTaskDueDate').value;
  const priority = document.getElementById('editTaskPriority').value;
  const assignedTo = document.getElementById('editTaskAssignedTo').value;
 
  // Construct updated task object
  const updatedTask = {
    Task_Title: title,
    TASK_DESCRIPTION: description,
    // DUE_DATE: dueDate,
    PRIORITY_LEVEL: priority,
    ASSIGNED_TO_USER: assignedTo,
  };
 
  // Send PUT request to update task details
  fetch(`/admin/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  })
    .then(response => response.json())
    .then(updatedTask => {
      console.log(`Updated task: ${JSON.stringify(updatedTask)}`);
      fetchTasks(); // You should implement a function to refresh the task list
      document.getElementById('editTaskForm').style.display = 'none';
    })
    .catch(error => console.error(error));
}
 
// Function to handle canceling the update for a task
function cancelUpdateTask() {
  document.getElementById('editTaskForm').style.display = 'none';






  }

  function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("taskTable");
    switching = true;
    // Initialize sort order for the column if not already set
    if (!sortOrders[columnIndex]) {
        sortOrders[columnIndex] = 1; // 1 for ascending
    } else {
        sortOrders[columnIndex] *= -1; // Toggle between ascending (1) and descending (-1)
    }

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            var xValue = x.innerHTML.toLowerCase();
            var yValue = y.innerHTML.toLowerCase();

            if (sortOrders[columnIndex] === 1 ? xValue > yValue : xValue < yValue) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
 
  // Function to handle deleting a task
  function deleteTask(taskId) {
    // Send a DELETE request to the server to delete the task
    fetch(`/admin/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        // After successfully deleting a task, refresh the task list
        fetchTasks();
      })
      .catch(error => console.error('Error deleting task:', error));
  }
});






var sortOrders = [];
function sTable(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("taskTable");
  switching = true;
  // Initialize sort order for the column if not already set
  if (!sortOrders[columnIndex]) {
      sortOrders[columnIndex] = 1; // 1 for ascending
  } else {
      sortOrders[columnIndex] *= -1; // Toggle between ascending (1) and descending (-1)
  }

  while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[columnIndex];
          y = rows[i + 1].getElementsByTagName("td")[columnIndex];

          var xValue = x.innerHTML.toLowerCase();
          var yValue = y.innerHTML.toLowerCase();

          if (sortOrders[columnIndex] === 1 ? xValue > yValue : xValue < yValue) {
              shouldSwitch = true;
              break;
          }
      }

      if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
      }
  }
}