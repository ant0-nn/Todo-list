import User from "../models/User.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const {task} = req.body;

        const newTask = new Task({
            task,
            completed: false,
        })

        await newTask.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: {tasks: newTask}
        })
        res.json(newTask)
    } catch (e) {
        console.log(e);
        res.json({message: "Something went wrong"});
    }
}

export const getMyAllTask = async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.tasks.map((task) => {
                return Task.findById(task._id)
            })
        )
        return res.json(list)
    } catch (e) {
        console.log(e);
        res.json({message: "Something went wrong"})
    }
}

export const getMyActiveTask = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      const list = await Promise.all(
        user.tasks.map(async (task) => {
          const foundTask = await Task.findById(task._id);
          foundTask.completed = false;
          return foundTask;
        })
      );
      res.json(list);
    } catch (e) {
      console.log(e);
      res.json({ message: "Something went wrong" });
    }
  };
  
  export const getMyCompletedTask = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      const list = await Promise.all(
        user.tasks.map(async (task) => {
          const foundTask = await Task.findById(task._id);
          foundTask.completed = true;
          return foundTask;
        })
      );
      res.json(list);
    } catch (e) {
      console.log(e);
      res.json({ message: "Something went wrong" });
    }
};

export const removeMyTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.json({message: "Error"})

    await User.findByIdAndUpdate(req.userId, {
      $pull: {tasks: req.params.id},
    })

    return res.json({message: "The task has been deleted"})

  } catch (e) {
    console.log(e);
      res.json({ message: "Something went wrong" });
  }
}

export const updateTask = async (req, res) => {
  try {
    const {id, completed} = req.body
    const task = await Task.findById(id)
    if (!task) return res.json({ message: "Error" });

    task.completed = !completed;
    await task.save()
    return res.json(task);
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong" });
  }
};