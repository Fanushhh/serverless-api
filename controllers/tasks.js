const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    } else {
      res.status(201).json({ task });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id : ${req.params.id}` });
    } else {
      res.status(200).json({ task });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id : ${req.params.id}` });
    } else {
      res.status(200).json("Task deleted");
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
