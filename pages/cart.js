import { useSelector } from "react-redux";
import CartDetail from "../components/CartDetail";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="container mt-4">
      {cart.length ? (
        <div className="d-flex justify-content-between text-secondary row">
          <div className="col-md-8">
            <h2>Shopping Cart</h2>
            <table className="table table-hover">
              <tbody>
                {cart.map((item) => (
                  <CartDetail key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 text-right">
            <h3 className="">Cart Summary</h3>
            <hr />
            {cart.map((item) => (
              <>
                <div className="text-capitalize">
                  {item.title} &#10006; {item.quantity} ={" "}
                  {item.price * item.quantity}
                </div>
                <hr />
              </>
            ))}
            <h5 className="text-dark">Total: ${100}</h5>
            <hr />
            <button className="btn btn-dark w-100">PAY</button>
          </div>
        </div>
      ) : (
        <h2 className="text-center">Cart empty !</h2>
      )}
    </div>
  );
};

export default Cart;
