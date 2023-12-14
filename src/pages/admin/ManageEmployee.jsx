import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import AuthApi from '../../api/AuthApi';
import UserApi from '../../api/UserApi';
import { Space, Table, Spin, Button, Modal, Input, Select } from 'antd';
import Swal from 'sweetalert2';
const { Header } = Layout;

const ManageEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [category, setCategory] = useState([]);
    const [newBrand, setNewBrand] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
            const res = await UserApi.getAllNV();
            setData(res);
        } catch (e) {
            setIsLoading(false);
        }
    }

    const createBrand = async () => {
        setIsLoading(true);
        try {
            const res = await AuthApi.registerNV(newBrand);
            Swal.fire("Yeah!", 'Đã thêm nhân viên thành công', "success");
            setIsLoading(false);


        } catch (error) {
            setIsLoading(false);
            Swal.fire("Oops!", 'Có lỗi xảy ra! Thử lại sau', "error");
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
            }}>Quản lí Nhân viên</p>
            <Button type="primary" style={{
                backgroundColor: "blue"
            }} onClick={showModal}>Thêm nhân viên</Button>
        </Header>
        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={data} rowKey={'logo'} />
            </div>
        </Spin>
        <Modal title="Thêm nhân viên" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={isLoading}>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên</p>
                    <Input
                        value={newBrand.fullname}
                        onChange={(e) => setNewBrand({ ...newBrand, fullname: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Email</p>
                    <Input
                        value={newBrand.email}
                        onChange={(e) => setNewBrand({ ...newBrand, email: e.target.value })}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Mật khẩu</p>
                    <Input.Password
                        value={newBrand.password}
                        onChange={(e) => setNewBrand({ ...newBrand, password: e.target.value })}
                    />
                </div>

            </Spin>
        </Modal>

        <Modal title="Sửa thông tin nhân viên" open={isModalOpenEdit} onOk={() => {

        }} onCancel={() => { setIsModalOpenEdit(false) }}>
            <Spin spinning={isLoading}>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tên</p>
                    <Input
                        value={newBrand.fullname}
                        onChange={(e) => setNewBrand({ ...newBrand, fullname: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Email</p>
                    <Input
                        value={newBrand.email}
                        onChange={(e) => setNewBrand({ ...newBrand, email: e.target.value })}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Mật khẩu</p>
                    <Input.Password
                        value={newBrand.password}
                        onChange={(e) => setNewBrand({ ...newBrand, password: e.target.value })}
                    />
                </div>
            </Spin>
        </Modal>
    </>
}

export default ManageEmployee;
