import Image from "next/image";

const CartDetail = ({ item }) => {
  return (
    <>
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
            <button className="btn btn-outline-secondary">-</button>
            <span className="mx-3 py-1"> {item.quantity}</span>
            <button className="btn btn-outline-secondary">+</button>
          </div>
        </td>
      </tr>
      <style jsx>{`
        tr > td {
          vertical-align: middle;
        }
      `}</style>
    </>
  );
};

export default CartDetail;
