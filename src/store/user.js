import { create } from "zustand";

export const userStore = create((set) => ({
  user: {
    full_name: "Anonymous",
    email: "anonymous@gmail.com",
  },
}));
