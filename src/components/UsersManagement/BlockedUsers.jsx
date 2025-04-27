import React, { useState, useEffect } from "react";
import { Table, Button, message, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

// Sample mock blocked users data
const mockBlockedUsers = [
  {
    _id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    blockedAt: "2025-04-18T10:30:00Z",
  },
  {
    _id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    role: "moderator",
    blockedAt: "2025-04-17T14:15:00Z",
  },
  {
    _id: "3",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "viewer",
    blockedAt: "2025-04-16T08:10:00Z",
  },
  {
    _id: "4",
    fullName: "Bob Brown",
    email: "bob.brown@example.com",
    role: "business_owner",
    blockedAt: "2025-04-15T16:05:00Z",
  },
];

export default function BlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate fetching blocked users
  const fetchBlockedUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setBlockedUsers(mockBlockedUsers); // Simulate API response
      setLoading(false);
    }, 1000);
  };

  // Handle unblocking user (mock)
  const handleUnblock = (userId) => {
    setBlockedUsers(blockedUsers.filter((user) => user._id !== userId)); // Remove user from blocked list
    message.success("User unblocked successfully.");
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Blocked At",
      dataIndex: "blockedAt",
      key: "blockedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => handleUnblock(record._id)}
        >
          Unblock
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={blockedUsers}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
