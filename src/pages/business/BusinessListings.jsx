
import { useState } from "react";
import { Button, Modal, Input, Table, Tag } from "antd";
import {    Space, Popconfirm, message } from "antd";
import { useGetAllBusinessesQuery, useDeleteBusinessMutation } from "../../redux/services/businessApi";
import { useNavigate } from "react-router-dom";
import BusinessForm from "./BusinessForm";
import { set } from "react-hook-form";
 
const BusinessList = () => {
  const navigate = useNavigate();

  // Pagination & Search States
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch Businesses from API
  const { data, isLoading, isError } = useGetAllBusinessesQuery({ page, pageSize });

  // Delete Mutation
  const [deleteBusiness] = useDeleteBusinessMutation();

  // Handle Delete Business
  const handleDelete = async (id) => {
    try {
      await deleteBusiness(id).unwrap();
      message.success("Business deleted successfully!");
    } catch (error) {
      message.error("Failed to delete business!");
    }
  };

  // Filter Businesses based on Search Query
  const filteredBusinesses = data?.data?.businesses?.filter((business) =>
    business.name.toLowerCase().includes(searchText.toLowerCase()) ||
    business.email.toLowerCase().includes(searchText.toLowerCase()) ||
    business.phone.includes(searchText)
  ) || [];

  // Define Columns
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
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/admin/business/${record.id}`)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this business?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Search Bar & Add Business Button */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Name, Email, Phone"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Business
        </Button>
      </Space>

      {/* Business Table */}
      <Table
        columns={columns}
        dataSource={filteredBusinesses}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.data?.total || 0,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />

<Modal
        title="Add Business"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
      >
        <BusinessForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default BusinessList;
