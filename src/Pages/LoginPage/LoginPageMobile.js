import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/reducers/userReducer";
import { userLocalService } from "../../services/localStorageService";
import { userService } from "../../services/userService";

export default function LoginPageMobile() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (dataUser) => {
    userService
      .postLogin(dataUser)
      .then((res) => {
        dispatch(setUserInfo(res.data.content));
        message.success("Đăng nhập thành công!");
        userLocalService.setItem(res.data.content);
        setTimeout(() => {
          if (res.data.content.user?.role === "HOST") {
            navigate("/admin/user");
          } else {
            navigate("/");
          }
        });
      }, 1000)
      .catch((err) => {
        console.log(err);
        message.error(
          "Thông tin đăng nhập không đúng, vui lòng kiểm tra lại username/password"
        );
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("onFinishFailed: ", errorInfo);
  };

  return (
    <div className="h-screen flex mx-auto">
      <div className="container p-5">
        <div className="h-full pt-10">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật Khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 24,
              }}
              className="text-center"
            >
              <Button
                className="bg-indigo-700 text-base font-semibold tracking-wider w-full mx-auto px-5 py-5 flex justify-center items-center rounded text-white shadow hover:shadow-xl transition duration-500 hover:bg-indigo-900"
                htmlType="submit"
              >
                ĐĂNG NHẬP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
