import Head from "next/head";
import Product from "../components/Product";
import { getData } from "../utils/fetchData";

const Home = ({ res }) => {
  const { success, products } = res;

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
        <h2 className="text-center m-5">No Product</h2>
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
