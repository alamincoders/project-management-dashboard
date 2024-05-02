"use client";

import { getUsers } from "@/utils/api-requests";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export default function ListUsers({ users }) {
  const [count, setCount] = React.useState(0);

  const { data } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getUsers(),
    initialData: users,
    staleTime: 5 * 1000,
  });

  return (
    <div className="ml-[18rem]">
      <div className="container_fluid">
        <h1 className="text-3xl font-semibold mb-5 text-center">Users Profile</h1>
        {
          <div className="grid grid-cols-4 gap-5">
            {data.map((user) => (
              <div key={user.id} className="border text-center p-4 shadow cursor-pointer hover:bg-red-50/50">
                <Image src={`https://robohash.org/${user.id}?set=set2&size=180x180`} alt={user.name} width={180} height={180} className="mx-auto mb-3" />
                <h3>{user.name}</h3>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
