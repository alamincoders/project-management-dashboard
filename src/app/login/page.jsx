"use client";
import { Button, Form, Input } from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Mock response for successful and unsuccessful logins
    if (values.username === "admin" && values.password === "123456") {
      // Successful login
      console.info("Login successful!");
    } else {
      // Unsuccessful login
      console.error("Login failed");
      console.log("Your default username: 'admin' and password: '123456'");
    }
    alert("Please check console panel for mock response");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Login</h1>
        </div>
        <Form name="loginForm" onFinish={onFinish} initialValues={{ remember: true }} className="mt-8 space-y-6">
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder="Username" className="block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password
              placeholder="Password"
              className="block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
