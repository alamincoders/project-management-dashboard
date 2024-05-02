"use client";
import { data } from "@/bin/FakeDB";
import { Table as AntdTable, Button, Input, Modal, Select, notification } from "antd";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiEye } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import EditProjectForm from "../screen/ProjectEditModal";
const { Option } = Select;

const Table = ({ projects }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedProject(null);
    setIsModalVisible(false);
  };

  const handleDelete = async (projectId) => {
    notification.success({
      message: "Success",
      description: `Project ${projectId} deleted successfully.`,
    });
  };

  const filteredData = !projects
    ? data.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()))
    : projects.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      align: "center",
      render: (text) => <span className="whitespace-nowrap text-sm font-normal text-gray-700">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      align: "center",
      render: (text) => <span className="whitespace-nowrap text-sm font-normal text-gray-700">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      align: "center",
      render: (text) => <span className="whitespace-nowrap text-sm font-normal text-gray-700">{text}</span>,
    },
    {
      title: "Action",
      key: "Action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center space-x-3">
          <Link href={`/projects/${record.id}`}>
            <Button type="text" className="hover:text-primary" icon={<FiEye />} />
          </Link>

          <Button type="text" className="hover:text-primary" icon={<FiEdit />} onClick={() => handleEdit(record)} />

          <Button type="text" danger className="hover:text-primary" icon={<AiOutlineDelete />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="container_fluid">
      <div className="mx-auto max-w-242.5">
        <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
          <div className="rounded-sm border border-stroke bg-white shadow-default overflow-x-auto">
            <div className="px-[1.875rem] py-[1.125rem] border-b flex justify-between w-[45rem] md:w-auto">
              <div className="w-[15rem] md:w-[25rem]">
                <Input placeholder="Search Projects..." value={searchQuery} onChange={handleSearchChange} className="px-[1.25rem] h-[46px] w-full border focus:outline-none rounded-md" />
              </div>
              <div className="flex gap-2 items-center">
                <Select value={entriesPerPage} onChange={handleEntriesPerPageChange} className="cursor-pointer focus:border-none focus:outline-none">
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={filteredData.length}>All</Option>
                </Select>
                <p className="capitalize p-0 text-sm font-medium whitespace-nowrap">Entries per page</p>
              </div>
            </div>
            <AntdTable columns={columns} dataSource={paginatedData} pagination={false} rowKey={(record) => record.id} className="w-full" />
            {/* Pagination */}
            <div className="flex justify-between px-[1.875rem] py-[2rem]">
              <div className="flex items-center">
                <Button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1} className="px-3 py-1  text-gray-600 rounded-md disabled:opacity-50">
                  <IoIosArrowBack />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Button key={number} onClick={() => setCurrentPage(number)} className={`mx-1 px-3 py-1 rounded-md ${currentPage === number ? "bg-primary text-white" : "text-blue-500"}`}>
                    {number}
                  </Button>
                ))}
                <Button
                  onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1  text-gray-600 rounded-md disabled:opacity-50"
                >
                  <IoIosArrowForward />
                </Button>
              </div>
              <div className="hidden lg:block">
                <span>
                  Showing {currentPage} to {entriesPerPage} of {projects ? projects.length : data.length} entries
                </span>
              </div>
            </div>

            {/* Edit Project Modal */}
            <Modal title="Edit Project" open={isModalVisible} onCancel={handleCancel} footer={null}>
              <EditProjectForm project={selectedProject} onCancel={handleCancel} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
