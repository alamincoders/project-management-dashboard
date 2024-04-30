"use client";

import { userStore } from "@/store/user";

const UserPage = () => {
  const user = userStore((state) => state.user);
  return (
    <div>
      UserPage
      <h3>{user.full_name}</h3>
      <h3>{user.email}</h3>
    </div>
  );
};

export default UserPage;
