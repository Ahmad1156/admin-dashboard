import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { useState } from "react";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const { userInfo } = useSelector((state) => state.userLogin);

  const { isEmoud } = userInfo.data.user;

  console.log(isEmoud);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const [currentPage, setCurrentPage] = useState(1);

  const emoudProducts = products?.products?.filter(
    (product) => product?.isEmoudVerified === true
  );

  const productsPerPage = 8;
  const totalPages = Math.ceil(
    isEmoud
      ? emoudProducts?.length
      : products?.products?.length / productsPerPage
  );
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    if (pageNumber <= 0 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        {/* <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div> */}
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            {/* <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div> */}
          </div>
        </header>

        <div className="card-body">
          {false && <Message variant="alert-danger">delete</Message>}
          {false ? (
            <Loading />
          ) : false ? (
            <Message variant="alert-danger">delete</Message>
          ) : (
            <div className="row">
              {/* Products */}

              {products?.products
                ?.slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage
                )
                .map((product) => {
                  return !isEmoud ? (
                    <Product product={product} key={product._id} />
                  ) : (
                    product?.isEmoudVerified && (
                      <Product product={product} key={product._id} />
                    )
                  );
                })}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li
                className={`page-item cursor-pointer ${
                  currentPage === 1 && "disabled"
                }`}
                onClick={() => handleClick(currentPage - 1)}
              >
                <a className="page-link" to="#">
                  Previous
                </a>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li
                  className={`page-item ${
                    pageNumber == currentPage && "active"
                  }`}
                  onClick={() => handleClick(pageNumber)}
                >
                  <a className="page-link">{pageNumber}</a>
                </li>
              ))}
              <li
                className={`page-item cursor-pointer ${
                  currentPage === totalPages && "disabled"
                }`}
                onClick={() => {
                  console.log(totalPages);
                  if (currentPage === totalPages) return;
                  handleClick(currentPage + 1);
                }}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
