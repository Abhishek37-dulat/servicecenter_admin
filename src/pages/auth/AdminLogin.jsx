import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../redux/services/adminApi";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setStudent } from "../../redux/slices/studentSlice";

const { Title } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
const dispatch=useDispatch()
  const handleFinish = async (values) => {
    try {
      const response = await loginAdmin(values).unwrap();
      message.success("Login successful!");
console.log(response)
      if(response){
        localStorage.setItem("authToken",response.token)
  dispatch(setStudent(response))
          navigate("/admin/dashboard"); // Redirect on success
      }
    } catch (error) {
      message.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Login
        </Title>
        <Form
          name="admin_login"
          layout="vertical"
          onFinish={handleFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
