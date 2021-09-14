import Head from "next/head";
import { useState } from "react";
import Product from "../components/Product";
import { getData } from "../utils/fetchData";

const Home = ({ res }) => {
  const { success, total } = res;
  const [products, setProducts] = useState(res.products);

  return (
    <main className="products">
      <Head>
        <title>Home</title>
      </Head>
      {success ? (
        <div className="container product">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <h2 className="rext-center">No Product</h2>
      )}
    </main>
  );
};

export async function getStaticProps() {
  const res = await getData("product");
  return {
    props: {
      res,
    },
  };
}

export default Home;
