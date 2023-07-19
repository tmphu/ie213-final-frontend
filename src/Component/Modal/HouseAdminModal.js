import { Button, Modal, Form, Input, message, Select, Checkbox, Row, Col, InputNumber } from "antd";
import { useEffect, useState } from "react";
import "../../assets/uitbooking-styles.css";
import { houseService } from "../../services/houseService";
import { locationService } from '../../services/locationService';
import { amenityService } from '../../services/admin/amenityService';

const HouseAdminModal = ({ houseId, hostId, fetchHouseList, action }) => {
  const [houseData, setHouseData] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [selectedAmenityList, setSelectedAmenityList] = useState([]);
  useEffect(() => {
    if (houseId) {
      houseService
        .getHouseById(houseId)
        .then((res) => {
          setHouseData(res.data.content);
          const amenities = res.data.content.amenity?.map(({id}) => (id));
          setSelectedAmenityList(amenities);
        })
        .catch((err) => {
          console.log("getHouseById err", err);
        });
    }
  }, [houseId]);

  useEffect(() =>{
    locationService.getLocation()
      .then((res) => {
        const list = res.data.content.data.map(({id, location}) => ({value: id, label: location}));
        setLocationList(list);
      })
      .catch((err) => {
        console.log("getLocation err", err);
      });
    amenityService.getAmenity()
      .then((res) => {
        const list = res.data.content.data.map(({id, name}) => ({value: id, label: name}));
        setAmenityList(list);
      })
      .catch((err) => {
        console.log("getAmenity err", err);
      });
  }, [])

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // handle submit
  const onSubmit = (values) => {
    console.log('payload', {...values, host_id: hostId});
    if (houseId) {
      houseService
        .updateHouse({...values, host_id: hostId})
        .then((res) => {
          message.success("Sửa thông tin phòng thành công!");
          handleClose();
          fetchHouseList(hostId);
        })
        .catch((err) => {
          console.log("editHouse err", err);
          message.error("Có lỗi xảy ra!");
        });
    } else {
      houseService
        .addHouse({...values, host_id: hostId})
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
        width={840}
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
                  values = houseId ? { ...values, id: houseData?.id }: { ...values };
                  onSubmit(values);
                })
                .catch((err) => {
                  console.log("Failed validation:", err);
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
            name: houseData.name,
            description: houseData.description,
            address: houseData.address,
            location_id: houseData.location_id,
            property_type: houseData.property_type,
            bedrooms: houseData.bedrooms,
            beds: houseData.beds,
            bathrooms: houseData.bathrooms,
            cancellation_policy: houseData.cancellation_policy,
            max_guests: houseData.max_guests,
            price: houseData.price,
            image: houseData.HouseImage && houseData.HouseImage[0].image,
            amenities: selectedAmenityList,
          }}
        >
          <Form.Item
            label="Tên phòng"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên không được để trống!",
              },
            ]}
          >
            <Input placeholder='Tên phòng'/>
          </Form.Item>
          <Form.Item
            label="Mô tả phòng"
            name="description"
            rules={[
              {
                required: true,
                message: "Mô tả phòng không được để trống!",
              },
            ]}
          >
            <Input placeholder='Mô tả phòng' />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: "Địa chỉ không được để trống!",
              },
            ]}
          >
            <Input placeholder='Số nhà, tên đường'/>
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            name="location_id"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
            rules={[
              {
                required: true,
                message: "Địa điểm không được để trống!",
              },
            ]}
          >
            <Select
              options={locationList}
            />
          </Form.Item>
          <Form.Item
            label="Loại phòng"
            name="property_type"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: "Loại phòng không được để trống!",
              },
            ]}
          >
            <Select
              options={[
                { value: 1, label: 'Phòng đơn' },
                { value: 2, label: 'Phòng đôi' },
                { value: 3, label: 'Biệt thự' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="SL khách"
            name="max_guests"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
            rules={[
              {
                required: true,
                message: "SL khách không được để trống!",
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="SL phòng ngủ"
            name="bedrooms"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: "SL phòng ngủ không được để trống!",
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="SL giường"
            name="beds"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
            rules={[
              {
                required: true,
                message: "SL giường không được để trống!",
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="price"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: "Giá tiền không được để trống!",
              },
            ]}
          >
            <InputNumber prefix='VNĐ' decimalSeparator=',' style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="SL phòng tắm"
            name="bathrooms"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
            rules={[
              {
                required: true,
                message: "SL phòng tắm không được để trống!",
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="Tiện nghi"
            name="amenities"
          >
            <Checkbox.Group style={{ width: '100%' }} options={amenityList}></Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="Chính sách hủy phòng"
            name="cancellation_policy"
            rules={[
              {
                required: true,
                message: "Chính sách hủy phòng không được để trống!",
              },
            ]}
          >
            <Input placeholder='Chính sách hủy phòng'/>
          </Form.Item>
          <Form.Item label="Hình ảnh" name="image">
            <Input placeholder='Đường link hình ảnh'/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HouseAdminModal;
