const Task = require('../model/adminPageModel');
const Users = require('../model/Users');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

// Controller to handle fetching all tasks
exports.getAllTasksUpdate = (req, res) => {
  const id = req.params.id;
  Task.find({ _id: id })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Controller to handle fetching all tasks
exports.getAllTasks = (req, res) => {
  Task.find({})
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Controller to handle creating a new task
exports.createTask = (req, res) => {
  const newTask = new Task(req.body);
  newTask.taskId = generateTaskId();
  newTask.save()
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Function to generate a random 5-digit Task-ID
function generateTaskId() {
  return  Math.floor(Math.random() * 9000) + 10000;
}

// Update Task
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    })
    .catch(error => {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Delete Task
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Fetch tasks based on the username
exports.getTasksByUsername = (req, res) => {
  const userId = req.params.id;
  console.log("usid", userId);
  Users.findById(userId)
    .then(user => {
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ error: 'User not found' });
      }
      const username = user.username;
      return Task.find({ ASSIGNED_TO_USER: username });
    })
    .then(tasks => {
      // Send tasks as JSON response
      res.json({ tasks });
    })
    .catch(err => {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Update task message
exports.updateTaskMessage = (req, res) => {
  const taskId = req.params.taskId;
  const newStatus = req.body.messages;
  Task.findByIdAndUpdate(taskId, { messages: newStatus }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Status updated successfully', task: updatedTask });
    })
    .catch(error => {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Update task status
exports.updateTaskStatus = (req, res) => {
  const taskId = req.params.taskId;
  const newStatus = req.body.status;
  Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Status updated successfully', task: updatedTask });
    })
    .catch(error => {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Completed Tasks
exports.getCompletedTasks = (req, res) => {
  Task.find({ status: 'Completed' })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching completed tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Current Tasks
exports.getCurrentTasks = (req, res) => {
  Task.find({ status: 'On Progress' })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching completed tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Search Tasks
exports.searchTasks = (req, res) => {
  const query = req.query.query;

  // Use a regular expression to perform a case-insensitive search
  const searchRegex = new RegExp(query, 'i');

  Task.find({
    $or: [
      { Task_Title: searchRegex },
      { ASSIGNED_TO_USER: searchRegex },
      { PRIORITY_LEVEL: searchRegex }
    ]
  })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error searching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Task Notification
exports.updateTaskNotification = (req, res) => {
  const taskId = req.params.taskId;
  const newStatus = req.body.notification;
  const userResponse = req.body.userResponse
  console.log("newStatus", newStatus);
  Task.findByIdAndUpdate(taskId, { notification: newStatus }, { userResponse: userResponse }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Status updated successfully', task: updatedTask });
    })
    .catch(error => {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Update task details, including messages   
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { messages, ...updatedTask } = req.body;
  Task.findByIdAndUpdate(taskId, { $set: updatedTask }, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    })
    .catch(error => {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Update task notification and add a new message   
exports.updateTaskNotification = (req, res) => {
  const taskId = req.params.taskId;
  const { notification, userResponse, message } = req.body;
  Task.findByIdAndUpdate(
    taskId,
    { notification, userResponse },
    { new: true }
  )
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      // Add a new message         
      updatedTask.messages.push({
        user: req.user.username, // Assuming you have user information in req.user           
        message,
        timestamp: new Date(),
      });
      // Save the updated task with the new message         
      return updatedTask.save();
    })
    .then(updatedTask => {
      res.json({
        message: 'Status and message updated successfully',
        task: updatedTask,
      });
    })
    .catch(error => {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};