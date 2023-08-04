import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {

  const {loadedProduct} = props;

  if(!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const {params} = context;
  const productId = params.pid;

  // const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  const data = await getData();

  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      loadedProduct: product
    }
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map(product => product.id);

  const pathWithParams = ids.map(id => ({params: {pid: id}}));

  return {
    paths: pathWithParams,
    fallback: true // false: 404 page will be shown, true: page will be generated on demand
    // fallback: 'blocking'
    // fallback: false
  }
}
export default ProductDetailPage;