import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import CartDetail from "../components/CartDetail";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getData } from "../utils/fetchData";

const Cart = () => {
  const { cart, auth } = useSelector((state) => state);
  const { isLogged } = auth;

  const [total, setTotal] = useState(0);
  const [localCart, setLocalCart] = useLocalStorage("_cart_");

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart && cart.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (let item of localCart) {
          const res = await getData(`product/${item._id}`);
          if (res) {
            const { _id, title, images, price, inStock, sold } = res.product;
            if (inStock > 0) {
              newArr.push({
                _id,
                title,
                images,
                price,
                sold,
                inStock,
                quantity:
                  item.quantity > inStock
                    ? item.quantity - (item.quantity - inStock)
                    : item.quantity,
              });
            }
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, []);

  useEffect(() => {
    const getTotal = () => {
      const result = cart.reduce(
        (prev, item) => prev + item.price * item.quantity,
        0
      );

      setTotal(result);
    };

    getTotal();
    setLocalCart(cart);
  }, [cart]);

  const cartSummary = () => (
    <div className="col-md-4 text-right">
      <h3 className="">Cart Summary</h3>
      <hr />
      {cart.map((item) => (
        <div key={item._id}>
          <div className="text-capitalize" key={item._id}>
            {item.title} &#10006; {item.quantity} = {item.price * item.quantity}
          </div>
          <hr />
        </div>
      ))}
      <h5>
        Total: <span className="text-danger">${total}</span>
      </h5>
      <hr />
      <Link
        href={
          isLogged ? `/payment` : `/login?cb=${encodeURIComponent("/payment")}`
        }
      >
        <a className="btn btn-dark w-100">PAYMENT</a>
      </Link>
    </div>
  );

  return (
    <div className="container mt-4">
      {cart.length ? (
        <div className="d-flex justify-content-between text-secondary row">
          <div className="col-md-8">
            <h2>Shopping Cart</h2>
            <table className="table table-hover">
              <tbody>
                {cart.map((item) => (
                  <CartDetail key={item._id} item={item} cart={cart} />
                ))}
              </tbody>
            </table>
          </div>
          {cartSummary()}
        </div>
      ) : (
        <h2 className="text-center">Cart empty !</h2>
      )}
    </div>
  );
};

export default Cart;
