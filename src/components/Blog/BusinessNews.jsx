import { useState, useEffect } from "react";
import { Button, Input, Table, Modal, Form } from "antd";

const { TextArea } = Input;

export default function BusinessNews() {
  const [newsList, setNewsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);

  useEffect(() => {
    // Fetch the news list from API (replace with actual data fetching logic)
    setNewsList([
      {
        id: 1,
        title: "Business Growth Tips",
        content: "Content of the article",
      },
      {
        id: 2,
        title: "New Business Regulations",
        content: "Content of the article",
      },
    ]);
  }, []);

  const showModal = (news) => {
    setCurrentNews(news);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Handle save logic here (e.g., send API request to save news)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, news) => (
        <Button onClick={() => showModal(news)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Business News</h2>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Add New News
      </Button>
      <Table columns={columns} dataSource={newsList} rowKey="id" />
      <Modal
        title={currentNews ? "Edit News" : "Add News"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input defaultValue={currentNews?.title} />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea defaultValue={currentNews?.content} rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
