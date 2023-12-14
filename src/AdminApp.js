import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Topbar from './Components/ManagementPage/Global/Topbar';
import Sidebar from './Components/ManagementPage/Global/Sidebar';
import Dashboard from './Components/ManagementPage/Dashboard/Dashboard';
import AddProduct from './Components/ManagementPage/Product/AddProduct';
import ListOfProduct from './Components/ManagementPage/Product/ListOfProduct';
import AddStaff from './Components/ManagementPage/Staff/AddStaff';
import ListOfStaff from './Components/ManagementPage/Staff/ListOfStaff';

function AdminApp() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/listofproduct" element={<ListOfProduct />} />
              <Route path="/addstaff" element={<AddStaff />} />
              <Route path="/listofstaff" element={<ListOfStaff />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default AdminApp;
