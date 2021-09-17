import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { decrease, increase, removeFromCart } from "../store/actions/cart";

const CartDetail = ({ item, cart }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <Image
          src={item.images[0].url}
          alt={item.title}
          height="80"
          width="110"
        />
      </td>
      <td className="text-capitalize">
        <span>{item.title}</span>
      </td>
      <td>
        <span className="text-dark">${item.price}</span>
      </td>
      <td>
        <div className="d-inline-flex">
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(decrease(cart, item._id))}
            disabled={item.quantity === 1 ? true : false}
          >
            -
          </button>
          <span className="mx-3 py-1">{item.quantity}</span>
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(increase(cart, item._id))}
            disabled={item.quantity === item.inStock ? true : false}
          >
            +
          </button>
        </div>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => dispatch(removeFromCart(item._id))}
        >
          <MdDelete size="1.5em" />
        </button>
      </td>
      <style jsx>{`
        tr > td {
          vertical-align: middle;
        }
      `}</style>
    </tr>
  );
};

export default CartDetail;
