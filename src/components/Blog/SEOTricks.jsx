import { useState, useEffect } from "react";
import { Button, Input, Table, Modal, Form } from "antd";
const { TextArea } = Input;

export default function MarketingTips() {
  const [tipsList, setTipsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(null);

  useEffect(() => {
    setTipsList([
      {
        id: 1,
        title: "Effective Email Campaigns",
        content: "Content of the tip",
      },
      { id: 2, title: "Social Media Marketing", content: "Content of the tip" },
    ]);
  }, []);

  const showModal = (tip) => {
    setCurrentTip(tip);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Save logic here (e.g., API call to save tip)
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
      render: (_, tip) => <Button onClick={() => showModal(tip)}>Edit</Button>,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Marketing Tips</h2>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Add New Tip
      </Button>
      <Table columns={columns} dataSource={tipsList} rowKey="id" />
      <Modal
        title={currentTip ? "Edit Tip" : "Add Tip"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input defaultValue={currentTip?.title} />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea defaultValue={currentTip?.content} rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
