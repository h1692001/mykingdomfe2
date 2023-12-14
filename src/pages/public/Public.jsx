import { Outlet } from "react-router-dom";
import Header from "../../Containers/Header/Header";
import Footer from "../../Containers/Footer/Footer";
import ScrollToTop from "react-scroll-to-top";
const Public = () => {
    return <>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <ScrollToTop smooth style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} />
    </>
}

export default Public;