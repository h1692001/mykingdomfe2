import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import CategoryApi from '../../api/CategoryApi';
import BrandApi from '../../api/BrandApi';
import ProductApi from "../../api/ProductApi";
import { Space, Table, Spin, Button, Modal, Input, Select } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;


const ManageProduct = () => {
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Sale off',
            dataIndex: 'saleOff',
            key: 'saleOff',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Chủ đề',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (data) => {
                return <p>{data.name}</p>
            }
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Mã VT',
            dataIndex: 'vtid',
            key: 'vtid',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" style={{
                        backgroundColor: "green !important"
                    }}
                        onClick={() => { navigate('/admin/updateProduct/' + record.id) }}>Chỉnh sửa</Button>
                </Space>
            ),
        },
    ];
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await ProductApi.getAllProduct();
            setData(res);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <>
        <Header
            style={{
                padding: '0 20px',
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "white",
            }}
        >
            <p className='' style={{
                fontSize: '18px',
                fontWeight: 'bold',
            }}>Quản lí sản phẩm</p>
            <Button type="primary" style={{
                backgroundColor: "blue"
            }} onClick={() => { navigate("/admin/createProduct") }}>Thêm sản phẩm </Button>
        </Header>
        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={data} rowKey={'logo'} />
            </div>
        </Spin>
    </>
}

export default ManageProduct;
