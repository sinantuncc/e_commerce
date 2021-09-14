/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState } from "react";
import { getData } from "../../utils/fetchData";
import { BsFillHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { notifyInfo, notifySuccess } from "../../store/actions/notify";
import { addToCart } from "../../store/actions/cart";

const ProductDetail = (props) => {
  const { product } = props;
  const [tab, setTab] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const isActive = (index) => (tab === index ? "active" : "");

  const isSoldOut = () =>
    product.inStock > 0 ? "btn-success" : "btn-secondary";

  const handleFavorite = () => {
    setFavorite(!favorite);

    let status = favorite ? "removed" : "added";

    dispatch(notifyInfo(`${product.title} ${status} to favourites.`));
  };

  const handleBuy = () => {
    dispatch(addToCart(product));

    const isAdded = cart.every((item) => item._id !== product._id);

    isAdded
      ? dispatch(notifySuccess(`${product.title} added to cart.`))
      : dispatch(notifyInfo(`${product.title} has been added to cart!`));
  };

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className=" row detail_page m-4">
        <div className="col-md-6">
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className="d-block img-thumbnail rounded w-100"
            style={{ height: "370px" }}
          />
          <div className="row mx-0" style={{ cursor: "pointer" }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.url}
                className={`d-block img-thumbnail rounded ${isActive(index)}`}
                style={{ height: "80px", width: "20%" }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="text-capitalize">{product.title}</h5>
          <h6 className="text-dark">Price: ${product.price}</h6>

          <div className="row justify-content-between mx-0">
            <h6 className="text-success">Sold: {product.sold}</h6>
            {product.inStock > 0 ? (
              <h6 className="text-success">In Stock: {product.inStock}</h6>
            ) : (
              <h6 className="text-danger">Out Stock</h6>
            )}
          </div>
          <hr />
          <p className="card-text" title={product.content}>
            {product.content}
            {product.content}
            {product.content}
          </p>
          <div className="row justify-content-between mx-0">
            <button
              className={`btn flex-fill mr-1 ${isSoldOut()}`}
              disabled={product.inStock > 0 ? false : true}
              onClick={handleBuy}
            >
              {product.inStock > 0 ? "Buy" : "Sold Out"}
            </button>
            <button className="btn border" onClick={handleFavorite}>
              <BsFillHeartFill size="1.5em" color={favorite ? "red" : "gray"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  return {
    props: {
      product: res.product,
    },
  };
}

export default ProductDetail;
