import { Routes, Route } from 'react-router-dom';

import Account from './Components/Customer/Account/Account';

function ClientApp() {
  return (
    <div>
      <Routes>  
        <Route path="/customer/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default ClientApp;
