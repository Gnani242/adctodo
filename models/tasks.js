import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending" // Optional: Add default value if needed
  },
  deadline: {
    type: Date // Better to use Date type for deadlines
  }
});

export default mongoose.model("Task", tasksSchema);
