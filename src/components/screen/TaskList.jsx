"use client";
import { Checkbox, Input, List, Modal } from "antd";
import { useState } from "react";

const TaskList = ({ tasks, onCompleteTask, onEditTask }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDescription, setEditTaskDescription] = useState("");

  const handleEdit = (taskId, description) => {
    setEditTaskId(taskId);
    setEditTaskDescription(description);
  };

  const handleSaveEdit = () => {
    onEditTask(editTaskId, editTaskDescription);
    setEditTaskId(null);
    setEditTaskDescription("");
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Checkbox checked={task.completed} onChange={() => onCompleteTask(task.id)}>
                Complete
              </Checkbox>,
              <button onClick={() => handleEdit(task.id, task.description)}>Edit</button>,
            ]}
          >
            <List.Item.Meta title={task.description} description={`Deadline: ${task.deadline}, Assigned to: ${task.assignee}`} />
          </List.Item>
        )}
      />
      <Modal title="Edit Task" open={!!editTaskId} onOk={handleSaveEdit} onCancel={() => setEditTaskId(null)}>
        <Input value={editTaskDescription} onChange={(e) => setEditTaskDescription(e.target.value)} placeholder="Enter updated task description" />
      </Modal>
    </>
  );
};

export default TaskList;
