import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Space, Table, Spin, Button, Modal, Input, List, Divider, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import BillApi from "../../../api/BillApi";
import { useSelector } from 'react-redux';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { formatCurrency } from '../../../utils/convertPrice';
import HoaDon from './HoaDOn';

const BillHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billDetail, setBillDetail] = useState();
    const { userCurrent } = useSelector(state => state.auth);
    const [isShowPdf, setIsShowPdf] = useState(false);
    const [currentPdf, setCurrentPdf] = useState({});

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
                console.log(record);
                return (
                    <Space size="middle">
                        <Button type="primary" style={{
                            backgroundColor: "green !important"
                        }}
                            onClick={() => {
                                setIsModalOpen(true)
                                setBillDetail(record)
                            }}>Xem chi tiết</Button>
                        {record.status === "COMPLETED" && <Button type="primary" style={{
                            backgroundColor: "green !important"
                        }}
                            onClick={() => {
                                setIsShowPdf(true)
                                setCurrentPdf(record)
                            }}>Xuất hóa đơn</Button>}
                    </Space >
                )
            },
        },
    ];
    function formatDateToCustomString(date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
    }
    console.log(currentPdf);
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

        <Modal title="Hóa đơn" open={isShowPdf} okText={<PDFDownloadLink document={<HoaDon currentPdf={currentPdf}></HoaDon>} fileName='HoaDon.pdf' > Tải hóa đơn</PDFDownloadLink>} onCancel={() => { setIsShowPdf(false); setCurrentPdf({}) }}>
            <Document>
                <Page style={{
                    paddingTop: "35px",
                    paddingBottom: "65px",
                    paddingHorizontal: "35px",
                }}>
                    <Text style={{ display: 'block' }}> Tên người nhận: {currentPdf?.name}</Text>
                    <Text style={{ display: 'block' }}> Địa chỉ: {currentPdf?.address}</Text>
                    <Text style={{ display: 'block' }}> Ngày thanh toán: {formatDateToCustomString(new Date(currentPdf?.createdAt))}</Text>
                    <Text style={{ display: 'block', marginTop: '10px', fontWeight: '500' }}> Danh sách sản phẩm: </Text>
                    {currentPdf?.billItemDTOS?.map(dt => {
                        return <Text style={{ margin: '10px 0' }}>
                            <p>{dt.productDTO.name}</p>
                            <div className='flex gap-[12px]' style={{ gap: '12px', fontSize: '12px' }}>
                                <p>Số lượng: {dt.amount}</p>
                                <p>Thành tiền: {formatCurrency(dt?.price)}VND</p>
                            </div>
                        </Text>
                    })}
                    <Text style={{ marginTop: '20px', fontWeight: '500' }}>Tổng tiền: {formatCurrency(currentPdf?.billItemDTOS?.reduce((acc, val) => acc += val.price, 0))} VND</Text>

                </Page>
            </Document>

        </Modal >
    </>
}

export default BillHistory;