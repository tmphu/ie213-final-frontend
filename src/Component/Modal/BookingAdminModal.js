import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import "../../assets/uitbooking-styles.css";
import { bookingService } from "../../services/admin/bookingService";

const BookingAdminModal = ({ bookingId, fetchBookingList, action }) => {
  const [bookingData, setBookingData] = useState({});
  useEffect(() => {
    if (bookingId) {
      bookingService
        .getBookingById(bookingId)
        .then((res) => {
          setBookingData(res.data.content);
        })
        .catch((err) => {
          console.log("getBookingById err", err);
        });
    }
  }, [bookingId]);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // handle submit
  const onSubmit = (values) => {
    if (bookingId) {
      bookingService
        .editBooking(values)
        .then((res) => {
          message.success("Sửa thông tin dặt phòng thành công!");
          handleClose();
          fetchBookingList();
        })
        .catch((err) => {
          console.log("editBooking err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      bookingService
        .addBooking(values)
        .then((res) => {
          message.success("Thêm đặt phòng thành công!");
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log("addBooking err", err);
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
        {action === "edit" ? "Sửa" : "Thêm đặt phòng"}
      </button>
      <Modal
        title={bookingId ? "Sửa thông tin đặt phòng" : "Thêm đặt phòng"}
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
                  values = bookingId
                    ? { ...values, id: bookingData?.id }
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
            maPhong: bookingData.maPhong,
            ngayDen: bookingData.ngayDen,
            ngayDi: bookingData.ngayDi,
            soLuongKhach: bookingData.soLuongKhach,
            maNguoiDung: bookingData.maNguoiDung,
          }}
        >
          <Form.Item
            label="Mã Phòng"
            name="maPhong"
            rules={[
              {
                required: true,
                message: "Mã phòng không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày đến"
            name="ngayDen"
            rules={[
              {
                required: true,
                message: "Ngày đến không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày đi"
            name="ngayDi"
            rules={[
              {
                required: true,
                message: "Ngày đi không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SL khách"
            name="soLuongKhach"
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
            label="Mã khách hàng"
            name="maNguoiDung"
            rules={[
              {
                required: true,
                message: "Mã khách hàng không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookingAdminModal;
