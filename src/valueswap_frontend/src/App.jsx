import { useState } from 'react';
import { valueswap_backend } from 'declarations/valueswap_backend';
import AppRoutes from './AppRoutes';
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from './components/alertHook/Alert'
import MobileNavbar from './navbar/MobileNavbar';
import ConnectWallet from './Modals/ConnectWallet';
import { CommonNavbarData } from './TextData';
import LandingPage from './pages/LandingPage';
function App() {
  const [clickConnectWallet, setClickConnectWallet] = useState(false);
  const [walletClicked, setWalletClicked] = useState(false);
  const { show, type, text } = useSelector((state) => state.alert)


  
  return (
    <div>
      <div>
        {clickConnectWallet && <ConnectWallet setClickConnectWallet={setClickConnectWallet} setWalletClicked={setWalletClicked} />}
      </div>
      <div className='sticky top-16 z-50'>
        {show && <Alert type={type} text={text} />}
      </div>
      <Router>
        <MobileNavbar NavbarData={CommonNavbarData} setClickConnectWallet={setClickConnectWallet} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<LandingPage setClickConnectWallet={setClickConnectWallet} />} />
            {AppRoutes.slice(1).map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.page
                }
              />
            ))}
          </Routes>
        </Suspense>
      </Router>  {/* Close Router */}
    </div>
  );
}

export default App;
