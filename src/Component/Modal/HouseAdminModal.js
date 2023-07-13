import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import "./HouseAdminModal.css";
import { houseService } from "../../services/houseService";

const HouseAdminModal = ({ houseId, fetchHouseList, action }) => {
  const [houseData, setHouseData] = useState({});
  useEffect(() => {
    if (houseId) {
      houseService
        .getHouseById(houseId)
        .then((res) => {
          setHouseData(res.data.content);
        })
        .catch((err) => {
          console.log("getHouseById err", err);
        });
    }
  }, [houseId]);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // handle submit
  const onSubmit = (values) => {
    if (houseId) {
      houseService
        .editHouse(values)
        .then((res) => {
          message.success("Sửa thông tin phòng thành công!");
          handleClose();
          fetchHouseList();
        })
        .catch((err) => {
          console.log("editHouse err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      houseService
        .addHouse(values)
        .then((res) => {
          message.success("Thêm phòng thành công!");
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log("addHouse err", err);
          message.error(err.response.data.content);
        });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mx-1 px-2 py-1 rounded bg-orange-500 text-white"
      >
        {action === "edit" ? "Sửa" : "Thêm phòng"}
      </button>
      <Modal
        title={houseId ? "Sửa thông tin phòng" : "Thêm phòng"}
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
                  values = houseId
                    ? { ...values, id: houseData?.id }
                    : { ...values };
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
            tenPhong: houseData.tenPhong,
            khach: houseData.khach,
            giaTien: houseData.giaTien,
            hinhAnh: houseData.hinhAnh,
          }}
        >
          <Form.Item
            label="Tên phòng"
            name="tenPhong"
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
            label="SL khách"
            name="khach"
            rules={[
              {
                required: true,
                message: "SL khách không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="giaTien"
            rules={[
              {
                required: true,
                message: "Giá tiền không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="hinhAnh">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HouseAdminModal;
