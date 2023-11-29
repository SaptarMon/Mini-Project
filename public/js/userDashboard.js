document.addEventListener('DOMContentLoaded', function () {
    // Fetch tasks when the page loads
    fetchdata();
    
    function fetchdata() {
        let uid = localStorage.getItem("username");
        console.log(uid);
        const url ="http://localhost:3000/admin/task/"+uid;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tasks = data.tasks;
                const tableBody = document.getElementById('taskTableBody');
                // if(data.notification=="1"){
                //     checkNotifications();
                
                
                
                tasks.forEach(task => {
                    if(task.notification=="1"){
                        let val1="You have been assigned to a new task, Task Title : "+task.Task_Title;
                        showNotification("Notification", val1 ,task._id);
                    }
                    const row = tableBody.insertRow();
                    row.insertCell(0).innerText = task.Task_Title;
                    row.insertCell(1).innerText = task.TASK_DESCRIPTION;
                    row.insertCell(2).innerText = task.PRIORITY_LEVEL;
                  //  row.insertCell(4).innerText = task.status;
                  // Create a dropdown for the "Status" field
          const statusCell = row.insertCell(3);
          const statusSelect = document.createElement('select');
          statusSelect.innerHTML = `
<option value="Incomplete">Incomplete</option>
<option value="On Progress">On Progress</option>
<option value="Completed">Completed</option>
          `;
          statusSelect.value = task.status;
         
          statusSelect.addEventListener('change', () => {
            updateStatus(task._id, statusSelect.value);
          });
          statusCell.appendChild(statusSelect);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
 
    function updateStatus(taskId, newStatus) {
      // Send a request to update the status in the database
      fetch(`admin/tasks/update-status/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Status updated successfully:', data);
        })
        .catch(error => console.error('Error updating status:', error));
    }
           
      }
})




// setInterval(checkNotifications, 5000);
 
  function checkNotifications(taskId) {
          let newStatus=0;
          console.log("check",taskId);
          fetch(`admin/tasks/update/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notification:newStatus}),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Status updated successfully:', data);
          })
         .catch(error => console.error('Error fetching user details:', error));
  }

   
  // Function to show notification
  function showNotification(title, message,taskid) {
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificat = document.getElementById('OK');
    notificat.addEventListener('click', () => {
      checkNotifications(taskid);
      closeNotification();
    });
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
 
    // Display the notification popup
    notificationPopup.style.display = 'block';
 
    // You can also add additional styling or animation effects here if needed
  }
 
  // Function to close notification
  function closeNotification() {
    const notificationPopup = document.getElementById('notificationPopup');
    
    notificationPopup.style.display = 'none';
  }
 
  // Your existing code for other functionalities
 
  // For testing purposes, you can call showNotification with sample data


  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logout);
 
  // Function to handle logout
  function logout() {
    
    window.location.href = 'login.html';
  }