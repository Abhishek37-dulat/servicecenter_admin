import { useState } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
const { TextArea } = Input;

export default function LocalSpotlights() {
  const [spotlightsList, setSpotlightsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSpotlight, setCurrentSpotlight] = useState(null);

  const showModal = (spotlight) => {
    setCurrentSpotlight(spotlight);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    // Save or update the local spotlight
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    // Delete the spotlight
    setSpotlightsList(
      spotlightsList.filter((spotlight) => spotlight.id !== id)
    );
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Actions",
      render: (_, spotlight) => (
        <div>
          <Button onClick={() => showModal(spotlight)}>Edit</Button>
          <Button onClick={() => handleDelete(spotlight.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Add New Spotlight
      </Button>
      <Table columns={columns} dataSource={spotlightsList} rowKey="id" />

      <Modal
        title={
          currentSpotlight ? "Edit Local Spotlight" : "Add Local Spotlight"
        }
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input defaultValue={currentSpotlight?.title} />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea defaultValue={currentSpotlight?.content} rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
