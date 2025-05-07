import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import moment from "moment";

// Sample mock activity logs data
const mockLogs = [
  {
    _id: "1",
    user: { fullName: "John Doe", email: "john.doe@example.com" },
    action: "user_created",
    details: "Created a new user account.",
    timestamp: "2025-04-18T10:30:00Z",
  },
  {
    _id: "2",
    user: { fullName: "Jane Smith", email: "jane.smith@example.com" },
    action: "user_deleted",
    details: "Deleted a user account.",
    timestamp: "2025-04-17T14:15:00Z",
  },
  {
    _id: "3",
    user: { fullName: "Alice Johnson", email: "alice.johnson@example.com" },
    action: "role_updated",
    details: "Updated the user role to Admin.",
    timestamp: "2025-04-16T08:10:00Z",
  },
  {
    _id: "4",
    user: { fullName: "Bob Brown", email: "bob.brown@example.com" },
    action: "business_info_updated",
    details: "Updated business contact details.",
    timestamp: "2025-04-15T16:05:00Z",
  },
];

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use the mock data as the logs
  useEffect(() => {
    setLogs(mockLogs);
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>
          <strong>{user ? user.fullName : "System"}</strong>
          <br />
          <small className="text-gray-500">{user ? user.email : "-"}</small>
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action) => (
        <Tag color="blue" className="capitalize">
          {action.replace(/_/g, " ")}
        </Tag>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (details) => <span>{details || "N/A"}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => moment(timestamp).format("YYYY-MM-DD hh:mm A"),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User Activity Log</h2>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={logs}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
