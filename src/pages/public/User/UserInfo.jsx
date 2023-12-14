import { Input, Select } from "antd";
import { useSelector } from "react-redux";
const UserInfo = () => {
    const { userCurrent } = useSelector(state => state.auth);
    console.log(userCurrent);
    return <div>
        <div className="flex gap-[20px]">
            <div>
                <p>Họ và tên thành viên</p>
                <Input placeHolder={userCurrent?.userName} style={{ marginTop: '10px' }}></Input>
            </div>
            <div>
                <p>Số điện thoại</p>
                <Input placeHolder={userCurrent?.phone} style={{ marginTop: '10px' }}></Input>
            </div>
            <div>
                <p>Email</p>
                <Input placeHolder={userCurrent?.email} style={{ marginTop: '10px' }}></Input>
            </div>
            <div>
                <p>Giới tính</p>
                <Input style={{ marginTop: '10px' }}></Input>
            </div>
        </div>
        <div className="flex mt-[10px] gap-[20px]">
            <p className="px-[14px] py-[6px] bg-[#d9d9d]" style={{ padding: '10px 14px', backgroundColor: 'blue', color: 'white', fontWeight: '500', borderRadius: '10px',marginTop:'20px' }}>Đổi mật khẩu</p>
            <p className="px-[14px] py-[6px] bg-[#d9d9d]" style={{ padding: '10px 14px', backgroundColor: 'blue', color: 'white', fontWeight: '500', borderRadius: '10px',marginTop:'20px' }}>Lưu thông tin</p>
        </div>
    </div>
}

export default UserInfo;