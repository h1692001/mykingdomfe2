import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { formatCurrency } from "../../../utils/convertPrice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart } = useSelector(state => state.cart);
    const navigate = useNavigate();
    return <div className="flex justify-center">
        <div className="pt-[40px] max-w-[1330px] w-full flex justify-between" style={{ justifyContent: 'space-between', maxWidth: '1330px', width: '100%', paddingTop: '40px' }}>
            <div style={{ width: '45%' }}>
                <p className="mb-[10px] font-[20px] font-[700]" style={{ fontWeight: '600', fontSize: '20px' }}>THÔNG TIN ĐƠN HÀNG ({cart?.cartProducts?.length} sản phẩm)</p>

                <div>
                    {cart?.cartProducts?.map(item => {
                        return <CartItem key={item?.productDTO.id} item={item}></CartItem>
                    })}
                </div>
            </div>
            <div style={{ padding: '0 10px 60px 10px', width: '45%', }}>
                <p style={{ fontSize: '20px', color: "#444", fontWeight: '500' }}>TÓM TẮT ĐƠN HÀNG</p>

                <div className="flex justify-between" style={{ justifyContent: 'space-between', marginTop: '22px', fontSize: '14px' }}>
                    <p>TỔNG TIỀN</p>
                    <p>{formatCurrency(cart?.cartProducts?.reduce((arr, cur) => { return arr += cur?.productDTO?.price * cur?.amount }, 0))} VND</p>
                </div>

                <div className="flex justify-between" style={{ justifyContent: 'space-between', marginTop: '22px', fontSize: '14px', color: '#646464' }}>
                    <p>GIẢM</p>
                    <p>-{formatCurrency(cart?.cartProducts?.reduce((arr, cur) => { return arr += (cur?.productDTO?.price * cur?.productDTO?.saleOff / 100) * cur?.amount }, 0))} VND</p>
                </div>

                <div className="flex justify-between" style={{ borderBottom: '2px solid #ddd', paddingBottom: '30px', justifyContent: 'space-between', marginTop: '22px', fontSize: '14px', color: '#646464' }}>
                    <p>VẬN CHUYỂN (GIAO HÀNG MIỄN PHÍ - FREE)</p>
                    <p>0 VND</p>
                </div>

                <div style={{ padding: '23px 0', fontWeight: '600', fontSize: '20px', justifyContent: 'space-between' }} className="flex">
                    <p style={{}}>THÀNH TIỀN</p>
                    <p>{formatCurrency(cart?.cartProducts?.reduce((arr, cur) => { return arr += (cur?.productDTO?.price - cur?.productDTO?.price * cur?.productDTO?.saleOff / 100) * cur?.amount }, 0))} VND</p>
                </div>

                <div onClick={() => {
                    console.log(cart);
                    if (cart?.cartProducts?.length > 0) {
                        navigate('/payment')
                    } else {
                        Swal.fire("Oops!", "Bạn chưa có sản phẩm nào trong giỏ hàng", 'error')
                    }
                }} style={{ color: 'white', backgroundColor: 'red', fontWeight: '600', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '13px 24px 10px', borderRadius: '8px' }}
                >
                    <p>TIẾN HÀNH THANH TOÁN</p>
                </div>
            </div>


        </div>
    </div >
}

export default Cart;