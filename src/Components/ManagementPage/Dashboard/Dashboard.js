import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { useSelector } from 'react-redux';

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
  getItem('Trở lại trang chủ', '/', <GoHomeFill />),
  getItem('Quản lý nhãn hàng', '/admin' + '', <PieChartOutlined />),
  getItem('Quản lý danh mục', '/admin' + '/managecategory', <DesktopOutlined />),
  getItem('Quản lý sản phẩm', '/admin' + '/manageproduct', <FileOutlined />),
  getItem('Quản lý đơn hàng', '/admin' + '/managebill', <FileOutlined />),
  getItem('Quản lý đợt sale', '/admin' + '/managesale', <FileOutlined />),
  getItem('Quản lý bài đăng', '/admin' + '/managePost ', <FileOutlined />),
  getItem('Thống kê doanh thu', '/admin/statistic' + '', <PieChartOutlined />),
  getItem('Quản lý nhân viên', '/admin/manageNV' + '', <PieChartOutlined />),
];
const itemsNV = [
  getItem('Trở lại trang chủ', '/', <GoHomeFill />),
  getItem('Quản lý nhãn hàng', '/admin' + '', <PieChartOutlined />),
  getItem('Quản lý danh mục', '/admin' + '/managecategory', <DesktopOutlined />),
  getItem('Quản lý sản phẩm', '/admin' + '/manageproduct', <FileOutlined />),
  getItem('Quản lý đơn hàng', '/admin' + '/managebill', <FileOutlined />),
  getItem('Quản lý đợt sale', '/admin' + '/managesale', <FileOutlined />),
  getItem('Quản lý bài đăng', '/admin' + '/managePost ', <FileOutlined />),
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userCurrent } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('persist:auth'))?.isLoggedIn === 'false') {
      navigate('/');
    }
  }, []);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          theme="dark"
          defaultSelectedKeys={['']}
          mode="inline"
          items={userCurrent?.role === 'ADMIN' ? items : itemsNV}
          onClick={(item, key, keyPath, domEvent) => {
            navigate(item.key);
          }}
        />
      </Sider>
      <Layout>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
