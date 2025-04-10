import { useState } from "react";
import { Table, Button, Modal, Form, Input, Pagination, Spin } from "antd";
import { 
  useGetAllAmenitiesQuery, 
  useCreateAmenityMutation, 
  useUpdateAmenityMutation, 
  useDeleteAmenityMutation 
} from "../../redux/services/amenityApi";
import Swal from "sweetalert2";

export default function AmenityList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // ✅ Fetch amenities with search & pagination params
  const { data, isLoading } = useGetAllAmenitiesQuery({ search, page: currentPage, limit: pageSize });

  const [createAmenity] = useCreateAmenityMutation();
  const [updateAmenity] = useUpdateAmenityMutation();
  const [deleteAmenity] = useDeleteAmenityMutation();

  // ✅ Modal State
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [form] = Form.useForm();

  // ✅ Open Add Modal
  const openAddModal = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  // ✅ Add Amenity
  const handleAddAmenity = async (values) => {
    await createAmenity(values);
    setAddModalVisible(false);
  };

  // ✅ Open Edit Modal
  const handleEdit = (amenity) => {
    setEditingAmenity(amenity);
    form.setFieldsValue(amenity);
    setEditModalVisible(true);
  };

  // ✅ Update Amenity
  const handleUpdate = async (values) => {
    await updateAmenity({ id: editingAmenity.id, updatedData: values });
    setEditModalVisible(false);
  };

  // ✅ Delete Amenity
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
        await deleteAmenity(id);
        Swal.fire("Deleted!", "The amenity has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Amenities List</h2>

      {/* ✅ Search & Add Amenity Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Input 
          placeholder="Search amenity..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-50"
        />
        <Button type="primary" onClick={openAddModal}>Add Amenity</Button>
      </div>

      {/* ✅ Show loading spinner */}
      {isLoading ? <Spin size="large" /> : (
        <>
          {/* ✅ Table */}
          <Table
            dataSource={data?.data || []}
            rowKey="id"
            pagination={false}
            columns={[
              { title: "Amenity Name", dataIndex: "name", key: "name" },
              { title: "Actions", key: "actions", render: (text, record) => (
                <>
                  <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                  <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
              ) }
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

      {/* ✅ Add Amenity Modal */}
      <Modal
        title="Add Amenity"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddAmenity}>
          <Form.Item name="name" label="Amenity Name" rules={[{ required: true, message: "Amenity name is required" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ Edit Amenity Modal */}
      <Modal
        title="Edit Amenity"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="name" label="Amenity Name" rules={[{ required: true, message: "Amenity name is required" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
