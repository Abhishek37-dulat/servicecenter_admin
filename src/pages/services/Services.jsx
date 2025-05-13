import { useState } from "react";
import { Table, Button, Modal, Form, Input, Pagination, Spin } from "antd";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../redux/services/serviceApi";
import Swal from "sweetalert2";

export default function ServiceList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ Fetch services with search & pagination params
  const { data, isLoading } = useGetAllServicesQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });

  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  // ✅ Modal State
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();

  // ✅ Open Add Modal
  const openAddModal = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  // ✅ Add Service
  const handleAddService = async (values) => {
    await createService(values);
    setAddModalVisible(false);
  };

  // ✅ Open Edit Modal
  const handleEdit = (service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setEditModalVisible(true);
  };

  // ✅ Update Service
  const handleUpdate = async (values) => {
    await updateService({ id: editingService.id, updatedData: values });
    setEditModalVisible(false);
  };

  // ✅ Delete Service
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteService(id);
        Swal.fire("Deleted!", "The service has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Services List</h2>

      {/* ✅ Search & Add Service Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Input
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-50"
        />
        <Button type="primary" onClick={openAddModal}>
          Add Service
        </Button>
      </div>

      {/* ✅ Show loading spinner */}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          {/* ✅ Table */}
          <Table
            dataSource={data?.data}
            rowKey="id"
            pagination={false}
            columns={[
              { title: "Service Name", dataIndex: "name", key: "name" },
              {
                title: "Actions",
                key: "actions",
                render: (text, record) => (
                  <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                      Edit
                    </Button>
                    <Button
                      type="link"
                      danger
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </Button>
                  </>
                ),
              },
            ]}
          />

          {/* ✅ Pagination */}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.total || 0}
            onChange={setCurrentPage}
            className="mt-3 text-center"
          />
        </>
      )}

      {/* ✅ Add Service Modal */}
      <Modal
        title="Add Service"
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddService}>
          <Form.Item
            name="name"
            label="Service Name"
            rules={[{ required: true, message: "Service name is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ Edit Service Modal */}
      <Modal
        title="Edit Service"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="name"
            label="Service Name"
            rules={[{ required: true, message: "Service name is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
