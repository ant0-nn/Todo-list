import {Router} from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createTask, 
         getMyAllTask, 
         getMyActiveTask, 
         getMyCompletedTask, 
         removeMyTask,
         updateTask } from "../controllers/task.js";
const router = new Router();

router.post("/create", checkAuth, createTask);

router.get("/all-task", checkAuth, getMyAllTask);

router.get("/active-task", checkAuth, getMyActiveTask);

router.get("/completed-task", checkAuth, getMyCompletedTask);

router.delete("/delete/:id", checkAuth, removeMyTask);

router.put("/update/:id", checkAuth, updateTask);

export default router;