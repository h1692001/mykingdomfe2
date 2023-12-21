import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import CategoryApi from '../../api/CategoryApi';
import { Space, Table, Spin, Button, Modal, Input } from 'antd';
import Swal from 'sweetalert2';
const { Header } = Layout;



const ManageCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [newCategory, setNewCategory] = useState({
        name: '',
    });

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
            const res = await CategoryApi.getAllCategory();
            setData(res);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    const columns = [
        {
            title: 'Logo',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} style={{
                width: '108px',
                height: "54px",
                objectFit: 'cover'
            }} alt='logo'></img>,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => {
                console.log(record); return (
                    <Space size="middle">
                        <Button type="primary" style={{
                            backgroundColor: "green !important"
                        }}
                            onClick={() => { setIsModalEditOpen(true); setEditData(record) }}>Chỉnh sửa</Button>
                        {record.hidden === false ?
                            <Button type="error" style={{
                                backgroundColor: "red !important",
                                color: "white"
                            }}
                                onClick={async () => {
                                    try {
                                        setIsLoading(true);
                                        await CategoryApi.disableCategory(record.id)
                                        Swal.fire("Yeah!", "Đã ẩn danh mục thành công", 'success');
                                        fetchData();
                                        setIsLoading(false);
                                    }
                                    catch (e) {
                                        setIsLoading(false);
                                        Swal.fire("Oops!", 'Có lỗi xảy ra! Thử lại sau', "error");

                                    }
                                }}>Ẩn danh mục</Button> : <Button type="primary" style={{
                                    backgroundColor: "red !important",
                                    color: "white"
                                }}
                                    onClick={async () => {
                                        try {
                                            setIsLoading(true);
                                            await CategoryApi.enableCategory(record.id)
                                            Swal.fire("Yeah!", "Đã hiện danh mục thành công", 'success');
                                            fetchData();
                                            setIsLoading(false);
                                        }
                                        catch (e) {
                                            setIsLoading(false);
                                            Swal.fire("Oops!", 'Có lỗi xảy ra! Thử lại sau', "error");

                                        }
                                    }}>Hiện danh mục</Button>}
                    </Space>
                )
            },
        },
    ];

    const createBrand = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('logo', newCategory.logo);
            formData.append('name', newCategory.name);
            await CategoryApi.createCategory(formData);
            setIsLoading(false);
            fetchData();
            setIsModalOpen(false);
            setNewCategory({
            });

        } catch (error) {
            setIsLoading(false);
            Swal.fire("Error", 'Error creating category', "error");
        }
    };

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
            }}>Quản lí danh mục</p>
            <Button type="primary" style={{
                backgroundColor: "blue"
            }} onClick={showModal}>Thêm danh mục</Button>
        </Header>
        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={data} rowKey={'logo'} />
            </div>
        </Spin>
        <Modal title="Thêm danh mục" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={isLoading}>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Logo</p>
                    <input
                        type='file'
                        id="logoInput"
                        onChange={(e) => setNewCategory({ ...newCategory, logo: e.target.files[0] })}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên danh mục</p>
                    <Input
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                </div>

            </Spin>
        </Modal>
        <Modal title="Sửa danh mục" open={isModalEditOpen} onOk={async () => {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('logo', editData.logo);
                formData.append('name', editData.name);
                formData.append("id", editData.id);
                await CategoryApi.updateCategory(formData);
                setIsLoading(false);
                fetchData();
                setIsModalEditOpen(false);
                setEditData({
                });
            } catch (e) {
                setIsLoading(false);
            }
        }} onCancel={() => { setIsModalEditOpen(false) }}>
            <Spin spinning={isLoading}>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Logo</p>
                    <input
                        type='file'
                        id="logoInput"
                        onChange={(e) => setEditData({ ...editData, logo: e.target.files[0] })}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên danh mục</p>
                    <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                </div>

            </Spin>
        </Modal>
    </>
}

export default ManageCategory;
