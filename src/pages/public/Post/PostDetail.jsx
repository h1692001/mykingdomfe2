import { useEffect, useState } from "react";
import PostApi from "../../../api/PostApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = () => {
    const id = useParams()['id'];
    const [detail, setDetail] = useState();
    const fetchDetail = async () => {
        try {
            const res = await PostApi.getById(id);
            setDetail(res);
        } catch (e) {

        }
    }

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
    useEffect(() => {
        fetchDetail();
    }, [])
    function createMarkup(des) {
        return { __html: des };
    }
    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1330px', width: '100%', marginTop: '30px' }}>
            <div style={{
                padding: '15px 20px',
                backgroundColor: "#f04e47",
                borderRadius: '10px',
                marginBottom: '25px'
            }} ><p style={{ color: "#fff", fontSize: '18px', fontWeight: '700' }}>CHI TIẾT BÀI VIẾT</p></div>
            <div style={{ paddingBottom: '50px' }}>
                <p style={{
                    fontSize: '34px',
                    fontWeight: '600',
                    color: '#333'

                }}>{detail?.title}</p>
                <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                    padding: '6px 0'

                }}>{formatDateTime(detail?.createAt)}</p>
                <img src={detail?.thumb} alt='sos' style={{ width: '100%', objectFit: 'cover', marginTop: '10px' }}></img>
                <div dangerouslySetInnerHTML={createMarkup(detail?.content)}></div>
            </div>

        </div>
    </div>
}

export default PostDetail; 