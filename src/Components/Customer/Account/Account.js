import React from 'react';
import Header from '../../../Containers/Header/Header';
import Footer from '../../../Containers/Footer/Footer';
import './Account.scss';
import { Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom';

export default function Account() {
  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  return (
    <div>
      <Header />
      <div className="Account_Background"></div>
      <div className="Account_Container">
        <div className="Account">
          <div className="Account_Left"></div>
          <div className="Account_Right"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
