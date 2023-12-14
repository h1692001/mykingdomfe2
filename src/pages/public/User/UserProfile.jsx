import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Tabs } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoHomeFill } from 'react-icons/go';
import UserInfo from "./UserInfo";
import BillHistory from "./BillHistory";
import LikedProduct from "./LikedProduct";
import VoteProduct from './VoteProduct';

const UserProfile = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(1);
    const { Header, Content, Footer, Sider } = Layout;
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const items = [
        getItem('Thông tin tài khoản', '1', <GoHomeFill />),
        getItem('Lịch sử mua hàng', '2', <PieChartOutlined />),
        getItem('Đánh giá sản phẩm', '3', <PieChartOutlined />),
        getItem('Sản phẩm đã thích', '4', <PieChartOutlined />),
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('persist:auth'))?.isLoggedIn === 'false') {
            navigate('/');
        }
    }, []);

    return <div className="flex justify-center">
        <div className="max-w-[1330px] w-full" style={{ width: '1330px', padding: '40px 0' }}>
            <Tabs
                defaultActiveKey="1"
                tabPosition={'left'}

                items={[
                    {
                        label: "Thông tin tài khoản",
                        key: 1,
                        children: <UserInfo></UserInfo>,
                    },
                    {
                        label: "Thông tin đơn hàng",
                        key: 2,
                        children: <BillHistory></BillHistory>,
                    },
                    {
                        label: "Đánh giá sản phẩm",
                        key: 3,
                        children: <VoteProduct></VoteProduct>,
                    },
                    {
                        label: "Sản phẩm đã thích",
                        key: 4,
                        children: <LikedProduct></LikedProduct>,
                    },
                ]}
            />
        </div>
    </div>
}

export default UserProfile;