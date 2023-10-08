import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { listOrders } from "../../Redux/Actions/OrderActions";
import { listProducts } from "../../Redux/Actions/ProductActions";
import { listUser } from "../../Redux/Actions/userActions";

const Main = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const userList = useSelector((state) => state.userList);

  const { users } = userList;

  useEffect(() => {
    dispatch(listOrders());
    dispatch(listProducts());
    dispatch(listUser());
  }, []);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} users={users} />

        <div className="row">
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div> */}
      </section>
    </>
  );
};

export default Main;
