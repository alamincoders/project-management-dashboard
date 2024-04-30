"use client"
import { useState } from "react";
import { List } from "antd";

const RecentActivities = ({ recentActivities }) => {
  const [activities, setActivities] = useState(recentActivities);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Recent Activities</h3>
      <List dataSource={activities} renderItem={(activity) => <List.Item key={activity.id}>{activity.description}</List.Item>} />
    </div>
  );
};

export default RecentActivities;
