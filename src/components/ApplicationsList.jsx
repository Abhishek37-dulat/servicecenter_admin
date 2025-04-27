import React, { useEffect } from "react";
import { useGetApplicationsQuery } from "../redux/services/hireWithUs";
import { Table, Spin, Alert } from "antd";

const ListApplications = () => {
  const { data, isLoading, isError, error } = useGetApplicationsQuery();

  const applications = data?.data || []; // Ensure applications is always an array

  useEffect(() => {
    if (isError) {
      console.error("Error fetching applications:", error);
    }
  }, [isError, error]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Education",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Job Position",
      dataIndex: "jobPosition",
      key: "jobPosition",
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <button className="btn btn-primary" onClick={() => handleViewDetails(record)}>
          View Details
        </button>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    console.log("View details for:", record);
    // Add navigation or modal to view detailed application information
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Applications List</h2>
      {isLoading ? (
        <Spin tip="Loading applications..." />
      ) : isError ? (
        <Alert
          message="Error"
          description="Failed to fetch applications. Please try again later."
          type="error"
          showIcon
        />
      ) : (
        <Table
          dataSource={applications}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default ListApplications;
