import { Breadcrumb, Layout, Menu, theme, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import BrandApi from '../../api/BrandApi';
import CategoryApi from '../../api/CategoryApi';
import { Space, Table, Spin, Button, Modal, Input, Select, Tag } from 'antd';
import Swal from 'sweetalert2';
import SaleApi from "../../api/SaleApi";

const { Header } = Layout;
const { RangePicker } = DatePicker;

const ManageSale = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [category, setCategory] = useState([]);
    const [newBrand, setNewBrand] = useState({
        logo: null,
        name: '',
        comeFrom: '',
    });

    const columns = [
        {
            title: 'Ảnh bìa',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} style={{
                width: '108px',
                height: "54px",
                objectFit: 'cover'
            }} alt='logo'></img>,
        },
        {
            title: 'Tên đợt khuyến mãi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '% Giảm giá',
            dataIndex: 'sale',
            key: 'sale',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Áp dụng cho',
            key: 'comeFrom',
            render: (record) => {
                return <>
                    {record?.categories?.map(ct => <Tag key={ct.id}>{ct?.name}</Tag>)}
                </>
            }
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" style={{
                        backgroundColor: "green !important"
                    }}
                        onClick={() => {
                            setEditProduct(record);
                            setIsModalOpenEdit(true);
                        }}>Chỉnh sửa</Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        createBrand();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await SaleApi.getAll();
            console.log(res);
            const res2 = await CategoryApi.getAllCategory();
            setData(res);
            const categoryOption = [];
            res2.forEach(dt => {
                categoryOption.push({
                    value: dt.id,
                    label: dt.name
                })
            })
            setCategory(categoryOption);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    const createBrand = async () => {
        try {
            const formData = new FormData();
            formData.append('logo', newBrand.logo);
            formData.append('name', newBrand.name);
            formData.append('comeFrom', newBrand.comeFrom);
            formData.append('category', newBrand.category);

            setIsLoading(true);
            await BrandApi.createBrand(formData);
            setIsLoading(false);
            fetchData();
            setIsModalOpen(false);
            setNewBrand({
                logo: null,
                name: '',
                comeFrom: '',
                category: "",
            });

            const fileInput = document.getElementById('logoInput');
            fileInput.value = '';
            fileInput.type = 'file';

        } catch (error) {
            setIsLoading(false);
            Swal.fire("Error", 'Error creating brand', "error");
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const onChange = (value) => {
        setNewBrand({ ...newBrand, category: value });
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
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
            }}>Quản lí Khuyến mãi</p>
            <Button type="primary" style={{
                backgroundColor: "blue"
            }} onClick={showModal}>Thêm đợt Khuyến mãi</Button>
        </Header>
        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={data} rowKey={'logo'} />
            </div>
        </Spin>
        <Modal title="Thêm đợt khuyến mãi" open={isModalOpen} onOk={async () => {
            try {
                const formData = new FormData();
                formData.append("name", newBrand?.name);
                formData.append("image", newBrand?.image);
                formData.append("sale", newBrand?.sale);
                formData.append("category", newBrand?.category);

                const res = await SaleApi.createSale(formData)
                Swal.fire("Yeah!", "Đã tạo đợt khuyến mãi thành công", "success");
            } catch (e) {
                Swal.fire("Oops!", 'Có lỗi xảy ra! Thử lại sau', "error");
            }
        }} onCancel={handleCancel}>
            <Spin spinning={isLoading}>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Ảnh bìa</p>
                    <input
                        type='file'
                        id="logoInput"
                        onChange={(e) => setNewBrand({ ...newBrand, image: e.target.files[0] })}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên đợt khuyến mãi</p>
                    <Input
                        value={newBrand.name}
                        onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>% Giảm giá</p>
                    <Input
                        value={newBrand.sale}
                        onChange={(e) => setNewBrand({ ...newBrand, sale: e.target.value })}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Áp dụng cho</p>
                    <Select
                        showSearch
                        mode="multiple"
                        placeholder="Select a category"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={category}
                        style={{
                            width: '100%'
                        }}
                    />
                </div>

            </Spin>
        </Modal>

        <Modal title="Sửa thông tin khuyến mãi" open={isModalOpenEdit} onOk={async () => {
            try {
                const formData = new FormData();
                formData.append("name", editProduct?.name);
                formData.append("image", editProduct?.image);
                formData.append("sale", editProduct?.sale);
                formData.append("category", editProduct?.category);
                formData.append("id", editProduct?.id);
                const res = await SaleApi.updateSale(formData)
                Swal.fire("Yeah!", "Đã sửa đợt khuyến mãi thành công", "success");
            } catch (e) {
                Swal.fire("Oops!", 'Có lỗi xảy ra! Thử lại sau', "error");
            }
        }} onCancel={() => { setIsModalOpenEdit(false) }}>
            <Spin spinning={isLoading}>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Ảnh bìa</p>
                    <input
                        type='file'
                        id="logoInput"
                        onChange={(e) => setEditProduct({ ...editProduct, image: e.target.files[0] })}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên đợt khuyến mãi</p>
                    <Input
                        value={editProduct.name}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>% Giảm giá</p>
                    <Input
                        value={editProduct.sale}
                        onChange={(e) => setEditProduct({ ...editProduct, sale: e.target.value })}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Áp dụng cho</p>
                    <Select
                        showSearch
                        mode="multiple"
                        placeholder="Select a category"
                        optionFilterProp="children"
                        onChange={(e) => { setEditProduct({ ...editProduct, category: e }) }}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={category}
                        style={{
                            width: '100%'
                        }}
                    />
                </div>
            </Spin>
        </Modal>
    </>
}

export default ManageSale;
