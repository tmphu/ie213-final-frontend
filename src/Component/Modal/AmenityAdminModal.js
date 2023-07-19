import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import "../../assets/uitbooking-styles.css";
import axios from "axios";
import { BASE_URL } from "../../services/configURL";
import { userLocalService } from "../../services/localStorageService";
import { amenityService } from '../../services/admin/amenityService';

const AmenityAdminModal = ({ amenityId, fetchAmenityList, action }) => {
  const [amenityData, setAmenityData] = useState({});
  useEffect(() => {
    if (amenityId) {
      amenityService
        .getAmenityById(amenityId)
        .then((res) => {
          setAmenityData(res.data.content);
        })
        .catch((err) => {
          console.log("getAmenityById err", err);
        });
    }
  }, [amenityId]);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // handle submit
  const onSubmit = (values) => {
    if (amenityId) {
      amenityService
        .updateAmenity(values)
        .then((res) => {
          message.success("Sửa thông tin tiện nghi thành công!");
          handleClose();
          fetchAmenityList();
        })
        .catch((err) => {
          console.log("updateAmenity err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      amenityService
        .addAmenity(values)
        .then((res) => {
          message.success("Thêm tiện nghi thành công!");
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log("addAmenity err", err);
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
        {action === "edit" ? "Sửa" : "Thêm tiện nghi"}
      </button>
      <Modal
        title={amenityId ? "Sửa thông tin tiện nghi" : "Thêm tiện nghi"}
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
                  values = amenityId ? { ...values, id: amenityData?.id } : { ...values };
                  onSubmit(values);
                })
                .catch((info) => {
                  console.log("Failed validation:", info);
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
            code: amenityData.code,
            name: amenityData.name,
          }}
        >
          <Form.Item
            label="Mã code"
            name="code"
            rules={[
              {
                required: true,
                message: "Mã code không được để trống!",
              },
            ]}
          >
            <Input placeholder='ma_code'/>
          </Form.Item>
          <Form.Item
            label="Tên tiện nghi"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên tiện nghi không được để trống!",
              },
            ]}
          >
            <Input placeholder='Tên tiện nghi'/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AmenityAdminModal;
