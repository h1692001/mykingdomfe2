import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import { Input, Spin, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import PostApi from "../../api/PostApi";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPost, setNewPost] = useState({});
    const id = useParams()['id'];
    const [detail, setDetail] = useState();
    const navigate = useNavigate();
    const fetchDetail = async () => {
        try {
            console.log(id);
            const res = await PostApi.getById(id);
            setDetail(res);
        } catch (e) {

        }
    }
    useEffect(() => {
        fetchDetail();
    }, [])

    const updatePost = async () => {
        try {
            const res = await PostApi.updatePost(detail);
            Swal.fire("Yeah!", "Sửa bài đăng thành công", 'success')
            navigate("/admin/managepost")
        }
        catch (e) {
            Swal.fire("Oops", "Có lỗi xảy ra! Thử lại sau", 'error')
        }
    }


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
            }}>Sửa bài đăng</p>
        </Header>

        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <div style={{ display: "flex", justifyContent: "space-around", flexDirection: 'column', gap: '30px' }}>
                    <div style={{ marginTop: '20px', width: "100%" }}>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tiêu đề</p>
                        <Input
                            value={detail?.title}
                            onChange={(e) => setDetail({ ...detail, title: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: '20px', width: "100%" }}>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Mô tả</p>
                        <Input
                            value={detail?.des}
                            onChange={(e) => setDetail({ ...detail, des: e.target.value })}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Nội dung</p>
                        <div style={{ backgroundColor: 'white' }}>
                            <ReactQuill
                                theme="snow"
                                value={detail?.content}
                                onChange={(e) => { setDetail({ ...detail, content: e }) }}
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline', 'strike'],
                                        ['blockquote', 'code-block'],
                                        ['link', 'image'],
                                        [{ 'header': 1 }, { 'header': 2 }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        [{ 'script': 'sub' }, { 'script': 'super' }],
                                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                                        [{ 'direction': 'rtl' }],

                                        [{ 'size': ['small', false, 'large', 'huge'] }],
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                                        [{ 'color': [] }, { 'background': [] }],
                                        [{ 'font': [] }],
                                        [{ 'align': [] }],

                                        ['clean']
                                    ],


                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', padding: '0 20px', display: 'flex', justifyContent: 'end' }}>
                        <Button type="primary" style={{
                            backgroundColor: "blue"
                        }} onClick={() => { updatePost() }}>Lưu</Button>
                    </div>
                </div>
            </div>
        </Spin>
    </>
}

export default UpdatePost;