import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Space, Table, Spin, Button, Modal, Input, Select, InputNumber } from 'antd';
import BillApi from "../../../api/BillApi";
import ProductApi from "../../../api/ProductApi";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const VoteProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [votes, setVotes] = useState({});
    const { userCurrent } = useSelector(state => state.auth);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await BillApi.getAllBillByUserId(userCurrent?.id);
            const listData = [];
            res.forEach((dt) => {
                listData.push([...dt.billItemDTOS]);
            });
            const flatListData = listData.flat().filter(dt => dt.isVoted === 0);
            setData(flatListData);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }
    const handleVoteChange = (productId, value) => {
        setVotes(prevVotes => ({ ...prevVotes, [productId]: value }));
    }

    useEffect(() => {
        fetchData();
    }, [userCurrent])
    const columns = [
        {
            title: 'Ảnh sản phẩm',
            key: 'images',
            width: '10%',
            render: (record) => {

                return <img src={record?.productDTO?.images[0]} style={{
                    width: '108px',
                    height: "54px",
                    objectFit: 'cover'
                }} alt='logo'></img>
            },
        },
        {
            title: 'Tên sản phẩm',
            key: 'name',
            width: '10%',
            render: (record) => {

                return <p>{record?.productDTO?.name}</p>
            },
        },

        {
            title: 'Đánh giá',
            key: 'vote',
            render: (_, record) => {
                const productId = record.productDTO.id;
                const voteValue = votes[productId] || 1;
                return (
                    <Space size="middle">
                        <InputNumber min={1} max={5} defaultValue={1}
                            value={voteValue}
                            onChange={(value) => handleVoteChange(productId, value)}

                            style={{ display: 'block' }} />
                        <Button type="primary" style={{
                            backgroundColor: "green !important"

                        }}
                            onClick={async () => {
                                try {
                                    const res = await ProductApi.voteProduct({
                                        id: record.id,
                                        vote: votes[productId],
                                        productDTO: {
                                            id: record.productDTO.id
                                        }
                                    });
                                    fetchData();
                                    Swal.fire("Yeah!", "Đã đánh giá sản phẩm thành công", 'success')
                                } catch (e) {
                                    Swal.fire("Oops!", "Có lỗi xảy ra! Thử lại sau", 'error')

                                }
                            }} >Đánh giá</Button>

                    </Space >
                )
            },
        },
    ];

    return <>
        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={data} rowKey={() => {
                    let result = "";
                    const characters =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (let i = 0; i < 50; i++) {
                        const randomIndex = Math.floor(Math.random() * characters.length);
                        result += characters.charAt(randomIndex);
                    }
                    return result;
                }} />
            </div>
        </Spin>
    </>
}

export default VoteProduct;