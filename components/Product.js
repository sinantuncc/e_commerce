/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Product = ({ product }) => (
  <div className="card" style={{ width: "18rem" }}>
    <img
      src={product.images[0].url}
      className="card-img-top"
      alt={product.title}
    />
    <div className="card-body">
      <h5 className="card-title text-capitalize" title={product.title}>
        {product.title}
      </h5>
      <div className="row justify-content-between mx-0">
        <h6 className="text-primary">${product.price}</h6>
        {product.inStock > 0 ? (
          <h6 className="text-success">In Stock: {product.inStock}</h6>
        ) : (
          <h6 className="text-danger">Out Stock</h6>
        )}
      </div>
      <p className="card-text" title={product.description}>
        {product.description}
      </p>

      <div className="row justify-content-between mx-0">
        <Link href={`/product/${product._id}`}>
          <a className="btn btn-primary flex-fill">View Details</a>
        </Link>
      </div>
    </div>
  </div>
);

export default Product;
