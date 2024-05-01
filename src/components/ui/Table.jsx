"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiDownload, FiEye } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import data from "../../bin/FakeDB";
const Table = () => {
  const [tableData] = useState(data);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Updated to show 10 data per page
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Handler for changing the number of entries per page
  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10)); // Parse the selected value to an integer
    setCurrentPage(1); // Reset current page when entries per page changes
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  // Filter data based on search query
  const filteredData = tableData.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.BDay.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages based on the number of entries per page
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  // Slice the data to display only the entries for the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="container_fluid">
        <div className="mx-auto max-w-242.5">
          <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
            <div className="rounded-sm border border-stroke bg-white shadow-default  overflow-x-auto">
              <div className="px-[1.875rem] py-[1.125rem] border-b flex justify-between w-[45rem] md:w-auto">
                <div className="w-[15rem] md:w-[25rem]">
                  <input type="search" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="px-[1.25rem] h-[46px] w-full border focus:outline-none rounded-md" />
                </div>
                <div className="flex gap-2 items-center">
                  <select name="entriesPerPage" value={entriesPerPage} onChange={handleEntriesPerPageChange} className="cursor-pointer focus:border-none focus:outline-none">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value={filteredData.length}>All</option>
                  </select>
                  <p className="capitalize p-0 text-sm font-medium whitespace-nowrap">Entries per page</p>
                </div>
              </div>
              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr className="pb-8">
                      <th className="text-left pb-4 text-sm font-medium text-gray-900 pl-[1.875rem] py-[1.125rem]">Name</th>
                      <th className="text-left pb-4 text-sm font-medium text-gray-900  py-[1.125rem]">Position</th>
                      <th className="text-left pb-4 text-sm font-medium text-gray-900  py-[1.125rem]">BDay</th>
                      <th className="text-left pb-4 text-sm font-medium text-gray-900  py-[1.125rem]">Email/Phone</th>
                      <th className="text-left pb-4 text-sm font-medium text-gray-900  py-[1.125rem]">Address</th>
                      <th className="text-left pb-4 text-sm font-medium text-gray-900 py-[1.125rem]">Status</th>
                      <th className="text-right pb-4 text-sm font-medium text-gray-900 pr-[1.875rem] py-[2rem]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={index} className="border">
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700 pl-[1.875rem] py-4">{item.Name}</td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700 py-4">{item.Position}</td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700 py-4">{item.BDay}</td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700 py-4">{item.Email}</td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700 py-4">{item.Address}</td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700  py-4">{item.Status}</td>
                        <td className="whitespace-nowrap text-sm font-normal text-gray-700 pr-[1.125rem] py-4">
                          <div className="flex items-center justify-end space-x-3">
                            <button className="hover:text-primary">
                              <FiEye className="text-lg" />
                            </button>
                            <button className="hover:text-primary">
                              <AiOutlineDelete className="text-lg" />
                            </button>
                            <button className="hover:text-primary">
                              <FiDownload className="text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex justify-between px-[1.875rem] py-[2rem]">
                <div className="flex items-center">
                  <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1} className="px-3 py-1  text-gray-600 rounded-md disabled:opacity-50">
                    <IoIosArrowBack />
                  </button>

                  {pageNumbers.map((number) => (
                    <button key={number} onClick={() => setCurrentPage(number)} className={`mx-1 px-3 py-1 rounded-md ${currentPage === number ? "bg-primary text-white" : "text-blue-500"}`}>
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1  text-gray-600 rounded-md disabled:opacity-50"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
                <div className="">
                  <span>
                    Showing {currentPage} to {entriesPerPage} of {tableData.length} entries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
