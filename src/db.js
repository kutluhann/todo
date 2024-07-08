import mongoose from "mongoose"

export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: 'todo-app',
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.log(err);
    });

    console.log(mongoose.models)
}

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)