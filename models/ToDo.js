import mongoose from 'mongoose'

const toDoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

export default ToDo;
