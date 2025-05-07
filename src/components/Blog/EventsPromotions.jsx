import { useState } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
const { TextArea } = Input;

export default function EventsPromotions() {
  const [eventsList, setEventsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const showModal = (event) => {
    setCurrentEvent(event);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    // Save or update the event
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    // Delete the event
    setEventsList(eventsList.filter((event) => event.id !== id));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Actions",
      render: (_, event) => (
        <div>
          <Button onClick={() => showModal(event)}>Edit</Button>
          <Button onClick={() => handleDelete(event.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Add New Event/Promotion
      </Button>
      <Table columns={columns} dataSource={eventsList} rowKey="id" />

      <Modal
        title={currentEvent ? "Edit Event/Promotion" : "Add Event/Promotion"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input defaultValue={currentEvent?.title} />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea defaultValue={currentEvent?.content} rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
