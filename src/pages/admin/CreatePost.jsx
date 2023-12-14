import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import { Input, Spin, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import PostApi from "../../api/PostApi";
import Swal from 'sweetalert2';

const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPost, setNewPost] = useState({});

    const createPost = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('title', newPost.title);
            formData.append('content', newPost.content);
            formData.append('des', newPost.des);
            formData.append('thumb', newPost.thumb[0]);
            await PostApi.createPost(formData);
            setIsLoading(false);
            Swal.fire("Success", "Create Post Successfully", 'success')
            setNewPost({
            });

        } catch (error) {
            setIsLoading(false);
            Swal.fire("Error", 'Error creating post', "error");
        }
    };

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
            }}>Đăng bài</p>
        </Header>

        <Spin spinning={isLoading}>
            <div style={{
                margin: "0px 20px"
            }}>
                <div style={{ display: "flex", justifyContent: "space-around", flexDirection: 'column', gap: '30px' }}>
                    <div style={{ marginTop: '20px', width: "100%" }}>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Tiêu đề</p>
                        <Input
                            value={newPost?.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: '20px', width: "100%" }}>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Mô tả</p>
                        <Input
                            value={newPost?.des}
                            onChange={(e) => setNewPost({ ...newPost, des: e.target.value })}
                        />
                    </div>
                    <div>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Ảnh mô tả</p>
                        <div style={{}}>
                            <input type="file" onChange={(e) => setNewPost({ ...newPost, thumb: e.target.files })} />
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <p style={{ marginBottom: '10px', fontWeight: '500', fontSize: '16px' }}>Nội dung</p>
                        <div style={{ backgroundColor: 'white' }}>
                            <ReactQuill
                                theme="snow"
                                value={newPost.content}
                                onChange={(e) => { setNewPost({ ...newPost, content: e }) }}
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
                        }} onClick={() => { createPost() }}>Đăng bài</Button>
                    </div>
                </div>
            </div>
        </Spin>
    </>
}

export default CreatePost;