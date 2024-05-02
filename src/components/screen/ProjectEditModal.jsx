import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const EditProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.Title || "",
    description: project?.Description || "",
    status: project?.Status || "",
  });

  // Update form data when project prop changes
  useEffect(() => {
    setFormData({
      title: project?.Title || "",
      description: project?.Description || "",
      status: project?.Status || "",
    });
  }, [project]);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onCancel(); // Close the modal after saving
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", status: "" }); // Reset form data
    onCancel();
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
      </Form.Item>
      <Form.Item label="Description">
        <Input value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
      </Form.Item>
      <Form.Item label="Status">
        <Select value={formData.status} onChange={(value) => handleChange("status", value)}>
          <Option value="To Do">To Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProjectForm;
