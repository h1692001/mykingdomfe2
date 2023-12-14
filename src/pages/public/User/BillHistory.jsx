import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Space, Table, Spin, Button, Modal, Input, List, Divider, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import BillApi from "../../../api/BillApi";
import { useSelector } from 'react-redux';
const BillHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billDetail, setBillDetail] = useState();
    const { userCurrent } = useSelector(state => state.auth);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await BillApi.getAllBillByUserId(userCurrent?.id);
            setData(res);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [userCurrent])

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: '10%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: '20%'
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Mã giao dịch',
            dataIndex: 'paymentCode',
            key: 'paymentCode',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày tạo hóa đơn',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (data) => {
                const date = new Date(data);
                const minutes = date.getMinutes();
                const hours = date.getHours();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                return (
                    <p>{`${minutes}-${hours} | ${day}-${month}-${year}`}</p>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {

                return (
                    <Space size="middle">
                        <Button type="primary" style={{
                            backgroundColor: "green !important"
                        }}
                            onClick={() => {
                                setIsModalOpen(true)
                                setBillDetail(record)
                            }}>Xem chi tiết</Button>
                    </Space >
                )
            },
        },
    ];
    console.log(billDetail);
    return <>
        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={data} rowKey={'name'} />
            </div>
        </Spin>
        <Modal title="Chi tiết hóa đơn" open={isModalOpen} onCancel={() => { setIsModalOpen(false) }}>
            <Spin spinning={isLoading}>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên người nhận</p>
                    <Input
                        id="logoInput"
                        readOnly
                        value={billDetail?.name}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Số điện thoại</p>
                    <Input
                        value={billDetail?.phone}
                        readOnly
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Địa chỉ</p>
                    <Input
                        value={billDetail?.address}
                        readOnly
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Trạng thái</p>
                    <Input
                        value={billDetail?.status}
                        readOnly
                    />
                </div>

                <p style={{ marginBottom: '10px', marginTop: '20px', fontWeight: '500', fontSize: '16px' }}>Sản phẩm đã mua</p>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflow: 'auto',
                        padding: '0 16px',
                    }}
                >

                    <InfiniteScroll
                        dataLength={billDetail?.billItemDTOS?.length}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            dataSource={billDetail?.billItemDTOS}
                            renderItem={(item) => {
                                console.log(item);; return (
                                    <List.Item key={() => {
                                        let result = "";
                                        const characters =
                                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                                        for (let i = 0; i < 50; i++) {
                                            const randomIndex = Math.floor(Math.random() * characters.length);
                                            result += characters.charAt(randomIndex);
                                        }
                                        return result;
                                    }}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.productDTO.images[0]} />}
                                            title={<a href="https://ant.design">{item?.productDTO.name}</a>}
                                            description={`Số lượng: ${item?.amount}`}
                                        />

                                    </List.Item>
                                )
                            }}
                        />
                    </InfiniteScroll>
                </div>

            </Spin>
        </Modal>
    </>
}

export default BillHistory;