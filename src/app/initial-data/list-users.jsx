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
    <div style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
        <button onClick={() => setCount((prev) => prev - 1)} className="mx-4">
          decrement
        </button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>

      {
        <div className="grid grid-cols-4 gap-5">
          {data.map((user) => (
            <div key={user.id} className="border text-center">
              <Image src={`https://robohash.org/${user.id}?set=set2&size=180x180`} alt={user.name} width={180} height={180} />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
