"use client";
import { Button, Form, Input } from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Mock response htmlFor successful and unsuccessful logins
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
    <div
      style={{
        backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
      }}
      className="min-h-screen bg-cover bg-no-repeat py-6 flex flex-col justify-center sm:py-12 lg:ml-[18rem]"
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-primary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold pb-5">Login</h1>
            </div>
            <Form name="loginForm" onFinish={onFinish} initialValues={{ remember: true }} className="mt-8 space-y-6 min-w-[320px]">
              <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input
                  size="large"
                  placeholder="Username"
                  className="block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password
                  size="large"
                  placeholder="Password"
                  className="block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  size="large"
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
      </div>
    </div>
  );
};

export default LoginPage;
