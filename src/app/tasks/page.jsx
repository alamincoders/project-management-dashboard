"use client";
import TaskList from "@/components/screen/TaskList";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, List, message, Modal } from "antd";
import { useState } from "react";

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      message.error("Task description cannot be empty");
      return;
    }
    const assignee = "John Doe";
    const deadline = "Tomorrow";
    const newTaskItem = {
      id: tasks.length + 1,
      description: newTask,
      assignee,
      deadline,
      completed: false,
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
    message.success("Task added successfully");
    setIsModalVisible(false);
  };

  const handleEditTask = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, description: newDescription } : task));
    setTasks(updatedTasks);
    message.success("Task updated successfully");
  };

  const handleCompleteTask = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      // Move task to completedTasks
      setCompletedTasks([...completedTasks, taskToComplete]);
      // Remove task from tasks
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      message.success("Task marked as completed");
    }
  };

  const handleUncompleteTask = (taskId) => {
    const taskToUncomplete = completedTasks.find((task) => task.id === taskId);
    if (taskToUncomplete) {
      // Move task back to tasks
      setTasks([...tasks, taskToUncomplete]);
      // Remove task from completedTasks
      const updatedCompletedTasks = completedTasks.filter((task) => task.id !== taskId);
      setCompletedTasks(updatedCompletedTasks);
      message.success("Task marked as uncompleted");
    }
  };

  return (
    <div className="lg:ml-[20rem] bg-white ml-2 my-2 mr-2 lg:my-4 xl:my-8 lg:mr-4 xl:mr-8 p-2 lg:p-4 rounded">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Tasks</h1>
        <div className="mb-4 space-x-2">
          {completedTasks.length > 0 && (
            <Button type="link" onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
              {showCompletedTasks ? "Hide Completed" : "Show Completed"}
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Add Task
          </Button>
        </div>
      </div>
      <TaskList tasks={tasks} completedTasks={completedTasks} onCompleteTask={handleCompleteTask} onUncompleteTask={handleUncompleteTask} onEditTask={handleEditTask} />

      <Modal title="Add New Task" open={isModalVisible} onOk={handleAddTask} onCancel={() => setIsModalVisible(false)}>
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter task description" />
      </Modal>

      {showCompletedTasks && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Completed Tasks:</h2>
          <List
            itemLayout="horizontal"
            dataSource={completedTasks}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.description} />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default TaskManagementPage;
