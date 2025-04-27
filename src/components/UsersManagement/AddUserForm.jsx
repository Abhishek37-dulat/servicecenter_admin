import React from "react";
import { Form, Input, Button, Select, Radio, message } from "antd";

const { Option } = Select;

export default function AddUser() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("User data submitted:", values);
    message.success("User added successfully!");
    form.resetFields();
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "User", status: "active" }}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter the full name" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select user role" }]}
        >
          <Select>
            <Option value="User">User</Option>
            <Option value="Business Owner">Business Owner</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Radio.Group>
            <Radio value="active">Active</Radio>
            <Radio value="blocked">Blocked</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
