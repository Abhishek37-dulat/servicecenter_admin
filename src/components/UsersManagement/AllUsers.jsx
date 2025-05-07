import React, { useState } from "react";
import { Table, Input, Button, Tag, Space } from "antd";
import { SearchOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";

const sampleUsers = [
  {
    key: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Business Owner",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    key: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "blocked",
    createdAt: "2024-03-12",
  },
];

export default function AllUsers() {
  const [searchText, setSearchText] = useState("");

  const filteredUsers = sampleUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" type="link">
            Edit
          </Button>
          <Button icon={<StopOutlined />} size="small" type="link" danger>
            {record.status === "active" ? "Block" : "Unblock"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/3"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}
