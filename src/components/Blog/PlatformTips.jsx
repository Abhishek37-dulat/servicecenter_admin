import { useState } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
const { TextArea } = Input;

export default function PlatformTips() {
  const [platformTipsList, setPlatformTipsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPlatformTip, setCurrentPlatformTip] = useState(null);

  const showModal = (tip) => {
    setCurrentPlatformTip(tip);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    // Save or update the platform tip
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    // Delete the platform tip
    setPlatformTipsList(platformTipsList.filter((tip) => tip.id !== id));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Actions",
      render: (_, tip) => (
        <div>
          <Button onClick={() => showModal(tip)}>Edit</Button>
          <Button onClick={() => handleDelete(tip.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Add New Platform Tip
      </Button>
      <Table columns={columns} dataSource={platformTipsList} rowKey="id" />

      <Modal
        title={currentPlatformTip ? "Edit Platform Tip" : "Add Platform Tip"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input defaultValue={currentPlatformTip?.title} />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea defaultValue={currentPlatformTip?.content} rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
