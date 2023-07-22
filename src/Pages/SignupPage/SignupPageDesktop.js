import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userService } from "../../services/userService";
import { setUserRegisterInfo } from "../../redux/reducers/userReducer";

export default function SignupPageDesktop() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (dataUser) => {
    if (dataUser.role === 'customer') {
      userService
      .signUpCustomer({ ...dataUser })
      .then((res) => {
        dispatch(setUserRegisterInfo(res.data.content));
        message.success(
          "Tạo tài khoản khách hàng thành công! Vui lòng đăng nhập bằng tài khoản vừa tạo"
        );
        setTimeout(() => {
          navigate("/login");
        });
      }, 1000)
      .catch((err) => {
        console.log(err);
        message.error("Đăng ký thất bại!");
      });
    } else if (dataUser.role === 'host') {
      userService
      .signUpHost({ ...dataUser })
      .then((res) => {
        dispatch(setUserRegisterInfo(res.data.content));
        message.success(
          "Tạo tài khoản chủ nhà thành công! Vui lòng đăng nhập bằng tài khoản vừa tạo"
        );
        setTimeout(() => {
          navigate("/login");
        });
      }, 1000)
      .catch((err) => {
        console.log(err);
        message.error("Đăng ký thất bại!");
      });
    }
    
  };
  const handleRenderSignupForm = () => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        label="register"
        onFinish={onFinish}
        initialValues={{
          role: 'customer',
        }}
        scrollToFirstError
      >
        <Form.Item>
          <div className="text-4xl font-semibold tracking-wider mx-auto pb-5 flex flex-nowrap justify-center pl-40 text-indigo-900">
            ĐĂNG KÝ TÀI KHOẢN
          </div>
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Họ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="first_name"
          label="Tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Email không đúng định dạng!",
            },
            {
              required: true,
              message: "Vui lòng nhập địa chỉ email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật Khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Số Điện Thoại"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
        >
          <Select
            style={{ width: '12rem' }}
            options={[
              { value: 'male', label: 'Nam' },
              { value: 'female', label: 'Nữ' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Phân quyền"
        >
          <Select
            style={{ width: '12rem' }}
            options={[
              { value: 'customer', label: 'Khách hàng' },
              { value: 'host', label: 'Chủ nhà' },
            ]}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            className="bg-indigo-700 text-base font-semibold tracking-wider w-full mx-auto px-5 py-5 flex justify-center items-center rounded text-white shadow hover:shadow-xl transition duration-500 hover:bg-indigo-900"
            htmlType="submit"
          >
            ĐĂNG KÝ
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="bg-white">
      <div
        className="mx-auto bg-indigo-100 shadow-xl"
        style={{
          width: "60%",
          padding: "60px 60px 60px 30px",
          marginTop: "60px",
          marginBottom: "60px",
        }}
      >
        <>{handleRenderSignupForm()}</>
      </div>
    </div>
  );
}
