"use client";

import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

export const DndContext = ({ children, onDragEnd }) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
