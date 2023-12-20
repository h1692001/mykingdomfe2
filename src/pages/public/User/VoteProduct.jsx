import { Breadcrumb, Layout, Menu, theme, Text } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { Space, Table, Spin, Button, Modal, Input, Select, InputNumber } from 'antd';
import BillApi from "../../../api/BillApi";
import ProductApi from "../../../api/ProductApi";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ReactStars from 'react-stars';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';


const VoteProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [vote, setVote] = useState({});
    const [comment, setComment] = useState({});
    const [isShowModaL, setIsShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState();
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
                return (
                    <Space size="middle">

                        <Button type="primary" style={{
                            backgroundColor: "green !important"
                        }}
                            onClick={async () => {
                                setIsShowModal(true);
                                setCurrentProduct(record);
                            }} >Đánh giá</Button>

                    </Space >
                )
            },
        },
    ];
    console.log(currentProduct);
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
        <Modal title="Đánh giá sản phẩm" open={isShowModaL} onOk={async () => {
            try {
                setIsLoading(true);
                await ProductApi.voteProduct({
                    ...currentProduct,
                    vote: vote,
                    contentVote: comment
                });
                setIsLoading(false);
                fetchData();
                setIsShowModal(false);
                setComment();
                setVote();
            }
            catch (e) {

            }
        }} onCancel={() => { setIsShowModal(false) }}>
            <Spin spinning={isLoading}>
                <ReactStars count={5} size={24} value={vote} emptyIcon={<FaRegStar></FaRegStar>} fullIcon={<FaStar></FaStar>} activeColor="#f04e45" onChange={(e) => {
                    setVote(e);
                }} />
                <TextArea placeholder='Nhận xét' style={{ marginTop: '10px' }} onChange={(e) => { setComment(e.target.value) }}></TextArea>
            </Spin>
        </Modal>
    </>
}

export default VoteProduct;