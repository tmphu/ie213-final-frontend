import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import "./LocationAdminModal.css";
import { locationService } from "../../services/locationService";
import axios from "axios";
import { BASE_URL } from "../../services/configURL";
import { userLocalService } from "../../services/localStorageService";

const LocationAdminModal = ({ locationId, fetchLocationList, action }) => {
  let userToken = userLocalService.getItem().token;
  const headers = {
    accept: "application/json",
    token: userToken,
    "Content-Type": "application/json-patch+json",
  };

  const [locationData, setLocationData] = useState({});
  useEffect(() => {
    if (locationId) {
      locationService
        .getLocationById(locationId)
        .then((res) => {
          setLocationData(res.data.content);
        })
        .catch((err) => {
          console.log("getLocationById err", err);
        });
    }
  }, [locationId]);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // handle submit
  const onSubmit = (values) => {
    if (locationId) {
      locationService
        .editLocation(values)
        .then((res) => {
          message.success("Sửa thông tin vị trí thành công!");
          handleClose();
          fetchLocationList();
        })
        .catch((err) => {
          console.log("editLocation err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      axios
        .post(`${BASE_URL}api/vi-tri`, values, { headers })
        .then((res) => {
          message.success("Thêm vị trí thành công!");
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log("addLocation err", err);
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
        {action === "edit" ? "Sửa" : "Thêm vị trí"}
      </button>
      <Modal
        title={locationId ? "Sửa thông tin vị trí" : "Thêm vị trí"}
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
                  values = locationId
                    ? { ...values, id: locationData?.id }
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
            tenViTri: locationData.tenViTri,
            tinhThanh: locationData.tinhThanh,
            quocGia: locationData.quocGia,
            hinhAnh: locationData.hinhAnh,
          }}
        >
          <Form.Item
            label="Tên vị trí"
            name="tenViTri"
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
            label="Tỉnh thành"
            name="tinhThanh"
            rules={[
              {
                required: true,
                message: "Tỉnh thành không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quốc gia"
            name="quocGia"
            rules={[
              {
                required: true,
                message: "Quốc gia không được để trống!",
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

export default LocationAdminModal;
