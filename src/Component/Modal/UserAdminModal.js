import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { userAdminService } from "../../services/admin/userAdminService";
import "./UserAdminModal.css";

const UserAdminModal = ({ userId, fetchUserList, action, isSelfEdit }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (userId) {
      userAdminService
        .getUserById(userId)
        .then((res) => {
          setUserData(res.data.content);
        })
        .catch((err) => {
          console.log("getUserById err", err);
        });
    }
  }, [userId]);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // handle submit
  const onSubmit = (values) => {
    if (userId) {
      userAdminService
        .editUser(values)
        .then((res) => {
          message.success("Sửa thông tin người dùng thành công!");
          handleClose();
          if (!isSelfEdit) fetchUserList();
        })
        .catch((err) => {
          console.log("editUser err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      userAdminService
        .addUser(values)
        .then((res) => {
          message.success("Thêm người dùng thành công!");
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log("addUser err", err);
          message.error(err.response.data.content);
        });
    }
  };

  return (
    <>
      {isSelfEdit ? (
        <p
          className="underline font-bold cursor-pointer inline-block"
          onClick={() => setOpen(true)}
        >
          Chỉnh sửa hồ sơ
        </p>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mx-1 px-2 py-1 rounded bg-orange-500 text-white"
        >
          {action === "edit" ? "Sửa" : "Thêm quản trị viên"}
        </button>
      )}
      <Modal
        title={
          isSelfEdit
            ? "Sửa thông tin cá nhân"
            : userId
            ? "Sửa thông tin người dùng"
            : "Thêm quản trị viên"
        }
        open={open}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  values = userId
                    ? { ...values, id: userData?.id, gender: true }
                    : { ...values, gender: true };
                  onSubmit(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            birthday: userData.birthday,
            role: userId ? userData.role : "ADMIN",
          }}
        >
          <Form.Item
            label="Họ Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {!userId && (
            <Form.Item
              label="Mật Khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Birthday" name="birthday">
            <Input />
          </Form.Item>
          {!isSelfEdit && (
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default UserAdminModal;
