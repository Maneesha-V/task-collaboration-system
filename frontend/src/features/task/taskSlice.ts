import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "./taskTypes";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "./taskThunk";

interface TaskState {
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
 .addCase(
        getTasks.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        getTasks.fulfilled,
        (state, action) => {

          state.loading = false;

          state.tasks = action.payload.data.tasks;

        }
      )

      .addCase(
        getTask.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        getTask.fulfilled,
        (state, action) => {

          state.loading = false;

          state.task = action.payload.data;

        }
      )

      .addCase(
        createTask.fulfilled,
        (state, action) => {

          state.tasks.push(
            action.payload.data
          );

        }
      )

      .addCase(
        updateTask.fulfilled,
        (state, action) => {

          const updatedTask =
            action.payload.data;

          const index =
            state.tasks.findIndex(
              task =>
                task._id === updatedTask._id
            );

          if (index !== -1) {

            state.tasks[index] =
              updatedTask;

          }

        }
      )

      .addCase(
        deleteTask.fulfilled,
        (state, action) => {

          state.tasks =
            state.tasks.filter(
              task =>
                task._id !== action.payload
            );

        }
      );

  },

});

export default taskSlice.reducer;