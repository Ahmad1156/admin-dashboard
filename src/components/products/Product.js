import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  verifyProduct,
} from "../../Redux/Actions/ProductActions";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  console.log(userInfo.data.user);

  const deletehandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product??")) {
      dispatch(deleteProduct(id));
    }
  };

  const verifyhandler = (id) => {
    if (window.confirm("Are you sure that this item is verified?")) {
      dispatch(verifyProduct(id));
    }
  };

  const notVerifyhandler = (id) => {
    if (window.confirm("Are you sure??")) {
      console.log("hello");
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product?.images[0]?.url} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product?.name}
            </Link>
            <div className="d-flex flex-row justify-content-between">
              <div className="price">${product?.price}</div>
              <div className="price mb-2">origin: {product?.origin}</div>
            </div>
            <div className=" gap-2 d-flex  justify-content-center align-items-center ">
              {/* <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link> */}
              {userInfo.data.user.isEmoud &&
                !product?.isOfficialEmoudVerified && (
                  <>
                    <button
                      to="#"
                      onClick={() => notVerifyhandler(product._id)}
                      className="btn btn-sm btn-outline-danger p-2 col-md-6 gap-2 justify-content-center align-items-center"
                    >
                      Not verify<i className="fas fa-delete"></i>
                    </button>
                    <button
                      to="#"
                      onClick={() => verifyhandler(product._id)}
                      className="btn btn-sm btn-outline-success p-2  col-md-6 d-flex justify-content-center align-items-center gap-2 pl-2"
                    >
                      Verify <i className="fas fa-check"></i>
                    </button>
                  </>
                )}
              {userInfo.data.user.isEmoud &&
                product?.isOfficialEmoudVerified && (
                  <>
                    <button
                      to="#"
                      className="btn btn-sm btn-outline-primary bg-primary text-white p-2 col-md-6 gap-2 justify-content-center align-items-center w-100"
                      disabled
                    >
                      Officially Verified <i className="fas fa-delete"></i>
                    </button>
                  </>
                )}
              {!userInfo.data.user.isEmoud && (
                <button
                  to="#"
                  onClick={() => deletehandler(product._id)}
                  className="btn btn-sm btn-outline-danger d-flex  justify-content-center align-items-center w-100 p-3 mt-2"
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
