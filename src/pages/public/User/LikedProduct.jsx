import ProductApi from "../../../api/ProductApi";
import ProductCard from "../../../Components/ManagementPage/Product/ProductCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const LikedProduct = () => {
    const [products, setProducts] = useState([]);
    const { userCurrent } = useSelector(state => state.auth);

    const fetchProducts = async () => {
        try {
            const res = await ProductApi.getFavourite(userCurrent?.id);

            setProducts(res.products);
        } catch (e) {

        }
    }
    console.log(products);
    useEffect(() => {
        fetchProducts();
    }, [userCurrent])
    return <>{
        products?.map(product => {
            return <div style={{ height: '434px !important', width: '300px !important' }}>
                <ProductCard dt={product} />
            </div>
        })
    }
    </>
}

export default LikedProduct;