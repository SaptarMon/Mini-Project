const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  Task_Title: String,
  TASK_DESCRIPTION: String,
  PRIORITY_LEVEL: String,
  ASSIGNED_TO_USER: String,
  status: { 
    type: String,
    default: "Incomplete"},
  userResponse:String,
  notification:{
    type:Number,
    default:"1" },
   messages: {
    type: String,
    default: "not updated yet" },
},
{
  timestamps:true
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;