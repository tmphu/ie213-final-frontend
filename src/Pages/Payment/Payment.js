import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookingService } from '../../services/admin/bookingService';
import { useSelector } from 'react-redux';

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [successPage, setSuccessPage] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  
  const getBookingInfo = (code) => {
    bookingService.getBookingByCode(code)
      .then((res) => {
        setBookingInfo(res.data.content);
      })
      .catch((err) => {
        console.log('getBookingInfo error: ', err);
      })
  }

  const handlePayment = async (result) => {
    const payload = {
      booking_id: result.id,
      ref: result.vnp_TxnRef,
      amount: result.vnp_Amount,
      payment_date: result.vnp_PayDate,
      is_success: result.isSuccess,
      payment_gateway: `VNPAY - ${result.vnp_BankCode} - ${result.vnp_CardType}`,
      transaction_no: result.vnp_TransactionNo,
    }
    await bookingService.createPaymentTransaction(payload)
      .then((res) => {
        setSuccessPage(result.isSuccess)
      })
      .catch((err) => {
        setSuccessPage(false)
        console.log('createPaymentTransaction error:', err);
      });
  }

  useEffect(() => {
    const paymentResult = Object.fromEntries([...searchParams]);
    console.log('paymentResult', paymentResult);
    const isSuccess = paymentResult.vnp_ResponseCode === '00' && paymentResult.vnp_TransactionStatus === '00';
    getBookingInfo(paymentResult.vnp_OrderInfo?.slice(-10));
    if (bookingInfo) {
      handlePayment({...paymentResult, isSuccess, bookingInfo});
    }
  }, [])
  
  return (successPage ? (
    <Result
    status="success"
    className='my-20'
    title="Đặt phòng thành công!"
    subTitle={`Mã đặt phòng: ${bookingInfo?.code}. Chúc bạn có chuyến đi vui vẻ.`}
    extra={[
      <Button
        key="go-to-my-profile"
        className="px-5 py-1 rounded-full"
        onClick={() => navigate('/my-profile')}
      >
        Quản lý đặt phòng
      </Button>,
    ]}
    />
  ) : (
    <Result
      status="error"
      className='my-20'
      title="Cập nhật thanh toán không thành công"
      subTitle="Vui lòng liên hệ với nhân viên CSKH của chúng tôi để được hướng dẫn"
      extra={[
        <Button
          key="go-to-my-profile"
          className="px-5 py-1 rounded-full"
          onClick={() => navigate('/my-profile')}
        >
        Quản lý đặt phòng
      </Button>,
      ]}
    />)
  )
}