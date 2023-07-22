import { Button, Modal, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { customerAdminService } from "../../services/admin/customerAdminService";
import "../../assets/uitbooking-styles.css";

const CustomerAdminModal = ({ customerId, fetchCustomerList, action, isSelfEdit }) => {
  const [customerData, setCustomerData] = useState({});
  useEffect(() => {
    if (customerId) {
      customerAdminService
        .getCustomerById(customerId)
        .then((res) => {
          setCustomerData(res.data.content);
        })
        .catch((err) => {
          console.log("getUserById err", err);
        });
    }
  }, [customerId]);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // handle submit
  const onSubmit = (values) => {
    if (customerId) {
      customerAdminService
        .updateCustomer(values)
        .then((res) => {
          message.success("Sửa thông tin khách hàng thành công!");
          handleClose();
          if (!isSelfEdit) fetchCustomerList();
        })
        .catch((err) => {
          console.log("editUser err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      customerAdminService
        .addUser(values)
        .then((res) => {
          message.success("Thêm khách hàng thành công!");
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
          className="mx-1 px-2 py-1 rounded bg-blue-500 text-white"
        >
          {action === "view" ? "Chi tiết" : "Thêm quản trị viên"}
        </button>
      )}
      <Modal
        width={840}
        title={
          isSelfEdit
            ? "Sửa thông tin cá nhân"
            : customerId
            ? "Chi tiết thông tin người dùng"
            : "Thêm quản trị viên"
        }
        open={open}
        onCancel={handleClose}
        footer={customerId 
          ? [
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
          ] 
          : [
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
                  values = customerId ? { ...values, id: customerData?.customer_id } : { ...values };
                  console.log('values', values);
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
          disabled={true}
          name="form_in_modal"
          initialValues={{
            last_name: customerData.last_name,
            first_name: customerData.first_name,
            phone_number: customerData.phone_number,
            email: customerData.email,
            gender: customerData.gender,
          }}
        >
          <Form.Item
            label="Họ"
            name="last_name"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: "Họ không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="first_name"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
            rules={[
              {
                required: true,
                message: "Tên không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {!customerId && (
            <Form.Item
            label="Email"
            name="email"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
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
          {!customerId && (
            <Form.Item
              label="Mật Khẩu"
              name="password"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
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
          <Form.Item 
            label="Phone"
            name="phone_number"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Email"
            name="email"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Select
              options={[
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerAdminModal;
