import Task from "../models/Task.js"; // Importing the Task model

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const task = await Task.create({
            title,
            description,
            status,
            user: req.user.id
        });

        // Populate user details in response
        const populatedTask = await Task.findById(task._id).populate("user", "name email");

        res.status(201).json({
            message: "Task created successfully",
            taskCreationDdetails : populatedTask,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task", error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("user", "name email");
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user", "name email");
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
};

// All tassk logged-in user
const getUserTasksByStatus = async (req, res) => {
    try {
        // Fetch all tasks for the logged-in user
        const tasks = await Task.find({ user: req.user.id }).populate("user", "name email");

        // Group tasks by status
        const groupedTasks = {
            Pending: [],
            Ongoing: [],
            Done: []
        };

        tasks.forEach(task => {
            groupedTasks[task.status].push(task);
        });

        res.json({
            message: "User tasks grouped by status",
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            },
            tasks: groupedTasks
        });
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        res.status(500).json({ message: "Error fetching user tasks", error });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Find the task by ID
        const task = await Task.findById(req.params.id).populate("user", "name email");

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure that the logged-in user is the owner of the task
        if (task.user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own tasks" });
        }

        // Update the task fields if the user is authorized
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();

        res.json({
            message: "Task updated successfully",
            task,
            user: {
                id: task.user._id,
                name: task.user.name,
                email: task.user.email
            }
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task", error });
    }
};

// Change task status
const changeTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Find the task by ID
        const task = await Task.findById(req.params.id).populate("user", "name email");

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure that the logged-in user is the owner of the task
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only change the status of your own tasks" });
        }

        // Update the task status if the user is authorized
        task.status = status;
        await task.save();

        res.json({ 
            message: "Task status updated successfully", 
            task,
            user: {
                id: task.user._id,
                name: task.user.name,
                email: task.user.email
            }
         });
    } catch (error) {
        console.error("Error changing task status:", error);
        res.status(500).json({ message: "Error changing task status", error });
    }
};

// Delete a task by logged In user
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure that the logged-in user is the owner of the task
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own tasks" });
        }

        // Delete the task if the user is authorized
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Error deleting task", error });
    }
};

export { createTask, getTaskById, getTasks, getUserTasksByStatus, updateTask, changeTaskStatus, deleteTask };