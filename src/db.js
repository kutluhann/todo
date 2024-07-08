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
    date: {
      type: Date,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
)

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)