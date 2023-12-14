import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import CartApi from "../../../api/CartApi";
import BillApi from '../../../api/BillApi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from "../../../store/actions/cartAction";

const PaymentSuccess = () => {
    const [status, setStatus] = useState();
    const [paymentCode, setPaymentCode] = useState();
    const dispatch = useDispatch();
    const { userCurrent } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const pay = async (vnp_TransactionNo) => {
        try {
            console.log(userCurrent, cart);
            const res = await BillApi.createBill({
                status: "PENDING",
                createdAt: new Date(),
                paymentMethod: "vnpay",
                name: localStorage.getItem("name"),
                phone: localStorage.getItem("phone"),
                address: localStorage.getItem("address"),
                userId: localStorage.getItem("userId"),
                paymentCode: vnp_TransactionNo,
                cartId: localStorage.getItem("cartId"),
                billItemDTOS: cart?.cartProducts?.map(ct => {
                    return {
                        amount: ct.amount,
                        productDTO: ct.productDTO
                    }
                })
            })
            const res2 = await CartApi.getCart(userCurrent?.id);
            dispatch(fetchCart(res2));
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            localStorage.removeItem("address");
            localStorage.removeItem("userId");
            localStorage.removeItem("cartId");
        }
        catch (e) {

        }
    }

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(currentUrl);
        const vnp_Amount = urlParams.get('vnp_Amount');
        const vnp_BankCode = urlParams.get('vnp_BankCode');
        const vnp_BankTranNo = urlParams.get('vnp_BankTranNo');
        const vnp_CardType = urlParams.get('vnp_CardType');
        const vnp_OrderInfo = urlParams.get('vnp_OrderInfo');
        const vnp_PayDate = urlParams.get('vnp_PayDate');
        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
        const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');
        setStatus(vnp_ResponseCode)
        setPaymentCode(vnp_TransactionNo)
        const vnp_TmnCode = urlParams.get('vnp_TmnCode');
        const vnp_TransactionStatus = urlParams.get('vnp_TransactionStatus');
        const vnp_TxnRef = urlParams.get('vnp_TxnRef');
        const vnp_SecureHash = urlParams.get('vnp_SecureHash');

    }, []);
    useEffect(() => {
        if (userCurrent && cart && localStorage.getItem("userId") && localStorage.getItem("cartId"))
            if (status === '00') {
                pay(paymentCode);
            }
    }, [userCurrent, cart])

    return <div className='h-[500px] w-full py-[30px]' style={{ height: '500px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {status === '00' && <div className='flex justify-center flex-col items-center' style={{ flexDirection: 'column' }} >
            <FaCheckCircle style={{ fontSize: '32px', marginBottom: '20px' }} />
            <p className='text-center' style={{ fontSize: '30px' }}>Thanh toán thành công</p>
            <button onClick={() => { navigate("/") }} style={{ backgroundColor: "#f04e47", color: "white", padding: '10px 20px', borderRadius: '12px' }}>Quay về trang chủ</button>
        </div>}
    </div>
}
export default PaymentSuccess;