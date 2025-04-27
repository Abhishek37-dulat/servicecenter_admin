import { useState, useEffect } from "react";
import { Button, Table, Modal } from "antd";

export default function AdminBlogManager() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    setBlogPosts([
      {
        id: 1,
        title: "Business News Article",
        author: "Admin",
        date: "2022-01-01",
      },
      { id: 2, title: "Marketing Tips", author: "Admin", date: "2022-01-10" },
    ]);
  }, []);

  const showModal = (post) => {
    setCurrentPost(post);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Save the blog post or update it in the system
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
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, post) => (
        <div>
          <Button onClick={() => showModal(post)}>Edit</Button>
          <Button onClick={() => handleDelete(post.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Blog Manager</h2>
      <Table columns={columns} dataSource={blogPosts} rowKey="id" />
      <Modal
        title={currentPost ? "Edit Post" : "Add Post"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Blog post editing form */}
      </Modal>
    </div>
  );
}
