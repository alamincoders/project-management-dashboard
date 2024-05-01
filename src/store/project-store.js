import { create } from "zustand";

export const useProjectStore = create((set) => ({
  project: null,
  setProject: (newProject) => set({ project: newProject }),
}));
