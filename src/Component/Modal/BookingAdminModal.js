import { Button, Modal, Form, Input, message, InputNumber } from "antd";
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
        className="mx-1 px-2 py-1 rounded bg-blue-500 text-white"
      >
        {action === "view" ? "Chi tiết" : "Thêm đặt phòng"}
      </button>
      <Modal
        width={840}
        title={bookingId ? "Xem thông tin đặt phòng" : "Thêm đặt phòng"}
        open={open}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
          // <Button key="cancel" onClick={handleClose}>
          //   Cancel
          // </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   onClick={() => {
          //     form
          //       .validateFields()
          //       .then((values) => {
          //         values = bookingId
          //           ? { ...values, id: bookingData?.id }
          //           : { ...values };
          //         onSubmit(values);
          //       })
          //       .catch((info) => {
          //         console.log("Validate Failed:", info);
          //       });
          //   }}
          // >
          //   Submit
          // </Button>,
        ]}
      >
        <Form
          form={form}
          disabled={true}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            name: bookingData.house?.name,
            check_in_date: bookingData.check_in_date,
            check_out_date: bookingData.check_out_date,
            guest_number: bookingData.guest_number,
            customer_name: `${bookingData.user?.last_name} ${bookingData.user?.first_name}`,
            code: bookingData.code,
            total_price: bookingData.total_price,
            payment_method: bookingData.payment_method,
          }}
        >
          <Form.Item
            label="Tên Phòng"
            name="name"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: "Tên phòng không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên khách hàng"
            name="customer_name"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
            rules={[
              {
                required: true,
                message: "Tên khách hàng không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày đến"
            name="check_in_date"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
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
            name="check_out_date"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
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
            name="guest_number"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
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
            label="Mã đặt phòng"
            name="code"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tổng cộng"
            name="total_price"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input prefix='VNĐ' />
          </Form.Item>
          <Form.Item
            label="Phương thức thanh toán"
            name="payment_method"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookingAdminModal;
