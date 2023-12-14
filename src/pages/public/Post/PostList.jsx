import { useEffect, useState } from "react";
import PostApi from "../../../api/PostApi";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const PostList = () => {
    const [post, setPost] = useState([]);
    function createMarkup(des) {
        return { __html: des };
    }
    const fetchPost = async () => {
        try {
            const res = await PostApi.getAll();
            setPost(res);

        } catch (e) {

        }
    }
    useEffect(() => {
        fetchPost();
    }, [])
    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1330px', width: '100%', marginTop: '30px' }}>
            <div style={{ display: "flex", fontSize: '13px', padding: '4px 0', gap: '8px', backgroundColor: "#f6f6f8", marginBottom: '10px' }}>
                <Link to="/">Trang chủ</Link>
                <p> {">"} MyKingdom CẨM NANG</p>
            </div>
            <div style={{ display: "flex", gap: '40px' }}>
                <div style={{ width: '210px' }}>
                    <p style={{ fontSize: '17px', fontWeight: '600', marginBottom: '15px' }}>DANH MỤC BÀI VIẾT</p>
                    <div>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>360 độ Mykingdom</p>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>Nuôi con khỏe</p>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>Dạy con thông minh</p>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>Chơi cùng con</p>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>Mẹo hữu ích</p>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>Hôm nay con chơi gì?</p>
                        <p style={{ fontSize: '14px', marginBottom: '8px', }}>Vòng quanh thế giới</p>
                    </div>
                </div>
                <div style={{ width: '1100px' }}>
                    <div style={{
                        padding: '15px 20px',
                        backgroundColor: "#f04e47",
                        borderRadius: '10px',
                        marginBottom: '25px'
                    }} ><p style={{ color: "#fff", fontSize: '18px', fontWeight: '700' }}>BÀI VIẾT MỚI NHÁT</p></div>
                    <div style={{ marginBottom: '40px', display: 'flex', gap: '30px' }}>
                        <Link to={"/postDetail/" + post[0]?.id} style={{ width: "480px !important", height: '541px', borderRadius: '6px', position: 'relative' }}>
                            <img alt={'hi'} src={post[0]?.thumb} style={{ width: "570px", height: '541px', objectFit: "cover" }}></img>
                            <div style={{ padding: '20px', width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: 'rgba(255,255,255,.6)' }}>
                                <p style={{ fontSize: '18px', textOverflow: 'ellipsis', color: '#333', margin: '15px 0 10px', fontWeight: '600', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }} className="truncate text-ellipsis">{post[0]?.title}</p>
                                <p>{post[0]?.des}</p>
                            </div>
                        </Link>
                        <div style={{ width: '600px' }}>
                            {post?.map((p, i) => {
                                if (i > 0 && i <= 4) return <div style={{ marginBottom: '20px' }} key={i}>
                                    <Link to={"/postDetail/" + p?.id} style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                                        <img src={p?.thumb} alt={"hh"} style={{ width: '250px', objectFit: 'cover', height: '120px' }}></img>
                                        <div style={{ width: '230px' }}>
                                            <p style={{ fontSize: '18px', textOverflow: 'ellipsis', color: '#333', margin: '0px 0 10px 0', fontWeight: '600', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }} className="truncate text-ellipsis">{p?.title}</p>
                                            <p style={{ fontSize: '14px', textOverflow: 'ellipsis', color: '#333', fontWeight: '400', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}>{p?.des}</p>
                                        </div>
                                    </Link>
                                </div>
                            })}
                        </div>
                    </div>
                    <div style={{
                        padding: '15px 20px',
                        backgroundColor: "#f04e47",
                        borderRadius: '10px',
                        marginBottom: '25px'
                    }} ><p style={{ color: "#fff", fontSize: '18px', fontWeight: '700' }}>TẤT CẢ BÀI VIẾT</p></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', padding: '10px 0 50px 0' }}>

                        {post?.map((p, i) => {
                            if (i > 4) return <PostCard key={i} post={p}></PostCard>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div >
}

export default PostList;