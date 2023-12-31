import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import "../../assets/uitbooking-styles.css";
import { locationService } from "../../services/locationService";
import { userLocalService } from "../../services/localStorageService";

const LocationAdminModal = ({ locationId, fetchLocationList, action }) => {
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
  };

  // handle submit
  const onSubmit = (values) => {
    if (locationId) {
      locationService
        .updateLocation(values)
        .then((res) => {
          message.success("Sửa thông tin địa điểm thành công!");
          handleClose();
          fetchLocationList();
        })
        .catch((err) => {
          console.log("updateLocation err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      locationService
        .addLocation(values)
        .then((res) => {
          message.success("Thêm địa điểm thành công!");
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
        {action === "edit" ? "Sửa" : "Thêm địa điểm"}
      </button>
      <Modal
        title={locationId ? "Sửa thông tin địa điểm" : "Thêm địa điểm"}
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
                  values = locationId ? { ...values, id: locationData?.id } : { ...values };
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
            location: locationData.location,
            city: locationData.city,
            image: locationData.image,
          }}
        >
          <Form.Item
            label="Tên địa điểm"
            name="location"
            rules={[
              {
                required: true,
                message: "Tên không được để trống!",
              },
            ]}
          >
            <Input placeholder='Tên địa điểm'/>
          </Form.Item>
          <Form.Item
            label="Tỉnh thành"
            name="city"
            rules={[
              {
                required: true,
                message: "Tỉnh thành không được để trống!",
              },
            ]}
          >
            <Input placeholder='Tỉnh thành'/>
          </Form.Item>
          <Form.Item label="Hình ảnh" name="image">
            <Input placeholder='Đường link hình ảnh'/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LocationAdminModal;
