import React, { useState, useEffect } from "react";
import { Table, Select, Tag } from "antd";

const { Option } = Select;

const roleColors = {
  admin: "red",
  moderator: "blue",
  viewer: "green",
  business_owner: "purple",
};

export default function RolesManagement() {
  const [users, setUsers] = useState([
    {
      _id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
    },
    {
      _id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      role: "moderator",
    },
    {
      _id: "3",
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "viewer",
    },
    {
      _id: "4",
      fullName: "Bob Brown",
      email: "bob.brown@example.com",
      role: "business_owner",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (userId, role) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, role } : user
    );
    setUsers(updatedUsers);
  };

  useEffect(() => {
    // Here you can later add an API call or data fetching logic if needed
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
      render: (role) => <Tag color={roleColors[role] || "default"}>{role}</Tag>,
    },
    {
      title: "Change Role",
      key: "changeRole",
      render: (_, record) => (
        <Select
          defaultValue={record.role}
          style={{ width: 160 }}
          onChange={(value) => handleRoleChange(record._id, value)}
        >
          <Option value="admin">Admin</Option>
          <Option value="moderator">Moderator</Option>
          <Option value="viewer">Viewer</Option>
          <Option value="business_owner">Business Owner</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Roles Management</h2>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
      />
    </div>
  );
}
