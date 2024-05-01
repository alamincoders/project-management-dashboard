"use client";
import RecentActivities from "@/components/screen/RecentActivities";
import { useProjectStore } from "@/store/project-store";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, List, message, Select, Tabs } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const { Option } = Select;
const { TabPane } = Tabs;

const fetchProjectDetails = async (projectId) => {
  // Mock data for demonstration
  return {
    id: projectId,
    name: `Project ${projectId}`,
    tasks: [
      { id: 1, description: "Task 1", assigneeId: 1 },
      { id: 2, description: "Task 2", assigneeId: 2 },
    ],
    teamMembers: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" },
    ],
    recentActivities: [
      { id: 1, description: "Task 1 completed by John Doe" },
      { id: 2, description: "Task 2 created by Jane Smith" },
    ],
  };
};

const ProjectDetailsPage = ({ params }) => {
  const { id } = params;

  const {
    data: projectData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectDetails(id),
    enabled: !!id,
  });

  const [newTask, setNewTask] = useState("");
  const [assignee, setAssignee] = useState("");
  const { project, setProject } = useProjectStore();

  // Update project state with new task
  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  const handleAddTask = () => {
    if (!newTask.trim() || !assignee) {
      message.error("Please enter a task description and select an assignee");
      return;
    }

    // Implement adding a new task (mock implementation)
    const newTaskItem = { id: project.tasks.length + 1, description: newTask, assigneeId: assignee };
    const updatedTasks = [...project.tasks, newTaskItem];
    const updatedProject = { ...project, tasks: updatedTasks };
    setProject(updatedProject);
    message.success("Task added successfully");
    setNewTask("");
    setAssignee("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">{project ? project.name : "Project Details"}</h1>
        </div>
        <div className="mt-8">
          {isError && <div>Error fetching project details</div>}
          {isLoading && <div>Loading...</div>}
          {project && (
            <Tabs defaultActiveKey="1" className="w-full">
              <TabPane tab="Tasks" key="1">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Tasks</h3>
                  <List
                    dataSource={project.tasks}
                    renderItem={(task) => (
                      <List.Item key={task.id}>
                        {task.description} - <span className="text-primary">Assignee</span>:{" "}
                        <span className="underline cursor-pointer">{project.teamMembers.find((member) => member.id === task.assigneeId)?.name || "Unassigned"}</span>
                      </List.Item>
                    )}
                  />
                  <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter new task" className="mt-2" />
                  <div className="space-x-4 mt-5">
                    <Select value={assignee} onChange={(value) => setAssignee(value)} placeholder="Select assignee" className="mt-2 min-w-40">
                      <Option value="" disabled>
                        Select assignee
                      </Option>
                      {project.teamMembers.map((member) => (
                        <Option key={member.id} value={member.id}>
                          {member.name}
                        </Option>
                      ))}
                    </Select>
                    <Button type="primary" onClick={handleAddTask} className="mt-2">
                      Add Task
                    </Button>{" "}
                    <Link href="/tasks">
                      <Button type="link" className="mt-2 ml-2">
                        Task Manage Board
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Team Members" key="2">
                <div className="mt-8">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <List dataSource={project.teamMembers} renderItem={(member) => <List.Item key={member.id}>{member.name}</List.Item>} />
                </div>
              </TabPane>
              <TabPane tab="Recent Activities" key="3">
                <RecentActivities recentActivities={project.recentActivities} />
              </TabPane>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
