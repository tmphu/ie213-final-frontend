import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookingService } from '../../services/admin/bookingService';
import { useSelector } from 'react-redux';

export default function Payment() {
  const navigate = useNavigate();
  const bookingInfo = useSelector((state) => state.bookingReducer?.bookingInfo);
  const [searchParams] = useSearchParams();
  const [successPage, setSuccessPage] = useState(false);
  
  const handlePayment = (result) => {
    const payload = {
      booking_id: 1,
      ref: result.vnp_TxnRef,
      amount: result.vnp_Amount,
      payment_date: result.vnp_PayDate,
      is_success: result.isSuccess,
      payment_gateway: `VNPAY - ${result.vnp_BankCode} - ${result.vnp_CardType}`,
      transaction_no: result.vnp_TransactionNo,
    }
    bookingService.createPaymentTransaction(payload)
      .then((res) => {
        setSuccessPage(result.isSuccess)
      }).catch((err) => {
        setSuccessPage(false)
        console.log('createPaymentTransaction error:', err);
      });
  }

  useEffect(() => {
    const paymentResult = Object.fromEntries([...searchParams]);
    console.log('paymentResult', paymentResult);
    const isSuccess = paymentResult.vnp_ResponseCode === '00' && paymentResult.vnp_TransactionStatus === '00';;
    handlePayment({...paymentResult, isSuccess});
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