"use client";
import { data } from "@/bin/FakeDB";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Table from "@/components/ui/Table";
import { useQuery } from "@tanstack/react-query";
import { Button, message } from "antd";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiEye } from "react-icons/fi";

const fetchProjects = async () => {
  // Mock API call to fetch projects data
  const projects = data;
  return projects;
};

const ProjectsPage = () => {
  const {
    data: projectsData,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 lg:ml-[18rem]">
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Projects Overview</h1>
        </div>
        <div className="mt-8">
          {isError && <div>Error fetching projects</div>}
          {isLoading && <LoadingSkeleton />}
          {projectsData && (
            <Table
              dataSource={projectsData}
              columns={[
                {
                  title: "Title",
                  dataIndex: "Title",
                  key: "Title",
                },
                {
                  title: "Description",
                  dataIndex: "Description",
                  key: "Description",
                },
                {
                  title: "Status",
                  dataIndex: "Status",
                  key: "Status",
                },
                {
                  title: "Action",
                  key: "Action",
                  render: (_, record) => (
                    <div className="flex items-center justify-center space-x-3">
                      <Link href={`/projects/${record.id}`}>
                        <Button type="text" className="hover:text-primary" icon={<FiEye />} />
                      </Link>
                      <Link href={`/projects/${record.id}`}>
                        <Button type="text" className="hover:text-primary" icon={<FiEdit />} />
                      </Link>
                      <Button type="text" danger className="hover:text-primary" icon={<AiOutlineDelete />} onClick={() => handleView(record.id)} />
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
