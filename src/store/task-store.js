import { create } from "zustand";

//initial state
const initialState = {
  tasks: [],
  completedTasks: [],
};

const useTaskStore = create((set) => ({
  // State
  tasks: initialState.tasks,
  completedTasks: initialState.completedTasks,

  // Actions
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  editTask: (taskId, newDescription) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, description: newDescription } : task)),
    })),
  completeTask: (taskId) =>
    set((state) => {
      const taskToComplete = state.tasks.find((task) => task.id === taskId);
      if (taskToComplete) {
        return {
          tasks: state.tasks.filter((task) => task.id !== taskId),
          completedTasks: [...state.completedTasks, taskToComplete],
        };
      }
      return state;
    }),
  uncompleteTask: (taskId) =>
    set((state) => {
      const taskToUncomplete = state.completedTasks.find((task) => task.id === taskId);
      if (taskToUncomplete) {
        return {
          completedTasks: state.completedTasks.filter((task) => task.id !== taskId),
          tasks: [...state.tasks, taskToUncomplete],
        };
      }
      return state;
    }),
}));

export default useTaskStore;
