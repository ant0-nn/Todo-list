import { createAsyncThunk, createSlice,createSelector  } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  loading: false,
  tasks: [],
  filter: "all", // Початкове значення фільтру (всі завдання)
};

export const createTask = createAsyncThunk("task/createTask", async ({ task }) => {
  try {
    const { data } = await axios.post("/tasks/create", { task });
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const getMyAllTask = createAsyncThunk("all-task/getMyAllTask", async () => {
  try {
    const { data } = await axios.get("/tasks/all-task");
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const removeMyTask = createAsyncThunk("delete/removeMyTask", async (id) => {
  try {
    const { data } = await axios.delete(`/tasks/delete/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const updateTask = createAsyncThunk("update/updateTask", async (updatedTask) => {
  try {
    const { data } = await axios.put(`/tasks/update/${updatedTask.id}`, updatedTask);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [createTask.pending]: (state) => {
      state.loading = true;
    },
    [createTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    [createTask.rejected]: (state) => {
      state.loading = false;
    },
    [getMyAllTask.pending]: (state) => {
      state.loading = true;
    },
    [getMyAllTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    [getMyAllTask.rejected]: (state) => {
      state.loading = false;
    },
    [removeMyTask.pending]: (state) => {
      state.loading = true;
    },
    [removeMyTask.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id,
      )
      state.tasks[index] = action.payload
    },
    [removeMyTask.rejected]: (state) => {
      state.loading = false;
    },
    [updateTask.pending]: (state) => {
      state.loading = true;
    },
    [updateTask.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id,
      )
      state.tasks[index] = action.payload
    },
    [updateTask.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setFilter } = taskSlice.actions;

export default taskSlice.reducer;