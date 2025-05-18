import { useState } from "react";
import { Table, Button, Modal, Form, Input, Pagination, Spin } from "antd";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/services/categoryApi";
import Swal from "sweetalert2";

export default function CategoryList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading } = useGetAllCategoriesQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const openAddModal = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddCategory = async (values) => {
    await createCategory(values);
    setAddModalVisible(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setEditModalVisible(true);
  };

  const handleUpdate = async (values) => {
    await updateCategory({ id: editingCategory.id, updatedData: values });
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory(id);
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Categories List</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-50"
        />
        <Button type="primary" onClick={openAddModal}>
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <Table
            dataSource={data?.data || []}
            rowKey="id"
            pagination={false}
            columns={[
              { title: "Category Name", dataIndex: "name", key: "name" },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
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

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.total || 0}
            onChange={setCurrentPage}
            className="mt-3 text-center"
          />
        </>
      )}

      <Modal
        title="Add Category"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Category"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
// import React, { useState } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   Pagination,
//   Spin,
//   Select,
// } from "antd";
// import {
//   useGetAllCategoriesQuery,
//   useCreateCategoryMutation,
// } from "../../redux/services/categoryApi";
// import { allIcons } from "../../utils/iconMap"; // make sure this includes all imported packs (fa, md, ai, gi, etc.)
// import Swal from "sweetalert2";

// export default function CategoryList() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;

//   const { data, isLoading } = useGetAllCategoriesQuery({
//     search,
//     page: currentPage,
//     limit: pageSize,
//   });

//   const [createCategory] = useCreateCategoryMutation();

//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [form] = Form.useForm();

//   const [selectedIcon, setSelectedIcon] = useState(null);

//   const openAddModal = () => {
//     form.resetFields();
//     setSelectedIcon(null);
//     setAddModalVisible(true);
//   };

//   const handleAddCategory = async (values) => {
//     try {
//       await createCategory(values);
//       Swal.fire("Success", "Category created successfully!", "success");
//       setAddModalVisible(false);
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong!", "error");
//     }
//   };

//   const handleIconChange = (value) => {
//     setSelectedIcon(value);
//     form.setFieldsValue({ icon: value });
//   };

//   const SelectedIconComponent = selectedIcon ? allIcons[selectedIcon] : null;

//   return (
//     <div className="container mt-4">
//       <h2>Categories List</h2>

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <Input
//           placeholder="Search category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-50"
//         />
//         <Button type="primary" onClick={openAddModal}>
//           Add Category
//         </Button>
//       </div>

//       {isLoading ? (
//         <Spin size="large" />
//       ) : (
//         <>
//           <Table
//             dataSource={data?.data || []}
//             rowKey="id"
//             pagination={false}
//             columns={[
//               {
//                 title: "Category Name",
//                 dataIndex: "name",
//                 key: "name",
//               },
//               {
//                 title: "Icon",
//                 dataIndex: "icon",
//                 key: "icon",
//                 render: (icon) => {
//                   const Icon = allIcons[icon];
//                   return Icon ? <Icon size={20} /> : null;
//                 },
//               },
//               {
//                 title: "Actions",
//                 key: "actions",
//                 render: (_, record) => (
//                   <>
//                     <Button type="link">Edit</Button>
//                     <Button type="link" danger>
//                       Delete
//                     </Button>
//                   </>
//                 ),
//               },
//             ]}
//           />

//           <Pagination
//             current={currentPage}
//             pageSize={pageSize}
//             total={data?.total || 0}
//             onChange={setCurrentPage}
//             className="mt-3 text-center"
//           />
//         </>
//       )}

//       <Modal
//         title="Add Category"
//         open={addModalVisible}
//         onCancel={() => setAddModalVisible(false)}
//         onOk={() => form.submit()}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleAddCategory}
//           initialValues={{ icon: selectedIcon }}
//         >
//           <Form.Item
//             name="name"
//             label="Category Name"
//             rules={[{ required: true, message: "Category name is required" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="icon"
//             label="Select Icon"
//             rules={[{ required: true, message: "Icon is required" }]}
//           >
//             <Select
//               showSearch
//               placeholder="Search and select an icon"
//               value={selectedIcon}
//               onChange={handleIconChange}
//               filterOption={(input, option) =>
//                 option?.value?.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {Object.keys(allIcons).map((iconName) => {
//                 const IconComponent = allIcons[iconName];
//                 return (
//                   <Select.Option key={iconName} value={iconName}>
//                     <span
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 8,
//                       }}
//                     >
//                       <IconComponent />
//                       {iconName}
//                     </span>
//                   </Select.Option>
//                 );
//               })}
//             </Select>
//           </Form.Item>

//           {SelectedIconComponent && (
//             <div
//               style={{
//                 marginTop: 10,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               Preview: <SelectedIconComponent size={24} />
//             </div>
//           )}
//         </Form>
//       </Modal>
//     </div>
//   );
// }
