import { useSelector, useDispatch } from "react-redux";
import { Input, Table, Breadcrumb, Radio, Space } from 'antd';
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatCurrency } from "../../../utils/convertPrice";
import BillApi from "../../../api/BillApi"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import CartApi from "../../../api/CartApi";
import { fetchCart } from "../../../store/actions/cartAction";
const Payment = () => {
    const { cart } = useSelector(state => state.cart);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (cart?.cartProducts?.length === 0 || !cart?.cartProducts) {
            navigate('/')
        }
    }, [])
    const { userCurrent } = useSelector(state => state.auth);
    const columns = [
        {
            title: 'TÊN SẢN PHẨM',
            dataIndex: 'productDTO',
            key: 'productDTO',
            fixed: true,
            render: (text) => <div className="flex items-center" style={{ gap: '5px' }}>
                <img src={text.images[0]} alt='img' style={{ height: '75px', width: '75px', objectFit: 'contains' }}></img>
                <p style={{ fontSize: '16px', fontWeight: '500' }}>{text.name}</p>
            </div>,

        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'TỔNG TIỀN',
            dataIndex: 'productDTO',
            key: 'productDTO',
            render: (text) => <div>
                <p style={{ color: '#df494a', fontSize: '12px', fontWeight: '700' }}>{formatCurrency(text.price - (text.price * text.saleOff) / 100)} VNĐ</p>
                <p style={{ color: '#444', fontSize: '12px', textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontWeight: '600' }}>{formatCurrency(text.price)} VNĐ</p>
            </div>,
        },
    ];
    const dispatch = useDispatch();

    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1330px', width: '100%', paddingBottom: '30px' }} className="">
            <div className="AllProduct_Title" style={{ margin: '18px 0 25px 0' }}>
                <Breadcrumb items={[{ title: <Link>Trang chủ</Link> }, { title: 'Thanh toán' }]} style={{ backgroundColor: '#f6f6f8', padding: '6px 10px' }}></Breadcrumb>
            </div>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                <div style={{ width: '45%' }}>

                    <p style={{ fontSize: '22px', fontWeight: '400', marginBottom: '10px' }}>Địa chỉ nhận hàng</p>
                    <div className="flex gap-[10px]" style={{ marginBottom: '14px' }}>
                        <Input placeholder="Họ và tên" onChange={(e) => { setName(e.target.value) }}></Input>
                        <Input placeholder="Số điện thoại" onChange={(e) => { setPhone(e.target.value) }}></Input>
                    </div>
                    <div>
                        <Input placeholder="Địa chỉ" onChange={(e) => { setAddress(e.target.value) }}></Input>
                    </div>

                    <p style={{ fontSize: '22px', fontWeight: '400', marginBottom: '10px', marginTop: '30px' }}>Phương thức thanh toán</p>
                    <Radio.Group onChange={(e) => { setPaymentMethod(e.target.value) }} value={paymentMethod}>
                        <Space direction="vertical">
                            <Radio value={'cash'}>Thanh toán khi nhận hàng</Radio>
                            <Radio value={'vnpay'}>Thanh toán qua VN Pay</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <div style={{ width: '45%' }}>
                    <p style={{ fontSize: '22px', fontWeight: '400', marginBottom: '10px' }}>Thông tin đơn hàng</p>
                    <Table columns={columns} scroll={{
                        x: 700,
                        y: 300,
                    }} dataSource={cart?.cartProducts}></Table>

                    <div className="flex justify-between" style={{ padding: '10px 0', justifyContent: 'space-between', fontSize: '14px', color: "#222" }}>
                        <p>Tổng số lượng sản phẩm:</p>
                        <p>{cart?.cartProducts?.reduce((arr, cut) => { return arr += cut.amount }, 0)}</p>
                    </div>
                    <div className="flex justify-between" style={{ padding: '10px 0', justifyContent: 'space-between', fontSize: '14px', color: "#222" }}>
                        <p>Tổng tiền:</p>
                        <p>{formatCurrency(cart?.cartProducts?.reduce((arr, cur) => { return arr += cur?.productDTO?.price * cur?.amount }, 0))} VND</p>
                    </div>
                    <div className="flex justify-between" style={{ padding: '10px 0', justifyContent: 'space-between', fontSize: '14px', color: "#222" }}>
                        <p>Giảm:</p>
                        <p>-{formatCurrency(cart?.cartProducts?.reduce((arr, cur) => { return arr += (cur?.productDTO?.price * cur?.productDTO?.saleOff / 100) * cur?.amount }, 0))} VND</p>
                    </div>
                    <div className="flex justify-between" style={{ padding: '10px 0', justifyContent: 'space-between', fontSize: '14px', color: "#222" }}>
                        <p>Phí vận chuyển:</p>
                        <p>0 VND</p>
                    </div>
                    <div className="flex justify-between" style={{ padding: '10px 0', justifyContent: 'space-between', fontSize: '20px', fontWeight: '500', color: "#df494a" }}>
                        <p>Thành tiền</p>
                        <p>{formatCurrency(cart?.cartProducts?.reduce((arr, cur) => { return arr += (cur?.productDTO?.price - cur?.productDTO?.price * cur?.productDTO?.saleOff / 100) * cur?.amount }, 0))} VND</p>
                    </div>

                    <div onClick={() => {
                        const pay = async () => {
                            try {
                                const res = await BillApi.createBill({
                                    status: "PENDING",
                                    createdAt: new Date(),
                                    paymentMethod: paymentMethod,
                                    name: name,
                                    phone: phone,
                                    address: address,
                                    userId: userCurrent?.id,
                                    cartId: cart?.id,
                                    billItemDTOS: cart?.cartProducts?.map(ct => {
                                        return {
                                            amount: ct.amount,
                                            productDTO: ct.productDTO
                                        }
                                    })
                                })
                                const res2 = await CartApi.getCart(userCurrent?.id);
                                dispatch(fetchCart(res2));
                                Swal.fire("Thành công", "Đơn hàng đã được đặt!", "success");
                                navigate("/")
                            }
                            catch (e) {
                                Swal.fire("Oops", "Có lỗi xảy ra! Vui lòng thử lại sau", "error");
                            }
                        }
                        const payVNPAY = async () => {
                            try {
                                const totalPrice = cart?.cartProducts?.reduce((total, cur) => {
                                    const productPrice = cur?.productDTO?.price || 0;
                                    const saleOff = cur?.productDTO?.saleOff || 0;
                                    const amount = cur?.amount || 0;

                                    const discountedPrice = productPrice - (productPrice * saleOff) / 100;
                                    const productTotal = discountedPrice * amount;

                                    return total + Math.ceil(productTotal);
                                }, 0);
                                localStorage.setItem("name", name);
                                localStorage.setItem("phone", phone);
                                localStorage.setItem("address", address);
                                localStorage.setItem("userId", userCurrent?.id);
                                localStorage.setItem("cartId", cart?.id);

                                const res = await BillApi.createBillVNPAY(totalPrice);
                                window.location.href = res;

                            }
                            catch (e) {
                                Swal.fire("Oops", "Có lỗi xảy ra! Vui lòng thử lại sau", "error");
                            }
                        }
                        if (paymentMethod === 'cash') pay()
                        else payVNPAY();
                    }} style={{ marginTop: '20px', color: 'white', backgroundColor: 'red', fontWeight: '600', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '13px 24px 10px', borderRadius: '8px' }}
                    >
                        <p>THANH TOÁN</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default Payment;