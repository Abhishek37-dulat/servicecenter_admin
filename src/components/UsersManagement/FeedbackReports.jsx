import React, { useState, useEffect } from "react";
import { Table, message, Tag, Button, Modal, Input } from "antd";
import moment from "moment";

// Sample mock data for feedback reports
const mockFeedbackReports = [
  {
    _id: "1",
    user: { fullName: "John Doe", email: "john.doe@example.com" },
    businessName: "Tech Innovations",
    rating: 5,
    feedback: "Great service, would recommend!",
    date: "2025-04-18T10:30:00Z",
  },
  {
    _id: "2",
    user: { fullName: "Jane Smith", email: "jane.smith@example.com" },
    businessName: "Foodies Paradise",
    rating: 3,
    feedback: "The food was okay, could be improved.",
    date: "2025-04-17T14:15:00Z",
  },
  {
    _id: "3",
    user: { fullName: "Alice Johnson", email: "alice.johnson@example.com" },
    businessName: "Beauty Hub",
    rating: 4,
    feedback: "Great experience, will visit again.",
    date: "2025-04-16T08:10:00Z",
  },
  {
    _id: "4",
    user: { fullName: "Bob Brown", email: "bob.brown@example.com" },
    businessName: "Fitness World",
    rating: 2,
    feedback: "The gym was too crowded, not ideal for a workout.",
    date: "2025-04-15T16:05:00Z",
  },
];

export default function FeedbackReports() {
  const [feedbackReports, setFeedbackReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [reply, setReply] = useState("");

  // Simulate fetching feedback reports
  const fetchFeedbackReports = () => {
    setLoading(true);
    setTimeout(() => {
      setFeedbackReports(mockFeedbackReports); // Simulate API response
      setLoading(false);
    }, 1000);
  };

  // Handle the reply action
  const handleReply = (record) => {
    setCurrentFeedback(record);
    setIsModalVisible(true); // Open the modal
  };

  const handleModalOk = () => {
    if (!reply) {
      message.error("Please enter a reply before submitting.");
      return;
    }

    // Here you can handle the reply submission, for example sending it to an API
    message.success(
      `Reply sent for feedback from ${currentFeedback.user.fullName}`
    );
    setIsModalVisible(false);
    setReply(""); // Reset reply
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setReply(""); // Reset reply
  };

  useEffect(() => {
    fetchFeedbackReports();
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>
          <strong>{user ? user.fullName : "Anonymous"}</strong>
          <br />
          <small className="text-gray-500">{user ? user.email : "-"}</small>
        </span>
      ),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      render: (businessName) => <span>{businessName}</span>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Tag color={rating >= 4 ? "green" : rating >= 2 ? "yellow" : "red"}>
          {rating} Stars
        </Tag>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => <span>{feedback || "No feedback provided"}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD hh:mm A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleReply(record)}>
          Reply
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Feedback Reports</h2>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={feedbackReports}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for replying to feedback */}
      <Modal
        title={`Reply to ${currentFeedback?.user?.fullName}`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Send Reply"
        cancelText="Cancel"
      >
        <Input.TextArea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          placeholder="Type your reply here..."
        />
      </Modal>
    </div>
  );
}
