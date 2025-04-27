import { useState } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
const { TextArea } = Input;

export default function SuccessStories() {
  const [storiesList, setStoriesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  const showModal = (story) => {
    setCurrentStory(story);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    // Save or update the success story
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    // Delete the success story
    setStoriesList(storiesList.filter((story) => story.id !== id));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Actions",
      render: (_, story) => (
        <div>
          <Button onClick={() => showModal(story)}>Edit</Button>
          <Button onClick={() => handleDelete(story.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Add New Story
      </Button>
      <Table columns={columns} dataSource={storiesList} rowKey="id" />

      <Modal
        title={currentStory ? "Edit Success Story" : "Add Success Story"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input defaultValue={currentStory?.title} />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea defaultValue={currentStory?.content} rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
