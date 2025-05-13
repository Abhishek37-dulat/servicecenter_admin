import { useState } from "react";
import { Button, Modal, Input, Table, Tag } from "antd";
import { Space, Popconfirm, message } from "antd";
import {
  useGetAllBusinessesQuery,
  useDeleteBusinessMutation,
} from "../../redux/services/businessApi";

import { useNavigate } from "react-router-dom";
import BusinessForm from "./BusinessForm";
import { set } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import BusinessInfo from "../../components/Business/BusinessInfo";
const BusinessList = () => {
  const navigate = useNavigate();

  // Pagination & Search States
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch Businesses from API
  const { data, isLoading, isError } = useGetAllBusinessesQuery({
    page,
    pageSize,
  });

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
  console.log(data);
  // Filter Businesses based on Search Query
  const filteredBusinesses =
    data?.data?.data?.filter(
      (business) =>
        business.businessName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        business.email.toLowerCase().includes(searchText.toLowerCase()) ||
        business.phone.includes(searchText)
    ) || [];

  // Define Columns
  const columns = [
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (services) => (
        <Space wrap>
          {services?.map((service) => (
            <Tag color="blue" key={service.id}>
              {service.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities) => (
        <Space wrap>
          {amenities?.map((item) => (
            <Tag color="green" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<FaEye />}
            type="default"
            onClick={() => navigate(`/admin/businessinfo/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<MdDelete />} />
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
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
        style={{ padding: "24px", maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <BusinessInfo
              closeModal={() => setIsModalOpen(false)}
              isModal={true}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BusinessList;
