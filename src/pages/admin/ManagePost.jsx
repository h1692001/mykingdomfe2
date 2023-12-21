import { Header } from "antd/es/layout/layout";
import { Button, Space, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostApi from "../../api/PostApi";
import Swal from "sweetalert2";
const ManagePost = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState([]);
    const fetchPost = async () => {
        try {
            const res = await PostApi.getAll();
            setPost(res);
        } catch (e) { }
    };
    useEffect(() => {
        fetchPost();
    }, []);

    function formatDateTime(inputDateString) {
        var dateObject = new Date(inputDateString);
        var daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        var dayOfWeek = daysOfWeek[dateObject.getUTCDay()];
        var formattedDate = dayOfWeek + ', ' +
            (dateObject.getUTCDate() < 10 ? '0' : '') + dateObject.getUTCDate() + '/' +
            ((dateObject.getUTCMonth() + 1) < 10 ? '0' : '') + (dateObject.getUTCMonth() + 1) + '/' +
            dateObject.getUTCFullYear() + ' ' +
            (dateObject.getUTCHours() < 10 ? '0' : '') + dateObject.getUTCHours() + ':' +
            (dateObject.getUTCMinutes() < 10 ? '0' : '') + dateObject.getUTCMinutes();

        return formattedDate;
    }

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Mô tả',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: 'Đăng vào',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (date) => {
                return <>{formatDateTime(date)}</>
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
                            navigate('/admin/updatePost/' + record.id)
                        }}>Chỉnh sửa</Button>
                    <Button type="error" style={{
                        backgroundColor: "red !important",
                        color: "white"
                    }}
                        onClick={async () => {
                            try {
                                setIsLoading(true);
                                await PostApi.delete(record.id)
                                Swal.fire("Yeah!", "Đã xóa bài đăng thành công", 'success');
                                fetchPost();
                                setIsLoading(false);
                            }
                            catch (e) {
                                setIsLoading(false);
                            }
                        }}>Xóa bài</Button>
                </Space>
            ),
        },
    ];

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
            }}>Quản lí Bài đăng</p>
            <Button type="primary" style={{
                backgroundColor: "blue"
            }} onClick={() => { navigate("/admin/createPost") }}>Đăng bài</Button>
        </Header>

        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <Table columns={columns} dataSource={post} rowKey={'title'} />
            </div>
        </Spin>
    </>
}
export default ManagePost;