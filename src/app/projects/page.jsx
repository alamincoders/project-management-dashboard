"use client";
import { useQuery } from "@tanstack/react-query";
import { Button, List, message } from "antd";
import Link from "next/link";

const fetchProjects = async () => {
  // Mock API call to fetch projects data
  return [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];
};

const ProjectsPage = () => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "projects",
    queryFn: fetchProjects,
  });

  const handleView = (projectId) => {
    message.info(`Viewing project with ID ${projectId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Projects Overview</h1>
        </div>
        <div className="mt-8">
          {isError && <div>Error fetching projects</div>}
          {isLoading && <div>Loading...</div>}
          {projects && (
            <List
              dataSource={projects}
              renderItem={(project) => (
                <List.Item key={project.id} className="flex justify-between items-center border-b py-4">
                  <span className="text-lg">{project.name}</span>
                  <div className="space-x-4">
                    <Link href={`/projects/${project.id}`}>
                      <Button type="primary" className="rounded">
                        View
                      </Button>
                    </Link>
                    <Button onClick={() => handleView(project.id)} className="rounded">
                      Edit
                    </Button>
                    <Button danger onClick={() => handleView(project.id)} className="rounded">
                      Delete
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
