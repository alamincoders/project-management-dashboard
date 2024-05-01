"use client";

import { cardsData } from "@/bin/CardsData";
import { DndContext } from "@/context/DndContext";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import LoadingSkeleton from "./LoadingSkeleton";

const { Option } = Select;

const DndBoard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    status: "", // Add more filter options as needed
    dueDate: "",
    assignee: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filterTasks = (task) => {
    const { status, dueDate, assignee } = filters;

    console.log("Task:", task);
    console.log("Filters:", filters);

    // Find the category of the task based on its ID
    const category = cardsData.find((category) => category.components.some((component) => component.id === task.id));

    if (!category) {
      // If the task doesn't belong to any category, don't display it
      return false;
    }

    // Check if the category matches the filter status
    if (status === "" || category.title === status) {
      return true;
    }
    return false;
  };

  // Function to search tasks based on searchQuery state
  const searchTasks = (task) => {
    return task.name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Function to handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const oldDroppableIndex = newData.findIndex((x) => x.id == source.droppableId.split("droppable")[1]);
      const newDroppableIndex = newData.findIndex((x) => x.id == destination.droppableId.split("droppable")[1]);
      const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const droppableIndex = newData.findIndex((x) => x.id == source.droppableId.split("droppable")[1]);
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };

  useEffect(() => {
    setData(cardsData);
  }, []);
  if (!data.length) {
    return <LoadingSkeleton />;
  }
  return (
    <DndContext onDragEnd={onDragEnd}>
      <div>
        {/* Filter section */}
        <div className="flex justify-center space-x-4 my-4">
          {/* Ant Design Select for filtering */}
          <Select placeholder="Select status" style={{ width: 120 }} onChange={(value) => handleFilterChange("status", value)}>
            <Option value="">All</Option>
            <Option value="To Do">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
          </Select>
          {/* Ant Design Input for search */}
          <Input placeholder="Search tasks..." style={{ width: 200 }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        {/* Task board */}
        <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
          {data.map((val, index) => (
            <Droppable key={index} droppableId={`droppable${index}`}>
              {(provided) => (
                <div className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed" {...provided.droppableProps} ref={provided.innerRef}>
                  <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
                  {val.components
                    .filter(filterTasks)
                    .filter(searchTasks)
                    .map((component, index) => (
                      <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                        {(provided) => (
                          <div className="bg-gray-200 mx-1 px-4 py-3 my-3" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                            {component.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default DndBoard;
